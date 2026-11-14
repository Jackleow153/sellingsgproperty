# CLAUDE.md — sellingsgproperty.com

Instructions for any Claude session working in this repo (Claude Code terminal, cloud sessions).

## The goal (every change is judged against this)

sellingsgproperty.com exists to get maximum exposure for Jack Leow (CEA R074023I, PropNex Realty Pte Ltd, L3008022J):

1. **Rank #1 on Google** for "new launch condo" searches and for specific condo names.
2. **Be found and linked by AI assistants** (ChatGPT, Gemini / AI Overviews, Perplexity, Claude, Copilot): AIO and GEO.
3. **Show trust**: accurate, sourced, dated facts; no hype; no fake-looking ratings or stock photos presented as real.
4. **Work well on mobile and desktop.**
5. **Load fast** (pass Core Web Vitals on mobile).

Work as a senior SEO / AIO / GEO / UX / UI specialist who understands how people click, and how wording and colour affect trust. Add proactive recommendations that serve the goal.

**If a requested feature or change conflicts with the goal, say so before building it**, explain the trade-off, and propose an alternative. Examples of conflicts: content that only appears after JavaScript runs, entry pop-ups/interstitials, heavy scripts or widgets, hotlinked third-party images, unverified or exaggerated claims, copied competitor text, blocking copy/right-click, anything that breaks a page's own URL/title/canonical.

## How the site is built

- Hosting: GitHub `main` → Netlify (auto-deploy, publish dir `.`, no build command on Netlify).
- `index.html`: homepage single-page app (markup, pre-rendered cards, head). Its main script lives in `assets/app.js`, loaded with a plain `<script src>` at the same spot (one cached file shared by the homepage and its route copies). **Source of truth for projects** is the `const projects = [...]` array in `assets/app.js`.
- `data/articles.js`: **source of truth for Insights articles** (bodies are not in index.html any more).
- `scripts/build-pages.cjs`: generates the crawlable static pages **and the homepage CSS**. Run `npm install` once (Tailwind v3 CLI), then **run it after any change to `index.html`, `assets/app.js` (projects), articles or `assets/site.css`, and commit the output:**

  ```bash
  npm install                         # once per machine
  node scripts/build-pages.cjs        # or: npm run build. Optional: AS_OF=YYYY-MM-DD node scripts/build-pages.cjs
  ```

  It writes `project/<slug>/index.html`, `new-launch-condos/index.html`, `insights/<slug>/index.html`, `insights/index.html`, `404.html`, the pre-rendered SPA routes `about/`, `contact/`, `mortgage-calculator/`, `deep-analysis/arina-east-residences/` (copies of `index.html` with their own head; never edit those copies), `assets/home.css` (compiled Tailwind) plus its `?v=` hash, `sitemap.xml` and `llms.txt`. Inside `index.html` it refreshes the static project cards, the hero tracker panel, every `<!--BUILD:VAL:key-->` number and the `?v=` hashes of `assets/home.css` and `assets/app.js`; inside `assets/app.js` it refreshes the article metadata.
- Homepage styling: Tailwind classes in `index.html` and `assets/app.js`, compiled by `tailwind.config.cjs` + `input.css` into `assets/home.css`. **Never re-add the Tailwind CDN, Font Awesome CDN or Google Fonts links.** Tailwind `violet`/`indigo` classes are remapped to the brand navy/brass in `tailwind.config.cjs`. Icons are CSS masks in `input.css` (only the icons in use; to add one, add its Font Awesome Free SVG there). Fonts are self-hosted in `assets/fonts/`.
- Condo Analysis (`/condo-analysis/` and `/condo-analysis/<id>/`): source is `data/condo-analysis.html` (scoped CSS, markup, script with research data). The build splits it into `assets/condo-analysis.css` and `assets/condo-analysis.js` (with `?v=`), fills the upcoming and post-launch lists from the `projects` array (`BUILD:SITE-UP` marker), and writes one pre-rendered page per condo file so each analysis has its own address; the script then makes it interactive and navigates without reloads. Detailed land-bid files in `NL.U` are matched by `pid`; scored launch files in `NL.L` by name. Post-launch files never show unverified units-left figures from `app.js`. Research goes in dated batches: condos with real stock left get a scored file in `NL.L` (scores follow the written rules, every figure dated and sourced); condos that are sold out, nearly sold out or have no published count get a `VSTAT` record (`out`, `early` or plain) with date and sources. Every launched and completed condo also carries a score: post-launch and completed condos without a full file get an `XSCORE` record (same five rules; completed condos skip the sales-progress points of the exit rule). Distances come from OneMap with MOE, NEA and LTA data from data.gov.sg, cross-checked with a listing or news source. Completed condos also have a price history (`HIST`: yearly average psf from URA caveats via Stacked Homes, recent prices by unit type, rents) that drives their year-by-year profit section and a sixth score, price growth, which counts for 40% of their overall score; cross-check the latest two years with SGinsite's URA transactions. The monthly check flags any launched project without a score, so an upcoming project is scored as soon as it launches. When research corrects a figure, fix `assets/app.js` too (`availableUnits`, `avgPSF`). Keep project names identical to `assets/app.js`.
- Per-route titles, descriptions and canonicals for the SPA live in `ROUTE_META` in `assets/app.js` (one place, used by the JS router and the build).
- Hand-built pages that the build must not overwrite: `project/thomson-reserve-condo/`, `project/dunearn-house/`, `project/lentor-gardens-residences/`.
- Shared styles for static pages: `assets/site.css` (brand: porcelain `#F6F4EF`, navy `#0C1B2A`, brass `#B89B5E`; Marcellus headings, Hanken Grotesk text).
- Redirects: `_redirects`. There is **no catch-all**: unknown URLs return `/404.html` with a real 404 (no soft 404s). Every public URL must be a real file; add 301s for any URL you retire.
- `/assets/*` is cached for a year: reference changed assets with a new `?v=` or a new file name.

