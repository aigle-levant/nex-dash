# Copilot Instructions for nex-dash

## Project Overview

- **nex-dash** is a full-stack app with a `backend` (Node.js/Express) and a `frontend` (React/TypeScript/Vite).
- The backend exposes REST APIs for authentication and customer management.
- The frontend is a Vite-powered React SPA, organized by feature and UI components.

## Architecture & Data Flow

- **Backend**
  - Entry: `backend/index.js` sets up Express, routes, and middleware.
  - Routes: Defined in `backend/routes/`, handled by controllers in `backend/controllers/`.
  - Auth: JWT-based, with logic in `backend/middleware/auth.js` and `backend/controllers/auth.controller.js`.
  - Database: Connection logic in `backend/db/db.js`.
  - Services: Business logic in `backend/services/`.
- **Frontend**
  - Entry: `frontend/src/main.tsx` and `frontend/src/App.tsx`.
  - Pages: In `frontend/src/pages/`, each page is a route.
  - Components: Organized by domain (e.g., `dashboard/`, `auth/`, `common/`).
  - API calls: Use `frontend/src/api/authApi.ts` and `dashboardApi.ts`.
  - Types: Shared types in `frontend/src/types/`.

## Developer Workflows

- **Frontend**
  - Start dev server: `npm run dev` in `frontend/`
  - Build: `npm run build` in `frontend/`
  - Lint: `npm run lint` (see `eslint.config.js` for custom rules)
  - Type-check: `npm run type-check` (uses `tsconfig.*.json`)
- **Backend**
  - Start server: `npm start` in `backend/`
  - API endpoints: See `backend/routes/` and `controllers/`

## Project-Specific Patterns

- **Feature-based structure**: Both frontend and backend group code by domain (e.g., `auth`, `customers`, `dashboard`).
- **API helpers**: Frontend uses `utils/apiHelper.ts` for fetch logic.
- **Type safety**: Types are defined and imported from `src/types/`.
- **Custom ESLint config**: See `frontend/eslint.config.js` for advanced linting.
- **Vite config**: `frontend/vite.config.ts` customizes build/dev behavior.

## Integration Points

- **Frontend <-> Backend**: API calls from frontend `api/` modules to backend REST endpoints.
- **Auth**: JWT tokens managed in frontend, validated in backend middleware.
- **Database**: Backend uses a DB connection in `db/db.js` (DB type not specified here).

## Examples

- To add a new customer API:
  - Backend: Add route/controller/service in `backend/customers.*`
  - Frontend: Update `dashboardApi.ts` and relevant dashboard components/pages
- To add a new page:
  - Create a file in `frontend/src/pages/`, add to router in `App.tsx`

## Key Files & Directories

- `backend/index.js`, `backend/routes/`, `backend/controllers/`, `backend/services/`
- `frontend/src/pages/`, `frontend/src/components/`, `frontend/src/api/`, `frontend/src/types/`
- `frontend/eslint.config.js`, `frontend/vite.config.ts`, `frontend/tsconfig*.json`

---

_Review and update these instructions as the codebase evolves. For unclear conventions, ask maintainers for clarification._
