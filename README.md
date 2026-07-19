# Wedding

A wedding invitation page built with **Vite + React** and deployable to **Cloudflare Pages**.

## Getting Started

```bash
npm install      # install dependencies
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build -> ./dist
npm run preview  # preview the production build
```

## Deploy to Cloudflare Pages

### Option A: Git integration (recommended)
1. Push this repo to GitHub/GitLab.
2. Cloudflare Dashboard → Workers & Pages → Create → Connect to Git.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - Framework preset: `Vite`

### Option B: Direct upload (wrangler)
```bash
npm install -g wrangler
npx wrangler login
npm run build
npx wrangler pages deploy ./dist --project-name=wedding-page
```

## Customizing
- Edit `src/App.jsx` to change names, dates, and details.
- Edit `src/App.css` for styling.
- Hero background image is set in `src/App.css` (`.hero` background).

## Files
- `wrangler.jsonc` — Cloudflare Pages config (`pages_build_output_dir: ./dist`)
- `public/_redirects` — SPA routing fallback to `index.html`
