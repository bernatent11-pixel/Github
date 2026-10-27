#!/usr/bin/env node
// Pre-flight check for an email pasted into a Klaviyo HTML block.
//
// Klaviyo's template engine is Django-like: ONE tag it does not know fails
// the whole render, and Klaviyo skips every recipient with "Email Syntax
// Error". The Halloween sale went out that way to 0 of 2,086 people because
// its footer used {% unsubscribe_url %}, which is not a Klaviyo tag. This
// script fails loudly on that class of mistake before anything is pasted.
//
//   node scripts/validate-klaviyo-email.mjs <file.html> [more.html ...]
//   node scripts/validate-klaviyo-email.mjs <file.html> --render
//
// Exit code 0 = pass, 1 = problems found (each with its line number).
//
// --render is the ground-truth check: it uploads the HTML to Klaviyo as a
// temporary CODE template (wrapped in <html><body>, the way an HTML block
// sits inside Klaviyo's own document), renders it with a sample profile,
// reports pass/fail, and deletes the temporary template. It needs a private
// API key with templates read/write scope in KLAVIYO_API_KEY.
//
// The allowlist is deliberately short. A tag that is not on it is an error,
// not a guess: add a tag here only after confirming it in Klaviyo's docs and
// seeing it render through --render.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

// {% … %} tags Klaviyo renders. The bare and 'text' forms output a whole <a>
// link; the _link forms output only the URL, for use inside href="…".
const TAG_ALLOW = [
  /^unsubscribe$/, /^unsubscribe\s+'[^'"]*'$/, /^unsubscribe_link$/,
  /^manage_preferences$/, /^manage_preferences\s+'[^'"]*'$/, /^manage_preferences_link$/,
  /^web_view$/, /^web_view\s+'[^'"]*'$/, /^web_view_link$/,
];
// Klaviyo's campaign check only confirms the full-link forms. A hand-made
// <a href="{% unsubscribe_link %}"> renders, yet the Halloween clone was still
// blocked with "unable to confirm the unsubscribe link … template syntax
// errors", so the URL-only form does not count as the email's unsubscribe.
const UNSUBSCRIBE = [/^unsubscribe$/, /^unsubscribe\s+'[^'"]*'$/];
// Tags that print a full <a> element, so they must never sit inside an attribute.
const LINK_ELEMENT_TAG = /^(unsubscribe|manage_preferences|web_view)(\s+'[^'"]*')?$/;
// {{ … }} variables that need no default.
const VAR_NO_DEFAULT = new Set(['organization.name', 'organization.full_address']);
const VAR_WITH_DEFAULT = /^[A-Za-z_][\w.]*\s*\|\s*default\s*:\s*('[^'"]*'|"[^'"]*")$/;
const CURLY = /[‘’‚‛“”„‟′″]/;
const FRAGMENT_ONLY = /<!doctype\b|<html\b|<head\b|<body\b|<meta\b|<title\b/gi;

export function validate(html) {
  const problems = [];
  const lineAt = (i) => html.slice(0, i).split('\n').length;
  const add = (i, rule, msg) => problems.push({ line: lineAt(i), rule, msg });

  // ── Template syntax: on the raw text, comments included, because the
  // template engine parses inside HTML comments too.
  const hashOpen = /\{#/g;
  for (let m; (m = hashOpen.exec(html));) {
    add(m.index, 'django-comment', '"{#" opens a Django comment; remove it (or put a space between "{" and "#").');
  }

  let unsubscribeFound = false;
  let unsubscribeLinkOnly = -1;
  const opener = /\{%|\{\{/g;
  const consumed = []; // [start, end) ranges of well-formed tags
  for (let m; (m = opener.exec(html));) {
    const start = m.index;
    const isTag = m[0] === '{%';
    const close = isTag ? '%}' : '}}';
    const end = html.indexOf(close, start + 2);
    const nextOpen = html.slice(start + 2).search(/\{%|\{\{/);
    if (end === -1 || (nextOpen !== -1 && start + 2 + nextOpen < end)) {
      add(start, 'unbalanced', `"${m[0]}" is never closed with "${close}" before the next tag opens.`);
      continue;
    }
    const raw = html.slice(start, end + 2);
    const inner = html.slice(start + 2, end).trim();
    consumed.push([start, end + 2]);
    opener.lastIndex = end + 2;

    if (CURLY.test(inner)) {
      add(start, 'curly-quote', `${raw} contains a curly/smart quote; use straight quotes (' or ").`);
      continue;
    }
    if (isTag) {
      if (!TAG_ALLOW.some((re) => re.test(inner))) {
        add(start, 'unknown-tag', `${raw} is not an allowed Klaviyo tag. Allowed: {% unsubscribe %}, ` +
          `{% unsubscribe 'text' %}, {% unsubscribe_link %}, the same three for manage_preferences and web_view.`);
        continue;
      }
      if (UNSUBSCRIBE.some((re) => re.test(inner))) unsubscribeFound = true;
      else if (inner === 'unsubscribe_link' && unsubscribeLinkOnly < 0) unsubscribeLinkOnly = start;
      // A tag that prints a whole <a> cannot live inside an attribute value.
      const before = html.slice(Math.max(0, start - 200), start);
      if (LINK_ELEMENT_TAG.test(inner) && /=\s*["'][^"'<>]*$/.test(before)) {
        add(start, 'link-tag-in-attribute', `${raw} prints a full <a> link, so it cannot go inside an attribute; ` +
          `use {% ${inner.split(/\s/)[0]}_link %} for the URL.`);
      }
    } else if (!VAR_NO_DEFAULT.has(inner) && !VAR_WITH_DEFAULT.test(inner)) {
      add(start, 'variable-default', `${raw} needs a fallback, e.g. {{ first_name|default:'there' }} ` +
        `(only organization.name and organization.full_address may go without).`);
    }
  }
  // Closers with no opener.
  const closer = /%\}|\}\}/g;
  for (let m; (m = closer.exec(html));) {
    if (!consumed.some(([a, b]) => m.index >= a && m.index < b)) {
      add(m.index, 'unbalanced', `"${m[0]}" has no matching opener` +
        (m[0] === '}}' ? ' (in CSS, put a space between the two braces: "} }").' : '.'));
    }
  }
  if (!unsubscribeFound && unsubscribeLinkOnly >= 0) {
    add(unsubscribeLinkOnly, 'unsubscribe-full-tag', 'The only unsubscribe is href="{% unsubscribe_link %}". Klaviyo\'s ' +
      'campaign check does not confirm that form; use {% unsubscribe \'Unsubscribe\' %} and style the element around it.');
  } else if (!unsubscribeFound) {
    add(0, 'no-unsubscribe', 'No unsubscribe tag. Add {% unsubscribe \'Unsubscribe\' %} ' +
      '(CAN-SPAM, and Klaviyo requires one).');
  }

  // ── HTML structure: comments stripped (blanked, so line numbers hold).
  const body = html.replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, ' '));
  for (let m; (m = FRAGMENT_ONLY.exec(body));) {
    add(m.index, 'fragment-only', `${m[0]}…> found. A Klaviyo HTML block is a body fragment: no doctype, ` +
      '<html>, <head>, <body>, <meta> or <title> (Klaviyo supplies the document).');
  }
  const imgRe = /<img\b[^>]*>/gi;
  for (let m; (m = imgRe.exec(body));) {
    const alt = m[0].match(/\balt\s*=\s*("([^"]*)"|'([^']*)')/i);
    // alt="" is right for a purely decorative image, but only when it says so
    // with role="presentation"; otherwise an empty alt is a forgotten one.
    const decorative = alt && !(alt[2] ?? alt[3]).trim() && /\brole\s*=\s*["']presentation["']/i.test(m[0]);
    if (!alt) add(m.index, 'img-alt', '<img> has no alt attribute.');
    else if (!(alt[2] ?? alt[3]).trim() && !decorative) {
      add(m.index, 'img-alt', '<img> has empty alt text. Describe it, or mark a purely decorative image role="presentation".');
    }
  }
  const aRe = /<a\b[^>]*>/gi;
  for (let m; (m = aRe.exec(body));) {
    const href = m[0].match(/\bhref\s*=\s*("([^"]*)"|'([^']*)')/i);
    const v = href ? (href[2] ?? href[3]).trim() : '';
    if (!v || v === '#') add(m.index, 'empty-href', `<a> has ${href ? 'an empty' : 'no'} href.`);
  }

  return problems.sort((a, b) => a.line - b.line);
}

export function report(problems, name) {
  if (!problems.length) return `PASS  ${name}`;
  return [`FAIL  ${name}: ${problems.length} problem${problems.length > 1 ? 's' : ''}`,
    ...problems.map((p) => `  line ${String(p.line).padStart(4)}  [${p.rule}]  ${p.msg}`)].join('\n');
}

// ── --render: Klaviyo's own renderer, through the REST API ────────────────
async function renderCheck(html, name) {
  const key = process.env.KLAVIYO_API_KEY;
  if (!key) return { ok: false, msg: 'KLAVIYO_API_KEY is not set; skipped the render check.' };
  const api = (path, method, body) => fetch(`https://a.klaviyo.com/api/${path}`, {
    method,
    headers: { Authorization: `Klaviyo-API-Key ${key}`, revision: '2024-10-15',
      accept: 'application/vnd.api+json', 'content-type': 'application/vnd.api+json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const created = await api('templates/', 'POST', { data: { type: 'template', attributes: {
    name: `QA render check — ${name} — ${new Date().toISOString()}`, editor_type: 'CODE',
    html: `<html><body>${html}</body></html>` } } });
  if (!created.ok) return { ok: false, msg: `could not create the temporary template (${created.status}): ${await created.text()}` };
  const id = (await created.json()).data.id;
  try {
    const rendered = await api('template-render/', 'POST', { data: { type: 'template', id, attributes: {
      context: { first_name: 'Sam', email: 'sam@example.com' } } } });
    const text = await rendered.text();
    return rendered.ok
      ? { ok: true, msg: `Klaviyo rendered it (template ${id}, ${text.length} bytes back).` }
      : { ok: false, msg: `Klaviyo could not render it (${rendered.status}): ${text}` };
  } finally {
    await api(`templates/${id}/`, 'DELETE');
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const render = args.includes('--render');
  const files = args.filter((a) => a !== '--render');
  if (!files.length) {
    console.error('usage: node scripts/validate-klaviyo-email.mjs <file.html> [more.html ...] [--render]');
    process.exit(2);
  }
  let failed = false;
  for (const f of files) {
    const html = fs.readFileSync(f, 'utf8');
    const problems = validate(html);
    console.log(report(problems, f));
    if (problems.length) failed = true;
    if (render && !problems.length) {
      const r = await renderCheck(html, f);
      console.log(`${r.ok ? 'RENDER PASS' : 'RENDER FAIL'}  ${f}: ${r.msg}`);
      if (!r.ok) failed = true;
    }
  }
  process.exit(failed ? 1 : 0);
}