## Project data rules

- Tabs by launch year: `year` is `"2024"`, `"2025"`, `"2026"` (launched) or `"2027"` (upcoming). Each project needs `launchSort` (YYYYMM); upcoming ones also need `launchShort` (e.g. `"Q1 2027 (est.)"`).
- When a project launches: move it to the launch year, add the verified launch result (date, units sold, average psf, source) and remove estimates.
  Also update its hand-built page and any articles about it (dated `launch-update` note at the top of an article; keep the original analysis). When you change an article, set `updated: 'D Mon YYYY'` in `data/articles.js`; when you change a hand-built page, bump its JSON-LD `dateModified`. Both feed the sitemap `lastmod`.
  A GitHub Action (`.github/workflows/check-launches.yml`, 1st of each month) runs `node scripts/check-launches.cjs` and opens a "Launch data needs updating" issue when a project is past its launch month, lacks a launch result, or its hand-built page is stale.
- Government land sites that are not sold yet live in `const landSites = [...]` in `assets/app.js` (between the `BUILD:LAND-SITES` markers). They get the "Land sites (GLS)" tab, a section at `/new-launch-condos/#gls` and pages at `/land-sites/<slug>/`. When URA/HDB awards a site, delete it from `landSites` and add it to `projects` as Upcoming (developer, land price, award date, sources); add a 301 from its `/land-sites/<slug>/` URL to the new project page.
- Upcoming projects may carry `landCost`, `landDate` and `sources: [{t, u}]` (shown on the static page). Use `launchShort: "Not announced"` with a placeholder `launchSort` (e.g. 202812) when the developer has given no date, `totalUnits: null` when no unit count is published, and `tenure: "Not stated"` when unknown. Never use marketing-agent project names until the developer confirms them.
- `mall: true` marks a condo built into the same development as a shopping mall (shown under the "Integrated with mall" tab). Ground-floor shops or a nearby mall do not count. The unit-size tabs use `totalUnits`; projects with `totalUnits: null` appear in none of them.
- Upcoming projects: `startingPrice: null`, `avgPSF: null`, `unitMix: []`, `amenities: []` until the developer releases them. Mark market-report dates as "est.".
- Never reuse another project's image. No image → leave `image: ""` (upcoming cards show "Upcoming"). Prefer self-hosted WebP under ~200 KB.
- Verify facts against developer announcements, URA/HDB and reputable reports (EdgeProp, Business Times, Straits Times, Stacked, 99.co) before publishing. Projects re-verified line by line are listed in `VERIFIED_DETAIL` in the build script; only those show unit-mix tables on their static pages.

## Before you push

1. `node scripts/build-pages.cjs` ran with no errors (no "tailwindcss not installed" warning) and the output is committed.
2. Spot-check one project page and one article on a narrow (390 px) viewport: no sideways scrolling.
3. Every page keeps a unique `<title>`, meta description, canonical and valid JSON-LD.
4. Double-check every new or changed fact (prices, psf, units sold or left, dates, land prices, distances, regions) against a second, independent source, preferably the developer's release, URA/HDB, EdgeProp, Business Times or Straits Times. Recheck the arithmetic (score workings, % gaps, sold %) and that `assets/app.js` agrees with the Condo Analysis data. If a fact has only one source or sources disagree, say so on the page and in your summary.
5. Mention any goal conflicts you noticed in your summary.

## Standing rules

- Never touch the One Chuan Grove site (~/the-one-chuan-grove, the-one-chuan-grove.sg). It is a separate site. All changes happen only in the sellingsgproperty.com site.
- Always show the git diff before committing.
