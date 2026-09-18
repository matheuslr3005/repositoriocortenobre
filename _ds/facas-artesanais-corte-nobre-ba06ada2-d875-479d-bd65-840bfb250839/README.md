# Facas Artesanais — Design System

Sistema visual derivado de um único documento de identidade visual (pt-BR) para uma **marca de facas artesanais**: peças forjadas, moídas e temperadas à mão, vendidas em lotes numerados. A marca **não tem nome próprio nos arquivos fornecidos** — o guia se refere a ela genericamente. Onde um nome é necessário, este sistema escreve "Facas Artesanais" como marcador; troque por pesquisa/substituição quando o nome real existir.

O documento é um guia de identidade, não um produto: define princípios, paleta, tipografia, materiais e aplicações. Não há código de produto, Figma, screenshots, fotografia ou logotipo. Tudo o que este sistema acrescenta a ele está marcado como acréscimo (ver "Acréscimos intencionais").

## Fontes recebidas
- `uploads/identidade-visual-facas-artesanais.html` — guia de identidade visual, página única em HTML (pt-BR, 421 linhas). Único insumo. Sem repositório, sem link de Figma, sem deck, sem imagens.

## Produtos / superfícies
O guia lista seis aplicações (etiqueta de couro, certificado, redes sociais, **site/catálogo**, cartão de visita, embalagem). Apenas uma é superfície de tela, e é a única recriada como UI kit: `ui_kits/site-catalogo/`. As outras cinco são peças físicas — descritas no card "Aplicações" e no readme, não simuladas.

---

## CONTENT FUNDAMENTALS

**Idioma:** português do Brasil, sempre. Sem termos em inglês, sem "premium", "exclusivo", "handcrafted".

**Voz:** terceira pessoa sobre o objeto, primeira pessoa do plural apenas quando a oficina age. Nunca "você" imperativo de marketing. O texto descreve o trabalho e deixa o leitor concluir.

**Tom:** afirmativo, seco, concreto. Frases curtas terminando em fato, não em promessa. A marca fala de decisões materiais (liga, tempo de forja, ângulo do fio), não de sensações.

Exemplos do guia, verbatim:
- "Cada faca é forjada, moída e temperada à mão, uma de cada vez."
- "Uma faca feita à mão carrega decisões, não efeitos: a liga escolhida, o tempo de forja, o ângulo do fio."
- "Autoridade não vem de volume visual. Vem de restrição."
- "A marca não disputa espaço com o produto — ela o apresenta."

**Casing:** sentence case em tudo — títulos, botões, rótulos, kickers. Nenhum ALL CAPS. Nenhum Title Case Em Português. Kickers ganham `letter-spacing: 0.04em` em vez de caixa alta.

**Números:** peças sempre numeradas no formato `014/40`; medidas sempre com unidade junto ("210mm", "61 HRC", "212g"); preços em "R$ 1.480".

**Rótulos de ação:** verbo + objeto, curtos. "Reservar peça", "Ver o lote 04", "Voltar ao lote". Nunca "Saiba mais!", nunca exclamação.

**Emoji:** nunca. Nenhum emoji, nenhum ícone decorativo, nenhum símbolo unicode usado como enfeite.

**Densidade:** poucos elementos por composição, muito espaço em volta. Se um bloco de texto passa de ~62 caracteres por linha, quebre a medida antes de reduzir o corpo.

---

## VISUAL FOUNDATIONS

### Cor
Seis cores, cada uma amarrada a um material real da facataria, mais duas de apoio derivadas:

| Token | Hex | Papel |
|---|---|---|
| `--carbono` | `#17150F` | fundo principal — aço enegrecido pelo fogo |
| `--carbono-alt` | `#201D16` | superfície erguida: blocos, campos, painéis |
| `--osso` | `#EDE6D6` | texto sobre escuro; fundo de peças claras |
| `--osso-dim` | `#B9B2A1` | texto secundário e leads |
| `--aco` | `#726F64` | ícones, rótulos, placeholders |
| `--prata` | `#C9C6BB` | linhas, filetes, foco — "o brilho do fio" |
| `--couro` | `#3D2A1C` | blocos de destaque, embalagem, bainha |
| `--brasa` | `#B1531F` | **acento único** — CTA, selo, detalhe |

