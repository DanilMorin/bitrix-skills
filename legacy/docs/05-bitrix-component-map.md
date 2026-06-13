# Карта будущей Bitrix-архитектуры

## Задача

Связать текущие HTML-блоки с будущими сущностями Bitrix.

## Типы сущностей

- site template;
- include area;
- menu;
- breadcrumb;
- news.list;
- news.detail;
- news;
- catalog.section;
- form component;
- custom component;
- static block.

## Таблица карты

| HTML-блок | Текущие файлы | Роль | Будущая Bitrix-сущность | Данные | Риск |
|---|---|---|---|---|---|

## Пример

| HTML-блок | Текущие файлы | Роль | Будущая Bitrix-сущность | Данные | Риск |
|---|---|---|---|---|---|
| .cases-item | blog.html | карточка статьи | news.list | title, image, tags, url | low |
| .article-text | article.html | детальная статья | news.detail | title, text, date, tags | medium |