# New Blog Post Template

## 1. Source
Put your original .md here or link it.

## 2. Target slug (for URL and JS key)
`post-your-kebab-case-title-2026`

Clean URL will be: `/insights/your-kebab-case-title-2026`

## 3. Metadata (fill these)
- Title (full, for card h2 + schema + article page)
- Date: "DD Mon 2026"   (e.g. "20 Jun 2026")
- Read time: "XX min read"
- Category for data-category and chip text: e.g. "NEW LAUNCH", "WEALTH BUILDING", "HDB UPGRADING"
- chipClass: "chip-newlaunch" or "chip-wealth" etc. (see CSS in index.html)
- Image URL (use a good relevant one; can be external)

## 4. Body HTML (convert your MD to this)
Copy-paste into the `body: ` ` ` of the new ARTICLES entry.

Use these exact patterns for AEO/SEO:

- Lead: <p><strong>Strong opening sentence with key answer.</strong> More context...</p>

- Headings: <h2>, <h3>

- Tables: copy existing <table><thead><tr><th>...</th></tr></thead><tbody>...

- Key takeaway boxes:
<div class="key-takeaway">
  <p class="font-bold text-violet-900 mb-1">💡 2026 Key Takeaway</p>
  <p class="text-sm text-violet-800">Your insight here.</p>
</div>

- FAQs (these become the FAQ schema):
<details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
  <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
    The exact question?
    <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
  </summary>
  <p class="px-4 pb-4 text-sm text-slate-600">The direct answer here. Can include <strong>bold</strong> or lists.</p>
</details>

- End with disclaimer in <p><em>...</em></p>

## 5. After filling the template
Follow the 6 steps in the README section "How to Add a New Blog Post to Insights".

Then:
git add .
git commit -m "Add new Insights article: Your Title"
git push

Netlify deploys automatically.
