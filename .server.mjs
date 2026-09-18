import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { responder } from './.mock-shopify.mjs';
const ROOT = '/Users/leonardogomes/projetos/corte-nobre';
const TYPES = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml', '.webp':'image/webp' };
createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);

  // simulador da Storefront API
  if (p === '/mock-shopify' && req.method === 'POST') {
    let corpo = '';
    for await (const pedaco of req) corpo += pedaco;
    const saida = responder(JSON.parse(corpo));
    res.writeHead(200, { 'content-type': 'application/json', 'access-control-allow-origin': '*' });
    res.end(JSON.stringify(saida));
    return;
  }
  if (p === '/mock-checkout') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end('<body style="background:#17150F;color:#EDE6D6;font:16px system-ui;display:grid;place-items:center;height:100vh"><p>Checkout do Shopify (simulado). Carrinho: ' + req.url.split('cart=')[1] + '</p></body>');
    return;
  }

  if (p.endsWith('/')) p += 'index.html';
  let file = join(ROOT, normalize(p));
  try {
    let s = await stat(file).catch(() => null);
    if (!s && !extname(file)) { file += '.html'; s = await stat(file).catch(() => null); }
    if (!s || s.isDirectory()) throw new Error('404');
    const buf = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(buf);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('404');
  }
}).listen(8123, () => console.log('http://localhost:8123'));
