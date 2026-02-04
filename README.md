# Toast Notification

Vite + Vue 3 + TypeScript with Pinia and Jest.

## Setup

```bash
npm install
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — type-check and production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
- `npm run format` — format with Prettier
- `npm test` — run tests
- `npm run test:watch` — run tests in watch mode

---

# Development Guide

This project is developed using a feature-based branching strategy.

## Branch Strategy

- main: stable, production-ready state
- develop: active development
- feature/\*: isolated feature branches

## Commit Convention

This project follows Conventional Commits:

- feat:
- fix:
- chore:
- test:

## Development Flow

1. Create feature branch from develop
2. Implement single responsibility
3. Merge back into develop
