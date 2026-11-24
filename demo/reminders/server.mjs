import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { join } from 'node:path';

const host = '127.0.0.1';
const port = Number(process.env.JAYRA_PORT || 4173);
const origin = `http://${host}:${port}`;
const html = await readFile(new URL('./index.html', import.meta.url));
const system32 = join(process.env.SystemRoot || 'C:\\Windows', 'System32');
const apps = { calculator: join(system32, 'calc.exe'), notepad: join(system32, 'notepad.exe') };

function reply(response, status, message) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify({ message }));
}

createServer((request, response) => {
  if (request.headers.host !== `${host}:${port}`) {
    return reply(response, 403, 'Jayra-র লোকাল ঠিকানাটি ব্যবহার করো।');
  }
  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    return response.end(html);
  }
  const match = request.url.match(/^\/api\/open\/(calculator|notepad)$/);
  if (request.method !== 'POST' || !match) return reply(response, 404, 'এই কমান্ডটি পাওয়া যায়নি।');
  if (request.headers.origin !== origin) return reply(response, 403, 'Jayra পেজ থেকে কমান্ডটি পাঠাও।');
  if (process.platform !== 'win32') return reply(response, 501, 'অ্যাপ খোলার কমান্ডটি Windows-এ চালাও।');

  const app = spawn(apps[match[1]], [], { detached: true, stdio: 'ignore' });
  app.once('error', () => reply(response, 500, 'অ্যাপটি শুরু করতে পারলাম না।'));
  app.once('spawn', () => {
    app.unref();
    reply(response, 200, match[1] === 'notepad' ? 'নোটপ্যাড চালু করেছি।' : 'ক্যালকুলেটর চালু করেছি।');
  });
}).listen(port, host, () => console.log(`Jayra: ${origin}`));
