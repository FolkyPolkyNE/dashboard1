# Dark Admin Dashboard (static)

This is a minimal dark-themed admin dashboard scaffold. It includes:

- A left-hand navigation/sidebar with pages: Dashboard, Accounts, Situation Monitoring, Research & Analysis, Current Ops, Content
- A main Dashboard page with a dark-styled interactive map (Leaflet, Carto Dark tiles)
- A stats box showing: Active Accounts, Active Situations, Current R&A, Current Ops

How to run:

1. Open the workspace folder and serve the files with any static server. Example using `python`:

```bash
cd /workspaces/dashboard1
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Files:

- `index.html` – main UI
- `styles.css` – dark theme styles
- `app.js` – small SPA behavior, map initialization and demo stats

This repository has been converted into a Next.js app suitable for deployment on Vercel.

Files of interest now:

- `package.json` – project metadata and scripts
- `pages/` – Next.js pages (index, accounts, situations, research, ops, content)
- `components/` – `Layout`, `Sidebar`, `StatCard`, `Map`
- `styles/globals.css` – global dark theme styles

Local development:

```bash
cd /workspaces/dashboard1
npm install
npm run dev
```

Deploy to Vercel:

1. Install the `vercel` CLI or connect the repository via the Vercel dashboard.
2. Push your branch to GitHub and import the repo in Vercel (autodetects Next.js).

Notes:

- The `Map` component uses `react-leaflet` and client-side rendering only (no SSR).
- Replace placeholder pages with your CMS backends or APIs as needed.

Situation Monitoring — mock connectors and analysis
-------------------------------------------------
This project includes mock connectors and analysis modules to demonstrate how live feeds and automated analysis could be integrated. Files to inspect:

- `lib/mockConnectors.js` — simulated feed producers for `Twitter`, `Facebook`, `Instagram`, `BlueSky`, `YouTube`, `BreakingNews`, and `Search`. Each connector exposes `subscribeMockFeed(source, cb)` and `fetchRecentMock(source)` for initial seeding.
- `lib/analysis.js` — placeholder functions: `semanticAnalysis`, `narrativeAnalysis`, `narrativeMap`, `socialNetworkAnalysis`. Replace with real NLP/SNA tools or remote services for production.
- `components/FeedBox.js` — UI for live feed boxes that subscribe to mock connectors and emit selected items to the main collector.
- `components/AnalysisPanel.js` — runs the mock analysis over collected items and shows keywords, themes, narrative map sizes, and simple SNA summaries.

How to replace mocks with real connectors (guide):

1. Choose APIs and get credentials: Twitter/X, Facebook Graph API, Instagram Basic Display, YouTube Data API, news sources (RSS or provider APIs), and search engine APIs.
2. Implement connector adapters under `lib/` with the same interface as `mockConnectors`:
	- `subscribeFeed(source, cb)` should return an unsubscribe function. It may use websockets, long-polling, or SDKs.
	- `fetchRecent(source, count)` should return an array of recent items for seeding the UI.
3. Swap imports in `components/FeedBox.js` from the mock connector to your adapter (e.g., `import connectors from '../lib/realConnectors'`).
4. Replace `lib/analysis.js` functions with calls to your NLP/SNA services (local models, cloud endpoints, or libraries like spaCy, Hugging Face, NetworkX). Keep the function signatures so the UI works with minimal changes.
5. Securely store API keys in Vercel environment variables and access them from server-side Next.js API routes for proxying requests (do not expose secrets to the browser).
6. Consider rate limits, backoff, batching and privacy/terms-of-service for each provider.

This scaffold is intended for demonstration and prototyping only. For production, implement robust error handling, authentication, and compliance checks.

Notes:

- This is a static scaffold. Replace placeholder sections with real UIs and wire to your backend/APIs as needed.
- The map uses public tiles (CartoDB dark) — check license and usage limits for production.
# dashboard1