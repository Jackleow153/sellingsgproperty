#!/bin/bash
# Monthly refresh of EdgeProp profitable / unprofitable resale counts, run on Jack's Mac by launchd
# (~/Library/LaunchAgents/com.sellingsgproperty.profit.plist, 4th of each month 11:07).
# EdgeProp blocks GitHub's machines, so this part cannot run in the GitHub workflow.
# Reads new condos and the 100 oldest counts, refreshes the 3 km tables (URA key from ~/.ura_access_key),
# rebuilds, then commits and pushes only if something changed. Skips the run if the repo has local edits.
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
if [ -z "$(git status --porcelain -- data assets condo-analysis)" ]; then echo "No change."; exit 0; fi
git add -A -- data assets condo-analysis
git commit -q -m "Monthly EdgeProp profit counts for the 3 km resale tables"
for i in 1 2 3; do git pull -q --rebase origin main && git push -q origin main && { echo "Pushed $(git log --oneline -1)"; exit 0; }; sleep 20; done
echo "push failed"; exit 1
