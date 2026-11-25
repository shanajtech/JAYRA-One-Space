import { copyFileSync } from 'node:fs';
for (const name of ['index.html', 'styles.css', 'app.js']) copyFileSync(`src/${name}`, `dist/${name}`);
console.log('Built single-page frontend in dist/');
