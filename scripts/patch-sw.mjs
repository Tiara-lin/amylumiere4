// scripts/patch-sw.mjs  —— 乾淨版（ESM）
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const DIST = resolve('dist');
const FILES = [
  'firebase-messaging-sw.js',
  'service-worker.js',
  'firebase-app-check-sw.js',
];

const BANNER = '/* ==== HARD BLOCK reCAPTCHA in SW (auto patch) ==== */';
const PATCH =
  BANNER + '\n' +
  '(function(){\n' +
  '  var _importScripts = self.importScripts;\n' +
  '  self.importScripts = function(){\n' +
  '    var urls = Array.prototype.slice.call(arguments);\n' +
  '    var block = urls.some(function(u){\n' +
  '      return /(?:www\\.)?google\\.com\\/recaptcha|gstatic\\.com\\/recaptcha/i.test(String(u));\n' +
  '    });\n' +
  '    if (block) {\n' +
  '      try { console.log("[SW] reCAPTCHA import blocked:", urls); } catch(e) {}\n' +
  '      return;\n' +
  '    }\n' +
  '    return _importScripts.apply(self, urls);\n' +
  '  };\n' +
  '})();\n';

function patchOne(name) {
  const p = resolve(DIST, name);
  if (!existsSync(p)) return false;
  const src = readFileSync(p, 'utf8');
  if (src.indexOf(BANNER) !== -1) {
    console.log('⚡ Already patched:', name);
    return true;
    }
  writeFileSync(p, PATCH + src, 'utf8');
  console.log('✅ Patched:', name);
  return true;
}

let found = false;
for (const f of FILES) { found = patchOne(f) || found; }
if (!found) console.warn('⚠️ No service worker file found in dist/. Skipped patch.');
