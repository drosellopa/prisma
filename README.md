# CFPI Prisma — Web institucional

Landing page institucional del **CFPI Prisma** (Centre de Formació Professional Integrada), una agrupació de sis centres de formació professional —FP Núria, Qualitat i Formació, STAF, PHRO Training, CMAP i SC2— especialitzada en la família professional de **Serveis Socioculturals i a la Comunitat**. El lloc presenta el projecte, els centres membres, l'oferta formativa, els serveis d'orientació i acreditació, i les vies de contacte.

Desenvolupat per **[STAF](https://www.stafbarcelona.com)**.

## Stack tècnic

- **[Parcel 2](https://parceljs.org)** com a bundler (zero-config, sense fitxer `.parcelrc` propi).
- **Sass/SCSS**, compilat amb `@parcel/transformer-sass`, organitzat en `base/`, `components/` i `layouts/`, amb convenció de nomenclatura BEM.
- **JavaScript** modern (mòduls ES natius, sense frameworks), transpilat amb Babel i minificat amb SWC per donar suport als navegadors definits a `targets.web.engines.browsers` (`package.json`).
- **[PostHTML](https://github.com/posthtml/posthtml)** amb `posthtml-include` per reutilitzar parcials d'HTML (p. ex. `src/views/footer.html`).
- **Fonts self-hosted** via [Fontsource](https://fontsource.org) (Montserrat i Dancing Script), importades a `_dependencies.scss` — sense dependre de Google Fonts en temps d'execució.
- **Imatges** optimitzades amb `sharp` (`@parcel/transformer-image`) i minificació/optimizació de CSS, JS i HTML en el build de producció (`lightningcss`, SWC, `htmlnano`).
- **Schema.org (JSON-LD)** i metadades Open Graph / Twitter Cards al `<head>` per a SEO.

> `@fortawesome/fontawesome-free` està instal·lat com a dependència però **no s'importa**: les icones del lloc són SVG inline per evitar carregar ~174 kB que no s'utilitzen. Vegeu el comentari a `_dependencies.scss` abans d'afegir-lo.

## Requisits

[Node.js](https://nodejs.org/) >= 18.x

## Posada en marxa

```bash
npm install
npm run dev
```

`npm run dev` aixeca un servidor local amb recàrrega en calent i recompila estils/scripts en detectar canvis dins `src/`.

## Estructura del projecte

```
src/
├── index.html              # Pàgina única
├── views/
│   └── footer.html         # Parcial inclòs via posthtml-include
└── assets/
    ├── images/
    ├── scripts/             # main.js orquestra la resta de mòduls
    ├── fonts/
    └── styles/
        ├── main.scss        # Únic punt d'entrada — importa la resta
        ├── _variables.scss  # Tokens de color, tipografia, breakpoints
        ├── _dependencies.scss
        ├── base/            # Reset, tipografia global, utilitats
        ├── layouts/         # Composició de seccions per pàgina
        └── components/      # Un fitxer SCSS per component (BEM)
```

Tot el contingut editable viu dins `src/`. El build de producció genera `dist/`, que **no s'ha d'editar a mà** ni pujar al control de versions.

## Ordres disponibles

| Ordre           | Descripció                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------- |
| `npm run dev`   | Servidor de desenvolupament amb recàrrega en calent. Ús obligatori mentre es desenvolupa.      |
| `npm run build` | Compila, minifica i optimitza el projecte a `dist/`. Pas obligatori abans de publicar.         |
| `npm run clean` | Elimina `dist/` i les carpetes de cau (`.cache`, `.parcel-cache`).                              |
| `npm run test`  | Comprovació ràpida que l'entorn respon correctament.                                            |

## Convencions del projecte

- **Accessibilitat**: es respecta `prefers-reduced-motion` a totes les animacions (hero, revelats en scroll, scroll suau), es fa servir HTML semàntic abans que ARIA, i els components interactius (menú, slider) són navegables per teclat.
- **Responsive**: mobile-first, amb breakpoints centralitzats a `_variables.scss`.
- **Rendiment**: imatges en WebP, fonts self-hosted amb `font-display: swap`, i JS/CSS només per als navegadors reals del target (`browserslist`).
- No es modifiquen fitxers fora de `src/` tret que calgui tocar la configuració del bundler.
