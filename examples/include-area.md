## `examples/include-area.md`

Пример включаемой области:

```php
<?php
$APPLICATION->IncludeFile(
    SITE_DIR . "include/cta.php",
    [],
    [
        "MODE" => "html",
        "NAME" => "CTA-блок"
    ]
);
?>
```
