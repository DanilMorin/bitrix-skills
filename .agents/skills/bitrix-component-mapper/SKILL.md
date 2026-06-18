---
name: bitrix-component-mapper
description: Map static HTML blocks to future 1C-Bitrix entities such as site template, header, footer, work area, include areas, news.list, news.detail, menu, breadcrumb, iblocks and custom components.
---

# Bitrix Component Mapper

## Goal

Analyze static layout and create a future Bitrix architecture map.

## When to use

Use this skill when the user asks:

- what blocks will become Bitrix components;
- how to split layout into header.php/footer.php;
- what should become infoblocks;
- how to prepare a component map;
- how to plan Bitrix integration.

## Hard rules

- Do not convert files to PHP.
- Do not create Bitrix components yet.
- Do not edit code unless explicitly requested.
- First create an architecture report.

## Mapping rules

Map blocks to:

- site template;
- header.php;
- footer.php;
- work area;
- include area;
- bitrix:menu;
- bitrix:breadcrumb;
- bitrix:news.list;
- bitrix:news.detail;
- bitrix:news;
- custom component;
- static block.

## Output

Return a table:

| HTML block | Current files | Role | Future Bitrix entity | Dynamic data | Risk |
|---|---|---|---|---|---|