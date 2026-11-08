"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { rewriteYouTubeLocation, isShortsPath } = require("../rewrite.js");

describe("rewriteYouTubeLocation", () => {
  it("sends a Shorts video to the regular watch player", () => {
    assert.equal(
      rewriteYouTubeLocation("/shorts/dQw4w9WgXcQ", "", ""),
      "/watch?v=dQw4w9WgXcQ"
    );
  });

  it("keeps extra query params and the hash", () => {
    assert.equal(
      rewriteYouTubeLocation("/shorts/dQw4w9WgXcQ/", "?feature=share", "#t=3"),
      "/watch?feature=share&v=dQw4w9WgXcQ#t=3"
    );
  });

  it("sends the Shorts feed home", () => {
    assert.equal(rewriteYouTubeLocation("/shorts", "", ""), "/");
    assert.equal(rewriteYouTubeLocation("/shorts/", "", "#x"), "/#x");
  });

  it("sends channel Shorts tabs to Videos", () => {
    assert.equal(
      rewriteYouTubeLocation("/@veritasium/shorts", "", ""),
      "/@veritasium/videos"
    );
    assert.equal(
      rewriteYouTubeLocation("/channel/UC123/shorts/", "", ""),
      "/channel/UC123/videos"
    );
    assert.equal(
      rewriteYouTubeLocation("/c/Name/shorts", "", ""),
      "/c/Name/videos"
    );
    assert.equal(
      rewriteYouTubeLocation("/user/Name/shorts", "", ""),
      "/user/Name/videos"
    );
  });

  it("leaves long-form watch and home alone", () => {
    assert.equal(rewriteYouTubeLocation("/watch", "?v=dQw4w9WgXcQ", ""), null);
    assert.equal(rewriteYouTubeLocation("/", "", ""), null);
    assert.equal(rewriteYouTubeLocation("/feed/subscriptions", "", ""), null);
    assert.equal(rewriteYouTubeLocation("/results", "?search_query=cats", ""), null);
    assert.equal(isShortsPath("/watch"), false);
    assert.equal(isShortsPath("/shorts/abc"), true);
  });
});
