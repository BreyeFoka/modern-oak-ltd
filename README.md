# Modern Oak

**Live:** [modernoak.breyefoka.dev](https://modernoak.breyefoka.dev)

Website for Modern Oak Decoration Limited, a luxury interior design company: a showcase of their interiors, services and a private consultation request.

## Run it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # static build in dist/
```

## Images

`src/services/imageService.ts` can generate interior images with Gemini when `GEMINI_API_KEY` is set, and otherwise falls back to placeholder photos.

> **Don't set `GEMINI_API_KEY` for a public build.** `vite.config.ts` writes it into the JavaScript bundle, where anyone can read it. The live site is built without it. To generate images in production, call Gemini from a small server instead.

## Checks

GitHub Actions type-checks (`pnpm lint`) and builds on every push. There are no unit tests yet.

Built with React, Vite, TypeScript, Tailwind CSS, GSAP and Lenis. Started from a Google AI Studio export.
