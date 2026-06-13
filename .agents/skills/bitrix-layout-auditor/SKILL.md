---
name: bitrix-layout-auditor
description: Audit and safely improve static HTML/SCSS/JS layouts before future 1C-Bitrix integration. Use this skill for semantic HTML, clean markup, accessibility basics, SCSS quality, JS safety, repeated blocks, and low-risk refactoring without converting the project to PHP.
---

# Bitrix Layout Auditor

## Goal

Analyze static HTML/SCSS/JS layout and prepare it for future 1C-Bitrix integration without breaking the current visual result.

## When to use

Use this skill when the user asks to:

- audit static layout before Bitrix integration;
- improve HTML semantics;
- check markup quality;
- find unsafe `div` usage;
- find inline styles;
- check image alt attributes;
- check SCSS structure;
- check JS selectors and initialization;
- safely refactor layout without changing design.

## Hard rules

- Do not convert HTML to PHP.
- Do not create Bitrix templates.
- Do not add `IncludeComponent`.
- Do not break GitHub Pages preview.
- Do not rename classes without strong reason.
- Do not replace every `div` with `section` mechanically.
- Preserve current visual output.
- First return an audit report.
- Apply code changes only if explicitly requested.

## Semantic HTML rules

Use semantic tags only when they match the meaning:

- `main` — main page content.
- `section` — independent page section, usually with a heading.
- `article` — independent content item: card, article, case, news item.
- `nav` — navigation.
- `header` — page or section header.
- `footer` — page or section footer.
- `button` — action.
- `a` — navigation/link.
- `div` — technical wrapper without semantic meaning.

Never replace `div` with `section` only because `div` looks “bad”.

## Workflow

1. Inspect project structure.
2. Find HTML, SCSS and JS files.
3. Find repeated blocks.
4. Check semantic HTML.
5. Check inline styles.
6. Check empty or missing alt attributes.
7. Check risky class names.
8. Check JS selectors.
9. Return a report with risk levels.
10. Suggest only low-risk changes first.

## Risk levels

- `low` — safe to apply now.
- `medium` — requires visual check.
- `high` — postpone until Bitrix integration.

## Output format

Return:

1. Summary.
2. Found problems.
3. Repeated blocks.
4. Semantic HTML suggestions.
5. Low-risk fixes.
6. Medium/high-risk suggestions.
7. Verification steps.