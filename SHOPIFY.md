# Ligar o site ao Shopify

O site está pronto para vender pelo Shopify. Falta só apontar para a loja.
Enquanto os campos ficarem em branco, ele continua funcionando com o catálogo
local e fechando o pedido pelo WhatsApp, sem quebrar nada.

## Como funciona

O site fica onde está (GitHub Pages / Netlify) e conversa com o Shopify pela **Storefront API**:

| O quê | De onde vem |
|---|---|
| Fotos, textos das páginas, design | do site |
| Produtos, preços, promoções, estoque | do Shopify |
| Carrinho | do Shopify (o site só mostra) |
| Pagamento e frete | checkout do Shopify |

Ou seja: o pedido nasce e é pago dentro do Shopify, com as formas de pagamento
e as regras de frete que a loja já tiver. O painel do Shopify continua sendo o
lugar de cadastrar peça, mudar preço e acompanhar venda.

## Passo 1 · cadastrar as peças

No painel: **Produtos › Importar**, e suba o arquivo `shopify-produtos.csv`
que está nesta pasta. Ele já vai com as 24 peças do catálogo atual, descrições,
preços, SKUs (iguais ao id de cada peça no site — importante, veja o passo 3)
e as fotos (o Shopify baixa as imagens direto do site, não precisa enviar nada).

As peças sem preço definido entram como **rascunho**. Coloque o preço e mude
para "ativo" quando quiser vender. Esse CSV é gerado a partir de `js/dados.js`
— se o catálogo do site mudar (peça nova, preço, foto), regenera o CSV antes
de importar de novo, senão a loja fica desatualizada em relação ao site.

Depois confira, produto por produto: **estoque** (o site mostra "Esgotada"
quando zera) e **peso**, que entra no cálculo do frete. O CSV chuta 260g.

## Passo 2 · criar a coleção

Crie uma coleção chamada **facas** (handle `facas`) e coloque as peças nela.
É ela que alimenta o catálogo do site. Se preferir usar todos os produtos da
loja, deixe o campo `colecao` vazio na configuração.

## Passo 3 · as tags mandam nos filtros

Os filtros do site (modelo, lâmina, cabo) leem as tags do produto, neste formato:

```
aco:inox        ou  aco:carbono
modelo:fulltang ou  modelo:tradicional
lamina:8            (só o número)
cabo:osso           cabo:madeira, cabo:chifre
```

O CSV já traz tudo isso. Em peça nova, repita o padrão. Sem tag, o site tenta
adivinhar pelo título, e pode errar.

> **Importante:** o "Handle" de cada linha do CSV (primeira coluna) precisa
> continuar igual ao id da peça em `js/dados.js` (ex.: `ximango-8-osso`). É
> assim que o site sabe usar as fotos já tratadas em `img/` em vez das fotos
> que o Shopify baixaria — se o handle não bater, a peça aparece com a foto
> que estiver cadastrada lá na Shopify (ou sem foto, se não subir nenhuma).

## Passo 4 · gerar o token

No painel do Shopify:

1. **Configurações › Apps e canais de venda › Desenvolver apps**
2. **Criar um app**, nome: `Site Corte Nobre`
3. Aba **Configuração › Storefront API**, marque:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
4. **Salvar** e depois **Instalar app**
5. Copie o **Storefront API access token**

> Esse token é público de propósito: ele fica no JavaScript do site e só
> enxerga catálogo e carrinho. O token de **Admin API** é outro, é secreto e
> **nunca** pode entrar aqui.

## Passo 5 · configurar o site

Em `js/dados.js`, no topo:

```js
export const SHOPIFY = {
  dominio: 'corte-nobre.myshopify.com',   // o domínio interno da loja
  token: 'cole-o-storefront-token-aqui',
  colecao: 'facas',
  versao: '2026-07',
  endpoint: '',
};
```

Depois:

```bash
node build.mjs
git add -A && git commit -m "Liga o Shopify" && git push
```

O push já dispara o deploy (GitHub Pages e Netlify publicam sozinhos a cada
commit). Pronto. O catálogo, os preços e o estoque passam a vir da loja, e o
botão da sacola vira "Finalizar compra".

## O que muda no site quando a loja liga

- Preço, promoção (preço riscado) e estoque saem do Shopify.
- Peça sem estoque aparece marcada como **Esgotada**, em preto e branco, e o
  botão vira um pedido de aviso pelo WhatsApp.
- A sacola passa a ser o carrinho do Shopify: sobrevive à troca de página e
  abre o checkout com tudo dentro — **o botão "Fechar pedido" deixa de mandar
  a mensagem pro WhatsApp e passa a abrir o checkout de pagamento do
  Shopify.** Se quiser continuar fechando pedido pelo WhatsApp mesmo com o
  Shopify ligado (só pra estoque/preço, sem checkout de cartão), me avisa
  que a gente ajusta esse comportamento antes de publicar.
- Peça que não existir na loja simplesmente não aparece no catálogo.

## Se a loja sair do ar

O site percebe, escreve um aviso no console e volta sozinho para o catálogo
local com pedido pelo WhatsApp. O visitante não vê erro nem página vazia.

## Versão da API

`versao: '2026-07'` é a estável de hoje. O Shopify lança uma nova a cada três
meses e mantém cada uma por doze. Trocar o número uma vez por ano basta.

## Testar sem mexer na loja

Existe um simulador da Storefront API para desenvolvimento:

```js
// js/dados.js
dominio: 'teste.myshopify.com',
token: 'teste',
endpoint: 'http://localhost:8123/mock-shopify',
```

Com `node .server.mjs` rodando, o site passa a usar cinco produtos de mentira,
inclusive um esgotado e um em promoção, com carrinho e checkout simulados.
Lembre de limpar esses campos antes de publicar.
