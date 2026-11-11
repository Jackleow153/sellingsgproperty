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
- `index.html`: homepage single-page app. **Source of truth for projects** is the `const projects = [...]` array in it.
- `data/articles.js`: **source of truth for Insights articles** (bodies are not in index.html any more).
- `scripts/build-pages.cjs`: generates the crawlable static pages. **Run it after any change to projects, articles or `assets/site.css`, and commit the output:**

  ```bash
  node scripts/build-pages.cjs        # optional: AS_OF=YYYY-MM-DD node scripts/build-pages.cjs
  ```

  It writes `project/<slug>/index.html`, `new-launch-condos/index.html`, `insights/<slug>/index.html`, `insights/index.html`, the static project cards and article metadata inside `index.html`, `sitemap.xml` and `llms.txt`.
- Hand-built pages that the build must not overwrite: `project/thomson-reserve-condo/`, `project/dunearn-house/`, `project/lentor-gardens-residences/`.
- Shared styles for static pages: `assets/site.css` (brand: porcelain `#F6F4EF`, navy `#0C1B2A`, brass `#B89B5E`; Marcellus headings, Hanken Grotesk text).
- Redirects: `_redirects`. Put 301s **above** the `/*` catch-all (first match wins).

## Project data rules

- Tabs by launch year: `year` is `"2024"`, `"2025"`, `"2026"` (launched) or `"2027"` (upcoming). Each project needs `launchSort` (YYYYMM); upcoming ones also need `launchShort` (e.g. `"Q1 2027 (est.)"`).
- When a project launches: move it to the launch year, add the verified launch result (date, units sold, average psf, source) and remove estimates.
- Upcoming projects: `startingPrice: null`, `avgPSF: null`, `unitMix: []`, `amenities: []` until the developer releases them. Mark market-report dates as "est.".
- Never reuse another project's image. No image → leave `image: ""` (upcoming cards show "Upcoming"). Prefer self-hosted WebP under ~200 KB.
- Verify facts against developer announcements, URA/HDB and reputable reports (EdgeProp, Business Times, Straits Times, Stacked, 99.co) before publishing. Projects re-verified line by line are listed in `VERIFIED_DETAIL` in the build script; only those show unit-mix tables on their static pages.

## Before you push

1. `node scripts/build-pages.cjs` ran with no errors and the output is committed.
2. Spot-check one project page and one article on a narrow (390 px) viewport: no sideways scrolling.
3. Every page keeps a unique `<title>`, meta description, canonical and valid JSON-LD.
4. Mention any goal conflicts you noticed in your summary.

## Standing rules

- Never touch the One Chuan Grove site (~/the-one-chuan-grove, the-one-chuan-grove.sg). It is a separate site. All changes happen only in the sellingsgproperty.com site.
- Always show the git diff before committing.
