## `examples/news-list-card.md`

Пример того, как статичная карточка может стать шаблоном `news.list`:

```php
<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); ?>

<section class="articles">
    <div class="articles__container container">
        <?php foreach ($arResult["ITEMS"] as $arItem): ?>
            <article class="article-card">
                <a class="article-card__link" href="<?= $arItem["DETAIL_PAGE_URL"] ?>">
                    <?php if (!empty($arItem["PREVIEW_PICTURE"]["SRC"])): ?>
                        <img
                            class="article-card__image"
                            src="<?= $arItem["PREVIEW_PICTURE"]["SRC"] ?>"
                            alt="<?= htmlspecialchars($arItem["NAME"]) ?>"
                        >
                    <?php endif; ?>

                    <h3 class="article-card__title">
                        <?= $arItem["NAME"] ?>
                    </h3>

                    <?php if (!empty($arItem["PREVIEW_TEXT"])): ?>
                        <p class="article-card__text">
                            <?= $arItem["PREVIEW_TEXT"] ?>
                        </p>
                    <?php endif; ?>
                </a>
            </article>
        <?php endforeach; ?>
    </div>
</section>
```