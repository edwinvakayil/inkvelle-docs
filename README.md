# inkvelle — Demo Site

The official documentation and demo site for the [`inkvelle`](https://www.npmjs.com/package/inkvelle) npm package.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the demo.

## Stack

- [Next.js 15](https://nextjs.org/) — App Router
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility styling
- [inkvelle](https://www.npmjs.com/package/inkvelle) — The package being demoed
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — Code font

## Project structure

```
app/
  layout.tsx        — Root layout, metadata
  page.tsx          — Full demo page (all sections)
  globals.css       — CSS variables, base styles, Tailwind directives

components/
  HeroHeadline.tsx      — Animated hero headline (word-by-word)
  HeroPlayground.tsx    — Interactive live playground
  AnimationGrid.tsx     — Clickable animation preview grid
  VariantShowcase.tsx   — All 12 variant rows with live Typography
  MotionConfigDemo.tsx  — Interactive motionConfig builder
  PropTable.tsx         — Full props reference table
  CodeBlock.tsx         — Syntax-highlighted code block with copy
  SectionHeader.tsx     — Reusable section title + desc
  ScrollToTop.tsx       — Scroll-to-top FAB
```

## Deploy

```bash
npm run build
npm start
```

Or deploy to Vercel in one click — it's a standard Next.js app.

## License

Demo site: MIT  
inkvelle package: © 2025 Edwin Vakayil — All rights reserved.
