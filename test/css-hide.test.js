"use strict";

const { describe, it, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const { spawn } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");

describe("hide.css fixture", () => {
  let server;
  let chrome;
  let port;

  it("hides Shorts and clutter, leaves long-form", async () => {
    server = await listen();
    port = server.address().port;
    chrome = spawn(
      "google-chrome",
      [
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--dump-dom",
        `http://127.0.0.1:${port}/test/fixture.html`,
      ],
      { cwd: ROOT }
    );
    const dump = await collect(chrome);
    assert.match(dump, /<pre id="results">PASS<\/pre>/);
  });

  after(async () => {
    if (chrome && !chrome.killed) chrome.kill();
    if (server) await new Promise((resolve) => server.close(resolve));
  });
});

function listen() {
  const mime = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
  };
  const server = http.createServer((req, res) => {
    const file = path.normalize(path.join(ROOT, decodeURIComponent(req.url.split("?")[0])));
    if (!file.startsWith(ROOT)) {
      res.writeHead(403);
      res.end();
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      res.writeHead(200, { "Content-Type": mime[path.extname(file)] || "text/plain" });
      res.end(data);
    });
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

function collect(child) {
  return new Promise((resolve, reject) => {
    let out = "";
    let err = "";
    let settled = false;
    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      child.kill();
      fn(value);
    };
    const timer = setTimeout(() => {
      finish(reject, new Error("chrome dump timed out\n" + err.slice(-500)));
    }, 20000);
    child.stdout.on("data", (chunk) => {
      out += chunk.toString();
      if (out.includes('id="results">PASS') || out.includes('id="results">FAIL')) {
        finish(resolve, out);
      }
    });
    child.stderr.on("data", (chunk) => {
      err += chunk.toString();
    });
    child.on("close", (code) => {
      if (out.includes("PASS") || out.includes("FAIL")) {
        finish(resolve, out);
        return;
      }
      finish(
        reject,
        new Error("no dump title, code=" + code + "\n" + err.slice(-500) + "\n" + out.slice(0, 500))
      );
    });
  });
}
