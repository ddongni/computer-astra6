import {readFile, writeFile, mkdir, readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const dictionary = JSON.parse(await readFile(join(root, 'locales/en.json'), 'utf8'));
// Match prose fragments without crossing HTML, JS string, or template boundaries.
// Exact matching fails the build if new Korean copy has not been translated.
const fragments = /[^'"`<>{}\n\\]+/g;
const hangul = /[가-힣]/;
const files = (await readdir(join(root, 'src/ko'))).sort();
const check = process.argv.includes('--check');
let count = 0;

for (const locale of ['en', 'ko']) {
  const output = join(root, 'dist', locale === 'ko' ? 'ko' : '');
  await mkdir(output, {recursive: true});
  for (const file of files) {
    let source = await readFile(join(root, 'src/ko', file), 'utf8');
    if (locale === 'en') {
      source = source.replace(fragments, text => {
        if (!hangul.test(text)) return text;
        const translation = dictionary[text];
        if (!translation || hangul.test(translation)) throw new Error(`Missing English translation in ${file}: ${text}`);
        if (/['"`<>\\\n]/.test(translation)) throw new Error(`Unsafe source delimiter in translation: ${translation}`);
        return translation;
      });
    }
    if (locale === 'ko') {
      // Share the sizeable 3D library and styles between both static versions.
      source = source.replaceAll('./assets/', '../assets/');
      if (file === 'index.html') source = source.replaceAll('href="./style.css"', 'href="../style.css"').replaceAll('href="./systems.css"', 'href="../systems.css"');
    }
    if (file === 'index.html') {
      const base = locale === 'ko' ? '../' : './';
      const title = locale === 'en' ? 'Language · Switching restarts the lab' : '언어 · 변경하면 실습을 새로 시작합니다';
      source = source.replace('<html lang="ko">', `<html lang="${locale}">`);
      source = source.replace('  </header>', `    <nav class="language-switch" aria-label="${locale === 'en' ? 'Language' : '언어'}" title="${title}"><a data-locale="en" lang="en" hreflang="en" href="${base}"${locale === 'en' ? ' aria-current="page"' : ''}>EN</a><a data-locale="ko" lang="ko" hreflang="ko" href="${base}ko/"${locale === 'ko' ? ' aria-current="page"' : ''}>한국어</a></nav>\n  </header>`);
      source = source.replace('</head>', `  <link rel="alternate" hreflang="en" href="${base}">\n  <link rel="alternate" hreflang="ko" href="${base}ko/">\n  <script type="module" src="${base}language.js"></script>\n</head>`);
    }
    const path = join(output, file);
    if (check) {
      if (await readFile(path, 'utf8') !== source) throw new Error(`Generated file is stale: ${path}`);
    } else await writeFile(path, source);
    count++;
  }
}
console.log(`${check ? 'Verified' : 'Generated'} ${count} locale files. English is the default; Korean is at /ko/.`);
