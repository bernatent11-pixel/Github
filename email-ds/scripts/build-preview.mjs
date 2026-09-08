// Build the browser bundle the refine/ harnesses load.
//
// This used to come from the design-sync CLI's converter, which lives outside
// the repo — so a fresh clone couldn't render anything until that tool was
// installed again. Previewing your own components shouldn't depend on a tool
// that isn't checked in, so this does the same job with esbuild.
//
// Output: ds-bundle/_ds_bundle.js (IIFE exposing window.MilongaEmailDS),
// the stylesheets, and React/ReactDOM copied in as plain globals.
import * as esbuild from 'esbuild';
import { mkdirSync, writeFileSync, copyFileSync, readFileSync, cpSync } from 'node:fs';

mkdirSync('ds-bundle/_vendor', { recursive: true });

// React and ReactDOM are loaded as <script> globals by the harnesses, so the
// bundle must reference window.React rather than import it.
const globalsShim = {
  name: 'react-globals',
  setup(build) {
    build.onResolve({ filter: /^react$/ }, () => ({ path: 'react', namespace: 'g' }));
    build.onResolve({ filter: /^react-dom$/ }, () => ({ path: 'react-dom', namespace: 'g' }));
    build.onResolve({ filter: /^react\/jsx-runtime$/ }, () => ({ path: 'jsx', namespace: 'g' }));
    build.onLoad({ filter: /.*/, namespace: 'g' }, (a) => {
      if (a.path === 'jsx') {
        return {
          contents: `const R = window.React;
export const Fragment = R.Fragment;
export const jsx = (t, p, k) => { const { children, ...rest } = p || {}; return R.createElement(t, k === undefined ? rest : { ...rest, key: k }, children); };
export const jsxs = jsx;`,
          loader: 'js',
        };
      }
      const g = a.path === 'react' ? 'React' : 'ReactDOM';
      return { contents: `module.exports = window.${g};`, loader: 'js' };
    });
  },
};

await esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'ds-bundle/_ds_bundle.js',
  bundle: true,
  format: 'iife',
  globalName: 'MilongaEmailDS',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  plugins: [globalsShim],
  loader: { '.png': 'dataurl', '.jpg': 'dataurl', '.otf': 'dataurl' },
  logLevel: 'error',
});

// Stylesheets the harnesses link to.
const css = readFileSync('src/styles/tokens.css', 'utf8');
const fonts =
  readFileSync('src/styles/fonts.css', 'utf8') + '\n' + readFileSync('src/styles/montserrat.css', 'utf8');
writeFileSync('ds-bundle/styles.css', fonts + '\n' + css);
writeFileSync('ds-bundle/_ds_bundle.css', '/* component styles are inline */\n');

// The @font-face url()s are relative, so Gotham has to sit next to the CSS —
// otherwise every preview silently renders in the fallback stack and the
// letterforms you are judging are not the brand's.
cpSync('public/fonts', 'ds-bundle/fonts', { recursive: true });

// React as plain globals.
copyFileSync('node_modules/react/umd/react.development.js', 'ds-bundle/_vendor/react.js');
copyFileSync('node_modules/react-dom/umd/react-dom.development.js', 'ds-bundle/_vendor/react-dom.js');

console.log('preview bundle ready → ds-bundle/');
