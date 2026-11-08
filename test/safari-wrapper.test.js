"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const SAFARI = path.join(ROOT, "safari");
const PBX = path.join(
  SAFARI,
  "NoShortsForYouTube.xcodeproj",
  "project.pbxproj"
);
const EXT_PLIST = path.join(
  SAFARI,
  "NoShortsForYouTube Extension",
  "Info.plist"
);
const INSTALL = path.join(ROOT, "INSTALL.md");
const README = path.join(ROOT, "README.md");

describe("Safari macOS wrapper", () => {
  it("ships a macOS-only Xcode project that embeds a Safari web extension", () => {
    const pbx = fs.readFileSync(PBX, "utf8");
    assert.match(pbx, /com\.apple\.product-type\.app-extension/);
    assert.match(pbx, /com\.apple\.product-type\.application/);
    assert.match(pbx, /SDKROOT = macosx/);
    assert.match(pbx, /SUPPORTED_PLATFORMS = macosx/);
    assert.doesNotMatch(pbx, /iphoneos|iphonesimulator|SDKROOT = iphoneos/i);
    assert.match(
      pbx,
      /PRODUCT_BUNDLE_IDENTIFIER = com\.silverbackape1\.NoShortsForYouTube;/
    );
    assert.match(
      pbx,
      /PRODUCT_BUNDLE_IDENTIFIER = com\.silverbackape1\.NoShortsForYouTube\.Extension;/
    );
    assert.match(pbx, /CODE_SIGN_IDENTITY = "-"/);
  });

  it("wraps the repo-root MV3 files instead of copying Shorts-hiding logic", () => {
    const pbx = fs.readFileSync(PBX, "utf8");
    assert.match(pbx, /path = manifest\.json/);
    assert.match(pbx, /path = content\.js/);
    assert.match(pbx, /path = rewrite\.js/);
    assert.match(pbx, /path = hide\.css/);
    assert.match(pbx, /path = icons/);
    assert.match(pbx, /path = \.\.\s*;/);
    assert.match(pbx, /sourceTree = SOURCE_ROOT/);

    for (const name of ["content.js", "rewrite.js", "hide.css", "manifest.json"]) {
      assert.equal(
        fs.existsSync(path.join(SAFARI, "NoShortsForYouTube Extension", name)),
        false,
        "extension target must not duplicate " + name
      );
    }
  });

  it("registers the Safari web-extension point", () => {
    const plist = fs.readFileSync(EXT_PLIST, "utf8");
    assert.match(plist, /com\.apple\.Safari\.web-extension/);
    assert.match(plist, /SafariWebExtensionHandler/);
  });

  it("keeps the host app as an enabler, not a settings UI", () => {
    const view = fs.readFileSync(
      path.join(SAFARI, "NoShortsForYouTube", "ViewController.swift"),
      "utf8"
    );
    assert.match(view, /extensionBundleIdentifier/);
    assert.match(view, /showPreferencesForExtension/);
    assert.doesNotMatch(view, /NSSwitch|Toggle|UserDefaults/);
  });
});

describe("install guide", () => {
  it("is linked from README and covers Chromium load-unpacked plus Safari unsigned enable", () => {
    const readme = fs.readFileSync(README, "utf8");
    const install = fs.readFileSync(INSTALL, "utf8");
    assert.match(readme, /INSTALL\.md/);
    assert.match(install, /chrome:\/\/extensions/);
    assert.match(install, /Load unpacked|Загрузить распакованное/i);
    assert.match(install, /safari\/NoShortsForYouTube\.xcodeproj/);
    assert.match(install, /Allow unsigned extensions/);
    assert.match(install, /Sign to Run Locally/);
    assert.match(install, /xcodebuild/);
    assert.match(install, /safari-web-extension-converter/);
  });

  it("tells people to download a prebuilt Safari app instead of installing Xcode", () => {
    const readme = fs.readFileSync(README, "utf8");
    const install = fs.readFileSync(INSTALL, "utf8");
    const workflow = fs.readFileSync(
      path.join(ROOT, ".github/workflows/safari-release.yml"),
      "utf8"
    );
    assert.match(readme, /NoShortsForYouTube-Safari-macOS\.zip/);
    assert.match(install, /NoShortsForYouTube-Safari-macOS\.zip/);
    assert.match(install, /github\.com\/silverbackape1\/No-Shorts-for-YouTube\/releases/);
    assert.match(install, /Xcode качать не нужно|do not need Xcode/i);
    assert.match(workflow, /macos-latest/);
    assert.match(workflow, /safari\/build-macos\.sh/);
    assert.match(workflow, /gh release create/);
  });
});
