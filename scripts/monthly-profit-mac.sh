#!/bin/bash
# Monthly refresh of EdgeProp profitable / unprofitable resale counts, run on Jack's Mac by launchd
# (~/Library/LaunchAgents/com.sellingsgproperty.profit.plist, 4th of each month 11:07).
# EdgeProp blocks GitHub's machines, so this part cannot run in the GitHub workflow.
# Reads new condos and the 100 oldest counts, refreshes the 3 km tables (URA key from ~/.ura_access_key),
# rebuilds, refreshes URA resales for the undervalued condo screen (/undervalued-pty/), then commits and pushes only if something changed. Skips the run if the repo has local edits.
# Log: ~/Library/Logs/sellingsgproperty-profit.log
set -u
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
cd "$(dirname "$0")/.." || exit 1
echo "=== $(date '+%Y-%m-%d %H:%M') monthly profit refresh"
if [ -n "$(git status --porcelain -- . ':!.claude')" ]; then echo "Local edits in the repo: skipped this run (run it by hand later)."; exit 0; fi
git checkout -q main && git pull -q --rebase origin main || { echo "git pull failed"; exit 1; }
[ -d node_modules ] || npm install --no-audit --no-fund -q
for i in 1 2 3 4 5; do node scripts/edgeprop-profit.mjs && break; pkill -f remote-debugging-port=9371; done
node scripts/ura-resale.cjs || exit 1
node scripts/build-pages.cjs || exit 1
# Undervalued condo screen (/undervalued-pty/): fresh URA resales and rents, then the screen and its page.
# If URA's service is down, the old data stays and the page is left as it is.
before=$(shasum data/comp-tx.json 2>/dev/null)
node scripts/ura-comps.cjs || echo "ura-comps failed: undervalued screen keeps last month's data"
# sanity check: enough condos, and rents for most of them (a failed rental feed would silently drop the rent checks)
python3 -c "import json,sys; p=json.load(open('data/comp-tx.json'))['p']; r=sum(1 for v in p.values() if v.get('rent')); sys.exit(0 if len(p)>=1500 and r>=0.5*len(p) else 1)" \
  || { echo "comp-tx.json failed the sanity check: restored last month's file"; git checkout -q -- data/comp-tx.json; }
if [ "$before" != "$(shasum data/comp-tx.json 2>/dev/null)" ]; then
  python3 scripts/analysis/value_screen.py && python3 scripts/build-value-page.py || { echo "value screen failed"; git checkout -q -- data/value-screen.json undervalued-pty sitemap.xml; }
fi
if [ -z "$(git status --porcelain -- data assets condo-analysis undervalued-pty sitemap.xml)" ]; then echo "No change."; exit 0; fi
git add -A -- data assets condo-analysis undervalued-pty sitemap.xml
git commit -q -m "Monthly refresh: EdgeProp profit counts, URA resales and the undervalued condo screen"
touched_value=$(git show --name-only --format= HEAD | grep -c '^undervalued-pty/')
for i in 1 2 3; do git pull -q --rebase origin main && git push -q origin main && {
  echo "Pushed $(git log --oneline -1)"
  # tell Bing / Copilot / ChatGPT search once Netlify has deployed the refreshed page
  if [ "$touched_value" -gt 0 ]; then sleep 120; node scripts/indexnow.cjs https://www.sellingsgproperty.com/undervalued-pty/; fi
  exit 0; }; sleep 20; done
echo "push failed"; exit 1
