# Development

## Prerequisites

- Node.js 18+ (or version in `package.json` engines)
- npm

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |

## Project layout (summary)

- `src/domain` — Types and constants (no Vue)
- `src/stores` — Pinia stores (notification, preset)
- `src/composables` — `useToast` and helpers
- `src/components` — Vue components (Builder, Toast, GlobalToastLayer)
- `src/styles` — Design tokens (CSS variables)
- `docs/` — Architecture and dev docs

See [architecture.md](./architecture.md) for full structure and data flow.
