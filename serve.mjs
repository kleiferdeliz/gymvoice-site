import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, relative, extname, isAbsolute } from 'node:path';
const root = fileURLToPath(new URL('.', import.meta.url));
const mime = { '.html': 'text/html; charset=utf-8', '.mp3': 'audio/mpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
http.createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    const rel = relative(root, file);
    if (rel.startsWith('..') || isAbsolute(rel) || !mime[extname(file)]) { res.writeHead(404); res.end(); return; }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': mime[extname(file)], 'Content-Length': body.length, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(4317, '127.0.0.1', () => console.log('GymVoice preview: http://127.0.0.1:4317'));