Regras: **um só elemento em Brasa por tela.** Couro nunca é cor de texto. Aço não serve para parágrafos longos (3,8:1) — só rótulos, legendas e ícones. Estados de Brasa (`hover #C86227`, `press #94420F`, `fosca 14%`) e as três forças de filete são acréscimos deste sistema, derivados por proporção.

### Tipografia
**Fraunces** (serifa contemporânea, caráter artesanal nos traços) para display e títulos, pesos 300 e 400 — nunca negrito extremo. **Work Sans** (geométrica, neutra, legível em corpo pequeno) para interface, corpo, legendas e formulários, pesos 400/500/600. Ambas são Google Fonts e carregam por CDN em `tokens/fonts.css`; não há binários no repositório. **Nenhuma substituição de fonte foi necessária** — o guia especifica exatamente estas duas.

Escala: display 52/44 · seção 30 · título 32/22 · lead 19 · corpo 17 · rótulo 16 · caption 14.5 · kicker 14 · legenda 13. Entrelinha 1.05–1.1 em display, 1.6 em corpo. Medidas de linha: hero 11ch, lead 56ch, corpo 62ch.

### Espaçamento e layout
Página de 920px centrada, padding lateral 32px (20px em mobile), 96px no topo, 140px no rodapé. **112px entre seções**, com régua de 1px seguida de 56px antes do título. Grids de 3–4 colunas com gap 20px (32px quando o conteúdo é editorial). Cabeçalho `sticky` com filete inferior; nada mais é fixo além da camada de grão.

### Fundos e textura
Fundo Carbono liso — **sem gradiente de ambiente, nunca**. Sobre ele, uma camada de **grão fixo** (ruído fractal SVG, tile 120px) a **opacidade 0.05**, `position: fixed`, `pointer-events: none`. Nunca acima de 0.05. Os dois únicos gradientes permitidos são funcionais: proteção de texto sobre fotografia (`--protecao-baixo`/`--protecao-alto`, Carbono de 92% a 0%) e o véu de 62% sobre imagem full-bleed.

### Fotografia
Macro de produto sobre aço escovado, madeira de lei ou couro. Luz direcional dura, sombras definidas, temperatura **quente e baixa** — nunca azulada, nunca clara e difusa. Grão aceitável, saturação baixa, sem filtro colorido. **Nenhuma imagem existe nos arquivos fornecidos**: os kits usam blocos em Carbono Alt rotulados com o enquadramento pedido, e isso está sinalizado em cada tela.

### Cantos, bordas, sombra
Raio **zero** em tudo: cards, botões, campos, painéis, selos. Exceção única: `--radius-pill` para pontos de status de 5px e radio buttons. **Sem box-shadow em nenhum lugar** — elevação é trocar Carbono por Carbono Alt (`--elev-0` → `--elev-1`). O único separador do sistema é o filete de 1px em Prata a 18%, em três forças (9% para divisões internas, 18% padrão, 34% para bordas de botão secundário e painéis).

### Cards
Quatro formas, nenhuma com raio ou sombra: `filete` (moldura 1px sem padding, mídia + faixa de meta 16px 18px 20px), `erguido` (Carbono Alt + moldura, padding 22px 20px), `topo` (só filete superior — o mais leve e o mais usado no guia), `couro` (bloco em Couro, texto em Osso, padding 28px 24px).

### Movimento
Não definido no guia; derivado dos princípios Precisão e Discrição. Apenas **fade e mudança de cor** — nenhum bounce, nenhum overshoot, nenhum deslize longo. Easing padrão `cubic-bezier(0.2, 0, 0.2, 1)`. Durações 90/120/200/320ms. `--desloca-hover: 0`: **nada se move no hover**.

### Estados
- **Hover**: só cor. Brasa clareia para `#C86227`; texto Osso Dim vira Osso; filete 18% vira Prata cheia.
- **Press**: Brasa escurece para `#94420F`. Nenhum `scale`, nenhum afundamento.
- **Foco**: contorno de 1px em Prata com offset de 2px; em campos, a própria borda vira Prata.
- **Desabilitado**: 45% de opacidade e texto em Aço; sem mudança de cor de fundo.
- **Erro**: borda e mensagem em Brasa — o único uso semântico do acento fora de CTA. Não há verde nem amarelo no sistema.

