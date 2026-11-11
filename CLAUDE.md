# sellingsgproperty - Claude Code Rules

## Project
- Static site for Selling SG Property
- Main work happens in the subpage: project/lentor-gardens-residences/index.html

## Rules
- When user says "change to this" + pastes HTML, replace the full content of the target file.
- Images for Lentor live in the same folder as index.html. Use relative paths: lentor-gardens-hero.jpg, lentor-gardens-site-plan.jpeg, etc.
- Only edit inside project/lentor-gardens-residences/ unless told otherwise.
- Never touch the One Chuan Grove site (~/the-one-chuan-grove, the-one-chuan-grove.sg). It is a separate site. All changes happen only in the sellingsgproperty.sg site.
- When user says "deploy", run:
  git add project/lentor-gardens-residences/
  git commit -m "update lentor gardens subpage"
  git push origin main
- Always show the git diff before committing.
- Be precise with edits.
