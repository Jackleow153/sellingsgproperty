# SellingSgProperty

Exact replica of the Singapore New Launch Condos website (single-file static site).

## Current State
- 39 verified new launch condo projects
- 19 in-depth Insights articles (SEO + AEO optimized with tables, FAQs as accordions, auto-generated TOC, Article+FAQPage JSON-LD, dynamic per-article meta/OG) — latest redeploy 21 Jun 2026 after Netlify credits refresh
- Clean URLs via Netlify `_redirects` + client-side router (e.g. `/insights/which-condo-to-buy-2026`)
- GitHub → Netlify continuous deployment (push to `main` auto-deploys)
- Google Search Console verified (HTML file + meta tag)
- Custom domain `www.sellingsgproperty.com` live with HTTPS

## Files
- `index.html` — The complete self-contained website (Tailwind via CDN + Font Awesome via CDN + all JS/data inline). 39 projects + 19 full articles.
- `sitemap.xml`, `robots.txt`, `_redirects`, `netlify.toml` — SEO + deployment config.

Articles now open as a **dedicated full page** (under the Insights section) instead of a popup modal. Deep links like `#insights/post-hdb-phantom-fear` are supported, with proper browser back/forward and Escape-to-go-back.

## Ongoing Workflow for Any Future Changes (You + Grok via this chat)

**Yes — this is exactly how it works now:**

1. You tell me the change here in the chat (e.g. "add this new blog post from /path/to/new-blog.md", "update the hero text to say X", "fix a bug in the Dunearn article", "add a new project to the grid", etc.). You can paste Markdown content, describe the edit, or give me a file path.

2. I will:
   - Use tools to inspect the current code (git, read_file, grep, etc.).
   - Make the precise edits directly in your local `/Users/jackleow/sellingsgproperty/` folder (using search_replace for accuracy, or writing new files as needed).
   - Handle any supporting files (sitemap.xml, _redirects, schema in index.html, counts, README updates, etc.).
   - Test locally if useful (e.g. via http.server).

3. I will then:
   - `git add .`
   - `git commit -m "Clear message describing the change"`
   - `git push origin main`

