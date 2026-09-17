import { readFile, writeFile } from 'node:fs/promises';
const source = new URL('index.html', import.meta.url);
let html = await readFile(source, 'utf8');
const audios = {
  '../output/speech/professional-v1/02-hidratacao-desempenho.mp3': '../output/speech/professional-v1/02-hidratacao-desempenho.mp3',
  '../output/speech/professional-v1/05-organizacao-equipamentos.mp3': '../output/speech/professional-v1/05-organizacao-equipamentos.mp3',
  '../output/speech/professional-v1/09-acompanhe-evolucao.mp3': '../output/speech/professional-v1/09-acompanhe-evolucao.mp3'
};
for (const [reference, file] of Object.entries(audios)) {
  const audio = await readFile(new URL(file, import.meta.url));
  html = html.replace(reference, `data:audio/mpeg;base64,${audio.toString('base64')}`);
}
await writeFile(new URL('gymvoice-preview.html', import.meta.url), html);
console.log('gymvoice-preview.html criado com os três áudios incorporados.');
