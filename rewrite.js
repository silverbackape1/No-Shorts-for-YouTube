/**
 * Pure YouTube path rewriting. Loaded by the content script and by tests.
 * No browser APIs — keep this portable for Safari conversion later.
 */
(function (root) {
  "use strict";

  var VIDEO_ID = /^[a-zA-Z0-9_-]{1,64}$/;
  var CHANNEL_SHORTS =
    /^(\/@[^/]+|\/channel\/[^/]+|\/c\/[^/]+|\/user\/[^/]+)\/shorts\/?$/;

  function stripTrailingSlash(pathname) {
    if (pathname.length > 1 && pathname.charAt(pathname.length - 1) === "/") {
      return pathname.slice(0, -1);
    }
    return pathname;
  }

  /**
   * @param {string} pathname
   * @param {string} [search] including "?" or empty
   * @param {string} [hash] including "#" or empty
   * @returns {string|null} same-origin path+search+hash to navigate to
   */
  function rewriteYouTubeLocation(pathname, search, hash) {
    search = search || "";
    hash = hash || "";
    var path = stripTrailingSlash(pathname || "/");

    var videoMatch = path.match(/^\/shorts\/([^/]+)$/);
    if (videoMatch && VIDEO_ID.test(videoMatch[1])) {
      var params = new URLSearchParams(
        search.charAt(0) === "?" ? search.slice(1) : search
      );
      params.set("v", videoMatch[1]);
      var query = params.toString();
      return "/watch?" + query + hash;
    }

    if (path === "/shorts") {
      return "/" + hash;
    }

    var channelMatch = path.match(CHANNEL_SHORTS);
    if (channelMatch) {
      return channelMatch[1] + "/videos" + hash;
    }

    return null;
  }

  function isShortsPath(pathname) {
    return rewriteYouTubeLocation(pathname, "", "") !== null;
  }

  var api = {
    rewriteYouTubeLocation: rewriteYouTubeLocation,
    isShortsPath: isShortsPath,
  };

  root.NoShortsRewrite = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
