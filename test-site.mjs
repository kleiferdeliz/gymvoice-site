import { readFile } from 'node:fs/promises';

const index = await readFile(new URL('index.html', import.meta.url), 'utf8');
const preview = await readFile(new URL('gymvoice-preview.html', import.meta.url), 'utf8');
const failures = [];

const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const ids = [...index.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
const duplicates = [...new Set(ids.filter((id, position) => ids.indexOf(id) !== position))];
check(duplicates.length === 0, `IDs duplicados: ${duplicates.join(', ')}`);
check(index.includes('Quero testar 7 dias'), 'CTA principal ausente.');
check(index.includes('Programa para Windows'), 'Descrição Programa para Windows ausente.');
check(index.includes('R$ 9,90') && index.includes('R$ 49,90'), 'Oferta comercial incompleta.');
check(index.includes('assets/gymvoice-programa-windows.webp'), 'Captura do programa ausente.');
check(/alt="[^"]*programa GymVoice[^"]*"/.test(index), 'Texto alternativo da captura ausente.');
check(index.includes('width="1280" height="788"'), 'Dimensões naturais da captura não foram preservadas.');
check(index.includes('.product-frame img{width:100%;height:auto;'), 'Captura pode perder a proporção responsiva.');
check(index.includes('toque ou clique para ampliar'), 'Orientação para ampliar a captura ausente.');
check(index.includes('Seus próprios MP3'), 'Diferencial de locuções próprias ausente.');
check(index.includes('cadastro demonstrativo') || index.includes('cadastro é demonstrativo'), 'Aviso de cadastro demonstrativo ausente.');
check(!index.includes('../output/') && !preview.includes('../output/'), 'Caminho legado de áudio encontrado.');

for (const file of ['hidratacao.mp3', 'organizacao.mp3', 'evolucao.mp3']) {
  check(index.includes(`assets/${file}`), `Referência ausente: ${file}`);
}

check((preview.match(/data:audio\/mpeg;base64,/g) ?? []).length === 3, 'Prévia não incorporou os três áudios.');
check(preview.includes('data:image/webp;base64,'), 'Prévia não incorporou a captura do programa.');

const scripts = [...index.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(match => match[1]);
check(scripts.length > 0, 'JavaScript da página ausente.');
for (const [position, script] of scripts.entries()) {
  try {
    new Function(script);
  } catch (error) {
    failures.push(`JavaScript inválido no bloco ${position + 1}: ${error.message}`);
  }
}

if (failures.length) {
  console.error(failures.map(failure => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`Site validado: ${ids.length} IDs únicos, três áudios e captura incorporados.`);
