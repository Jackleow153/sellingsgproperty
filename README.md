# SellingSgProperty

Exact replica of the Singapore New Launch Condos website (single-file static site).

## Files
- `index.html` — The complete self-contained website (Tailwind via CDN + Font Awesome via CDN + all JS/data inline). 39 projects + 13 full articles (SEO/AEO optimized, 5 new on condo buyer psychology).

Articles now open as a **dedicated full page** (under the Insights section) instead of a popup modal. Deep links like `#insights/post-hdb-phantom-fear` are supported, with proper browser back/forward and Escape-to-go-back.

## Quick Start (local preview)

**Recommended way (best experience):**

```bash
# Open Terminal and run:
cd /path/to/sellingsgproperty
python3 -m http.server 8080

# Then open in your browser:
http://localhost:8080
```

Then click the **"Insights"** button in the top navigation to see the blog cards.

**If you just double-click `index.html` in Finder:**

- You will land on the **Home** page (39+ new launch condo project cards).
- This is normal — the site is a single-page app.
- To see the **Insights blog cards**, click the **"Insights"** button in the top nav bar (or the "Read our in-depth Property Insights" link in the hero).
- Or append `/insights` or `/insights/hdb-phantom-fear` (clean path) to the file URL.

Example: `file:///Users/YourName/.../sellingsgproperty/index.html#insights` (hash still works) or just open the folder via local server.

Note: Some advanced features (history, certain interactions) work more reliably when served over http://localhost instead of file://.

## Deploy to Netlify (one-click)

**Quick manual deploy:**
1. Drag the **entire `sellingsgproperty` folder** (not just index.html) onto https://app.netlify.com/drop
   - This ensures sitemap.xml, robots.txt, _redirects and netlify.toml are included.

**Recommended: GitHub + Netlify (for updates, history, and clean deploys)**

1. In the folder:
   ```bash
   git init
   git add .
   git commit -m "SEO & AEO optimized version"
   ```
2. Create a new repo on GitHub and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```
3. In Netlify: "Add new site" → "Import an existing project" → connect GitHub repo.
4. Build settings:
   - Build command: (leave empty)
   - Publish directory: `.`
   - Netlify will automatically use netlify.toml and _redirects.

The site is 100% static — no build step.

After deploy:
- Your clean article URLs will be like `https://yoursite.netlify.app/insights/hdb-phantom-fear`
- Verify SEO files: visit `/sitemap.xml` and `/robots.txt` on your live site.
- The JS router supports both clean paths and legacy `#insights/...` links.

**If the navigation buttons or project/Insights cards are missing after deploy:**
Open the site, press F12 → Console tab, and look for red errors. Copy the first error here. We added better error handling + a visible fallback message in the latest version so you should see a red box with instructions if something breaks. Hard-refresh (Shift + Reload) after re-deploying.

Optional: the included `_redirects` file + updated router now uses clean paths by default for better SEO.

## Notes
- All project images are loaded from external condo marketing sites (same as original).
- WhatsApp buttons link to +65 8062 1538.
- Enquiry forms are simulated (show success toasts). For real email capture on Netlify you can later wire Netlify Forms or a service like Formspree/Resend.
- This is an exact copy of the reference `index.html`.

## SEO & AEO Optimizations (for #1 rankings)
- Dynamic per-article `<title>`, meta description, Open Graph, Twitter cards, and canonical (updated in JS on `showArticle`).
- Full `Article` + `FAQPage` structured data injected per post (plus static `ItemList` + `Blog` in head).
- Auto-generated Table of Contents + anchor links on every article (improves UX, crawlability, and featured snippet chances).
- Enhanced E-E-A-T signals (author, dates, "last reviewed", real-conversation sourcing note).
- `sitemap.xml` + `robots.txt` with all 13 deep-linked article URLs (`/#insights/post-xxx`).
- Strong direct-answer leads, tables, numbered steps, 1-4 FAQs per article, key-takeaway boxes — optimized for Google AI Overviews, Perplexity, ChatGPT search, and "People Also Ask".
- All changes stay within the single-file static model (no build step required).

## Original source reference
Copied from: `/Users/jackleow/Desktop/Website-SellingSgProperty/sellingsgproperty-netlify website/uploaded to netlify/index.html`

## License / Disclaimer
For personal / demo use. All property data and articles are for illustrative purposes.
