import { readFile, writeFile } from 'node:fs/promises';
const source = new URL('index.html', import.meta.url);
let html = await readFile(source, 'utf8');
const audios = {
  'assets/hidratacao.mp3': 'assets/hidratacao.mp3',
  'assets/organizacao.mp3': 'assets/organizacao.mp3',
  'assets/evolucao.mp3': 'assets/evolucao.mp3'
};
for (const [reference, file] of Object.entries(audios)) {
  if (!html.includes(reference)) {
    throw new Error(`Referência de áudio não encontrada no HTML: ${reference}`);
  }
  const audio = await readFile(new URL(file, import.meta.url));
  html = html.replace(reference, `data:audio/mpeg;base64,${audio.toString('base64')}`);
}

const imageReference = 'assets/gymvoice-programa-windows.webp';
if (!html.includes(imageReference)) {
  throw new Error(`Referência de imagem não encontrada no HTML: ${imageReference}`);
}
const productImage = await readFile(new URL(imageReference, import.meta.url));
html = html.replace(imageReference, `data:image/webp;base64,${productImage.toString('base64')}`);

await writeFile(new URL('gymvoice-preview.html', import.meta.url), html);
console.log('gymvoice-preview.html criado com três áudios e a captura do programa incorporados.');
