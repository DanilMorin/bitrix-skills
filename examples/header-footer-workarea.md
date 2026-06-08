## `examples/header-footer-workarea.md`

Пример разделения страницы на header, рабочую область и footer:

```php
<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Название страницы");
?>

<main class="page">
    <!-- work area -->
</main>

<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");
?>
```