### Transparência e blur
Transparência só em filetes (Prata 9/18/34%), no fundo fosco da Brasa (14%), no véu de modal (Carbono 86%) e nos gradientes de proteção. **Blur nunca** — nada de vidro fosco; a marca é opaca e mate.

---

## ICONOGRAPHY

O guia **não define iconografia** — não há set, não há fonte de ícones, não há SVGs nos arquivos. Substituição declarada: **Lucide** (`lucide-static@0.446.0`, via CDN unpkg), escolhido pelo traço fino e uniforme de 2px, cantos retos e ausência de preenchimento, que é o mais próximo da restrição do guia. Nenhum ícone foi desenhado à mão neste projeto.

- Uso pelo componente `Icon`: o SVG entra como **máscara CSS** sobre `currentColor`, então o glifo herda a cor do texto (Aço em repouso, Osso no hover) sem inline de SVG.
- Tamanhos: 13–14px junto a texto, 16px em botões e barras, 20px só em cabeçalhos. Cor padrão Aço; nunca Brasa (o acento é reservado a área cheia).
- Set usado nos kits: `search`, `shopping-bag`, `arrow-right`, `info`, `x`, `plus`, `check`, `chevron-down`.
- **Emoji: nunca.** Unicode como ícone: apenas o `×` de fechar em Toast/Tag e o triângulo do `Select`, desenhado com `clip-path` em vez de glifo.
- **Logotipo: não existe.** O guia define os limites de um futuro logo (linha única ou monograma, uma só cor, legível quando gravado a fogo) mas não o entrega. Nada foi desenhado: onde a marca apareceria, o componente `Wordmark` escreve o nome em Fraunces 300 com `letter-spacing: 0.02em`. Ver o card "Assinatura tipográfica".
- `assets/` contém um único arquivo: `textura-grao.svg`, o ruído fractal do grão de fundo (gerado por `feTurbulence`, não é ilustração).

---

## Índice

**Raiz**
- `styles.css` — ponto de entrada; só `@import`s. É o arquivo que consumidores linkam.
- `readme.md` — este documento.
- `SKILL.md` — invólucro para uso como Agent Skill.
- `thumbnail.html` — tile do sistema na home.

**`tokens/`** — `fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `borders.css` · `elevation.css` · `motion.css` · `texture.css`

**`assets/`** — `textura-grao.svg`

**`components/`** (namespace `window.FacasArtesanaisDesignSystem_ba06ad`)
- `core/` — `Button`, `Icon`, `IconButton`
- `forms/` — `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
- `surfaces/` — `Card`, `CardMeta`, `CardTitle`, `CardText`, `Badge`, `Tag`
- `navigation/` — `Tabs`
- `feedback/` — `Dialog`, `Toast`, `Tooltip`

**`guidelines/`** — 21 cards de fundação nos grupos Colors (7), Type (5), Spacing (3), Brand (6).

**`ui_kits/site-catalogo/`** — site de catálogo clicável: Home, Catálogo, Peça, Ofício, Reserva. Ver o `README.md` da pasta.

**Starting Points** — `Button` (Core), `Card` (Superfícies), `ui_kits/site-catalogo/index.html` (Site / Catálogo).

## Acréscimos intencionais
O guia é só de marca: não define componentes. O conjunto autorado aqui é o padrão mínimo de uma loja/catálogo, e cada peça segue uma regra explícita do guia.
- **Estados de Brasa, três forças de filete, tokens de movimento** — derivados; o guia dá as cores e os princípios, não os estados.
- **`Icon`/`IconButton`** — invólucro para o set Lucide substituto.
- **`Tabs`, `Dialog`, `Toast`, `Tooltip`, `Switch`, `Radio`** — necessários para o fluxo de reserva do catálogo; não aparecem no guia.
- **Conteúdo de amostra** (nomes de peças, preços, especificações em `ui_kits/site-catalogo/data.js`) — plausível, não é dado da marca. As frases de marca são citações literais do guia.

## Lacunas
Sem logotipo. Sem fotografia. Sem nome de marca. Sem binários de fonte (CDN). Sem set de ícones próprio.
