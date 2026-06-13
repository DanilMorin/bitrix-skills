# Risk Levels

## low

Safe changes:

- add missing alt;
- remove inline-style into existing SCSS;
- add button type;
- add data attributes;
- add semantic tag when structure is obvious;
- improve JS element existence checks.

## medium

Requires visual check:

- change HTML nesting;
- add wrapper;
- combine similar blocks;
- move SCSS between files;
- rename secondary classes.

## high

Do not apply automatically:

- convert HTML to PHP;
- add Bitrix IncludeComponent;
- change layout grid;
- mass rename classes;
- rewrite JS architecture;
- change build system.