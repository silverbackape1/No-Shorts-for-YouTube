"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");

describe("portable WebExtension surface", () => {
  it("uses MV3 content_scripts and CSS, with no popup or options UI", () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "manifest.json"), "utf8"));
    assert.equal(manifest.manifest_version, 3);
    assert.ok(manifest.content_scripts[0].css.includes("hide.css"));
    assert.ok(manifest.content_scripts[0].js.includes("rewrite.js"));
    assert.ok(manifest.content_scripts[0].js.includes("content.js"));
    assert.equal(manifest.content_scripts[0].run_at, "document_start");
    assert.equal(manifest.action.default_popup, undefined);
    assert.equal(manifest.options_ui, undefined);
    assert.equal(manifest.options_page, undefined);
    assert.equal(manifest.background, undefined);
    assert.ok(!JSON.stringify(manifest.permissions || []).includes("declarativeNetRequest"));
  });

  it("does not call Chrome-only extension APIs", () => {
    const js = ["content.js", "rewrite.js"]
      .map((name) => fs.readFileSync(path.join(ROOT, name), "utf8"))
      .join("\n");
    assert.doesNotMatch(js, /\bchrome\./);
    assert.doesNotMatch(js, /\bbrowser\./);
    assert.doesNotMatch(js, /declarativeNetRequest/);
    assert.doesNotMatch(js, /\.remove\s*\(/);
  });
});
