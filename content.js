(function () {
  "use strict";

  var rewrite = (typeof NoShortsRewrite !== "undefined" && NoShortsRewrite) || {};
  var rewriteYouTubeLocation = rewrite.rewriteYouTubeLocation;

  var LINK_ANCESTORS = [
    "ytd-guide-entry-renderer",
    "ytd-mini-guide-entry-renderer",
    "ytm-pivot-bar-item-renderer",
    "ytd-rich-item-renderer",
    "ytd-grid-video-renderer",
    "ytd-video-renderer",
    "ytd-compact-video-renderer",
    "ytd-compact-movie-renderer",
    "ytd-notification-renderer",
    "ytm-notification-renderer",
    "ytm-video-with-context-renderer",
    "ytm-rich-item-renderer",
    "ytm-compact-video-renderer",
    "ytm-grid-video-renderer",
    "ytd-reel-item-renderer",
    "ytm-reel-item-renderer",
    "grid-shelf-view-model",
    "ytd-rich-shelf-renderer",
    "ytd-reel-shelf-renderer",
    "ytm-reel-shelf-renderer",
    "ytd-rich-section-renderer",
    "ytm-rich-section-renderer",
    "yt-tab-shape",
    "tp-yt-paper-tab",
    "yt-chip-cloud-chip-renderer",
    "yt-chip-cloud-chip-shape-wiz",
  ].join(",");

  var scheduled = false;

  function applyRedirect() {
    if (typeof rewriteYouTubeLocation !== "function") return;
    var next = rewriteYouTubeLocation(
      location.pathname,
      location.search,
      location.hash
    );
    if (!next) return;
    var current = location.pathname + location.search + location.hash;
    if (next !== current) {
      location.replace(next);
    }
  }

  function hrefLooksLikeShorts(href) {
    try {
      var url = new URL(href, location.origin);
      if (!/(^|\.)youtube\.com$/i.test(url.hostname)) return false;
      return /^\/shorts(\/|$)/.test(url.pathname);
    } catch (e) {
      return false;
    }
  }

  function hideNode(node) {
    if (node && !node.hasAttribute("data-nsfy-hide")) {
      node.setAttribute("data-nsfy-hide", "");
    }
  }

  function hideLeftovers() {
    var links = document.querySelectorAll('a[href*="/shorts"]');
    for (var i = 0; i < links.length; i++) {
      var anchor = links[i];
      if (!hrefLooksLikeShorts(anchor.getAttribute("href") || anchor.href)) {
        continue;
      }
      hideNode(anchor.closest(LINK_ANCESTORS) || anchor);
    }

    var chips = document.querySelectorAll(
      "yt-chip-cloud-chip-renderer, yt-chip-cloud-chip-shape-wiz"
    );
    for (var c = 0; c < chips.length; c++) {
      var label = (chips[c].textContent || "").trim().toLowerCase();
      if (label === "shorts") hideNode(chips[c]);
    }
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      applyRedirect();
      hideLeftovers();
    });
  }

  applyRedirect();

  document.addEventListener("yt-navigate-start", applyRedirect, true);
  document.addEventListener("yt-navigate-finish", schedule, true);
  document.addEventListener("yt-page-data-updated", schedule, true);
  window.addEventListener("popstate", applyRedirect);

  document.addEventListener(
    "click",
    function (event) {
      var anchor = event.target && event.target.closest
        ? event.target.closest("a[href]")
        : null;
      if (!anchor || typeof rewriteYouTubeLocation !== "function") return;
      var href = anchor.getAttribute("href") || "";
      if (href.indexOf("shorts") === -1) return;
      try {
        var url = new URL(href, location.origin);
        if (!/(^|\.)youtube\.com$/i.test(url.hostname)) return;
        var dest = rewriteYouTubeLocation(url.pathname, url.search, url.hash);
        if (!dest) return;
        event.preventDefault();
        event.stopPropagation();
        location.assign(dest);
      } catch (e) {
        /* ignore malformed hrefs */
      }
    },
    true
  );

  var observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", schedule);
  } else {
    schedule();
  }
})();
