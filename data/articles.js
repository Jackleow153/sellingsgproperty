/*
 * SOURCE OF TRUTH for all Insights articles.
 * Edit or add articles here, then run:  node scripts/build-pages.cjs
 * The build writes /insights/<slug>/index.html for each article and refreshes the
 * lightweight ARTICLES metadata block inside index.html (no article bodies are shipped on the homepage).
 */
const ARTICLES = {

  /* ======================================================
     ARTICLE 1 — HDB PHANTOM FEAR
  ====================================================== */
  'post-hdb-phantom-fear': {
    title: 'HDB Upgraders: Are You Trapped by Your Own "Phantom Fear"? (2026 Edition)',
    date: '21 March 2026',
    readTime: '8 min read',
    category: 'HDB UPGRADERS',
    chipClass: 'chip-hdb',
    img: null,
    linkedinUrl: 'https://www.linkedin.com/pulse/hdb-upgraders-you-trapped-your-own-phantom-fear-2026-edition-leow-euagc',
    body: `
      <p><strong>Yes — most HDB upgraders in Singapore are held back by "Phantom Fear" rather than real financial barriers when considering new launch condos in 2026.</strong> If you have a combined household income of $12,000–$15,000 and equity from your flat, the numbers for upgrading to a private condo often work in your favour.</p>

      <p>Every week I speak with HDB owners who have run the calculations but still hesitate. The invisible force? Phantom Fear — a set of exaggerated risks that feel real but dissolve under data. This 2026 guide replaces fear with clear numbers on new launch condos, HDB upgrading, and buyer psychology.</p>

      <h2>What Is Phantom Fear in HDB Upgrading?</h2>
      <p>Phantom Fear describes the emotionally charged assumptions that prevent rational Singaporeans from making sound property moves. The top five in 2026:</p>
      <ol>
        <li><strong>Mortgage Fear:</strong> "I can't afford $3,000–$4,000/month." (Reality: TDSR allows $6,600+ on $12k–$15k income.)</li>
        <li><strong>Market Crash Fear:</strong> "Prices will drop after I buy." (Singapore residential has shown positive returns over every 10-year period historically.)</li>
        <li><strong>HDB Sale Fear:</strong> "I won't get a good price for my flat." (2025–2026 resale COVs remain strong in mature estates.)</li>
        <li><strong>SSD Lock-in Fear:</strong> "I'll be stuck for 3 years." (SSD only applies if you sell the new property early — not relevant for long-term holders.)</li>
        <li><strong>Family Influence Fear:</strong> "My parents say it's too risky." (Many parents bought HDBs decades ago for far less and don't grasp today's leverage opportunities.)</li>
      </ol>

      <h2>HDB to New Launch Condo Math: 2026 Example</h2>
      <p>Take a 5-room HDB in Bishan bought for $500k in 2017, now worth ~$750k. After clearing the loan (~$150k) and CPF accrued interest (~$80k), you net approximately <strong>$520,000</strong> in proceeds.</p>

      <table>
        <thead><tr><th>Item</th><th>Amount</th></tr></thead>
        <tbody>
          <tr><td>HDB resale proceeds</td><td>$750,000</td></tr>
          <tr><td>Less: outstanding mortgage</td><td>- $150,000</td></tr>
          <tr><td>Less: CPF OA refund + interest</td><td>- $80,000</td></tr>
          <tr><td><strong>Net cash + CPF for upgrade</strong></td><td><strong>$520,000</strong></td></tr>
        </tbody>
      </table>

      <p>This easily covers a 25% downpayment on a $1.3M–$1.6M new launch condo (e.g. projects like <a href="https://www.chuanpark.sg" target="_blank" rel="noopener">Chuan Park</a> in D19 or similar family-oriented launches). Monthly mortgage at 3.5% over 25 years lands around $3,100–$3,800 — well within TDSR limits for most upgraders.</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">💡 2026 Key Takeaway for HDB Upgraders</p>
        <p class="text-sm text-violet-800">On $12k–$15k household income, you have ~$6,600–$8,250 debt servicing capacity. A new launch condo mortgage of $3,100–$4,285 is comfortable. Delaying widens the price gap between HDB resale and private condos every year.</p>
      </div>

      <h2>Why Waiting Costs More in the New Launch Market</h2>
      <p>The HDB-to-private price gap has widened significantly. In 2020 the spread was ~$570k in many estates; by 2026 it often exceeds $750k. New launch condos in growth corridors continue to see strong demand and developer incentives.</p>

      <h2>5 Practical Steps to Upgrade from HDB to New Launch Condo</h2>
      <ol>
        <li><strong>Get an in-principle approval (IPA)</strong> from a mortgage broker today — it takes 1 day and removes the biggest "what if".</li>
        <li><strong>Obtain 2–3 valuations</strong> for your HDB (free from major agencies) to know your exact net proceeds.</li>
        <li><strong>Shortlist 2–3 new launches</strong> in D19, D22 or D23 for value, or D9/D10 for premium. Review unit mix and <a href="https://www.ura.gov.sg" target="_blank" rel="noopener">URA master plans</a> for future growth.</li>
        <li><strong>Book during VVIP or launch</strong> — developers often give 6–8 weeks from OTP to exercise, giving you time to sell your HDB.</li>
        <li><strong>List your HDB only after securing the condo</strong> — this eliminates the gap risk that causes most upgrader anxiety.</li>
      </ol>

      <h2>Frequently Asked Questions About HDB Upgrading to Private Condos</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Can I buy a new launch condo before selling my HDB in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes for Singapore Citizens buying their first private property. You must sell the HDB within 6 months of the condo's TOP or purchase (whichever earlier). Many upgraders successfully time the sale during the 8-week OTP window. See the official rules on <a href="https://www.iras.gov.sg" target="_blank" rel="noopener">IRAS</a>.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How long after MOP can I upgrade to a new launch condo?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">5 years from key collection for BTO or purchase date for resale HDB. After MOP you can buy while still owning the HDB, but must dispose of the HDB within the 6-month TOP window to avoid ABSD on the private property.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Will ABSD apply when moving from HDB to my first private condo?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">A Singapore Citizen pays 20% ABSD upfront if buying the condo first, but can claim remission (full clawback) by selling the HDB within 6 months. Selling the HDB first then buying the new launch condo with zero ABSD is the cleanest path for most families.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What happens to my CPF when I sell the HDB to buy a new launch?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">CPF (plus 2.5% p.a. interest) is refunded to your OA from sale proceeds before you receive cash. That money is immediately available again for the 20% downpayment (5% cash + 15% CPF) on your new launch condo. It never disappears.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/resolution-2026" onclick="showArticle('post-resolution-2026'); return false;" class="underline hover:text-violet-700"><strong>Why Buying a Private Property Should Be Your #1 Resolution for 2026 (Especially If You\'re Scared)</strong></a></p>
      <p>2. <a href="/insights/first-condo-anxiety" onclick="showArticle('post-first-condo-anxiety'); return false;" class="underline hover:text-violet-700"><strong>First Private Condo Anxiety: The Hidden Psychology Costing Singapore Upgraders Millions in 2026</strong></a></p>
      <p>3. <a href="/insights/hdb-sell-signs" onclick="showArticle('post-hdb-sell-signs'); return false;" class="underline hover:text-violet-700"><strong>5 Signs Your HDB Flat Is Ready to Sell — And How to Time It Right in 2026</strong></a></p>
      <p>4. <a href="/insights/district-guide" onclick="showArticle('post-district-guide'); return false;" class="underline hover:text-violet-700"><strong>Which Singapore District Should You Buy In? The 2026 Growth Map</strong></a></p>
      <p>5. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>
      <p>6. <a href="/mortgage-calculator/" class="underline hover:text-violet-700"><strong>Check your affordability with our Singapore Mortgage Calculator</strong></a></p>
    `
  },

  /* ======================================================
     ARTICLE 2 — ABSD FOREIGNERS
  ====================================================== */
  'post-absd-foreigners': {
    title: '60% ABSD for Foreigners: Is Singapore Property Still Investable in 2026?',
    date: '7 March 2026',
    readTime: '7 min read',
    category: 'FOREIGN BUYERS',
    chipClass: 'chip-absd',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/pulse/60-absd-foreigners-singapore-property-still-investable-jack-leow-sxlac',
    body: `
      <p><strong>For most non-FTA foreigners, buying residential new launch condos in Singapore in 2026 is extremely challenging due to the 60% ABSD.</strong> However, the market remains investable through commercial properties (0% ABSD), shophouses, and strategic pathways like PR or corporate structures for the right high-net-worth buyer.</p>

      <p>In April 2023 Singapore raised ABSD for foreigners to 60%. Two years later, headlines still say the door is closed — but smart capital is finding creative entry points, especially via new launch commercial assets and established developer projects.</p>

      <h2>ABSD Rates for Foreign Buyers in 2026 (Quick Reference)</h2>
      <p>Additional Buyer's Stamp Duty (ABSD) stacks on top of standard BSD. Here are the current effective rates for residential property:</p>

      <table>
        <thead><tr><th>Buyer Profile</th><th>1st Property</th><th>2nd Property</th><th>3rd+</th></tr></thead>
        <tbody>
          <tr><td>Singapore Citizen</td><td>0%</td><td>20%</td><td>30%</td></tr>
          <tr><td>Singapore PR (1st property)</td><td>5%</td><td>30%</td><td>35%</td></tr>
          <tr><td>Foreigner (most)</td><td>60%</td><td>60%</td><td>60%</td></tr>
          <tr><td>US / Swiss / Icelandic / Norwegian (FTA)</td><td>0%</td><td>20%</td><td>30%</td></tr>
        </tbody>
      </table>

      <p>On a $2M new launch condo, a typical foreigner pays $1.2M ABSD — pushing the all-in cost to $3.2M. This is why residential new launches are largely the domain of locals and PRs in 2026.</p>

      <h2>Who Still Gets 0% or Low ABSD on Residential?</h2>
      <p>Only nationals of FTA countries (US, Switzerland, Iceland, Liechtenstein, Norway) enjoy Singapore Citizen treatment on their first residential purchase. Everyone else from China, India, Indonesia, Malaysia, UK, Australia, Hong Kong etc. pays the full 60%.</p>

      <h2>The Best Workaround: Commercial Property &amp; Shophouses (0% ABSD)</h2>
      <p>The smartest foreign capital in 2026 is moving into commercial assets, which carry <strong>0% ABSD for all nationalities</strong>. Popular options include:</p>
      <ul>
        <li><strong>Conservation shophouses</strong> in Tanjong Pagar, Chinatown or Joo Chiat — strong 3–4.5% gross yields + capital growth. See examples from developers active in mixed-use new launches.</li>
        <li><strong>Strata offices</strong> in the CBD — 3.5–4% yields, liquid, low management.</li>
        <li><strong>Industrial / logistics units</strong> — higher 5–6% yields for those comfortable with the asset class.</li>
      </ul>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-2">🏢 2026 Foreign Buyer Playbook</p>
        <p class="text-sm text-violet-800">If you are non-FTA, start with commercial or shophouse opportunities. Residential new launch condos only make sense if you plan to become a PR or citizen, or are buying ultra-luxury for lifestyle (where price elasticity is higher). Projects like <a href="https://theaureacondo.com.sg" target="_blank" rel="noopener">Aurea</a> show the premium residential segment still attracts serious capital despite ABSD.</p>
      </div>

      <h2>Psychology of the 60% ABSD Buyer</h2>
      <p>Loss aversion is powerful. The 60% "tax" feels like an immediate 60% loss, even though it is a one-time cost on an appreciating asset in a safe jurisdiction. UHNW buyers reframe it as the price of entry into one of Asia's most stable wealth stores.</p>

      <h2>Actionable Strategies for Foreign Buyers 2026</h2>
      <ol>
        <li><strong>FTA nationals:</strong> Move quickly on D9/D10 or D19 new launch condos for 2–3% yields + capital upside.</li>
        <li><strong>Non-FTA:</strong> Prioritise shophouses and commercial strata. Speak to developers with integrated commercial components in their new launches.</li>
        <li><strong>PR pathway:</strong> Time your property purchase with your PR application — PRs pay only 5% ABSD on the first residential property.</li>
        <li><strong>Long-term hold:</strong> The ABSD percentage of total value drops every year the asset appreciates. 10+ year horizons make the hit much smaller in relative terms.</li>
      </ol>

      <h2>Frequently Asked Questions — ABSD &amp; Foreign Buyers 2026</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is there any legal way for a foreigner to avoid 60% ABSD on a new launch condo?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">No reliable loopholes. IRAS actively targets avoidance schemes. The legitimate routes are FTA nationality, becoming a Singapore PR/citizen, or buying commercial property instead. Always verify with a qualified solicitor before any structure.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Can foreigners buy shophouses in new launch mixed-use developments?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes. Foreigners can freely purchase commercial shophouses and strata-titled commercial units with 0% ABSD. In mixed-use new launches, the commercial component is usually clearly separated and ABSD-free.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How much ABSD do Singapore PRs pay on their first condo?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Only 5% ABSD on the first residential property as a PR. On a $1.5M new launch condo that is a $825,000 saving versus a foreigner. This is why many foreign investors pursue PR status and property strategy in parallel.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/decoupling" onclick="showArticle('post-decoupling'); return false;" class="underline hover:text-violet-700"><strong>The Decoupling Guide 2026: Legal Costs vs. ABSD Savings</strong></a></p>
      <p>2. <a href="/insights/new-launch-vs-resale" onclick="showArticle('post-new-launch-vs-resale'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo in 2026: Which Should You Buy?</strong></a></p>
      <p>3. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>
      <p>4. <a href="/insights/cpf-private" onclick="showArticle('post-cpf-private'); return false;" class="underline hover:text-violet-700"><strong>How Much CPF Can You Use for a Private Property in Singapore? (2026 Guide)</strong></a></p>
      <p>5. <a href="/insights/district-guide" onclick="showArticle('post-district-guide'); return false;" class="underline hover:text-violet-700"><strong>Which Singapore District Should You Buy In? The 2026 Growth Map</strong></a></p>
    `
  },

  /* ======================================================
     ARTICLE 3 — DECOUPLING
  ====================================================== */
  'post-decoupling': {
    title: 'The Decoupling Guide 2026: Legal Costs vs. ABSD Savings',
    date: '27 February 2026',
    readTime: '9 min read',
    category: 'DECOUPLING',
    chipClass: 'chip-decouple',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/pulse/decoupling-guide-2026-legal-costs-vs-absd-savings-calculator-leow-6x4fc',
    body: `
      <p><strong>Decoupling can save $200k–$350k in ABSD on a second property in 2026, but only makes sense above ~$1.2M–$1.5M purchase price.</strong> Below that threshold, legal fees, BSD on the transfer, and refinancing penalties usually wipe out the benefit.</p>

      <p>Done right, property decoupling is one of the highest-ROI legal tax strategies available to married Singaporean couples. Done wrong, it creates unnecessary costs and relationship strain. Here's the 2026 data-driven guide.</p>

      <h2>What Exactly Is Property Decoupling?</h2>
      <p>Decoupling is the legal transfer of one spouse's share in a jointly owned property to the other spouse. After the transfer, one spouse owns 100% and is treated as a "first-time buyer" for ABSD purposes on any future purchase.</p>

      <h2>2026 Decoupling Cost vs Benefit Calculator</h2>
      <p>Here are realistic all-in costs (BSD + legal + valuation + possible penalty) versus the 20% ABSD saved on the second property:</p>

      <table>
        <thead><tr><th>2nd Property Price</th><th>ABSD Saved (20%)</th><th>Est. Total Decoupling Cost</th><th>Net Benefit</th></tr></thead>
        <tbody>
          <tr><td>$800,000</td><td>$160,000</td><td>~$40,000–$50,000</td><td class="text-emerald-700 font-bold">~$110k–$120k</td></tr>
          <tr><td>$1,200,000</td><td>$240,000</td><td>~$55,000–$65,000</td><td class="text-emerald-700 font-bold">~$175k–$185k</td></tr>
          <tr><td>$1,500,000</td><td>$300,000</td><td>~$65,000–$75,000</td><td class="text-emerald-700 font-bold">~$225k–$235k</td></tr>
          <tr><td>$2,000,000</td><td>$400,000</td><td>~$75,000–$90,000</td><td class="text-emerald-700 font-bold">~$310k–$325k</td></tr>
        </tbody>
      </table>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">⚖️ 2026 Rule of Thumb</p>
        <p class="text-sm text-violet-800">Decoupling is usually worthwhile when your second property (often a new launch condo) is $1.2M+. Below $1M the costs and risks often exceed the ABSD savings. Always run exact numbers with your solicitor and banker.</p>
      </div>

      <h2>Step-by-Step: How to Decouple in 2026</h2>
      <ol>
        <li>Confirm both parties have passed MOP (if HDB) or are eligible to transfer the private property share.</li>
        <li>Obtain an independent market valuation (required by IRAS).</li>
        <li>Engage two separate solicitors (one for each spouse).</li>
        <li>Refinance the existing loan into the retaining spouse's sole name (TDSR must be satisfied on one income).</li>
        <li>Complete the transfer and pay BSD on the 50% share being transferred.</li>
        <li>The "freed" spouse can now buy a second property (including new launch condos) as a first-time buyer with 0% or 20% ABSD depending on citizenship.</li>
      </ol>

      <h2>Common Developer Projects Where Decoupling Makes Sense</h2>
      <p>Couples targeting larger family units in projects like <a href="https://bagnallhauscondo.com.sg" target="_blank" rel="noopener">Bagnall Haus</a> or <a href="https://www.theorie.sg" target="_blank" rel="noopener">The Orie</a> frequently use decoupling when the second property exceeds $1.5M.</p>

      <h2>Frequently Asked Questions — Decoupling in 2026</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Can I decouple my HDB flat to buy a new launch condo?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes, after the 5-year MOP. One spouse transfers their 50% share to the other. The freed spouse can then buy a private property (new launch or resale) as their first private purchase without ABSD (subject to selling the HDB within the required window).</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Does the retaining spouse need to qualify for the full loan alone after decoupling?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes. The bank will assess TDSR on the retaining spouse's income only. If they cannot service the existing loan solo, decoupling is not feasible without selling or downsizing first.</p>
      </details>

      <h2>The 99-1 Split Problem — IRAS Is Watching</h2>
      <p>Some couples attempt "decoupling-lite" by re-owning the first property in a 99-1 split (99% to one spouse, 1% to the other), then the 1% holder buys the second property as a "first-time buyer." This was popular circa 2020–2022 but IRAS has since issued several warnings and has assessed additional duties and penalties in cases where they deem this to be stamp duty avoidance.</p>
      <p><strong>Avoid 99-1 splits designed purely to circumvent ABSD.</strong> The legitimate approach is full decoupling — transfer the full 50% share from one spouse to the other.</p>

      <h2>Step-by-Step: How Decoupling Works</h2>
      <ol>
        <li><strong>Confirm eligibility.</strong> Both parties must have passed MOP (if HDB) or be willing to fully transfer a private property share. Existing mortgage must be assessed.</li>
        <li><strong>Get an independent valuation.</strong> The transfer price must reflect market value.</li>
        <li><strong>Engage separate solicitors</strong> for buyer and seller (cannot use the same lawyer).</li>
        <li><strong>Refinance the mortgage</strong> into one name only. The receiving spouse must qualify for the full loan on their own income (TDSR applies).</li>
        <li><strong>Complete the transfer.</strong> BSD is payable by the "buyer" (receiving spouse) based on the value of the 50% share transferred.</li>
        <li><strong>The "freed" spouse</strong> can now purchase a new property as a first-time buyer (0% ABSD for SC on first property).</li>
      </ol>

      <h2>Frequently Asked Questions</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Can I decouple my HDB flat?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes, HDB flats can be decoupled, but only after the 5-year MOP and only between spouses listed on the flat. There is an additional restriction: after decoupling, the HDB must remain owned by an eligible Singapore Citizen or PR. The process is the same as private property — one spouse transfers their 50% share to the other, making the "freed" spouse eligible to buy a private property without ABSD (as their first private purchase).</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is the ABSD rate for a second property purchase in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">For Singapore Citizens buying their second residential property, the ABSD rate is 20% of the purchase price. For Singapore Permanent Residents, it is 30%. For foreigners, it remains at 60% regardless of how many properties they own. These rates have been in effect since April 2023.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          If I decouple, does my spouse need to qualify for the full mortgage alone?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes. After decoupling, the property must be refinanced entirely in the name of the spouse who is retaining it. That spouse must qualify for the full loan amount on their own income, subject to TDSR (55% of gross monthly income) and MSR (30% for HDB/EC) limits. If the retaining spouse cannot service the loan alone, decoupling may not be feasible without selling and downsizing first.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/absd-foreigners" onclick="showArticle('post-absd-foreigners'); return false;" class="underline hover:text-violet-700"><strong>60% ABSD for Foreigners: Is Singapore Property Still Investable in 2026?</strong></a></p>
      <p>2. <a href="/insights/cpf-private" onclick="showArticle('post-cpf-private'); return false;" class="underline hover:text-violet-700"><strong>How Much CPF Can You Use for a Private Property in Singapore? (2026 Guide)</strong></a></p>
      <p>3. <a href="/insights/new-launch-vs-resale" onclick="showArticle('post-new-launch-vs-resale'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo in 2026: Which Should You Buy?</strong></a></p>
      <p>4. <a href="/insights/hdb-sell-signs" onclick="showArticle('post-hdb-sell-signs'); return false;" class="underline hover:text-violet-700"><strong>5 Signs Your HDB Flat Is Ready to Sell — And How to Time It Right in 2026</strong></a></p>
      <p>5. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>
      <p>6. <a href="/mortgage-calculator/" class="underline hover:text-violet-700"><strong>Check your affordability with our Singapore Mortgage Calculator</strong></a></p>
    `
  },

  /* ======================================================
     ARTICLE 4 — PRIVATE PROPERTY RESOLUTION
  ====================================================== */
  'post-resolution-2026': {
    title: 'Why Buying a Private Property Should Be Your #1 Resolution for 2026 (Especially If You\'re Scared)',
    date: '1 January 2026',
    readTime: '10 min read',
    category: 'WEALTH BUILDING',
    chipClass: 'chip-wealth',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/pulse/why-buying-private-property-should-your-top-resolution-jack-leow-c89ac',
    body: `
      <p><strong>Every year, thousands of Singaporean families have the financial means to buy a private property — and don't.</strong> Not because they can't afford it. But because they're afraid. This post is for those people. If that's you, I want you to know that I understand the fear — and I also want to show you why 2026 is the year to face it.</p>

      <blockquote>"The best time to buy Singapore property was 10 years ago. The second best time is today." — Every property investor who ever got rich in Singapore.</blockquote>

      <h2>Why Are Singaporeans Afraid of Private Property?</h2>
      <p>The fear usually clusters around three things:</p>
      <ol>
        <li><strong>Mortgage commitment:</strong> "What if I lose my job? What if interest rates spike?"</li>
        <li><strong>Market timing:</strong> "What if prices drop right after I buy?"</li>
        <li><strong>Debt aversion:</strong> "I was raised to be debt-free. Taking a $1M loan feels wrong."</li>
      </ol>
      <p>All three fears are understandable. None of them are good reasons to stay out of the Singapore private property market indefinitely.</p>

      <h2>Singapore's Property Market: Structural Reasons It's Different</h2>
      <p>Unlike most property markets, Singapore's residential market has a set of structural supports that make sustained crashes extremely unlikely:</p>
      <ul>
        <li><strong>Land scarcity:</strong> Singapore is 734 km². It cannot expand. Every new development requires reclamation or densification.</li>
        <li><strong>Immigration policy:</strong> Singapore selectively admits ~30,000–50,000 new PRs and citizens each year — creating sustained housing demand.</li>
        <li><strong>No capital gains tax:</strong> Property appreciation is untaxed. This is rare globally and makes Singapore extremely attractive to capital.</li>
        <li><strong>Government cooling measures:</strong> The very existence of ABSD, TDSR, and MOP shows that the government actively manages the market to prevent bubbles. They will not let it collapse.</li>
        <li><strong>Strong fundamentals:</strong> Singapore's GDP per capita ($85,000+), low unemployment (2.1%), and institutional rule of law underpin property values.</li>
      </ul>

      <h2>Why 2026 Is a Particularly Good Year</h2>
      <p>Beyond the structural case, 2026 has specific tailwinds:</p>
      <ul>
        <li><strong>Interest rates moderating.</strong> After the 2022–2023 rate shock (SORA peaked near 4%), rates have moderated. Most bank rates for 2-year fixed packages are now 2.8–3.2%, improving affordability.</li>
        <li><strong>HDB resale at or near peak.</strong> HDB flat prices have been appreciating strongly. Many owners have substantial equity they can deploy into private property before the HDB-to-private price gap widens further.</li>
        <li><strong>New launch supply pipeline thinning.</strong> The en bloc cycle of 2017–2019 created a supply of new launches. That pipeline is thinning, and fewer new sites are being released by URA. Constrained supply in 2027–2028 will push prices up.</li>
        <li><strong>Singapore as a global safe haven.</strong> Geopolitical instability in the region continues to drive HNWI capital to Singapore — supporting prices in the mid-market, not just ultra-luxury.</li>
      </ul>

      <h2>The Mortgage Math: It's Not as Scary as You Think</h2>
      <p>Let's take a household with combined income of $12,000/month. Under TDSR rules, you can commit up to 55% of gross income = $6,600/month to all debt repayments.</p>
      <p>Assuming you have no other debts, at 3% interest over 25 years, $6,600/month can service a loan of approximately <strong>$1,400,000</strong>. With a 25% downpayment, that means you can afford a property worth up to ~$1.87M.</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">📊 Affordability Reality Check</p>
        <p class="text-sm text-violet-800">A $12,000/month household can comfortably afford a $1.5M–$1.8M new launch condo in 2026. That covers a 2BR or 3BR unit in D19 (Serangoon), D22 (Jurong), or D23 (Bukit Timah corridor) — all growth districts with strong rental demand and MRT connectivity.</p>
      </div>

      <h2>The Real Risk Is Staying Out</h2>
      <p>People focus on the risk of buying. They rarely calculate the risk of not buying. Here's what "doing nothing" has cost Singaporeans over the last decade:</p>
      <ul>
        <li>A $900,000 condo in D19 in 2015 is now worth ~$1.6M — a gain of $700,000 untaxed.</li>
        <li>A 4-room HDB in Bishan for $480,000 in 2015 is now worth ~$720,000 — but the gap to private has grown from $400K to $700K+.</li>
        <li>Meanwhile, $900,000 in a savings account at 2% has grown to ~$1.07M — a $170,000 gain against a $700,000 property gain.</li>
      </ul>
      <p>The cost of inaction compounds. Every year you wait, you need more capital and more income to buy the same property.</p>

      <h2>Your 2026 Action Plan</h2>
      <ol>
        <li>Calculate your true affordability (use our free WhatsApp assessment).</li>
        <li>Check your CPF OA balance — it's likely your largest asset after your HDB equity.</li>
        <li>Get a mortgage in-principle approval. It's free and takes one day.</li>
        <li>Visit 2–3 show flats. Feel what you can afford. The numbers become real.</li>
        <li>Make a decision with data, not with fear.</li>
      </ol>

      <h2>Frequently Asked Questions</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is the minimum income to afford a private property in Singapore in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">There is no official minimum income, but the TDSR (Total Debt Servicing Ratio) limit of 55% governs how much you can borrow. A single person earning $6,000/month can typically borrow up to ~$700,000 (assuming no other debts). Combined with CPF and cash savings, this could support a property purchase of ~$900,000–$1,000,000 — enough for a studio or 1BR unit in many growth districts.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Will Singapore property prices fall in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">While no one can predict property prices with certainty, Singapore's structural factors (land scarcity, immigration demand, no capital gains tax, government cooling measures as a safety valve) make a sustained crash historically unprecedented. URA data shows the private residential price index has risen in 8 out of the last 10 years. Short-term fluctuations are normal; long-term fundamentals remain strong.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is a new launch condo a good investment for first-time private property buyers?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">New launch condos offer several advantages for first-time buyers: progressive payment scheme (you only pay 20% upfront, then in tranches linked to construction milestones), fresh facilities, longer lease remaining, and developer incentives such as VVIP discounts, stamp duty absorption, or furnishing packages. The main drawback is that you can't immediately rent it out — but if you're buying to live in or holding for 5+ years, new launches in growth districts have historically delivered strong capital appreciation.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Are new launch condos better than resale condos for wealth building in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">For 5–10 year holds in transforming precincts (RCR/CCR with MRT/schools), new launch condos have historically delivered stronger capital appreciation from launch price through TOP and early resale. Resale in mature estates offers more predictable but often slower appreciation plus immediate yield. Model both with live URA data for your budget and ABSD situation.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/hdb-phantom-fear" onclick="showArticle('post-hdb-phantom-fear'); return false;" class="underline hover:text-violet-700"><strong>HDB Upgraders: Are You Trapped by Your Own "Phantom Fear"? (2026 Edition)</strong></a></p>
      <p>2. <a href="/insights/first-condo-anxiety" onclick="showArticle('post-first-condo-anxiety'); return false;" class="underline hover:text-violet-700"><strong>First Private Condo Anxiety: The Hidden Psychology Costing Singapore Upgraders Millions in 2026</strong></a></p>
      <p>3. <a href="/insights/new-launch-vs-resale" onclick="showArticle('post-new-launch-vs-resale'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo in 2026: Which Should You Buy?</strong></a></p>
      <p>4. <a href="/insights/cpf-private" onclick="showArticle('post-cpf-private'); return false;" class="underline hover:text-violet-700"><strong>How Much CPF Can You Use for a Private Property in Singapore? (2026 Guide)</strong></a></p>
      <p>5. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>
      <p>6. <a href="/mortgage-calculator/" class="underline hover:text-violet-700"><strong>Check your affordability with our Singapore Mortgage Calculator</strong></a></p>
    `
  },

  /* ======================================================
     ARTICLE 5 — NEW LAUNCH VS RESALE
  ====================================================== */
  'post-new-launch-vs-resale': {
    title: 'New Launch vs Resale Condo in 2026: Which Should You Buy?',
    date: '14 February 2026',
    readTime: '7 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/newsletters/find-your-treasure-7410244299805757440/',
    body: `
      <p><strong>New Launch Condos vs Resale Condos in Singapore 2026: which should you buy?</strong> Short answer — new launch condos win for most HDB upgraders with a 5+ year horizon thanks to progressive payments (lower upfront cash), brand new facilities and first-mover pricing in growth areas. Resale condos win if you need to move in now or want immediate rental yield. There is no universal winner — only the right choice for your timeline, ABSD position and cash flow. Full data-driven breakdown below.</p>

      <h2>Key Differences at a Glance</h2>
      <table>
        <thead><tr><th>Factor</th><th>New Launch</th><th>Resale</th></tr></thead>
        <tbody>
          <tr><td>Payment</td><td>Progressive (20% → instalments)</td><td>Full upfront (25% down)</td></tr>
          <tr><td>Immediate occupation</td><td>No (3–5 years to TOP)</td><td>Yes</td></tr>
          <tr><td>Rental income</td><td>No (until TOP)</td><td>Yes (immediate)</td></tr>
          <tr><td>Facilities</td><td>Brand new, latest design</td><td>Older, may need upgrade</td></tr>
          <tr><td>Lease remaining</td><td>99 years (for 99yr)</td><td>Shorter (depreciation risk)</td></tr>
          <tr><td>Negotiability</td><td>Low (fixed developer pricing)</td><td>Higher (negotiable with seller)</td></tr>
          <tr><td>Developer incentives</td><td>Yes (discounts, stamp duty)</td><td>No</td></tr>
          <tr><td>Price</td><td>Usually carries premium PSF</td><td>Generally lower PSF</td></tr>
        </tbody>
      </table>

      <h2>When New Launch Makes More Sense</h2>
      <ul>
        <li><strong>You're an upgrader with HDB proceeds.</strong> The progressive payment means your cash and CPF from HDB sale can work harder during the construction period.</li>
        <li><strong>You plan to hold for 5+ years.</strong> New launches typically see the strongest appreciation from launch price to TOP and from TOP to resale market.</li>
        <li><strong>You want the latest amenities.</strong> New launches have pools, gyms, co-working spaces, and smart home features that resale condos from 10 years ago don't.</li>
        <li><strong>You're buying in a new growth corridor</strong> (e.g., Jurong Lake District, Tengah, Woodlands North MRT). Resale supply may be limited; new launches capture emerging demand early.</li>
      </ul>

      <h2>When Resale Makes More Sense</h2>
      <ul>
        <li><strong>You need to move in immediately.</strong> If you've already sold your HDB or have a firm relocation date, resale gives you certainty of occupation.</li>
        <li><strong>You're an investor who needs rental yield now.</strong> With SORA-linked mortgages, rental income helps offset your mortgage cost. New launches can't generate rental income for years.</li>
        <li><strong>Established locations you prefer.</strong> Some of Singapore's most sought-after addresses (Orchard, East Coast, Buona Vista) have strong resale supply with proven rental demand.</li>
        <li><strong>You have strong negotiation skills.</strong> In a softer resale market, motivated sellers can be negotiated significantly below asking price.</li>
      </ul>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">🏆 The Bottom Line</p>
        <p class="text-sm text-violet-800">For long-term wealth building (5–10 year horizon), new launches in growth districts tend to outperform. For investors needing immediate yield or buyers who need immediate occupation, resale often wins. When in doubt, model both scenarios with a mortgage broker and compare the 5-year projected returns.</p>
      </div>

      <h2>Frequently Asked Questions</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Are new launch condos more expensive than resale in Singapore?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Generally yes — new launches command a premium PSF (price per square foot) over comparable resale condos in the same district. This is partly because they offer fresh lease, new facilities, and developer incentives. However, new launch PSF has historically increased from launch to TOP by 5–15%, and many buyers who entered at launch price have sold at significant gains by the time the development received TOP.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How does the progressive payment scheme work for new launch condos?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Under Singapore's Normal Progressive Payment (NPP) scheme, you pay in stages tied to construction milestones: typically 20% on booking (Option to Purchase), then 5–10% tranches as each stage is completed (foundation, structural work, etc.), with the balance 25% on TOP. This spreads your cash outflow over 3–5 years and means you're not fully committed to the full mortgage amount until the unit is ready to occupy.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/new-launch-vs-resale-cheaper-2026" onclick="showArticle('post-new-launch-vs-resale-cheaper-2026'); return false;" class="underline hover:text-violet-700"><strong>Are New Launch Condos Cheaper Than Resale? A 2026 Singapore Buyer\'s Guide</strong></a></p>
      <p>2. <a href="/insights/cpf-private" onclick="showArticle('post-cpf-private'); return false;" class="underline hover:text-violet-700"><strong>How Much CPF Can You Use for a Private Property in Singapore? (2026 Guide)</strong></a></p>
      <p>3. <a href="/insights/how-to-buy-new-launch-2026" onclick="showArticle('post-how-to-buy-new-launch-2026'); return false;" class="underline hover:text-violet-700"><strong>How to Buy a New Launch Condo in Singapore: A Step-by-Step 2026 Guide</strong></a></p>
      <p>4. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>
      <p>5. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>
    `
  },

  /* ======================================================
     ARTICLE 6 — CPF GUIDE
  ====================================================== */
  'post-cpf-private': {
    title: 'How Much CPF Can You Use for a Private Property in Singapore? (2026 Guide)',
    date: '20 January 2026',
    readTime: '6 min read',
    category: 'CPF & FINANCING',
    chipClass: 'chip-cpf',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/newsletters/find-your-treasure-7410244299805757440/',
    body: `
      <p><strong>CPF is most Singaporeans' largest financial asset — and most people dramatically underestimate how powerful it is for property financing.</strong> When used correctly, your CPF Ordinary Account (OA) can fund your downpayment, legal fees, and monthly mortgage instalments — potentially eliminating any out-of-pocket cash requirement for years.</p>

      <h2>CPF OA vs CPF SA: What Can Be Used?</h2>
      <p>Only your <strong>CPF Ordinary Account (OA)</strong> can be used for private property purchase. Your Special Account (SA) and Medisave Account (MA) cannot be used for property.</p>

      <h2>What Can CPF OA Be Used For?</h2>
      <ul>
        <li>Downpayment (up to the Withdrawal Limit)</li>
        <li>Monthly mortgage instalments</li>
        <li>Legal and stamp duty fees</li>
        <li>Renovation loan repayment (under certain conditions)</li>
        <li>Fire insurance premiums</li>
      </ul>

      <h2>The CPF Withdrawal Limit Explained</h2>
      <p>Here's where most people get confused. CPF has two key limits for private property:</p>

      <table>
        <thead><tr><th>Limit</th><th>What It Means</th></tr></thead>
        <tbody>
          <tr><td><strong>Withdrawal Limit (WL)</strong></td><td>Maximum CPF OA you can use = 120% of Valuation Limit (VL)</td></tr>
          <tr><td><strong>Valuation Limit (VL)</strong></td><td>Lower of purchase price or market valuation</td></tr>
          <tr><td><strong>Basic Retirement Sum (BRS)</strong></td><td>After age 55, you must retain BRS in CPF before withdrawing more</td></tr>
        </tbody>
      </table>

      <p><strong>Example:</strong> You buy a $1,500,000 condo (valued at $1,500,000). The Valuation Limit = $1,500,000. The Withdrawal Limit = 120% × $1,500,000 = <strong>$1,800,000</strong>. You can use up to $1,800,000 of CPF OA across the full property lifecycle (downpayment + monthly instalments), as long as you haven't hit that cap.</p>

      <h2>How Much CPF Does a Typical Upgrader Have?</h2>
      <p>For a Singaporean couple aged 35–40, each with ~15 years of work history:</p>

      <table>
        <thead><tr><th>Age</th><th>Typical CPF OA Balance</th></tr></thead>
        <tbody>
          <tr><td>30 years old</td><td>~$60,000–$80,000</td></tr>
          <tr><td>35 years old</td><td>~$100,000–$140,000</td></tr>
          <tr><td>40 years old</td><td>~$150,000–$200,000</td></tr>
          <tr><td>45 years old</td><td>~$200,000–$280,000</td></tr>
        </tbody>
      </table>

      <p><em>Note: Balances above are rough estimates before any CPF housing withdrawal for existing HDB loans.</em></p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">💡 Practical Implication</p>
        <p class="text-sm text-violet-800">After selling your HDB and refunding CPF (with accrued interest), your CPF OA is typically replenished — and can immediately be re-deployed for your private property downpayment. A couple aged 38 with clean CPF records could easily have $250,000–$350,000 combined in CPF OA to deploy.</p>
      </div>

      <h2>Frequently Asked Questions</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Can I use CPF to pay for a new launch condo before it is completed?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes. Under the progressive payment scheme, CPF can be used to fund each payment tranche as construction milestones are hit. You can also use CPF OA for the initial 20% downpayment (5% cash + up to 15% from CPF OA, depending on LTV). Monthly mortgage instalments can be paid from CPF OA once the loan starts disbursing.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What happens to CPF when I sell my private property?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">When you sell, you must refund all CPF OA funds used for the property back into your CPF OA account, plus 2.5% per annum accrued interest. This refund is made from the sale proceeds before you receive any cash. The refunded amount returns to your CPF OA and can be re-used for future property purchases.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/decoupling" onclick="showArticle('post-decoupling'); return false;" class="underline hover:text-violet-700"><strong>The Decoupling Guide 2026: Legal Costs vs. ABSD Savings</strong></a></p>
      <p>2. <a href="/insights/new-launch-vs-resale" onclick="showArticle('post-new-launch-vs-resale'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo in 2026: Which Should You Buy?</strong></a></p>
      <p>3. <a href="/insights/hdb-sell-signs" onclick="showArticle('post-hdb-sell-signs'); return false;" class="underline hover:text-violet-700"><strong>5 Signs Your HDB Flat Is Ready to Sell — And How to Time It Right in 2026</strong></a></p>
      <p>4. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>
      <p>5. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>
    `
  },

  /* ======================================================
     ARTICLE 7 — DISTRICT GUIDE
  ====================================================== */
  'post-district-guide': {
    title: 'Which Singapore District Should You Buy In? The 2026 Growth Map',
    date: '15 December 2025',
    readTime: '8 min read',
    category: 'DISTRICT GUIDE',
    chipClass: 'chip-district',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/newsletters/find-your-treasure-7410244299805757440/',
    body: `
      <p><strong>Location determines 70% of your property's long-term performance.</strong> You can get everything else right — price, timing, financing — but buy in the wrong district and you'll underperform. Here's my 2026 district scorecard based on capital growth potential, rental yield, and long-term URA master plan alignment.</p>

      <h2>The Four Types of Singapore Districts</h2>
      <ul>
        <li><strong>Prime CCR (Districts 9, 10, 11):</strong> Orchard, Bukit Timah, Newton. Highest prices, most foreign demand, luxury segment. Best for capital preservation + rental to expats.</li>
        <li><strong>City Fringe RCR (Districts 3, 4, 5, 12, 14, 15):</strong> Queenstown, Alexandra, Marine Parade, Geylang. Strong rental yields, MRT connected, increasingly popular with upgraders.</li>
        <li><strong>Growth Corridors OCR (Districts 18, 19, 20, 22, 23):</strong> Tampines, Serangoon, Bishan, Jurong, Bukit Panjang. Strong population growth, new MRT lines, HDB upgrader demand. Best value for money.</li>
        <li><strong>Emerging Districts (Districts 25, 26, 27, 28):</strong> Woodlands, Yishun, Sembawang. Under-invested but longer term growth story linked to JB-SG connection and Cross-Island Line.</li>
      </ul>

      <h2>Top 5 Districts for Capital Growth in 2026</h2>
      <table>
        <thead><tr><th>District</th><th>Key Catalyst</th><th>2026 PSF Range</th><th>Growth Outlook</th></tr></thead>
        <tbody>
          <tr><td><strong>D19 (Serangoon/Hougang)</strong></td><td>Circle Line + Cross-Island Line, strong HDB upgrader base</td><td>$1,600–$2,200</td><td>⭐⭐⭐⭐⭐</td></tr>
          <tr><td><strong>D22 (Jurong/Jurong Lake District)</strong></td><td>Jurong Lake District masterplan, second CBD designation</td><td>$1,500–$2,000</td><td>⭐⭐⭐⭐⭐</td></tr>
          <tr><td><strong>D23 (Bukit Timah/Hillview)</strong></td><td>Beauty World MRT, low supply, landed adjacency premium</td><td>$1,800–$2,400</td><td>⭐⭐⭐⭐</td></tr>
          <tr><td><strong>D15 (Marine Parade/East Coast)</strong></td><td>TEL Phase 4 stations, lifestyle demand, new F&amp;B precinct</td><td>$2,000–$2,800</td><td>⭐⭐⭐⭐</td></tr>
          <tr><td><strong>D5 (Queenstown/One-North)</strong></td><td>One-North tech hub, biomedical cluster, strong rental demand</td><td>$2,000–$2,600</td><td>⭐⭐⭐⭐</td></tr>
        </tbody>
      </table>

      <h2>The Jurong Lake District Story (D22) — Why It's Singapore's Biggest Bet</h2>
      <p>URA's 2019 masterplan designated Jurong Lake District (JLD) as Singapore's second CBD. The vision: 100 hectares of mixed-use development, a new Integrated Resort, an International Convention Centre, and a high-speed rail terminal (Jurong East). The HSR timeline has shifted but JLD's development is ongoing.</p>
      <p>Key data points: Condo prices in D22 have risen ~18% from 2021 to 2025. Rental yields of 3.5–4.2% are among the highest for a growth district. Current new launches like Luminar Grand and Grand Dunman offer entry points that look compelling relative to 5-year projected values.</p>

      <h2>Frequently Asked Questions</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is the best district to buy a condo in Singapore for investment in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">For capital growth, D19 (Serangoon/Hougang) and D22 (Jurong Lake District) offer the strongest catalysts in 2026 based on MRT expansion, URA masterplan support, and HDB upgrader demand. For rental yield, D5 (Queenstown/One-North) and D15 (Marine Parade) deliver reliable 3.5–4.5% gross yields due to proximity to employment clusters and lifestyle amenities. Your choice should depend on whether you prioritise capital appreciation or income.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Which Singapore districts are most popular with HDB upgraders?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">HDB upgraders typically gravitate toward Districts 19 (Serangoon, Hougang, Punggol), 20 (Bishan, Ang Mo Kio), 22 (Jurong), and 23 (Bukit Timah, Hillview) — areas where they already live, have established school preferences, and can find private condos in the $1.3M–$1.8M range. These districts also tend to have strong local rental demand from other HDB upgraders who rent before buying.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>
      <p>2. <a href="/insights/how-to-buy-new-launch-2026" onclick="showArticle('post-how-to-buy-new-launch-2026'); return false;" class="underline hover:text-violet-700"><strong>How to Buy a New Launch Condo in Singapore: A Step-by-Step 2026 Guide</strong></a></p>
      <p>3. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>
      <p>4. <a href="/insights/dunearn-house-review-2026" onclick="showArticle('post-dunearn-house-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House Review 2026: Is It Worth Buying? (Honest Pros & Cons)</strong></a></p>
      <p>5. <a href="/insights/new-launch-vs-resale" onclick="showArticle('post-new-launch-vs-resale'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo in 2026: Which Should You Buy?</strong></a></p>
    `
  },

  /* ======================================================
     ARTICLE 8 — SELL YOUR HDB
  ====================================================== */
  'post-hdb-sell-signs': {
    title: '5 Signs Your HDB Flat Is Ready to Sell — And How to Time It Right in 2026',
    date: '30 November 2025',
    readTime: '6 min read',
    category: 'SELL YOUR HDB',
    chipClass: 'chip-sell',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/newsletters/find-your-treasure-7410244299805757440/',
    body: `
      <p><strong>The difference between selling your HDB at the right time versus the wrong time in 2026 can easily be $50k–$200k in net proceeds.</strong> Too early and you leave money on the table. Too late and you chase a cooling market while new launch condo prices continue rising in growth districts.</p>

      <h2>Sign 1: You Have Passed MOP and Built Strong Equity</h2>
      <p>5 years MOP is the legal minimum, but the real trigger is equity. If your net proceeds (after loan + CPF refund) give you 20–25%+ of your target new launch condo price, the upgrade math usually works.</p>

      <h2>Sign 2: COV in Your Estate Is Strong and Sustained</h2>
      <p>Cash-Over-Valuation (COV) is the best real-time signal of buyer demand. Consistent $30k–$80k+ COV in your block or estate means strong demand. Check HDB Resale Portal and <a href="https://www.srx.com.sg" target="_blank" rel="noopener">SRX</a> transaction data.</p>

      <h2>Sign 3: Your Flat Has High-Demand Features</h2>
      <p>High floor, corner unit, recent renovation, within 1km of popular primary school, or 5-min walk to MRT. Any two or three of these command consistent premiums that make timing less critical.</p>

      <h2>Sign 4: Your Household Income Has Grown Significantly</h2>
      <p>If your income has doubled since you bought the HDB, your borrowing capacity has too. The private condo that felt out of reach 5 years ago is now firmly inside your TDSR limit in 2026.</p>

      <h2>Sign 5: New Launch Projects Near You Are Entering VVIP Stage</h2>
      <p>The best prices and incentives on new launch condos happen before public launch. If developers in your preferred district (e.g. <a href="https://www.theorie.sg" target="_blank" rel="noopener">The Orie</a> or D19 launches) are opening VVIP in the next 3–6 months, start the HDB sale process now.</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">⏰ Optimal 2026 Sequence</p>
        <p class="text-sm text-violet-800">List HDB → Accept offer → Book new launch condo during the 8-week completion window. This removes the dangerous gap risk of owning two properties simultaneously.</p>
      </div>

      <h2>How to Maximise Your HDB Sale Price in 2026</h2>
      <ol>
        <li>Deep clean + fresh neutral paint (adds $20k–$50k perceived value for almost zero cost).</li>
        <li>Price at COV + 5% to leave negotiation room.</li>
        <li>Use professional photography — listings with pro photos get 3x the enquiries.</li>
        <li>Prefer buyers with shorter completion timelines that align with new launch progressive payment schedules.</li>
      </ol>

      <h2>Frequently Asked Questions — Selling HDB in 2026</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How long does it take to sell an HDB flat in Singapore in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Well-priced flats in desirable estates typically find a buyer in 2–6 weeks. From accepted offer to completion is usually 8–12 weeks. Total timeline from listing to cash in hand: 10–18 weeks.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is COV and how does it affect my selling price?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">COV is the cash buyers pay above HDB's official valuation. $650k valuation + $50k COV = $700k selling price. High COV estates are seller's markets; low or zero COV means more negotiation power for buyers.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/hdb-phantom-fear" onclick="showArticle('post-hdb-phantom-fear'); return false;" class="underline hover:text-violet-700"><strong>HDB Upgraders: Are You Trapped by Your Own "Phantom Fear"? (2026 Edition)</strong></a></p>
      <p>2. <a href="/insights/resolution-2026" onclick="showArticle('post-resolution-2026'); return false;" class="underline hover:text-violet-700"><strong>Why Buying a Private Property Should Be Your #1 Resolution for 2026 (Especially If You\'re Scared)</strong></a></p>
      <p>3. <a href="/insights/cpf-private" onclick="showArticle('post-cpf-private'); return false;" class="underline hover:text-violet-700"><strong>How Much CPF Can You Use for a Private Property in Singapore? (2026 Guide)</strong></a></p>
      <p>4. <a href="/insights/new-launch-vs-resale" onclick="showArticle('post-new-launch-vs-resale'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo in 2026: Which Should You Buy?</strong></a></p>
      <p>5. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>
      <p>6. <a href="/mortgage-calculator/" class="underline hover:text-violet-700"><strong>Check your affordability with our Singapore Mortgage Calculator</strong></a></p>
    `
  },

  /* ======================================================
     NEW ARTICLE 9 — FOMO PSYCHOLOGY IN NEW LAUNCHES
  ====================================================== */
  'post-fomo-new-launch-2026': {
    title: 'FOMO vs Rational Analysis: The Psychology of Buying New Launch Condos in Singapore 2026',
    date: '12 April 2026',
    readTime: '9 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/newsletters/find-your-treasure-7410244299805757440/',
    body: `
      <p><strong>The single biggest driver of new launch condo purchases in Singapore right now is not price or location — it is FOMO (Fear Of Missing Out).</strong> Developers know this and engineer sales processes to trigger it. Smart buyers recognise the bias and use data instead.</p>

      <h2>How FOMO Manifests in 2026 New Launch Sales</h2>
      <ul>
        <li>VVIP and priority balloting that creates artificial scarcity.</li>
        <li>Daily "units selling fast" updates on WhatsApp groups.</li>
        <li>Price increases announced mid-launch ("last chance at current pricing").</li>
        <li>Social proof from friends or colleagues who "already booked".</li>
      </ul>

      <p>These tactics work because of loss aversion and social proof — two powerful psychological forces. When you see others securing units in a project like <a href="https://www.theorie.sg" target="_blank" rel="noopener">The Orie</a> or upcoming D19 launches, the pain of potentially missing out feels worse than the risk of overpaying.</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">🧠 AEO Answer: How to Beat FOMO in New Launches</p>
        <p class="text-sm text-violet-800">Set hard rules before you view any showflat: maximum price, minimum unit size, must-have location criteria. If the unit doesn't meet all three, you walk away — no exceptions. This single pre-commitment neutralises most FOMO.</p>
      </div>

      <h2>5 Data Points That Should Matter More Than FOMO</h2>
      <ol>
        <li>Absorption rate vs historical averages for that district.</li>
        <li>Developer track record on timely TOP and quality.</li>
        <li>Actual PSF compared to recent resale transactions in the same area (not launch price).</li>
        <li>Progressive payment cash flow impact on your CPF and income.</li>
        <li>5-year rental yield and capital growth projections using conservative assumptions.</li>
      </ol>

      <h2>FOMO vs Rational Buyer: Quick Comparison</h2>
      <table>
        <thead><tr><th>Signal</th><th>FOMO Buyer Reaction</th><th>Rational Buyer Check</th></tr></thead>
        <tbody>
          <tr><td>70% sold in weekend</td><td>"Must be a hot project, better hurry"</td><td>"What was absorption like for comparable launches in this district last 2 years?"</td></tr>
          <tr><td>Price rise announced</td><td>"I need to lock in now"</td><td>"Compare net PSF (after incentives) to recent resales within 1km"</td></tr>
          <tr><td>Friends booked</td><td>"Everyone I know is in — I can't miss this"</td><td>"Do their numbers and risk tolerance actually match mine?"</td></tr>
          <tr><td>"Last units" pressure</td><td>Book without full due diligence</td><td>Walk away. There will be other launches.</td></tr>
        </tbody>
      </table>

      <h2>Practical 10-Minute FOMO Filter (Use Before Every Showflat)</h2>
      <ol>
        <li>Write your 3 non-negotiables on your phone before arriving.</li>
        <li>Ask the sales team for the last 3 transacted PSF in this project (not the marketing price).</li>
        <li>Check URA or 99.co/ PropertyGuru recent transactions for the same postal district.</li>
        <li>Model the monthly cashflow under progressive payments + worst-case 3.8% interest for 25 years.</li>
        <li>If it fails any of your 3 rules, thank them and leave. No polite "I'll think about it" that turns into a booking.</li>
      </ol>

      <h2>Frequently Asked Questions</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is it normal to feel anxious about missing a new launch?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Completely normal. The entire sales process is designed to create urgency. The antidote is pre-deciding your criteria in writing and treating any launch that doesn't meet them as irrelevant noise.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Do high absorption rates mean the project will appreciate faster?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Not necessarily. Very high early absorption can signal either genuine demand or very aggressive marketing + incentives. Look at net price after all credits and compare to resale comps before assuming future gains.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What if my friends really did get a good deal on this launch?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Good for them. Your situation, timeline, risk tolerance and alternative uses of capital are different. Copying their purchase without running your own numbers is how overpayment happens.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/first-condo-anxiety" onclick="showArticle('post-first-condo-anxiety'); return false;" class="underline hover:text-violet-700"><strong>First Private Condo Anxiety: The Hidden Psychology Costing Singapore Upgraders Millions in 2026</strong></a></p>
      <p>2. <a href="/insights/progressive-payment-psychology" onclick="showArticle('post-progressive-payment-psychology'); return false;" class="underline hover:text-violet-700"><strong>Why Progressive Payments Make New Launch Condos Psychologically Easier to Buy in 2026</strong></a></p>
      <p>3. <a href="/insights/developer-incentives-psych" onclick="showArticle('post-developer-incentives-psych'); return false;" class="underline hover:text-violet-700"><strong>How Developer Incentives in New Launch Condos Exploit Buyer Psychology in 2026 (And How to See Through Them)</strong></a></p>
      <p>4. <a href="/insights/hdb-phantom-fear" onclick="showArticle('post-hdb-phantom-fear'); return false;" class="underline hover:text-violet-700"><strong>HDB Upgraders: Are You Trapped by Your Own "Phantom Fear"? (2026 Edition)</strong></a></p>
      <p>5. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>
      <p>6. <a href="/mortgage-calculator/" class="underline hover:text-violet-700"><strong>Check your affordability with our Singapore Mortgage Calculator</strong></a></p>
    `
  },

  /* ======================================================
     NEW ARTICLE 10 — FIRST CONDO PSYCHOLOGY
  ====================================================== */
  'post-first-condo-anxiety': {
    title: 'First Private Condo Anxiety: The Hidden Psychology Costing Singapore Upgraders Millions in 2026',
    date: '18 April 2026',
    readTime: '8 min read',
    category: 'WEALTH',
    chipClass: 'chip-wealth',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/newsletters/find-your-treasure-7410244299805757440/',
    body: `
      <p><strong>The biggest barrier for many HDB upgraders is not money — it is "first private condo anxiety".</strong> This specific form of decision paralysis causes capable families to stay in HDBs years longer than they should, costing them hundreds of thousands in missed capital appreciation on new launch condos.</p>

      <h2>The Three Hidden Fears Behind First Condo Anxiety</h2>
      <ol>
        <li><strong>Identity shift fear:</strong> "I'm not the kind of person who lives in a condo."</li>
        <li><strong>Maintenance fear:</strong> "What if there are high sinking fund bills or disputes with neighbours?"</li>
        <li><strong>Status signalling fear:</strong> "Will people think I'm showing off or living beyond my means?"</li>
      </ol>

      <p>These are rarely discussed openly but show up as endless "research" and "just one more project to look at".</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">🧠 AEO Answer</p>
        <p class="text-sm text-violet-800">First condo anxiety is normal and usually peaks 3–6 months before the actual purchase. The families who move fastest are those who treat the decision as a financial investment first and a lifestyle upgrade second.</p>
      </div>

      <h2>How to Reduce First Condo Anxiety in 2026</h2>
      <ul>
        <li>Visit 3 showflats in one weekend with a strict "no decision today" rule.</li>
        <li>Speak to 2–3 current owners in the development (not just the sales team).</li>
        <li>Model the worst-case 10% price drop scenario and confirm you can still service the loan.</li>
        <li>Focus on projects by reputable developers with strong track records (e.g. UOL, CDL, CapitaLand linked launches).</li>
      </ul>

      <h2>Quick Self-Assessment: Are You Ready?</h2>
      <table>
        <thead><tr><th>Question</th><th>If Yes → Action</th><th>If No → Work on This First</th></tr></thead>
        <tbody>
          <tr><td>Can you comfortably service the mortgage + 20% higher costs?</td><td>Shortlist 2 projects</td><td>Run full TDSR + stress test with broker</td></tr>
          <tr><td>Have you visited comparable resale condos in the area?</td><td>Good — you know the lifestyle</td><td>Do it this weekend before any launch</td></tr>
          <tr><td>Do you have a written "walk away" list of 3 must-haves?</td><td>Proceed to view with discipline</td><td>Write it now. No exceptions on launch day.</td></tr>
        </tbody>
      </table>

      <h2>Frequently Asked Questions</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is it normal to feel sick to my stomach before booking a condo?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes. Large financial decisions trigger loss aversion. The discomfort usually peaks right before commitment and drops sharply once the OTP is signed and the plan is in motion.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Will my friends and family judge me for "upgrading too soon"?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Some will. Most are projecting their own risk tolerance. The only numbers that matter are yours and your family's long-term net worth and quality of life.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/fomo-new-launch-2026" onclick="showArticle('post-fomo-new-launch-2026'); return false;" class="underline hover:text-violet-700"><strong>FOMO vs Rational Analysis: The Psychology of Buying New Launch Condos in Singapore 2026</strong></a></p>
      <p>2. <a href="/insights/progressive-payment-psychology" onclick="showArticle('post-progressive-payment-psychology'); return false;" class="underline hover:text-violet-700"><strong>Why Progressive Payments Make New Launch Condos Psychologically Easier to Buy in 2026</strong></a></p>
      <p>3. <a href="/insights/hdb-phantom-fear" onclick="showArticle('post-hdb-phantom-fear'); return false;" class="underline hover:text-violet-700"><strong>HDB Upgraders: Are You Trapped by Your Own "Phantom Fear"? (2026 Edition)</strong></a></p>
      <p>4. <a href="/insights/how-to-buy-new-launch-2026" onclick="showArticle('post-how-to-buy-new-launch-2026'); return false;" class="underline hover:text-violet-700"><strong>How to Buy a New Launch Condo in Singapore: A Step-by-Step 2026 Guide</strong></a></p>
      <p>5. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>
    `
  },

  /* ======================================================
     NEW ARTICLE 11 — PAYMENT SCHEME PSYCHOLOGY
  ====================================================== */
  'post-progressive-payment-psychology': {
    title: 'Why Progressive Payments Make New Launch Condos Psychologically Easier to Buy in 2026',
    date: '25 April 2026',
    readTime: '7 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/newsletters/find-your-treasure-7410244299805757440/',
    body: `
      <p><strong>The progressive payment scheme is one of the most powerful (and under-appreciated) psychological tools in Singapore new launch condos.</strong> Instead of paying 25% upfront like resale, you pay ~20% over 3–5 years tied to construction milestones. This dramatically lowers the "pain of paying" at any single point in time.</p>

      <h2>How Progressive Payments Reduce Buyer Regret</h2>
      <p>Behavioural finance shows that people feel losses more acutely when they happen in one large lump. Spreading the downpayment across foundation, structural, and TOP stages makes each payment feel smaller and more manageable — even when the total is the same.</p>

      <p>This is why many upgraders who "can't afford" a resale condo comfortably book a new launch of similar or higher value.</p>

      <h2>2026 Cash Flow Example (Typical 3BR New Launch)</h2>
      <ul>
        <li>Booking (OTP): 5% cash + 15% CPF</li>
        <li>Foundation &amp; structural: 10–15% over 18–24 months</li>
        <li>Balance on TOP: ~25% (by then your HDB sale proceeds are usually in)</li>
      </ul>

      <p>The structure gives you time to sell your HDB and align cash flows — a luxury resale does not offer.</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">💡 Pro Tip</p>
        <p class="text-sm text-violet-800">Always model the exact payment schedule from the developer (available in the sales brochure) against your CPF OA balance and expected HDB sale timeline before booking.</p>
      </div>

      <h2>Frequently Asked Questions</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Can I use CPF for every progressive payment tranche?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes. CPF OA can be used for the initial 20% (within Withdrawal Limit rules) and for subsequent tranches as they are billed. This is one of the biggest advantages of new launches over resale for upgraders.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/fomo-new-launch-2026" onclick="showArticle('post-fomo-new-launch-2026'); return false;" class="underline hover:text-violet-700"><strong>FOMO vs Rational Analysis: The Psychology of Buying New Launch Condos in Singapore 2026</strong></a></p>
      <p>2. <a href="/insights/first-condo-anxiety" onclick="showArticle('post-first-condo-anxiety'); return false;" class="underline hover:text-violet-700"><strong>First Private Condo Anxiety: The Hidden Psychology Costing Singapore Upgraders Millions in 2026</strong></a></p>
      <p>3. <a href="/insights/how-to-buy-new-launch-2026" onclick="showArticle('post-how-to-buy-new-launch-2026'); return false;" class="underline hover:text-violet-700"><strong>How to Buy a New Launch Condo in Singapore: A Step-by-Step 2026 Guide</strong></a></p>
      <p>4. <a href="/insights/developer-incentives-psych" onclick="showArticle('post-developer-incentives-psych'); return false;" class="underline hover:text-violet-700"><strong>How Developer Incentives in New Launch Condos Exploit Buyer Psychology in 2026 (And How to See Through Them)</strong></a></p>
      <p>5. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>
    `
  },

  /* ======================================================
     NEW ARTICLE 12 — ABSORPTION &amp; HERD MENTALITY
  ====================================================== */
  'post-absorption-herd-2026': {
    title: 'High Absorption Rates in Singapore New Launches: Smart Signal or Dangerous Herd Mentality in 2026?',
    date: '3 May 2026',
    readTime: '8 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: null,
    linkedinUrl: 'https://www.linkedin.com/newsletters/find-your-treasure-7410244299805757440/',
    body: `
      <p><strong>When a new launch condo hits 70%+ absorption in the first weekend, two very different stories are told.</strong> Developers and agents call it "overwhelming demand". Behavioural economists call it potential herd mentality that can lead to overpaying.</p>

      <h2>The Psychology of High Absorption</h2>
      <p>Humans are wired to assume that if many people are doing something, it must be smart (social proof heuristic). In property launches this is amplified by:</p>
      <ul>
        <li>Limited time VVIP windows</li>
        <li>Public ballot systems that create scarcity theatre</li>
        <li>WhatsApp groups and Telegram channels sharing "sold out" screenshots</li>
      </ul>

      <h2>When High Absorption Is Actually a Good Signal</h2>
      <p>High absorption is positive when it reflects:</p>
      <ul>
        <li>Strong location fundamentals (MRT, schools, future master plan catalysts)</li>
        <li>Reputable developer with proven delivery</li>
        <li>Pricing that is genuinely competitive versus recent resale comps</li>
      </ul>

      <h2>Red Flags in "Hot" Launches</h2>
      <p>Be cautious when absorption is driven mostly by:</p>
      <ul>
        <li>Aggressive marketing spend and influencer seeding</li>
        <li>Heavy use of "limited units at this price" language</li>
        <li>Buyers who admit they "booked because everyone else was"</li>
      </ul>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">🧠 AEO Answer</p>
        <p class="text-sm text-violet-800">Treat absorption rate as one data point, not the decision. Always compare launch PSF to actual transacted resale prices in the same district from the last 3–6 months before getting emotionally involved.</p>
      </div>

      <h2>Frequently Asked Questions</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Should I avoid projects that are selling very fast?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Not necessarily. Some projects deserve fast absorption because of location or pricing. The key is verifying the "why" behind the numbers rather than blindly following the crowd.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/developer-incentives-psych" onclick="showArticle('post-developer-incentives-psych'); return false;" class="underline hover:text-violet-700"><strong>How Developer Incentives in New Launch Condos Exploit Buyer Psychology in 2026 (And How to See Through Them)</strong></a></p>
      <p>2. <a href="/insights/fomo-new-launch-2026" onclick="showArticle('post-fomo-new-launch-2026'); return false;" class="underline hover:text-violet-700"><strong>FOMO vs Rational Analysis: The Psychology of Buying New Launch Condos in Singapore 2026</strong></a></p>
      <p>3. <a href="/insights/progressive-payment-psychology" onclick="showArticle('post-progressive-payment-psychology'); return false;" class="underline hover:text-violet-700"><strong>Why Progressive Payments Make New Launch Condos Psychologically Easier to Buy in 2026</strong></a></p>
      <p>4. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>
      <p>5. <a href="/insights/dunearn-house-review-2026" onclick="showArticle('post-dunearn-house-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House Review 2026: Is It Worth Buying? (Honest Pros & Cons)</strong></a></p>
    `
  },

  /* ======================================================
     NEW ARTICLE 13 — DEVELOPER INCENTIVES PSYCHOLOGY
  ====================================================== */
  'post-developer-incentives-psych': {
    title: 'How Developer Incentives in New Launch Condos Exploit Buyer Psychology in 2026 (And How to See Through Them)',
    date: '10 May 2026',
    readTime: '7 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/newsletters/find-your-treasure-7410244299805757440/',
    body: `
      <p><strong>Developer incentives (stamp duty absorption, legal fees paid, furniture vouchers, price discounts) are not gifts.</strong> They are carefully designed psychological tools that make the total price feel lower while protecting the developer's headline PSF.</p>

      <h2>Common 2026 Incentive Structures and Their Real Effect</h2>
      <ul>
        <li><strong>Stamp duty absorption:</strong> Developer pays your BSD/ABSD. You still pay the full price; the "saving" is just cash flow timing.</li>
        <li><strong>Legal fees + disbursements paid:</strong> Usually $8k–$15k value. Nice, but small compared to the overall transaction.</li>
        <li><strong>VVIP early bird discount:</strong> Often 3–8%. The real question is whether the "normal" price was inflated to create room for the discount.</li>
        <li><strong>Furniture or renovation credits:</strong> $30k–$80k. Easy to over-value and hard to use fully.</li>
      </ul>

      <h2>How to Evaluate Any Incentive Package</h2>
      <ol>
        <li>Calculate the all-in net price after every incentive (price minus cash value of incentives).</li>
        <li>Compare that net PSF to recent resale transactions in the immediate vicinity.</li>
        <li>Ignore "savings" marketing and focus only on the final number you will actually pay.</li>
      </ol>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">💡 Golden Rule 2026</p>
        <p class="text-sm text-violet-800">The best incentive is a genuinely lower net price on a project with strong fundamentals. Everything else is marketing designed to trigger reciprocity and reduce your price sensitivity.</p>
      </div>

      <h2>Frequently Asked Questions</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Are developer incentives worth chasing in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Only if the net price after incentives is still competitive versus resale. Many "hot" launches with big incentive packages are still more expensive on a net PSF basis than comparable resale units 800m away.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/absorption-herd-2026" onclick="showArticle('post-absorption-herd-2026'); return false;" class="underline hover:text-violet-700"><strong>High Absorption Rates in Singapore New Launches: Smart Signal or Dangerous Herd Mentality in 2026?</strong></a></p>
      <p>2. <a href="/insights/fomo-new-launch-2026" onclick="showArticle('post-fomo-new-launch-2026'); return false;" class="underline hover:text-violet-700"><strong>FOMO vs Rational Analysis: The Psychology of Buying New Launch Condos in Singapore 2026</strong></a></p>
      <p>3. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>
      <p>4. <a href="/insights/new-launch-vs-resale" onclick="showArticle('post-new-launch-vs-resale'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo in 2026: Which Should You Buy?</strong></a></p>
      <p>5. <a href="/insights/dunearn-house-review-2026" onclick="showArticle('post-dunearn-house-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House Review 2026: Is It Worth Buying? (Honest Pros & Cons)</strong></a></p>
    `
  },

  /* ======================================================
     NEW ARTICLE 14 — DUNEARN HOUSE
  ====================================================== */
  'post-dunearn-house-2026': {
    title: 'Dunearn House 2026: Why It\'s a Smart Buy in Prime Bukit Timah',
    date: '28 May 2026',
    readTime: '14 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/pulse/dunearn-house-2026-steal-jack-leow',
    body: `
      <p><strong>Dunearn House is the first private residential launch in the transformative Bukit Timah Turf City masterplan — and at a land cost that positions it as one of the most compelling CCR value plays of 2026.</strong> Developed by Frasers Property, Sekisui House and CSC Land Group, this 380-unit 99-year leasehold condo on Dunearn Road offers families and upgraders a rare chance to buy into Singapore's next major growth precinct at new-launch pricing.</p>

      <p>This guide covers everything you need to know: the project details, the value case, the risks, and what serious buyers should do next.</p>

      <h2>What Is Dunearn House?</h2>
      <p>Dunearn House is a 99-year leasehold condominium along Dunearn Road in <strong>District 11 (Core Central Region)</strong>. Developed by a joint venture of <strong>Frasers Property, Sekisui House, and CSC Land Group</strong>, it sits on a 145,226 sq ft site and comprises <strong>380 units across five blocks of 10 to 19 storeys</strong>, designed by award-winning local architecture firm <strong>Ong & Ong</strong>.</p>

      <h3>Key Project Facts at a Glance</h3>
      <table>
        <thead><tr><th>Detail</th><th>Information</th></tr></thead>
        <tbody>
          <tr><td>Address</td><td>Dunearn Road, Singapore</td></tr>
          <tr><td>District</td><td>D11 (Core Central Region)</td></tr>
          <tr><td>Tenure</td><td>99-year leasehold</td></tr>
          <tr><td>Total Units</td><td>~380</td></tr>
          <tr><td>Site Area</td><td>~145,226 sq ft</td></tr>
          <tr><td>Developer</td><td>Frasers Property, Sekisui House, CSC Land Group</td></tr>
          <tr><td>Architect</td><td>Ong & Ong Pte Ltd</td></tr>
          <tr><td>Land Cost</td><td>S$491.5 million (S$1,410 psf ppr)</td></tr>
          <tr><td>Expected TOP</td><td>2029–2030</td></tr>
          <tr><td>Nearest MRT</td><td>Sixth Avenue (DT7, Downtown Line)</td></tr>
        </tbody>
      </table>

      <h2>5 Reasons Dunearn House Is a Compelling Buy</h2>

      <h3>1. You Are Buying Into Singapore's Next Major Growth Precinct — First</h3>
      <p>This is the single most important reason serious buyers are paying attention. Dunearn House is <strong>the first and only private residential launch within the Bukit Timah Turf City masterplan precinct</strong> to date.</p>
      <p>Under the <strong>URA Draft Master Plan 2025</strong>, the former Bukit Timah Turf City site — a vast 176-hectare former racecourse — is being transformed into a brand-new residential estate planned to deliver between <strong>15,000 and 20,000 new public and private homes</strong>. Notably, this will include the first HDB flats to be built in Bukit Timah in nearly 40 years.</p>
      <p>This is the same first-mover playbook we have seen work well at <strong>Bayshore</strong> (two Thomson-East Coast Line stations, new waterfront township), and before that at <strong>Lentor</strong> (where early-bird buyers saw healthy capital appreciation as each subsequent launch refined and reinforced the precinct's identity). In Turf City's case, the scale and prestige of the location means the upside story is arguably even more powerful.</p>
      <p>The masterplan vision is ambitious: green and nature-integrated living, 27 conserved heritage buildings (including the iconic Grandstand), a future <strong>Turf City MRT station on the Cross Island Line</strong> (CRL) expected around 2032, and ecological corridors linking residents to Bukit Timah Nature Reserve. By buying Dunearn House now, you are entering at the start of that multi-decade value-creation journey, not midway through.</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">💡 2026 Key Takeaway</p>
        <p class="text-sm text-violet-800">By buying Dunearn House now, you are entering at the start of that multi-decade value-creation journey. The schools, MRT, green corridors, and masterplan amenities will take years to fully materialise — you are buying on potential as much as present reality.</p>
      </div>

      <h3>2. The Developer Consortium Is World-Class</h3>
      <p>Developer quality matters enormously in a new launch — it affects build quality, design execution, and your property's long-term reputation in the resale market.</p>
      <p>The Dunearn House consortium brings together three credible names:</p>
      <ul>
        <li><strong>Frasers Property</strong> — A Singapore-headquartered, SGX-listed developer with a global portfolio of residential, commercial, industrial, and logistics assets. Their Singapore residential track record includes Rivière, North Park Residences, and One Holland Village Residences.</li>
        <li><strong>Sekisui House</strong> — Japan's largest homebuilder by revenue, known for precision construction, sustainable design, and consistently high product quality.</li>
        <li><strong>CSC Land Group</strong> — An established Singapore developer known for projects like The Lilium and The Gazania.</li>
      </ul>
      <p>The fact that nine developer groups submitted bids at the GLS tender — the <strong>strongest CCR tender participation since May 2018</strong> — tells you that institutional confidence in this location is very high.</p>

      <h3>3. The Location Ticks Every Box for Families and Investors</h3>
      <p>Dunearn Road has long been one of Singapore's most coveted residential addresses. It offers a rare combination of prestige, connectivity, and everyday practicality.</p>
      <p><strong>Transport Connectivity</strong></p>
      <ul>
        <li><strong>Sixth Avenue MRT (DT7)</strong> is within a 5–10 minute walk. The Downtown Line provides seamless access to the CBD (City Hall in under 20 minutes), Orchard Road, and Buona Vista.</li>
        <li>By car, Dunearn Road connects quickly to both the CTE and PIE.</li>
        <li>Future <strong>Cross Island Line (CRL) Turf City station</strong> (targeting ~2032) will add a second MRT line to the precinct.</li>
      </ul>
      <p><strong>The Education Belt — Singapore's Most Coveted School Cluster</strong></p>
      <p>For families, this is the single most powerful lifestyle draw. The schools within close proximity read like a who's who of Singapore's most sought-after institutions:</p>
      <p><em>Primary:</em> Methodist Girls' School (Primary), Nanyang Primary School, Pei Hwa Presbyterian Primary School, Henry Park Primary School, Raffles Girls' Primary School.</p>
      <p><em>Secondary & JC:</em> Nanyang Girls' High School, Hwa Chong Institution, Methodist Girls' School (Secondary), Singapore Chinese Girls' School, National Junior College, Hwa Chong Junior College.</p>
      <p>Being within 1–2 km of these schools translates directly into <strong>Phase 2C and Phase 2B priority admission advantages</strong>, one of the most powerful practical benefits of living in this part of Singapore.</p>

      <h3>4. The Land Price Is Competitive Relative to CCR Benchmarks</h3>
      <p>The GLS tender winning bid was <strong>S$1,410 psf ppr</strong>. To put that in context:</p>
      <ul>
        <li>The second-highest bidder (CDL) came in at S$1,360 psf ppr — a gap of only 3.7%.</li>
        <li>In February 2024, UOL Group and Singapore Land Group paid <strong>S$1,617 psf ppr</strong> for an Orchard Boulevard GLS plot in District 9.</li>
        <li>Other 2025–2026 CCR GLS sites have seen land costs well above S$1,400–S$1,600 psf ppr.</li>
      </ul>
      <p>Working from a land breakeven of approximately <strong>S$2,558 psf</strong>, analysts have estimated the launch price range at around <strong>S$2,700–S$3,100 psf</strong>, with CBRE projecting S$2,900–S$3,000 psf. More conservative independent estimates suggest a base case around <strong>low-S$3,000 psf</strong>.</p>
      <p>It is also worth noting that a <strong>second adjacent Dunearn Road GLS parcel</strong> was awarded on 4 May 2026 at <strong>S$1,625 psf ppr</strong> — a significant step-up from the S$1,410 psf ppr paid for the Dunearn House site. This directly validates that the first-mover price advantage for Dunearn House buyers is real.</p>

      <h3>5. The Void in the CCR Leasehold Market Is Real</h3>
      <p>There is a genuine shortage of <strong>mid-sized 99-year leasehold condominiums in premium CCR sub-markets</strong> like Bukit Timah, Holland Village, and River Valley. These areas have historically been dominated by freehold projects.</p>
      <p>Dunearn House, as a 380-unit mid-sized 99-year leasehold condo, fills this gap and speaks directly to a new generation of buyers who value <strong>modern design, full facilities, fresh lease tenure, and transparent new-launch pricing</strong> over freehold bragging rights.</p>

      <h2>Who Is Dunearn House Best Suited For?</h2>
      <h3>Own-Stay Families</h3>
      <p>The combination of the education belt, green living, future MRT access, and quality developer execution makes Dunearn House an exceptionally strong <strong>long-term family home</strong>. If you are planning for primary school registration within the next 3–5 years, this is one of the most strategically well-located new launches you will find.</p>
      <h3>Upgraders from HDB</h3>
      <p>If you are upgrading from an HDB flat — particularly in mature estates like Bishan, Ang Mo Kio, Toa Payoh, or even Queenstown — Dunearn House represents a chance to enter a prestigious CCR address at new-launch pricing. As an upgrader buying a second residential property, you will be subject to <strong>ABSD of 20%</strong> unless you sell your HDB first. Timing your sale carefully (including the 15-month timeline) is critical.</p>
      <h3>Investors</h3>
      <p>For investors, the long-term capital appreciation thesis is anchored by the Turf City masterplan, future CRL connectivity, and scarce CCR supply. Rental demand from expat families drawn by the nearby international schools is robust.</p>

      <h2>Risks and Considerations to Keep in Mind</h2>
      <ul>
        <li><strong>99-year leasehold</strong>: Like all GLS condos, Dunearn House is leasehold. For a 30-year investment horizon, a fresh 99-year lease starting 2025 should not be a material concern.</li>
        <li><strong>Construction and TOP timeline</strong>: Expected TOP is 2029–2030. If you need a home urgently, this may not work for your timeline.</li>
        <li><strong>Land cost is not cheap</strong>: At S$1,410 psf ppr, launch pricing will sit comfortably in the S$3,000 psf range.</li>
        <li><strong>Precinct is still developing</strong>: The schools, MRT, green corridors, and masterplan amenities will take years to fully materialise.</li>
        <li><strong>ABSD for additional buyers</strong>: If this is not your first property, run the full financial model including ABSD, SSD lock-in, and TDSR constraints before committing.</li>
      </ul>

      <h2>Dunearn House vs. Other CCR Launches in 2026</h2>
      <table>
        <thead><tr><th>Project</th><th>Location</th><th>Tenure</th><th>Est. Launch PSF</th><th>Nearest MRT</th><th>Key Differentiator</th></tr></thead>
        <tbody>
          <tr><td><strong>Dunearn House</strong></td><td>District 11, Bukit Timah</td><td>99-year</td><td>~S$2,900–S$3,100</td><td>Sixth Ave (DT7)</td><td>First Turf City launch, education belt, masterplan upside</td></tr>
          <tr><td>River Modern</td><td>River Valley, D9</td><td>Freehold</td><td>~S$3,100–S$3,400</td><td>Great World (TE15)</td><td>Freehold, city-fringe lifestyle</td></tr>
          <tr><td>Vela Bay</td><td>Marina South</td><td>99-year</td><td>~S$2,800–S$3,200</td><td>Marina South Pier</td><td>Marina Bay views, waterfront living</td></tr>
          <tr><td>Skye at Holland</td><td>Holland Village, D10</td><td>99-year</td><td>~S$2,900–S$3,200</td><td>Holland Village (CC21)</td><td>Integrated lifestyle hub, mature estate</td></tr>
        </tbody>
      </table>

      <h2>Understanding the Payment Scheme</h2>
      <p>As a new launch GLS project, Dunearn House will use the <strong>Normal Progressive Payment Scheme (NPS)</strong>:</p>
      <ol>
        <li><strong>Option to Purchase (OTP)</strong>: 5% booking fee payable in cash</li>
        <li><strong>Exercise of OTP (within 3 weeks)</strong>: 15% (cash + CPF), plus Buyer's Stamp Duty (BSD)</li>
        <li><strong>Foundation completion</strong>: 10%</li>
        <li><strong>Structural framework</strong>: 10%</li>
        <li><strong>Partition walls</strong>: 5%</li>
        <li><strong>Ceiling/roofing</strong>: 5%</li>
        <li><strong>Doors, windows, plumbing</strong>: 5%</li>
        <li><strong>Car park/roads/drains</strong>: 5%</li>
        <li><strong>Temporary Occupation Permit (TOP)</strong>: 25%</li>
        <li><strong>Final completion (CSC)</strong>: 15%</li>
      </ol>
      <p>This means your payments are <strong>spread across the construction timeline (2026–2030)</strong>, easing the cashflow burden.</p>

      <h2>Frequently Asked Questions (FAQ)</h2>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is the expected launch price for Dunearn House?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Based on post-tender analyst estimates from CBRE and SRI, the expected launch price is around <strong>S$2,900–S$3,100 psf</strong>, with a base-case consensus settling around low-S$3,000 psf. Official prices will only be released by the developer at the showflat preview, expected in July 2026.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Where exactly is Dunearn House located?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Dunearn House is on Dunearn Road in District 11, within the Core Central Region (CCR). It is within walking distance of Sixth Avenue MRT Station (Downtown Line, DT7) and lies along the planned Bukit Timah–Rochor Green Corridor.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is Dunearn House freehold or leasehold?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">It is <strong>99-year leasehold</strong>, awarded from the 2025 Government Land Sales programme.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How many units does Dunearn House have?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">There are approximately <strong>380 units</strong> across five blocks of 10 to 19 storeys, with a mix of 2-bedroom, 3-bedroom, 4-bedroom, and 5-bedroom layouts. A 1-bedroom + study configuration may also be available.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What schools are near Dunearn House?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The development sits in the Bukit Timah education belt, within close proximity to Methodist Girls' School (Primary and Secondary), Nanyang Girls' High School, Nanyang Primary School, Hwa Chong Institution, National Junior College, and Henry Park Primary School, among others. This is one of Singapore's most coveted school clusters for primary school balloting purposes.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is the ABSD I need to pay for Dunearn House?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">ABSD depends on your citizenship and how many properties you own. As of 2026: Singapore Citizens buying their <strong>first</strong> property pay 0% ABSD; their <strong>second</strong> property, 20%. Permanent Residents buying their first property pay 5%; second, 30%. Foreigners pay 60% on any residential purchase.</p>
      </details>
      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          When is the expected TOP for Dunearn House?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The expected Temporary Occupation Permit (TOP) is projected to be between <strong>2029 and 2030</strong>, subject to construction progress and regulatory approvals.</p>
      </details>

      <h2>The Bottom Line: Is Dunearn House Worth It?</h2>
      <p>Dunearn House is not cheap — this is a CCR prime district new launch, and it will be priced accordingly. But the "steal" argument does hold up when you look at the full picture:</p>
      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">💡 2026 Key Takeaway for Buyers</p>
        <p class="text-sm text-violet-800">You are getting <strong>first-mover pricing</strong> into a government-backed, multi-decade precinct transformation. You are buying from a <strong>world-class developer consortium</strong>. You are in Singapore's <strong>most prized education belt</strong>, one of the few locations where living there translates directly into school registration advantages. And you are entering at a <strong>land cost that has already been validated as competitive</strong> by the fact that the adjacent plot sold 10 months later at S$1,625 psf ppr.</p>
        <p class="text-sm text-violet-800 mt-2">For families, upgraders with a long horizon, and investors who understand the Turf City story, this is a project worth looking at seriously.</p>
      </div>

      <h2>Your Next Step</h2>
      <p>Showflat previews for Dunearn House are expected to open in <strong>July 2026</strong>. Early registrants typically receive priority access, indicative pricing, and the first look at floor plans and unit availability.</p>
      <p><strong>Speak to a PropNex salesperson to:</strong></p>
      <ul>
        <li>Get the latest indicative pricing and floor plan details as they are released</li>
        <li>Run a full financial model including stamp duties, CPF usage, and loan eligibility</li>
        <li>Understand your ABSD position and whether decoupling or sequential purchase strategies apply to you</li>
        <li>Compare Dunearn House against other 2026 new launches suited to your goals</li>
      </ul>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/dunearn-vs-fourth-avenue" onclick="showArticle('post-dunearn-vs-fourth-avenue-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House vs Fourth Avenue Residences: Which Is the Better Investment? (2026)</strong></a></p>
      <p>2. <a href="/insights/dunearn-house-review-2026" onclick="showArticle('post-dunearn-house-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House Review 2026: Is It Worth Buying? (Honest Pros & Cons)</strong></a></p>
      <p>3. <a href="/insights/turf-city-masterplan-2026" onclick="showArticle('post-turf-city-masterplan-2026'); return false;" class="underline hover:text-violet-700"><strong>Turf City Masterplan 2026: What Dunearn House Buyers Need to Know</strong></a></p>
      <p>4. <a href="/insights/district-guide" onclick="showArticle('post-district-guide'); return false;" class="underline hover:text-violet-700"><strong>Which Singapore District Should You Buy In? The 2026 Growth Map</strong></a></p>
      <p>5. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>

      <p><em>Disclaimer: All PSF figures, TOP timelines, and pricing estimates are based on publicly available analyst and developer information as of June 2026 and are subject to change. Official pricing has not been released by the developer. This article is intended as general information and does not constitute financial or property investment advice. Always consult a licensed PropNex salesperson for personalised guidance.</em></p>
    `
  },

  /* ======================================================
     NEW ARTICLE 15 — DUNEARN VS FOURTH AVENUE
  ====================================================== */
  'post-dunearn-vs-fourth-avenue-2026': {
    title: 'Dunearn House vs Fourth Avenue Residences: Which Is the Better Investment? (2026)',
    date: '29 May 2026',
    readTime: '13 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/pulse/dunearn-vs-fourth-avenue-2026-jack-leow',
    body: `
      <p><strong>If you are weighing <strong>Dunearn House</strong> as an investment against the already-completed Fourth Avenue Residences, here is the short answer: Dunearn House is a <em>forward-looking</em> play built on first-mover advantage in the new Bukit Timah Turf City precinct, while Fourth Avenue Residences is a <em>proven</em> asset with real transaction data, a stable ~3–3.5% rental yield and a liquid resale market.</strong> They earn differently because they sit at different stages of the property life cycle. In this guide, you will learn how each stacks up on price, yield, growth drivers and risk — so you can decide which fits your goals.</p>

      <p><strong>A quick note on data:</strong> Dunearn House had not officially launched at the time of writing (showflat expected 2H 2026). Its pricing, exact unit mix and yields are not yet confirmed and must be verified at launch. Fourth Avenue Residences figures below are drawn from public transaction records.</p>

      <h2>Dunearn House at a Glance</h2>
      <p>Dunearn House is a <strong>99-year leasehold</strong> new launch on Dunearn Road, marketed as the first private residential project within the emerging <strong>Bukit Timah Turf City</strong> masterplan precinct.</p>

      <table>
        <thead><tr><th>Attribute</th><th>Details</th></tr></thead>
        <tbody>
          <tr><td>Tenure</td><td>99-year leasehold</td></tr>
          <tr><td>Developer</td><td>Frasers Property, Sekisui House, CSC Land Group</td></tr>
          <tr><td>Architect</td><td>Ong &amp; Ong</td></tr>
          <tr><td>Site area</td><td>~145,200 sq ft</td></tr>
          <tr><td>Units</td><td>~380 across 5 blocks (10–19 storeys)</td></tr>
          <tr><td>Nearest MRT</td><td>Downtown Line (Sixth Avenue / Fourth Avenue area)</td></tr>
          <tr><td>Expected launch</td><td>2026</td></tr>
          <tr><td>Expected TOP</td><td>~2030</td></tr>
          <tr><td>District</td><td>Marketed variously as D10 / D11 — <em>verify before relying on this</em></td></tr>
        </tbody>
      </table>

      <p><strong>Verify at launch:</strong> District classification, exact unit mix, indicative pricing, and confirmed MRT walking distance. Different marketing sites currently list inconsistent details.</p>

      <h2>Fourth Avenue Residences at a Glance</h2>
      <p>Fourth Avenue Residences is a <strong>completed</strong> 99-year leasehold condominium in Bukit Timah (District 10), giving investors something Dunearn House cannot yet offer: a track record.</p>

      <table>
        <thead><tr><th>Attribute</th><th>Details</th></tr></thead>
        <tbody>
          <tr><td>Tenure</td><td>99-year leasehold (lease commenced 2018)</td></tr>
          <tr><td>Developer</td><td>Allgreen Properties (Kuok Group)</td></tr>
          <tr><td>Completed</td><td>2022</td></tr>
          <tr><td>Units</td><td>476</td></tr>
          <tr><td>Nearest MRT</td><td>Sixth Avenue (DT7), Tan Kah Kee (DT8)</td></tr>
          <tr><td>Avg transacted PSF (past 12 mths)</td><td>~S$2,420–2,516 psf</td></tr>
          <tr><td>Rental yield</td><td>~3.0–3.5% gross</td></tr>
          <tr><td>District</td><td>10</td></tr>
        </tbody>
      </table>

      <p>Recent transaction data shows sale prices in the last 12 months ranging roughly from <strong>S$2,126 to S$2,850 psf</strong>, with a 947 sqft unit hitting S$2,850 psf in August 2025. Rentals span roughly <strong>S$3,600 to over S$10,000</strong> per month depending on size, and rental activity has been brisk — a sign of a liquid, tenant-friendly location.</p>

      <h2>Why Dunearn House Could Be a Strong Investment</h2>
      <p>There is a genuine investment thesis here — just one built on <em>future</em> potential rather than past performance.</p>

      <h3>1. First-mover advantage in Turf City</h3>
      <p>Dunearn House is positioned as the pioneer launch in a large master-planned precinct. Historically, first movers in transforming precincts can benefit if the wider area matures with new amenities, transport and retail. Early entry pricing <em>may</em> sit below later phases — but this is a thesis, not a guarantee.</p>

      <h3>2. Strong developer pedigree</h3>
      <p>Frasers Property, Sekisui House and CSC Land are established names. Sekisui House in particular is known for Japanese sustainability and build quality, which can support long-term desirability.</p>

      <h3>3. The Bukit Timah school belt</h3>
      <p>Proximity to top schools (e.g. Nanyang Primary, Raffles Girls' Primary, Hwa Chong Institution, National Junior College) is a durable demand driver for both own-stay families and tenants.</p>

      <h3>4. Supply scarcity in the prime city fringe</h3>
      <p>New private launches in this part of Bukit Timah are limited, which can support pricing for genuinely well-located, low-density projects.</p>

      <h3>5. New product premium</h3>
      <p>Brand-new units typically command a premium over older stock, come with full developer warranties, and appeal to buyers wanting the latest layouts and facilities.</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">💡 2026 Key Takeaway</p>
        <p class="text-sm text-violet-800">All of the above is <em>projected</em>. You are paying tomorrow's price for tomorrow's story, with construction risk, market-timing risk, and no rental income until TOP (~2030).</p>
      </div>

      <h2>So Why Does Fourth Avenue Residences "Earn" Differently?</h2>
      <p>Your question assumes Fourth Avenue Residences earns <em>less</em>. In reality, it earns <strong>differently</strong> — and arguably more reliably <em>today</em>. Here is why.</p>

      <h3>It already produces income</h3>
      <p>Fourth Avenue Residences is generating rent now. With a ~3–3.5% gross yield and brisk leasing activity, an investor can collect cash flow immediately. Dunearn House cannot pay you a cent in rent until it is built.</p>

      <h3>Its returns are proven, not projected</h3>
      <p>Fourth Avenue Residences has years of real URA-recorded transactions. You can see actual entry prices, exit prices, profitable vs loss-making resales, and rental ranges. Dunearn House's "returns" are entirely forecast.</p>

      <h3>Different point in the price curve</h3>
      <p>A 2022-completed project has already absorbed its initial new-launch premium and settled into a resale price band. A 2026 launch is <em>charging</em> that premium upfront. So Dunearn House may show stronger <em>headline</em> capital appreciation later — but partly because buyers pay more at the start.</p>

      <h3>Capital growth vs cash yield trade-off</h3>
      <ul>
        <li><strong>New launch (Dunearn House):</strong> higher <em>potential</em> capital upside, zero near-term income, longer hold, more risk.</li>
        <li><strong>Completed (Fourth Avenue):</strong> immediate income, more predictable, lower drama, but the easy early-stage capital jump may already be behind it.</li>
      </ul>

      <p>Neither is objectively "better." They suit different investors.</p>

      <h2>Dunearn House vs Fourth Avenue Residences: Side-by-Side</h2>

      <table>
        <thead><tr><th>Factor</th><th>Dunearn House</th><th>Fourth Avenue Residences</th></tr></thead>
        <tbody>
          <tr><td>Status</td><td>New launch (~2026)</td><td>Completed (2022)</td></tr>
          <tr><td>Tenure</td><td>99-yr leasehold</td><td>99-yr leasehold (from 2018)</td></tr>
          <tr><td>Rental income</td><td>None until ~TOP 2030</td><td>Immediate (~3–3.5% yield)</td></tr>
          <tr><td>Pricing data</td><td>Not yet released</td><td>Established (~S$2,420–2,516 psf)</td></tr>
          <tr><td>Capital growth</td><td>Higher <em>potential</em>, unproven</td><td>Moderate, proven</td></tr>
          <tr><td>Risk profile</td><td>Higher (construction, timing)</td><td>Lower (tangible asset)</td></tr>
          <tr><td>Best for</td><td>Long-horizon investors / future precinct believers</td><td>Income-focused / lower-risk investors</td></tr>
          <tr><td>Key uncertainty</td><td>Launch price &amp; precinct delivery</td><td>Lease decay over time</td></tr>
        </tbody>
      </table>

      <h2>Pros and Cons</h2>

      <h3>Dunearn House</h3>
      <ul>
        <li>✅ First-mover in a transforming precinct</li>
        <li>✅ Top-tier developer trio + new product premium</li>
        <li>✅ Strong school-belt and city-fringe demand</li>
        <li>❌ No income until ~2030</li>
        <li>❌ Launch pricing and yields still unverified</li>
        <li>❌ Higher execution and market-timing risk</li>
      </ul>

      <h3>Fourth Avenue Residences</h3>
      <ul>
        <li>✅ Immediate, proven rental income</li>
        <li>✅ Transparent, liquid resale market</li>
        <li>✅ Same prestigious Bukit Timah catchment</li>
        <li>❌ Early capital-growth phase likely behind it</li>
        <li>❌ Ageing lease (commenced 2018)</li>
        <li>❌ Less "new product" appeal than a fresh launch</li>
      </ul>

      <h2>Which Should You Choose?</h2>
      <ul>
        <li><strong>Choose Dunearn House if</strong> you have a long horizon (8–10+ years), believe in the Turf City transformation, can fund the purchase without needing rental income, and want a brand-new asset.</li>
        <li><strong>Choose Fourth Avenue Residences if</strong> you want income now, prefer proven numbers over projections, and value a lower-risk, liquid asset in the same prime catchment.</li>
      </ul>

      <p>For many investors, the smartest move is not "either/or" but matching the asset to your <strong>time horizon, cash flow needs, and risk appetite</strong> — plus your existing ABSD exposure.</p>

      <h2>2026 Considerations Every Buyer Should Check</h2>
      <ul>
        <li><strong>ABSD:</strong> Additional Buyer's Stamp Duty applies on second and subsequent properties and to foreigners — this materially changes investment maths. Confirm current rates with IRAS before committing.</li>
        <li><strong>SSD:</strong> Seller's Stamp Duty applies if you sell within the holding period — relevant for shorter-horizon plays. Verify the current holding-period rules.</li>
        <li><strong>Property tax (2026):</strong> Non-owner-occupied residential property is taxed on a progressive scale of Annual Value, higher than owner-occupier rates. Factor this into yield calculations.</li>
        <li><strong>Loan &amp; CPF:</strong> At 75% LTV, expect a 25% down-payment (minimum 5% in cash). Confirm your TDSR headroom.</li>
        <li><strong>Lease decay:</strong> Both are leasehold. Model how remaining lease affects future resale and bank financing.</li>
      </ul>

      <p><em>Always confirm current ABSD, SSD, LTV and property-tax figures with official sources (IRAS, MAS, URA) — these change and should be verified at the point of purchase.</em></p>

      <h2>Frequently Asked Questions (FAQ)</h2>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is Dunearn House a good investment?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">It has a credible thesis — first-mover status in Turf City, a strong developer trio and the Bukit Timah school belt. But with no launched price or rental track record, its returns are projected, not proven. Verify launch pricing before deciding.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Why does Fourth Avenue Residences earn less than a new launch might?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">It does not necessarily earn less — it earns differently. It produces rental income now (~3–3.5% yield) and has proven, transparent transaction data, whereas a new launch front-loads its premium and offers higher <em>potential</em> capital growth with more risk.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is the rental yield at Fourth Avenue Residences?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Public data indicates a gross rental yield of roughly 3.0–3.5%, with brisk rental activity. Always confirm against the latest figures for your specific unit type.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          When will Dunearn House launch and complete?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The showflat is expected in the second half of 2026, with TOP projected around 2030. Confirm dates with the developer, as launch timelines can shift.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Are Dunearn House and Fourth Avenue Residences in the same area?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes — both are in the Bukit Timah enclave near the Downtown Line. Note that Dunearn House's district classification (D10 vs D11) is listed inconsistently across marketing sites and should be verified.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Which is lower risk?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Fourth Avenue Residences, as a completed, income-producing asset with proven data. Dunearn House carries construction and market-timing risk typical of new launches.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Do I pay ABSD on either?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">ABSD depends on your residency status and how many properties you own — not on the project. Check current IRAS rates before committing.</p>
      </details>

      <h2>The Bottom Line</h2>
      <p>Dunearn House and Fourth Avenue Residences are not really competitors — they are two different <em>strategies</em>. Dunearn House is a long-horizon, growth-oriented bet on a transforming precinct. Fourth Avenue Residences is a proven, income-generating asset in the same prestigious catchment. The "better" investment is the one that matches your time horizon, cash flow needs and risk tolerance.</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">💡 2026 Key Takeaway for Investors</p>
        <p class="text-sm text-violet-800">Match the asset to your time horizon, cash flow needs and risk appetite — plus your existing ABSD exposure. For many, the smartest move is a balanced portfolio rather than all-in on one approach.</p>
      </div>

      <p><strong>Next step:</strong> Want a personalised comparison using your budget, ABSD position and investment timeline? <strong>Speak to a PropNex agent</strong> for a no-obligation analysis — including a side-by-side projection once Dunearn House pricing is released.</p>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>
      <p>2. <a href="/insights/dunearn-house-review-2026" onclick="showArticle('post-dunearn-house-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House Review 2026: Is It Worth Buying? (Honest Pros & Cons)</strong></a></p>
      <p>3. <a href="/insights/turf-city-masterplan-2026" onclick="showArticle('post-turf-city-masterplan-2026'); return false;" class="underline hover:text-violet-700"><strong>Turf City Masterplan 2026: What Dunearn House Buyers Need to Know</strong></a></p>
      <p>4. <a href="/insights/district-guide" onclick="showArticle('post-district-guide'); return false;" class="underline hover:text-violet-700"><strong>Which Singapore District Should You Buy In? The 2026 Growth Map</strong></a></p>
      <p>5. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>

      <p><em>Disclaimer: This article is for general information only and does not constitute financial or investment advice. Property figures and government rules (ABSD, SSD, LTV, property tax) change frequently — verify all data with official sources and a licensed professional before making any decision.</em></p>
    `
  },

  /* ======================================================
     NEW ARTICLE 16 — HOW TO BUY NEW LAUNCH 2026
  ====================================================== */
  'post-how-to-buy-new-launch-2026': {
    title: 'How to Buy a New Launch Condo in Singapore: A Step-by-Step 2026 Guide',
    date: '30 May 2026',
    readTime: '15 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/pulse/how-to-buy-new-launch-condo-2026-jack-leow',
    body: `
      <p><strong>To buy a new launch condo in Singapore, you'll: (1) get your finances and loan approval ready, (2) register interest and ballot for the project, (3) pick your unit on launch day and pay a 5% booking fee, (4) exercise the Option to Purchase (OTP) within the deadline, (5) pay stamp duties, and (6) follow the Progressive Payment Scheme until you collect keys at TOP.</strong> The whole journey runs from a few weeks to 3–4 years, because you're buying a property that is still being built.</p>

      <p>In this guide, you'll learn each step in order, the exact costs and deadlines to plan for, the documents you'll need, and the common mistakes that cost first-time buyers their booking fee or their dream unit.</p>

      <h2>Quick Answer: The New Launch Buying Process at a Glance</h2>
      <ol>
        <li><strong>Sort your finances</strong> — In-Principle Approval (IPA) and cash for the booking fee</li>
        <li><strong>Engage an agent and register interest</strong> in the project</li>
        <li><strong>Attend the launch / balloting</strong> and select your unit</li>
        <li><strong>Pay the 5% booking fee</strong> and receive the Option to Purchase (OTP)</li>
        <li><strong>Exercise the OTP</strong> (typically within 3 weeks) and pay the next portion</li>
        <li><strong>Pay Buyer's Stamp Duty</strong> (and ABSD if applicable) within 14 days of exercising</li>
        <li><strong>Sign the Sale &amp; Purchase Agreement (S&amp;P)</strong> within the statutory window</li>
        <li><strong>Follow the Progressive Payment Scheme</strong> through construction</li>
        <li><strong>Collect keys at TOP</strong>, with final payment at CSC</li>
      </ol>

      <p>Now let's walk through each stage in detail.</p>

      <h2>Step 1: Get Your Finances Ready Before You Step Into a Showflat</h2>
      <p>The biggest mistake buyers make is falling for a unit before they know what they can afford. Sort this first.</p>

      <h3>Check Your Loan Eligibility (TDSR and LTV)</h3>
      <ul>
        <li><strong>TDSR (Total Debt Servicing Ratio):</strong> Your total monthly debt obligations generally can't exceed 55% of your gross monthly income.</li>
        <li><strong>LTV (Loan-to-Value):</strong> A first bank-financed housing loan is typically capped at 75% of the price or valuation, with the first 5% of the down payment payable in cash (verify current LTV split with MAS / your bank before relying on it).</li>
      </ul>

      <h3>Get an In-Principle Approval (IPA)</h3>
      <p>An IPA is a bank's non-binding indication of how much it will lend you. <strong>Always secure your IPA before launch day</strong> — on a hot launch, you won't have time to sort financing after you've chosen a unit, and an unexercised booking fee can be forfeited.</p>

      <h3>Calculate Your Cash on Hand</h3>
      <p>You'll need ready cash for:</p>
      <ul>
        <li><strong>5% booking fee</strong> (cash, on the day)</li>
        <li><strong>Balance of the down payment</strong> (cash + CPF, due shortly after)</li>
        <li><strong>Buyer's Stamp Duty</strong> (and ABSD if applicable)</li>
        <li><strong>Legal fees</strong>, typically $2,500–$3,500</li>
      </ul>

      <h2>Step 2: Engage an Agent and Register Your Interest</h2>
      <p>For new launches, the developer appoints marketing agencies, and <strong>the buyer typically doesn't pay the agent's commission</strong> — it's borne by the developer. This means you can engage a salesperson to represent your interest at no direct cost.</p>

      <p>A good agent will:</p>
      <ul>
        <li>Send you the <strong>e-brochure, floor plans, and price list</strong> ahead of launch</li>
        <li>Advise on <strong>stack, facing, and unit selection</strong> strategy</li>
        <li>Register you for <strong>VIP preview / priority balloting</strong></li>
        <li>Walk you through the paperwork and deadlines</li>
      </ul>

      <p>Register your interest early. Priority previews and balloting positions often favour those who registered ahead of the public launch.</p>

      <h2>Step 3: Attend the Launch and Select Your Unit</h2>
      <p>On launch day (or the VIP preview), units are released and selected in order — often by ballot or queue position.</p>

      <h3>How Unit Selection Works</h3>
      <ul>
        <li>The developer releases units according to a <strong>balloting or queue system</strong>.</li>
        <li>When your number is called, you have a <strong>limited window</strong> to confirm your unit choice.</li>
        <li>Popular stacks go fast, so have a <strong>first, second, and third choice ready</strong> by stack and floor.</li>
      </ul>

      <h3>What to Prioritise When Choosing a Unit</h3>
      <ul>
        <li><strong>Facing and orientation</strong> — afternoon sun, noise, and views materially affect resale value.</li>
        <li><strong>Stack</strong> — corner units, sea/greenery-facing, or low-traffic stacks tend to hold value better.</li>
        <li><strong>Layout efficiency</strong> — a well-planned smaller unit can live larger than a bigger inefficient one.</li>
        <li><strong>Quantum</strong> — the total price you can comfortably service, not just the PSF.</li>
      </ul>

      <h2>Step 4: Pay the Booking Fee and Receive the Option to Purchase (OTP)</h2>
      <p>Once you confirm your unit, you pay the <strong>booking fee — typically 5% of the purchase price</strong> — and the developer issues you the <strong>Option to Purchase (OTP)</strong>.</p>

      <ul>
        <li>The booking fee is usually paid by <strong>cheque or cashier's order</strong> (confirm accepted methods with the developer).</li>
        <li>The OTP gives you the <strong>exclusive right to buy that specific unit</strong> for a fixed period.</li>
        <li>The developer then sends the <strong>Sale &amp; Purchase Agreement (S&amp;P)</strong>, usually within a couple of weeks.</li>
      </ul>

      <p>At this stage you've reserved your unit — but you haven't committed to completing yet.</p>

      <h2>Step 5: Exercise the OTP (or Walk Away)</h2>
      <p>You now have a decision window — <strong>typically around 3 weeks</strong> from receiving the S&amp;P — to exercise the option.</p>

      <h3>If You Exercise</h3>
      <p>You sign the <strong>S&amp;P Agreement</strong> and pay the next portion of the down payment (so your total typically reaches the standard down-payment level). You're now contractually committed to the purchase.</p>

      <h3>If You Don't Exercise</h3>
      <p>You forfeit a portion of the booking fee (commonly <strong>25% of the 5% booking fee</strong>, i.e. 1.25% of the price — verify with the specific developer's terms). The unit is released back to the developer.</p>

      <p><strong>This is why your financing must be locked before you book.</strong> Booking on hope and failing to exercise is an expensive lesson.</p>

      <h2>Step 6: Pay Your Stamp Duties</h2>
      <p>After exercising the OTP, stamp duties fall due — generally <strong>within 14 days</strong> of exercising the option (verify current deadline with IRAS).</p>

      <h3>Buyer's Stamp Duty (BSD)</h3>
      <p>BSD applies to every residential purchase on a <strong>progressive scale</strong> based on price or value, whichever is higher. Higher-value tiers attract higher rates (verify the current bands and rates with IRAS before publishing).</p>

      <h3>Additional Buyer's Stamp Duty (ABSD), If Applicable</h3>
      <p>ABSD depends on your profile and how many residential properties you already own:</p>
      <ul>
        <li><strong>Singapore Citizens:</strong> 0% on the first property; higher rates on the second and subsequent (as of 2026 — verify with IRAS).</li>
        <li><strong>PRs and foreigners:</strong> higher tiers apply.</li>
        <li><strong>ABSD remission</strong> may be available for married couples buying a replacement matrimonial home, subject to strict timing rules on selling the first property.</li>
      </ul>

      <h2>Step 7: Follow the Progressive Payment Scheme (PPS)</h2>
      <p>Because a new launch is a <strong>Building Under Construction (BUC)</strong>, you pay in stages tied to construction milestones — not in a single lump sum.</p>

      <h3>How the Progressive Payment Scheme Works</h3>

      <table>
        <thead><tr><th>Stage</th><th>Typical % of Price</th><th>When It's Due</th></tr></thead>
        <tbody>
          <tr><td>Booking fee</td><td>5%</td><td>On selecting the unit</td></tr>
          <tr><td>Exercise OTP / sign S&amp;P</td><td>Top-up to ~20%</td><td>Within ~3 weeks + 14 days for stamp duty</td></tr>
          <tr><td>Foundation completed</td><td>~10%</td><td>As construction reaches stage</td></tr>
          <tr><td>Reinforced concrete framework</td><td>~10%</td><td>As construction reaches stage</td></tr>
          <tr><td>Brick walls</td><td>~5%</td><td>As construction reaches stage</td></tr>
          <tr><td>Roofing, electrical, plumbing</td><td>~5%</td><td>As construction reaches stage</td></tr>
          <tr><td>Car park, roads, drains</td><td>~5%</td><td>As construction reaches stage</td></tr>
          <tr><td><strong>TOP (Temporary Occupation Permit)</strong></td><td>~25%</td><td>Keys collected</td></tr>
          <tr><td><strong>CSC (Certificate of Statutory Completion)</strong></td><td>~15%</td><td>Final payment</td></tr>
        </tbody>
      </table>

      <p><em>(Percentages above are the standard PPS structure — confirm the exact schedule in your S&amp;P.)</em></p>

      <p>The key benefit: your <strong>mortgage instalments start small and grow</strong> as the bank disburses the loan in stages, easing cash flow during the 3–4 year build.</p>

      <h2>Step 8: Collect Your Keys at TOP</h2>
      <p>When the project receives its <strong>Temporary Occupation Permit (TOP)</strong>, you can collect keys, inspect your unit, and move in or rent it out.</p>

      <h3>What to Do at Key Collection</h3>
      <ul>
        <li><strong>Inspect thoroughly</strong> and document every defect (a defects checklist is essential).</li>
        <li>Submit your <strong>defects list</strong> within the developer's <strong>defects liability period</strong> (commonly 12 months from TOP).</li>
        <li>The developer is obliged to rectify legitimate defects within that period.</li>
      </ul>

      <p>Final legal completion follows at <strong>CSC (Certificate of Statutory Completion)</strong>, when the last payment is made and the title is fully transferred in due course.</p>

      <h2>Costs to Budget For (Full Checklist)</h2>

      <table>
        <thead><tr><th>Cost</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Booking fee</td><td>5% of price, cash, on the day</td></tr>
          <tr><td>Balance down payment</td><td>Top-up via cash + CPF</td></tr>
          <tr><td>Buyer's Stamp Duty (BSD)</td><td>Progressive scale (verify rates with IRAS)</td></tr>
          <tr><td>ABSD (if applicable)</td><td>Depends on profile / property count</td></tr>
          <tr><td>Legal / conveyancing fees</td><td>~$2,500–$3,500</td></tr>
          <tr><td>Bank / valuation fees</td><td>Varies by lender</td></tr>
          <tr><td>Mortgage instalments</td><td>Start small, grow under PPS</td></tr>
          <tr><td>MCST / maintenance</td><td>From TOP onward, often $300–$600+/month</td></tr>
          <tr><td>Minor fit-out</td><td>Curtains, lighting, built-ins, even for new units</td></tr>
        </tbody>
      </table>

      <h2>Common Mistakes When Buying a New Launch</h2>
      <ol>
        <li><strong>No IPA before launch day.</strong> You'll lose your unit — or your booking fee — if financing isn't ready.</li>
        <li><strong>Booking on emotion.</strong> Stack, facing, and layout matter more than showflat styling.</li>
        <li><strong>Underestimating ABSD timing.</strong> Upgraders buying before selling can face heavy ABSD unless remission timing is hit precisely.</li>
        <li><strong>Ignoring the defects window.</strong> Document everything at key collection — the liability period is finite.</li>
        <li><strong>Forgetting the fit-out budget.</strong> "New" doesn't mean move-in-ready; you'll still spend on curtains, lighting, and built-ins.</li>
        <li><strong>Choosing on PSF alone.</strong> A low PSF on a poor layout gives you less usable, sellable space.</li>
      </ol>

      <h2>Frequently Asked Questions (FAQ)</h2>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How much deposit do I need to buy a new launch condo?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">You'll need a 5% booking fee in cash on the day you select your unit, then top up to the standard down payment (commonly around 20%, payable via cash and CPF) when you exercise the OTP. Stamp duties and legal fees are on top of this.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Do I pay agent commission when buying a new launch?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Generally no. For new launches, the developer pays the marketing agency's commission, so you can engage a salesperson to represent you at no direct cost.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How long does it take to buy a new launch condo?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The booking-to-commitment stage takes a few weeks (booking fee, then exercising the OTP within ~3 weeks). But because it's a Building Under Construction, you typically wait 3–4 years to collect keys at TOP.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What happens if I don't exercise the Option to Purchase?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">You forfeit a portion of your booking fee — commonly 25% of the 5% (i.e. about 1.25% of the price) — and the unit returns to the developer. Confirm the exact terms in your OTP.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Can I use CPF to buy a new launch condo?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes, subject to CPF housing rules and limits. CPF can fund part of the down payment and monthly instalments, though the first 5% booking fee is paid in cash. Check your CPF Ordinary Account balance and usage limits before you commit.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          When do I start paying my mortgage for a new launch?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Under the Progressive Payment Scheme, the bank disburses your loan in stages as construction progresses, so instalments start small and increase over the build period — easing cash flow compared with a resale lump-sum purchase.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is the difference between TOP and CSC?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">TOP (Temporary Occupation Permit) means the building is safe to occupy — you collect keys and can move in. CSC (Certificate of Statutory Completion) is the final legal sign-off, when the last payment is made and statutory requirements are fully met.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is buying a new launch riskier than resale?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">There are different risks: new launches carry off-plan risk (TOP delays, market shifts during the build), while resale carries hidden-defect and ageing-facility risk. Neither is universally riskier — it depends on your timeline and risk appetite.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Should HDB upgraders choose new launch condos or resale in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Most HDB upgraders with equity and 5+ year horizon benefit from new launch condos because the progressive payment scheme aligns cash flow with HDB sale, and you capture new precinct growth. Choose resale if you must move in fast or need rental income immediately. See our dedicated new launch vs resale guides.</p>
      </details>

      <h2>Final Word: Preparation Beats Speed</h2>
      <p>Buying a new launch isn't about being fastest on launch day — it's about being <strong>fully prepared before you walk in.</strong> Lock your financing, know your budget down to the stamp duty, have your stack choices ranked, and understand every deadline. Buyers who do this walk away with the unit they wanted at a price they planned for. Buyers who improvise lose deposits.</p>

      <p><strong>Your Next Step</strong></p>
      <p>If you'd like help preparing for a specific launch — from securing your IPA and shortlisting stacks to walking through the full payment timeline — a 30-minute session with a PropNex agent will get you launch-day ready with a clear plan and live project data.</p>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>
      <p>2. <a href="/insights/new-launch-vs-resale-cheaper-2026" onclick="showArticle('post-new-launch-vs-resale-cheaper-2026'); return false;" class="underline hover:text-violet-700"><strong>Are New Launch Condos Cheaper Than Resale? A 2026 Singapore Buyer\'s Guide</strong></a></p>
      <p>3. <a href="/insights/cpf-private" onclick="showArticle('post-cpf-private'); return false;" class="underline hover:text-violet-700"><strong>How Much CPF Can You Use for a Private Property in Singapore? (2026 Guide)</strong></a></p>
      <p>4. <a href="/insights/dunearn-house-review-2026" onclick="showArticle('post-dunearn-house-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House Review 2026: Is It Worth Buying? (Honest Pros & Cons)</strong></a></p>
      <p>5. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>

      <p><em>Disclaimer: This article is for general informational purposes and does not constitute financial, tax, or legal advice. Booking fees, stamp duty rates, LTV limits, CPF rules, OTP terms, and payment schedules are subject to change and vary by project — always verify current figures with IRAS, MAS, CPF Board, and your developer's S&amp;P before making any property decision. Speak to a qualified property agent and your financial advisor for advice tailored to your circumstances.</em></p>
    `
  },

  /* ======================================================
     NEW ARTICLE 17 — NEW LAUNCH VS RESALE CHEAPER 2026
  ====================================================== */
  'post-new-launch-vs-resale-cheaper-2026': {
    title: 'Are New Launch Condos Cheaper Than Resale? A 2026 Singapore Buyer\'s Guide',
    date: '31 May 2026',
    readTime: '12 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/pulse/new-launch-vs-resale-cheaper-2026-jack-leow',
    body: `
      <p><strong>Short answer: no — new launch condos are usually more expensive than resale on a per-square-foot (PSF) basis, often by 15%–35% in the same area.</strong> But that headline hides the part that actually matters to your wallet: new launches typically demand far less cash upfront thanks to the progressive payment scheme, and their total cost over time can work out differently once you factor in renovation, holding costs, and capital growth.</p>

      <p>In this guide, you'll learn why new launches command a price premium, when that premium is worth paying, the situations where resale wins outright, and how to compare the two on total cost — not just sticker PSF.</p>

      <h2>Quick Answer: New Launch vs Resale Pricing in 2026</h2>
      <ul>
        <li><strong>On PSF:</strong> Resale is almost always cheaper. New launches in the same precinct typically sell at a <strong>15%–35% premium</strong> (verify current gap with URA Realis / EdgeProp before publishing).</li>
        <li><strong>On upfront cash:</strong> New launches usually win, because the <strong>Progressive Payment Scheme (PPS)</strong> spreads payment over the 3–4 year construction period.</li>
        <li><strong>On total cost:</strong> It depends. Add renovation (often $50k–$120k for resale), holding costs, and projected capital growth before you decide.</li>
        <li><strong>On move-in timing:</strong> Resale wins — you can move in within ~3 months versus waiting 3–4 years for TOP.</li>
      </ul>

      <p>So "cheaper" is the wrong question. The right question is: <em>cheaper on what — PSF, upfront cash, or total cost over my holding period?</em></p>

      <h2>Why New Launch Condos Cost More Per Square Foot</h2>
      <p>There are concrete reasons new launches carry a premium. Understanding them helps you judge whether the premium is justified.</p>

      <h3>1. Higher Land and Construction Costs</h3>
      <p>Developers buy land at today's prices and build at today's construction costs, which reset sharply higher after 2022 and have largely stayed elevated. That break-even cost gets baked into the launch PSF. A resale unit completed in, say, 2016 was built on a cheaper cost base.</p>

      <h3>2. Brand-New Condition (Zero Renovation)</h3>
      <p>You are paying for fresh finishes, new appliances, and a fresh 99-year (or freehold) clock. A resale unit usually needs $50k–$120k+ of renovation to feel new, which narrows the gap once you account for it.</p>

      <h3>3. The "New" Premium and Developer Marketing</h3>
      <p>New launches are marketed heavily, sold in a controlled environment (showflats, staged pricing, launch-day momentum), and priced for the developer's margin. Buyers also pay for the optionality of being early in a precinct's transformation.</p>

      <h3>4. Latest Layouts and Facilities</h3>
      <p>Newer projects often have more efficient layouts, smarter unit mixes, and updated facilities (co-working lounges, larger gyms, smart-home features) that older developments lack.</p>

      <h2>Why Resale Condos Are Usually Cheaper on PSF</h2>
      <p>The flip side explains the discount:</p>
      <ul>
        <li><strong>Older cost base.</strong> Built and sold at earlier price levels.</li>
        <li><strong>Visible wear.</strong> Ageing finishes, older facilities, and dated layouts.</li>
        <li><strong>Renovation needed.</strong> The lower price often reflects work the buyer must fund.</li>
        <li><strong>Lease decay.</strong> For 99-year leasehold, a shorter remaining lease pulls the price down — and matters a lot once the balance dips toward 60 years.</li>
        <li><strong>Larger, less efficient floor plates.</strong> Older units are often physically bigger, which can mean a lower PSF but a higher total quantum.</li>
      </ul>

      <h2>The Catch: Upfront Cash Tells a Different Story</h2>
      <p>This is where many buyers get the picture wrong. Even though a new launch has a higher PSF, it usually needs <strong>less cash today</strong>, because of the <strong>Progressive Payment Scheme</strong>.</p>

      <h3>How the Progressive Payment Scheme Works (Simplified)</h3>
      <p>With a new launch bought under construction (BUC), you pay in stages tied to building milestones:</p>
      <ol>
        <li><strong>Booking fee</strong> (typically 5%, in cash) on the option to purchase</li>
        <li><strong>Down payment</strong> to top up to the standard amount, due within weeks (subject to LTV rules)</li>
        <li><strong>Progressive disbursements</strong> as the project hits each construction stage (foundation, walls, roofing, etc.)</li>
        <li><strong>Final payments</strong> at TOP and CSC</li>
      </ol>

      <p>Because your loan is disbursed in stages, your <strong>monthly mortgage starts small and grows</strong> as construction progresses — easing cash flow during the build.</p>

      <h3>Resale: Lump-Sum Reality</h3>
      <p>With resale, you typically complete within ~12 weeks, which means:</p>
      <ul>
        <li>Full down payment due upfront</li>
        <li>Full mortgage instalments begin almost immediately</li>
        <li>Renovation cash needed before you can move in</li>
      </ul>

      <p>So a resale unit with a <em>lower</em> PSF can still demand <em>more</em> cash in your first 12–18 months than a new launch with a higher PSF.</p>

      <h2>New Launch vs Resale: Total Cost Comparison</h2>

      <table>
        <thead><tr><th>Cost Factor</th><th>New Launch</th><th>Resale</th></tr></thead>
        <tbody>
          <tr><td>Price PSF</td><td>Higher (premium of ~15%–35%)</td><td>Lower</td></tr>
          <tr><td>Upfront cash strain</td><td>Lower (progressive payment)</td><td>Higher (lump sum within ~12 weeks)</td></tr>
          <tr><td>Mortgage start</td><td>Small, grows with construction</td><td>Full instalment almost immediately</td></tr>
          <tr><td>Renovation</td><td>Minimal (new finishes)</td><td>$50k–$120k+ typical</td></tr>
          <tr><td>Move-in timing</td><td>3–4 years (wait for TOP)</td><td>~3 months</td></tr>
          <tr><td>Rental income</td><td>Only after TOP</td><td>Immediate</td></tr>
          <tr><td>BSD / ABSD</td><td>Same rules apply</td><td>Same rules apply</td></tr>
          <tr><td>Maintenance (early years)</td><td>Lower (new)</td><td>Higher (ageing)</td></tr>
          <tr><td>Capital growth potential</td><td>Higher if precinct transforms</td><td>Steadier, more predictable</td></tr>
        </tbody>
      </table>

      <p>The takeaway: a new launch can be <strong>more expensive per square foot yet easier on near-term cash flow</strong>, while a resale can be <strong>cheaper per square foot yet heavier on day-one cash and renovation</strong>.</p>

      <h2>When a New Launch Is Worth the Premium</h2>
      <p>Pay the premium when:</p>
      <ul>
        <li><strong>You can wait 3–4 years</strong> for keys and don't need to move in now.</li>
        <li><strong>Your cash flow is tight today</strong> but improving — PPS spreads the strain.</li>
        <li><strong>You believe in the precinct's transformation</strong> (new MRT lines, masterplan upgrades, en-bloc-driven renewal in areas like Bayshore, Lentor, or Marina South — verify launch status before publishing).</li>
        <li><strong>You want zero renovation hassle</strong> and a fresh lease.</li>
        <li><strong>You're an investor</strong> betting on capital appreciation from launch price to TOP and beyond.</li>
      </ul>

      <h2>When Resale Wins Outright</h2>
      <p>Choose resale when:</p>
      <ul>
        <li><strong>You need to move in within 6 months.</strong></li>
        <li><strong>You want immediate rental income</strong> rather than a 3–4 year wait.</li>
        <li><strong>You value space and proven layouts</strong> — older units are often larger and more efficient.</li>
        <li><strong>You want a known product</strong> with no off-plan, TOP-delay, or market-shift-during-build risk.</li>
        <li><strong>You're buying in a mature estate</strong> where comparable transacted data makes pricing transparent and negotiable.</li>
      </ul>

      <h2>A Worked Example: How "Cheaper" Flips</h2>
      <p>Consider two hypothetical 3-bedroom units in the same OCR precinct (illustrative figures — replace with current transacted data before publishing):</p>
      <ul>
        <li><strong>Resale unit:</strong> $1.7m at a lower PSF, but needs ~$80k renovation, full mortgage from month one, and lump-sum completion.</li>
        <li><strong>New launch unit:</strong> $1.95m at a higher PSF, but under PPS you pay the booking fee and staged down payment, with mortgage instalments starting small and ramping up over 3–4 years.</li>
      </ul>

      <p>On PSF, the resale is clearly cheaper. But in the <strong>first 18 months</strong>, the new launch buyer may part with significantly less cash, because they're not funding renovation, not servicing a full mortgage, and not completing in a lump sum. Whether the resale's lower price ultimately wins depends on your holding period and the precinct's capital growth.</p>

      <p>This is exactly why "are new launch condos cheaper than resale?" can't be answered with a yes or no until you define your timeframe.</p>

      <h2>How to Compare the Two Properly (5 Steps)</h2>
      <ol>
        <li><strong>Pull transacted PSF</strong> for both new launch and resale in the same precinct over the last 6–12 months (URA Realis / EdgeProp).</li>
        <li><strong>Calculate the real premium</strong> — not the brochure price, the actual gap versus comparable resale.</li>
        <li><strong>Add renovation</strong> to the resale's effective cost.</li>
        <li><strong>Map your cash flow</strong> month by month for the first 24 months under each option.</li>
        <li><strong>Project your exit</strong> — estimate capital growth and net proceeds for your expected holding period, after SSD if applicable.</li>
      </ol>

      <p>If you do all five, the "cheaper" option usually becomes obvious for <em>your</em> situation — which is the only situation that matters.</p>

      <h2>Frequently Asked Questions (FAQ)</h2>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Are new launch condos always more expensive than resale?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">On a PSF basis, almost always yes — typically a 15%–35% premium in the same area (verify the current gap with URA data). But on upfront cash required in the first year, new launches are often cheaper because of the Progressive Payment Scheme.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Why are new launch condos so expensive in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Three main reasons: higher land prices paid by developers, elevated construction costs that reset upward after 2022, and the brand-new "premium" of fresh finishes plus a full lease term. Marketing and developer margins also factor in.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is it cheaper to buy a resale condo and renovate?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Sometimes, but not always. A resale unit's lower price is often partly offset by $50k–$120k+ of renovation plus immediate full mortgage payments. Once you add these, the gap to a new launch narrows considerably.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Do new launch and resale condos have the same stamp duty?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes. Buyer's Stamp Duty (BSD) and, where applicable, Additional Buyer's Stamp Duty (ABSD) follow the same rules regardless of whether the unit is new or resale (verify current rates and bands with IRAS).</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Which appreciates faster, new launch or resale?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">New launches in transforming precincts often show stronger capital appreciation from launch to TOP, but they also carry more uncertainty. Resale in mature estates tends to appreciate more steadily and predictably. Neither is universally better.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Can I negotiate the price of a new launch condo?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Generally there's limited room — developers control pricing and release units in stages. Resale, by contrast, is usually negotiable since you're dealing with an individual seller and transparent comparable data.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          New launch condos or resale condos — which has better resale value later?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">New launches in masterplan areas (e.g. Turf City, Jurong Lake District) often see the biggest uplift from launch price to TOP + early resale because they capture the infrastructure premium first. Mature resale estates have steadier but smaller step-ups. Liquidity is usually better for established resale addresses.</p>
      </details>

      <h2>Final Word: "Cheaper" Depends on Your Timeline and Cash Flow</h2>
      <p>If you're comparing only the price tag, resale is usually cheaper per square foot. But once you account for upfront cash, renovation, holding period, and capital growth, the answer genuinely flips depending on your circumstances.</p>

      <p>The smart move isn't to ask which is cheaper in general — it's to model both options against <em>your</em> budget, timeline, and goals.</p>

      <p><strong>Your Next Step</strong></p>
      <p>If you'd like a side-by-side comparison using live transacted data for a specific precinct — including a month-by-month cash flow projection for both a new launch and a resale option — a 30-minute session with a PropNex agent will give you real numbers instead of brochure figures.</p>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/how-to-buy-new-launch-2026" onclick="showArticle('post-how-to-buy-new-launch-2026'); return false;" class="underline hover:text-violet-700"><strong>How to Buy a New Launch Condo in Singapore: A Step-by-Step 2026 Guide</strong></a></p>
      <p>2. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>
      <p>3. <a href="/insights/new-launch-vs-resale" onclick="showArticle('post-new-launch-vs-resale'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo in 2026: Which Should You Buy?</strong></a></p>
      <p>4. <a href="/insights/dunearn-house-review-2026" onclick="showArticle('post-dunearn-house-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House Review 2026: Is It Worth Buying? (Honest Pros & Cons)</strong></a></p>
      <p>5. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>

      <p><em>Disclaimer: This article is for general informational purposes and does not constitute financial, tax, or legal advice. PSF premiums, ABSD/BSD rates, LTV limits, and payment scheme rules are subject to change — always verify current figures with IRAS, MAS, CPF Board, and URA before making any property decision. Speak to a qualified property agent and your financial advisor for advice tailored to your circumstances.</em></p>
    `
  },

  /* ======================================================
     NEW ARTICLE 18 — WHICH CONDO TO BUY 2026
  ====================================================== */
  'post-which-condo-to-buy-2026': {
    title: 'Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide',
    date: '1 Jun 2026',
    readTime: '14 min read',
    category: 'WEALTH BUILDING',
    chipClass: 'chip-wealth',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/pulse/which-condo-to-buy-singapore-2026-jack-leow',
    body: `
      <p><strong>The best condo to buy in Singapore in 2026 is the one that matches three things: <strong>your purpose</strong> (own-stay, upgrade, or investment), <strong>your holding horizon</strong>, and <strong>your financial headroom</strong> after ABSD, BSD, and CPF deductions — not the project with the loudest hoarding.</strong> For most buyers this year, that means prioritising location fundamentals, sensible quantum, and developer track record over chasing hype.</p>

      <p>In this guide, you'll learn exactly how to shortlist projects in 2026, when a new launch beats a resale (and when it doesn't), which precincts deserve a second look, and the common mistakes that quietly cost buyers tens of thousands of dollars.</p>

      <h2>Quick Answer: How to Decide Which Condo to Buy in 2026</h2>
      <p>If you only have two minutes, here is the framework experienced buyers use:</p>
      <ol>
        <li><strong>Define your purpose first.</strong> Own-stay, upgrader, or investor — each leads to a very different shortlist.</li>
        <li><strong>Set a realistic all-in budget.</strong> Include BSD, ABSD (if applicable), legal fees, renovation, and a 12-month cash buffer.</li>
        <li><strong>Pick your location tier.</strong> CCR (Core Central Region), RCR (Rest of Central Region), or OCR (Outside Central Region). Each has a different risk-return profile in 2026.</li>
        <li><strong>Compare on objective criteria.</strong> Price PSF vs. transacted comps, layout efficiency, MRT walking time, lease balance, and unit mix.</li>
        <li><strong>Stress-test the financing.</strong> Use today's interest rate plus 1.5%, not yesterday's promo rate.</li>
      </ol>

      <p>If you do these five things honestly, the right shortlist usually narrows to three to five projects within a week.</p>

      <h2>Start With Your Buyer Profile</h2>
      <p>The single biggest mistake in 2026 is shopping for a condo before you know which buyer you are. The "best" project for an HDB upgrader is rarely the same one an investor should chase.</p>

      <h3>HDB Upgrader</h3>
      <p>You are likely selling a flat, navigating MOP, and watching ABSD timing carefully. Your priorities should be:</p>
      <ul>
        <li><strong>Quantum control.</strong> Most upgraders look at the $1.6m–$2.4m band for a 3-bedroom unit, depending on region and project.</li>
        <li><strong>Bridging cash flow.</strong> If you buy before selling, ABSD on the second property is steep — though it can be remitted if you dispose of your first home within the qualifying period (verify the current window with IRAS before committing).</li>
        <li><strong>School and family infrastructure.</strong> A 1km radius from a primary school can swing your shortlist significantly.</li>
      </ul>

      <h3>First-Time Own-Stay Buyer</h3>
      <p>You are looking for a home you will live in for 7–15 years. Your priorities:</p>
      <ul>
        <li><strong>Layout efficiency over PSF.</strong> A well-planned 750 sqft 2-bedder often lives larger than a poorly designed 850 sqft unit.</li>
        <li><strong>Commute and lifestyle fit.</strong> Walk the route to MRT at 8am on a weekday before you commit.</li>
        <li><strong>Developer track record.</strong> Defects in the first year are normal; how the developer handles them is not.</li>
      </ul>

      <h3>Investor (Rental Yield + Capital Growth)</h3>
      <p>You want net yield after ABSD, mortgage, MCST and tax — not the gross yield in the brochure. Your priorities:</p>
      <ul>
        <li><strong>Tenant demand zones.</strong> One-North, Paya Lebar, Jurong Lake District, and the CBD fringe continue to attract working tenants in 2026.</li>
        <li><strong>Right-sized units.</strong> 1- and 2-bedders rent faster but appreciate less. 3-bedders rent slower but suit family relocations.</li>
        <li><strong>Exit liquidity.</strong> A project with 300+ units typically resells faster than a boutique 60-unit block.</li>
      </ul>

      <h3>Multi-Property Owner</h3>
      <p>ABSD is the elephant in the room. For a Singaporean buying their second property, ABSD is 20% (as of 2026 — verify current rate with IRAS); 30% for a third. PRs and foreigners face higher tiers. Decoupling rules also tightened over recent years, so any strategy involving spouse-only ownership needs a fresh legal review, not advice from a 2021 forum thread.</p>

      <h2>Key 2026 Market Considerations</h2>
      <p>Before you fall in love with a unit, understand the conditions you are buying into.</p>

      <h3>1. Interest Rate Environment</h3>
      <p>Mortgage rates in 2025 moderated from the 2023–2024 highs. In 2026, most buyers should still stress-test affordability at a 4%–4.5% rate even if their bank is offering lower promotional terms. Floating SORA-pegged packages and fixed packages each have a place — your choice depends on holding horizon, not the lowest first-year rate.</p>

      <h3>2. Cooling Measures Still in Effect</h3>
      <p>The framework you need to plan around:</p>
      <ul>
        <li><strong>ABSD</strong> (Additional Buyer's Stamp Duty) on second and subsequent properties</li>
        <li><strong>SSD</strong> (Seller's Stamp Duty) if you sell within the holding period — note that SSD rates and holding period were revised in mid-2025; verify the latest figures with IRAS</li>
        <li><strong>LTV limits</strong> typically capping first housing loans at 75% (subject to age and tenure conditions)</li>
        <li><strong>TDSR</strong> at 55% of gross monthly income</li>
        <li><strong>MSR</strong> at 30% for HDB and EC loans (not applicable to private condos)</li>
      </ul>

      <p>These are not going away in 2026. Build them into your sums on Day 1.</p>

      <h3>3. Supply Pipeline</h3>
      <p>The pipeline of new launches in 2026 is healthier than in 2022–2023, with notable launches expected across the Bayshore precinct, Lentor cluster, Marina South, and continued activity in Tengah and the former en-bloc sites such as Thomson View and Dunearn House (verify launch status before publishing). More supply generally means more negotiating room — but also more shortlist fatigue.</p>

      <h3>4. Construction Costs and Quality</h3>
      <p>Post-2022 construction costs reset upward and have largely stayed there. Newer launches reflect this in higher break-even PSF. Translation: do not expect 2019 prices in 2026, and treat any project priced suspiciously below the precinct's comps with caution.</p>

      <h2>Where to Buy: 2026 Locations That Make Sense</h2>
      <p>Singapore is small, but the micro-markets behave very differently. Here is how to think about each region.</p>

      <h3>Core Central Region (CCR)</h3>
      <p>Districts 9, 10, 11 plus Sentosa and parts of D1/D6. CCR underperformed RCR and OCR for much of the last cycle, which has narrowed the price gap. In 2026, CCR can make sense for:</p>
      <ul>
        <li>Long-hold own-stay buyers who value prestige addresses</li>
        <li>Singaporean buyers benefiting from the narrowed CCR-vs-RCR PSF gap</li>
        <li>Investors targeting expat tenants in a recovering rental market</li>
      </ul>

      <h3>Rest of Central Region (RCR)</h3>
      <p>The "sweet spot" for many upgraders. Think District 3 (Tiong Bahru, Alexandra), District 5 (Pasir Panjang), District 8 (Farrer Park), District 15 (East Coast). RCR projects typically offer:</p>
      <ul>
        <li>City fringe convenience without CCR pricing</li>
        <li>Stronger rental demand from young professionals</li>
        <li>Better resale liquidity than ultra-luxury CCR units</li>
      </ul>

      <h3>Outside Central Region (OCR)</h3>
      <p>Where most upgraders end up. Key 2026 OCR precincts worth a close look:</p>
      <ul>
        <li><strong>Bayshore (D16):</strong> New URA-master-planned precinct with upcoming MRT, sea-facing potential, and family-friendly amenities.</li>
        <li><strong>Lentor (D26):</strong> Maturing cluster of new launches with Lentor MRT (TEL line) and growing F&amp;B options.</li>
        <li><strong>Tengah (D24):</strong> Forest town concept, car-lite, attractive for EC and entry-level private buyers.</li>
        <li><strong>Tampines / Pasir Ris:</strong> Established mature estates with consistent rental demand.</li>
        <li><strong>Jurong Lake District:</strong> Long-term play on the second CBD narrative.</li>
      </ul>

      <h3>Quick Region Comparison</h3>

      <table>
        <thead><tr><th>Region</th><th>Typical Buyer</th><th>Strengths</th><th>Watch-Outs</th></tr></thead>
        <tbody>
          <tr><td>CCR</td><td>Long-hold own-stay, prestige buyers</td><td>Prestige, narrowed PSF gap, expat rental</td><td>Lower rental yield, slower resale at top quantum</td></tr>
          <tr><td>RCR</td><td>Upgraders, professionals</td><td>Balance of price and location, strong tenant pool</td><td>Some sub-markets tightly priced</td></tr>
          <tr><td>OCR</td><td>First-time buyers, families, upgraders</td><td>Lower entry quantum, family amenities, newer supply</td><td>Yield depends heavily on MRT proximity</td></tr>
        </tbody>
      </table>

      <h2>New Launch vs Resale Condo in 2026</h2>
      <p><strong>New launch condos vs resale condos Singapore 2026 — the definitive comparison.</strong> This is the question I get asked most often. Short answer: new launch condos for cash-flow friendly long-term growth and new amenities; resale condos for speed, yield today and established locations. No universal winner — model against your exact timeline, ABSD and numbers. Full table and decision framework below.</p>

      <table>
        <thead><tr><th>Factor</th><th>New Launch</th><th>Resale</th></tr></thead>
        <tbody>
          <tr><td>Payment timeline</td><td>Progressive (over 3–4 years)</td><td>Lump sum within ~12 weeks</td></tr>
          <tr><td>Cash flow strain</td><td>Lower upfront, spreads over construction</td><td>Higher upfront, full mortgage starts immediately</td></tr>
          <tr><td>Move-in timing</td><td>Wait 3–4 years for TOP</td><td>Move in within ~3 months</td></tr>
          <tr><td>Price negotiability</td><td>Limited; developer-driven</td><td>Usually negotiable</td></tr>
          <tr><td>Renovation cost</td><td>Low (new finishes)</td><td>Moderate to high (often $50k–$120k+)</td></tr>
          <tr><td>Capital appreciation potential</td><td>Higher if precinct transforms</td><td>Slower, but often more predictable</td></tr>
          <tr><td>Risk</td><td>TOP delays, market shifts during build</td><td>Hidden defects, ageing facilities</td></tr>
          <tr><td>Rental income</td><td>Only after TOP</td><td>Available immediately</td></tr>
        </tbody>
      </table>

      <h3>Choose a New Launch If…</h3>
      <ul>
        <li>You can wait 3–4 years for the keys</li>
        <li>You want progressive payment cash flow</li>
        <li>You believe in the precinct's long-term transformation</li>
        <li>You want zero renovation hassle on Day 1</li>
      </ul>

      <h3>Choose a Resale If…</h3>
      <ul>
        <li>You need to move in within 6 months</li>
        <li>You want immediate rental income</li>
        <li>You prefer a known product (no off-plan risk)</li>
        <li>You value larger floor plates (older units often have better space efficiency)</li>
      </ul>

      <h2>Freehold vs 99-Year Leasehold</h2>
      <p>A debate as old as the SGX itself. The truthful answer for 2026:</p>
      <ul>
        <li><strong>For pure own-stay over 20+ years</strong>, freehold offers genuine peace of mind and preserves redevelopment optionality.</li>
        <li><strong>For most investors and short-to-medium hold buyers</strong>, a well-located 99-year leasehold near MRT often outperforms a freehold in a quieter location on capital gains and yield.</li>
        <li><strong>Lease decay</strong> becomes material once a property dips below the 60-year mark — CPF usage limits kick in earlier than many buyers realise.</li>
      </ul>

      <p>Rule of thumb: do not pay a freehold premium for a project whose location does not deserve it.</p>

      <h2>How to Stress-Test Affordability Before You Commit</h2>
      <p>The numbers most agents do not walk you through carefully enough:</p>
      <ol>
        <li><strong>BSD</strong> on the purchase price (progressive scale; the highest tier applies to portions above the upper bracket — verify current bands with IRAS).</li>
        <li><strong>ABSD</strong>, if applicable to your profile.</li>
        <li><strong>Legal fees</strong>, typically $2,500–$3,500.</li>
        <li><strong>Valuation and bank fees</strong>.</li>
        <li><strong>Renovation buffer</strong>, even for new launches (curtains, lighting, built-ins).</li>
        <li><strong>MCST fees</strong>, often $300–$600+ per month.</li>
        <li><strong>Property tax</strong>, especially material for non-owner-occupied units.</li>
        <li><strong>12-month cash reserve</strong> for mortgage, even if you have a tenant.</li>
      </ol>

      <p>If the sums only work assuming everything goes right, you do not have a budget — you have a wish.</p>

      <h2>Common Mistakes Buyers Make in 2026</h2>
      <p>After helping clients through hundreds of viewings, the same avoidable mistakes keep appearing.</p>

      <ol>
        <li><strong>Falling for the showflat lighting.</strong> Showflats are styled, lit, and propped to feel 30% larger than reality. Always measure against your current home.</li>
        <li><strong>Ignoring stack and orientation.</strong> Two identical units in the same project can vary by tens of thousands in resale value purely because of facing, noise, and afternoon sun.</li>
        <li><strong>Underestimating ABSD remission timing.</strong> Upgraders who buy before selling face heavy ABSD cashflow unless the remission timing is hit precisely. This is paperwork, not optimism.</li>
        <li><strong>Over-leveraging on promo rates.</strong> A 2.6% first-year rate that resets to 4.2% in Year 3 is a budgeting trap.</li>
        <li><strong>Skipping the en-bloc and supply check.</strong> Buying near multiple imminent new launches usually means short-term resale pressure.</li>
        <li><strong>Buying purely on PSF.</strong> A low PSF on an inefficient layout still gives you less usable space than a higher PSF on a better-designed unit.</li>
        <li><strong>Trusting brochure yields.</strong> Gross rental yield is marketing. Net yield after MCST, tax, vacancy, and ABSD is the real number.</li>
      </ol>

      <h2>A Simple Shortlisting Process You Can Use This Week</h2>
      <p>This is the same process I walk new clients through:</p>
      <ol>
        <li><strong>List 8–10 candidate projects</strong> that fit your purpose and region.</li>
        <li><strong>Filter to 5</strong> based on price PSF vs. precinct comps over the last 12 months.</li>
        <li><strong>Visit 3 in person</strong> — at least one new launch and one resale, ideally on different days of the week.</li>
        <li><strong>Request a stack-and-floor analysis</strong> from your agent for the top 2.</li>
        <li><strong>Run the all-in numbers</strong> (BSD, ABSD, legal, reno, MCST, mortgage stress test).</li>
        <li><strong>Make the offer</strong> on the one project that wins on <strong>both</strong> numbers and gut.</li>
      </ol>

      <p>If a project wins on numbers but not gut, you will not enjoy living there. If it wins on gut but not numbers, you will resent it within two years.</p>

      <h2>Frequently Asked Questions (FAQ)</h2>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is 2026 a good year to buy a condo in Singapore?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">For own-stay buyers with a 7–10 year horizon and stable income, yes — the supply pipeline is healthier and interest rates have moderated from their 2023–2024 highs. For pure short-term investors hoping to flip within 3 years, the combination of SSD and current cooling measures still makes that strategy difficult.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is the minimum budget for a private condo in Singapore in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Realistically, entry-level OCR new launches and resale options for a 1-bedder start from around the $1.0m–$1.3m range, with most family-sized 3-bedders sitting in the $1.6m–$2.4m band depending on region (verify current transacted prices on URA Realis or EdgeProp before publishing).</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Should I buy a new launch or resale condo in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Buy a new launch if you can wait 3–4 years for TOP and value the progressive payment schedule. Buy a resale if you need to move in quickly, want immediate rental income, or prefer a known product without off-plan risk.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How much ABSD will I pay as a Singaporean buying my second condo?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">As of 2026, Singapore Citizens pay 20% ABSD on their second residential property (verify with IRAS before publishing). If your second property is intended as a matrimonial home and you sell your first within the qualifying remission window, ABSD may be remitted — but the timing rules are strict.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is freehold always better than 99-year leasehold?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">No. A well-located 99-year leasehold near an MRT station often outperforms a freehold in a quieter location for capital gains and rental yield. Freehold becomes more compelling for very long holds (20+ years) where redevelopment optionality matters.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How do I know if a condo is overpriced?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Compare its launch or asking PSF against transacted PSF for similar-tenure, similar-size units in the same precinct over the last 6–12 months on URA Realis or EdgeProp. If the project is asking more than 10–12% above precinct comps without a clear differentiator (sea view, top floor, dual-key layout), you are likely paying a premium.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What are the biggest risks of buying a condo in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Three to plan for: (1) interest rate volatility eating into your monthly affordability, (2) supply pressure from nearby new launches affecting resale liquidity, and (3) personal cash flow risk if your job income changes mid-mortgage. All three are manageable with a 12-month cash buffer and a conservative stress test.</p>
      </details>

      <h2>Final Word: The Best Condo in 2026 Is the One You Can Live With for 10 Years</h2>
      <p>If you take only one thing from this guide, take this: <strong>the best condo in 2026 is not the one your friend bought, the one trending on Instagram, or the one with the biggest discount this weekend.</strong> It is the one that fits your purpose, your numbers, and your life — and that you can hold confidently through the next interest rate cycle.</p>

      <p><strong>Your Next Step</strong></p>
      <p>If you would like a personalised shortlist based on your budget, family situation, and goals, the most useful thing you can do is have a no-pressure 30-minute conversation with a PropNex agent who can pull live transacted data for your shortlist and run your full ABSD/financing numbers with you.</p>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/how-to-buy-new-launch-2026" onclick="showArticle('post-how-to-buy-new-launch-2026'); return false;" class="underline hover:text-violet-700"><strong>How to Buy a New Launch Condo in Singapore: A Step-by-Step 2026 Guide</strong></a></p>
      <p>2. <a href="/insights/new-launch-vs-resale-cheaper-2026" onclick="showArticle('post-new-launch-vs-resale-cheaper-2026'); return false;" class="underline hover:text-violet-700"><strong>Are New Launch Condos Cheaper Than Resale? A 2026 Singapore Buyer\'s Guide</strong></a></p>
      <p>3. <a href="/insights/dunearn-house-review-2026" onclick="showArticle('post-dunearn-house-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House Review 2026: Is It Worth Buying? (Honest Pros & Cons)</strong></a></p>
      <p>4. <a href="/insights/district-guide" onclick="showArticle('post-district-guide'); return false;" class="underline hover:text-violet-700"><strong>Which Singapore District Should You Buy In? The 2026 Growth Map</strong></a></p>
      <p>5. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>

      <p><em>Disclaimer: This article is for general informational purposes and does not constitute financial, tax, or legal advice. Cooling measures, ABSD rates, SSD rates, BSD bands, and CPF rules are subject to change — always verify current figures with IRAS, MAS, CPF Board, and HDB before making any property decision. Speak to a qualified property agent and your financial advisor for advice tailored to your circumstances.</em></p>
    `
  },

  /* ======================================================
     NEW ARTICLE 19 — DUNEARN HOUSE REVIEW 2026
  ====================================================== */
  'post-dunearn-house-review-2026': {
    title: 'Dunearn House Review 2026: Is It Worth Buying? (Honest Pros & Cons)',
    date: '2 Jun 2026',
    readTime: '14 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/pulse/dunearn-house-review-2026-jack-leow',
    body: `
      <p><strong>If you're reading this, chances are you've already seen the buzz around <strong>Dunearn House</strong> — the first private condo to launch within the new <strong>Bukit Timah Turf City</strong> masterplan. And you probably have one question: <em>is it actually worth the money?</em></strong></p>

      <p>Short answer: <strong>Dunearn House looks like a strong long-term buy for families and CCR upgraders who can stomach a 99-year leasehold at around $2.8k–$3.1k psf.</strong> It sits in a low-supply prime pocket, walking distance to Sixth Avenue MRT, with first-mover positioning in a 20–30 year transformation story. But it's not for everyone — especially investors hunting for quick rental yield or buyers who need a freehold.</p>

      <p>Below, we'll break down everything you need to know — pricing, location, schools, developer track record, and the honest pros and cons — so you can decide if it's the right fit for you.</p>

      <h2>Dunearn House Quick Facts (2026)</h2>

      <p>Here's the project at a glance before we go deeper:</p>

      <table>
        <thead><tr><th>Detail</th><th>Information</th></tr></thead>
        <tbody>
          <tr><td><strong>Project Name</strong></td><td>Dunearn House (达恩·豪庭)</td></tr>
          <tr><td><strong>Location</strong></td><td>Dunearn Road, Bukit Timah (District 11, Swiss Club Subzone)</td></tr>
          <tr><td><strong>Developer</strong></td><td>Frasers Property × Sekisui House × CSC Land Group (Phoenix Dunearn Pte Ltd)</td></tr>
          <tr><td><strong>Architect</strong></td><td>Ong &amp; Ong</td></tr>
          <tr><td><strong>Tenure</strong></td><td>99-year leasehold</td></tr>
          <tr><td><strong>Site Area</strong></td><td>~145,173 sqft (~13,492 sqm)</td></tr>
          <tr><td><strong>Total Units</strong></td><td>~380 units across 5 blocks (10 &amp; 19 storeys)</td></tr>
          <tr><td><strong>Unit Mix</strong></td><td>2-Bedroom to 4-Bedroom + Study (family-focused)</td></tr>
          <tr><td><strong>Land Price</strong></td><td>$1,410 psf ppr (won July 2025)</td></tr>
          <tr><td><strong>Expected Launch</strong></td><td>VVIP Preview around July 2026 / 2H 2026</td></tr>
          <tr><td><strong>Expected Launch Price</strong></td><td>~$2,800–$3,100 psf (analyst estimates)</td></tr>
          <tr><td><strong>TOP (Estimated)</strong></td><td>2030–2031</td></tr>
          <tr><td><strong>Nearest MRT</strong></td><td>Sixth Avenue MRT (Downtown Line, ~4–10 min walk)</td></tr>
        </tbody>
      </table>

      <h2>Who's Behind Dunearn House? The Developer Story</h2>

      <p>This is one part of the project I think buyers underrate.</p>

      <p>Dunearn House is being built by a <strong>joint venture of three serious players</strong>:</p>

      <ul>
        <li><strong>Frasers Property</strong> — Singapore-listed, decades of track record (think Riviere, Sky Eden, One Bernam).</li>
        <li><strong>Sekisui House</strong> — Japan's largest homebuilder, over 2.6 million homes built globally. Known for quality detailing.</li>
        <li><strong>CSC Land Group</strong> — part of China State Construction, one of the world's largest builders.</li>
      </ul>

      <p>That mix matters. Sekisui House in particular is known for tight construction tolerances and finishing quality — which historically command a small premium on resale in the Singapore market.</p>

      <p>If you've been burned by a smaller developer before (cracks, defects, delayed handover), this consortium is about as safe as you can realistically get.</p>

      <h2>Dunearn House Location Review: What's Really There?</h2>

      <p>Let's be honest — "Bukit Timah" is one of those addresses that <em>sounds</em> prime, but the reality depends a lot on which exact pocket you're in. Here's what you actually get:</p>

      <h3>Connectivity (The Strong Point)</h3>

      <ul>
        <li><strong>Sixth Avenue MRT (Downtown Line)</strong> — roughly a 4–10 minute walk, depending on which block.</li>
        <li>Direct trains to <strong>Newton, Bugis, Downtown, Bayfront</strong> — no transfers needed for the CBD.</li>
        <li><strong>Future Turf City MRT</strong> (Cross Island Line Phase 2) — expected around 2032, will add a second line right at your doorstep.</li>
        <li><strong>PIE and BKE</strong> within ~5 minutes by car.</li>
      </ul>

      <p>For a CCR address, this is genuinely well-connected. Many older Bukit Timah condos sit awkwardly between MRT stations — Dunearn House does not.</p>

      <h3>Schools (The Family Magnet)</h3>

      <p>The Bukit Timah school belt is the single biggest reason families pay a premium here. Schools commonly cited within 1–2km include:</p>

      <p><strong>Primary:</strong></p>
      <ul>
        <li>Methodist Girls' Primary (within 1km, per OneMap — but verify closer to launch)</li>
        <li>Nanyang Primary</li>
        <li>Pei Hwa Presbyterian Primary</li>
        <li>Raffles Girls' Primary</li>
      </ul>

      <p><strong>Secondary / JC:</strong></p>
      <ul>
        <li>Nanyang Girls' High</li>
        <li>Hwa Chong Institution</li>
        <li>National Junior College</li>
        <li>Methodist Girls' Secondary</li>
      </ul>

      <p><em>Always verify final P1 distance eligibility with MOE OneMap closer to registration — boundaries can be tight at stack level.</em></p>

      <h3>Lifestyle &amp; Nature</h3>

      <p>You're sandwiched between <strong>Bukit Timah Nature Reserve</strong>, <strong>Singapore Botanic Gardens</strong>, and the upcoming <strong>Bukit Timah–Rochor Green Corridor</strong> (a linear park along the old railway canal). For people who actually use parks — joggers, cyclists, families with kids — this is a genuine quality-of-life upgrade.</p>

      <p>For food and groceries, <strong>Greenwood Avenue</strong>, <strong>Coronation Plaza</strong>, <strong>Bukit Timah Plaza</strong>, and <strong>Cold Storage Sixth Avenue</strong> are all close by. It's not as buzzy as Holland Village, but it's quieter — which is exactly why people pay to live here.</p>

      <h2>Dunearn House Price Guide: How Much Are We Talking?</h2>

      <p>Now the part everyone scrolls to.</p>

      <p>The land was won at <strong>$1,410 psf ppr</strong> in July 2025. Based on this land cost and analyst commentary, the expected launch price falls in the range of:</p>

      <table>
        <thead><tr><th>Unit Type</th><th>Estimated Size</th><th>Indicative Quantum</th></tr></thead>
        <tbody>
          <tr><td>2-Bedroom</td><td>~700–800 sqft</td><td>~$2.0M – $2.4M</td></tr>
          <tr><td>3-Bedroom</td><td>~950–1,150 sqft</td><td>~$2.7M – $3.4M</td></tr>
          <tr><td>4-Bedroom / 4BR+Study</td><td>~1,300–1,500 sqft</td><td>~$3.6M – $4.5M</td></tr>
        </tbody>
      </table>

      <p><em>These are indicative based on a $2,800–$3,100 psf launch band. Official prices will only be confirmed by the developer closer to preview.</em></p>

      <h3>How does this compare?</h3>

      <p>For context — <strong>Watten House</strong> in nearby Watten Estate launched in late 2023 at around <strong>$3,200–$3,600 psf</strong>. The adjacent Dunearn Road site won by Wing Tai/Metro in May 2026 went for $1,625 psf ppr, and analysts expect that next project to launch <strong>above $3,200 psf</strong>.</p>

      <p>In other words, Dunearn House is being positioned as the <strong>most accessible entry point into D11 CCR in years</strong> — and the next adjacent project will likely be priced 10–15% higher. That's the first-mover advantage talking.</p>

      <h2>Dunearn House Pros and Cons (My Honest Take)</h2>

      <p>This is where I'll try to be straight with you, not salesy.</p>

      <h3>✅ The Pros</h3>

      <p><strong>1. First-Mover in Turf City Transformation</strong></p>
      <p>You're buying at the very start of a 20–30 year masterplan. Selected heritage Grandstand buildings will be conserved as lifestyle clusters. As infrastructure rolls out (MRT, parks, amenities), early entrants typically see the strongest capital appreciation.</p>

      <p><strong>2. Walking Distance to Sixth Avenue MRT</strong></p>
      <p>This is non-negotiable for most Singapore buyers today. A future second line (CRL) only strengthens this.</p>

      <p><strong>3. Top-Tier Schools Within Reach</strong></p>
      <p>Multiple primary schools within 1–2km. This is the kind of factor that holds value through every property downcycle.</p>

      <p><strong>4. Reputable Developer Consortium</strong></p>
      <p>Frasers + Sekisui + CSC is about as bankable as it gets for build quality.</p>

      <p><strong>5. Low-Density, Low-Rise Design</strong></p>
      <p>Only ~380 units on 145,000+ sqft of land. That's spacious by Singapore standards and means less competition for facilities (and on resale, less internal supply pressure).</p>

      <p><strong>6. CCR Pricing That Looks Reasonable (For Now)</strong></p>
      <p>$2,800–$3,100 psf is significantly below recent CCR comparables. If you've been priced out of D9/D10 prime, this is one of the few rational entry points left.</p>

      <h3>❌ The Cons</h3>

      <p><strong>1. 99-Year Leasehold</strong></p>
      <p>Bukit Timah purists will tell you this area is "freehold country." A 99-year lease in a Good Class Bungalow neighbourhood feels slightly out of place, and lease decay will eventually matter.</p>

      <p><strong>2. Construction Dust for the Next Decade</strong></p>
      <p>Turf City is a <em>masterplan</em>, not a finished neighbourhood. Expect ongoing construction, road works, and noise around you until at least 2030–2035. First few years of living there may be less serene than the brochures suggest.</p>

      <p><strong>3. Family-Heavy Unit Mix = Lower Rental Yield</strong></p>
      <p>There are reportedly no 1-bedroom units, and 3BR/4BR dominate. Great for own-stay, but rental yields on bigger units in CCR typically run 2.5%–3% — not the 4%+ you'd see in OCR studios.</p>

      <p><strong>4. Quantum Is Still High</strong></p>
      <p>A 3BR at ~$2.8M is no joke. You need substantial CPF/cash, and ABSD will hit hard if this is a second property (20% for Singapore citizens on second property as of 2026).</p>

      <p><strong>5. The Adjacent Project Could Cannibalize Resale</strong></p>
      <p>The next Dunearn Road plot (Wing Tai/Metro) is right next door. When it launches at a higher psf, it could either lift your value <em>or</em> compete with your resale, depending on timing.</p>

      <p><strong>6. TOP Only in 2030–2031</strong></p>
      <p>That's 4–5 years of progressive payment, plus you can't move in or rent it out anytime soon. Capital is locked in.</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">💡 2026 Key Takeaway</p>
        <p class="text-sm text-violet-800">First-mover GLS projects in masterplan precincts have historically outperformed later launches in the same area. Dunearn House is in that pattern — but only if you have the horizon and stomach for the leasehold and construction period.</p>
      </div>

      <h2>Is Dunearn House a Good Investment?</h2>

      <p>Here's how I'd frame it:</p>

      <ul>
        <li><strong>For own-stay family buyers</strong>: Probably yes, if school proximity and the long-term Turf City story matter to you. The location is genuinely strong and the developer is solid.</li>
        <li><strong>For pure investors chasing yield</strong>: Probably no. CCR rental yields are mediocre, and the 99-year lease in a freehold belt limits upside slightly.</li>
        <li><strong>For long-term capital appreciation hunters</strong>: Cautiously yes. You're betting on (a) Turf City actually delivering its masterplan, (b) CRL Phase 2 opening, and (c) Bukit Timah continuing to hold its premium. All three are reasonable bets — but bets nonetheless.</li>
      </ul>

      <h2>Dunearn House vs Other New Launches (2026)</h2>

      <p>A quick comparison to help you place it in the market:</p>

      <table>
        <thead><tr><th>Project</th><th>District</th><th>Tenure</th><th>Approx. PSF</th><th>Vibe</th></tr></thead>
        <tbody>
          <tr><td><strong>Dunearn House</strong></td><td>D11 (Bukit Timah)</td><td>99-yr</td><td>$2,800–$3,100</td><td>Family, schools, masterplan</td></tr>
          <tr><td>Watten House</td><td>D11 (Shelford)</td><td>Freehold</td><td>$3,200–$3,600</td><td>Freehold prestige</td></tr>
          <tr><td>Next Dunearn Road site (Wing Tai/Metro)</td><td>D11</td><td>99-yr</td><td>$3,200+ (est.)</td><td>Adjacent, premium tier</td></tr>
          <tr><td>Lentor Gardens</td><td>D26 (OCR)</td><td>99-yr</td><td>~$2,200–$2,400</td><td>OCR upgrader play</td></tr>
          <tr><td>Thomson Reserve Residences</td><td>D20 (RCR-ish)</td><td>99-yr</td><td>TBC</td><td>Thomson cluster</td></tr>
        </tbody>
      </table>

      <p>If you specifically want <strong>CCR with a school address</strong>, Dunearn House is the most price-rational option in the current pipeline.</p>

      <h2>Who Should Buy Dunearn House?</h2>

      <p>Based on the unit mix and pricing, this project is clearly designed for:</p>

      <ul>
        <li><strong>Young families</strong> wanting to settle near the Bukit Timah school belt</li>
        <li><strong>HDB upgraders</strong> with strong CPF/cash buffers (think $2.5M+ comfortable quantum)</li>
        <li><strong>Right-sizers</strong> moving from larger landed homes in the area</li>
        <li><strong>Long-term CCR believers</strong> who want first-mover entry into Turf City</li>
      </ul>

      <p>It's probably <em>not</em> the right fit for:</p>

      <ul>
        <li>First-time buyers looking for an entry-level property</li>
        <li>Pure rental investors chasing yield</li>
        <li>Anyone needing to move in within 1–2 years</li>
        <li>Buyers who specifically want freehold</li>
      </ul>

      <h2>A Few Common Mistakes to Avoid</h2>

      <p>After speaking to many buyers in similar situations, here are the slip-ups I keep seeing:</p>

      <ol>
        <li><strong>Stretching too hard on quantum.</strong> Just because the bank can lend doesn't mean you should max out TDSR. Always stress-test at 4%+ interest rates.</li>
        <li><strong>Assuming P1 priority is guaranteed.</strong> Within-1km doesn't mean automatic admission. Verify with MOE closer to actual registration year.</li>
        <li><strong>Ignoring ABSD on second properties.</strong> A 20% ABSD on a $3M unit is $600,000. That changes the math entirely.</li>
        <li><strong>Forgetting progressive payment.</strong> From booking to TOP (2030/31), you'll be paying down progressively. Plan cashflow accordingly.</li>
        <li><strong>Comparing only headline PSF.</strong> Layout efficiency, stack orientation, and floor level matter as much as PSF. A poorly-oriented 1,000 sqft unit at $2,800 psf is worse than a well-oriented one at $3,000 psf.</li>
      </ol>

      <h2>Conclusion: Should You Buy Dunearn House?</h2>

      <p>If you're a family planning to live here, with the financial buffer to handle a CCR 99-year leasehold and the patience to ride out 4–5 years until TOP plus another 5–10 years of Turf City construction — yes, <strong>Dunearn House is one of the more strategically interesting launches of 2026.</strong></p>

      <p>If you're chasing yield, freehold, or quick flips — look elsewhere.</p>

      <p>The honest truth is that there's no "perfect" property in Singapore right now. But Dunearn House offers a rare combination: a strong location, reputable developers, a masterplan tailwind, and CCR pricing that — for once — looks more reasonable than the alternatives.</p>

      <p><strong>My next step suggestion:</strong> Get the floor plans the moment they're released, walk the actual site, and book a showflat slot during VVIP preview if possible. The first wave usually gets the best stacks and earliest-bird discounts.</p>

      <h2>Frequently Asked Questions (FAQ)</h2>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          When is the Dunearn House launch date?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The VVIP preview is expected around <strong>July 2026 (2H 2026)</strong>, with public launch shortly after. Dates may shift — always confirm directly with the developer or an accredited agent.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is the expected Dunearn House price?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Based on the land cost of $1,410 psf ppr and current market commentary, the launch price is estimated at <strong>~$2,800–$3,100 psf</strong>. Indicative quantums range from <strong>~$2M (2BR) to ~$4.5M (4BR+Study)</strong>.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Who is the Dunearn House developer?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Dunearn House is jointly developed by <strong>Frasers Property, Sekisui House, and CSC Land Group</strong>, under the entity Phoenix Dunearn Pte Ltd.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How far is Dunearn House from Sixth Avenue MRT?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The development is approximately a <strong>4–10 minute walk</strong> to Sixth Avenue MRT on the Downtown Line, depending on which block you're in.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is Dunearn House freehold or leasehold?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">It is a <strong>99-year leasehold</strong> development on a Government Land Sales (GLS) site.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is Dunearn House suitable for families?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes. The unit mix focuses on <strong>2-Bedroom to 4-Bedroom + Study</strong> layouts with no 1-bedroom units, and it sits within reach of multiple top schools including Methodist Girls', Nanyang Primary, Hwa Chong, and Nanyang Girls' High.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is Dunearn House a good investment?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">For long-term capital appreciation and own-stay, <strong>yes</strong> — first-mover positioning in the Turf City masterplan and limited CCR supply support upside. For pure rental yield, it's <strong>less ideal</strong>, as CCR family-sized units typically yield 2.5–3%.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is the Bukit Timah Turf City transformation?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">It's a large-scale URA masterplan to redevelop the former Turf Club into a new residential precinct, with conserved heritage Grandstand buildings, parks, community amenities, and a future Cross Island Line MRT station (Turf City MRT). Dunearn House is the <strong>first private residential launch</strong> within this transformation zone.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/turf-city-masterplan-2026" onclick="showArticle('post-turf-city-masterplan-2026'); return false;" class="underline hover:text-violet-700"><strong>Turf City Masterplan 2026: What Dunearn House Buyers Need to Know</strong></a></p>
      <p>2. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>
      <p>3. <a href="/insights/dunearn-vs-fourth-avenue" onclick="showArticle('post-dunearn-vs-fourth-avenue-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House vs Fourth Avenue Residences: Which Is the Better Investment? (2026)</strong></a></p>
      <p>4. <a href="/insights/district-guide" onclick="showArticle('post-district-guide'); return false;" class="underline hover:text-violet-700"><strong>Which Singapore District Should You Buy In? The 2026 Growth Map</strong></a></p>
      <p>5. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>

      <p><em>Disclaimer: This article is for general informational purposes and does not constitute financial, tax, or legal advice. All figures, timelines, and school distances are estimates based on publicly available data as of June 2026 and are subject to change. Always verify with the developer, URA, MOE, and a licensed property advisor before making any decision.</em></p>
    `
  },

  /* ======================================================
     NEW ARTICLE 20 — TURF CITY MASTERPLAN 2026
  ====================================================== */
  'post-turf-city-masterplan-2026': {
    title: 'Turf City Masterplan 2026: What Dunearn House Buyers Need to Know',
    date: '3 Jun 2026',
    readTime: '12 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/pulse/turf-city-masterplan-2026-dunearn-house-jack-leow',
    body: `
      <p><strong>The Bukit Timah Turf City masterplan is the defining long-term catalyst for Dunearn House and other new launches in the area through 2030 and beyond.</strong> Knowing the exact timeline for the Cross Island Line MRT, conserved heritage buildings, new parks, and community facilities will help you evaluate if the project's 99-year leasehold and ~$2,800–$3,100 psf pricing is a smart long-horizon bet.</p>

      <p>Dunearn House is the first private residential launch inside this 176-hectare former racecourse site. The URA's vision will transform it into a new residential precinct with 15,000–20,000 homes (public and private), conserved heritage assets, green corridors, and major transport upgrades. This is not a small precinct upgrade — it is one of the largest masterplans in central Singapore in decades.</p>

      <h2>What is the Turf City Masterplan?</h2>
      <p>The former Singapore Turf Club site (closed in 2024) is being redeveloped under the URA Master Plan. Key elements include:</p>
      <ul>
        <li>Conservation of the iconic Grandstand and other heritage structures for lifestyle, F&B and community uses.</li>
        <li>A new Turf City MRT station on the Cross Island Line (CRL) Phase 2, targeted for 2032.</li>
        <li>Extensive parks and the Bukit Timah–Rochor Green Corridor linking to the Nature Reserve.</li>
        <li>Mix of HDB and private housing, with first HDBs in Bukit Timah in nearly 40 years.</li>
        <li>Improved connectivity via existing Sixth Avenue MRT (Downtown Line) and future CRL.</li>
      </ul>

      <h2>Timeline and Key Milestones (2026–2035)</h2>

      <table>
        <thead><tr><th>Year</th><th>Milestone</th><th>Impact on Dunearn House</th></tr></thead>
        <tbody>
          <tr><td>2026</td><td>Dunearn House VVIP preview & launch</td><td>First-mover pricing advantage</td></tr>
          <tr><td>2027–2029</td><td>Site preparation, early infrastructure</td><td>Construction noise begins</td></tr>
          <tr><td>2030–2031</td><td>Dunearn House TOP</td><td>Residents move in as precinct develops</td></tr>
          <tr><td>2032</td><td>CRL Turf City MRT station opens</td><td>Major value catalyst — second MRT line</td></tr>
          <tr><td>2033–2035</td><td>Heritage clusters, parks, HDB launches</td><td>Full precinct identity emerges</td></tr>
        </tbody>
      </table>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">💡 2026 Key Takeaway for Buyers</p>
        <p class="text-sm text-violet-800">Buying Dunearn House now means you are betting on the masterplan delivering over 10–15+ years. Early buyers capture the largest uplift when infrastructure (especially the CRL station) materialises, but must tolerate 5–8 years of ongoing construction.</p>
      </div>

      <h2>How the Masterplan Directly Benefits Dunearn House</h2>
      <ol>
        <li><strong>Transport premium:</strong> Walking distance to Sixth Avenue MRT today + future Turf City CRL station in 2032 creates a dual-MRT location rare in CCR.</li>
        <li><strong>Heritage + lifestyle:</strong> Conserved Grandstand buildings will become F&B, retail and community hubs within 5–10 min walk.</li>
        <li><strong>Green connectivity:</strong> Direct links to Bukit Timah Nature Reserve and the new green corridor improve liveability and long-term desirability.</li>
        <li><strong>Supply scarcity:</strong> Limited new private launches in this pocket for years to come supports pricing power.</li>
        <li><strong>School + family demand:</strong> The overall precinct will reinforce Bukit Timah's status as a top family address.</li>
      </ol>

      <h2>Risks and Things to Watch</h2>
      <ul>
        <li>Construction disruption will be significant for the first 5–7 years after TOP.</li>
        <li>The pace of heritage cluster and park delivery depends on government timelines — delays are possible.</li>
        <li>Future HDB launches in the precinct could increase overall supply and affect resale dynamics.</li>
        <li>99-year leasehold in a traditionally freehold area means long-term value depends heavily on the masterplan succeeding.</li>
      </ul>

      <h2>Frequently Asked Questions (FAQ)</h2>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          When will the Cross Island Line Turf City station open?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Targeted for 2032 as part of CRL Phase 2. This will be a major catalyst for Dunearn House and the broader precinct.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What heritage buildings will be conserved?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The iconic Grandstand and several other historic structures from the old Turf Club are planned for conservation and adaptive reuse as lifestyle and community spaces.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Will there be new parks and green spaces?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes. A major component is the Bukit Timah–Rochor Green Corridor and multiple new parks that will link residents directly to the Nature Reserve.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How will this affect Dunearn House resale value?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Historically, first-mover projects in large masterplans see the strongest capital appreciation once infrastructure is delivered. However, buyers must be prepared for 5–10 years of precinct maturation and construction activity.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is the masterplan guaranteed to be delivered on time?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Government masterplans are generally reliable but subject to adjustments. The CRL station date (2032) is the most important single milestone for value. Monitor URA updates closer to 2030.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>
      <p>2. <a href="/insights/dunearn-house-review-2026" onclick="showArticle('post-dunearn-house-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House Review 2026: Is It Worth Buying? (Honest Pros & Cons)</strong></a></p>
      <p>3. <a href="/insights/dunearn-vs-fourth-avenue" onclick="showArticle('post-dunearn-vs-fourth-avenue-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House vs Fourth Avenue Residences: Which Is the Better Investment? (2026)</strong></a></p>
      <p>4. <a href="/insights/district-guide" onclick="showArticle('post-district-guide'); return false;" class="underline hover:text-violet-700"><strong>Which Singapore District Should You Buy In? The 2026 Growth Map</strong></a></p>
      <p>5. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer\'s Guide</strong></a></p>

      <p><em>Disclaimer: This article is for general informational purposes and does not constitute financial or property investment advice. Masterplan timelines and details are based on URA publications as of June 2026 and are subject to change. Always verify the latest plans directly with URA and consult a licensed advisor before making any purchase decision.</em></p>
    `
  },

  'post-dunearn-house-buyers-guide-2026': {
    title: 'Dunearn House Buyer\'s Guide 2026: Price, Eligibility & Compare',
    date: '4 Jun 2026',
    readTime: '15 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/pulse/dunearn-house-buyers-guide-2026-jack-leow',
    body: `
      <p><strong>Dunearn House is expected to launch at roughly $2,800–$2,950 psf, with quantum ranging from ~$1.9M (smallest 2BR) to ~$3.3M+ (larger 4BR+Study).</strong> Singapore Citizens face the lowest stamp duty and Additional Buyer's Stamp Duty (ABSD) burden, while foreigners pay the highest. Like all new launches, it uses the <strong>Progressive Payment Scheme (PPS)</strong> — you only pay progressively as construction reaches each stage, not the full amount upfront. Compared to resale Bukit Timah and competing 2026 launches, it offers strong fundamentals: first-mover Turf City positioning, near Sixth Avenue MRT, and a top-tier developer JV.</p>

      <p>As a new launch specialist who has studied the Turf City masterplan closely, here's the honest, practical buyer's guide to help you decide.</p>

      <h2>Dunearn House Quick Reference Table</h2>
      <table>
        <thead><tr><th>Detail</th><th>Information</th></tr></thead>
        <tbody>
          <tr><td><strong>Project Name</strong></td><td>Dunearn House (达恩·豪庭)</td></tr>
          <tr><td><strong>Location</strong></td><td>Dunearn Road, District 11 (Bukit Timah, Swiss Club Subzone)</td></tr>
          <tr><td><strong>Tenure</strong></td><td>99-year leasehold (GLS)</td></tr>
          <tr><td><strong>Developer</strong></td><td>Frasers Property × Sekisui House × CSC Land Group</td></tr>
          <tr><td><strong>Site Area</strong></td><td>~145,173 sqft (13,492 sqm)</td></tr>
          <tr><td><strong>Total Units</strong></td><td>~380 across 5 blocks (10 &amp; 19 storeys)</td></tr>
          <tr><td><strong>Unit Types</strong></td><td>2BR, 3BR, 4BR, 4BR+Study</td></tr>
          <tr><td><strong>Indicative Launch Price</strong></td><td>~$2,800–$2,950 psf</td></tr>
          <tr><td><strong>Indicative Quantum</strong></td><td>~$1.9M to $3.3M+</td></tr>
          <tr><td><strong>VVIP Preview</strong></td><td>July 2026 (estimated)</td></tr>
          <tr><td><strong>Expected TOP</strong></td><td>2030–2031</td></tr>
          <tr><td><strong>Legal Completion</strong></td><td>2032–2033</td></tr>
          <tr><td><strong>Nearest MRT</strong></td><td>Sixth Avenue MRT (Downtown Line, ~7-min walk)</td></tr>
        </tbody>
      </table>

      <h2>What Is the Indicative Price of Dunearn House New Launch Condo?</h2>
      <p>Let's start with the question on everyone's mind.</p>
      <p>The developer hasn't released official prices yet — they typically only confirm pricing at the VVIP preview (expected around July 2026). But based on the <strong>land bid of S$1,410 psf ppr</strong>, construction costs, and current market positioning, here's the realistic launch band:</p>

      <h3>Expected PSF Range</h3>
      <p><strong>$2,800 – $2,950 psf</strong> (with some larger family units possibly nudging up to $3,000+ psf)</p>
      <p>This places Dunearn House comfortably below recent CCR comparables like Watten House (launched at $3,200–$3,600 psf) while still commanding a clear premium over resale Bukit Timah condos.</p>

      <h3>Indicative Quantum by Unit Type</h3>
      <table>
        <thead><tr><th>Unit Type</th><th>Estimated Size</th><th>Indicative Quantum</th></tr></thead>
        <tbody>
          <tr><td><strong>2-Bedroom</strong></td><td>530–680 sqft</td><td>~$1.9M – $2.0M</td></tr>
          <tr><td><strong>3-Bedroom</strong></td><td>870–1,010 sqft</td><td>~$2.5M – $2.9M</td></tr>
          <tr><td><strong>4-Bedroom</strong></td><td>1,180–1,300 sqft</td><td>~$3.3M – $3.7M</td></tr>
          <tr><td><strong>4-Bedroom + Study</strong></td><td>1,300–1,380 sqft</td><td>~$3.7M – $4.0M+</td></tr>
        </tbody>
      </table>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">⚠️ Important Note</p>
        <p class="text-sm text-violet-800">These are indicative ranges based on analyst commentary and comparable launches. Final prices will only be confirmed by the developer at VVIP preview.</p>
      </div>

      <h3>Why This Pricing Looks Reasonable</h3>
      <p>For context, the adjacent Dunearn Road site (won by Wing Tai/Metro in May 2026 at $1,625 psf ppr — about 15% higher than Dunearn House's land cost) is expected to launch above $3,200 psf. That means:</p>
      <ul>
        <li>Dunearn House is priced <strong>structurally below its immediate neighbour</strong></li>
        <li>Buyers entering at launch get the lowest entry point in the precinct</li>
        <li>First-mover advantage is built into the math, not just the marketing</li>
      </ul>

      <h2>Dunearn House Unit Mix: Sizes, Layouts &amp; Who They Suit</h2>
      <p>Unlike many CCR launches that load up on tiny shoebox units, Dunearn House is built for <strong>own-stayers and families</strong>. Roughly <strong>over 50% of units are 3BR and 4BR layouts</strong>.</p>

      <h3>Detailed Unit Mix</h3>
      <table>
        <thead><tr><th>Unit Type</th><th>Estimated Size</th><th>Best Suited For</th></tr></thead>
        <tbody>
          <tr><td><strong>2-Bedroom</strong></td><td>530–680 sqft</td><td>Young couples, single professionals, empty-nesters, investors</td></tr>
          <tr><td><strong>3-Bedroom</strong></td><td>870–1,010 sqft</td><td>Young families, first child planning, HDB upgraders</td></tr>
          <tr><td><strong>4-Bedroom</strong></td><td>1,180–1,300 sqft</td><td>Families with 2+ kids, multi-gen households</td></tr>
          <tr><td><strong>4-Bedroom + Study</strong></td><td>1,300–1,380 sqft</td><td>Families needing WFH room, larger households</td></tr>
        </tbody>
      </table>

      <h3>What This Mix Tells You</h3>
      <p>The skew toward larger family layouts means:</p>
      <ul>
        <li><strong>Lower investor saturation</strong> at this development → quieter community, less rental churn</li>
        <li><strong>Higher own-stay ratio</strong> → better maintained common areas over time</li>
        <li><strong>More family-oriented facilities</strong> likely in the masterplan (kids' pools, play areas)</li>
        <li><strong>Slightly lower rental yield potential</strong> (bigger units = lower percentage yield)</li>
      </ul>
      <p>If you're buying for own-stay, this is great. If you're buying purely for rental yield, the 2BR units will be your focus — and they'll likely sell out fastest at launch.</p>

      <h2>Dunearn House Eligibility: Singaporeans, PRs, Foreigners &amp; ABSD</h2>
      <p>This is where many buyers get tripped up. Eligibility itself is straightforward, but <strong>the stamp duty impact varies dramatically depending on who you are</strong>.</p>

      <h3>Who Can Buy Dunearn House?</h3>
      <p>Dunearn House is a <strong>private condominium</strong> (not an Executive Condominium), so:</p>
      <ul>
        <li><strong>Singapore Citizens (SC)</strong>: Eligible. No restrictions.</li>
        <li><strong>Singapore PRs</strong>: Eligible. No restrictions.</li>
        <li><strong>Foreigners</strong>: Eligible to buy condos in Singapore. No SLA approval needed (unlike landed property).</li>
        <li><strong>Companies/Trusts</strong>: Eligible, but face higher ABSD.</li>
      </ul>
      <p>There's <strong>no Minimum Occupation Period (MOP)</strong> like HDB or EC. You can rent out, sell, or use it however you want (subject to SSD timing — see below).</p>

      <h3>ABSD Rates (As of 2026 — Always Verify Current Rates)</h3>
      <p>ABSD is the big cost differentiator. Here's how it stacks up on a typical $2.8M unit:</p>
      <table>
        <thead><tr><th>Buyer Profile</th><th>ABSD Rate</th><th>ABSD Amount on $2.8M</th><th>Total Stamp Duty (BSD + ABSD)*</th></tr></thead>
        <tbody>
          <tr><td><strong>SC, 1st property</strong></td><td>0%</td><td>$0</td><td>~$104,600 (BSD only)</td></tr>
          <tr><td><strong>SC, 2nd property</strong></td><td>20%</td><td>$560,000</td><td>~$664,600</td></tr>
          <tr><td><strong>SC, 3rd+ property</strong></td><td>30%</td><td>$840,000</td><td>~$944,600</td></tr>
          <tr><td><strong>PR, 1st property</strong></td><td>5%</td><td>$140,000</td><td>~$244,600</td></tr>
          <tr><td><strong>PR, 2nd+ property</strong></td><td>30%</td><td>$840,000</td><td>~$944,600</td></tr>
          <tr><td><strong>Foreigner, any property</strong></td><td>60%</td><td>$1,680,000</td><td>~$1,784,600</td></tr>
          <tr><td><strong>Entity/Company</strong></td><td>65%</td><td>$1,820,000</td><td>~$1,924,600</td></tr>
        </tbody>
      </table>
      <p>*BSD (Buyer's Stamp Duty) calculation is approximate. Always confirm with your lawyer.</p>

      <h3>The Practical Takeaway</h3>
      <ul>
        <li><strong>First-time SC buyers</strong> get the best deal — minimal stamp duty load.</li>
        <li><strong>PR first-time buyers</strong> face a meaningful 5% ABSD bump.</li>
        <li><strong>Second property buyers (SC)</strong> need to add $560k+ in ABSD — this changes the whole investment math.</li>
        <li><strong>Foreigners</strong> essentially pay 60% extra in ABSD — most foreign buyers structure purchases very carefully or wait for local PR status.</li>
      </ul>
      <p>If you're a married couple where one spouse is foreign, there are legitimate structuring options (e.g., buying in the Singaporean spouse's name only) that can save substantial ABSD. Speak to a property lawyer before committing.</p>

      <h2>Dunearn House Progressive Payment Scheme Example</h2>
      <p>One of the biggest cashflow advantages of buying a new launch is the <strong>Progressive Payment Scheme (PPS)</strong>. You don't pay for the full unit upfront — you pay in stages as construction progresses.</p>

      <h3>Typical PPS Schedule (Illustrative)</h3>
      <p>For a $2.8M unit (3-bedroom example), here's roughly how the payments would flow:</p>
      <table>
        <thead><tr><th>Stage</th><th>% of Purchase Price</th><th>Cash Outlay</th><th>Cumulative</th></tr></thead>
        <tbody>
          <tr><td><strong>Booking Fee (OTP)</strong></td><td>5%</td><td>$140,000</td><td>$140,000</td></tr>
          <tr><td><strong>Sign S&amp;P + BSD/ABSD</strong> (within 8 weeks)</td><td>15% + stamp duties</td><td>$420,000 + ~$104,600 stamp duties</td><td>~$664,600</td></tr>
          <tr><td><strong>Foundation Work</strong></td><td>10%</td><td>$280,000</td><td>$944,600</td></tr>
          <tr><td><strong>Reinforced Concrete Framework</strong></td><td>10%</td><td>$280,000</td><td>$1,224,600</td></tr>
          <tr><td><strong>Partition Walls</strong></td><td>5%</td><td>$140,000</td><td>$1,364,600</td></tr>
          <tr><td><strong>Roofing, Ceiling, Walls</strong></td><td>5%</td><td>$140,000</td><td>$1,504,600</td></tr>
          <tr><td><strong>Electrical, Plumbing, Internal Wall Finishes</strong></td><td>5%</td><td>$140,000</td><td>$1,644,600</td></tr>
          <tr><td><strong>Car Park, Roads, Drains</strong></td><td>5%</td><td>$140,000</td><td>$1,784,600</td></tr>
          <tr><td><strong>TOP (Temporary Occupation Permit)</strong></td><td>25%</td><td>$700,000</td><td>$2,484,600</td></tr>
          <tr><td><strong>CSC (Certificate of Statutory Completion)</strong></td><td>15%</td><td>$420,000</td><td>$2,904,600 (Total)</td></tr>
        </tbody>
      </table>

      <h3>Why PPS Matters</h3>
      <ul>
        <li><strong>You only finance progressively</strong> — your bank loan disburses in stages too, meaning lower monthly interest in the early years.</li>
        <li><strong>You have time to plan cashflow</strong> — typically 4–5 years between OTP and TOP.</li>
        <li><strong>You can sell before TOP</strong> (subsale) if you need to, though SSD applies if within 3 years.</li>
      </ul>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">⚠️ Watch-out</p>
        <p class="text-sm text-violet-800">The 25% TOP payment is the biggest single lump sum. Make sure your bank loan and CPF are confirmed well before that milestone — many buyers forget to plan for this.</p>
      </div>

      <h2>CPF, LTV &amp; Mortgage: How Much Can You Actually Afford?</h2>
      <p>Let's get practical. Here's a rough cashflow framework for a $2.8M Dunearn House unit.</p>

      <h3>Loan-to-Value (LTV) Limits</h3>
      <p>Assuming this is your first private property and you have no existing housing loans:</p>
      <ul>
        <li><strong>Maximum LTV</strong>: 75% of purchase price (i.e., $2.1M)</li>
        <li><strong>Minimum down payment</strong>: 25% ($700,000) — of which 5% must be cash and 20% can be cash or CPF</li>
      </ul>
      <p>If you already have an outstanding housing loan, LTV drops to <strong>45%</strong> on this purchase. Two outstanding loans = <strong>35% LTV</strong>. This is why upgraders need to plan their HDB/condo timing carefully.</p>

      <h3>Approximate Monthly Mortgage</h3>
      <p>Assuming:</p>
      <ul>
        <li>Loan amount: $2.1M</li>
        <li>Tenure: 30 years</li>
        <li>Indicative interest rate: 3.5% (2026 market range)</li>
      </ul>
      <p><strong>Estimated monthly instalment: ~$9,430</strong></p>
      <p>Note: During PPS, your monthly payment will be <em>lower</em> (since only part of the loan is disbursed), then ramp up as more stages release.</p>

      <h3>TDSR Reality Check</h3>
      <p>The <strong>Total Debt Servicing Ratio (TDSR)</strong> caps your monthly debt obligations at <strong>55%</strong> of gross monthly income. For a $2.1M loan:</p>
      <ul>
        <li>You need roughly <strong>$17,000+ gross monthly household income</strong> to qualify comfortably</li>
        <li>This typically translates to <strong>~$220,000+ annual household income</strong></li>
      </ul>
      <p>If you're nowhere near this, the 2BR units (~$1.9M) require closer to $13,000–$14,000 monthly income — more accessible for younger upgrader couples.</p>

      <h3>CPF Usage</h3>
      <p>You can use CPF Ordinary Account (OA) for:</p>
      <ul>
        <li>Down payment (after the initial 5% cash)</li>
        <li>Monthly mortgage repayments</li>
        <li>Stamp duties (reimbursable from CPF after payment)</li>
      </ul>
      <p>There's a <strong>CPF Withdrawal Limit</strong> of 120% of the property's Valuation Limit, but for a new launch where you're buying at market price, this is rarely a binding constraint until much later.</p>

      <h2>TOP Date &amp; Completion Timeline (2030–2031)</h2>
      <p>Here's the realistic timeline you're buying into:</p>
      <table>
        <thead><tr><th>Milestone</th><th>Estimated Timing</th></tr></thead>
        <tbody>
          <tr><td><strong>VVIP Preview</strong></td><td>July 2026</td></tr>
          <tr><td><strong>Public Launch</strong></td><td>2H 2026</td></tr>
          <tr><td><strong>Sign S&amp;P</strong></td><td>Within 8 weeks of OTP</td></tr>
          <tr><td><strong>Construction Start</strong></td><td>Late 2026 / Early 2027</td></tr>
          <tr><td><strong>TOP</strong></td><td>2030–2031</td></tr>
          <tr><td><strong>CSC (Legal Completion)</strong></td><td>2031–2032</td></tr>
          <tr><td><strong>Possession + Defect Liability Period</strong></td><td>Starts at TOP</td></tr>
        </tbody>
      </table>
      <p><strong>Practical implication</strong>: From the day you put down your OTP cheque, you're looking at roughly <strong>4–5 years before you can move in or rent out</strong>. Plan accordingly — especially if you're an HDB upgrader timing your existing flat's sale.</p>

      <h2>Dunearn House Pros and Cons (Buyer's Decision Summary)</h2>

      <h3>✅ Pros</h3>
      <ol>
        <li><strong>Below adjacent project's expected price</strong> — built-in margin from first-mover positioning</li>
        <li><strong>Strong developer JV</strong> — Frasers + Sekisui + CSC = build quality + reputation</li>
        <li><strong>~7-min walk to Sixth Avenue MRT</strong> + future Turf City MRT (CRL) by ~2032</li>
        <li><strong>Top schools within 1–2km</strong> — Methodist Girls', Nanyang Primary, Hwa Chong, Nanyang Girls' High</li>
        <li><strong>Family-friendly unit mix</strong> — over 50% are 3BR/4BR</li>
        <li><strong>Low density</strong> — ~380 units on 145,000+ sqft</li>
        <li><strong>Surrounded by greenery</strong> — Bukit Timah Nature Reserve, Botanic Gardens, future Green Corridor</li>
        <li><strong>Progressive Payment Scheme</strong> — cashflow-friendly compared to resale</li>
        <li><strong>No SSD if held 3+ years</strong> — flexible exit options</li>
        <li><strong>CCR address at relatively accessible quantum</strong> (compared to D9/D10 prime)</li>
      </ol>

      <h3>❌ Cons</h3>
      <ol>
        <li><strong>99-year leasehold</strong> in a freehold-dominant area</li>
        <li><strong>TOP only in 2030–2031</strong> — long capital lock-in</li>
        <li><strong>Construction noise</strong> from broader Turf City masterplan for years</li>
        <li><strong>Adjacent project competition</strong> — Wing Tai/Metro site next door may launch at similar TOP timing</li>
        <li><strong>Family-heavy unit mix</strong> = lower rental yield (~2.5–3%)</li>
        <li><strong>High quantum</strong> — minimum ~$1.9M entry, 3BR is ~$2.8M+</li>
        <li><strong>ABSD impact</strong> — significant cost for 2nd property buyers, PRs, and foreigners</li>
      </ol>

      <h2>Is Dunearn House Better Than Resale Condos in Bukit Timah?</h2>
      <p>This is the comparison that matters most for many buyers. Let's break it down honestly.</p>
      <table>
        <thead><tr><th>Factor</th><th>Dunearn House (New Launch)</th><th>Resale Bukit Timah Condos</th></tr></thead>
        <tbody>
          <tr><td><strong>Entry PSF</strong></td><td>$2,800–$2,950</td><td>$1,800–$2,400 (varies)</td></tr>
          <tr><td><strong>Tenure</strong></td><td>99-yr (fresh)</td><td>Often freehold or 60–80 yrs remaining</td></tr>
          <tr><td><strong>Build Age</strong></td><td>New, Sekisui-grade</td><td>20–30 years old in most cases</td></tr>
          <tr><td><strong>Move-in Time</strong></td><td>2030–2031</td><td>Immediately</td></tr>
          <tr><td><strong>Initial Repairs/AEI Risk</strong></td><td>Minimal first 5–10 years</td><td>Variable — older buildings need works</td></tr>
          <tr><td><strong>Layouts</strong></td><td>Modern, efficient</td><td>Older designs; some inefficient</td></tr>
          <tr><td><strong>Resale Liquidity (Future)</strong></td><td>Strong post-TOP</td><td>Moderate — older stock often slower</td></tr>
          <tr><td><strong>Capital Appreciation Potential</strong></td><td>Higher (precinct upside)</td><td>Lower (mature, capped)</td></tr>
          <tr><td><strong>Mortgage Cashflow</strong></td><td>Easier (PPS staggered)</td><td>Full loan from day 1</td></tr>
          <tr><td><strong>Lifestyle "Feel"</strong></td><td>New, integrated greenery</td><td>Mature, established</td></tr>
        </tbody>
      </table>

      <h3>Quick Take</h3>
      <ul>
        <li><strong>For long-term hold (7+ years), own-stay families</strong>: Dunearn House typically wins on net liveability and appreciation.</li>
        <li><strong>For immediate move-in, freehold preference</strong>: Resale Bukit Timah is more efficient.</li>
        <li><strong>For pure budget</strong>: Resale is cheaper upfront, but you may spend more on maintenance/renovation.</li>
      </ul>

      <h2>Dunearn House vs Other D11 Projects (Including Fourth Avenue Residences)</h2>
      <p>Here's how Dunearn House stacks up against the main District 11 comparables:</p>
      <table>
        <thead><tr><th>Project</th><th>Tenure</th><th>Year/Status</th><th>PSF</th><th>Unit Mix Notes</th></tr></thead>
        <tbody>
          <tr><td><strong>Dunearn House</strong></td><td>99-yr LH</td><td>New launch (2026)</td><td>$2,800–$2,950 (est.)</td><td>Family-heavy, 2BR–4BR+Study</td></tr>
          <tr><td><strong>Watten House</strong></td><td>Freehold</td><td>Launched 2023</td><td>$3,200–$3,600</td><td>Smaller boutique-style</td></tr>
          <tr><td><strong>Fourth Avenue Residences</strong></td><td>Freehold</td><td>Launched ~2019; resale</td><td>~$2,100–$2,500 (resale)</td><td>Smaller units, completed</td></tr>
          <tr><td><strong>Next Dunearn Road Site</strong> (Wing Tai/Metro)</td><td>99-yr LH</td><td>Future launch (~2027)</td><td>$3,200+ (est.)</td><td>TBC</td></tr>
          <tr><td><strong>Pinetree Hill</strong> (nearby D21)</td><td>99-yr LH</td><td>Launched 2023</td><td>$2,300–$2,500</td><td>Mass appeal</td></tr>
        </tbody>
      </table>

      <h3>Dunearn House vs Fourth Avenue Residences</h3>
      <p>A specific comparison many buyers ask about:</p>
      <ul>
        <li><strong>Fourth Avenue Residences</strong> is freehold, smaller (around 105 units), already TOP'd, and trades around $2,100–$2,500 psf on resale. It's roughly 5 minutes' walk to Sixth Avenue MRT.</li>
        <li><strong>Dunearn House</strong> is 99-yr leasehold, much larger (~380 units), under construction until 2030–2031, and launches at $2,800–$2,950 psf.</li>
      </ul>
      <p><strong>Trade-off</strong>: Fourth Avenue Residences wins on tenure (freehold) and immediate possession. Dunearn House wins on build freshness, masterplan upside, dual-line MRT future, and unit selection (you can pick your stack at launch).</p>
      <p>For an investor on a 10+ year horizon, Dunearn House's precinct narrative likely outperforms. For a buyer wanting freehold + immediate move-in, Fourth Avenue Residences is the more pragmatic choice.</p>

      <h2>Best New Launch Condos Singapore 2026: Where Does Dunearn House Sit?</h2>
      <p>Across the 2026 launch pipeline:</p>
      <table>
        <thead><tr><th>Project</th><th>Region</th><th>Tenure</th><th>Indicative PSF</th><th>Best For</th></tr></thead>
        <tbody>
          <tr><td><strong>Dunearn House</strong></td><td>CCR (D11)</td><td>99-yr</td><td>$2,800–$2,950</td><td>CCR families, masterplan investors</td></tr>
          <tr><td>Lentor Gardens</td><td>OCR (D26)</td><td>99-yr</td><td>$2,200–$2,400</td><td>OCR upgraders, yield-focused</td></tr>
          <tr><td>Thomson Reserve Residences</td><td>D20</td><td>99-yr</td><td>TBC</td><td>Thomson cluster buyers</td></tr>
          <tr><td>Vela Bay</td><td>RCR</td><td>99-yr</td><td>TBC</td><td>RCR investors</td></tr>
          <tr><td>Pinery Residences</td><td>TBC</td><td>99-yr</td><td>TBC</td><td>TBC</td></tr>
        </tbody>
      </table>
      <p>If you want a <strong>CCR launch with strong infrastructure tailwinds</strong> and don't mind paying the CCR premium, Dunearn House is currently the most strategically positioned 2026 launch in District 11.</p>

      <h2>How to Register for Dunearn House Showflat &amp; VVIP Preview (July 2026)</h2>
      <p>The VVIP preview is where serious buyers get the best stack selection and early-bird discounts (typically 3–8% off public launch pricing).</p>

      <h3>Steps to Register</h3>
      <ol>
        <li><strong>Register your interest</strong> via official developer channels or an accredited agent (no commission to you as buyer in Singapore — agent fees are paid by the developer).</li>
        <li><strong>Get on the VVIP list</strong> — this gives you priority access before public launch.</li>
        <li><strong>Attend the VVIP preview</strong> at the showflat (location confirmed closer to date).</li>
        <li><strong>Make a Cheque Booking</strong> if you decide to proceed — this reserves your unit for a short window before OTP.</li>
        <li><strong>OTP issuance</strong> — once you commit, you sign the Option to Purchase and pay the 5% booking fee.</li>
        <li><strong>Sign S&amp;P</strong> within 8 weeks and pay BSD + ABSD.</li>
      </ol>

      <h3>Tips for Booking Day</h3>
      <ul>
        <li><strong>Decide your stack preferences in advance</strong> — orientation, floor level, view.</li>
        <li><strong>Have your funds ready</strong> — booking cheque needs to clear quickly.</li>
        <li><strong>Confirm bank loan In-Principle Approval (IPA)</strong> before booking — don't assume.</li>
        <li><strong>Don't get rushed</strong> — if your top 3 stacks are taken, it's okay to walk away.</li>
      </ul>

      <h2>Common Buyer Mistakes to Avoid</h2>
      <p>After helping many buyers through new launch decisions, here are the most common slip-ups:</p>
      <ol>
        <li><strong>Skipping IPA before booking day</strong> — you'll be locked into an OTP without confirmed financing.</li>
        <li><strong>Forgetting ABSD remission rules</strong> — married couples buying jointly may qualify for ABSD remission on the second property if the first is sold within 6 months.</li>
        <li><strong>Underestimating stamp duty</strong> — BSD alone on $2.8M is ~$104,600. Plan cash for this.</li>
        <li><strong>Choosing stack by price alone</strong> — orientation and floor matter for liveability <em>and</em> resale.</li>
        <li><strong>Ignoring the SSD timing</strong> — Seller's Stamp Duty applies if you sell within 3 years.</li>
        <li><strong>Stretching TDSR to the max</strong> — leave buffer for interest rate increases. Stress-test at 4%+.</li>
        <li><strong>Confusing TOP with legal completion</strong> — you move in at TOP, but legal completion (CSC) is 12 months later.</li>
        <li><strong>Not coordinating HDB sale timing</strong> — if you're an upgrader, mistiming the sale of your HDB can trigger ABSD you weren't expecting.</li>
      </ol>

      <h2>Conclusion: Should You Buy Dunearn House?</h2>
      <p>If you're a Singapore Citizen or PR buying for own-stay, you have the financial buffer to handle the $2.5M+ quantum, and you can wait 4–5 years for TOP — <strong>Dunearn House is one of the most strategically sound new launches of 2026.</strong></p>
      <p>The combination is unusually clean:</p>
      <ul>
        <li>Entry pricing below the adjacent next launch</li>
        <li>Strong developer JV</li>
        <li>Family-focused layouts and low density</li>
        <li>Sixth Avenue MRT + future Turf City MRT</li>
        <li>Top-tier schools in walking radius</li>
        <li>First-mover in a URA-backed masterplan</li>
      </ul>
      <p>It's not the right project if you need immediate move-in, want freehold tenure, or are chasing maximum rental yield. But for the right buyer profile, the long-term value proposition is among the most compelling in this cycle.</p>
      <p><strong>My suggested next step</strong>: Register your interest before July 2026 to secure VVIP preview access. Get your bank IPA ready. Pick your top 3 preferred stacks. Walk the neighbourhood once before showflat day so you understand what you're actually buying into. The best units always go in the first wave — preparation wins.</p>

      <h2>Dunearn House Buyer's Guide FAQ</h2>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          1. What is the indicative price of Dunearn House new launch condo?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The expected launch price is <strong>$2,800–$2,950 psf</strong>, with total quantum ranging from <strong>~$1.9M (smallest 2BR) to ~$3.3M+ (4BR/4BR+Study)</strong>. Final pricing will be confirmed by the developer at VVIP preview, expected July 2026.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          2. Is Dunearn House 99-year leasehold worth buying in Singapore?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes, for most buyer profiles. Despite being 99-year leasehold in a freehold-heavy area, the entry price is structurally below the adjacent project, the developer JV is strong, and the Turf City masterplan provides clear long-term upside. Lease decay only becomes material after 20+ years.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          3. What is Dunearn House eligibility for Singaporeans, PRs, and foreigners (ABSD)?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600"><strong>Singaporeans (first property)</strong>: no ABSD. <strong>PRs (first property)</strong>: 5% ABSD. <strong>Foreigners</strong>: 60% ABSD. <strong>Entities</strong>: 65% ABSD. Second-property ABSD for SCs is 20%; for PRs it's 30%. Always confirm current rates with IRAS before committing.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          4. What is the Dunearn House Progressive Payment Scheme example?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">You pay roughly <strong>5% at OTP</strong>, <strong>15% at S&amp;P signing</strong>, then progressive milestones (foundation, framework, walls, roofing, etc.) at 5–10% each, with <strong>25% at TOP</strong> and <strong>15% at CSC (legal completion)</strong>. Total payment is staggered over 4–5 years.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          5. What are Dunearn House 2-bedroom, 3-bedroom, and 4-bedroom sizes and layouts?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600"><strong>2BR</strong>: 530–680 sqft. <strong>3BR</strong>: 870–1,010 sqft. <strong>4BR</strong>: 1,180–1,300 sqft. <strong>4BR+Study</strong>: 1,300–1,380 sqft. Over 50% of the project is 3BR/4BR, indicating a strong own-stay and family focus.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          6. Is Dunearn House better than resale condos in Bukit Timah?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">For long-term own-stay (7+ years), generally yes — Dunearn House offers fresh lease, modern build quality, and masterplan upside. For immediate move-in or freehold preference, resale Bukit Timah condos can be more practical.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          7. What is the Dunearn House TOP date and completion timeline?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Expected <strong>TOP in 2030–2031</strong>, with legal completion (CSC) in 2031–2032. From booking to move-in is roughly 4–5 years.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          8. How to register for Dunearn House showflat VVIP Preview July 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Register your interest via official developer channels or an accredited agent. VVIP list members get priority access, best stack selection, and early-bird discounts before public launch. Have your bank IPA ready before booking day.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          9. How does Dunearn House compare to other new launches in Singapore 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Among 2026 launches, Dunearn House is the most strategically positioned CCR launch in District 11 — combining masterplan upside, MRT proximity, top schools, and a strong developer JV. Lentor Gardens and Thomson cluster launches serve different OCR/RCR buyer profiles.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          10. What is the difference between Dunearn House and Fourth Avenue Residences?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Fourth Avenue Residences is freehold, already TOP'd, smaller (~105 units), and resale-traded at ~$2,100–$2,500 psf. Dunearn House is 99-yr leasehold, larger (~380 units), under construction, and launches at $2,800–$2,950 psf. Choose based on whether you prioritize freehold + immediate move-in (Fourth Avenue) or masterplan upside + new build (Dunearn House).</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>
      <p>2. <a href="/insights/dunearn-house-review-2026" onclick="showArticle('post-dunearn-house-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House Review 2026: Is It Worth Buying? (Honest Pros &amp; Cons)</strong></a></p>
      <p>3. <a href="/insights/dunearn-vs-fourth-avenue" onclick="showArticle('post-dunearn-vs-fourth-avenue-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House vs Fourth Avenue Residences: Which Is the Better Investment? (2026)</strong></a></p>
      <p>4. <a href="/insights/new-launch-vs-resale-cheaper-2026" onclick="showArticle('post-new-launch-vs-resale-cheaper-2026'); return false;" class="underline hover:text-violet-700"><strong>Are New Launch Condos Cheaper Than Resale? A 2026 Singapore Buyer's Guide</strong></a></p>
      <p>5. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer's Guide</strong></a></p>

      <p><em>Disclaimer: This article is for general informational purposes and does not constitute financial or property investment advice. Prices, timelines and details are indicative based on land costs, analyst reports and comparable launches as of June 2026 and are subject to change. Always verify the latest information directly with the developer, IRAS, URA, and consult a licensed advisor or lawyer before making any purchase decision.</em></p>
    `
  },

  'post-dunearn-house-family-living-guide-2026': {
    title: 'Why Families Love Dunearn House Bukit Timah: Prime Location Near Sixth Avenue MRT, Top Schools & Green Living in Turf City',
    date: '5 Jun 2026',
    readTime: '14 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/pulse/dunearn-house-family-living-guide-2026-jack-leow',
    body: `
      <p><strong>Dunearn House is genuinely one of the most family-friendly new launches of 2026.</strong> It sits about a 7-minute walk from Sixth Avenue MRT, surrounded by Singapore's top school belt (Methodist Girls', Nanyang Primary, Hwa Chong, Nanyang Girls' High), wrapped by nature — Bukit Timah Nature Reserve, the Rail Corridor, and the upcoming Bukit Timah-Rochor Green Corridor — and built as a low-density development of just ~380 units across 145,000+ sqft with a heavy family unit mix (no 1BR units).</p>

      <p>If you're a parent or HDB upgrader looking at Dunearn House in Bukit Timah, your real question isn't just "is it a good investment?" — it's "will my family actually be happy living here day-to-day?" Below is a practical look at schools, MRT access, greenery, retail, weekends, and real family routines.</p>

      <h2>Dunearn House Family Living Snapshot</h2>

      <table>
        <thead><tr><th>What Matters for Families</th><th>Dunearn House</th></tr></thead>
        <tbody>
          <tr><td><strong>Location</strong></td><td>Dunearn Road, District 11 (Bukit Timah, Swiss Club Subzone)</td></tr>
          <tr><td><strong>Nearest MRT</strong></td><td>Sixth Avenue MRT (Downtown Line) — ~7-min walk</td></tr>
          <tr><td><strong>Future MRT</strong></td><td>Turf City MRT (Cross Island Line, ~2032)</td></tr>
          <tr><td><strong>Total Units</strong></td><td>~380 (low-density across 145,173 sqft)</td></tr>
          <tr><td><strong>Unit Mix</strong></td><td>2BR to 4BR+Study — family-focused (no 1BR)</td></tr>
          <tr><td><strong>Greenery Cover</strong></td><td>35%+ landscaping (low-rise, garden-style)</td></tr>
          <tr><td><strong>Schools Within 1–2km</strong></td><td>Methodist Girls', Nanyang Primary, Pei Hwa Presbyterian, Raffles Girls' Primary, Nanyang Girls' High, Hwa Chong</td></tr>
          <tr><td><strong>Nature Access</strong></td><td>Bukit Timah Nature Reserve, Botanic Gardens, Rail Corridor, future Green Corridor</td></tr>
          <tr><td><strong>Nearby Retail</strong></td><td>Coronation Plaza, Bukit Timah Plaza, Cold Storage Sixth Avenue, Greenwood Avenue, Beauty World</td></tr>
          <tr><td><strong>Developer</strong></td><td>Frasers Property × Sekisui House × CSC Land Group</td></tr>
          <tr><td><strong>Expected TOP</strong></td><td>2030–2031</td></tr>
        </tbody>
      </table>

      <h2>Walking Distance to Sixth Avenue MRT from Dunearn House</h2>

      <p>Depending on which block you're in, you're looking at <strong>roughly 4–10 minutes on foot</strong> to Sixth Avenue MRT. Realistically, for the average resident, <strong>~7 minutes</strong> is a fair benchmark.</p>

      <p>That's not "MRT-integrated" close, but it's well within the comfort zone that most Singapore families look for — close enough that kids can walk it independently, far enough that you're not sitting on top of the station.</p>

      <h3>What Sixth Avenue MRT Gets You</h3>

      <p>Sixth Avenue is on the <strong>Downtown Line (DTL)</strong> — one of Singapore's most useful lines for families:</p>

      <ul>
        <li><strong>Botanic Gardens</strong> — 1 stop (weekend family outings)</li>
        <li><strong>Newton</strong> — 3 stops (Newton interchange to NSL)</li>
        <li><strong>Bugis</strong> — 7 stops (without transfer)</li>
        <li><strong>Downtown / CBD</strong> — ~20 minutes door-to-door</li>
        <li><strong>Bayfront</strong> — direct, no transfers (for that Marina Bay Sands weekend)</li>
      </ul>

      <p>For school-going kids, that's also direct access to MGS, Singapore Chinese Girls' School, and Catholic High clusters depending on which stop they alight at.</p>

      <h3>And in the Near Future: Dual-Line Access</h3>

      <p>The <strong>Turf City MRT station</strong> on the Cross Island Line (CRL Phase 2) is expected around 2032. When it opens, Dunearn House becomes a <strong>dual-line address</strong> — Downtown Line at Sixth Avenue, plus Cross Island Line at Turf City.</p>

      <p>That's a big deal for families. Dual-line access typically means shorter commutes, more route options, and a much easier daily life when school runs and work commutes don't align.</p>

      <h3>For Drivers</h3>

      <p>If you're a two-car family (common in this area), you're equally well-served:</p>

      <ul>
        <li><strong>PIE entry</strong>: ~5 minutes</li>
        <li><strong>BKE entry</strong>: ~5 minutes</li>
        <li><strong>Orchard Road</strong>: ~10–15 minutes</li>
        <li><strong>CBD via Dunearn → Bukit Timah → River Valley</strong>: ~15–20 minutes off-peak</li>
      </ul>

      <h2>Dunearn House Near Which Primary Schools? (The Education Belt)</h2>

      <p>Let's be real — for most Singapore families, <strong>schools are the deciding factor</strong>. Bukit Timah isn't just a "nice area"; it's one of the most concentrated education clusters in the country.</p>

      <h3>Primary Schools Within 1–2km</h3>

      <p>Based on preliminary OneMap checks (always verify closer to your registration year — MOE boundaries can shift at the stack level):</p>

      <table>
        <thead><tr><th>Primary School</th><th>Distance Band</th><th>Why Parents Want It</th></tr></thead>
        <tbody>
          <tr><td><strong>Methodist Girls' School (Primary)</strong></td><td>Within 1km</td><td>Highly sought-after all-girls; affiliation pathway to MGS Sec</td></tr>
          <tr><td><strong>Nanyang Primary School</strong></td><td>Within 1–2km</td><td>Bilingual strength; SAP school; feeder to Nanyang Girls' High</td></tr>
          <tr><td><strong>Pei Hwa Presbyterian Primary</strong></td><td>Within 1–2km</td><td>Strong CCAs; well-rounded curriculum</td></tr>
          <tr><td><strong>Raffles Girls' Primary School</strong></td><td>Within 1–2km</td><td>Top-tier all-girls; strong academic track record</td></tr>
        </tbody>
      </table>

      <p>The 1km rule is what really matters here. If you're applying via Phase 2C, <strong>distance is the tie-breaker</strong> — and Dunearn House gives you a credible shot at one of the most coveted primary schools (MGS Primary).</p>

      <h3>Secondary Schools &amp; JCs Within Easy Reach</h3>

      <p>This is where the Bukit Timah belt really shines:</p>

      <ul>
        <li><strong>Nanyang Girls' High School</strong></li>
        <li><strong>Hwa Chong Institution</strong></li>
        <li><strong>National Junior College (NJC)</strong></li>
        <li><strong>Methodist Girls' Secondary</strong></li>
        <li><strong>Raffles Girls' Secondary</strong> (slightly further but accessible)</li>
      </ul>

      <p>All of these are either within walking/cycling distance or a single bus/MRT stop away. For families with kids spanning primary to JC, you're essentially set for the next 12–14 years.</p>

      <h3>International Schools Nearby</h3>

      <p>If you're an expat family or planning that route:</p>

      <ul>
        <li><strong>Hollandse School</strong> (Dutch)</li>
        <li><strong>Swiss School in Singapore</strong></li>
        <li><strong>Chinese International School Singapore</strong></li>
        <li><strong>Nexus International School</strong> (a short drive)</li>
      </ul>

      <p>This is a genuine perk that mass-market suburban locations can't match.</p>

      <h2>Is Dunearn House Good for Families with Children?</h2>

      <p><strong>Yes — and the unit mix tells you the developer designed it that way.</strong></p>

      <h3>The Unit Types Are Built for Growing Families</h3>

      <p>Unlike many CCR launches that load up on shoebox units for investors, Dunearn House skews heavily toward:</p>

      <ul>
        <li><strong>2-Bedroom</strong> — for young couples planning kids or empty-nesters right-sizing</li>
        <li><strong>3-Bedroom</strong> — the family workhorse (kids' rooms + master)</li>
        <li><strong>4-Bedroom</strong> and <strong>4-Bedroom + Study</strong> — for bigger families, multi-gen households, or families who want a dedicated study/WFH room</li>
      </ul>

      <p>There are reportedly <strong>no 1-bedroom units</strong>. That's a deliberate choice — it means you won't be living next to a rotating cast of short-term tenants, which is a real quality-of-life win.</p>

      <h3>Low-Density = More Breathing Room</h3>

      <p>~380 units across ~145,000 sqft of land = roughly <strong>380 sqft of land per unit</strong> at the site level. By Singapore standards, that's spacious. Translation:</p>

      <ul>
        <li>Less queue for the pool</li>
        <li>More room between blocks</li>
        <li>Better cross-ventilation and natural light</li>
        <li>Quieter common areas</li>
        <li>More mature landscaping over time</li>
      </ul>

      <h3>Designed for Daily Family Routines</h3>

      <p>A low-rise, garden-style condo with 35%+ greenery cover means kids can actually play outdoors, residents can stroll the grounds, and you don't need to "go somewhere" to get fresh air. For young children, this is huge.</p>

      <h2>Dunearn House Greenery &amp; Turf City Green Corridor Masterplan</h2>

      <p>If you've been living in a regular condo and tired of looking out at concrete, this is the part that will sell you.</p>

      <h3>Wrapped by Nature</h3>

      <p>Dunearn House is genuinely surrounded by green spaces:</p>

      <ul>
        <li><strong>Bukit Timah Nature Reserve</strong> — Singapore's primary rainforest; weekend hike territory</li>
        <li><strong>Singapore Botanic Gardens</strong> — UNESCO World Heritage Site, ~2 MRT stops away</li>
        <li><strong>Central Catchment Nature Reserve</strong> — slightly further but accessible</li>
        <li><strong>The Rail Corridor</strong> — the old KTM railway, now a 24km island-spanning park</li>
        <li><strong>Bukit Timah Hill</strong> — for serious weekend hikers</li>
      </ul>

      <p>For families with kids and dogs, this is a different lifestyle from a typical condo. You can build weekly habits around outdoor time without driving anywhere.</p>

      <h3>The Bukit Timah-Rochor Green Corridor (BTGRC)</h3>

      <p>The masterplan includes a <strong>new elevated linear park</strong> along the Bukit Timah Canal — connecting the wider green network across the island. Once completed, this becomes part of your literal doorstep:</p>

      <ul>
        <li>Safe jogging and cycling paths</li>
        <li>Family-friendly walks without crossing major roads</li>
        <li>Direct link into the broader Park Connector Network</li>
        <li>Eventual connection to Orchard, Marina, and other major nodes via continuous green spine</li>
      </ul>

      <h3>Inside the Development</h3>

      <p>Designed by <strong>Ong &amp; Ong</strong> (architects) with landscaping by <strong>Ecoplan Asia</strong>, both known for nature-integrated environments. The 35%+ greenery target means:</p>

      <ul>
        <li>Lush internal landscaping (not just decorative greenery)</li>
        <li>Mature trees and shaded walking paths</li>
        <li>Resort-style pool zones</li>
        <li>Kids' play areas with natural elements</li>
      </ul>

      <h2>Dunearn House Vs Other Bukit Timah Condos for Daily Convenience</h2>

      <p>Bukit Timah has plenty of older condos, but they vary a lot in daily liveability. Here's an honest comparison:</p>

      <table>
        <thead><tr><th>Factor</th><th>Dunearn House</th><th>Older Bukit Timah Condos</th></tr></thead>
        <tbody>
          <tr><td><strong>MRT access</strong></td><td>7-min walk to Sixth Ave + future Turf City MRT</td><td>Many are 10–20 min walk to nearest MRT</td></tr>
          <tr><td><strong>Build quality</strong></td><td>New, Sekisui-grade construction</td><td>20–30 years old; some need refurbishment</td></tr>
          <tr><td><strong>Layouts</strong></td><td>Modern family layouts (3BR/4BR efficient)</td><td>Older layouts; some inefficient or awkward</td></tr>
          <tr><td><strong>Facilities</strong></td><td>Resort-style, new</td><td>Often dated; smaller pools/gyms</td></tr>
          <tr><td><strong>Maintenance fees</strong></td><td>Likely moderate (new project, fewer repairs)</td><td>Often rising as buildings age</td></tr>
          <tr><td><strong>Density</strong></td><td>Low (~380 units)</td><td>Varies; some are higher density</td></tr>
          <tr><td><strong>School proximity</strong></td><td>Strong (within 1–2km cluster)</td><td>Varies — many are good, some are further</td></tr>
          <tr><td><strong>Future infrastructure</strong></td><td>Direct beneficiary of Turf City masterplan + CRL</td><td>Largely static</td></tr>
          <tr><td><strong>Resale liquidity</strong></td><td>Likely strong post-TOP</td><td>Slower; depends on individual project</td></tr>
        </tbody>
      </table>

      <p>If you're picking purely on <strong>daily liveability and future-proofing</strong>, Dunearn House has a meaningful edge over most resale options in the area.</p>

      <h3>Where Resale Bukit Timah Wins</h3>

      <p>In fairness — resale can win on:</p>

      <ul>
        <li><strong>Freehold tenure</strong> (many older Bukit Timah condos are freehold)</li>
        <li><strong>Entry price</strong> (you can get into resale at $1,800–$2,400 psf)</li>
        <li><strong>Move-in immediacy</strong> (no 4-5 year wait)</li>
      </ul>

      <p>If immediate move-in is your priority, resale may suit you better. But for families with school-age planning over the next decade, Dunearn House's location + future-proofing wins more often than not.</p>

      <h2>Nearby Retail &amp; Daily Conveniences (What's Within Easy Reach)</h2>

      <p>Daily life isn't just commutes and schools — it's groceries, dining, weekend brunch, that quick bubble tea run. Here's what's around:</p>

      <h3>Within Walking/Short Drive Distance</h3>

      <ul>
        <li><strong>Cold Storage Sixth Avenue</strong> — your default supermarket</li>
        <li><strong>Greenwood Avenue</strong> — boutique dining, bakeries, weekend brunch spots</li>
        <li><strong>Coronation Plaza</strong> — supermarket, eateries, family dental, pharmacies</li>
        <li><strong>Bukit Timah Plaza &amp; Sixth Avenue Centre</strong> — local neighbourhood mall vibe</li>
        <li><strong>The Grandstand (current)</strong> — bowling, restaurants, kids' enrichment classes</li>
        <li><strong>The Rail Mall</strong> — café strip, gym, vet clinics — great for casual weekends</li>
      </ul>

      <h3>Slightly Further but Still Convenient</h3>

      <ul>
        <li><strong>Beauty World Plaza &amp; Bukit Timah Shopping Centre</strong> — hawker food, value-for-money shopping</li>
        <li><strong>Holland Village</strong> — buzzier dining and brunch scene (~10 min drive)</li>
        <li><strong>Orchard Road</strong> — 10–15 min drive for major shopping and entertainment</li>
        <li><strong>Dempsey Hill / Tanglin</strong> — upscale dining clusters, ~10 min drive</li>
      </ul>

      <h3>Healthcare</h3>

      <ul>
        <li><strong>Mount Elizabeth Novena Hospital</strong> — ~10 min drive</li>
        <li><strong>Gleneagles Hospital</strong> — ~10 min drive</li>
        <li><strong>National University Hospital (NUH)</strong> — ~15 min drive</li>
        <li>Numerous GP and specialist clinics in the area</li>
      </ul>

      <p>For a family, the <strong>density of services within a 10-minute radius</strong> is exceptional. You're not making big logistics trips for daily life.</p>

      <h2>A Day in the Life at Dunearn House (What Daily Routines Actually Look Like)</h2>

      <p>Let me paint a realistic picture for a typical Singapore family living here:</p>

      <p><strong>Morning:</strong></p>

      <ul>
        <li>6.30am: Quiet wake-up; birds outside (Bukit Timah is genuinely green and audible)</li>
        <li>7.00am: Kids head out — walk 7 min to Methodist Girls' or take bus to Nanyang Primary</li>
        <li>7.30am: Parent walks to Sixth Avenue MRT, train to Newton/Downtown for work</li>
        <li>Or: Drive PIE to anywhere across the island</li>
      </ul>

      <p><strong>Lunch / Mid-Day:</strong></p>

      <ul>
        <li>WFH parents can grab lunch at Coronation Plaza or Greenwood Avenue</li>
        <li>Quick supermarket run at Cold Storage Sixth Avenue</li>
      </ul>

      <p><strong>After School:</strong></p>

      <ul>
        <li>Kids back home; tuition/enrichment at The Grandstand or local centres</li>
        <li>Light exercise: walk the Rail Corridor or jog the future Green Corridor</li>
        <li>Pool time at the condo (low-density = actually usable)</li>
      </ul>

      <p><strong>Weekend:</strong></p>

      <ul>
        <li>Saturday morning: hike at Bukit Timah Nature Reserve</li>
        <li>Brunch at Greenwood Avenue or Dempsey Hill</li>
        <li>Botanic Gardens picnic or Rail Corridor cycle</li>
        <li>Quick MRT to town for a shopping/movie trip</li>
      </ul>

      <p>This is a lifestyle most CCR condos can't actually deliver because they're surrounded by busy commercial areas. Dunearn House sits in a rare residential pocket that's both connected <em>and</em> peaceful.</p>

      <h2>Who Dunearn House Is Perfect For</h2>

      <p>Based on the unit mix, location, and surrounding amenities, this project is genuinely tailored for:</p>

      <ul>
        <li><strong>Young families</strong> with children entering Primary 1 in the next few years (and you want school options)</li>
        <li><strong>HDB upgraders</strong> moving up to a CCR family home for the long haul</li>
        <li><strong>Multi-generational households</strong> (3BR/4BR layouts accommodate parents living with you)</li>
        <li><strong>Right-sizers</strong> from larger landed homes in the area who want easier maintenance</li>
        <li><strong>Expat families</strong> wanting proximity to international schools and a quieter residential setting</li>
        <li><strong>WFH professionals</strong> who value greenery, quiet, and an MRT station within walking distance</li>
      </ul>

      <p>It's probably <strong>not</strong> the best fit for:</p>

      <ul>
        <li>Single young professionals (no 1BR units, large quantum)</li>
        <li>Pure rental investors (rental yield is moderate)</li>
        <li>Buyers needing immediate move-in (TOP is 2030–2031)</li>
        <li>Buyers who specifically want freehold</li>
      </ul>

      <h2>Common Concerns Families Bring Up (And Honest Answers)</h2>

      <h3>"Won't construction noise from Turf City be terrible?"</h3>

      <p>It will be present, especially in the first few years post-TOP. Selecting stacks facing inward or away from active construction zones helps a lot. By 2032–2035, much of the noise will have moved on as the broader masterplan completes.</p>

      <h3>"What about traffic on Dunearn Road?"</h3>

      <p>Dunearn Road is a major arterial. Higher floors and certain orientations face the traffic side; quieter stacks face away. Stack selection at booking really matters — don't rush this.</p>

      <h3>"Is the school 1km eligibility guaranteed?"</h3>

      <p>No. OneMap gives you a preliminary view, but final eligibility depends on MOE's measurement during your child's registration year. <strong>Always verify closer to actual registration.</strong></p>

      <h3>"How does it compare to staying in a freehold landed home in Bukit Timah?"</h3>

      <p>A landed home gives you space and tenure. A condo gives you facilities, security, lower maintenance, and easier resale. Many families <em>upgrade</em> from landed to condo as kids grow up because the day-to-day is simpler.</p>

      <h3>"Will the masterplan actually deliver?"</h3>

      <p>URA-backed masterplans in Singapore have historically delivered, though sometimes with timeline slippage. Punggol, Bidadari, and Bishan all materialized. Turf City is a 20-year story — you should expect progressive delivery, not overnight transformation.</p>

      <h2>Conclusion: Is Dunearn House the Right Family Home?</h2>

      <p>If you've been searching for a family condo that delivers on <strong>schools, MRT, greenery, and long-term liveability</strong> all at once — Dunearn House is one of the most genuinely family-suitable new launches of 2026.</p>

      <p>It's not perfect. It's a 99-year leasehold in a freehold-heavy area, you'll wait until 2030–2031 to move in, and there'll be construction around you for several years. Those are real trade-offs.</p>

      <p>But the upside is rare: a low-density CCR family condo, in the heart of Singapore's top education belt, with an MRT station 7 minutes away (and a second one coming), wrapped in nature, with a strong developer team.</p>

      <p>For families thinking 10–15 years ahead — kids growing through PSLE, O-Levels, JC, and beyond — this kind of location is what you're really paying for.</p>

      <p><strong>My suggested next step</strong>: Visit the showflat once VVIP previews open (around July 2026). Walk the actual neighbourhood — Greenwood Avenue, the school routes, the future Rail Corridor link. Pay attention to which stacks face away from Dunearn Road for noise control. The right stack matters as much as the right project.</p>

      <h2>Dunearn House Family Living FAQ</h2>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          1. Dunearn House is near which primary schools?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Dunearn House is located within 1–2km of several top primary schools including <strong>Methodist Girls' School (Primary)</strong>, <strong>Nanyang Primary School</strong>, <strong>Pei Hwa Presbyterian Primary</strong>, and <strong>Raffles Girls' Primary</strong>. Always verify final 1km eligibility via OneMap closer to your child's registration year.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          2. Is Dunearn House good for families with children?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes. The development is family-oriented with a heavy 2BR to 4BR+Study unit mix (no 1-bedroom units), low density (~380 units on 145,000+ sqft), 35%+ greenery, and direct access to Singapore's top school belt and nature reserves.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          3. What is the walking distance to Sixth Avenue MRT from Dunearn House?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Approximately <strong>4–10 minutes</strong>, with most blocks within a 7-minute walk. Sixth Avenue MRT is on the Downtown Line, providing direct access to Botanic Gardens, Newton, Bugis, and the CBD without transfers.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          4. What is the Dunearn House Turf City Green Corridor masterplan?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The masterplan includes the <strong>Bukit Timah-Rochor Green Corridor (BTGRC)</strong> — an elevated linear park along the Bukit Timah Canal that connects to Singapore's island-wide green network. It will provide safe walking, jogging, and cycling routes directly from the development.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          5. What is the best condo near Bukit Timah nature and the Rail Corridor?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Among 2026 new launches, Dunearn House offers exceptional access — close to <strong>Bukit Timah Nature Reserve</strong>, <strong>Singapore Botanic Gardens</strong>, <strong>the Rail Corridor</strong>, and the <strong>future Bukit Timah-Rochor Green Corridor</strong>. Few new launches in District 11 match this level of nature integration.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          6. What Dunearn House unit types are best for growing families?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The <strong>3-Bedroom</strong> layouts work for typical young families, while <strong>4-Bedroom</strong> and <strong>4-Bedroom + Study</strong> units suit larger or multi-generational households. Sizes range from ~700 sqft (2BR) to ~1,500 sqft (4BR+Study).</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          7. How does Dunearn House compare to other Bukit Timah condos for daily convenience?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Dunearn House outperforms most older Bukit Timah condos on <strong>MRT proximity, build quality, modern family layouts, low density, and future-proofing</strong>. Older resale options may win on freehold tenure and immediate move-in, but typically lack the masterplan upside.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          8. Is Dunearn House a family-friendly new launch in Singapore 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes — it's arguably <strong>the most family-suitable CCR new launch of 2026</strong> in the District 11 education belt. The combination of low density, family-focused unit mix, MRT proximity, top-school cluster access, and integrated greenery is genuinely rare in the new launch market.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>
      <p>2. <a href="/insights/dunearn-house-review-2026" onclick="showArticle('post-dunearn-house-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House Review 2026: Is It Worth Buying? (Honest Pros &amp; Cons)</strong></a></p>
      <p>3. <a href="/insights/dunearn-vs-fourth-avenue" onclick="showArticle('post-dunearn-vs-fourth-avenue-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House vs Fourth Avenue Residences: Which Is the Better Investment? (2026)</strong></a></p>
      <p>4. <a href="/insights/turf-city-masterplan-2026" onclick="showArticle('post-turf-city-masterplan-2026'); return false;" class="underline hover:text-violet-700"><strong>Turf City Masterplan 2026: What Dunearn House Buyers Need to Know</strong></a></p>
      <p>5. <a href="/insights/new-launch-vs-resale/" onclick="showArticle('post-new-launch-vs-resale'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo in 2026: Which Should You Buy?</strong></a></p>

      <p><em>Disclaimer: This article is for general informational purposes and does not constitute financial or property investment advice. Masterplan timelines and details are based on URA publications as of June 2026 and are subject to change. Always verify the latest plans directly with URA and consult a licensed advisor before making any purchase decision.</em></p>
    `
  },

  /* ======================================================
     NEW ARTICLE — DUNEARN HOUSE INVESTMENT ANALYSIS 2026
  ====================================================== */
  'post-dunearn-house-investment-analysis-2026': {
    title: 'Dunearn House Investment Analysis 2026: First-Mover ROI in Turf City',
    date: '7 Jun 2026',
    readTime: '15 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: "",
    linkedinUrl: 'https://www.linkedin.com/pulse/dunearn-house-investment-analysis-2026-turf-city-first-mover-roi-jack-leow',
    body: `
      <p><strong>If you're sizing up <strong>Dunearn House new launch</strong> as an investment, you're really asking one bigger question: <em>what happens to property prices when a brand-new URA masterplanned precinct opens up — and is it worth being the first one in?</em></strong></p>

      <p>Short answer: <strong>Dunearn House is one of the rarest first-mover opportunities in Singapore's CCR (Core Central Region) in decades.</strong> It's the first private residential GLS site to launch within the Bukit Timah Turf City masterplan — essentially the first major opening of Bukit Timah to modern condo housing in nearly 40 years. Backed by a heavyweight Frasers Property × Sekisui House × CSC Land joint venture, sitting on a $1,410 psf ppr land bid, and positioned ahead of an adjacent site that already sold 15% higher, the <strong>investment case is unusually clear</strong> — provided you can ride out a 5–10 year time horizon.</p>

      <p>But "clear" doesn't mean "risk-free." Below, we'll break down the macro story, the numbers, the catalysts, and the honest risks — so you can decide if this fits <em>your</em> portfolio strategy.</p>

      <h2>Dunearn House at a Glance (Investment Snapshot)</h2>

      <table>
        <thead><tr><th>Investment Factor</th><th>Detail</th></tr></thead>
        <tbody>
          <tr><td><strong>Project</strong></td><td>Dunearn House (达恩·豪庭)</td></tr>
          <tr><td><strong>Location</strong></td><td>Dunearn Road, District 11 (Swiss Club Subzone, Bukit Timah)</td></tr>
          <tr><td><strong>Tenure</strong></td><td>99-year leasehold (GLS)</td></tr>
          <tr><td><strong>Developer JV</strong></td><td>Frasers Property × Sekisui House × CSC Land Group</td></tr>
          <tr><td><strong>Total Units</strong></td><td>~380 across 5 blocks (10 &amp; 19 storeys)</td></tr>
          <tr><td><strong>Land Cost</strong></td><td>S$491.45M at S$1,410 psf ppr (July 2025)</td></tr>
          <tr><td><strong>Adjacent Site (next door)</strong></td><td>S$533M at S$1,625 psf ppr — 15.2% higher</td></tr>
          <tr><td><strong>Expected Launch PSF</strong></td><td>$2,800–$3,100 psf</td></tr>
          <tr><td><strong>Expected TOP</strong></td><td>2030–2031</td></tr>
          <tr><td><strong>First-Mover Status</strong></td><td>First private GLS launch in Bukit Timah Turf City masterplan</td></tr>
          <tr><td><strong>Future MRT Catalyst</strong></td><td>Turf City MRT (Cross Island Line Phase 2, ~2032)</td></tr>
        </tbody>
      </table>

      <h2>Why Dunearn House Is a Genuine First-Mover Story</h2>

      <p>In Singapore property, "first-mover advantage" gets thrown around loosely. Most projects don't actually qualify. Dunearn House does — and here's why that matters.</p>

      <h3>The First Private Condo in Bukit Timah Turf City in ~40 Years</h3>

      <p>Bukit Timah hasn't seen meaningful new private residential supply at this scale for a generation. Most of the area is locked up in Good Class Bungalows, low-rise freehold condos from the 80s and 90s, and landed estates. New GLS sites simply don't come up here.</p>

      <p>The Turf City masterplan changes that. URA is reshaping the former Singapore Turf Club site into a new residential precinct — roughly 1,300 hectares of land being progressively unlocked. Dunearn House is the <strong>first private GLS site to be launched</strong> within that precinct.</p>

      <p>That's not marketing fluff — it's a structural scarcity story. When a long-dormant area opens up, the very first projects tend to set the price floor for everything that follows.</p>

      <h3>Historical Pattern: First-Mover GLS Projects Outperform</h3>

      <p>Look at past Singapore precincts that started from scratch:</p>

      <ul>
        <li><strong>Punggol</strong> — early buyers at Treelodge@Punggol and similar saw outsized capital gains as the precinct matured.</li>
        <li><strong>Bishan</strong> — early condos near Bishan MRT compounded steadily through three decades.</li>
        <li><strong>Bidadari</strong> — first-wave HDB and private launches (like The Woodleigh Residences) commanded premiums after later supply caught up to market psf.</li>
        <li><strong>Tengah</strong> — still unfolding, but early BTOs and private supply are already pricing in the precinct narrative.</li>
      </ul>

      <p>The pattern: <strong>first launches typically benefit from progressive infrastructure delivery + a limited early supply window</strong>. Dunearn House sits squarely in that pattern — except it's CCR, not OCR. That's the kicker.</p>

      <h2>The Land Bid Tells You Everything: S$1,410 psf ppr Analysis</h2>

      <p>The numbers behind the land sale tell a story most marketing brochures gloss over.</p>

      <h3>What Happened</h3>

      <p>In <strong>July 2025</strong>, the URA awarded the Dunearn Road GLS site to a consortium led by <strong>Frasers Property, Sekisui House, and CSC Land Group</strong> for <strong>S$491.45 million</strong>, working out to <strong>S$1,410 psf ppr</strong> (per square foot per plot ratio).</p>

      <p>That land cost effectively sets the floor for what Dunearn House can launch at. The simple math:</p>

      <ul>
        <li>Land cost: ~$1,410 psf ppr</li>
        <li>Construction cost (Singapore CCR, 2026): typically $400–$500 psf</li>
        <li>Marketing, finance, profit margin: ~$800–$1,200 psf</li>
        <li><strong>Implied launch PSF: ~$2,800–$3,100</strong></li>
      </ul>

      <p>That's why analysts have converged on the $2,800–$3,100 psf launch band. It's not a guess — it's a margin calculation.</p>

      <h3>Why the Adjacent Site Matters More</h3>

      <p>Here's where it gets interesting. In <strong>May 2026</strong>, the URA awarded the <strong>second Dunearn Road GLS site</strong> (right next door) to <strong>Wing Tai and Metro</strong> for <strong>S$533 million</strong> — a land bid of <strong>S$1,625 psf ppr</strong>.</p>

      <p>That's <strong>15.2% higher</strong> than Dunearn House's land cost. Analysts (PropNex, SRI, Newmark) are now projecting the second project to launch at <strong>$3,000–$3,300+ psf</strong>.</p>

      <p>What does this mean for Dunearn House buyers?</p>

      <blockquote>
        <strong>Translation:</strong> The next launch in the same precinct, right next door, will likely cost 10–15% more — before Dunearn House even hits TOP.
      </blockquote>

      <p>If you buy Dunearn House at $2,800–$3,100 psf, you're essentially buying <em>below</em> the next adjacent project's launch price. That doesn't guarantee appreciation, but it does give you a tangible margin to work with.</p>

      <h2>The Developer JV: Why Frasers + Sekisui + CSC Matters for ROI</h2>

      <p>Most buyers think of developers as a "quality" factor. For investors, it's also a <strong>resale premium</strong> factor.</p>

      <h3>Frasers Property</h3>
      <p>Singapore-listed, with a diversified Asia-Pacific portfolio. Known projects: Riviere, Sky Eden @ Bedok, One Bernam. Their CCR projects have historically held resale value better than mid-tier peers.</p>

      <h3>Sekisui House</h3>
      <p>Japan's largest homebuilder — over 2.6 million homes globally. Sekisui is the name to know if you care about build quality, sound insulation, and finishing precision. In secondary markets, Sekisui-built projects tend to attract a small but consistent premium.</p>

      <h3>CSC Land Group</h3>
      <p>Part of China State Construction Engineering Corporation, one of the largest builders in the world. Brings construction scale and cost discipline.</p>

      <p>The combination is unusual: <strong>Singapore brand familiarity + Japanese build quality + Chinese construction muscle</strong>. For a project that won't TOP until 2030–2031, this kind of developer stability is exactly what you want.</p>

      <h2>Infrastructure Catalysts: What's Coming That Pushes Value</h2>

      <p>Property investment in Singapore is largely an <strong>infrastructure-driven game</strong>. Here's what's coming around Dunearn House:</p>

      <h3>1. Sixth Avenue MRT (Already Operational)</h3>
      <p>You're already within a 4–10 minute walk of an existing Downtown Line station. Direct access to Newton, Bugis, Downtown, and Bayfront — no transfers.</p>

      <h3>2. Future Turf City MRT (Cross Island Line Phase 2, ~2032)</h3>
      <p>The big one. CRL Phase 2 is already under construction. When the Turf City station opens around 2032, Dunearn House becomes a <strong>dual-line address</strong> — Downtown Line at Sixth Avenue, Cross Island Line at Turf City.</p>

      <p>Dual-line connectivity is historically one of the strongest predictors of long-term capital appreciation in Singapore.</p>

      <h3>3. Bukit Timah-Rochor Green Corridor (BTGRC)</h3>
      <p>An elevated linear park along the Bukit Timah Canal — part of Singapore's island-wide green network. This isn't just aesthetic; it materially affects liveability scores and (over time) resale narrative.</p>

      <h3>4. Turf City Masterplan Heritage Conservation</h3>
      <p>Selected Grandstand buildings from the old Turf Club era will be conserved and repurposed into lifestyle, civic, and recreational hubs. This gives the precinct a distinctive identity — closer in feel to Tiong Bahru or Joo Chiat than to a generic new estate.</p>

      <h3>5. Adjacent Residential Supply (Next 5–10 Years)</h3>
      <p>More GLS sites in the Turf City precinct will be released progressively. This is both a tailwind (more amenities, more critical mass) and a watch-out (more supply when you eventually sell).</p>

      <h2>Dunearn House Investment Potential: ROI Outlook</h2>

      <p>Let's get specific. Here's a reasonable framework for projecting returns — based on historical CCR appreciation patterns and the Turf City precinct narrative.</p>

      <h3>Base Case (Conservative)</h3>
      <ul>
        <li><strong>CCR appreciation</strong>: ~2–3% per annum historically</li>
        <li><strong>Holding period</strong>: 5 years from launch (TOP 2030 → sell 2031)</li>
        <li><strong>Expected exit PSF</strong>: ~$3,200–$3,500</li>
        <li><strong>Gross capital gain</strong>: ~15–20% over 5 years (before stamp duties, fees)</li>
      </ul>

      <h3>Mid Case (Precinct Catalysts Land)</h3>
      <ul>
        <li><strong>Assumption</strong>: CRL Phase 2 opens on schedule, Turf City masterplan progresses, adjacent project launches at $3,200+ psf</li>
        <li><strong>Expected exit PSF (2031–2033)</strong>: ~$3,500–$3,800</li>
        <li><strong>Gross capital gain</strong>: ~25–30%</li>
      </ul>

      <h3>Bull Case (Full Masterplan Materializes)</h3>
      <ul>
        <li><strong>Assumption</strong>: Turf City becomes a marquee precinct (think Tiong Bahru-level identity + CCR pricing), MRT opens, retail and lifestyle clusters thrive</li>
        <li><strong>Expected exit PSF (2033–2035)</strong>: $4,000+</li>
        <li><strong>Gross capital gain</strong>: 35%+ over 7–10 years</li>
      </ul>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">⚠️ Important caveat</p>
        <p class="text-sm text-violet-800">All projections are illustrative. Real outcomes depend on macro conditions, interest rates, cooling measures, and execution risk. Past performance is not indicative of future returns.</p>
      </div>

      <h3>Rental Yield Reality Check</h3>

      <p>For investors who care about yield (not just capital gains):</p>

      <ul>
        <li><strong>Indicative monthly rent (3BR, CCR new launch)</strong>: ~$6,000–$8,000</li>
        <li><strong>Implied gross yield at ~$2.8M quantum</strong>: ~2.6–3.4%</li>
      </ul>

      <p>That's <strong>average for CCR</strong> — not spectacular. If pure cashflow yield is your goal, OCR projects will outperform. Dunearn House is a capital appreciation play first, yield play second.</p>

      <h2>Dunearn House vs Resale Bukit Timah Property: Which Appreciates Better?</h2>

      <p>A fair question, since you can buy resale Bukit Timah condos right now at $1,800–$2,400 psf in many cases. Why pay $2,800–$3,100 psf for a new launch?</p>

      <table>
        <thead><tr><th>Factor</th><th>Dunearn House (New Launch)</th><th>Resale Bukit Timah (Average)</th></tr></thead>
        <tbody>
          <tr><td><strong>Entry PSF</strong></td><td>$2,800–$3,100</td><td>$1,800–$2,400</td></tr>
          <tr><td><strong>Lease balance</strong></td><td>Fresh 99 years</td><td>Often 60–80 years remaining</td></tr>
          <tr><td><strong>Build quality</strong></td><td>New, Sekisui-grade</td><td>Older, 20–30 year-old construction</td></tr>
          <tr><td><strong>Maintenance/AEI cost</strong></td><td>Low (first 5–10 years)</td><td>Higher (older buildings need works)</td></tr>
          <tr><td><strong>Precinct narrative</strong></td><td>Strong (Turf City masterplan)</td><td>Mostly static</td></tr>
          <tr><td><strong>Liquidity</strong></td><td>Strong demand at TOP</td><td>Depends on individual project</td></tr>
          <tr><td><strong>Capital appreciation potential</strong></td><td>Higher (precinct upside)</td><td>Lower (mature, capped)</td></tr>
          <tr><td><strong>Rental appeal</strong></td><td>Higher (new amenities, modern layouts)</td><td>Variable</td></tr>
        </tbody>
      </table>

      <p><strong>Verdict</strong>: For pure investment time horizons of 7+ years, <strong>new launches in transforming precincts generally outperform mature resale stock</strong> in the same district — provided the entry psf isn't egregious. Dunearn House's land cost suggests it isn't.</p>

      <p>For shorter holds (2–4 years), resale Bukit Timah can be more efficient capital deployment. But you don't get the masterplan upside.</p>

      <h2>Dunearn House vs Other New Launches 2026 (Investor View)</h2>

      <p>Where does it sit in the 2026 new launch landscape from a pure ROI lens?</p>

      <table>
        <thead><tr><th>Project</th><th>District</th><th>Tenure</th><th>PSF</th><th>Investment Angle</th></tr></thead>
        <tbody>
          <tr><td><strong>Dunearn House</strong></td><td>D11</td><td>99-yr</td><td>$2,800–$3,100</td><td>First-mover, CCR masterplan</td></tr>
          <tr><td>Watten House</td><td>D11</td><td>Freehold</td><td>$3,200–$3,600</td><td>Freehold prestige, mature area</td></tr>
          <tr><td>Next Dunearn Rd site (Wing Tai/Metro)</td><td>D11</td><td>99-yr</td><td>$3,200+ (est.)</td><td>Premium tier, later launch</td></tr>
          <tr><td>Lentor Gardens</td><td>D26</td><td>99-yr</td><td>$2,200–$2,400</td><td>OCR upgrader, yield-friendly</td></tr>
          <tr><td>Thomson Reserve Residences</td><td>D20</td><td>99-yr</td><td>TBC</td><td>Suburban catalyst play</td></tr>
        </tbody>
      </table>

      <p><strong>For investors specifically targeting CCR appreciation</strong>, Dunearn House is currently the most reasonably-priced entry point in the 2026 pipeline. The next adjacent project will almost certainly be priced higher. Watten House is freehold but has already launched and entered resale dynamics.</p>

      <h2>The Honest Risks: What Could Go Wrong</h2>

      <p>A real investment analysis isn't complete without the downside scenarios. Here's what I'd flag:</p>

      <h3>1. 99-Year Leasehold in a Freehold Belt</h3>
      <p>Bukit Timah is famously a "freehold area." A 99-year lease, no matter how prime, has a built-in decay curve. Over 20+ year holds, lease decay will start to bite. For a buy-and-hold-forever strategy, freehold remains structurally better.</p>

      <h3>2. Adjacent Supply Could Cap Resale</h3>
      <p>The next Dunearn Road project is literally next door. If both are selling at TOP simultaneously (2030–2032), you'll be competing with newer stock for buyers and tenants. Stack selection and unit type become more important than usual.</p>

      <h3>3. Cooling Measures Risk</h3>
      <p>ABSD has been raised three times in recent years. Future tightening (especially on foreign buyers or multi-property owners) could compress demand exactly when you're trying to exit. This is a Singapore-wide risk, not Dunearn House-specific — but worth noting.</p>

      <h3>4. CRL Phase 2 Timeline Risk</h3>
      <p>The Cross Island Line is a major catalyst. But MRT lines in Singapore frequently see delays (the original DTL3 had a few). If Turf City MRT slips from 2032 to 2034 or later, the catalyst value pushes out accordingly.</p>

      <h3>5. Masterplan Execution Risk</h3>
      <p>URA masterplans rarely fail — but they sometimes underdeliver on character. If Turf City ends up looking like a generic estate rather than a distinctive precinct, the "lifestyle premium" portion of appreciation may not materialize.</p>

      <h3>6. Interest Rate Environment</h3>
      <p>Singapore mortgage rates rose sharply from 2022–2024. While 2026 rates are more moderate, a higher-for-longer scenario compresses buying power and pressures resale exit values.</p>

      <h3>7. Long Capital Lock-In</h3>
      <p>TOP is 2030–2031. That's 4–5 years before you can rent or move in, and likely 5–7 years before any meaningful resale opportunity. If your liquidity needs are shorter, this is the wrong vehicle.</p>

      <h2>Should You Buy Dunearn House Before Full Precinct Development?</h2>

      <p>This is the strategic question. Let me lay out the trade-off cleanly.</p>

      <h3>Buy Early (Now/Launch)</h3>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Lowest entry psf relative to adjacent project (already proven 15% higher land cost)</li>
        <li>First-mover positioning if precinct delivers</li>
        <li>VVIP early-bird discounts often 3–8%</li>
        <li>Best stack/orientation selection</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>4–5 years until TOP (capital locked)</li>
        <li>Construction noise during early occupancy</li>
        <li>Masterplan execution risk</li>
      </ul>

      <h3>Wait for Resale (Post-TOP, 2031+)</h3>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Can physically inspect the unit and surrounding amenities</li>
        <li>Clearer precinct narrative by then</li>
        <li>Less timeline risk</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Likely pay a premium on subsale/resale</li>
        <li>Best units/stacks already sold</li>
        <li>ABSD timing may be worse</li>
      </ul>

      <p><strong>My honest take</strong>: If you're a long-horizon investor with the cash to lock in, <strong>launch entry usually wins on net IRR</strong> for first-mover precinct projects. The 4–5 year wait is the price you pay for entering before the market fully prices in the masterplan.</p>

      <h2>Best New Launch Condos Singapore Investment 2026 (Bukit Timah Focus)</h2>

      <p>A quick reality check on the Bukit Timah-specific new launch pipeline:</p>

      <ul>
        <li><strong>Dunearn House</strong> — first GLS in Turf City, the entry-point launch.</li>
        <li><strong>Next Dunearn Road site</strong> (Wing Tai/Metro) — expected 2H 2027, priced higher.</li>
        <li><strong>Future Turf City GLS releases</strong> — to be staggered over the next 5–10 years.</li>
        <li><strong>Watten House</strong> (already launched) — freehold alternative if you want to skip the precinct play.</li>
      </ul>

      <p>If your investment thesis is "Bukit Timah CCR + precinct transformation," <strong>Dunearn House is functionally the only practical first-mover entry in this cycle.</strong> Everything else is either too late (resale Bukit Timah) or too early (future GLS sites not yet launched).</p>

      <h2>Common Investor Mistakes to Avoid</h2>

      <p>After watching many investors approach precinct-transformation plays, here are the slip-ups:</p>

      <ol>
        <li><strong>Buying the wrong unit type for the strategy.</strong> Investors should usually favour smaller, more rentable layouts — but Dunearn House skews family-large. A 4BR is harder to flip than a 2BR. Pick deliberately.</li>
        <li><strong>Underestimating ABSD.</strong> A 20% ABSD on a $3M unit = $600,000. Re-run your IRR math with this included.</li>
        <li><strong>Ignoring stack and orientation.</strong> Within the same project, $-orientation stacks can outperform by 5–10% on resale. Don't just buy "any unit at launch price."</li>
        <li><strong>Treating launch PSF as guaranteed appreciation.</strong> Dunearn House is well-positioned, but no Singapore project is risk-free. Stress-test your numbers against a flat-market scenario.</li>
        <li><strong>Forgetting transaction costs.</strong> BSD, legal, agent fees, and SSD if you sell within 3 years can eat 5–8% of gross gains. Net IRR is what matters.</li>
      </ol>

      <h2>Conclusion: Is Dunearn House a Good Investment Singapore 2026?</h2>

      <p>If your investment horizon is 7+ years, you can comfortably afford the quantum, and you believe in the long-term value of CCR + masterplan transformation — <strong>yes, Dunearn House is one of the more strategically compelling launches of this cycle.</strong></p>

      <p>The combination is unusual:</p>

      <ul>
        <li>A genuine first-mover position in a URA-backed precinct</li>
        <li>A heavyweight developer JV</li>
        <li>Entry pricing already 15% below the adjacent project's land cost</li>
        <li>Dual MRT line coverage by 2032</li>
        <li>Scarcity of CCR new launches in general</li>
      </ul>

      <p>That doesn't make it a guaranteed winner — no Singapore property is. But the <strong>margin of safety</strong> here is unusually wide compared to most 2026 launches.</p>

      <p>If you're chasing rental yield, freehold pedigree, or a quick 2-year flip, Dunearn House is the wrong vehicle.</p>

      <p><strong>Suggested next step</strong>: Pull the indicative floor plans and pricing as soon as they release, model your own IRR at base/mid/bull cases, and book a VVIP slot if the numbers work. First-wave buyers historically capture the most upside — both on price and stack selection.</p>

      <h2>Dunearn House Investment FAQ</h2>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          1. Is Dunearn House a good investment in Singapore 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">For long-horizon CCR investors, yes. It offers genuine first-mover positioning in the Turf City masterplan, a strong developer JV, and a land cost 15% below the adjacent project. Best suited for buyers with a 7+ year hold and capacity to absorb a $2.8M+ quantum.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          2. What is the Dunearn House indicative price per square foot and ROI?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The expected launch is <strong>$2,800–$3,100 psf</strong>. Conservative ROI projections suggest 15–20% gross capital gain over 5 years; mid-case scenarios point to 25–30% if Turf City catalysts land on schedule.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          3. What does the Dunearn House land bid of S$1,410 psf ppr tell us?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">It implies a launch psf floor of around $2,800–$3,100, factoring in construction, marketing, and developer margin. The adjacent site sold at S$1,625 psf ppr (15% higher), meaning Dunearn House enters at a structurally lower cost than its successor.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          4. Should I buy Dunearn House before full precinct development?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">For most long-term investors, yes. Launch entry typically delivers stronger net IRR than waiting for post-TOP resale, because adjacent and future Turf City projects will likely be priced higher. Risk: 4–5 years of capital lock-in until TOP.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          5. What is the first private condo in Bukit Timah Turf City in 40 years?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Dunearn House. It's the first private residential GLS site launched within the Bukit Timah Turf City masterplan — making it the first major modern condo development in this part of Bukit Timah in nearly four decades.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          6. How does Dunearn House compare to resale Bukit Timah property for appreciation?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">New launches in transforming precincts (like Dunearn House) historically outperform mature resale stock over 7+ year horizons, due to fresh leases, build quality, and precinct upside. Resale can be more efficient for shorter holds.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          7. What are the biggest investment risks for Dunearn House?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The main risks: 99-year leasehold in a freehold-dominant area, adjacent supply at TOP, future cooling measures, CRL Phase 2 timeline slippage, and the long capital lock-in until 2030–2031.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          8. Why is the Frasers × Sekisui × CSC joint venture significant?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">It combines Singapore brand familiarity (Frasers), Japanese build quality (Sekisui, 2.6M homes globally), and large-scale construction expertise (CSC). For projects topping out in 2030–2031, this kind of developer stability supports resale premiums.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/dunearn-house-2026" onclick="showArticle('post-dunearn-house-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah</strong></a></p>
      <p>2. <a href="/insights/dunearn-house-review-2026" onclick="showArticle('post-dunearn-house-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House Review 2026: Is It Worth Buying? (Honest Pros &amp; Cons)</strong></a></p>
      <p>3. <a href="/insights/turf-city-masterplan-2026" onclick="showArticle('post-turf-city-masterplan-2026'); return false;" class="underline hover:text-violet-700"><strong>Turf City Masterplan 2026: What Dunearn House Buyers Need to Know</strong></a></p>
      <p>4. <a href="/insights/dunearn-house-buyers-guide-2026" onclick="showArticle('post-dunearn-house-buyers-guide-2026'); return false;" class="underline hover:text-violet-700"><strong>Dunearn House Buyer's Guide 2026: Price, Eligibility &amp; Compare</strong></a></p>
      <p>5. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer's Guide</strong></a></p>

      <p><em>Disclaimer: This article is for general informational purposes and does not constitute financial, tax, or investment advice. All projections, land costs, PSF estimates, and ROI scenarios are illustrative and based on publicly available data as of June 2026. Property values can go down as well as up. Always conduct your own due diligence and consult a licensed financial advisor, solicitor, and property professional before making any decision.</em></p>
    `
  },

  /* ======================================================
     NEW ARTICLE — HDB VS EC VS PRIVATE 2026
  ====================================================== */
  'post-hdb-vs-ec-vs-private-property-2026': {
    title: 'HDB vs EC vs Private Property: Which Should You Buy? (2026)',
    date: '10 Jun 2026',
    readTime: '11 min read',
    category: 'HDB UPGRADERS',
    chipClass: 'chip-hdb',
    img: null,
    linkedinUrl: 'https://www.linkedin.com/pulse/hdb-vs-ec-vs-private-property-2026-which-buy-jack-leow',
    body: `
      <p><strong>Short answer: it depends on your household income, how long you plan to stay, and what your next move looks like.</strong> If your household earns under $14,000 a month and you want the most affordable entry point with the biggest grants, an HDB flat usually makes the most sense. If you earn between $14,000 and $16,000 — too much for a BTO, but a private condo feels like a stretch — an Executive Condominium (EC) is built for exactly your situation. And if you earn above $16,000, want full flexibility, or plan to invest, private property is likely your lane.</p>

      <p>That's the one-paragraph version. But the right choice isn't just about price. It's about waiting time, eligibility rules, resale potential, and whether you plan to upgrade later. Let's walk through it properly — the way I'd explain it to a friend over kopi.</p>

      <h2>The Quick Comparison: HDB vs EC vs Private Condo</h2>

      <p>Here's how the three property types stack up in 2026:</p>

      <table>
        <thead><tr><th>Factor</th><th>HDB (BTO/Resale)</th><th>Executive Condo (EC)</th><th>Private Condo</th></tr></thead>
        <tbody>
          <tr><td><strong>Income ceiling</strong></td><td>$14,000 (BTO families)*</td><td>$16,000 (new EC)</td><td>None</td></tr>
          <tr><td><strong>Who can buy</strong></td><td>Singaporeans/PRs, family nucleus rules</td><td>At least 1 SC + family nucleus</td><td>Anyone (foreigners pay 60% ABSD)</td></tr>
          <tr><td><strong>CPF housing grants</strong></td><td>Up to $120,000 EHG (BTO); up to $230,000 total (resale)</td><td>CPF Housing Grant up to $30,000 for eligible first-timers</td><td>None</td></tr>
          <tr><td><strong>MOP</strong></td><td>5 years (Standard); 10 years (Plus/Prime)</td><td>5 years (existing projects); 10 years (new sites from 8 May 2026)</td><td>None — but SSD applies within 4 years</td></tr>
          <tr><td><strong>Can foreigners buy?</strong></td><td>No</td><td>Only after privatisation</td><td>Yes</td></tr>
          <tr><td><strong>Loan type</strong></td><td>HDB loan (75% LTV) or bank loan</td><td>Bank loan only</td><td>Bank loan only</td></tr>
          <tr><td><strong>Facilities</strong></td><td>Basic (some have pavilions, gyms nearby)</td><td>Full condo facilities</td><td>Full condo facilities</td></tr>
          <tr><td><strong>Typical entry price (2026)</strong></td><td>~$550k–$800k (4-room resale, non-mature)</td><td>~$1.3M–$1.7M (3-bedroom new EC)</td><td>~$1.6M–$2.3M (3-bedroom OCR new launch)</td></tr>
        </tbody>
      </table>

      <p>*$21,000 for extended/multi-generation families. Resale HDB flats have no income ceiling, though grants do.</p>

      <p>Now let's go deeper into each option — because the table only tells half the story.</p>

      <h2>When HDB Makes the Most Sense</h2>

      <p><strong>An HDB flat is the right choice if affordability and grants matter more to you than condo facilities or investment flexibility.</strong></p>

      <p>Here's why HDB remains the strongest entry point for most first-time buyers:</p>

      <h3>The grants are genuinely substantial</h3>

      <p>The Enhanced CPF Housing Grant (EHG) now gives eligible first-timer families up to $120,000, and singles up to $60,000 — these amounts were raised after National Day Rally 2024. The catch: your average household income must be $9,000 or below to qualify for the EHG, and the full $120,000 only goes to the lowest income tiers.</p>

      <p>Buying resale? You can stack grants:</p>

      <ul>
        <li><strong>Family Grant</strong> — up to $80,000 for a 4-room or smaller resale flat ($50,000 for 5-room or larger)</li>
        <li><strong>EHG</strong> — up to $120,000, income-tiered</li>
        <li><strong>Proximity Housing Grant</strong> — $30,000 if you live with parents or children, $20,000 if within 4km</li>
      </ul>

      <p>That's a theoretical maximum of $230,000 in grants for a first-timer family buying resale. No EC or private condo comes close to this level of support.</p>

      <h3>Lower financing pressure</h3>

      <p>HDB loans let you borrow up to 75% of the price at the concessionary rate (pegged at 0.1% above the CPF Ordinary Account rate), with a smaller cash outlay than most private purchases. You can also pay your downpayment entirely with CPF if you have enough — something bank loans don't allow, since they require at least 5% in cash.</p>

      <h3>The trade-offs to be honest about</h3>

      <ul>
        <li><strong>BTO waiting time</strong> is typically 3–5 years. If you need a home now, resale is your only HDB route — and resale prices in mature estates have climbed significantly.</li>
        <li><strong>Plus and Prime flats</strong> (the newer classification for better-located BTOs) come with a 10-year MOP, subsidy clawback on resale, and rental restrictions. Great homes, but they lock you in longer.</li>
        <li><strong>No rental income during MOP</strong> — you can't rent out the whole flat for at least 5 years.</li>
        <li><strong>Capital growth is real but capped.</strong> HDB resale prices have risen steadily, but the buyer pool is restricted to Singaporeans and PRs, which naturally limits the ceiling compared to private property.</li>
      </ul>

      <p><strong>Best for:</strong> First-time buyers, young couples with combined income under $14,000, and anyone who wants maximum grants with minimum financial stress.</p>

      <h2>When an EC Makes the Most Sense</h2>

      <p><strong>An EC is the right choice if your household earns between roughly $14,000 and $16,000 a month — the classic "sandwiched" income bracket — and you're committed to staying put for the long haul.</strong></p>

      <p>ECs are private condos built by private developers, but sold with HDB-style rules at a discount of roughly 20–25% compared to similar private condos. The land is sold to developers at lower prices, and that saving is passed on to you.</p>

      <h3>The big rule change you must know (May 2026)</h3>

      <p>On 8 May 2026, the Government announced the biggest overhaul of the EC scheme since 2013. For new EC sites with land tenders closing on or after 8 May 2026:</p>

      <ul>
        <li><strong>MOP doubles from 5 to 10 years</strong> — you can't sell, rent out the whole unit, or buy another property during this time</li>
        <li><strong>Privatisation stretches from 10 to 15 years</strong> after TOP — that's when foreigners and companies can buy your unit</li>
        <li><strong>The Deferred Payment Scheme (DPS) is abolished</strong> — no more paying 20% upfront and deferring the rest until completion</li>
        <li><strong>First-timer quota rises from 70% to 90%</strong> of units, with the priority window extended to two years</li>
      </ul>

      <p>Important nuance: ECs already launched or on sites tendered before 8 May 2026 keep the old rules — 5-year MOP, 10-year privatisation. So if you're shopping for an EC right now, <em>ask which rule set applies to that specific project.</em> The tender closing date of the land determines everything.</p>

      <h3>Why ECs still work for the right buyer</h3>

      <ul>
        <li><strong>No ABSD upfront for upgraders.</strong> This is the EC's superpower. If you own an HDB flat, you can buy a new EC without paying Additional Buyer's Stamp Duty first — you just need to sell your HDB flat within six months of collecting your keys. Upgrading to a private condo instead means paying 20% ABSD upfront and claiming a refund later (if you qualify).</li>
        <li><strong>CPF Housing Grants apply.</strong> Eligible first-timer EC buyers can receive up to $30,000 in CPF grants, depending on income and citizenship.</li>
        <li><strong>The historical returns have been strong.</strong> ECs that crossed their MOP and privatised have consistently delivered some of the best capital appreciation in the market — average resale gains hit roughly $659,000 in 2025. (That outsized profit pattern is precisely why the Government tightened the rules.)</li>
      </ul>

      <h3>The trade-offs</h3>

      <ul>
        <li><strong>Eligibility is strict.</strong> Combined household income must not exceed $16,000 — exceed it by even a dollar at application and you're out. You also can't have owned private property in the last 30 months, and you must form a valid family nucleus.</li>
        <li><strong>Bank loan only, with MSR.</strong> No HDB loans for ECs. Your monthly repayment is capped at 30% of gross income (Mortgage Servicing Ratio), which limits how much you can borrow compared to a private condo purchase, where only the 55% TDSR applies.</li>
        <li><strong>The new 10-year MOP is a serious commitment.</strong> Add roughly 3 years of construction, and a buyer of a new-rules EC could wait about 13 years before selling on the open market. If your life plans might change in 6–7 years, think carefully.</li>
      </ul>

      <p><strong>Best for:</strong> HDB upgraders and sandwiched-class families earning $14,000–$16,000 who want condo living at a discount and are genuinely planning to stay long-term.</p>

      <h2>When Private Property Makes the Most Sense</h2>

      <p><strong>Private property is the right choice if you earn above the EC income ceiling, want full flexibility, or have investment goals that public housing rules don't allow.</strong></p>

      <h3>What you're really paying for: optionality</h3>

      <ul>
        <li><strong>No income ceiling, no family nucleus rules.</strong> Singles under 35, high earners, anyone.</li>
        <li><strong>No MOP.</strong> You can sell anytime — though the Seller's Stamp Duty applies if you sell within 4 years of purchase (16% in year one, tapering to 4% in year four, for properties bought on or after 4 July 2025).</li>
        <li><strong>Rent it out from day one.</strong> Full unit, immediately — something neither HDB nor new ECs allow.</li>
        <li><strong>The widest buyer pool at exit.</strong> When you sell, your buyers include foreigners, PRs, companies, and every Singaporean. That liquidity matters for resale potential.</li>
      </ul>

      <h3>The honest costs</h3>

      <ul>
        <li><strong>Higher entry price.</strong> A 3-bedroom new launch in the Outside Central Region now commonly starts around $1.6M–$2M+. You'll need at least 5% in cash and 25% total downpayment.</li>
        <li><strong>ABSD if it's not your first property.</strong> Singapore Citizens pay 0% on their first residential property, but 20% on the second and 30% on the third. PRs pay 5% on the first and 30% on the second. Upgraders selling their HDB and buying a condo as a couple may qualify for ABSD remission — check the current conditions and timeline with IRAS before committing, as the sequencing matters.</li>
        <li><strong>No grants. None.</strong></li>
        <li><strong>Maintenance fees</strong> typically run $300–$500+ a month for a mid-sized condo.</li>
      </ul>

      <p><strong>Best for:</strong> Households earning above $16,000, investors, buyers who already own property, and anyone who values flexibility over subsidies.</p>

      <h2>A Practical Decision Framework</h2>

      <p>Forget the property type for a second. Ask yourself these four questions:</p>

      <ol>
        <li><strong>What's our gross monthly household income?</strong>
          <ul>
            <li>Under $9,000 → HDB with maximum EHG support</li>
            <li>$9,000–$14,000 → HDB (BTO or resale), with partial grants</li>
            <li>$14,000–$16,000 → EC territory, or resale HDB</li>
            <li>Above $16,000 → Private property (or resale EC, which has no income ceiling)</li>
          </ul>
        </li>
        <li><strong>How soon do we need to move in?</strong>
          <ul>
            <li>Can wait 3–5 years → BTO or new launch EC/condo</li>
            <li>Need a home within months → Resale HDB, resale EC, or resale condo</li>
          </ul>
        </li>
        <li><strong>How long will we realistically stay?</strong>
          <ul>
            <li>10+ years comfortably → Any option works, including new-rules ECs</li>
            <li>Might move in 5–7 years → Resale HDB (5-year MOP) or private property; avoid Plus/Prime flats and new-rules ECs</li>
          </ul>
        </li>
        <li><strong>What's the next move after this one?</strong>
          <ul>
            <li>Planning to upgrade later → An HDB or EC first home preserves your "first-timer" advantages and avoids ABSD complications</li>
            <li>This is the forever home → Optimise for location and living quality, not exit value</li>
          </ul>
        </li>
      </ol>

      <h3>Common mistakes I see buyers make</h3>

      <ul>
        <li><strong>Stretching to a private condo when an EC would do.</strong> If you qualify for an EC, the 20–25% discount on comparable condo living is hard to beat — provided the longer commitment suits your life stage.</li>
        <li><strong>Ignoring the MSR when budgeting for an EC.</strong> Buyers calculate affordability using TDSR logic, then discover the 30% MSR cuts their loan quantum sharply.</li>
        <li><strong>Letting a pay rise kill EC eligibility.</strong> Income is assessed at application. If a promotion is coming and your household is near $16,000, timing matters.</li>
        <li><strong>Buying a Plus or Prime BTO without reading the resale conditions.</strong> The 10-year MOP and subsidy clawback are fine if you're staying — painful if you're not.</li>
        <li><strong>Treating "no ABSD on first property" as the whole story.</strong> Buyer's Stamp Duty (BSD) still applies to everyone, on every purchase, at progressive rates.</li>
      </ul>

      <h2>The Bottom Line</h2>

      <p>There's no universally "best" option — only the best fit for your income, timeline, and plans.</p>

      <ul>
        <li><strong>HDB</strong> wins on affordability and grants. It's the lowest-risk entry into home ownership in Singapore.</li>
        <li><strong>EC</strong> wins on value for the sandwiched class — condo living at a discount — but the May 2026 rule changes make it a longer, more deliberate commitment than before.</li>
        <li><strong>Private property</strong> wins on freedom: no ceilings, no MOP, full rental and resale flexibility — at a meaningfully higher price.</li>
      </ul>

      <p>If you take one thing away, let it be this: <strong>compare the rules and the timeline, not just the price tag.</strong> A cheaper home with a 10-year lock-in may cost you more in lost flexibility than a pricier one with none.</p>

      <p>Thinking through your own numbers — grants, loan limits, ABSD scenarios? It's worth mapping out your specific situation before you commit to any showflat visit. If you'd like a second pair of eyes on your upgrade math, <a href="https://wa.me/6580621538" target="_blank" rel="noopener noreferrer" class="underline hover:text-violet-700"><strong>contact Jack for a free situation check</strong></a>.</p>

      <h2>Frequently Asked Questions</h2>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is the income ceiling for buying an EC in Singapore?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The household income ceiling for a new Executive Condominium is $16,000 per month in gross combined income. This was unchanged in Budget 2026. The ceiling applies only to new ECs bought from developers — resale ECs that have passed privatisation have no income ceiling at all.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Can I buy an EC if I currently own an HDB flat?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes, if you've met your 5-year MOP and meet all other eligibility conditions (income ceiling, family nucleus, no private property in the past 30 months). You must sell your HDB flat within six months of collecting your EC keys. This is the classic HDB upgrader route, because you avoid paying ABSD upfront.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How much in grants can a first-time HDB buyer get in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">First-timer families can receive up to $120,000 through the Enhanced CPF Housing Grant for a BTO flat. For resale flats, total grants can reach up to $230,000 when you stack the EHG, the Family Grant (up to $80,000), and the Proximity Housing Grant (up to $30,000). Actual amounts depend on income, flat type, and proximity to family.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What changed for ECs in May 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">For new EC land sites with tenders closing on or after 8 May 2026: the MOP doubles from 5 to 10 years, full privatisation moves from 10 to 15 years after TOP, the Deferred Payment Scheme is removed, and the first-timer quota rises to 90% of units with a two-year priority window. ECs on sites tendered before that date keep the old rules.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Do I pay ABSD if I buy a private condo as my first property?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">No. Singapore Citizens pay 0% ABSD on their first residential property — only the standard Buyer's Stamp Duty applies. ABSD kicks in at 20% on a second property and 30% on a third. PRs pay 5% even on their first property, and foreigners pay 60% on any residential purchase.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is an EC a good investment compared to a private condo?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Historically, ECs have delivered strong returns — the discount at purchase plus full privatisation later created significant upside, with average resale gains reaching about $659,000 in 2025. However, the new 10-year MOP for future ECs means your capital is locked in much longer. For projects under the old rules, the value proposition remains compelling for eligible buyers. Past performance doesn't guarantee future results, so assess each project on its own merits.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Should I buy a resale HDB or a BTO if I want to upgrade later?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">If upgrading in 5–7 years is the plan, a Standard BTO or resale flat (both 5-year MOP) keeps your timeline flexible. Avoid Plus and Prime flats, which carry a 10-year MOP and subsidy clawback. Resale also lets you move in immediately and start your MOP clock sooner — though you'll typically pay more than BTO prices.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Can singles buy an EC or BTO in Singapore?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Singles aged 35 and above can buy BTO flats (now in all locations, subject to flat-type rules) and can receive up to $60,000 in EHG support. For new ECs, singles must apply under the Joint Singles Scheme with another eligible single, both aged 35 or above. Singles of any age can buy resale ECs that have privatised, or private property.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/hdb-phantom-fear" onclick="showArticle('post-hdb-phantom-fear'); return false;" class="underline hover:text-violet-700"><strong>HDB Upgraders: Are You Trapped by Your Own "Phantom Fear"? (2026 Edition)</strong></a></p>
      <p>2. <a href="/insights/new-launch-vs-resale" onclick="showArticle('post-new-launch-vs-resale'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo in 2026: Which Should You Buy?</strong></a></p>
      <p>3. <a href="/insights/cpf-private" onclick="showArticle('post-cpf-private'); return false;" class="underline hover:text-violet-700"><strong>How Much CPF Can You Use for a Private Property in Singapore? (2026 Guide)</strong></a></p>
      <p>4. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer's Guide</strong></a></p>
      <p>5. <a href="/insights/hdb-sell-signs" onclick="showArticle('post-hdb-sell-signs'); return false;" class="underline hover:text-violet-700"><strong>5 Signs Your HDB Flat Is Ready to Sell — And How to Time It Right in 2026</strong></a></p>

      <p><em>Disclaimer: This article is for general informational purposes and does not constitute financial, tax, or investment advice. All figures, rules, and comparisons are based on publicly available information as of June 2026 and are subject to change. Always verify with HDB, CPF, IRAS, and consult a licensed CEA-registered salesperson before making any property decision.</em></p>
    `
  },

  /* ======================================================
     NEW ARTICLE 25 — THOMSON RESERVE PRICE REVIEW 2026
  ====================================================== */
  'post-thomson-reserve-price-review-2026': {
    title: 'Thomson Reserve Price: Is It Really Too Expensive in 2026?',
    date: '19 Jun 2026',
    readTime: '24 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: 'insights/thomson-reserve-price-review-2026.jpg',
    linkedinUrl: null,
    body: `
      <p><strong>Let's start with the honest version.</strong> Yes, Thomson Reserve will likely launch in the S$2,500 to S$3,100 psf range. Yes, that feels heavy. And yes, if you have been watching the Upper Thomson corridor for years, the new pricing can give you that quiet, uneasy "am I being asked to pay tomorrow's price today?" feeling.</p>

      <p>That feeling is rational. Hold onto it for a moment. We will look at it from every angle in this post.</p>

      <p>But here is what often gets missed. <strong>"Expensive" and "overpriced" are not the same word.</strong> A project can be expensive and still be the right buy — if the entry point unlocks something the cheaper alternatives cannot. A project can also be cheap and still be the wrong buy — if your money sits still for ten years because nothing structural is changing around it.</p>

      <p>What follows is a fair-minded look at every worry a careful Singaporean buyer is right to raise about Thomson Reserve, and what the numbers actually say once you push past the headlines. By the end, you should know whether this launch is for you — or whether the next one is.</p>

      <p><em>Figures referenced come from publicly available URA, EdgeProp, 99.co, IRAS, and developer-side data as of mid-2026. Launch pricing is indicative until the official release.</em></p>

      <h2>What Thomson Reserve Actually Is (Before We Debate the Price)</h2>
      <p>Quick orientation, in case you are new to the project:</p>
      <ul>
        <li><strong>Site:</strong> Former Thomson View Condominium, Bright Hill Drive (District 20)</li>
        <li><strong>En bloc value:</strong> S$810 million — the largest residential en bloc approved since Chuan Park in 2023</li>
        <li><strong>Land cost:</strong> ~$1,178 psf per plot ratio (including land betterment and lease top-up)</li>
        <li><strong>Site area:</strong> ~504,314 sq ft (about 5 hectares)</li>
        <li><strong>Units:</strong> ~1,240</li>
        <li><strong>Developers:</strong> UOL Group, Singapore Land, CapitaLand Development</li>
        <li><strong>Tenure:</strong> Fresh 99-year leasehold</li>
        <li><strong>TOP target:</strong> Around 2030</li>
        <li><strong>Preview:</strong> Q3/Q4 2026</li>
        <li><strong>MRT access:</strong> Upper Thomson (TEL), Bright Hill (TEL — future Cross Island Line interchange), Marymount (Circle Line)</li>
        <li><strong>Schools:</strong> Within 1km of Ai Tong Primary School; near Catholic High and CHIJ St. Nicholas</li>
        <li><strong>Beside:</strong> MacRitchie Reservoir</li>
      </ul>

      <p>Three SGX-listed developers, three MRT lines, an SAP primary school inside the 1km zone, a fresh 99-year lease, 5 hectares of land, 1,240 units. On the <em>fundamentals checklist</em>, this is one of the strongest launch profiles Singapore has seen this decade.</p>

      <p>The question we are really asking is not whether Thomson Reserve is a <strong>good project</strong>. It clearly is. The question is whether it is a <strong>good buy for you, at this price</strong>. That is a different conversation. Let us have it properly.</p>

      <h2>The Five Worries Every Smart Buyer Has — And What the Data Actually Says</h2>
      <p>If you have been reading other reviews of Thomson Reserve, you will have come across the same five concerns. They are reasonable. They deserve a real answer, not a glossy deflection. Here they are, one by one.</p>

      <h3>Worry #1: "The launch price is just too high"</h3>
      <p><strong>The concern in plain English:</strong> At $2,500–$3,100 psf, a 700 sq ft 2-bedder works out to roughly $1.75M–$2.17M. A 950 sq ft 3-bedder lands around $2.4M–$2.95M. That is a <em>lot</em> of money — especially for a development that has not even broken ground.</p>

      <p><strong>What the numbers actually say.</strong> Let's look at where that price comes from.</p>

      <p>The S$810 million en bloc translates to a land cost of about $1,178 psf ppr. Layer on construction (~$550–$650 psf), financing and marketing (~$250–$350 psf), GST, and a 20–25% developer margin, and breakeven sits around $2,200–$2,400 psf. The launch range that emerges sits about 15–25% above breakeven — which is <em>normal</em>, not aggressive, for a mega launch in a prime catchment.</p>

      <table>
        <thead><tr><th>Cost Component</th><th>Estimate (S$ psf)</th></tr></thead>
        <tbody>
          <tr><td>Land cost (incl. betterment + lease top-up)</td><td>~$1,178</td></tr>
          <tr><td>Construction + consultants</td><td>~$550–$650</td></tr>
          <tr><td>Marketing, financing, GST, other</td><td>~$250–$350</td></tr>
          <tr><td><strong>Breakeven (estimated)</strong></td><td><strong>~$2,200–$2,400</strong></td></tr>
          <tr><td>Developer margin (~20–25%)</td><td>~$450–$550</td></tr>
          <tr><td><strong>Likely launch PSF range</strong></td><td><strong>~$2,500–$3,100</strong></td></tr>
        </tbody>
      </table>

      <p>Now compare that to Chuan Park (the most direct recent comparable), where land cost was $1,256 psf ppr — <em>higher</em> — and the project launched at an average of $2,579 psf.</p>

      <p>In other words, Thomson Reserve is being priced on the same math everyone else is being priced on. It is not a "premium grab." It is what Singapore land costs in 2026.</p>

      <p><strong>The honest reframe.</strong> The right question is not "Why is Thomson Reserve so expensive?" The honest question is, "Given that <em>all</em> new launches in this corridor will be in this band, where do I want to be inside the band?" And on that question, Thomson Reserve has a stronger argument than most.</p>

      <h3>Worry #2: "Appreciation will be too slow"</h3>
      <p><strong>The concern in plain English:</strong> If I am paying near the top of the market, will my money even grow? Could it sit still for years?</p>

      <p><strong>What comparable projects actually show.</strong></p>

      <p>The most direct comparable to Thomson Reserve is not in Lentor and not in Chuan Park — it is right next door, on Shunfu Road. Jadescape sits in the same District 20 corridor, was redeveloped from a similar en-bloc site, is almost identical in size, and shares the same three-MRT-line connectivity profile. If any project in Singapore tells us how Thomson Reserve might behave, it is this one.</p>

      <ul>
        <li><strong>Jadescape (D20, 1,206 units, by Qingjian Realty).</strong> Launched in September 2018 at an indicative $1,526 PSF (after early bird discounts). Today, the development transacts at an average of S$2,322 psf, with a range of S$1,856 to S$2,620. That is roughly <strong>52% appreciation over about 7.5 years</strong>, or <strong>5.5–6% compounded annually</strong> — and the price kept climbing post-TOP, not just before it. The same 1,200-unit "supply will flood the market" worry was raised at Jadescape's TOP in 2022. It did not happen. Owners who held are now sitting on substantial gains, and the project continues to set new psf highs in the resale market.</li>
        <li><strong>Lentor Modern (D26, 605 units).</strong> Launched September 2022 at an average S$2,107 PSF. By TOP in August 2025, resale units were trading at S$2,239–S$2,755 PSF — a gain of 6–31% depending on unit type and floor. Median experience: roughly 15–20% over three years.</li>
        <li><strong>Lentor Hills Residences (D26, 598 units).</strong> Launched July 2023 and now trades at $2,272–$2,686 PSF — approximately 20–24% appreciation in under three years.</li>
        <li><strong>Lentor Mansion (D26, 533 units).</strong> Launched March 2024 at an average PSF of $2,104, with current transacted PSF ranging from $2,429 to $2,941 — strong early traction by the same developer profile as Thomson Reserve.</li>
        <li><strong>AMO Residence (D20, 372 units).</strong> Currently transacts at S$2,211–S$2,980 PSF, up from a 2022 launch range in the low $2,100s. Solid appreciation in the same district.</li>
        <li><strong>Thomson Three (D20, 445 units).</strong> Launched in 2013 at around S$1,325 to S$1,350 psf, now averaging S$2,094 psf — roughly 55% over 12 years, or about 4% compounded per year. The earlier benchmark on the same Bright Hill Drive stretch.</li>
      </ul>

      <p>The honest pattern across this set is <strong>5–8% compounded a year for early entrants in well-located mega launches</strong>, with the strongest performers — the first-mover, MRT-integrated, family-format projects — clustering in the upper half of the range. Jadescape, the most directly comparable to Thomson Reserve, lands cleanly in this band.</p>

      <p><strong>The honest reframe.</strong> "Slow" is relative. A 5–7% compounded return on a primary residence is not slow — it is the rate at which most Singaporeans actually <em>build their first million</em>. The expectation of 30% in three years is the speculative bull case from 2020–2022, when ABSD was lower and supply was thinner. That market is not coming back. What is left is the steady-compound market — and on those terms, Thomson Reserve is structurally better positioned than Jadescape was at launch on three measurable counts:</p>

      <ol>
        <li><strong>Three MRT lines within walking distance vs Jadescape's two functional lines</strong> (Circle Line and TEL). The CRL Phase 1 interchange status at Bright Hill is a permanent uplift Jadescape does not have.</li>
        <li><strong>A SAP primary school inside the 1km zone</strong> (Ai Tong). Jadescape's nearest priority-zone primary school catchment is materially weaker.</li>
        <li><strong>Three SGX-listed blue-chip developers</strong> (UOL, SingLand, CapitaLand) versus Jadescape's single Chinese developer at launch. Construction quality risk and resale brand pull are both stronger.</li>
      </ol>

      <p>In other words: the project that most closely resembles Thomson Reserve in size, district, and structure delivered ~5.5–6% compounded for its early buyers. Thomson Reserve enters with better fundamentals on the three variables that matter most for <em>durable</em> appreciation. The base case is not "slow." The base case is the rate at which Singapore property has historically built quiet, real wealth.</p>

      <p>The Thomson Reserve buyer who is unhappy in 2030 is the buyer who expected a flip. The Thomson Reserve buyer who is content is the buyer who treated it as a long compound — exactly as Jadescape's patient owners are now.</p>

      <h3>Worry #3: "1,240 units is too much supply at TOP"</h3>
      <p><strong>The concern in plain English:</strong> When the project completes, hundreds of owners may try to sell or rent at the same time. Won't that flood the market and depress prices?</p>

      <p><strong>What the data on mega projects actually shows.</strong> It is true that mega launches concentrate supply at TOP. It is <em>also</em> true that mega launches concentrate <em>attention</em> — and attention is what creates liquidity.</p>

      <p>Look at how the market has actually behaved:</p>

      <ul>
        <li><strong>Jadescape</strong> is the cleanest case study. It TOP'd in 2022/2023 with 1,206 units — almost identical to Thomson Reserve's 1,240. Post-TOP, the project has averaged ~9.5% PSF appreciation between 2023 and 2026. The "supply flood" never materialised in the way pessimists predicted.</li>
        <li><strong>Chuan Park</strong> sold 696 of 916 units at an average of $2,579 psf over a single launch weekend in November 2024. By 2026, around 92% had sold, with average pricing inching up to about $2,596 psf. Concentrated supply did not collapse the price.</li>
        <li><strong>Lentor Modern</strong>, a 605-unit project, achieved 100% sales by January 2025 and is now the resale benchmark for the entire Lentor precinct.</li>
        <li><strong>Lentor Mansion</strong> sold 75% of units on launch weekend in March 2024 at an average PSF of $2,104, with current resale PSF at $2,429 to $2,941.</li>
      </ul>

      <p>Mega projects in good locations consistently price-discover <em>upward</em> after TOP, not downward, because:</p>

      <ol>
        <li><strong>Recognition effect.</strong> Buyers from across Singapore know the project by name. That brand recognition pulls in a deeper buyer pool than boutique 200-unit developments ever achieve.</li>
        <li><strong>Liquidity for sellers.</strong> When you do want to sell, there are buyers actively comparing your unit to listings inside the same project. Boutique projects suffer from "no recent comparable" pricing dead zones; mega projects do not.</li>
        <li><strong>Rental absorption.</strong> Large unit counts also mean large rental inventory — but in Singapore's expat and domestic rental market, this is matched by deeper rental demand to <em>exactly the projects renters search for</em>.</li>
      </ol>

      <p><strong>The honest reframe.</strong> Supply at TOP is real, but it is also temporary — typically 6–18 months of elevated subsale activity, after which the project settles into its long-term resale rhythm. Owners who hold past that initial window historically transact at higher prices than the early-TOP subsale wave. Translation: if you can hold past 2032, the supply argument largely dissolves.</p>

      <h3>Worry #4: "Isn't the CRL already priced in?"</h3>
      <p><strong>The concern in plain English:</strong> Cross Island Line Phase 1 (around 2030) is the big future catalyst. But surely the developers already know that — and that is exactly why they bid S$810 million for the site. So is the upside already gone?</p>

      <p><strong>What the analysis actually shows.</strong> This is a genuinely smart question, and the answer is nuanced. Yes, the developers priced <em>some</em> CRL premium into their land bid. No, they did not price all of it — because they cannot.</p>

      <p>Here is why. When LTA confirms an MRT line years in advance, the <em>announcement premium</em> gets capitalised into nearby property within months. From 2021 to mid-2025, the average resale price for 99-year leasehold condos in District 20 rose by 31.6% to $1,905 psf. Much of that already happened.</p>

      <p>What is <em>not</em> yet capitalised is the <strong>operational premium</strong> — the further uplift that occurs once the line actually opens, commuter behaviour shifts, and integration with the existing TEL and Circle Line networks becomes lived experience. Historically, MRT-adjacent properties in Singapore see a <em>second wave</em> of appreciation in the 12–24 months after a station opens, on top of the announcement premium they have already received.</p>

      <p>Bright Hill MRT is set to become an interchange between TEL and CRL Phase 1. That kind of interchange status — three MRT lines within walking distance — is held by <strong>fewer than 15 condo projects in Singapore</strong>. It is a permanent structural advantage that compounds over the entire 99-year lease.</p>

      <p><strong>The honest reframe.</strong> The CRL is partially priced in. The interchange uplift is not. The 99-year residual value of being a three-line condo is <em>certainly</em> not. You are paying for the obvious. You are not paying for the durable.</p>

      <h3>Worry #5: "What if Thomson Reserve becomes another Thomson Grand?"</h3>
      <p><strong>The concern in plain English:</strong> Thomson Grand, in the same broader area, famously underperformed — only a 9% price appreciation with an average profit of about $146,000. What stops Thomson Reserve from going the same way?</p>

      <p><strong>What was actually different about Thomson Grand.</strong> This is one of the most quoted cautionary tales in Singapore property — but the reasons it underperformed are specific, and they do not transfer to Thomson Reserve.</p>

      <p>Thomson Grand suffered from:</p>
      <ul>
        <li><strong>Layout inefficiency.</strong> A private lift lobby on multiple units consumed strata area that buyers were paying for but could not use, hurting effective PSF perception on resale.</li>
        <li><strong>MRT distance.</strong> It launched before the TEL existed in the area — its location was not yet supported by direct MRT access.</li>
        <li><strong>Smaller scale and weaker brand pull.</strong> Without the recognition effect of a mega launch, its resale liquidity stayed thin for years.</li>
      </ul>

      <p>Thomson Reserve has the <em>opposite</em> of those problems on every count: a 1,240-unit mega scale, three MRT lines within walking distance, three blue-chip developer brands, and an open-floor design philosophy the consortium has refined across Parktown, Watten House, and other recent projects.</p>

      <p><strong>The honest reframe.</strong> Thomson Grand is a cautionary tale about <em>unit design and connectivity</em>, not about location. The Thomson postcode itself has performed perfectly well — Thomson Three, in the same Bright Hill Drive stretch, delivered a 20% price appreciation and an average profit of around $251,000. The lesson is to buy efficient layouts in well-connected mega projects. That is precisely what Thomson Reserve is designed to be.</p>

      <h2>The Three Quiet Edges Most Reviews Skip</h2>
      <p>If you have read this far, you are exactly the kind of buyer who deserves the parts of the analysis that brochures and quick reviews leave out.</p>

      <h3>1. The Ai Tong 1km Zone Is Genuinely Rare</h3>
      <p>Within Singapore's most competitive primary school catchment system, the 1km radius around an SAP (Special Assistance Plan) primary school is one of the few structural advantages that <em>does not depreciate with lease</em>. Ai Tong Primary is one of the most subscribed primary schools in Singapore, and the 1km zone around Bright Hill Drive places Thomson Reserve residents in Phase 2C(S) priority — which, in oversubscribed years, is the deciding factor.</p>
      <p>For families with children under seven, this is not a soft amenity. It is a hard-edged practical reason that supports both purchase demand <em>and</em> rental demand for the next 30 years, regardless of what the broader market is doing. Family demand is the most price-resilient demand in Singapore real estate.</p>

      <h3>2. Three Blue-Chip Developers Behave Differently</h3>
      <p>When a single developer launches a project, they price aggressively early to clear inventory. When three SGX-listed developers — each with their own boards, balance sheets, and reputation considerations — co-launch, the pricing tends to be <em>steadier</em> and the construction quality <em>more consistent</em>. Reputational risk is shared, which makes shortcuts costly to all parties.</p>
      <p>The same consortium (UOL, SingLand, CapitaLand) was the one behind Parktown Residence, which sold 87% of its units on launch weekend in February 2025. The combined balance sheet and the track record matter when you are paying $2M+ for an unbuilt unit. Default risk and construction-defect risk are not zero in Singapore — but they are about as close to zero as any private project gets.</p>

      <h3>3. The 99-Year Clock Is Reset</h3>
      <p>This sounds technical, but it matters. The original Thomson View was leasehold from 1975. The redevelopment includes a <em>lease top-up</em> to a fresh 99 years. For a buyer with a 15–25 year hold horizon, the lease decay impact is much smaller than buying a 15-year-old project in the same area today.</p>
      <p>Lease decay accelerates after the 30-year mark. A fresh-99 project gives you a long runway where lease decay is a <em>negligible</em> drag on resale. Compare to a 2010-vintage condo in the same area, which is already 16 years into its lease and starts seeing meaningful lease-related discounting from its 30th year onward.</p>

      <h2>Who Thomson Reserve Genuinely Fits — And Who Should Reconsider</h2>
      <p>This is the part most reviews dodge. A clear answer is more useful than a "depends" non-answer.</p>

      <p><strong>Thomson Reserve fits you well if you are:</strong></p>
      <ul>
        <li>A <strong>Singapore Citizen first-property buyer</strong> (0% ABSD) planning a 7–15 year hold. The math here is very kind: zero ABSD, no rush to sell, full compounding of a structural growth corridor.</li>
        <li>A <strong>family upgrader</strong> with children under seven targeting Ai Tong School or one of the other Bishan-Thomson primary schools. The school catchment is rarely fully priced into a unit's PSF.</li>
        <li>A <strong>HDB upgrader from Bishan, Toa Payoh, Ang Mo Kio, or Serangoon</strong> who has built up equity in their flat and wants to lock in a fresh-99 large-format development before the next round of supply arrives. You are not paying tomorrow's price — you are getting in <em>before</em> the broader corridor reprices in 2027–2028.</li>
        <li>A <strong>long-term investor</strong> willing to hold past TOP and through at least one full SSD cycle. Three MRT lines, two prestige primary schools, and a 5-hectare site is the kind of foundation that compounds quietly for a decade.</li>
      </ul>

      <p><strong>Thomson Reserve may not fit you well if you are:</strong></p>
      <ul>
        <li>A pure <strong>5-year flipper</strong> counting on 30%+ gains. The Singapore market that delivered those returns no longer exists. This is not a Thomson Reserve issue — it is a Singapore-in-2026 issue, and the same caution applies to every other current launch.</li>
        <li>A <strong>second-property buyer paying 20% ABSD</strong> who has not stress-tested the math on a 10-year hold. ABSD compresses your effective return — but only on short horizons. On a 10–15 year horizon, even a 20% ABSD second-property buyer can reach a healthy compounded return.</li>
        <li>A <strong>foreign buyer</strong> (60% ABSD) without a multi-generational hold horizon.</li>
      </ul>

      <p>If you are in the first list, Thomson Reserve is a genuine and rare opportunity to enter a corridor with structural tailwinds at the <em>first wave</em> of pricing, before the surrounding GLS launches reset the benchmark upward. If you are in the second list, there is no shame in waiting — but recognise that waiting in cash also has a cost, and the next launches in the same corridor will not be cheaper.</p>

      <h2>How to Enter Thomson Reserve Intelligently (If You Decide To)</h2>
      <p>If your honest analysis brings you to "yes" — or even a careful "yes, with conditions" — here is how disciplined buyers approach a launch like this.</p>

      <ol>
        <li><strong>Pick layout efficiency over unit type.</strong> The 3-bedroom with yard, household shelter, and proper utility WC has historically outperformed compact "dumbbell" 3-bedders on resale. Bigger is not always better; <em>more functional</em> is.</li>
        <li><strong>Avoid the floor right above a premium jump.</strong> Developers often layer in larger premium jumps at the 8th, 13th, or 18th floor mark. Buying the <em>cheapest unit on the higher tier</em> often beats buying the most expensive unit on the lower tier.</li>
        <li><strong>Model your real all-in cost on iras.gov.sg.</strong> Don't estimate BSD and ABSD. Compute them. Then add legal, mortgage interest, maintenance, and property tax over your hold horizon.</li>
        <li><strong>Have a clear hold horizon before you visit the showflat.</strong> Decide your minimum hold <em>before</em> you fall in love with a view. The 4-year SSD window plus a 2–3 year post-SSD settling period means the realistic minimum hold for net-positive returns is 6–7 years.</li>
        <li><strong>Build in a stress-test buffer.</strong> If you can still service the mortgage at a 4.5% interest rate and one income gap of three months, you are properly hedged. If not, downsize the unit before you commit.</li>
      </ol>

      <h2>Frequently Asked Questions</h2>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is Thomson Reserve overpriced?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600"><strong>Not by 2026 standards.</strong> At an indicative S$2,500–S$3,100 psf, Thomson Reserve is priced in line with comparable Singapore RCR mega launches and slightly below Chuan Park's land-cost-implied range. The pricing is <em>expensive</em>, but not out of line with the market. For long-horizon owner-occupiers and Singapore Citizen first-property buyers, the entry price is well-supported by location, schools, and three-line MRT access.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Why is Thomson Reserve so expensive?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600"><strong>Because the land cost is.</strong> The S$810 million en bloc translates to a land cost of about S$1,178 psf per plot ratio. Construction (~S$550–S$650 psf), financing, marketing, GST, and a typical 20–25% developer margin push launch pricing to the S$2,500–S$3,100 psf range. The price reflects what Singapore land costs in 2026, not aggressive developer positioning.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How does Thomson Reserve compare to Jadescape?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600"><strong>Jadescape is the closest historical comparable to Thomson Reserve, and it is the cleanest evidence that the corridor compounds.</strong> Both are mega en-bloc redevelopments in District 20 with roughly 1,200 units and three MRT lines within walking distance.</p>
        <table>
          <thead><tr><th></th><th>Jadescape</th><th>Thomson Reserve</th></tr></thead>
          <tbody>
            <tr><td>District</td><td>20 (Shunfu/Marymount)</td><td>20 (Bright Hill Drive)</td></tr>
            <tr><td>Units</td><td>1,206</td><td>~1,240</td></tr>
            <tr><td>Land cost (psf ppr)</td><td>~$747</td><td>~$1,178</td></tr>
            <tr><td>Launch PSF</td><td>~$1,526 (Sep 2018)</td><td>Est. S$2,500–S$3,100 (2026)</td></tr>
            <tr><td>Current PSF avg (2026)</td><td>~$2,322</td><td>TBA</td></tr>
            <tr><td>Annualised return so far</td><td>~5.5–6% compounded</td><td>TBA</td></tr>
            <tr><td>MRT lines (walkable)</td><td>2 (Circle Line, TEL)</td><td>3 (TEL, future CRL, Circle Line)</td></tr>
            <tr><td>SAP primary school in 1km</td><td>No</td><td>Yes (Ai Tong)</td></tr>
            <tr><td>Developer</td><td>Qingjian Realty</td><td>UOL · SingLand · CapitaLand</td></tr>
          </tbody>
        </table>
        <p class="px-4 pb-4 text-sm text-slate-600"><strong>The takeaway.</strong> Jadescape's launch buyers in 2018 paid ~$1,526 PSF and now sit on roughly 52% gross gains over 7.5 years. Thomson Reserve enters at a much higher absolute price, but with structurally better fundamentals on the three variables that drive long-term resale: an SAP primary school inside the 1km zone, a future Cross Island Line interchange, and three SGX-listed developers. You pay more upfront. You also start with a stronger appreciation engine.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How does Thomson Reserve compare to Chuan Park?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600"><strong>Chuan Park's land cost was actually higher</strong> — $1,256 psf ppr versus Thomson Reserve's $1,178. Chuan Park launched in November 2024 and has sold around 92% at about $2,596 psf as of mid-2026. Thomson Reserve has structural advantages Chuan Park does not: three MRT lines (Chuan Park has one), the Ai Tong 1km school zone, and proximity to MacRitchie Reservoir. Same league, different strengths.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Will Thomson Reserve appreciate slowly?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600"><strong>Probably steadily, not slowly.</strong> Comparable mega launches — Jadescape, Lentor Modern, Lentor Mansion, Chuan Park — have delivered 5–8% compounded annual returns for early entrants. That is the historical "base rate" for well-located Singapore mega projects, not a worst case.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is the realistic 5-year return on Thomson Reserve?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600"><strong>Base case: 15–25% over five years, gross.</strong> For a Singapore Citizen first-property buyer (0% ABSD), this translates to a healthy 12–20% net return after stamp duty, mortgage interest, and maintenance. For a second-property buyer paying 20% ABSD, five years is too short — the maths only works comfortably on a 7–10 year hold.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is District 20 a good investment in 2026?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600"><strong>Yes, structurally — though not cheaply.</strong> From 2021 to mid-2025, the average resale price for 99-year leasehold condos in District 20 rose by 31.6% to $1,905 psf, outpacing the previous five-year stretch. Three MRT lines, strong primary school network, mature retail at Thomson Plaza, and proximity to MacRitchie all support a defensible long-term thesis.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Should I wait for the next launch instead?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600"><strong>Wait if the next launch is in the same corridor; act if it is not.</strong> No upcoming launch in 2026–2027 matches Thomson Reserve's combination of three-line MRT access, Ai Tong 1km zone, and 5-hectare site in the Bishan-Thomson belt. Waiting in cash also has a cost.</p>
      </details>

      <h2>The Honest Bottom Line</h2>
      <p>Thomson Reserve is expensive. We should not pretend otherwise. Anyone who tells you it is a bargain is selling you a story.</p>

      <p>But "expensive" is not the same as "wrong." Singapore land in 2026 is expensive. <em>All</em> the alternatives in this corridor are expensive. The relevant question is not whether the price is high — the relevant question is whether the entry point unlocks something the cheaper alternatives cannot.</p>

      <p>On the evidence: three MRT lines, an SAP primary school in the 1km zone, a fresh 99-year lease, three blue-chip developers, 5 hectares of land beside a reservoir, and one of the rarest combinations of family-residential and capital-residential fundamentals Singapore has launched this decade — yes, the entry point unlocks something real.</p>

      <p>The most directly comparable project in Singapore — Jadescape, on the same Bishan-Thomson corridor — has rewarded its patient owners with roughly 5.5–6% compounded annual returns since 2018. Thomson Reserve enters with stronger fundamentals on the three variables that actually drive long-term appreciation. The historical pattern does not guarantee the future, but it does tell you what kind of project this is, and what kind of holding horizon it rewards.</p>

      <p>That does not make it right for everyone. A 5-year flipper, a stretched second-property buyer, a foreigner without a long horizon — these buyers should look elsewhere, and there is no shame in it.</p>

      <p>But for the Singaporean first-property buyer, the family upgrader, the patient HDB-to-condo upgrader from the surrounding estates — Thomson Reserve is exactly the kind of disciplined long-compound entry that has historically built quiet, durable wealth in this country. Not flashy. Not Instagram-worthy. Just structurally sound.</p>

      <p>The buyers who regret their property decisions in Singapore are rarely the ones who paid a fair price for a strong corridor and held patiently. They are the ones who chased a cheaper price in a weaker location, or who tried to flip in three years what a market needs ten years to deliver.</p>

      <p>Make sure your decision is the patient one. Whatever you decide.</p>

      <p><em>Last updated: June 2026. Pricing indicative until the developer's official launch. Verify all stamp duty rates with IRAS and seek licensed advice before transacting.</em></p>

      <p>If you would like a fair, data-driven walk-through of Thomson Reserve against your specific situation — your existing property, your financing, your hold horizon — a <strong>free 30-minute consultation</strong> is available via the <a href="/contact/" class="underline hover:text-violet-700">/contact page</a>.</p>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/which-condo-to-buy-2026" onclick="showArticle('post-which-condo-to-buy-2026'); return false;" class="underline hover:text-violet-700"><strong>Which Condo to Buy in Singapore in 2026: A Practical Buyer’s Guide</strong></a></p>
      <p>2. <a href="/insights/new-launch-vs-resale" onclick="showArticle('post-new-launch-vs-resale'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo in 2026: Which Should You Buy?</strong></a></p>
      <p>3. <a href="/insights/district-guide" onclick="showArticle('post-district-guide'); return false;" class="underline hover:text-violet-700"><strong>Which Singapore District Should You Buy In? The 2026 Growth Map</strong></a></p>
      <p>4. <a href="/project/thomson-reserve-condo/" class="underline hover:text-violet-700"><strong>Full Thomson Reserve Project Page (Deep Analysis)</strong></a></p>
      <p>5. <a href="/insights/hdb-vs-ec-vs-private-property-2026" onclick="showArticle('post-hdb-vs-ec-vs-private-property-2026'); return false;" class="underline hover:text-violet-700"><strong>HDB vs EC vs Private Property: Which Should You Buy? (2026)</strong></a></p>

      <p><em>Disclaimer: This article is for general informational purposes and does not constitute financial, tax, or investment advice. All figures, projections, and comparisons are based on publicly available data as of June 2026 and are subject to change. Property values can go down as well as up. Always conduct your own due diligence and consult a licensed financial advisor, solicitor, and property professional before making any decision.</em></p>
    `
  },

  /* ======================================================
     ARTICLE 26 — THOMSON RESERVE RISKS
  ====================================================== */
  'post-thomson-reserve-risks-2026': {
    title: 'Thomson Reserve Risks: The 8 Real Risks Every Buyer Should Know in 2026',
    date: '27 Jun 2026',
    readTime: '30 min read',
    category: 'NEW LAUNCH',
    chipClass: 'chip-newlaunch',
    img: null,
    linkedinUrl: null,
    body: `
      <p><strong>The eight real risks of buying Thomson Reserve are: floating-rate BUC loan exposure, a 2027–2028 supply wave from the same consortium, future cooling measures, a four-year construction window, density at 1,240 units, off-plan uncertainty, the extended 4-year SSD window (post-July 2025), and quantum overstretch.</strong> Most are manageable. The two that hurt buyers most — the SSD liquidity trap and quantum overstretch — are personal financial risks, not project risks.</p>

      <p>Some buyers are quietly walking away from Thomson Reserve. They have read the headlines, looked at the launch PSF, weighed the four-year wait until 2030, and decided the risk profile does not fit their life. They are not wrong to ask the question. Buying a $2 million unit that does not exist yet, in a market where the next round of cooling measures is always one quarter away, is not a casual decision.</p>

      <p>But here is the part most "avoid Thomson Reserve" articles get wrong: risk is not the same as danger. A risk is something you can identify, measure, and manage. A danger is something that ambushes you. Most of what people call "Thomson Reserve risks" are actually category-wide risks for every 2026 new launch in Singapore — they just look scarier when attached to a S$810 million flagship project.</p>

      <p><em>All figures are based on publicly available URA, IRAS, EdgeProp, 99.co, and MAS data as of mid-2026. Some are estimated pending the developer\'s official launch.</em></p>

      <h2>The Three Layers of Risk: A Framework Before We Begin</h2>
      <p>Property risk is not a single thing. It is three different things stacked on top of each other, and confusing them leads to bad decisions.</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-3">The Three-Layer Risk Framework</p>
        <table>
          <thead><tr><th>Layer</th><th>Type</th><th>Examples (Thomson Reserve)</th></tr></thead>
          <tbody>
            <tr><td><strong>Layer 1</strong></td><td>Market &amp; Policy Risks</td><td>Interest rates, supply wave, cooling measures — you cannot control these, only prepare for them</td></tr>
            <tr><td><strong>Layer 2</strong></td><td>Project-Specific Risks</td><td>Construction delays, density, off-plan uncertainty — partially screened by developer pedigree and unit choice</td></tr>
            <tr><td><strong>Layer 3</strong></td><td>Personal &amp; Financial Risks</td><td>SSD liquidity trap, quantum overstretch — entirely yours, and usually the ones that hurt most</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Layer 1: Market &amp; Policy Risks (The Things You Cannot Control)</h2>
      <p>These are the risks people fixate on because they are visible and dramatic. They are also, paradoxically, the easiest risks to manage — because the answer to every one of them is the same: hold longer.</p>

      <h2>Risk #1: Interest Rates Have Bottomed Out — And BUC Loans Are Floating-Only</h2>
      <p>Singapore mortgage rates have fallen sharply. As of mid-2026, 3-month SORA sits around 1.0–1.2%, fixed packages start from about 1.40%, and floating from about 1.27%. This looks like a great time to lock in. But for a new launch like Thomson Reserve, you cannot.</p>

      <p>Building-under-construction (BUC) loans are floating-only in Singapore. You only get to lock in a fixed rate after TOP — which for Thomson Reserve means around 2030. Between now and then, you pay floating, and floating rates move with SORA.</p>

      <h3>How real is this risk?</h3>
      <p>Real, but bounded. Consensus forecasts cluster SORA around 1.0–1.2% through 2026, absent a major economic shock. The 2023 peak (SORA at 3.6%+) was the result of one of the most aggressive Fed tightening cycles in decades — repeating that scenario requires a comparable inflation shock. Under the Progressive Payment Scheme, you only pay interest on the disbursed portion of the loan, which scales up with construction milestones. The full mortgage burden does not hit until TOP — when you can refinance to a fixed package.</p>

      <h3>How serious buyers handle it</h3>
      <ul>
        <li><strong>Stress-test at 4.5%.</strong> If your monthly repayment is comfortable at a 4.5% rate, you are insured against most realistic scenarios.</li>
        <li><strong>Plan to refinance at TOP.</strong> Pencil in a refinancing review around 2030. The cost of switching banks at TOP is typically S$3,000–S$5,000 — trivial against a 25-year loan.</li>
        <li><strong>Build a 6-month mortgage buffer.</strong> Cash reserves equal to half a year of repayments covers job loss, illness, or rate spikes without forcing a panic sale.</li>
      </ul>

      <h2>Risk #2: The 2027–2028 Supply Wave From Your Own Developers</h2>
      <p>UOL, SingLand, and CapitaLand — the same three developers behind Thomson Reserve — also won the Hougang Central GLS site in December 2025 with a S$1.5 billion bid. That development will likely launch in 2027–2028 and TOP around 2030–2031, almost the same window as Thomson Reserve. The broader 2026–2028 supply pipeline carries 9,000+ new homes, including One Chuan Grove (D19) and Lentor Gardens Residences (D26).</p>

      <h3>How real is this risk?</h3>
      <p>Less severe than it looks on paper, because supply is not the same as competition. Hougang Central is in District 19, not District 20. Different MRT corridor, different school catchment, different buyer profile. None of the competing projects sit inside the Ai Tong 1km zone or have three-line MRT access from the same address.</p>

      <p>What supply does do is compress the rate of appreciation in the first 2–3 years post-TOP. It does not collapse prices. Jadescape — the most direct comparable to Thomson Reserve — TOP\'d in 2022/2023 with 1,206 units against significant Bishan-Toa Payoh resale supply, and still delivered ~9.5% PSF appreciation between 2023 and 2026.</p>

      <h3>How serious buyers handle it</h3>
      <ul>
        <li><strong>Plan a 7+ year hold.</strong> That takes you past the initial post-TOP supply wave and into the natural resale rhythm where mega projects price-discover upward.</li>
        <li><strong>Pick a stack with structural differentiation.</strong> A unit with unblocked MacRitchie views cannot be replicated by Hougang Central or Lentor at any price.</li>
        <li><strong>Track the actual launch calendar.</strong> When competing projects price, you get a real-time read on whether the corridor is repricing up or down.</li>
      </ul>

      <h2>Risk #3: Future Cooling Measures Could Compress Your Exit Window</h2>
      <p>Singapore has raised ABSD five times since 2011. The April 2023 round caught the market off guard — new launch transaction volumes halved overnight. If MAS or MOF tightens again before you exit Thomson Reserve, your buyer pool could shrink and your resale price soften.</p>

      <h3>How real is this risk?</h3>
      <p>Possible but not imminent. As of May 2026, there has been no signal from the Ministry of Finance or MAS of imminent stamp duty changes. Private residential prices rose 0.9% in Q1 2026 — a moderate pace that does not, on its own, suggest further tightening. Notably, every ABSD revision in 15 years has been an increase, never a decrease. The risk is asymmetric: it only adds friction to your exit, never removes it.</p>

      <h3>How serious buyers handle it</h3>
      <ul>
        <li><strong>Buy as if cooling measures will tighten, not loosen.</strong> If your numbers only work in a stable-policy world, the risk margin is too thin.</li>
        <li><strong>Avoid second-property purchases at the top of your affordability.</strong> ABSD compounds the impact of any cooling round.</li>
        <li><strong>Do not rely on foreign buyer demand for exit.</strong> Foreigners pay 60% ABSD already. Build your exit thesis around Singaporean upgraders and PRs.</li>
      </ul>

      <h2>Layer 2: Project-Specific Risks (What Can Go Wrong With the Project Itself)</h2>
      <p>These are the risks that vary from project to project. Most of them can be screened for before you sign — which means they are entirely manageable if you do the work.</p>

      <h2>Risk #4: The Four-Year Construction Window — Anything Can Happen</h2>
      <p>Thomson Reserve is expected to TOP around 2030. That is roughly four years from a 2026 launch. In four years, interest rates can swing, construction costs can rise, a global event can disrupt the supply chain, and the developer can hit unforeseen issues. Singapore has seen TOP delays of 6 to 18 months on several major projects in recent years.</p>

      <h3>How real is this risk?</h3>
      <p>The probability of some delay is high. The probability of a catastrophic delay or non-completion is very low — especially with this specific consortium. Three structural protections reduce this risk:</p>
      <ul>
        <li><strong>Three SGX-listed developers sharing the project.</strong> Each has its own board, balance sheet, and public reputation. The combined balance sheet capacity is several orders of magnitude larger than the project cost. Construction failure or financial default is functionally a non-issue.</li>
        <li><strong>The Land Sales Disqualification Framework (effective 22 May 2026)</strong> now imposes bans of up to five years on developers who deliver defect-ridden or unsafe projects. This regulatory backstop changes developer incentives materially.</li>
        <li><strong>The Progressive Payment Scheme structurally hedges your cashflow.</strong> You pay in stages aligned with construction milestones. If construction stalls, your payment obligations stall with it.</li>
      </ul>

      <h3>How serious buyers handle it</h3>
      <ul>
        <li><strong>Sequence your HDB sale carefully.</strong> Do not sell your current home in 2026 and rent for four years. Sell after Thomson Reserve TOP, when your unit is move-in ready.</li>
        <li><strong>Check the developer\'s build-quality track records.</strong> UOL, SingLand and CapitaLand all have strong CONQUAS scores. Visit a recently completed project by the consortium and inspect the finishes yourself.</li>
        <li><strong>Read the SPA carefully on liquidated damages.</strong> Standard Singapore SPAs include a liquidated damages clause if TOP is delayed beyond the contractual date. This is real money, not just a moral assurance.</li>
      </ul>

      <h2>Risk #5: Density Risk — 1,240 Units Sharing Facilities</h2>
      <p>Thomson Reserve will house roughly 1,240 units on a 5-hectare site — a density of about 248 units per hectare. At 3 people per household on average, you are looking at ~3,700 residents sharing the same pools, gym, BBQ pits, and lobbies. Crowded weekends. Queue for the swimming lane. Lift lobbies congested at 8am.</p>

      <h3>How real is this risk?</h3>
      <p>It depends on the project\'s amenity-to-resident ratio. Mega projects can deliver poor liveability if facilities are under-provisioned — or better liveability than boutique projects, because the larger budget supports more facilities (multiple pools, larger gyms, segregated zones) than a 200-unit boutique can afford.</p>

      <p>A real comparable: Jadescape, with 1,206 units, has resident reviews running broadly positive on facilities — with one consistent complaint: facilities get crowded on weekends. That is the honest reality of mega-project living. If you want resort-like exclusivity, a boutique freehold in a quieter district will serve you better.</p>

      <h3>How serious buyers handle it</h3>
      <ul>
        <li><strong>Inspect the site plan carefully at preview.</strong> Count the pool areas, gym square footage, lift-to-unit ratio, parking provision. Compare against the unit count.</li>
        <li><strong>Visit the developer\'s existing mega projects on a Sunday morning.</strong> Walk the facilities. Talk to actual residents. Five minutes of conversation tells you more than five hours of brochure reading.</li>
        <li><strong>Pick a tower position not directly above the noisiest facilities.</strong> Avoid the stack directly above the pool deck, function hall, or bin centre. These are usually subtly priced lower for a reason.</li>
      </ul>

      <h2>Risk #6: Off-Plan Buying Risk — What Looks Great in the Showflat May Not Deliver</h2>
      <p>You are buying a unit that does not exist. The showflat is a sales tool, not a contractual commitment. Finishes can be substituted with "equivalent" alternatives. Views from your specific floor and stack are not what the showflat shows. Until TOP, you are buying a promise.</p>

      <h3>How real is this risk?</h3>
      <p>Real, but well-regulated. The Housing Developers (Control and Licensing) Act governs new launch sales tightly. The SPA spells out specifications, substitution clauses, and rectification obligations. Developers have a one-year defects liability period after TOP during which they must fix legitimate construction defects at no cost.</p>

      <p>What does go wrong: floor plans can have inefficiencies not obvious until you stand in the unit. Views can be obstructed by future GLS developments on adjacent plots — check the URA Master Plan for unbuilt sites within line-of-sight. Finish quality can vary between the showflat and the actual unit.</p>

      <h3>How serious buyers handle it</h3>
      <ul>
        <li><strong>Bring a measuring tape to the showflat.</strong> Verify advertised dimensions against your own measurements. Look at ceiling heights, bedroom widths, and balcony depths.</li>
        <li><strong>Cross-reference your stack against the URA Master Plan.</strong> Look for unbuilt plots in your view direction. A reservoir view in 2026 might become an obstructed view in 2030.</li>
        <li><strong>Engage a property lawyer before signing the OTP.</strong> Review the SPA substitution clauses and defects liability provisions. A lawyer\'s fee of S$2,500–S$4,000 is cheap insurance on a S$2M+ purchase.</li>
        <li><strong>Take photos and videos at the showflat.</strong> If post-TOP delivery diverges from what was shown, you have evidence for any rectification claim.</li>
      </ul>

      <h2>Layer 3: Personal &amp; Financial Risks (The Risks That Land on Your Lap)</h2>
      <p>These are the risks that property influencers rarely discuss — because they are the buyer\'s responsibility, not the developer\'s. They are also the risks that most often blow up a property purchase in Singapore.</p>

      <h2>Risk #7: The 4-Year SSD Liquidity Trap (Post-July 2025 Rules)</h2>
      <p>Singapore\'s Seller\'s Stamp Duty was extended in July 2025. Properties acquired on or after 4 July 2025 now face SSD if sold within four years. Previously the holding window was three years.</p>

      <table>
        <thead><tr><th>Sale timing (from purchase date)</th><th>SSD rate</th><th>On a S$2.5M unit</th></tr></thead>
        <tbody>
          <tr><td>Within Year 1</td><td>16%</td><td>S$400,000</td></tr>
          <tr><td>Year 2</td><td>12%</td><td>S$300,000</td></tr>
          <tr><td>Year 3</td><td>8%</td><td>S$200,000</td></tr>
          <tr><td>Year 4</td><td>4%</td><td>S$100,000</td></tr>
          <tr><td>After Year 4</td><td>0%</td><td>—</td></tr>
        </tbody>
      </table>

      <p>Critically, the SSD clock starts ticking from the day you exercise the OTP in 2026, not from when you move in around 2030. If you buy Thomson Reserve in late 2026, your SSD-free date is late 2030. If you then need to sell in 2031–2032 (within 1–2 years of moving in), you are already SSD-clear — but still in the early post-TOP window where price discovery may not have fully occurred. The comfortable hold window is <strong>7+ years from purchase date</strong>.</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">SSD Timing for Thomson Reserve Buyers</p>
        <p class="text-sm text-violet-800">Buy in late 2026 → SSD-free from late 2030 → TOP ~2030 → effectively zero SSD exposure if you hold through to resale. The real risk is life forcing a sale between 2026 and 2030, when you are both in the construction period and inside the SSD window simultaneously.</p>
      </div>

      <h3>How serious buyers handle it</h3>
      <ul>
        <li><strong>Be brutally honest about your hold horizon.</strong> "I think I will stay 10 years" is not a plan. Write down specific reasons you are unlikely to need to exit early — job stability, school anchor, family proximity.</li>
        <li><strong>Build a real emergency fund.</strong> Six months of all-in housing costs (mortgage + maintenance + property tax + utilities) is the floor. Twelve months is safer for first-time condo buyers.</li>
        <li><strong>Consider whether a slightly smaller unit gives you more breathing room.</strong> A 700 sq ft 2-bedder you can comfortably hold for 10 years beats a 1,000 sq ft 3-bedder you are forced to sell in Year 3.</li>
      </ul>

      <h2>Risk #8: Quantum Overstretch — When the Price Is the Silent Killer</h2>
      <p>This is the most common Singapore property mistake and almost nobody talks about it openly. A buyer can technically qualify for a Thomson Reserve unit at S$2.5M under TDSR and MSR rules — but qualifying is not the same as being comfortable. The mortgage absorbs cash that should have gone to retirement savings, education funds, emergency reserves, or simply living a non-stressed life.</p>

      <table>
        <thead><tr><th>Unit type</th><th>Indicative price</th><th>Monthly mortgage (3.5%, 25yr)</th><th>True all-in monthly*</th></tr></thead>
        <tbody>
          <tr><td>2-Bedroom (700 sqft)</td><td>S$1.75M–S$2.17M</td><td>S$3,900–S$4,800</td><td>S$5,100–S$6,200</td></tr>
          <tr><td>3-Bedroom (950 sqft)</td><td>S$2.4M–S$2.95M</td><td>S$5,300–S$6,500</td><td>S$6,900–S$8,500</td></tr>
          <tr><td>4-Bedroom (1,200 sqft)</td><td>S$3.0M–S$3.7M</td><td>S$6,600–S$8,200</td><td>S$8,600–S$10,700</td></tr>
        </tbody>
      </table>
      <p><em>*All-in includes maintenance fees (~S$600–S$800/mo), property tax, utilities, insurance, and 0.5% annual repair provisioning. The honest monthly figure is usually 30–40% higher than the mortgage alone.</em></p>

      <h3>How serious buyers handle it</h3>
      <ul>
        <li><strong>Aim for housing costs at 28–32% of gross monthly income,</strong> not the 55% TDSR ceiling. The lower number is the actual comfort threshold for sustainable Singapore living.</li>
        <li><strong>Buy one tier below your maximum.</strong> The marginal lifestyle gain from "the biggest unit you can afford" is small; the marginal life-flexibility loss is large.</li>
        <li><strong>Never buy at the absolute top of your budget without a fallback plan.</strong> If your fallback plan is "sell quickly," reread Risk #7.</li>
      </ul>

      <h2>How Serious Buyers Actually Manage These Risks</h2>
      <p>The pattern across all eight risks is the same. The buyer who gets hurt treats the purchase as a single decision. The buyer who does well treats it as a sequence of decisions managed over years.</p>

      <ol>
        <li><strong>Stress-test before the showflat visit.</strong> Run your numbers at a 4.5% mortgage rate, a 6-month income gap, and a 10-year hold. If your plan only works on optimistic assumptions, it is not a plan.</li>
        <li><strong>Pick the unit, not the project.</strong> The right floor, stack, and layout in a mega project can outperform the project average by 15–25% over time. The wrong unit underperforms by the same margin.</li>
        <li><strong>Engage a property lawyer before OTP signing.</strong> Not after. Before. S$3,000 of legal review saves six-figure mistakes.</li>
        <li><strong>Have an explicit hold horizon.</strong> Write it down. Share it with your spouse or financial advisor. If the horizon is less than 7 years from purchase date, reconsider.</li>
        <li><strong>Build the buffer.</strong> Six months of housing costs in cash. Refinance review at TOP. Annual review of your overall financial position post-purchase.</li>
        <li><strong>Plan your exit before you enter.</strong> Who is your most likely resale buyer? What price would they pay in a base case, a bull case, a bear case? If you cannot answer these three questions, you have not done the work.</li>
      </ol>

      <h2>Frequently Asked Questions</h2>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What are the biggest risks of buying Thomson Reserve?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The three most material risks are personal-financial, not project-specific: quantum overstretch (buying at the top of your affordability), the 4-year SSD liquidity trap if life forces an early exit, and interest rate exposure during the BUC floating-rate period until TOP. Project-specific risks — construction delay, density, off-plan uncertainty — exist but are well-managed by the three-developer consortium and Singapore\'s regulatory framework. Market-policy risks dissolve on a 7+ year hold.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Should I avoid Thomson Reserve?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Avoid it if you are: a 5-year flipper expecting 30%+ gains, a buyer stretching to the absolute top of your TDSR ceiling, a second-property buyer paying 20% ABSD without a clear 10-year hold plan, or a foreigner paying 60% ABSD without multi-generational intent. For Singaporean first-property buyers, family upgraders with a 7–15 year horizon, and HDB upgraders with strong equity — Thomson Reserve is among the better-positioned launches of 2026 on a risk-adjusted basis.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is Thomson Reserve safe to invest in?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">"Safe" is the wrong question. "Suitable" is the right one. No Singapore property is risk-free. What Thomson Reserve offers is a well-mitigated risk profile: three SGX-listed developers, a fresh 99-year lease, three MRT lines, an SAP primary school catchment, and a 5-hectare site in one of Singapore\'s most established residential corridors. The risks are knowable, measurable, and largely manageable for a disciplined buyer.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What is the worst-case scenario for Thomson Reserve?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The realistic worst case is a 2030–2032 market downturn coinciding with personal financial stress, forcing a sale within the 4-year SSD window. In that scenario, a S$2.5M buyer might face 15–20% capital loss plus 8–12% SSD — a combined hit of S$500,000–S$800,000. The probability is low but not zero, and it is fully mitigable by buying within your real (not maximum) budget and holding past the SSD window. A catastrophic developer-level event is functionally a non-issue given the consortium and Singapore\'s Land Sales Disqualification Framework effective May 2026.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How can I reduce Thomson Reserve risks?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The four highest-leverage mitigations are: stress-testing your mortgage at 4.5% before purchase, building a 6-month all-in housing cost buffer, engaging a property lawyer before signing the OTP, and committing to a minimum 7-year hold to clear the SSD window. These four steps neutralise an estimated 80% of the buyer-side risk in a Singapore new launch purchase.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Are construction delays common for Singapore new launches?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Minor delays (3–6 months) are common; major delays (12+ months) are rare. The Singapore regulatory framework requires developers to deliver against contracted TOP dates with liquidated damages applicable for delays beyond contractual buffers. The new Land Sales Disqualification Framework effective 22 May 2026 imposes 5-year GLS and launch bans on developers who deliver defect-ridden or unsafe projects, which materially sharpens developer incentives. The Thomson Reserve consortium has no recent history of significant delays.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is Thomson Reserve too risky for first-time buyers?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Not necessarily — Singapore Citizen first-property buyers actually face the lowest risk profile. Zero ABSD, full CPF eligibility, and the most relaxed stamp duty position structurally insulate first-time buyers from most macro risks. The honest question is whether the quantum (S$1.75M+ for the smallest 2-bedder) fits your real budget. If it does, first-property buyers are in the best position. If it stretches you, look at smaller projects, ECs, or resale alternatives in nearby D20 or D26.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What if I cannot exit Thomson Reserve when I need to?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The SSD framework makes early exit costly but not impossible. Selling within 4 years of purchase triggers 4–16% SSD on the higher of selling price or market value. The realistic mitigation is to buy with an honest 7+ year hold horizon and maintain enough cash reserves to avoid forced sale. If your circumstances genuinely change, rental income (3% gross yield typical in District 20) can carry the holding cost while you wait out the SSD window.</p>
      </details>

      <h2>The Honest Bottom Line</h2>
      <p>Thomson Reserve carries real risks. We have named eight of them and looked each one in the face. The buyers walking away from this launch are not foolish — they are weighing their personal risk tolerance against an honestly uncertain four-year horizon and a market that has become structurally less forgiving of speculation.</p>

      <p>But honest risk assessment cuts both ways. The risks of buying Thomson Reserve are largely manageable: stress-test the mortgage, buy below your maximum, build the buffer, engage the lawyer, commit to a 7+ year hold. Do these things, and seven of the eight risks above shrink from "danger" to "exposure you have planned for."</p>

      <p>The risks of not buying — of waiting in cash, of paying a 20–30% premium on the next launch in the same corridor, of missing the entry point on a fresh-99 development at three MRT lines with an SAP school in the 1km zone — those risks rarely get listed. But they are real too. The Singaporean who avoided every new launch from 2018 to 2022 is now paying significantly more for a smaller, older unit than the buyer who went in carefully at Jadescape or Lentor Modern.</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">The Bottom Line</p>
        <p class="text-sm text-violet-800">If you are one of the prepared — hold horizon locked in, buffer built, numbers stress-tested — the eight risks above are not reasons to avoid Thomson Reserve. They are the work you do before you say yes. If you are not yet one of the prepared, the eight risks above are the work to do before the showflat visits, regardless of which project you eventually buy.</p>
      </div>

      <p><em>Last updated: June 2026. All figures indicative based on publicly available market data. Verify all stamp duty rates with <a href="https://www.iras.gov.sg" target="_blank" rel="noopener">IRAS</a> and consult licensed mortgage and legal professionals before transacting.</em></p>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/thomson-reserve-price-review-2026" onclick="showArticle(\'post-thomson-reserve-price-review-2026\'); return false;" class="underline hover:text-violet-700"><strong>Thomson Reserve Price Review 2026: Is It Really Too Expensive?</strong></a></p>
      <p>2. <a href="/insights/new-launch-vs-resale" onclick="showArticle(\'post-new-launch-vs-resale\'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo in 2026: Which Should You Buy?</strong></a></p>
      <p>3. <a href="/insights/how-to-buy-new-launch-2026" onclick="showArticle(\'post-how-to-buy-new-launch-2026\'); return false;" class="underline hover:text-violet-700"><strong>How to Buy a New Launch Condo in Singapore: Step-by-Step 2026 Guide</strong></a></p>
      <p>4. <a href="/insights/hdb-vs-ec-vs-private-property-2026" onclick="showArticle(\'post-hdb-vs-ec-vs-private-property-2026\'); return false;" class="underline hover:text-violet-700"><strong>HDB vs EC vs Private Property: 2026 Comparison</strong></a></p>
      <p>5. <a href="/project/thomson-reserve-condo/" class="underline hover:text-violet-700"><strong>Full Thomson Reserve Project Page (Deep Analysis)</strong></a></p>
    `
  },

  /* ======================================================
     ARTICLE — IPA NEW LAUNCH GUIDE
  ====================================================== */
  'post-ipa-new-launch-2026': {
    title: 'The Dumbest Mistake Before a New Launch Condo: Skipping the IPA',
    date: '16 Jul 2026',
    readTime: '18 min read',
    category: 'FINANCING',
    chipClass: 'chip-finance',
    img: null,
    linkedinUrl: null,
    body: `
      <p><strong>The single most expensive mistake I see Singapore buyers make at a new launch is not the unit they pick, the stack they queue for, or the psf they pay.</strong> It is walking into a showflat, getting swept up in the energy, writing a cheque for 5% of the price, and only <em>then</em> asking a banker how much they can borrow.</p>

      <p>That single decision — booking first, borrowing second — is why some buyers end up losing <strong>1.25% of the purchase price</strong> without owning anything. On a $2 million unit, that is <strong>$25,000 gone</strong>. On a $2.5 million unit, <strong>$31,250</strong>. No keys, no unit, no refund of that portion. Just a lesson.</p>

      <p>In this guide, I want to walk you through what an In-Principle Approval (IPA) actually is, why so many otherwise smart Singaporeans skip it, the real numbers behind the 1.25% forfeit rule, and the six situations where "I thought I could borrow that much" quietly becomes "the bank says no."</p>

      <h2>Quick Answer: What Is an IPA and Why Does It Matter Before Booking?</h2>

      <p>An <strong>In-Principle Approval (IPA)</strong> — sometimes still called an <strong>Approval-in-Principle (AIP)</strong> — is a written statement from a bank telling you how much they are willing to lend you for a property purchase, based on your income, credit record, existing debts, age, and the maximum loan tenure they allow. It is not the final loan approval, but it is very close to it. Most IPAs are valid for <strong>30 days</strong>, sometimes extendable to 60.</p>

      <p>Here is why it matters at a new launch. When you book a unit from the developer, you sign an <strong>Option to Purchase (OTP)</strong> and hand over <strong>5% of the purchase price</strong> in cash. You then have <strong>three weeks (21 days)</strong> to exercise that Option by signing the Sale &amp; Purchase Agreement.</p>

      <p>If you fail to exercise within that window — including because your bank refuses to lend you what you assumed — the developer keeps <strong>25% of your 5% booking fee</strong>. That works out to <strong>1.25% of the purchase price</strong> forfeited, with the remaining 3.75% refunded. That rule is standard across all new launches under the Housing Developers Rules, confirmed by both URA and industry sources.</p>

      <div class="key-takeaway">
        <p class="font-bold text-violet-900 mb-1">The bottom line</p>
        <p class="text-sm text-violet-800">An IPA closes the forfeit risk <em>before</em> you sign anything. Skipping it is not a small oversight. It is the most preventable, most expensive misstep in the entire new-launch journey.</p>
      </div>

      <h2>The 1.25% Math: What Losing Your Booking Fee Actually Looks Like</h2>

      <table>
        <thead><tr><th>Purchase Price</th><th>5% Booking Fee (Cash)</th><th>25% Forfeited if OTP Lapses</th><th>You Get Back</th></tr></thead>
        <tbody>
          <tr><td>$1,200,000</td><td>$60,000</td><td><strong>$15,000</strong></td><td>$45,000</td></tr>
          <tr><td>$1,600,000</td><td>$80,000</td><td><strong>$20,000</strong></td><td>$60,000</td></tr>
          <tr><td>$1,800,000</td><td>$90,000</td><td><strong>$22,500</strong></td><td>$67,500</td></tr>
          <tr><td>$2,200,000</td><td>$110,000</td><td><strong>$27,500</strong></td><td>$82,500</td></tr>
          <tr><td>$2,800,000</td><td>$140,000</td><td><strong>$35,000</strong></td><td>$105,000</td></tr>
          <tr><td>$3,500,000</td><td>$175,000</td><td><strong>$43,750</strong></td><td>$131,250</td></tr>
        </tbody>
      </table>

      <p>That loss is not the end of the story either. If you had already paid legal fees to your conveyancing lawyer (typically $2,500 to $3,500), that is gone too. Renovation quotes, time off work, childcare deposits — sunk costs on top.</p>

      <h2>The Dumbest Reasons Singaporeans Skip IPA (And Why Each One Bites Back)</h2>

      <h3>Reason 1: "I earn enough. The bank will definitely lend me 75%."</h3>
      <p>This is by far the most common misread. Singaporeans see the headline: <strong>maximum LTV is 75% of purchase price for a first bank loan</strong>. So on a $1.8M condo, that is a $1.35M loan. Easy.</p>
      <p>Except the bank does not lend against price. The bank lends against <strong>the lower of purchase price or valuation</strong>, subject to your <strong>Total Debt Servicing Ratio (TDSR) of 55%</strong>, calculated at the MAS <strong>stress-test interest rate of 4%</strong>.</p>
      <p>Two things quietly kill your loan quantum:</p>
      <ul>
        <li><strong>Existing debts.</strong> Car loan, student loan, credit card minimums (banks assume 3% of outstanding balance monthly), personal loans, co-signed loans — all come off the top of your 55% ceiling.</li>
        <li><strong>How the bank recognises your income.</strong> If a chunk of your income is commission, bonus, or self-employed revenue, the bank applies a <strong>30% haircut</strong>. That $10,000 per month becomes $7,000 recognised. Freelancers may face a 2-year NOA average.</li>
      </ul>
      <p>I have seen a household grossing $16,000 per month get an IPA of only $980,000 — not because they were poor, but because they had a car loan plus a joint personal loan from renovating their HDB. They assumed they could stretch to a $1.6M new launch. The gap: nearly $500,000 they did not know existed. Without an IPA, they would have found out on the day the bank said no.</p>

      <h3>Reason 2: "The IPA is only valid for 30 days, so why bother early?"</h3>
      <p>A technically true statement used to justify a wildly untrue conclusion. Yes, IPAs typically expire in 30 days. But that is a reason to <em>time</em> it, not skip it.</p>
      <p>The practical sequence for a launch you are serious about:</p>
      <ol>
        <li>Two to three weeks before Booking Day: submit your documents to two or three banks in parallel.</li>
        <li>Get your IPAs back within 3 to 7 working days.</li>
        <li>Use them to confirm your maximum loan quantum, monthly instalment at the 4% stress rate, and the true cash-plus-CPF outlay.</li>
        <li>Attend Booking Day knowing exactly what you can commit to.</li>
        <li>Once the OTP is signed, firm up the Letter of Offer with your chosen bank — comfortably within the IPA validity.</li>
      </ol>
      <p>The IPA is not a document you file and forget. It is a <strong>decision-making tool for Booking Day</strong>.</p>

      <h3>Reason 3: My agent told me I qualify.</h3>
      <p>I need to say this plainly, even though I am a licensed agent myself: no property agent can approve your loan. We can run affordability estimates. We can help you cross-check TDSR headroom. We can flag obvious red lights. But we cannot see your credit bureau report. We do not know if you were 45 days late on a credit card bill last November. We cannot tell you which bank will apply a 30% or 40% haircut on your rental income.</p>
      <p>Only a banker or mortgage broker running the actual submission can tell you what a <em>specific</em> bank will actually approve. Anyone who tells you otherwise — including someone whose commission depends on you booking — is telling you what they hope is true, not what a bank will underwrite.</p>

      <h3>Reason 4: I do not want to keep pulling my credit report.</h3>
      <p>In Singapore, property loan-related inquiries within a short window are generally treated as rate-shopping and do not penalise you the way six credit card applications in three months would. More importantly, the alternative is far worse. Losing $22,500 on a forfeited booking fee is a bank-balance hit of exactly $22,500. Take the small, mostly-imaginary reputational cost over the very real cash cost.</p>

      <h3>Reason 5: There is a queue. If I hesitate, I lose the unit.</h3>
      <p>This is the psychological trap, and it is by far the most Singaporean of them all. On Booking Day, developers deliberately engineer scarcity: e-App submissions, staggered queue numbers, real-time unit boards where you can see stacks turning red. Everyone around you is in suits, holding cheques, whispering into phones.</p>
      <p>Here is the reframe: <strong>the market will always launch another project.</strong> Between 2020 and 2026, Singapore has averaged 8,000 to 12,000 new launch units a year. In H2 2026 alone, up to 11 new condo projects totalling around 3,550 units are lined up to launch. Missing this one unit will feel like the end of the world for about six weeks. Losing $22,500 on a forfeit will follow you for years.</p>

      <h3>Reason 6: I will just cancel the OTP if the loan does not come through.</h3>
      <p>The word "just" is doing an enormous amount of work in that sentence. You can walk away from the OTP within three weeks — but 25% of your booking fee (1.25% of purchase price) is gone. There is no "just" about it.</p>
      <p>Worse: if you <em>do</em> exercise the OTP but then cannot complete because the loan collapses later, you lose the full 5% deposit, potentially face legal action from the developer, and could be sued for damages if they resell at a lower price. There is no clean escape hatch after Booking Day. Only degrees of loss.</p>

      <h2>What Actually Goes Wrong When You Skip IPA: Six Real Scenarios</h2>

      <p><strong>1. The commission earner surprise.</strong> A sales manager grossing $14,000 per month (basic $6,000 plus commission $8,000) assumed a $1.6M loan was safe. Bank recognised income: $6,000 plus ($8,000 times 70%) = $11,600 per month. His TDSR limit dropped his maximum loan by about $350,000. He had booked a $2.2M unit.</p>

      <p><strong>2. The car loan blind spot.</strong> A young doctor and his lawyer wife, combined income $22,000 per month. They had a $1,900 per month car loan and $850 per month combined credit card minimums. Their TDSR headroom for the mortgage instalment was $9,350 per month. At the 4% stress rate over 30 years, that services about $1.96M. They booked a $2.6M unit. Gap: roughly $200,000. They had to pledge fixed deposits for four years to bridge it — an option only known to those who had asked a banker in advance.</p>

      <p><strong>3. The age-tenure cap.</strong> A 52-year-old executive booked a $1.9M unit assuming a 30-year loan. For full LTV, borrower age plus loan tenure must not exceed 65 for private property. He was capped at a 13-year tenure for full 75% LTV, or he could stretch to 25 years but with LTV falling to 55%. Either way, his cash outlay ballooned by $340,000 he did not have.</p>

      <p><strong>4. The existing HDB loan trap.</strong> A couple booked a $2M new launch as their upgrader with an outstanding HDB loan still running. Because this counted as a <strong>second housing loan</strong>, their LTV was capped at <strong>45%</strong>, not 75%. Their cash-plus-CPF requirement jumped from $500,000 to $1.1M — plus $400,000 in ABSD upfront that they had not budgeted for.</p>

      <p><strong>5. The variable-rate reality shock.</strong> A self-employed shop owner declared $15,000 per month gross. Bank looked at two years of Notice of Assessment: $9,200 average. His actual recognisable income: $9,200 times 70% = $6,440. His loan approval came in at less than half of what he expected.</p>

      <p><strong>6. The credit bureau ghost.</strong> A perfectly-earning IT director had a $147 outstanding balance on a credit card from 2023 that he thought he had cancelled. Late fee interest had compounded. His CBS score had dropped from A to C. Two banks declined. The third would only offer a smaller quantum at a higher spread. He almost lost his booking fee before a mortgage broker cleaned up the record.</p>

      <p>Every one of these was fixable <em>before</em> Booking Day. None was fixable after.</p>

      <h2>What an IPA Actually Checks</h2>
      <ul>
        <li><strong>TDSR calculation</strong> — total monthly debt (new mortgage plus all existing debts) against 55% of recognised gross monthly income, at the 4% stress rate.</li>
        <li><strong>MSR check</strong> — only for HDB flats and ECs; 30% cap on housing loan instalment. Not applicable to private new launch condos.</li>
        <li><strong>LTV determination</strong> — 75% first housing loan, 45% second, 35% third and beyond. Subject to loan tenure and age caps.</li>
        <li><strong>Income recognition</strong> — how much of basic, variable, rental, and bonus income they will count, and at what haircut.</li>
        <li><strong>Credit bureau review</strong> — CBS score, payment history, outstanding facilities, any late-payment flags.</li>
        <li><strong>Age and tenure sizing</strong> — maximum 30 years for private property, 25 years for HDB. Full LTV requires age plus tenure not exceeding 65.</li>
        <li><strong>Pledged asset boost (optional)</strong> — pledge liquid assets for 48 months to lift recognised monthly income. Underused but genuinely powerful when TDSR is tight.</li>
      </ul>

      <h2>Practical IPA Timeline for Serious Buyers</h2>

      <p><strong>Four to six weeks before Booking Day:</strong> Gather documents. Salaried: NRIC, 3 latest payslips, 15-month CPF contribution history, latest NOA. Variable-income: add 2 years of NOAs, 6 months of bank statements showing salary credits. If you have existing property loans, prepare the latest loan statements.</p>

      <p><strong>Three to four weeks before Booking Day:</strong> Approach at least <strong>two or three banks</strong> in parallel — either directly or through an independent mortgage broker. Banks vary meaningfully in how they treat variable income, credit bureau flags, and package pricing. Getting only one IPA is like getting a second opinion from only one doctor.</p>

      <p><strong>Two weeks before Booking Day:</strong> Review your IPAs. Understand your maximum loan quantum, monthly instalment at the 4% stress rate, and your true cash-plus-CPF outlay. Know the gap between what you can afford and what the launch is asking.</p>

      <p><strong>Booking Day:</strong> Attend with a clear price ceiling. If the unit falls within your IPA quantum, book with confidence. If it does not, walk away without regret. The IPA turns Booking Day from a gamble into a decision.</p>

      <p><strong>Within three weeks after booking:</strong> Firm up the Letter of Offer with your chosen bank before you exercise the OTP.</p>

      <h2>Damage Control: What to Do If You Already Booked Without an IPA</h2>

      <p>If you are reading this after the cheque has already been written, do not panic — but move fast. You have three weeks.</p>
      <ul>
        <li><strong>Get your documents to two or three bankers today.</strong> Not tomorrow. Every day burned is a day off your 21-day exercise window.</li>
        <li><strong>Be brutally honest about every debt.</strong> Undisclosed debts are the number one reason IPAs are rejected at the eleventh hour. Include car loans, personal loans, credit lines you have as guarantor — everything.</li>
        <li><strong>Ask about pledging assets.</strong> Pledging $200,000 in fixed deposits for 48 months adds about $4,167 per month to your recognised income and can save the deal.</li>
        <li><strong>Consider a shorter tenure.</strong> Sometimes a 25-year tenure passes TDSR when 30 years does not.</li>
        <li><strong>Have your lawyer request a short extension if needed.</strong> The developer is not obligated to grant it, but for buyers who show good-faith bank progress, it happens. Speak through your lawyer, not directly.</li>
      </ul>
      <p>If, after all of this, the loan will not come through — walk away from the OTP. Lose the 1.25%. Do <strong>not</strong> exercise the SPA hoping the loan will magically arrive. That is how 1.25% turns into 5% and beyond.</p>

      <h2>Common IPA Myths, Politely Dismantled</h2>

      <p><strong>IPA means the loan is guaranteed.</strong> It does not. The IPA is subject to final property valuation, document verification at drawdown, and no material change in your financial situation. If you resign between IPA and drawdown, the offer can be withdrawn. Sit tight in your job until the loan is fully drawn.</p>

      <p><strong>One IPA is enough.</strong> It should not be. Two to three lets you compare quantum, rate, and package flexibility. A 0.2% per annum rate difference on a $1.5M loan over 30 years is roughly $60,000 in interest.</p>

      <p><strong>Getting IPA commits me to that bank.</strong> It does not. IPA is non-binding on you. You can convert any IPA into a loan by accepting the Letter of Offer, or let it lapse.</p>

      <p><strong>I already got IPA for my last property, so I am covered.</strong> An IPA is a snapshot of your finances on the day of assessment. If it is more than 30 days old, or if your income, debts, or credit have changed, it is not usable. Get a fresh one for each transaction.</p>

      <p><strong>Cash buyers do not need IPA.</strong> True — but genuine cash buyers are rare. If you plan to use CPF, still confirm your CPF OA balance against withdrawal limits, and check whether the remaining lease meets CPF usage rules.</p>

      <h2>The Bigger Picture: Why This Discipline Compounds</h2>

      <p>The buyers who consistently do well in Singapore property are not the ones who spot the hottest launch. They are the ones who know their number, hold to it, and never let showflat pressure move it.</p>

      <p>An IPA is not just a form. It is the moment you convert vague affordability into a specific ceiling. From that ceiling, everything else falls into place: which projects are realistic, which stacks and unit sizes to shortlist, which financing package fits, how much you set aside for renovation and reserves. Without it, you are gambling with your 5% cheque.</p>

      <p>The 2026 pipeline is generous. There is no scarcity crisis that justifies booking without an IPA. There is only the pressure of the room, which is designed to feel urgent because urgency is what makes new launches sell out on Booking Day. Slow down by two weeks. Get your IPAs. Walk in knowing what you can commit to.</p>

      <h2>FAQ: IPA and New Launch Condos in Singapore</h2>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          How long does it take to get an IPA in Singapore?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Typically 3 to 7 working days from the point you submit complete documents. Variable-income cases and second-property applications can take up to 2 weeks. Start at least 3 weeks before Booking Day.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Does getting IPA cost money?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">No. Banks do not charge for IPAs. Mortgage brokers in Singapore are paid by the bank on successful drawdown, not by you.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is IPA the same as pre-approval or AIP?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes. In Singapore, IPA (In-Principle Approval) and AIP (Approval in Principle) refer to the same document. Banks use both terms interchangeably.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Can I get IPA from more than one bank?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes, and you should. Two to three IPAs let you compare quantum and package pricing. Property loan inquiries within a short window are treated as rate-shopping by the Credit Bureau and do not meaningfully damage your score.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What documents do I need for an IPA?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">NRIC, 3 latest payslips, latest CPF contribution statement (12 to 15 months), latest income tax Notice of Assessment, and for variable-income earners or self-employed, 2 years of NOAs plus 6 months of bank statements. Add existing loan statements if applicable.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Is IPA required for HDB or EC purchases too?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">For HDB flats, HDB issues an HDB Loan Eligibility (HLE) letter, which serves the equivalent purpose for HDB loans. For bank loans on HDB or EC, get a bank IPA. For ECs, MSR (30%) applies on top of TDSR (55%).</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          Can I still lose my booking fee even if I have an IPA?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">Yes, but the risk is dramatically lower. IPA is not final approval — the loan is still subject to property valuation and unchanged financial circumstances. Do not resign, take on new debt, or change your employment structure between IPA and drawdown.</p>
      </details>

      <details class="faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden">
        <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition">
          What if my valuation comes in below the purchase price?
          <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
        </summary>
        <p class="px-4 pb-4 text-sm text-slate-600">The bank lends against the lower of price or valuation. Any shortfall must be topped up in cash. For new launches, valuations are usually aligned with the developer price at launch — but not always. Another reason to have IPA headroom, not just the exact number.</p>
      </details>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/new-launch-vs-resale" onclick="showArticle(\'post-new-launch-vs-resale\'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo 2026: Which Should You Buy?</strong></a></p>
      <p>2. <a href="/insights/progressive-payment-psychology" onclick="showArticle(\'post-progressive-payment-psychology\'); return false;" class="underline hover:text-violet-700"><strong>How the Progressive Payment Scheme Works for New Launch Condos</strong></a></p>
      <p>3. <a href="/insights/hdb-phantom-fear" onclick="showArticle(\'post-hdb-phantom-fear\'); return false;" class="underline hover:text-violet-700"><strong>HDB Upgraders: Are You Trapped by Your Own Phantom Fear? (2026 Edition)</strong></a></p>
      <p>4. <a href="/insights/how-to-buy-new-launch-2026" onclick="showArticle(\'post-how-to-buy-new-launch-2026\'); return false;" class="underline hover:text-violet-700"><strong>How to Buy a New Launch Condo in Singapore: Step-by-Step 2026 Guide</strong></a></p>
      <p>5. <a href="/mortgage-calculator/" onclick="showPage(\'mortgage-calculator\'); return false;" class="underline hover:text-violet-700"><strong>Check your affordability with our Singapore Mortgage Calculator</strong></a></p>

      <div class="key-takeaway" style="margin-top:2rem">
        <p class="font-bold text-violet-900 mb-2">A Final Note</p>
        <p class="text-sm text-violet-800">If you are serious about a 2026 launch — Lentor Gardens Residences, Thomson Reserve, Dunearn House, or any resale — the single most valuable two weeks you can spend is the ones <em>before</em> Booking Day, sitting with two or three bankers and getting your IPAs in writing. I run free 30-minute consultations — no obligation, no hard sell.</p>
        <p class="text-sm text-violet-800 mt-2"><a href="/contact/" onclick="showPage(\'contact\'); return false;" class="underline font-semibold">Contact Jack</a></p>
      </div>

      <p><em>Last updated: July 2026. TDSR, LTV, ABSD rates, and OTP forfeiture rules cited are current as of July 2026 per MAS and URA guidelines. Verify all figures before transacting. CEA Licence L3008022J (PropNex Realty Pte Ltd).</em></p>
    `
  },

  /* ======================================================
     ARTICLE — HDB VS CONDO AFFORDABILITY 2026
  ====================================================== */
  'post-hdb-vs-condo-affordability-2026': {
    title: 'Can I Afford a $1.7M Condo If I Can Afford a $970k HDB? A Singapore Affordability Reality Check',
    date: '17 Jul 2026',
    readTime: '8 min read',
    category: 'HDB UPGRADERS',
    chipClass: 'chip-buyer',
    img: 'insights/hdb-vs-condo-affordability-2026.jpg',
    linkedinUrl: null,
    body: `
      <div class="tldr">
        <div class="tag">The Short Answer</div>
        <h2>Yes &mdash; in most cases, if you can afford the HDB, you can afford the condo too.</h2>
        <p>Under the Monetary Authority of Singapore's stress-test rules (4.0% floor rate), a <strong>$1,700,000 private condo</strong> requires a minimum gross household income of <strong>$11,067 per month</strong> to qualify. A <strong>$970,000 HDB resale flat</strong> requires <strong>$12,800 per month</strong>. The condo needs <strong>$1,733 LESS</strong> in monthly income because it falls under TDSR (55% cap) instead of MSR (30% cap), and permits a 30-year loan tenure versus 25 years for HDB resale bank loans at maximum LTV. Whether you <em>should</em> stretch to the condo is a separate question &mdash; this article walks through both sides.</p>
      </div>

      <p>It's the most common misconception I hear at first buyer consultations: "I can only afford the HDB, so the condo is off the table." When we run the numbers using the Monetary Authority of Singapore's actual affordability rules, the picture almost always looks different. This isn't a spin or a sales trick &mdash; it's a direct consequence of how MAS structures debt-servicing limits and loan tenures differently for public and private housing.</p>

      <p>This article walks through the full comparison between a $970,000 HDB resale flat and a $1,700,000 private resale condominium in Singapore, using 2026 rates and rules. I'll show you the affordability math, the upfront cash and CPF requirements, why the counter-intuitive result happens, and &mdash; importantly &mdash; the trade-offs you must accept if you decide to stretch. Every regulatory figure in this piece is cited against MAS, IRAS, HDB, or CPF sources at the end.</p>

      <h2>How affordability is actually assessed in Singapore</h2>

      <p>Before comparing the two properties, it helps to understand what a bank actually checks when deciding how much you can borrow. There are three levers that determine your maximum loan quantum in Singapore:</p>

      <ol>
        <li><strong>Loan-to-Value (LTV) ratio</strong> &mdash; how much of the property price the bank will finance. For a first housing loan with a tenure of 30 years or less (and where the loan ends before you turn 65), the cap is 75%. You put down the remaining 25%.</li>
        <li><strong>Debt-servicing ratio</strong> &mdash; how much of your gross income can go toward loan repayment. For HDB flats and Executive Condominiums, this is the Mortgage Servicing Ratio (MSR) at 30%. For private property, it's the Total Debt Servicing Ratio (TDSR) at 55%.</li>
        <li><strong>Stress-test interest rate</strong> &mdash; the "medium-term interest rate floor" MAS requires banks to use when sizing your loan. Since 30 September 2022, this has been <strong>4.0% per annum for bank loans</strong> and 3.0% for HDB concessionary loans, regardless of the actual promo rate offered.</li>
      </ol>

      <div class="qa-box">
        <div class="lbl">Quick Answer</div>
        <p><strong>Why does MAS stress-test at 4%?</strong> Property loans are long-term commitments and typically households' largest liability. MAS requires banks to size your maximum loan as if you were paying 4% p.a., even if your actual rate is currently 1.4%. This ensures you can still service the loan if rates rise significantly over the next 25 to 30 years.</p>
      </div>

      <p>Both frameworks apply the same 4% stress floor. So on the surface, you might expect the more expensive property to require more income. Let's see what actually happens.</p>

      <h2>Head-to-head: $970k HDB vs $1.7M condo affordability</h2>

      <p>Assumptions used throughout: buyer age 35, Singapore Permanent Resident buying first residential property, 75% LTV bank loan, no other outstanding debt, and July 2026 promotional bank rates.</p>

      <div class="data-tbl">
        <table>
          <caption>Table 1: Affordability framework side-by-side (MAS stress-test basis)</caption>
          <thead>
            <tr>
              <th>Metric</th>
              <th>$970k HDB Flat (Bank Loan)</th>
              <th class="condo-col">$1.7M Private Condo</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="metric">Purchase Price</td><td>$970,000</td><td>$1,700,000</td></tr>
            <tr><td class="metric">Maximum Loan (75% LTV)</td><td>$727,500</td><td>$1,275,000</td></tr>
            <tr><td class="metric">Maximum Loan Tenure at 75% LTV</td><td>25 years</td><td>30 years</td></tr>
            <tr><td class="metric">Debt-Servicing Cap</td><td>30% MSR</td><td>55% TDSR</td></tr>
            <tr><td class="metric">MAS Stress-Test Rate</td><td>4.0% p.a.</td><td>4.0% p.a.</td></tr>
            <tr><td class="metric">Stress-Tested Monthly Instalment</td><td>$3,840</td><td>$6,087</td></tr>
            <tr class="hl"><td class="metric">Minimum Gross Monthly Income</td><td>$12,800</td><td>$11,067</td></tr>
            <tr><td class="metric">Actual Bank Rate (Jul 2026)</td><td>~1.45% p.a.</td><td>~1.35% p.a.</td></tr>
            <tr><td class="metric">Actual Monthly Bank Instalment</td><td>$2,892</td><td>$4,309</td></tr>
          </tbody>
        </table>
      </div>

      <div class="barviz">
        <div class="bv-row">
          <div class="bv-lbl">$970k HDB<small>MSR 30% &middot; 25-year</small></div>
          <div class="bv-track"><div class="bv-fill f-navy" style="width:100%">$12,800</div></div>
          <div class="bv-amt">/ month</div>
        </div>
        <div class="bv-row">
          <div class="bv-lbl">$1.7M Condo<small>TDSR 55% &middot; 30-year</small></div>
          <div class="bv-track"><div class="bv-fill f-brass" style="width:86.5%">$11,067</div></div>
          <div class="bv-amt">/ month</div>
        </div>
        <div class="bv-cap">Minimum gross household income required under MAS stress-test rules. The condo requires <strong>$1,733 LESS per month</strong> despite costing $730,000 more.</div>
      </div>

      <h2>Why does the condo need less qualifying income than the HDB?</h2>

      <p>The result surprises most first-time buyers because it inverts the intuition that "more expensive equals harder to afford." Two regulatory levers produce the crossover:</p>

      <h3>Lever 1: TDSR 55% is more permissive than MSR 30%</h3>
      <p>Mortgage Servicing Ratio (MSR) restricts your monthly housing loan repayment to 30% of gross monthly income and applies only to HDB flats and Executive Condominiums. Total Debt Servicing Ratio (TDSR) caps total monthly debt at 55% and applies to all property loans, public and private.</p>

      <p>Even though TDSR counts all your debt obligations (car loan, credit card minimums, personal loan repayments), if a buyer has no other significant debt, they effectively get to use up to 55% of gross income for the mortgage. That's 25 percentage points more headroom than MSR gives.</p>

      <div class="qa-box">
        <div class="lbl">Quick Answer</div>
        <p><strong>Does the same buyer qualify under both frameworks?</strong> Yes, but the maximum loan sizes differ dramatically. On $12,800/month gross income, MSR allows $3,840/month of mortgage servicing while TDSR would allow up to $7,040/month (assuming no other debt). That's why private property affordability scales up much faster with income.</p>
      </div>

      <h3>Lever 2: 30-year tenure vs 25-year tenure</h3>
      <p>Under MAS rules, HDB resale bank loans are capped at <strong>25 years</strong> at full 75% LTV, while private property bank loans allow up to <strong>30 years</strong>. Longer tenures are technically possible (up to 30 years for HDB and 35 years for private property) but LTV drops from 75% to 55% &mdash; requiring a much larger downpayment.</p>

      <p>Those five extra years matter. Spreading the same principal amount over 60 more monthly instalments materially reduces the stress-tested monthly payment used in the income test. Combined with the more generous debt cap, the effect more than compensates for the larger loan quantum.</p>

      <h2>What about the upfront cash? A full breakdown</h2>

      <p>Loan qualification is one hurdle. Funding the downpayment and stamp duties is another. Here's what each option actually costs on Day One, calculated using IRAS's current 2026 stamp duty tables and standard conveyancing costs.</p>

      <div class="data-tbl">
        <table>
          <caption>Table 2: Total upfront outlay comparison (Singapore PR, 1st property)</caption>
          <thead>
            <tr>
              <th>Cost Item</th>
              <th>$970k HDB (bank loan)</th>
              <th class="condo-col">$1.7M Private Condo</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="metric">Downpayment (25%)</td><td>$225,000<br><small style="color:#6b6b6b">based on $900k valuation</small></td><td>$425,000</td></tr>
            <tr><td class="metric">&nbsp;&nbsp;of which minimum cash</td><td>$45,000 (5%)</td><td>$85,000 (5%)</td></tr>
            <tr><td class="metric">&nbsp;&nbsp;of which CPF-OA eligible</td><td>Up to balance of 25%</td><td>Up to $340,000 (20%)</td></tr>
            <tr><td class="metric">Cash Above Valuation</td><td>$70,000 (cash only)</td><td>Not applicable in this scenario</td></tr>
            <tr><td class="metric">Buyer's Stamp Duty (BSD)</td><td>$23,700</td><td>$54,600</td></tr>
            <tr><td class="metric">Additional Buyer's Stamp Duty (ABSD)</td><td>$0 (1st property)</td><td>$85,000 (5% PR 1st property)</td></tr>
            <tr><td class="metric">Legal, valuation, agent fees</td><td>~$13,300</td><td>~$2,500</td></tr>
            <tr class="hl"><td class="metric">Total Purchase Outlay</td><td>$331,973</td><td>$567,100</td></tr>
          </tbody>
        </table>
      </div>

      <p>The condo requires roughly <strong>$235,000 more in total outlay</strong>. But the composition of that outlay matters more than the headline number:</p>

      <ul>
        <li><strong>$340,000 of the condo downpayment is CPF-eligible.</strong> For most working buyers who've contributed to CPF for a decade or more, this is money that's already earmarked for housing under CPF rules &mdash; parked in the Ordinary Account earning 2.5% p.a. Redeploying it into a private asset in your name is not "more cash out" so much as "more CPF put to work."</li>
        <li><strong>The HDB scenario shown includes $70,000 in Cash Above Valuation.</strong> When the transacted price exceeds HDB's valuation (here, $970k vs $900k), the shortfall must be paid in cash &mdash; it cannot use CPF or loan. This is a common feature of the current resale HDB market and eats into the perceived cash advantage of HDB.</li>
        <li><strong>ABSD 5% for a PR 1st property is $85,000</strong> on the $1.7M condo &mdash; a real cost. If the buyer were a Singapore Citizen (0% ABSD on first property), that difference disappears entirely.</li>
      </ul>

      <div class="info-note">
        <strong>Bank loan verified numbers.</strong> On a $1,275,000 loan over 30 years at 1.33% (Maybank SORA package, July 2026), the actual monthly instalment is $4,297. On a $675,000 HDB bank loan over 25 years at 1.41%, monthly instalment is $2,671. These figures are drawn directly from live PropNex Business Suite calculations run in July 2026.
      </div>

      <h2>The long view: why the higher monthly payment is not just an expense</h2>

      <p>At today's rates, the condo commits you to roughly <strong>$1,400 more per month</strong> in mortgage repayment than the HDB. That number needs unpacking, because a meaningful portion of every repayment is <em>principal</em> &mdash; equity built in a hard asset in your own name, not interest expense paid to the bank.</p>

      <div class="dark-call">
        <h3>The forced-savings argument, honestly framed</h3>
        <p>Think of the extra monthly commitment as a <em>disciplined savings vehicle</em> parked in Singapore real estate. It is non-negotiable (unlike voluntary savings), hedged against long-term inflation, and secured by an asset that has historically appreciated over full market cycles.</p>
        <p>The trade-off is real: higher monthly commitment demands financial discipline and a healthy cash buffer. But over a 20- to 30-year horizon, the outcome is a materially larger net-asset position &mdash; provided the buyer stays employed and the property performs in line with the private market's long-run trend.</p>
      </div>

      <h3>What the long-term data actually shows</h3>

      <p>Both the URA Private Residential Property Price Index and the HDB Resale Price Index are rebased to 1Q 2009 = 100. As at 4Q 2025 (the latest full quarter data from SingStat):</p>

      <ul>
        <li><strong>URA Private Residential Price Index: 216.4</strong> &mdash; up 116% from 2009</li>
        <li><strong>HDB Resale Price Index: 203.6</strong> &mdash; up 104% from 2009</li>
      </ul>

      <p>Over 17 years, private residential has outperformed HDB resale by roughly <strong>13 index points</strong>, or around 12 percentage points cumulative outperformance. In Q1 2026, HDB resale prices posted their first quarterly decline in nearly seven years while private prices continued to rise. Structural factors matter: HDB flats face MOP restrictions, ethnic quotas at resale, 99-year lease decay, and policy interventions when prices climb too fast. Private residential has none of these caps.</p>

      <p>None of this is a guarantee of future returns. But it does inform a straightforward analytical view: <strong>if wealth accumulation is a real objective alongside own-stay, the private market gives you a vehicle designed to appreciate. Public housing is designed to remain affordable, which is a fundamentally different mandate.</strong></p>

      <h2>The trade-offs you must accept if you stretch to the condo</h2>

      <p>The math above is real. It is also incomplete. Here are the concrete downsides of moving from a $970k HDB to a $1.7M private condo:</p>

      <h3>Cash flow and liquidity</h3>
      <ul>
        <li>Actual monthly repayment is <strong>~$1,400 higher</strong> at today's rates &mdash; and rates can move up. If SORA rises 100 basis points, that gap widens by roughly $600/month.</li>
        <li>Condo maintenance fees typically run $300 to $600 per month depending on the estate &mdash; the HDB service and conservancy charge is a fraction of this.</li>
        <li>Property tax scales with annual value; on a $1.7M condo occupied by owner, property tax is materially higher than on a $970k HDB.</li>
      </ul>

      <h3>Upfront capital</h3>
      <ul>
        <li>Mandatory 5% cash of $85,000 vs $45,000 for HDB.</li>
        <li>ABSD 5% adds $85,000 for a PR &mdash; this money is a pure sunk cost.</li>
        <li>Higher BSD adds $30,900 relative to the HDB.</li>
      </ul>

      <h3>Market risk</h3>
      <ul>
        <li>Private property prices have <strong>historically appreciated more but with higher volatility</strong>. The 2018 cooling measures and 2023 ABSD hike both produced short-term market softness.</li>
        <li>Historical outperformance is not a guarantee. If you must sell during a soft cycle, the equity gain evaporates.</li>
      </ul>

      <div class="info-note warn">
        <strong>Important caveat for PR-only households.</strong> The HDB concessionary loan at 2.6% p.a. is <em>not available</em> to households without at least one Singapore Citizen. A Singapore PR-only couple buying an HDB resale flat must take a bank loan &mdash; which means both scenarios in this article are being compared like-for-like on a bank loan basis. If at least one buyer is a Singapore Citizen, the HDB concessionary loan option would apply to the HDB (not the condo), which offers rate stability at 2.6% but is currently more expensive than bank rates.
      </div>

      <h2>Who should seriously consider the condo instead of the HDB?</h2>

      <p>Based on the numbers, the stretch to a private condo is worth serious consideration if the following apply to your household:</p>

      <ol>
        <li><strong>Gross household income comfortably above $11,000/month</strong> &mdash; ideally $13,000 to $15,000 or higher, so the actual repayment sits below 30% of income and there's cash-flow headroom.</li>
        <li><strong>Sufficient CPF-OA balances</strong> to fund most or all of the 20% downpayment portion &mdash; ideally at least $250,000 to $340,000 in combined household CPF-OA.</li>
        <li><strong>At least $170,000 to $200,000 in cash reserves</strong> to cover the 5% cash downpayment, stamp duties, and a 12-month emergency buffer.</li>
        <li><strong>A minimum 7- to 10-year holding horizon</strong>. Private property rewards long holds; short flips are punished by SSD and ABSD structures.</li>
        <li><strong>Job stability or dual-income households</strong> that can absorb the higher monthly commitment without stress.</li>
        <li><strong>Own-stay plus wealth accumulation is a real goal</strong> &mdash; not just shelter.</li>
      </ol>

      <p>Conversely, the HDB remains the right answer if you value flat monthly costs, want to maximise cash liquidity, or prefer the concessionary loan's 2.6% rate stability (if eligible). There is no wrong answer &mdash; only a fit answer for your household's circumstances.</p>

      <div class="art-cta">
        <h3>Want your exact numbers modelled?</h3>
        <p>Every household's CPF balance, income mix, and existing commitments are different. A 30-minute session gives you a personalised affordability projection for both HDB and condo scenarios &mdash; using your real numbers.</p>
        <a href="/contact/" onclick="showPage('contact'); return false;" class="cta-btn">Book a Free Consultation</a>
      </div>

      <h2>Frequently asked questions</h2>

      <div class="art-faq">
        <details>
          <summary>Can I afford a $1.7M condo if I can afford a $970k HDB in Singapore?</summary>
          <p>Yes, in most cases. Under MAS stress-test rules (4.0% floor rate), a $1.7M private condo requires a minimum gross household income of $11,067 per month to qualify, while a $970k HDB requires $12,800 per month. The condo needs $1,733 less because it uses TDSR (55% cap) instead of MSR (30% cap), and allows a 30-year loan tenure versus 25 years for HDB resale bank loans at 75% LTV. However, actual cash outlay is higher for the condo, so affordability must be assessed on both dimensions.</p>
        </details>
        <details>
          <summary>What is the difference between MSR and TDSR in Singapore?</summary>
          <p>Mortgage Servicing Ratio (MSR) caps your monthly housing loan repayment at 30% of gross monthly income and applies only to HDB flats and Executive Condominiums. Total Debt Servicing Ratio (TDSR) caps total monthly debt at 55% of gross monthly income and applies to all property loans, including private residential. TDSR includes all debts (car, credit card, personal loan) while MSR looks only at the housing mortgage. Both are enforced by MAS.</p>
        </details>
        <details>
          <summary>What is the maximum loan tenure for HDB and private property in Singapore?</summary>
          <p>For 75% loan-to-value, HDB resale bank loans are capped at 25 years and private residential bank loans at 30 years. HDB concessionary loans are also capped at 25 years. Longer tenures are possible (up to 30 years for HDB and 35 years for private) but LTV drops to 55%, requiring a much larger downpayment. In all cases, the loan must end before the borrower turns 65 to qualify for the maximum LTV.</p>
        </details>
        <details>
          <summary>How much ABSD does a Singapore PR pay on a first property in 2026?</summary>
          <p>A Singapore Permanent Resident pays 5% Additional Buyer's Stamp Duty (ABSD) on their first residential property, calculated on the higher of purchase price or market value. Singapore Citizens pay 0% on their first property, and foreigners pay 60%. Rates are set by IRAS and have been unchanged since 27 April 2023. On a $1.7M condo, PR ABSD is $85,000.</p>
        </details>
        <details>
          <summary>What is the Buyer's Stamp Duty on a $1.7 million property in Singapore?</summary>
          <p>The Buyer's Stamp Duty (BSD) on a $1,700,000 residential property is $54,600. This uses IRAS's progressive tiers: 1% on the first $180,000 ($1,800), 2% on the next $180,000 ($3,600), 3% on the next $640,000 ($19,200), 4% on the next $500,000 ($20,000), and 5% on the remaining $200,000 ($10,000). BSD is payable within 14 days of signing the Sale and Purchase Agreement.</p>
        </details>
        <details>
          <summary>Can I use CPF to pay for a private condo downpayment in Singapore?</summary>
          <p>Yes. For a private residential purchase with a 25% downpayment, the mandatory 5% must be paid in cash, but the remaining 20% can be paid using CPF Ordinary Account (OA) savings, cash, or a combination of both. On a $1.7 million condo, that means up to $340,000 of the downpayment can be funded from CPF-OA. CPF can also be used to pay BSD, ABSD, monthly instalments and legal fees.</p>
        </details>
        <details>
          <summary>Does the HDB concessionary loan at 2.6% apply to Singapore PRs?</summary>
          <p>No. The HDB concessionary loan requires at least one Singapore Citizen in the household. A Singapore PR-only couple purchasing an HDB resale flat must take a bank loan, which currently offers rates from approximately 1.4% to 1.7% p.a. as of mid-2026. The concessionary rate is pegged at 0.1% above the CPF Ordinary Account rate (currently 2.5%), giving 2.6% p.a.</p>
        </details>
        <details>
          <summary>Is a condo really a better investment than an HDB in Singapore?</summary>
          <p>Historically, yes &mdash; but modestly. From 1Q 2009 to 4Q 2025, the URA Private Residential Property Price Index rose 116% while the HDB Resale Price Index rose 104%. Private property also offers no MOP, no ethnic quota, no income ceiling, and a larger resale buyer pool (including foreigners and PRs), giving it more upside optionality. However, private is more volatile, has higher carrying costs, and historical returns do not guarantee future returns.</p>
        </details>
      </div>

      <div class="art-src">
        <h3>Sources &amp; References</h3>
        <ol>
          <li>Monetary Authority of Singapore &mdash; TDSR framework and stress-test methodology. <a href="https://www.mas.gov.sg/regulation/explainers/tdsr-for-property-loans/calculating-tdsr" target="_blank" rel="noopener">mas.gov.sg/regulation/explainers/tdsr-for-property-loans</a></li>
          <li>Monetary Authority of Singapore &mdash; Loan Tenure and LTV Limits. <a href="https://www.mas.gov.sg/regulation/explainers/new-housing-loans/loan-tenure-and-loan-to-value-limits" target="_blank" rel="noopener">mas.gov.sg/regulation/explainers/new-housing-loans</a></li>
          <li>Monetary Authority of Singapore &mdash; September 2022 measures raising the medium-term interest rate floor to 4.0%. <a href="https://www.mas.gov.sg/news/media-releases/2022/measures-to-promote-sustainable-conditions-in-the-property-market-by-ensuring-prudent-borrowing-and-moderating-demand" target="_blank" rel="noopener">mas.gov.sg/news/media-releases/2022</a></li>
          <li>Inland Revenue Authority of Singapore &mdash; Buyer's Stamp Duty and Additional Buyer's Stamp Duty rates. <a href="https://www.iras.gov.sg/quick-links/tax-rates/stamp-duty" target="_blank" rel="noopener">iras.gov.sg/quick-links/tax-rates/stamp-duty</a></li>
          <li>Housing and Development Board &mdash; HDB Concessionary Loan Interest Rate (2.6% p.a., Q1 2026). <a href="https://www.hdb.gov.sg/residential/servicing-your-hdb-housing-loan/loan-matters/interest-rate" target="_blank" rel="noopener">hdb.gov.sg/residential/servicing-your-hdb-housing-loan</a></li>
          <li>Central Provident Fund Board &mdash; CPF Ordinary Account interest rate and housing usage rules. <a href="https://www.cpf.gov.sg/member/infohub/educational-resources/3-differences-between-hdb-loan-and-bank-loan" target="_blank" rel="noopener">cpf.gov.sg</a></li>
          <li>MoneySense (MAS) &mdash; Buying a Property: How Much Can You Afford? <a href="https://www.moneysense.gov.sg/buying-a-property-how-much-can-you-afford/" target="_blank" rel="noopener">moneysense.gov.sg</a></li>
          <li>Singapore Department of Statistics &mdash; Property Price Indices, 4Q 2025 data release. <a href="https://www.singstat.gov.sg/find-data/explore-data-themes/economy-prices/property-price-indices/latest-news-data" target="_blank" rel="noopener">singstat.gov.sg/find-data</a></li>
          <li>Urban Redevelopment Authority &mdash; Private Residential Property Price Index methodology and quarterly releases. <a href="https://data.gov.sg/dataset/private-residential-property-price-index-by-type-of-property" target="_blank" rel="noopener">data.gov.sg</a></li>
          <li>PropNex Business Suite &mdash; Resale HDB and Resale Private Purchase calculators used for the illustrative outlay figures shown in Tables 1 and 2.</li>
        </ol>
      </div>

      <div class="art-disc">
        <strong>Disclaimer.</strong> This article is for general information and educational purposes only and does not constitute financial, legal, or tax advice. All figures are illustrative and reflect MAS stress-test rules, IRAS BSD/ABSD schedules, HDB/CPF rates, and market bank rates as at July 2026, which are subject to change. Loan approval remains at the discretion of the lender. Property values may rise or fall. Historical property price indices are not indicative of future returns. Buyers should assess their own financial position, seek independent advice where appropriate, and refer to their conveyancing lawyer and mortgage banker for binding figures. PropNex Realty Pte Ltd and its salespersons will not be responsible for any errors or omissions, or for the results obtained from the use of this information.
      </div>
    `
  },

  /* ======================================================
     ARTICLE — THOMSON RESERVE & THE PRESTIGE TRAP
  ====================================================== */
  'post-thomson-reserve-prestige-trap-2026': {
    title: 'Thomson Reserve and the Prestige Trap: Why "Good District" May Be Costing You More Than You Think',
    date: '7 Aug 2026',
    readTime: '19 min read',
    category: 'BUYER PSYCHOLOGY',
    chipClass: 'chip-psychology',
    img: null,
    linkedinUrl: null,
    body: `
      <p><strong>Here is a question almost nobody asks before buying a condo in Singapore: how much of this price am I paying for the property, and how much am I paying for the postcode?</strong></p>

      <p>Most Singaporeans cannot answer that. Not because they are careless &mdash; but because the two feel like the same thing. "Good district" and "good investment" have become so fused in the Singaporean mind that questioning one feels like questioning the other. This piece pulls them apart. And it uses Thomson Reserve &mdash; a genuinely strong project in a genuinely desirable location &mdash; as the case study, precisely <em>because</em> it is strong. If the prestige premium quietly costs you money even on a good project, imagine what it does on a weak one.</p>

      <p>This is not a review. It will not tell you to buy or not buy. It is something more uncomfortable and, I think, more useful: an honest look at the psychology that drives Singaporean property decisions, and how that psychology can quietly work against your own wealth. If you walk away slightly annoyed but thinking more clearly, this piece has done its job.</p>

      <p><em>Figures referenced come from URA, EdgeProp Singapore, IRAS, and public developer data, current as of mid-2026.</em></p>

      <h2>The Uncomfortable Opening Question</h2>

      <p>Let me start with the claim that makes this a contrarian piece: <strong>in Singapore, "district prestige" is one of the most overpriced and least examined variables in the entire property market.</strong></p>

      <p>Not worthless. Overpriced. There is a difference. A good district has real, measurable advantages &mdash; schools, transport, amenities, supply scarcity. Those are worth paying for. But <em>on top of</em> those measurable advantages sits an invisible surcharge: the price of feeling like you have "made it." Of telling relatives your postcode without flinching. Of the quiet status hit that comes from a District 9, 10, or 11 address &mdash; or, in Thomson Reserve's case, a District 20 address in the established Bishan-Thomson belt.</p>

      <p>That surcharge is real money. And most buyers pay it without ever putting a number on it.</p>

      <p>Here is what makes this worth examining now. Thomson Reserve will likely launch in the S$2,500&ndash;S$3,100 psf range. A large part of that price is justified by genuine fundamentals &mdash; three MRT lines, the Ai Tong school catchment, a fresh 99-year lease, blue-chip developers. But a part of it &mdash; an unmeasured, rarely-questioned part &mdash; is the Bishan-Thomson prestige premium. The question this article asks is simple: <strong>is that premium a rational investment, or an emotional one dressed up as a rational one?</strong></p>

      <p>The answer, honestly, is: partly both. And knowing which part is which is the difference between a smart buyer and a buyer who got smart-sounding reasons for an emotional decision.</p>

      <h2>The Status Instinct Singaporeans Don't Know They Have</h2>

      <p>To understand the prestige trap, you have to understand a very Singaporean psychology &mdash; one most Singaporeans cannot see in themselves because they are swimming in it.</p>

      <p>Singapore is one of the most status-legible societies on earth. Your school, your job title, your car COE, your condo's district &mdash; these are read instantly and constantly by the people around you. In a small, dense, achievement-oriented society, these signals matter more than they do almost anywhere else. And property is the <em>loudest</em> signal of all, because it is the largest and most visible.</p>

      <p>This creates a quiet emotional pressure that operates below conscious awareness. When a Singaporean says "I want a good district," they usually believe they are making a purely financial statement. But underneath it, often, is something else:</p>

      <ul>
        <li><em>"I don't want to explain to my in-laws why I bought in a 'lesser' area."</em></li>
        <li><em>"I want my children's friends' parents to recognise the address."</em></li>
        <li><em>"After all these years of working, I've earned a prestige postcode."</em></li>
        <li><em>"A good district means I made a smart decision &mdash; and I want to feel smart."</em></li>
      </ul>

      <p>None of these are shameful. They are deeply human. But here is the trap: <strong>when an emotional need drives a financial decision, the buyer will find financial-sounding reasons to justify it.</strong> The mind works backward. First comes the pull toward the prestige address, then comes the search for data that makes the pull look rational.</p>

      <p>This is why so many Singaporeans can recite the fundamentals of "good district" property with fluency &mdash; schools, MRT, scarcity, appreciation &mdash; but cannot tell you how much <em>extra</em> they are paying for the prestige on top of those fundamentals. They have never separated the two, because separating them would mean confronting the emotional driver underneath.</p>

      <h2>What the Prestige Premium Actually Costs</h2>

      <p>Let us put a number on it, because vague warnings are useless. Here is how you can roughly estimate the prestige surcharge on any Singapore property.</p>

      <p>Take a project's launch PSF. Strip out the measurable location value &mdash; what the schools, MRT access, and supply scarcity are <em>actually</em> worth in appreciation terms based on comparable data. What is left, if the price still exceeds a similarly-specced project in a "lesser" district with equivalent measurable fundamentals, is the prestige surcharge.</p>

      <p>Consider a rough illustration using Thomson Reserve's likely positioning:</p>

      <div class="data-tbl">
        <table>
          <caption>Illustrative breakdown: where Thomson Reserve's launch PSF might come from</caption>
          <thead>
            <tr><th>Value component</th><th>Estimated contribution to PSF</th></tr>
          </thead>
          <tbody>
            <tr><td class="metric">Base construction + land cost floor</td><td>~S$2,000&ndash;S$2,200</td></tr>
            <tr><td class="metric">Measurable MRT/transport premium</td><td>~S$150&ndash;S$250</td></tr>
            <tr><td class="metric">Measurable school catchment premium</td><td>~S$150&ndash;S$200</td></tr>
            <tr><td class="metric">Measurable supply scarcity premium</td><td>~S$100&ndash;S$200</td></tr>
            <tr class="hl"><td class="metric">"Prestige" residual (District 20 Bishan-Thomson identity)</td><td>~S$150&ndash;S$350</td></tr>
          </tbody>
        </table>
      </div>

      <p>That residual &mdash; the part not explained by any measurable, appreciation-linked fundamental &mdash; is the prestige surcharge. On a 950 sq ft 3-bedroom, a S$250 psf prestige residual is roughly <strong>S$237,500 of your purchase price paid for the postcode's emotional value rather than its financial value.</strong></p>

      <p>Now, here is the nuance that separates this from a simple "don't buy prestige" argument: <strong>prestige premiums can hold their value if the prestige is durable.</strong> Bishan-Thomson is a genuinely established, durable-prestige district. Its identity is unlikely to erode. So the surcharge you pay may well be recoverable at resale, because the next buyer will also pay it.</p>

      <div class="info-note">
        <strong>Recoverable is not the same as productive.</strong> Money locked into a prestige surcharge is money that is not compounding for you. It sits in your property as a status deposit, recoverable but inert. A buyer who paid S$237,500 less for equivalent measurable fundamentals in a slightly-less-prestigious district could have invested that difference elsewhere &mdash; or simply carried less mortgage and less risk.
      </div>

      <p>The prestige premium is not a scam. It is an opportunity cost that Singaporeans systematically refuse to see.</p>

      <h2>The "Good District" Myth, Examined Honestly</h2>

      <p>Let us challenge the single most repeated belief in Singaporean property: <em>"Buy in a good district and you can't go wrong."</em></p>

      <p>Is it true? Partly. And the "partly" is where buyers lose money.</p>

      <h3>Where the myth holds up</h3>
      <p>Good districts do have structurally lower downside. They have deeper buyer pools, more resilient demand, better liquidity in downturns, and school-catchment demand that does not retreat in recessions. In a market crash, prime and established districts fall less and recover faster. That is real, and it is worth something.</p>

      <h3>Where the myth breaks down</h3>
      <p>"Can't go wrong" quietly becomes "will definitely make strong returns" in the buyer's mind &mdash; and those are completely different claims. Consider the uncomfortable evidence:</p>

      <ul>
        <li><strong>Fourth Avenue Residences</strong> (District 11, prime Bukit Timah, launched 2018&ndash;2019) delivered modest-to-flat returns for many buyers. Prime district. Strong location. Still, some buyers barely broke even after holding costs. Location did not save them from <em>paying too much at entry</em>.</li>
        <li><strong>Thomson Grand</strong> (District 20, the same Bishan-Thomson belt as Thomson Reserve) delivered only around 9% price appreciation over its holding period for many owners &mdash; barely covering stamp duty and interest. Same "good district." Underwhelming outcome.</li>
        <li><strong>Prime District 9, 10, 11 condos</strong> have, over certain multi-year windows, <em>underperformed</em> well-chosen suburban projects on total return, precisely because the prestige premium was so high at entry that there was little room left for appreciation.</li>
      </ul>

      <p>The lesson buried in this evidence is uncomfortable: <strong>a good district protects your downside but does not guarantee your upside. And the upside is what builds wealth.</strong> When you overpay for prestige, you compress your own upside &mdash; you buy the protection but sacrifice the growth.</p>

      <p>The Singaporean buyer who says "good district, can't go wrong" is half-right in a way that is financially dangerous. They are right about the downside protection. They are wrong to assume it translates to strong returns. And that gap &mdash; between "safe" and "profitable" &mdash; is where the prestige premium quietly eats your wealth.</p>

      <h2>The Thomson Reserve Case Study: Separating the Real From the Emotional</h2>

      <p>Now let us apply this lens directly to Thomson Reserve. Not to say buy or don't buy &mdash; but to separate what you would be paying for the <em>property</em> from what you would be paying for the <em>postcode</em>.</p>

      <h3>The genuinely financial reasons (worth paying for)</h3>
      <p>These are the parts of Thomson Reserve's price that are backed by measurable, appreciation-linked fundamentals:</p>

      <ul>
        <li><strong>Three-MRT-line access</strong> (TEL, future CRL Phase 1, Circle Line). Measurable transport premium, backed by decades of Singapore MRT-adjacency appreciation data. Real.</li>
        <li><strong>Ai Tong SAP school 1km zone.</strong> Measurable, recession-resistant demand driver. Real.</li>
        <li><strong>Fresh 99-year lease.</strong> Measurable &mdash; minimal lease decay drag for the first 30 years. Real.</li>
        <li><strong>Structural D20 supply scarcity.</strong> Measurable &mdash; no major D20 launch since AMO Residence in 2022. Real.</li>
        <li><strong>Blue-chip developer risk reduction.</strong> Measurable in defect risk and TOP-delay risk terms. Real.</li>
      </ul>

      <p>If you are paying for these, you are making a rational decision. These fundamentals justify a significant premium over an ordinary suburban project.</p>

      <h3>The emotional reasons (examine carefully)</h3>
      <p>These are the parts that feel like reasons but are actually status pulls wearing reason's clothing:</p>

      <ul>
        <li><em>"It's Bishan &mdash; a proper established district."</em> True, but ask: how much of your willingness to pay is the <em>measurable</em> Bishan advantage (schools, MRT) versus the <em>feeling</em> of a Bishan address? Because you are already paying for the measurable part in the points above. The residual is emotional.</li>
        <li><em>"UOL, SingLand, and CapitaLand &mdash; three big names."</em> The construction quality benefit is real and measurable. But the <em>pride</em> of owning a "three-blue-chip-developer" project? That is prestige, not finance. The building doesn't appreciate faster because you can name-drop three developers at dinner.</li>
        <li><em>"It's a flagship launch &mdash; the big project of the year."</em> Flagship status is emotional. A 1,240-unit mega project's size is a supply <em>risk</em> at resale, not an appreciation driver. The "flagship" feeling is doing emotional work that the fundamentals don't support.</li>
      </ul>

      <p>Here is the exercise almost no buyer does: <strong>go through Thomson Reserve's appeal, item by item, and honestly label each one "financial" or "emotional."</strong> Then ask whether the price you are willing to pay matches the financial column &mdash; or whether the emotional column is quietly inflating your ceiling.</p>

      <p>Most buyers, done honestly, will find their willingness-to-pay is 15&ndash;25% higher than the financial column alone justifies. That gap is the prestige trap. It is not wrong to pay it &mdash; but it should be a <em>conscious</em> choice, not an ambush.</p>

      <h2>Why This Matters More in 2026 Than It Did in 2019</h2>

      <p>The prestige trap has always existed. But it is more expensive and more dangerous in 2026 than it was five years ago, for three specific reasons.</p>

      <ol>
        <li><strong>The margin for error has shrunk.</strong> In 2019, generous appreciation could paper over an overpriced entry. A buyer who overpaid 15% for prestige could still make money because the whole market was rising fast. In 2026, with appreciation compressed to mid-single-digits and cooling measures firmly in place, there is far less growth to hide an overpayment. Every dollar of prestige premium you overpay is a dollar that a slower-growing market may not return to you quickly.</li>
        <li><strong>ABSD makes overpayment brutal.</strong> For second-property buyers, 20% ABSD means you start every purchase 20% underwater. Adding a prestige premium on top of that creates a hurdle so high that only genuine, measurable fundamentals can clear it. Emotional overpayment in a 20%-ABSD environment is financial self-harm.</li>
        <li><strong>The status signal itself is weakening.</strong> Here is a genuinely contrarian observation: as more Singaporeans achieve high incomes and prime-district ownership becomes more common among the professional class, the <em>marginal status value</em> of a prestige postcode is quietly declining. The prestige premium you pay in 2026 may deliver less social return than the same premium would have delivered in 2010, when prime ownership was rarer. You may be paying peak prices for a status signal that is slowly depreciating.</li>
      </ol>

      <p>None of this means avoid good districts. It means: in 2026, the cost of <em>unconsciously</em> overpaying for prestige is higher than it has ever been.</p>

      <h2>The Counter-Argument: When Paying for Prestige Is Actually Smart</h2>

      <p>Intellectual honesty demands I argue the other side properly, because there are real situations where paying the prestige premium is the <em>right</em> decision.</p>

      <ul>
        <li><strong>When you are buying a home, not an investment.</strong> If Thomson Reserve is where your family will live for 15 years, where your children will grow up, where you will build memories &mdash; then the "emotional" value is not a trap. It is the entire point. A home is allowed to be emotional. You should not run a pure ROI calculation on the place your children learn to ride a bicycle. If prestige and lifestyle make you happier for 15 years, that is a legitimate purchase of happiness, not a financial error.</li>
        <li><strong>When the prestige is genuinely durable and self-reinforcing.</strong> Some prestige districts have prestige so entrenched that the premium compounds rather than erodes. Bishan-Thomson, with its established schools and permanent MRT infrastructure, is closer to this category than, say, a newly-marketed "up-and-coming" precinct whose prestige is manufactured and fragile. Durable prestige is a more defensible premium to pay.</li>
        <li><strong>When downside protection is worth more to you than upside.</strong> For a risk-averse buyer &mdash; someone near retirement, someone who cannot afford a loss, someone protecting capital rather than growing it &mdash; the downside protection of an established district is genuinely valuable. Paying a premium for lower volatility is a rational trade for the right person.</li>
        <li><strong>When you can comfortably afford it.</strong> If the prestige premium is a small fraction of your net worth and you are buying with cash or low leverage, the opportunity cost is trivial and the lifestyle benefit is real. Prestige premiums hurt most when they are funded by stretched leverage. They hurt least when funded by genuine surplus.</li>
      </ul>

      <p>So the honest position is not "never pay for prestige." It is: <strong>know exactly what you are paying for it, decide consciously whether it is worth it to you, and never let an emotional driver masquerade as a financial one.</strong></p>

      <h2>How to Buy Prestige Without Falling Into the Trap</h2>

      <p>If you have read this far and still want a Bishan-Thomson address &mdash; and many readers rightly will &mdash; here is how to do it with your eyes open.</p>

      <ol>
        <li><strong>Separate the two budgets explicitly.</strong> Before you view Thomson Reserve, write down two numbers: what you would pay based on measurable fundamentals alone, and what you are <em>willing</em> to pay. The gap is your conscious prestige budget. Decide if you are comfortable with it.</li>
        <li><strong>Compare against the "lesser district" alternative honestly.</strong> Find a project with equivalent measurable fundamentals &mdash; MRT access, school catchment, developer quality &mdash; in a slightly-less-prestigious district. Calculate the price difference. That difference is what District 20 prestige is costing you. Look at that number without flinching.</li>
        <li><strong>Stress-test whether the premium survives a downturn.</strong> In a soft market, prestige premiums compress. Ask: if I need to sell in a downturn, will the prestige buyer still be there to pay this premium, or will I be selling into a thinner pool? Durable prestige survives this test. Fragile prestige does not.</li>
        <li><strong>Be honest about your motive.</strong> Sit with the question: am I buying this to live in, or to <em>be seen</em> to own? Both are valid &mdash; but they justify very different price ceilings. A home justifies emotional spending. An investment does not.</li>
        <li><strong>Never fund prestige with maximum leverage.</strong> If paying the prestige premium requires stretching to your TDSR ceiling, you are funding an emotional purchase with financial risk. That is the most dangerous combination in Singapore property. Buy prestige with surplus, not with strain.</li>
      </ol>

      <h2>Frequently Asked Questions</h2>

      <div class="art-faq">
        <details>
          <summary>Is Thomson Reserve worth the prestige premium?</summary>
          <p>It depends entirely on whether you are buying a home or an investment. As a home for a 15-year family stay, the lifestyle and prestige value is a legitimate purchase of happiness, and Bishan-Thomson's durable prestige means the premium is likely recoverable at resale. As a pure investment, the prestige residual (roughly S$150&ndash;S$350 psf above measurable fundamentals) is recoverable but inert money that could compound elsewhere. Separate the measurable fundamentals from the postcode feeling, and pay consciously for each.</p>
        </details>
        <details>
          <summary>Do "good districts" always make money in Singapore?</summary>
          <p>No &mdash; this is the most dangerous myth in Singaporean property. Good districts provide strong downside protection (they fall less and recover faster in downturns) but they do not guarantee upside. Fourth Avenue Residences (prime D11) and Thomson Grand (D20) both delivered modest or flat returns for many buyers despite excellent locations, because the entry price was too high to leave room for appreciation. "Can't go wrong" means "won't crash," not "will definitely profit."</p>
        </details>
        <details>
          <summary>How much of a condo's price is prestige versus fundamentals?</summary>
          <p>Typically 15&ndash;25% of the willingness-to-pay is emotional prestige rather than measurable fundamentals in established prime districts. You can estimate it by stripping out the measurable value of MRT access, school catchment, and supply scarcity from the launch PSF. The residual that still exceeds a comparably-specced project in a lesser district is the prestige surcharge. Most buyers never calculate this, which is exactly why they overpay unconsciously.</p>
        </details>
        <details>
          <summary>Why do Singaporeans overpay for prestige districts?</summary>
          <p>Because Singapore is an unusually status-legible society, and property is the loudest status signal. The emotional need for a recognisable postcode operates below conscious awareness, and the mind works backward &mdash; first the pull toward prestige, then the search for financial-sounding justifications. This is deeply human, not shameful, but it means many buyers pay a status surcharge while believing they made a purely financial decision.</p>
        </details>
        <details>
          <summary>Is the prestige premium recoverable at resale?</summary>
          <p>Usually yes, if the prestige is durable &mdash; but recoverable is not the same as productive. In an established district like Bishan-Thomson, the next buyer will likely also pay the prestige premium, so you can recover it. However, that money sits inert in your property as a status deposit rather than compounding for you. The opportunity cost &mdash; what that capital could have earned elsewhere, or the lower risk of carrying less mortgage &mdash; is the real cost most buyers ignore.</p>
        </details>
        <details>
          <summary>Should I buy Thomson Reserve or a cheaper project in a less prestigious area?</summary>
          <p>Compare the measurable fundamentals directly, then decide if the prestige gap is worth it to you. If a project in a slightly-less-prestigious district offers equivalent MRT access, school catchment, and developer quality at a materially lower price, the difference quantifies exactly what District 20 prestige costs you. For a homebuyer valuing lifestyle, paying it may be right. For a pure investor seeking maximum return, the cheaper equivalent-fundamentals project may deliver better total returns.</p>
        </details>
        <details>
          <summary>Is prestige worth less in 2026 than it used to be?</summary>
          <p>Arguably yes, for two reasons. First, as high incomes and prime-district ownership become more common among Singapore's professional class, the marginal status value of a prestige postcode is slowly declining &mdash; you may be paying peak prices for a depreciating social signal. Second, compressed appreciation and firm cooling measures in 2026 mean there is far less market growth to absorb an overpayment than there was in the faster-rising market of 2015&ndash;2019.</p>
        </details>
        <details>
          <summary>When is paying a prestige premium actually the smart choice?</summary>
          <p>When you are buying a genuine 15-year home, when the prestige is durable and self-reinforcing, when downside protection matters more to you than upside, and when you can fund the premium from surplus rather than stretched leverage. In these situations, the prestige premium is a rational purchase of happiness or stability. It becomes a trap only when an emotional driver masquerades as a financial one, or when it is funded by maximum leverage.</p>
        </details>
      </div>

      <h2>The Honest Bottom Line</h2>

      <p>Thomson Reserve is a good project. That was never the question. The question this piece asked is harder: <strong>how much of what you would pay for it is property, and how much is postcode &mdash; and do you know the difference?</strong></p>

      <p>Most Singaporeans do not. They fuse "good district" and "good investment" into a single unexamined belief, then pay a prestige premium they never consciously chose, funded sometimes by leverage they cannot comfortably carry. And because the prestige is often durable, they get away with it &mdash; they recover the premium at resale and conclude they made a smart decision, never noticing the inert capital and the compressed upside that the premium quietly cost them.</p>

      <div class="dark-call">
        <h3>The contrarian truth</h3>
        <p>The smartest property buyers in Singapore are not the ones who chase the best district. They are the ones who know exactly how much they are paying for the district's <em>feeling</em> versus its <em>fundamentals</em>, and who choose that trade consciously rather than emotionally.</p>
      </div>

      <p>If Thomson Reserve is your family home for the next 15 years, pay the prestige premium with a clear conscience &mdash; you are buying happiness, and happiness is a legitimate purchase. If it is a pure investment, run the numbers coldly, separate the measurable from the emotional, and make sure the fundamentals alone justify your price. And whatever you do, never let the quiet Singaporean status instinct write a cheque your financial logic wouldn't sign.</p>

      <p>The prestige trap is not that prestige is worthless. It is that prestige is invisible &mdash; and invisible costs are the ones that hurt you most.</p>

      <p><strong>Buy with your eyes open. That is the whole point.</strong></p>

      <p><em>Last updated: August 2026. This is an analytical opinion piece, not financial advice. All figures are illustrative estimates based on publicly available market data. Verify all stamp duty rates with IRAS and consult licensed financial professionals before transacting.</em></p>

      <div class="art-cta">
        <h3>Want your specific numbers separated &mdash; prestige from fundamentals?</h3>
        <p>If you would like help separating the measurable fundamentals from the prestige premium on any specific project &mdash; including Thomson Reserve &mdash; a free 30-minute consultation is available. No sales pitch. Just an honest breakdown of what you would actually be paying for.</p>
        <a href="/contact/" onclick="showPage('contact'); return false;" class="cta-btn">Book a Free Consultation</a>
      </div>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/thomson-reserve-price-review-2026" onclick="showArticle('post-thomson-reserve-price-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Thomson Reserve Price Review 2026: Is It Really Too Expensive?</strong></a></p>
      <p>2. <a href="/insights/thomson-reserve-risks-2026" onclick="showArticle('post-thomson-reserve-risks-2026'); return false;" class="underline hover:text-violet-700"><strong>Thomson Reserve Risks: 8 Real Concerns Before You Buy (2026)</strong></a></p>
      <p>3. <a href="/project/thomson-reserve-condo/" class="underline hover:text-violet-700"><strong>Full Thomson Reserve Project Page (Deep Analysis)</strong></a></p>
      <p>4. <a href="/insights/district-guide" onclick="showArticle('post-district-guide'); return false;" class="underline hover:text-violet-700"><strong>Which Singapore District Should You Buy In? The 2026 Growth Map</strong></a></p>

      <div class="art-disc">
        <strong>Disclaimer.</strong> This article is for general informational purposes and does not constitute financial, tax, or investment advice. All figures, projections, and comparisons are based on publicly available data as of mid-2026 and are subject to change. Property values can go down as well as up. Always conduct your own due diligence and consult a licensed financial advisor, solicitor, and property professional before making any decision.
      </div>
    `
  },

  /* ======================================================
     ARTICLE — THOMSON RESERVE $810M EN BLOC ILLUSION
  ====================================================== */
  'post-thomson-reserve-enbloc-illusion-2026': {
    title: 'Thomson Reserve and the $810 Million Illusion: Why a Big En Bloc Price Is Not Proof You Should Buy',
    date: '8 Aug 2026',
    readTime: '12 min read',
    category: 'BUYER PSYCHOLOGY',
    chipClass: 'chip-psychology',
    img: null,
    linkedinUrl: null,
    body: `
      <div class="qa-box">
        <div class="lbl">Quick Answer</div>
        <p>The $810 million paid for the former Thomson View site does <em>not</em> mean Thomson Reserve is a good buy for you. It means the land was expensive for the <em>developers</em>. That is their cost, and they will pass it on to you. A big, confident number from three famous developers is one of the most powerful psychological triggers in property marketing, and most buyers never notice it working on them. This article is about that trigger, why it fools smart people, and how to switch it off before you sign anything.</p>
      </div>

      <p>This is not a reason to avoid Thomson Reserve. It is a reason to buy it (or not) for the <em>right</em> reasons instead of a borrowed one.</p>

      <p><em>Last updated: August 2026. Prices are not released yet, so any price figure here is clearly marked as an estimate. Verify against official developer materials and URA caveats before deciding.</em></p>

      <h2>The number that is doing your thinking for you</h2>

      <p>Let's start with the headline everyone repeats: three of Singapore's biggest developers &mdash; <strong>UOL, Singapore Land and CapitaLand</strong> &mdash; paid <strong>$810 million</strong> for the former Thomson View site. It was the largest approved en bloc since Chuan Park ($890 million) in 2023.</p>

      <p>Now watch what that number does in your head. It whispers:</p>

      <blockquote>"If the smartest, richest developers in Singapore paid this much, the location must be worth it. They know something. I can trust this."</blockquote>

      <p>That feeling is real. It is also a trap with a name. Behavioural economists call it <strong>anchoring</strong> &mdash; the mind grabs the first big number it sees and quietly measures everything else against it. Beside it sits <strong>authority bias</strong> &mdash; we assume experts (here, big developers) must be right, so we borrow their confidence instead of doing our own.</p>

      <p>Put the two together and you get the most effective sales tool at any new launch. Nobody has to say a word. The $810 million says it for them.</p>

      <p>Here is the uncomfortable truth: <strong>a high land price tells you what the developer spent, not what you should pay.</strong> Those are two completely different things, and the whole game is getting you to confuse them.</p>

      <h2>"Smart money bought here" &mdash; the fallacy in one line</h2>

      <p>You will hear a version of this everywhere: <em>smart money moved in, so you should follow.</em></p>

      <p>It sounds obvious. It is also wrong, for a simple reason most buyers never think through.</p>

      <p><strong>Developers and you are not making the same trade.</strong></p>

      <div class="data-tbl">
        <table>
          <caption>The developer's trade vs. yours</caption>
          <thead>
            <tr><th>&nbsp;</th><th>The developer</th><th class="condo-col">You</th></tr>
          </thead>
          <tbody>
            <tr><td class="metric">What they buy</td><td>Land, in bulk</td><td>One finished unit</td></tr>
            <tr><td class="metric">How they profit</td><td>Selling ~1,268 units at a margin</td><td>Selling one unit, years later</td></tr>
            <tr><td class="metric">Their timeline</td><td>Sell out in a few years</td><td>Hold 5&ndash;15 years</td></tr>
            <tr><td class="metric">Their safety net</td><td>Billion-dollar balance sheet</td><td>Your single household income</td></tr>
            <tr class="hl"><td class="metric">A soft market means</td><td>Slightly thinner margin</td><td>Real money, out of your pocket</td></tr>
          </tbody>
        </table>
      </div>

      <p>The developer wins on <strong>volume and margin</strong>, spread across more than a thousand units, cushioned by a balance sheet that can absorb a bad year without blinking. You win only if <em>your one unit</em> sells for more than you paid, after stamp duties, interest and fees, on your own timeline, with your own mortgage.</p>

      <p>So when someone says "the developers clearly believe in this location," the honest reply is: <em>of course they do &mdash; they've priced in a profit on 1,268 sales. You've priced in nothing yet.</em> Their confidence is not transferable to you. It was never designed to be.</p>

      <h2>What the "winners" of this en bloc actually reveal</h2>

      <p>Here is a detail the marketing never dwells on. The Thomson View owners originally wanted <strong>$918 million</strong>. They eventually accepted <strong>$810 million</strong> &mdash; about <strong>12% less</strong> than their asking price, after a <em>seventeen-year, five-attempt</em> en bloc saga.</p>

      <p>Read that again. Even the people celebrated as the big winners of this deal <strong>compromised</strong>. They held out for nearly two decades and still took less than they hoped for.</p>

      <p>That is not a criticism of them. It is a quiet lesson about this exact plot: getting full value out of it has never been easy, even for the sellers who owned it outright with no mortgage and no rush.</p>

      <p>And now you are being invited onto the <em>other side</em> of that same trade &mdash; buying the replacement units at a fresh, full, 2026 price. The sellers realised their money and walked away. Your gain is still a bet. Those are not the same position, no matter how the story is framed.</p>

      <h2>The anchor that history quietly disproves</h2>

      <p>Let's test the "high land price = good buy" idea against real transactions on this very corridor. I'll use three completed condos with actual track records: <strong>JadeScape, Thomson Three and Thomson Grand.</strong> (Figures from EdgeProp, 99.co, PropertyGuru, ERA and URA-based analysis &mdash; check current caveats before relying on any single number.)</p>

      <div class="data-tbl">
        <table>
          <caption>Land cost then vs. what units trade at now</caption>
          <thead>
            <tr><th>Project</th><th>Land cost then</th><th class="condo-col">Trades now (approx.)</th></tr>
          </thead>
          <tbody>
            <tr><td class="metric">Thomson Grand</td><td>~$533 psf ppr (2009)</td><td>~$1,809 psf</td></tr>
            <tr><td class="metric">JadeScape</td><td>En bloc, 2016</td><td>~$2,293 psf</td></tr>
            <tr><td class="metric">Thomson Three</td><td>GLS, 2012</td><td>~$2,120 psf</td></tr>
            <tr class="hl"><td class="metric">Thomson Reserve</td><td>~$1,178 psf ppr (2024)</td><td>Not released</td></tr>
          </tbody>
        </table>
      </div>

      <p>Notice what happened to the people who bought at the <strong>lowest</strong> anchors.</p>

      <ul>
        <li><strong>JadeScape's</strong> big winners bought in around <strong>$1,700 psf in 2018.</strong> One penthouse bought at $5.8 million in 2019 sold for <strong>$10.15 million</strong> in 2024 &mdash; a <strong>$4.35 million</strong> gain. The profit was born the day they bought <em>cheap</em>, not the day they sold.</li>
        <li><strong>Thomson Three</strong> buyers entered on a 2012 land price that the market <em>laughed at</em> at the time &mdash; there was no MRT yet. <strong>99% of resales later turned a profit</strong> (average around <strong>$251,720</strong>). They were rewarded for buying <em>before</em> the anchor rose.</li>
        <li><strong>Thomson Grand</strong>, meanwhile, is the cautionary tale. Ten years old, same district, next to an exclusive country club &mdash; and still the <strong>weakest</strong> of the three at ~$1,809 psf. Some early buyers even resold at a <strong>loss</strong> (one four-bedroom took a ~$60,000 hit in 2018). A "prestige" location did not save them.</li>
      </ul>

      <p>See the pattern? <strong>Every big win on this corridor came from buying at a low anchor before the crowd caught on.</strong> The $1,178 psf ppr behind Thomson Reserve is the <em>highest</em> anchor this stretch has ever seen. You are not being offered the JadeScape-2018 entry. You are being offered the top of the ladder built on all those earlier, cheaper rungs.</p>

      <p>That does not make it a bad home. It makes it a very different bet from the ones people quote to sell it to you.</p>

      <h2>Why Singaporeans are especially wired for this</h2>

      <p>We need to be honest about ourselves here, because the anchor works <em>better</em> on us than on almost anyone.</p>

      <p>Property in Singapore is not just an asset. It is <strong>identity, security, and proof you made it.</strong> It is the thing your relatives ask about at reunion dinner. It is the safe place to put money in a country where property has, for a generation, mostly gone up.</p>

      <p>That emotional weight makes us vulnerable in three specific ways:</p>

      <ol>
        <li><strong>We fear missing out more than we fear overpaying.</strong> The pain of watching prices rise <em>after</em> we hesitated feels worse than the slow, quiet pain of paying too much. So a big, urgent number pushes us toward "just buy it."</li>
        <li><strong>We treat developer confidence as permission.</strong> "If UOL and CapitaLand believe in it, who am I to doubt it?" It feels humble. It is actually just outsourcing your biggest financial decision to someone whose interests are not yours.</li>
        <li><strong>We anchor on the headline, not the household.</strong> We remember "$810 million" and "$1,178 psf." We forget to run <em>our own</em> sums &mdash; the loan, the five years of payments with no rent, the stamp duty.</li>
      </ol>

      <p>None of this makes you foolish. It makes you human, and Singaporean, and exactly the buyer this kind of launch is built for. The way out is not to feel bad about it. It is to <em>see</em> it, and then decide with your eyes open.</p>

      <h2>How to switch the anchor off (a 4-question reset)</h2>

      <p>Before your next showflat visit, answer these four questions honestly. If the anchor is doing your thinking, you will feel resistance to at least one of them. That resistance is the point.</p>

      <ol>
        <li><strong>Would I still want this unit if the land had cost half as much?</strong> The land price is the developer's problem, not your home. If a cheaper land cost would make you <em>less</em> keen, you are buying the number, not the property.</li>
        <li><strong>What is my exit price, and who is my future buyer?</strong> Be specific. In 2032, who buys your unit, and at what psf? If you can't answer, you don't have a plan &mdash; you have a hope.</li>
        <li><strong>Can I hold this for ten years without strain if prices go flat?</strong> New launches pay in stages and earn no rent for ~5 years until TOP (around 2031 here). Model a <em>boring</em> market, not a booming one.</li>
        <li><strong>Am I buying because it fits my life, or because a big number told me it's safe?</strong> Only the first reason survives a downturn. The second one evaporates the moment the market wobbles.</li>
      </ol>

      <p>If you pass all four, you are not being anchored &mdash; you are making a genuine decision, and Thomson Reserve may well be right for you. If you flinch, you just saved yourself from the most expensive mistake in property: buying someone else's confidence.</p>

      <h2>So should you avoid Thomson Reserve?</h2>

      <p>No. And I want to be clear, because this piece is deliberately provocative and I don't want it misread.</p>

      <p>Everything good about Thomson Reserve is real. Three MRT stations within walking distance. A fresh 99-year lease. Ai Tong School within 1km. A permanently protected reservoir boundary that can never be built over. Developers who will absolutely deliver. On this same street, <strong>99% of Thomson Three resellers made money.</strong> These are not small things.</p>

      <p>The point of this article is narrower and, I think, more useful than another "pros and cons" list:</p>

      <div class="dark-call">
        <p><strong>A high en bloc price is a reason to do more homework, not less. It is the developer's cost, dressed up as your validation.</strong></p>
      </div>

      <p>Strip the $810 million out of your head. Then look at the unit, the location, your loan, and your ten-year plan. If it still makes sense &mdash; buy it with confidence. If it only made sense <em>because</em> three big names paid a lot, you were never really deciding. The number was.</p>

      <p>The best buyers in Singapore are not the ones who chase the biggest launch. They are the ones who can look at $810 million, feel the pull, and still ask, calmly: <em>"Yes, but is it right for me?"</em></p>

      <p><strong>Be that buyer.</strong></p>

      <h2>Frequently Asked Questions</h2>

      <div class="art-faq">
        <details>
          <summary>Why did Thomson View sell for $810 million?</summary>
          <p>Three developers (UOL, Singapore Land, CapitaLand) bought the site to redevelop it into Thomson Reserve. At $810 million it was the largest approved collective sale since Chuan Park ($890 million) in 2023, working out to about $1,178 psf ppr after land betterment charges and a lease top-up.</p>
        </details>
        <details>
          <summary>Does a high en bloc price mean the new condo is a good buy?</summary>
          <p>Not by itself. A high land price is the developer's <em>cost</em>, which they build into your purchase price. It tells you the location is in demand, but it does not tell you whether <em>your</em> entry price leaves room for <em>your</em> profit. Those are separate questions.</p>
        </details>
        <details>
          <summary>Is Thomson Reserve overpriced?</summary>
          <p>No price has been released, so this can't be answered yet. What we know is that the land cost (~$1,178 psf ppr) is the highest on this corridor to date &mdash; more than double what Thomson Grand's land cost in 2009. Whether the launch price is fair depends entirely on where the developer sets it above that base. Wait for the official price list.</p>
        </details>
        <details>
          <summary>Did buyers at nearby condos actually make money?</summary>
          <p>Mostly yes &mdash; but the winners bought early and cheap. JadeScape's biggest gains came from ~$1,700 psf entries in 2018 (one penthouse gained $4.35 million). Thomson Three saw 99% profitable resales (average ~$251,720). Thomson Grand, bought at higher relative anchors later, was weakest and included some resale losses.</p>
        </details>
        <details>
          <summary>What is "anchoring" in property buying?</summary>
          <p>Anchoring is a mental shortcut where your brain fixes on the first big number it sees and judges everything else against it. In new launches, the en bloc land price or a headline psf becomes the anchor, making the eventual launch price feel "reasonable by comparison" even when it isn't. Awareness is the main defence.</p>
        </details>
        <details>
          <summary>Is Thomson Reserve freehold?</summary>
          <p>No. It is 99-year leasehold, topped up to a fresh 99 years. Some websites wrongly label it freehold &mdash; always confirm tenure yourself before believing a listing.</p>
        </details>
        <details>
          <summary>When does Thomson Reserve launch and TOP?</summary>
          <p>Launch is expected in the second half of 2026 (Q3 or October, unconfirmed). Estimated TOP is around 2031. Plan for roughly five years of progressive payments with no rental income before you can move in or rent out.</p>
        </details>
        <details>
          <summary>Should I buy Thomson Reserve at launch or wait?</summary>
          <p>It depends on your goal. If you want a long-term home in this exact catchment, launch gives you the freshest lease and first pick of stacks. If you are investment-led, it can be worth watching the resale and sub-sale market a few years after TOP, when some launch buyers need to exit &mdash; a pattern visible in older projects on this corridor.</p>
        </details>
      </div>

      <h2>Related Reads</h2>
      <p>1. <a href="/insights/thomson-reserve-price-review-2026" onclick="showArticle('post-thomson-reserve-price-review-2026'); return false;" class="underline hover:text-violet-700"><strong>Thomson Reserve Price Review 2026: Is It Really Too Expensive?</strong></a></p>
      <p>2. <a href="/insights/thomson-reserve-risks-2026" onclick="showArticle('post-thomson-reserve-risks-2026'); return false;" class="underline hover:text-violet-700"><strong>Thomson Reserve Risks: 8 Real Concerns Before You Buy (2026)</strong></a></p>
      <p>3. <a href="/insights/thomson-reserve-prestige-trap-2026" onclick="showArticle('post-thomson-reserve-prestige-trap-2026'); return false;" class="underline hover:text-violet-700"><strong>Thomson Reserve and the Prestige Trap: Why "Good District" May Be Costing You More</strong></a></p>
      <p>4. <a href="/insights/new-launch-vs-resale" onclick="showArticle('post-new-launch-vs-resale'); return false;" class="underline hover:text-violet-700"><strong>New Launch vs Resale Condo in 2026: Which Should You Buy?</strong></a></p>
      <p>5. <a href="/project/thomson-reserve-condo/" class="underline hover:text-violet-700"><strong>Full Thomson Reserve Project Page (Deep Analysis)</strong></a></p>

      <div class="art-disc">
        <strong>Disclaimer.</strong> This article is for general informational purposes and does not constitute financial, tax, or investment advice. Thomson Reserve's official price list has not been released; all price figures referenced are estimates or illustrative and are clearly marked as such. All comparable-project figures are based on publicly available data as of mid-2026 and are subject to change. Property values can go down as well as up. Always conduct your own due diligence and consult a licensed financial advisor, solicitor, and property professional before making any decision.
      </div>
    `
  }

}; // end ARTICLES

if (typeof module !== 'undefined') module.exports = ARTICLES;
