# Landing GymVoice · prévia local

Criada em 2026-09-17. Abra `gymvoice-preview.html` no Chrome ou Edge: o HTML único contém CSS, JavaScript e três MP3. Pode ser enviado como arquivo, sem a pasta assets. Alguns visualizadores de mensagens bloqueiam scripts; baixar e abrir no navegador.

Fonte editável: `index.html` + `assets/`. Após alterar, executar `node build-preview.mjs` para regenerar o arquivo compartilhável. Para servir localmente: `node serve.mjs`, depois abrir `http://127.0.0.1:4317`. Servidor restrito ao localhost; não é infraestrutura de produção.

## O que funciona

- Navegação, FAQ, transcrições e botões.
- Três amostras reais da biblioteca própria Cedar, geradas anteriormente; sem chamada de API ou custo de geração na página.
- Demonstração Web Audio com trilha sintética ilustrativa, redução e restauração; isso não controla apps externos e não substitui teste do player Windows.
- Cadastro demonstrativo em três passos, validação básica e sugestões determinísticas locais. Não é IA ao vivo.
- Dados descartados ao fechar o modal, sem gravação no navegador ou envio ao servidor. Use dados fictícios para testar.

## O que não está implementado

Conta, autenticação, e-mail, download comercial, cobrança, licença, persistência, geração de voz e integração com o aplicativo. Publicidade está sinalizada como plano futuro. O preço do programa fundador segue pendente. O arquivo não é um SaaS pronto nem deve ser publicado como contratação funcional.

## Prova social

Doctor Gym identificada como primeira academia usuária por confirmação do fundador. Depoimento editado a partir do relato nesta conversa; vínculo do responsável com a GymVoice explícito. Sem afirmar compra, resultados financeiros ou avaliação independente.

## Verificação em 2026-09-17

- Inspeção visual no Chrome desktop e checagem de largura móvel 390 px: sem overflow horizontal na checagem DOM.
- Formulário: erro para nome vazio, avanço com dados fictícios, questionário, sugestões de abertura/pico/encerramento/aulas e limpeza de campos/resumo após fechar.
- Áudio: ciclo da demonstração concluído até a mensagem final; redução observada e retorno ao estado inicial. Arquivos de hidratação/organização decodificados; organização reproduzindo sem erro de mídia. Sem erros/warnings de JavaScript na leitura realizada.
- IDs sem duplicação. Testes adicionais de celular real, leitores de tela, Safari e Edge continuam recomendados antes de publicação.

Nenhum código do player Windows foi alterado. Não houve publicação no domínio, mudança de DNS, cobrança ou cadastro externo.
