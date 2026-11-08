# Install / Установка

[Русский](#russian-version) | [English](#english-version)

The same MV3 files (`manifest.json`, `hide.css`, `rewrite.js`, `content.js`) work in Chromium browsers and, through the Xcode wrapper in `safari/`, in Safari on macOS. There is no popup and no settings screen.

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

### 4. Safari на macOS (Xcode)

Safari не умеет «загрузить распакованное» как Chrome. Нужно один раз собрать маленькое приложение-обёртку. **Платный Apple Developer Program не нужен.** iOS в этот проект не входит.

#### Что понадобится

- Mac с macOS 12 или новее
- [Xcode](https://apps.apple.com/app/xcode/id497799835) из App Store (бесплатно, большой загрузчик)
- Исходники из шага 1

#### Шаг A — откройте проект

1. Запустите **Xcode**. Если он предложит поставить дополнительные компоненты — согласитесь.
2. **File → Open…** и выберите  
   `safari/NoShortsForYouTube.xcodeproj`
3. В панели слева кликните по синей иконке проекта **NoShortsForYouTube**.
4. Выберите target **NoShortsForYouTube**, вкладка **Signing & Capabilities**:
   - **Team:** None
   - **Signing Certificate:** Sign to Run Locally
5. То же самое для target **NoShortsForYouTube Extension**.

В репозитории это уже проставлено (`CODE_SIGN_IDENTITY = "-"`). Если Xcode всё равно ругается на подпись — вручную выберите **Sign to Run Locally** у обоих target. Если сборка падает на Hardened Runtime — на той же вкладке снимите галочку **Hardened Runtime**.

#### Шаг B — соберите и запустите

1. В верхней панели Xcode в схеме должно быть **NoShortsForYouTube** и **My Mac**.
2. Нажмите кнопку **▶ Run** (или **Product → Run**, ⌘R).
3. Откроется маленькое окно приложения. Оно нужно только затем, чтобы Safari увидел расширение. Можно сразу закрыть.

Из Терминала (если Xcode уже установлен):

```bash
xcodebuild \
  -project safari/NoShortsForYouTube.xcodeproj \
  -scheme NoShortsForYouTube \
  -configuration Debug \
  -destination 'platform=macOS' \
  CODE_SIGN_IDENTITY="-" \
  CODE_SIGNING_ALLOWED=YES
```

Готовое приложение появится в DerivedData Xcode. Проще нажать ▶ в Xcode.

#### Шаг C — разрешите неподписанные расширения

Safari по умолчанию прячет расширения без сертификата разработчика.

1. Откройте **Safari → Настройки…** (⌘,).
2. Вкладка **Дополнения** (Advanced) → включите **Показывать функции для веб-разработчиков**  
   (*Show features for web developers*; в старых Safari: «Показывать меню „Разработка“»).
3. Вкладка **Разработка** (Developer) → включите **Разрешить неподписанные расширения** (*Allow unsigned extensions*). macOS может спросить пароль.
4. **Этот флажок сбрасывается каждый раз, когда вы полностью закрываете Safari.** После следующего запуска Safari поставьте его снова.

#### Шаг D — включите расширение

1. **Safari → Настройки → Расширения** (Extensions).
2. В списке слева поставьте галочку у **No Shorts for YouTube**.
3. Откройте [youtube.com](https://www.youtube.com). Если Safari спросит доступ к сайту — разрешите **youtube.com** (Always Allow / На этот день — как удобно).
4. Обновите вкладку. Shorts должны исчезнуть так же, как в Chrome.

В окне приложения-обёртки есть кнопка, которая открывает эти настройки Safari.

#### Если расширения нет в списке

- Убедитесь, что приложение **No Shorts for YouTube** хотя бы один раз запускалось (шаг B).
- Проверьте, что «Allow unsigned extensions» включено *после* запуска Safari.
- Полностью закройте Safari (Safari → Quit) и откройте снова, затем повторите шаги C и D.

### 5. Safari без Xcode (временное расширение)

В Safari 18 и новее можно подключить папку расширения без сборки:

1. Выполните шаг C выше (меню разработчика + Allow unsigned extensions).
2. **Safari → Настройки → Разработка → Add Temporary Extension…**
3. Выберите папку с `manifest.json`.
4. Включите расширение на вкладке **Расширения**.

Safari снимает временные расширения через 24 часа или при выходе из Safari. Для постоянного варианта используйте Xcode (раздел 4).

### 6. Пересобрать обёртку конвертером Apple

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

### 4. Safari on macOS (Xcode)

Safari cannot “load unpacked” the way Chrome does. You build a tiny host app once. **You do not need a paid Apple Developer Program membership.** This wrapper is macOS-only (no iOS target).

#### What you need

- A Mac running macOS 12 or later
- [Xcode](https://apps.apple.com/app/xcode/id497799835) from the App Store (free, large download)
- The source from step 1

#### Step A — open the project

1. Launch **Xcode**. Install extra components if it asks.
2. **File → Open…** and choose  
   `safari/NoShortsForYouTube.xcodeproj`
3. In the left sidebar, click the blue **NoShortsForYouTube** project icon.
4. Select the **NoShortsForYouTube** target → **Signing & Capabilities**:
   - **Team:** None
   - **Signing Certificate:** Sign to Run Locally
5. Repeat for the **NoShortsForYouTube Extension** target.

The repo already sets `CODE_SIGN_IDENTITY = "-"`. If Xcode still complains about signing, pick **Sign to Run Locally** on both targets yourself. If the build fails on Hardened Runtime, uncheck **Hardened Runtime** on the same tab for both targets.

#### Step B — build and run

1. In Xcode’s toolbar the scheme should be **NoShortsForYouTube** and the destination **My Mac**.
2. Click **▶ Run** (or **Product → Run**, ⌘R).
3. A small app window appears. It only exists so Safari can see the extension. You can close it.

From Terminal (full Xcode already installed):

```bash
xcodebuild \
  -project safari/NoShortsForYouTube.xcodeproj \
  -scheme NoShortsForYouTube \
  -configuration Debug \
  -destination 'platform=macOS' \
  CODE_SIGN_IDENTITY="-" \
  CODE_SIGNING_ALLOWED=YES
```

The built app lands in Xcode’s DerivedData. Using ▶ in Xcode is easier.

#### Step C — allow unsigned extensions

Safari hides extensions that are not signed with a developer certificate.

1. Open **Safari → Settings…** (⌘,).
2. **Advanced** tab → enable **Show features for web developers**  
   (older Safari: “Show Develop menu in menu bar”).
3. **Developer** tab → enable **Allow unsigned extensions**. macOS may ask for your password.
4. **This checkbox resets every time you fully quit Safari.** Turn it on again after the next launch.

#### Step D — enable the extension

1. **Safari → Settings → Extensions**.
2. Check **No Shorts for YouTube** in the list on the left.
3. Open [youtube.com](https://www.youtube.com). If Safari asks for access, allow **youtube.com**.
4. Reload the tab. Shorts should hide the same way they do in Chrome.

The host app window has a button that jumps to these Safari settings.

#### If the extension does not appear

- Make sure the **No Shorts for YouTube** app ran at least once (step B).
- Confirm **Allow unsigned extensions** is on *after* Safari launched.
- Quit Safari completely (**Safari → Quit**) and reopen it, then repeat steps C and D.

### 5. Safari without Xcode (temporary extension)

Safari 18 and later can load the folder directly:

1. Do step C above (developer features + Allow unsigned extensions).
2. **Safari → Settings → Developer → Add Temporary Extension…**
3. Choose the folder that contains `manifest.json`.
4. Enable it on the **Extensions** tab.

Safari drops temporary extensions after 24 hours or when you quit Safari. Use the Xcode app (section 4) for something that stays installed.

### 6. Regenerating the wrapper with Apple’s converter

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
