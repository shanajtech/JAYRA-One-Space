import { copyFileSync, mkdirSync } from 'node:fs';
for (const name of ['index.html', 'styles.css', 'app.js']) copyFileSync(`src/${name}`, `dist/${name}`);
mkdirSync('dist/jayra-demo', { recursive: true });
copyFileSync('demo/reminders/index.html', 'dist/jayra-demo/index.html');
console.log('Built single-page frontend in dist/');
