# sellingsgproperty - Claude Code Rules

## Project
- Static site for Selling SG Property
- Main work happens in the subpage: project/lentor-gardens-residences/index.html

## Rules
- When user says "change to this" + pastes HTML, replace the full content of the target file.
- Images for Lentor live in the same folder as index.html. Use relative paths: lentor-gardens-hero.jpg, lentor-gardens-site-plan.jpeg, etc.
- Only edit inside project/lentor-gardens-residences/ unless told otherwise.
- When user says "deploy", run:
  git add project/lentor-gardens-residences/
  git commit -m "update lentor gardens subpage"
  git push origin main
- Always show the git diff before committing.
- Be precise with edits.
