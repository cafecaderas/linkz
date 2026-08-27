# linkz

A link-in-bio profile builder: a public `/[username]` profile page paired with a `/studio` editor for customizing its theme, layout, and links in real time.

## Features

- **Public profile pages** — `/[username]` renders a shareable link-in-bio page (avatar, header, background, link list) with a `not-found` state for unknown usernames.
- **Studio editor** — `/studio` is a live editor with a preview pane and control sections for profile info, avatar, layout, typography, accent color, background, button style, and overall "vibe."
- **Theming system** — curated design tokens (accents, backgrounds, button styles, density, typography) plus ready-made presets (`minimal`, `editorial`, `luxury`, `retro`, `brutalist-demo`, `neon-demo`) under [src/theme](src/theme).
- **Reducer-driven state** — profile content and theme edits (including history/undo) are managed via reducers in [src/content](src/content) and [src/theme](src/theme).

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS 4, CSS Modules |
| Icons | [lucide-react](https://lucide.dev) |
| Linting | ESLint 9 (`eslint-config-next`) |

## Project structure

```
src/
  app/
    [username]/    # public profile page + not-found state
    studio/         # studio editor page
  components/
    profile/        # profile page UI (avatar, header, link list, background)
    studio/          # studio editor UI (preview pane, context panel, section controls)
  content/          # profile content types + editor reducer
  lib/              # data access (get-profile) and seed data
  theme/            # design tokens, curated options, presets, theme reducer
```

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the home page, a profile at `/[username]`, or the editor at `/studio`.

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
