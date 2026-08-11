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
cp .env.example .env
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

Authentication is stored in React context and persisted under the `eventsApiToken` key in `localStorage`. The tabbed `/auth` page registers users through `POST /api/users` and signs users in through `POST /api/auth/login`. The `/events/create` route is available only to authenticated users, while `/auth` is available only to guests.

All API calls should use `apiRequest` from `src/api/client.js`. It automatically attaches the stored token as an `Authorization: Bearer <token>` request header when a token is available.

The API client normalizes HTTP and network failures into `ApiError` instances. User-facing errors and success messages are rendered with the reusable `FeedbackMessage` component, while unknown application routes display the dedicated 404 page.
