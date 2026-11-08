# No Shorts for YouTube

[Русский](#russian-version) | [English](#english-version)

---

## Russian Version <a id="russian-version"></a>

### Описание

**No Shorts for YouTube** — расширение без настроек. Оно прячет Shorts и часть отвлекающего хрома YouTube и сразу работает: без попапа и без экрана опций.

### Что скрывается

- Полка Shorts на главной, в поиске, в рекомендациях и на каналах
- Пункт Shorts в боковом меню, мини-меню и мобильной навигации
- Карточки Shorts в ленте, поиске, сайдбаре и уведомлениях
- Вкладка Shorts на канале и чип Shorts
- Плеер `/shorts/` — переход на обычный `/watch?v=` (вкладка канала `/shorts` ведёт на `/videos`)
- Remix Shorts, Playables, полка мерча и промо-наги YouTube

Обычный длинный ролик (плеер, описание, комментарии, похожие видео) не трогается.

### Установка

1. Скачайте исходники релиза.
2. Chrome / Edge: `chrome://extensions` → режим разработчика → **Загрузить распакованное**.
3. Firefox: `about:debugging#/runtime/this-firefox` → **Загрузить временное дополнение…** → `manifest.json`.

> Ранее: [Firefox Add-ons](https://addons.mozilla.org/ru/firefox/addon/no-shorts-for-youtube/)

### Лицензия

MIT.

---

## English Version <a id="english-version"></a>

### Description

**No Shorts for YouTube** is a settings-free Web Extension. It hides Shorts and a handful of other attention traps and then stays out of the way: no popup, no options page.

### What it hides

- Shorts shelves on Home, Search, related/sidebar, and channels
- Shorts in the guide, mini-guide, and mobile pivot
- Individual Shorts cards in feeds, search, the watch sidebar, and notifications
- The channel Shorts tab and the Shorts filter chip
- `/shorts/` playback (redirects to the normal `/watch?v=` player; a channel `/shorts` tab goes to `/videos`)
- Shorts remix, Playables, merch shelves, and YouTube promo nags

Normal long-form watch (player, description, comments, related videos) is left alone.

### Install

1. Get the source from a release.
2. Chrome / Edge: `chrome://extensions` → Developer mode → **Load unpacked**.
3. Firefox: `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on…** → `manifest.json`.

> Previously listed on [Firefox Add-ons](https://addons.mozilla.org/ru/firefox/addon/no-shorts-for-youtube/).

This is a standard MV3 Web Extension (content scripts + CSS only) so a later Safari conversion can reuse the same files.

### License

MIT.
