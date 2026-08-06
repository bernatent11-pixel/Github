// Build the Milonga email design system into an ESM entry the design-sync
// converter can re-bundle. React/React-DOM stay external (provided at runtime).
import * as esbuild from 'esbuild';
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

mkdirSync('dist', { recursive: true });

await esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.es.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  loader: { '.png': 'dataurl', '.jpg': 'dataurl', '.otf': 'dataurl' },
  logLevel: 'info',
});

// Ship a single tokens/base stylesheet (design-sync cssEntry) into dist.
cpSync('src/styles/tokens.css', 'dist/tokens.css');
// Ship the @font-face stylesheets + font files (design-sync extraFonts).
// Gotham (brand) + Montserrat (email-safe fallback) in one dist/fonts.css.
const fontCss = readFileSync('src/styles/fonts.css', 'utf8') + '\n' + readFileSync('src/styles/montserrat.css', 'utf8');
writeFileSync('dist/fonts.css', fontCss);
mkdirSync('dist/fonts', { recursive: true });
cpSync('public/fonts', 'dist/fonts', { recursive: true });

console.log('build: dist/index.es.js + tokens.css + fonts.css ready');
