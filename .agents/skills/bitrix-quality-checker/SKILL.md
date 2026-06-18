---
name: bitrix-quality-checker
description: Check final layout or Bitrix integration quality: build status, broken paths, missing assets, risky markup, changed classes, JS initialization, adaptive layout risks and Bitrix template structure.
---

# Bitrix Quality Checker

## Goal

Check that layout or Bitrix integration did not break visual result, assets, classes, JS and adaptive behavior.

## Checks

- build commands;
- missing assets;
- broken relative paths;
- inline styles;
- empty alt;
- risky classes;
- JS initialization;
- duplicated IDs;
- changed class names;
- Bitrix template structure;
- component templates.

## Output

Return:

1. What was checked.
2. Problems.
3. Risk level.
4. Fix recommendations.
5. Commands to verify.