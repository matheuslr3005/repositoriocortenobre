# Corte Nobre · site

Site estático, sem framework e sem build pesado. HTML, CSS e JavaScript de módulo.

## Rodar local

```bash
node .server.mjs   # http://localhost:8123
```

## Editar e publicar

As páginas finais na raiz (`index.html`, `faca-de-inox.html`, ...) são **geradas**. Edite sempre em `src/` e rode:

```bash
node build.mjs
```

O build expande os trechos comuns (`<!-- incluir:cabecalho.html -->`), marca o item ativo do menu e versiona os CSS para furar cache.

Publicar:

```bash
vercel deploy --prod --yes --scope leonardo-9204s-projects
```

## Shopify

O site vende pelo Shopify quando `js/dados.js` tem domínio e token da loja.
Sem isso, funciona com o catálogo local e fecha o pedido no WhatsApp. O passo a
passo está em [SHOPIFY.md](SHOPIFY.md), e `shopify-produtos.csv` importa as dez
peças de uma vez.

## Estoque da Nuvemshop

Independente do Shopify, o site pode marcar peças como esgotadas a partir do
estoque de verdade cadastrado na Nuvemshop. Uma função agendada
(`netlify/functions/sync-estoque.mjs`) publica `estoque.json`, que o site lê
sozinho. Passo a passo em [NUVEMSHOP.md](NUVEMSHOP.md).

## Onde mexer no conteúdo

| O que | Arquivo |
|---|---|
| WhatsApp, e-mail, Instagram, horário | `js/dados.js`, bloco `CONTATO` |
| Loja Shopify (domínio e token) | `js/dados.js`, bloco `SHOPIFY` |
| Peças do catálogo, preços e fotos | `js/dados.js`, lista `PECAS` (só quando o Shopify está desligado) |
| Texto de cuidados e conservação | `js/dados.js`, `CUIDADOS` |
| Textos das páginas | `src/*.html` |
| Cabeçalho, rodapé e painéis | `src/partes/` |
| Cores, tipografia e espaçamento | `css/base.css` (tokens no `:root`) |

Preço `null` em uma peça mostra "Sob consulta" e troca o botão de compra por pedido de orçamento.

## Imagens

As fotos tratadas ficam em `img/` (webp, duas larguras: `nome.webp` e `nome@half.webp`).
Os originais estão em `_fontes/` e não sobem para produção (`.vercelignore`).

## Estrutura

```
src/            fonte das páginas (edite aqui)
  partes/       cabeçalho, rodapé, painéis
css/            base (tokens), app (casca), home, catálogo
js/             dados, util, shopify, sacola, app, pecas, home, catalogo, gravacao, contato, cuidados
img/            fotos tratadas em webp
_fontes/        fotos originais, fora do deploy
netlify/functions/sync-estoque.mjs   sincroniza o estoque da Nuvemshop (NUVEMSHOP.md)
estoque.json    gerado pela função acima; não editar à mão
build.mjs       gerador das páginas
```

## O que o site faz

- Catálogo com filtros por modelo, lâmina e cabo, com reordenação animada.
- Ficha da peça em painel lateral, com galeria quando há mais de uma foto.
- Sacola no navegador (localStorage) que fecha o pedido no WhatsApp com a lista pronta.
- Comparador arrastável entre aço carbono e aço inox.
- Simulador de gravação na lâmina, na página empresarial.
- Formulários de contato e orçamento que abrem o WhatsApp já escritos, sem backend.
- Integração com o Shopify: catálogo, estoque, promoções, carrinho e checkout da loja, com volta automática para o modo WhatsApp se a loja não responder.
- Sincronização de estoque com a Nuvemshop: peça esgotada lá vira "Esgotada" no site, mesmo com pedido pelo WhatsApp.
