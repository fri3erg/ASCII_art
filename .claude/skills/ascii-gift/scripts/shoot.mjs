// Screenshots an ASCII page at a desktop and a phone size, at chosen moments of its animation.
//
//   node shoot.mjs <project-folder> <output-folder> [seconds, comma separated; default 1,3,6,12]
//
// Serves <project-folder> over http on a free port (photos cannot be read from file:// pages),
// opens index.html in the locally installed Chrome/Edge and saves desk_<s>.png and phone_<s>.png.
// Prints any page errors. Needs puppeteer-core installed next to this script or in a parent folder:
//   npm i puppeteer-core@23.11.1
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const [dir, out, timesArg = "1,3,6,12"] = process.argv.slice(2);
if (!dir || !out) { console.error("usage: node shoot.mjs <project-folder> <output-folder> [1,3,6,12]"); process.exit(2); }
const times = timesArg.split(",").map(Number);
fs.mkdirSync(out, { recursive: true });

const BROWSERS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
];
const executablePath = process.env.CHROME_PATH || BROWSERS.find((p) => fs.existsSync(p));
if (!executablePath) { console.error("no Chrome/Edge found; set CHROME_PATH"); process.exit(2); }

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".gif": "image/gif" };
const root = path.resolve(dir);
const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = path.join(root, rel.endsWith("/") ? rel + "index.html" : rel);
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const url = `http://127.0.0.1:${server.address().port}/`;

const browser = await puppeteer.launch({ executablePath, headless: true });
for (const [name, w, h, mobile] of [["desk", 1280, 800, false], ["phone", 390, 844, true]]) {
  const page = await browser.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  await page.setViewport({ width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile });
  await page.goto(url);
  const start = Date.now();
  for (const s of times) {
    // +0.8 s: fonts load before the animation clock starts
    while ((Date.now() - start) / 1000 < s + 0.8) await new Promise((r) => setTimeout(r, 50));
    await page.screenshot({ path: path.join(out, `${name}_${s}.png`) });
  }
  console.log(name, "errors:", errs.length ? errs : "none");
  await page.close();
}
await browser.close();
server.close();
