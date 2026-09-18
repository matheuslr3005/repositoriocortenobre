# Corte Nobre

Site de facas artesanais — múltiplas páginas estáticas em HTML, com um runtime
próprio em JavaScript (`support.js`) que carrega React via CDN para renderizar
os templates. Não há etapa de build: os arquivos `.html` já são o produto final.

## Páginas

- `index.html` — home (vitrine, linhas de produto, sobre a oficina)
- `faca-de-inox.html` — catálogo de facas em aço inox
- `faca-de-carbono.html` — catálogo de facas em aço carbono
- `empresarial.html` — kits corporativos / presentes
- `sacola.html` — sacola de reserva (usa `localStorage`, sem checkout real)
- `contato.html` — contato e cuidados com a faca

## Estrutura

- `_ds/` — design system (tokens de cor/tipografia/espaçamento, `styles.css`, bundle de componentes)
- `produtos/` — fotos de produto usadas nos catálogos
- `uploads/` — assinatura/selo da marca e fotos da oficina
- `support.js`, `image-slot.js`, `cn-anim.js` — runtime de renderização e animações

## Como visualizar

Sirva a pasta com qualquer servidor estático (não abra os arquivos direto do
disco, pois o runtime faz `fetch` do próprio HTML):

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`. É necessário acesso à internet, pois a
página carrega React/ReactDOM via `unpkg.com` e as fontes via Google Fonts.

## Observação sobre imagens

Alguns espaços de imagem (a cena de forja na home e o hero da página
Empresarial) não têm foto definitiva ainda — ficaram como placeholder vazio,
para não publicar imagens de banco de imagens com marca d'água. Basta trocar
o atributo `src` do `<image-slot>` correspondente quando houver uma foto real.
