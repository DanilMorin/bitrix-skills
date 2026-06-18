---
name: bitrix-template-builder
description: Help convert approved static HTML layout into 1C-Bitrix template structure under /local/templates, including header.php, footer.php, assets and component templates. Use only when the user explicitly asks to start Bitrix integration.
---

# Bitrix Template Builder

## Goal

Help move approved static layout into a Bitrix template structure.

## Hard rules

- Use only when the user explicitly asks to start Bitrix integration.
- Do not run during static layout audit.
- Do not destroy the static preview version.
- Work in a separate Bitrix integration branch or folder.
- Preserve original classes.

## Future structure

```text
/local/templates/site/
  header.php
  footer.php
  template_styles.css
  assets/
  components/