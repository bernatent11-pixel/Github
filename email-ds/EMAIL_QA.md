# Email QA — before anything is scheduled in Klaviyo

Why this exists: the Halloween sale ("Trick or Treat Yourself! Sweet Savings 🎃")
was skipped for **all 2,086 recipients** with Klaviyo's *Email Syntax Error*. Its
footer used `{% unsubscribe_url %}`, which is not a Klaviyo tag. Klaviyo's template
engine is Django-based: one unknown tag fails the whole render, and nobody gets it.

Run every step, in order, for every email that contains hand-written HTML.

## 1. Validator (local, seconds)

```bash
cd email-ds
node scripts/validate-klaviyo-email.mjs path/to/email.html
```

Must print `PASS`. On `FAIL`, fix every line it lists. Never paste around it. It checks:

- every `{% %}` tag is on the allowlist (below); every `{{ }}` has a `|default:` filter
  (except `organization.*`); no unbalanced `{% %}` / `{{ }}`; no `{#`; no curly quotes in tags
- a link tag like `{% web_view %}` (which prints a whole `<a>`) is never inside an `href`
- an unsubscribe tag is present
- the file is a **body fragment**: no doctype, `<html>`, `<head>`, `<body>`, `<meta>`, `<title>`
- every `<img>` has alt text (empty alt only with `role="presentation"`), every `<a>` a real href

Our generators (`scripts/make-halloween-html.mjs`, `emails/klaviyo/build-original-mate-latte.mjs`)
run this check themselves and refuse to write a file that fails.

## 2. Render check (Klaviyo's own engine, ground truth)

```bash
KLAVIYO_API_KEY=pk_... node scripts/validate-klaviyo-email.mjs path/to/email.html --render
```

Uploads the HTML as a temporary template, renders it with a sample profile, prints
`RENDER PASS` / `RENDER FAIL`, deletes the template. Needs a private key with templates
read/write scope. (In a Claude session with the Klaviyo connector, Claude can do the same
with create → render → delete.) A 400 "Unable to render… check included django syntax" here
is exactly the error that skipped the Halloween send.

## 3. Preview as a real profile

In Klaviyo, open the campaign → **Preview & test** → pick a real profile (yours). Check the
footer: Unsubscribe and View in browser are real links; no raw `{%` or `{{` text anywhere.

## 4. Send a test to yourself

Open it on a phone and on desktop. Click every button and the unsubscribe link once.

## 5. Schedule

Only now. Set subject and preview text in the campaign settings; preview text is never in the HTML.

---

## Allowlist: the only Klaviyo tags we use

| Tag | Prints |
|---|---|
| `{% unsubscribe %}` · `{% unsubscribe 'text' %}` | a whole unsubscribe `<a>` link |
| `{% unsubscribe_link %}` | the unsubscribe URL only, for `href="…"` |
| `{% manage_preferences %}` · `{% manage_preferences 'text' %}` | a whole preferences `<a>` link |
| `{% manage_preferences_link %}` | the preferences URL only |
| `{% web_view %}` · `{% web_view 'text' %}` | a whole "view in browser" `<a>` link |
| `{% web_view_link %}` | the view-in-browser URL only |
| `{{ organization.name }}` · `{{ organization.full_address }}` | the account's name and address |
| `{{ first_name\|default:'there' }}` | a profile field, always with a straight-quoted default |

A tag that is not here is not used. Do not guess one: confirm it in Klaviyo's docs, prove it
through the render check, then add it to the allowlist in `scripts/validate-klaviyo-email.mjs`.

## Structure of an HTML block

Klaviyo wraps an HTML block in its own document. So the block is a **fragment**: one optional
`<style>` block (resets, the phone media query), then the email's outer `<table>`. No doctype,
`<html>`, `<head>`, `<meta>`, `<title>`, `<body>`, no hidden preview-text div, and no `{%`, `{{`
or `{#` inside HTML comments (the engine parses comments too).
