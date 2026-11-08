# Install / Установка

[Русский](#russian-version) | [English](#english-version)

The same MV3 files (`manifest.json`, `hide.css`, `rewrite.js`, `content.js`) work in Chromium browsers and, through a prebuilt macOS app on [Releases](https://github.com/silverbackape1/No-Shorts-for-YouTube/releases), in Safari. There is no popup and no settings screen. You do not need Xcode.

---

## Russian Version <a id="russian-version"></a>

### 1. Скачайте исходники

1. Откройте репозиторий на GitHub.
2. Нажмите зелёную кнопку **Code → Download ZIP** и распакуйте архив.
3. Либо в Терминале: `git clone https://github.com/silverbackape1/No-Shorts-for-YouTube.git`

Дальше нужна **папка, в которой лежит `manifest.json`** (корень проекта).

### 2. Chrome / Edge / Brave (Chromium)

Платное место в Chrome Web Store не нужно. Ставите как распакованное расширение.

1. Откройте Chrome (или Edge / Brave).
2. В адресной строке введите `chrome://extensions` (в Edge: `edge://extensions`, в Brave: `brave://extensions`) и нажмите Enter.
3. В правом верхнем углу включите **Режим разработчика** (Developer mode).
4. Нажмите **Загрузить распакованное расширение** (Load unpacked).
5. Укажите папку с `manifest.json` (корень скачанного проекта, не папку `safari/` и не `test/`).
6. Откройте [youtube.com](https://www.youtube.com). Shorts в меню, полках и карточках должны пропасть; клик по `/shorts/…` откроет обычный плеер `/watch?v=`.

Чтобы обновлять: после `git pull` (или новой ZIP-версии) на странице расширений нажмите кнопку обновления на карточке **No Shorts for YouTube**.

### 3. Firefox

1. Откройте Firefox и перейдите на `about:debugging#/runtime/this-firefox`.
2. Нажмите **Загрузить временное дополнение…** (Load Temporary Add-on…).
3. Выберите файл `manifest.json` в корне проекта.
4. Временное дополнение снимается при перезапуске Firefox — загрузите его снова.

> Ранее расширение было в [каталоге Firefox Add-ons](https://addons.mozilla.org/ru/firefox/addon/no-shorts-for-youtube/).

### 4. Safari на macOS (без Xcode)

**Xcode качать не нужно** (это ~10 ГБ). Готовое приложение собирается на GitHub и лежит в [Releases](https://github.com/silverbackape1/No-Shorts-for-YouTube/releases). Платный Apple Developer Program тоже не нужен. iOS в этот проект не входит.

1. Откройте [Releases](https://github.com/silverbackape1/No-Shorts-for-YouTube/releases) и скачайте **NoShortsForYouTube-Safari-macOS.zip** (последний тег `v…`).
2. Распакуйте архив. Внутри папка с `NoShortsForYouTube.app` и файлом «Read Me.txt».
3. По желанию перетащите приложение в **Программы**.
4. Если macOS пишет, что разработчика проверить не удалось: **Control-клик** (правый клик) по приложению → **Открыть** → **Открыть**.  
   Либо в Терминале: `xattr -cr NoShortsForYouTube.app`
5. **Запустите приложение один раз**, чтобы Safari его увидел. Окно можно сразу закрыть.

#### Разрешите неподписанные расширения

Safari по умолчанию прячет расширения без сертификата разработчика.

1. Откройте **Safari → Настройки…** (⌘,).
2. Вкладка **Дополнения** (Advanced) → включите **Показывать функции для веб-разработчиков**  
   (*Show features for web developers*; в старых Safari: «Показывать меню „Разработка“»).
3. Вкладка **Разработка** (Developer) → включите **Разрешить неподписанные расширения** (*Allow unsigned extensions*). macOS может спросить пароль.
4. **Этот флажок сбрасывается каждый раз, когда вы полностью закрываете Safari.** После следующего запуска Safari поставьте его снова.

#### Включите расширение

1. **Safari → Настройки → Расширения** (Extensions).
2. В списке слева поставьте галочку у **No Shorts for YouTube**.
3. Откройте [youtube.com](https://www.youtube.com). Если Safari спросит доступ к сайту — разрешите **youtube.com** (Always Allow / На этот день — как удобно).
4. Обновите вкладку. Shorts должны исчезнуть так же, как в Chrome.

В окне приложения-обёртки есть кнопка, которая открывает эти настройки Safari.

#### Если расширения нет в списке

- Убедитесь, что **NoShortsForYouTube.app** хотя бы один раз запускалось.
- Проверьте, что «Allow unsigned extensions» включено *после* запуска Safari.
- Полностью закройте Safari (Safari → Quit) и откройте снова, затем снова включите неподписанные расширения и само расширение.

### 5. Safari, временное расширение (тоже без Xcode)

В Safari 18 и новее можно подключить папку исходников без приложения. Это держится **до 24 часов или до выхода из Safari** — для постоянного варианта берите zip из Releases (раздел 4).

1. Скачайте исходники (шаг 1) и включите неподписанные расширения, как в разделе 4.
2. **Safari → Настройки → Разработка → Add Temporary Extension…**
3. Выберите папку с `manifest.json`.
4. Включите расширение на вкладке **Расширения**.

### 6. Собрать самому (необязательно, нужен Xcode)

Только если вы меняете код и не хотите ждать CI. Обычным людям этот раздел не нужен.

1. Установите [Xcode](https://apps.apple.com/app/xcode/id497799835) из App Store.
2. Откройте `safari/NoShortsForYouTube.xcodeproj`.
3. Оба target: **Signing & Capabilities** → Team None, **Sign to Run Locally**. Если сборка падает на Hardened Runtime — снимите эту галочку.
4. Схема **NoShortsForYouTube**, назначение **My Mac**, ▶ Run.

```bash
bash safari/build-macos.sh
# zip появится в dist/NoShortsForYouTube-Safari-macOS.zip
```

Или напрямую:

```bash
xcodebuild \
  -project safari/NoShortsForYouTube.xcodeproj \
  -scheme NoShortsForYouTube \
  -configuration Release \
  -destination 'generic/platform=macOS' \
  CODE_SIGN_IDENTITY="-" \
  CODE_SIGNING_ALLOWED=YES \
  ENABLE_HARDENED_RUNTIME=NO
```

Релиз на GitHub собирается workflow `.github/workflows/safari-release.yml` при пуше тега `v*` (например `git tag v2.0.0 && git push origin v2.0.0`).

### 7. Пересобрать обёртку конвертером Apple

Проект в `safari/` уже соответствует выходу `safari-web-extension-converter --macos-only` и **ссылается на файлы в корне репозитория**, а не копирует их. Если нужно сгенерировать проект заново на своём Mac:

```bash
xcrun safari-web-extension-converter . \
  --macos-only \
  --swift \
  --app-name "No Shorts for YouTube" \
  --bundle-identifier com.silverbackape1.NoShortsForYouTube \
  --project-location ./safari-generated \
  --no-open \
  --no-prompt
```

(В новых Xcode команда может называться `safari-web-extension-packager` — это то же самое.) Не передавайте `--copy-resources`, чтобы Chrome и Safari продолжали жить с одними и теми же `content.js` / `hide.css`.

---

## English Version <a id="english-version"></a>

### 1. Get the source

1. Open the GitHub repo.
2. Click the green **Code → Download ZIP** button and unzip it.
3. Or, in Terminal: `git clone https://github.com/silverbackape1/No-Shorts-for-YouTube.git`

You need the **folder that contains `manifest.json`** (the project root).

### 2. Chrome / Edge / Brave (Chromium)

No store listing is required. Load it unpacked.

1. Open Chrome (or Edge / Brave).
2. Go to `chrome://extensions` (Edge: `edge://extensions`, Brave: `brave://extensions`).
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked**.
5. Select the folder that contains `manifest.json` (the project root — not `safari/` and not `test/`).
6. Open [youtube.com](https://www.youtube.com). Shorts in the guide, shelves, and cards should disappear; `/shorts/…` links open the normal `/watch?v=` player.

To update: after `git pull` (or a new ZIP), click the reload button on the **No Shorts for YouTube** card.

### 3. Firefox

1. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…**.
3. Choose `manifest.json` at the project root.
4. Temporary add-ons vanish when Firefox quits — load it again.

> Previously listed on [Firefox Add-ons](https://addons.mozilla.org/ru/firefox/addon/no-shorts-for-youtube/).

### 4. Safari on macOS (no Xcode)

**You do not need Xcode** (~10 GB). A prebuilt app is published on [Releases](https://github.com/silverbackape1/No-Shorts-for-YouTube/releases). No paid Apple Developer Program either. This wrapper is macOS-only (no iOS target).

1. Open [Releases](https://github.com/silverbackape1/No-Shorts-for-YouTube/releases) and download **NoShortsForYouTube-Safari-macOS.zip** (latest `v…` tag).
2. Unzip it. You get a folder with `NoShortsForYouTube.app` and `Read Me.txt`.
3. Optionally drag the app into **Applications**.
4. If macOS says the developer cannot be verified: **Control-click** the app → **Open** → **Open**.  
   Or in Terminal: `xattr -cr NoShortsForYouTube.app`
5. **Launch the app once** so Safari can see it. You can close the window.

#### Allow unsigned extensions

Safari hides extensions that are not signed with a developer certificate.

1. Open **Safari → Settings…** (⌘,).
2. **Advanced** tab → enable **Show features for web developers**  
   (older Safari: “Show Develop menu in menu bar”).
3. **Developer** tab → enable **Allow unsigned extensions**. macOS may ask for your password.
4. **This checkbox resets every time you fully quit Safari.** Turn it on again after the next launch.

#### Enable the extension

1. **Safari → Settings → Extensions**.
2. Check **No Shorts for YouTube** in the list on the left.
3. Open [youtube.com](https://www.youtube.com). If Safari asks for access, allow **youtube.com**.
4. Reload the tab. Shorts should hide the same way they do in Chrome.

The host app window has a button that jumps to these Safari settings.

#### If the extension does not appear

- Make sure **NoShortsForYouTube.app** ran at least once.
- Confirm **Allow unsigned extensions** is on *after* Safari launched.
- Quit Safari completely (**Safari → Quit**) and reopen it, then turn unsigned extensions and the extension back on.

### 5. Safari temporary extension (also no Xcode)

Safari 18 and later can load the source folder without the app. It lasts **24 hours or until you quit Safari** — for a lasting install use the Releases zip (section 4).

1. Get the source (step 1) and enable unsigned extensions as in section 4.
2. **Safari → Settings → Developer → Add Temporary Extension…**
3. Choose the folder that contains `manifest.json`.
4. Enable it on the **Extensions** tab.

### 6. Build it yourself (optional, needs Xcode)

Only if you are changing the code and do not want to wait for CI. Skip this as a normal user.

1. Install [Xcode](https://apps.apple.com/app/xcode/id497799835) from the App Store.
2. Open `safari/NoShortsForYouTube.xcodeproj`.
3. Both targets: **Signing & Capabilities** → Team None, **Sign to Run Locally**. If the build fails on Hardened Runtime, uncheck it.
4. Scheme **NoShortsForYouTube**, destination **My Mac**, ▶ Run.

```bash
bash safari/build-macos.sh
# zip lands at dist/NoShortsForYouTube-Safari-macOS.zip
```

Or:

```bash
xcodebuild \
  -project safari/NoShortsForYouTube.xcodeproj \
  -scheme NoShortsForYouTube \
  -configuration Release \
  -destination 'generic/platform=macOS' \
  CODE_SIGN_IDENTITY="-" \
  CODE_SIGNING_ALLOWED=YES \
  ENABLE_HARDENED_RUNTIME=NO
```

GitHub Releases are produced by `.github/workflows/safari-release.yml` when a `v*` tag is pushed (`git tag v2.0.0 && git push origin v2.0.0`).

### 7. Regenerating the wrapper with Apple’s converter

`safari/` already matches `safari-web-extension-converter --macos-only` and **references the repo-root extension files** instead of copying them. To regenerate on a Mac:

```bash
xcrun safari-web-extension-converter . \
  --macos-only \
  --swift \
  --app-name "No Shorts for YouTube" \
  --bundle-identifier com.silverbackape1.NoShortsForYouTube \
  --project-location ./safari-generated \
  --no-open \
  --no-prompt
```

(Newer Xcode may spell the tool `safari-web-extension-packager` — same job.) Omit `--copy-resources` so Chrome and Safari keep sharing `content.js` / `hide.css`.
