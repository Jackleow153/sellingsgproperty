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

**Note:** The local folder already has a git repo initialized with the current code (if you pulled the latest from Downloads or the workspace). If starting fresh from an old zip, run the init steps first.

1. Make sure you're in the folder:
   ```bash
   cd /Users/jackleow/sellingsgproperty   # or wherever you have the folder
   ```

2. (If no .git yet) Initialize and commit:
   ```bash
   git init
   git add .
   git commit -m "SEO & AEO optimized version with 13 insights, clean URLs, sitemap, dynamic schema"
   ```

3. Create a **new empty repository** on GitHub.com named `sellingsgproperty` (do **not** initialize with README, .gitignore, or license).

4. Add the remote and push (tailored for your GitHub `jackleow`):
   ```bash
   git remote add origin https://github.com/jackleow/sellingsgproperty.git
   git branch -M main
   git push -u origin main
   ```

   - First time, GitHub will prompt for login (use browser auth or personal access token with repo scope).
   - If using SSH, change to `git@github.com:jackleow/sellingsgproperty.git`

5. In Netlify dashboard:
   - "Add new site" → "Import an existing project"
   - Connect GitHub → select the `sellingsgproperty` repo
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `.`
   - Netlify will auto-detect `netlify.toml` and `_redirects`

6. After first deploy, future updates are just:
   ```bash
   git add .
   git commit -m "Updated insights article / SEO tweaks"
   git push
   ```
   Netlify will automatically rebuild and deploy.

**Important:** Update the placeholder domain in `sitemap.xml` and any hardcoded `sellingsgproperty.com` references to your actual custom domain once connected (see "Connecting a Custom Domain" section below). Run this command in the folder (replace `yourdomain.com`):

```bash
sed -i '' 's/sellingsgproperty.com/yourdomain.com/g' index.html sitemap.xml robots.txt README.md
```

Then re-deploy.

The site now supports clean URLs like `https://yourdomain.com/insights/hdb-phantom-fear` thanks to `_redirects` + client-side router.

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
1. Back in Netlify Domain management.
2. Click **Verify** next to your domain (it may take a minute).
3. Once verified, scroll to **HTTPS** section:
   - Toggle on **HTTPS**.
   - Toggle on **Force HTTPS**.
   - Netlify will provision a free Let's Encrypt certificate (can take a few minutes).
4. Under your domains list, click the three dots next to the domain and set it as **Primary domain**.
5. (Optional but recommended) Add both `yourdomain.com` and `www.yourdomain.com`, and set up a redirect from one to the other in Netlify (under Domain redirects).

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
