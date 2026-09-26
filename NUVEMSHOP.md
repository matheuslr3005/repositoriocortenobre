# Ligar o estoque da Nuvemshop ao site

O site continua exatamente como está — catálogo, preços e fechamento de
pedido pelo WhatsApp seguem daqui (`js/dados.js`). A única coisa que passa a
vir da Nuvemshop é **uma marcação de "esgotada"**, quando o estoque de uma
peça zera lá.

## Como funciona

Uma função (`netlify/functions/sync-estoque.mjs`) roda sozinha a cada 10
minutos, pergunta pra Nuvemshop quais SKUs estão com estoque zerado e, se
mudou algo desde a última vez, grava a lista em `estoque.json` na raiz do
site. O navegador lê esse arquivo ao carregar a página e marca a peça
correspondente como esgotada — mesmo card, mesmo texto de "Avisar quando
voltar" que já existe pro modo Shopify.

Não é instantâneo (pode levar até 10 minutos pra refletir uma venda), mas não
depende de nada além do que o site já tem hoje.

## Passo 1 · gerar o token na Nuvemshop

1. No painel da Nuvemshop: **Configurações › Aplicativos › Aplicativos sob
   medida** (essa opção só existe nos planos **Escala** e **Next** — se não
   aparecer, é preciso trocar de plano).
2. Criar um aplicativo novo, nome sugerido: `Site Corte Nobre`.
3. Marcar só a permissão de **leitura de Produtos** (não precisa de mais
   nada — sem escrita, sem pedidos, sem clientes).
4. Copiar o **token de acesso** e o **ID da loja** (aparece na mesma tela).

## Passo 2 · usar o mesmo id do site como SKU

O site casa cada peça pelo **id** que já existe em `js/dados.js` (ex.:
`ximango-8-osso`, `carbono-ram-chifre`). Pra sincronizar uma peça, o SKU dela
lá na Nuvemshop precisa ser exatamente esse id.

Peça que não tiver esse SKU simplesmente não é tocada pelo site — nunca
aparece como esgotada por engano.

## Passo 3 · gerar um token do GitHub

A função grava o `estoque.json` direto no repositório (é o jeito mais simples
de publicar um arquivo estático sem precisar de banco de dados).

1. Em [github.com/settings/tokens](https://github.com/settings/tokens) →
   **Generate new token (fine-grained)**.
2. Repositório: só `matheuslr3005/repositoriocortenobre`.
3. Permissão: **Contents: Read and write**.
4. Copiar o token gerado.

## Passo 4 · configurar as variáveis no Netlify

No painel do Netlify do site: **Site configuration › Environment variables**,
adicionar:

| Variável | Valor |
|---|---|
| `NUVEMSHOP_STORE_ID` | o ID da loja (passo 1) |
| `NUVEMSHOP_ACCESS_TOKEN` | o token da Nuvemshop (passo 1) |
| `GITHUB_TOKEN` | o token do GitHub (passo 3) |
| `GITHUB_REPO` | `matheuslr3005/repositoriocortenobre` |
| `GITHUB_BRANCH` | a branch que o Netlify publica (confira em **Site configuration › Build & deploy**) |

Depois de salvar, faz um **"Trigger deploy"** manual uma vez, pra função
começar a rodar no novo agendamento.

## Se algo falhar

A função nunca derruba o site: se faltar uma variável, se a Nuvemshop não
responder ou se o `estoque.json` ainda não existir, o catálogo local segue
normal, sem nenhuma peça marcada como esgotada. Os logs da função (Netlify →
**Functions › sync-estoque**) mostram o que aconteceu em cada execução.

## Se um dia quiser ir além (webhook em tempo real)

Essa versão consulta a Nuvemshop de tempos em tempos. Se no futuro quiser
que a atualização seja instantânea (assim que alguém compra), dá pra trocar
o agendamento por um webhook da Nuvemshop chamando uma função HTTP direto —
é mais trabalho (validar assinatura, endpoint sempre no ar) mas tira o atraso
de até 10 minutos.
