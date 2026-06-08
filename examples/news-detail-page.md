## `examples/news-detail-page.md`

Пример базовой детальной страницы `news.detail`:

```php
<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); ?>

<article class="article-detail">
    <div class="article-detail__container container">
        <h1 class="article-detail__title">
            <?= $arResult["NAME"] ?>
        </h1>

        <?php if (!empty($arResult["DETAIL_PICTURE"]["SRC"])): ?>
            <img
                class="article-detail__image"
                src="<?= $arResult["DETAIL_PICTURE"]["SRC"] ?>"
                alt="<?= htmlspecialchars($arResult["NAME"]) ?>"
            >
        <?php endif; ?>

        <div class="article-detail__content">
            <?= $arResult["DETAIL_TEXT"] ?>
        </div>
    </div>
</article>
```