4. Because your Netlify site (`marvelous-begonia-99ba7b`) is already connected to this GitHub repo for **continuous deployment** on the `main` branch:
   - Netlify automatically detects the push.
   - It runs a fresh build (using your `netlify.toml` — publish dir is `.`, no build command needed since it's pure static HTML/JS).
   - The update goes live on `https://www.sellingsgproperty.com/` within ~30-60 seconds.

**No manual drag-and-drop to Netlify needed ever again.** No need for you to run git commands yourself unless you want to.

This chat (with me as Grok) is your control panel for all future updates. Just describe what you want changed.

The repo is already correctly set up:
- Local path: `/Users/jackleow/sellingsgproperty/`
- Git remote: `https://github.com/Jackleow153/sellingsgproperty.git` (main)
- Netlify CD: enabled and working (Deploys from GitHub)

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

**Note:** The local folder already has a git repo initialized with the current code (if you pulled the latest from Downloads or the workspace). If starting fresh from an old zip, run the init steps first.

1. Make sure you're in the folder:
   ```bash
   cd /Users/jackleow/sellingsgproperty   # or wherever you have the folder
   ```

2. (If no .git yet) Initialize and commit:
   ```bash
   git init
   git add .
   git commit -m "SEO & AEO optimized version with 18 insights, clean URLs, sitemap, dynamic schema, GSC verification"
   ```

3. Create a **new empty repository** on GitHub.com named `sellingsgproperty` (do **not** initialize with README, .gitignore, or license).

4. Add the remote and push (tailored for your GitHub `Jackleow153`):
   ```bash
   git remote add origin https://github.com/Jackleow153/sellingsgproperty.git
   git branch -M main
   git push -u origin main
   ```

   - First time, GitHub will prompt for login (use browser auth or personal access token with `repo` scope).
   - If using SSH, change to `git@github.com:Jackleow153/sellingsgproperty.git`

5. In Netlify dashboard:
   - "Add new site" → "Import an existing project"
   - Connect GitHub → select the `sellingsgproperty` repo
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `.`
   - Netlify will auto-detect `netlify.toml` and `_redirects`

6. After first deploy, future updates are just: describe the change to me in this chat. I will edit the files, commit, and push (see the new "Ongoing Workflow for Any Future Changes" section above for the full details). Netlify will automatically rebuild and deploy.

## How to Add a New Blog Post to Insights (GitHub → Netlify workflow)

This is the recommended way now that the site deploys from GitHub.

### 1. Prepare your content
- Write the article as a Markdown file (e.g. on your Desktop).
- Typical structure we use for AEO/SEO:
  - Strong lead paragraph with `<p><strong>...</strong></p>`
  - `<h2>` and `<h3>` headings
  - Comparison or data tables (`<table>`)
  - Numbered lists / steps
  - `<div class="key-takeaway">` callout boxes (copy style from existing)
  - FAQ section turned into `<details class="faq-item">` accordions (these feed the FAQPage schema automatically)
  - Short disclaimer at the bottom
  - Suggested internal links at the end

### 2. Convert to the site's format (in `index.html`)
You will make 6 coordinated changes (use search/replace in your editor or VS Code for safety).

**A. Add the visible card (in the Insights grid)**
- Find the last card (search for the most recent article's `onclick="showArticle('post-...')"` or the comment `<!-- ===== NEW CARD 18`).
- Insert a new `<article data-category="..." class="blog-card ...">` block **immediately before** the `<!-- Newsletter CTA -->` div.
- Copy the structure from an existing card (e.g. the last one). Update:
  - `data-category` (e.g. "new-launch", "wealth", "hdb")
  - `onclick="showArticle('post-your-slug-2026')"`
  - `<img src="...">` (use a relevant image URL or picsum)
  - Chip label and class (`chip-newlaunch`, `chip-wealth`, etc.)
  - `<time>` and read time
  - `<h2>` title (short)
  - The 3-line description `<p class="...">`
  - The `datetime` attribute

**B. Add the data entry (big JS object)**
- Find the end of the ARTICLES object: search for `}; // end ARTICLES`
- Insert the new entry **before** that closing `};`
- Use this template (fill in the real content converted from your MD):

```js
  /* ======================================================
     NEW ARTICLE 19 — YOUR TITLE
  ====================================================== */
  'post-your-slug-2026': {
    title: 'Your Full Title Here',
    date: 'DD Mon 2026',
    readTime: 'XX min read',
    category: 'NEW LAUNCH',           // or WEALTH BUILDING, etc. (used in the article header chip)
    chipClass: 'chip-newlaunch',      // matches the CSS chip style
    img: 'https://...image-url...',
    linkedinUrl: 'https://www.linkedin.com/...', // optional
    body: `
      <p><strong>Your lead paragraph here with **bold** if needed.</strong></p>

      <h2>First Heading</h2>
      ... full converted HTML (tables, lists, <details class="faq-item"> for every FAQ, key-takeaway divs, etc.) ...

      <p><em>Disclaimer: ...</em></p>
    `
  },
```

**C. Update the static schema (for Google rich results)**
- In the `<head>` there is a big `<script type="application/ld+json">` ItemList.
- Add one more object at the end of the `itemListElement` array, with `"position": 19` (increment), the headline, a short description, the publish date, and the clean URL `https://www.sellingsgproperty.com/insights/your-slug`.

**D. Update the visible counts (3 places)**
- Hero text: "Read our in-depth Property Insights (18 articles)" → 19
- Sidebar: `<span class="text-white font-bold">18</span> in-depth articles`
- The big comment block at the top of the schema (and the one we added) — update the numbers and example.

**E. Add to sitemap.xml**
- Add a new `<url>` block before `</urlset>`.
- Use the clean URL, a recent `lastmod` (today or publish date), `changefreq` monthly, `priority` 0.8.

**F. Add the clean URL redirect**
- In `_redirects`, add a line before the `# Legacy hash support` section:
  ```
   /insights/your-slug-2026             /index.html   200
  ```

### 3. Test locally
```bash
cd /Users/jackleow/sellingsgproperty
python3 -m http.server 8080
```
Open http://localhost:8080 , go to Insights, click your new card. Check that it opens the full article page, TOC generates, FAQs are accordions, etc.

### 4. Deploy via GitHub (this is the magic)
```bash
git add .
git commit -m "Add new Insights article: Your Title (2026)"
git push
```

Netlify will automatically detect the push to `main`, run the (empty) build, and publish the new version. Your live site at www.sellingsgproperty.com will update within ~30-60 seconds.

### 5. After deploy
- Hard-refresh the live site.
- Re-submit the sitemap in Google Search Console.
- Request indexing for the new article URL in GSC URL Inspection tool.
- Optionally update the big JSON-LD positions if you added more than one.

**Pro tip:** Keep a folder of your source .md files (e.g. ~/Desktop/Blogs/). Convert one at a time using the template above. The conversion is mostly mechanical (MD → the HTML patterns we already use).

---

**Important (if you ever change the domain again):** Update any remaining hardcoded references. Run (replace with your real domain):

```bash
sed -i '' 's/sellingsgproperty.com/yourdomain.com/g' index.html sitemap.xml robots.txt README.md
```

Then commit & push again.

The site supports clean URLs like `https://www.sellingsgproperty.com/insights/which-condo-to-buy-2026` thanks to `_redirects` + the client-side router in `showArticle` / `initializeWebsite`.

The site is 100% static — no build step.

After deploy:
- Verify SEO files: visit `/sitemap.xml` and `/robots.txt` on your live site.
- The JS router supports both clean paths and legacy `#insights/...` links.

**If the navigation buttons or project/Insights cards are missing after deploy:**
Open the site, press F12 → Console tab, and look for red errors. We added better error handling + a visible fallback message in the latest version.

Optional: the included `_redirects` file + updated router now uses clean paths by default for better SEO.

## Connecting a Custom Domain (Namecheap + Netlify)

Your current Netlify URL is `https://marvelous-begonia-99ba7b.netlify.app`. To use your domain from Namecheap (e.g. `yourdomain.com`):

### Step 1: Add the domain in Netlify (do this first)
1. Log into Netlify → go to your site (marvelous-begonia-99ba7b).
2. In the left sidebar: **Domain management**.
3. Under "Custom domains", click **Add custom domain**.
4. Enter your domain name (e.g. `yourdomain.com` or `www.yourdomain.com`).
5. Click "Add".
6. Netlify will show you the required DNS records (usually an A record for the apex and a CNAME for www). 
   - Note the exact values (Netlify's recommended IP is typically `75.2.60.5` for A records, and the target for CNAME will be your Netlify subdomain or an alias they provide).
7. **Recommended option**: Instead of manual records, click to use **Netlify DNS** — Netlify will give you 4 nameservers (like `dns1.p03.nsone.net`). This is simpler for SSL and future changes.

### Step 2: Update DNS at Namecheap
1. Log into Namecheap → **Domain List** → find your domain → click **Manage**.
2. Go to the **Advanced DNS** tab.
3. **Delete** any existing A records for `@` or CNAME for `www` (to avoid conflicts).
4. Add the records from Netlify:

   **If using manual DNS (recommended for most):**
   - Type: **A Record**
     - Host: `@`
     - Value: `75.2.60.5` (or the IP Netlify showed you)
     - TTL: Automatic or 5 min
   - Type: **CNAME Record**
     - Host: `www`
     - Value: `marvelous-begonia-99ba7b.netlify.app` (or the exact alias Netlify gave)
     - TTL: Automatic or 5 min

   **If using Netlify DNS (easier):**
   - Go to the **Nameservers** tab in Namecheap.
   - Change from "Namecheap BasicDNS" to **Custom DNS**.
   - Enter the 4 nameservers Netlify provided (one per line).
   - Save.

5. Wait for propagation (usually 5–30 minutes, up to 48 hours). Check with https://www.whatsmydns.net/ or `dig yourdomain.com`.

### Step 3: Enable HTTPS and set primary domain in Netlify
HTTPS is usually **automatic** with Netlify (Let's Encrypt certs are provisioned for free once DNS points correctly).

1. In Netlify, go to your site dashboard.
2. Left sidebar: **Domain management**.
3. You should see your added domains listed under Custom domains.
4. Look for the **HTTPS** section (it may be a heading, or use the browser URL anchor by adding `#https` at the end, e.g. `https://app.netlify.com/projects/marvelous-begonia-99ba7b/domain-management#https` — replace the project slug with yours if different).
5. You will typically see:
   - Status like "Your project has HTTPS enabled."
   - A **Force HTTPS** toggle or button (this creates the redirect from HTTP to HTTPS).
   - Certificate details (issued by Let's Encrypt, auto-renews).
6. Click **Force HTTPS** if not already on.
7. Once the domain is verified (green check or "Active"), set `sellingsgproperty.com` (or the www version) as the **Primary domain** using the menu (three dots ⋮) next to it.
8. (Strongly recommended) Also add `www.sellingsgproperty.com` if not already, and create a redirect from the non-primary to the primary (in Domain management > Domain redirects or via _redirects file).

**If you still don't see any HTTPS section:**
- The domain must first be added under "Custom domains" (do this in the same Domain management page if you haven't already).
- DNS records must be correctly set at Namecheap and propagated (use https://www.whatsmydns.net/ to check both sellingsgproperty.com and www.sellingsgproperty.com).
- Refresh the Domain management page (hard refresh with Cmd/Ctrl + Shift + R).
- Wait 5-30 minutes after DNS changes.
- Make sure you're viewing the correct Netlify site (the one with URL containing "marvelous-begonia-99ba7b" or your project slug).
- Try appending `#https` to the Domain management URL in your browser address bar:  
  `https://app.netlify.com/projects/marvelous-begonia-99ba7b/domain-management#https`  
  (replace "marvelous-begonia-99ba7b" with your actual project slug if different – it's in the browser URL when you're on the site).

The HTTPS section usually shows the status "Your project has HTTPS enabled." and has a **Force HTTPS** toggle/button once the domain is at least partially verified.

If the section is still missing after the domain shows "Active", reply here with exactly what you see on the Domain management page (e.g. "I see the domain listed with status Pending DNS" or paste any error messages). I'll give the next precise step.

### Step 4: Update your site code for the new domain (critical for SEO)
After the domain is live:
1. In your local `sellingsgproperty` folder, run (replace `yourdomain.com` with your real domain, e.g. `sellingsgproperty.com`):
   ```bash
   sed -i '' 's/sellingsgproperty.com/yourdomain.com/g' index.html sitemap.xml robots.txt README.md
   ```
2. Also check and update any other references in the code (canonicals, schema.org JSON-LD, sitemap, robots.txt, share functions, etc.).
3. Commit and push (if using Git) or re-drag the whole folder to Netlify drop.
4. In Netlify, trigger a new deploy if needed.

### Step 5: Test
- Visit `https://yourdomain.com` and `https://www.yourdomain.com`.
- Check that HTTPS padlock shows.
- Verify structured data with Google's Rich Results Test: https://search.google.com/test/rich-results
- Submit your updated sitemap in Google Search Console.
- For Google Search Console ownership verification (recommended for stronger "more ownership" proof):
  - The file `google3a98157436f9af5a.html` is included in the project root. After deploy it will be available at `https://www.sellingsgproperty.com/google3a98157436f9af5a.html`.
  - The HTML meta tag `<meta name="google-site-verification" content="HJatZUkjl8rPDeowDSv9V9ERFRZF77nDMxaaIGYpZKU" />` is in the `<head>` of index.html.
  - You can verify with **both** the HTML file method and the HTML tag method in GSC (they give redundant ownership). Do not delete the file or the meta tag.

**Common issues:**
- Propagation delay — be patient and use DNS checkers.
- If using Netlify DNS, make sure you changed nameservers at Namecheap.
- SSL not provisioning? Make sure the DNS records are correct and the domain is verified in Netlify.
- Old domain in code will cause mixed content or SEO issues — update it!

Once done, update any links in your LinkedIn, email signatures, etc. to the new domain.

If you tell me the **exact domain name** you registered on Namecheap, I can run the sed replacements here for you and give you an updated zip/folder ready to deploy.

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
