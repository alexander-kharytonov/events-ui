# Events UI

Frontend for the Event Scheduler project. The application is built with React and Vite, styled with Tailwind CSS, and uses React Router for client-side navigation.

## Requirements

- Node.js 20 or newer
- npm
- Git

## Clone and run locally

```bash
git clone git@github.com:alexander-kharytonov/events-ui.git
cd events-ui
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Available scripts

```bash
npm run dev      # start the development server
npm run build    # create a production build
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Current project structure

- `src/components` — shared UI components such as the header and navigation
- `src/context` — temporary authentication state
- `src/layouts` — shared page layout
- `src/pages` — route-level page components

Authentication is currently stored in React context and exposes temporary `login` and `logout` methods. The `/events/create` route is available only to authenticated users, while the tabbed `/auth` page is available only to guests. This temporary state will be replaced by the API-backed authentication flow later.
