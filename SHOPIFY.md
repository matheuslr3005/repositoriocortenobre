# Ligar o site ao Shopify

O site está pronto para vender pelo Shopify. Falta só apontar para a loja.
Enquanto os campos ficarem em branco, ele continua funcionando com o catálogo
local e fechando o pedido pelo WhatsApp, sem quebrar nada.

## Como funciona

O site fica onde está (Vercel) e conversa com o Shopify pela **Storefront API**:

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
que está nesta pasta. Ele já vai com as dez peças, descrições, preços, SKUs e
as fotos (o Shopify baixa as imagens direto do site, não precisa enviar nada).

As peças sem preço definido entram como **rascunho**. Coloque o preço e mude
para "ativo" quando quiser vender.

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
modelo:fulltang ou  modelo:ximango
lamina:8            (só o número)
cabo:osso           cabo:madeira, cabo:chifre
```

O CSV já traz tudo isso. Em peça nova, repita o padrão. Sem tag, o site tenta
adivinhar pelo título, e pode errar.

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
vercel deploy --prod --yes --scope leonardo-9204s-projects
```

Pronto. O catálogo, os preços e o estoque passam a vir da loja, e o botão da
sacola vira "Finalizar compra".

## O que muda no site quando a loja liga

- Preço, promoção (preço riscado) e estoque saem do Shopify.
- Peça sem estoque aparece marcada como **Esgotada**, em preto e branco, e o
  botão vira um pedido de aviso pelo WhatsApp.
- A sacola passa a ser o carrinho do Shopify: sobrevive à troca de página e
  abre o checkout com tudo dentro.
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
