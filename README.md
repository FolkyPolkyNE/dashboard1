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

Notes:

- This is a static scaffold. Replace placeholder sections with real UIs and wire to your backend/APIs as needed.
- The map uses public tiles (CartoDB dark) — check license and usage limits for production.
# dashboard1