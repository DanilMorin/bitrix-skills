# HTML Semantics

## Main principle

Semantic tags must describe the meaning of the content, not just replace `div`.

## Tags

### main

Use once per page for the main content.

### section

Use for independent page sections. A section should usually have a heading.

Good:

```html
<section class="services">
  <h2 class="services__title">Услуги</h2>
  ...
</section>

Bad:

```html
<section class="services__wrapper">
  ...
</section>
```
## Description
If it is only a wrapper, use div.

article

Use for independent content items:

blog card;
news card;
case card;
review card;
product card.
nav

Use for navigation blocks.

button

Use for actions.

a

Use for links and navigation.

Rule for AI

Do not replace tags mechanically. Explain every semantic replacement.