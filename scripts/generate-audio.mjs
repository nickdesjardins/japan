/**
 * Downloads a real Japanese (and Korean) reading of every phrase and glossary
 * term into public/audio/, and writes data/audio.ts mapping each string to its
 * file.
 *
 *   npm run audio            fetch anything missing
 *   npm run audio -- --force re-fetch everything
 *
 * Why bother: most Windows machines ship English voices only, and an English
 * speech engine handed かな makes no sound at all. Recording the clips once,
 * here, means every visitor hears real Japanese regardless of what their
 * device has installed.
 *
 * The audio comes from Google Translate's TTS endpoint — undocumented, but
 * free, keyless and stable. It is called ONLY by this script, at authoring
 * time. The site ships the resulting mp3s as static files and never talks to
 * Google at runtime, so nothing a visitor does depends on it staying up.
 */

import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const audioDir = path.join(root, "public", "audio");
const manifestPath = path.join(root, "data", "audio.ts");

const force = process.argv.includes("--force");

/* ── loading the data ─────────────────────────────────────────────────────
   The data modules are TypeScript and destinations.ts imports two dozen
   images, so they can't just be require()d. Transpile them and evaluate with
   an import shim that hands back an empty object for anything that isn't
   another data module — we only want the strings. */

const moduleCache = new Map();

async function loadDataModule(relative) {
  const cached = moduleCache.get(relative);
  if (cached) return cached;

  const source = await readFile(path.join(root, relative), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });

  const exports = {};
  const shim = (specifier) => {
    // Images, next/image and friends: the strings we want never live there.
    if (!specifier.startsWith("@/data/")) return { default: {} };
    throw new Error(`unexpected cross-module import: ${specifier}`);
  };
  new Function("exports", "require", "module", outputText)(exports, shim, { exports });

  moduleCache.set(relative, exports);
  return exports;
}

/* ── what to record ───────────────────────────────────────────────────────
   Hangul marks the Jeju entries as Korean; everything else is Japanese. The
   same rule the glossary itself uses. */

const HANGUL = /[가-힣ᄀ-ᇿ㄰-㆏]/;

async function collect() {
  const { phrasebook } = await loadDataModule("data/prep.ts");
  const { destinations } = await loadDataModule("data/destinations.ts");

  const clips = new Map();
  const add = (lang, text, romaji) => {
    const key = `${lang}|${text}`;
    if (!clips.has(key)) clips.set(key, { key, lang, text, romaji });
  };

  for (const group of phrasebook) {
    for (const phrase of group.phrases) add(group.lang, phrase.script, phrase.romaji);
  }
  for (const place of destinations) {
    for (const term of place.glossary) {
      add(HANGUL.test(term.script) ? "ko-KR" : "ja-JP", term.script, term.term);
    }
  }
  return [...clips.values()];
}

/* ── naming ───────────────────────────────────────────────────────────────
   Readable stem so the directory can be skimmed, short digest so two terms
   that romanise the same never collide. */

const PLAIN = { ā: "a", ī: "i", ū: "u", ē: "e", ō: "o" };

function fileNameFor({ key, romaji }) {
  const stem = romaji
    .toLowerCase()
    .replace(/[āīūēō]/g, (c) => PLAIN[c])
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const digest = createHash("sha1").update(key).digest("hex").slice(0, 6);
  return `${stem || "clip"}-${digest}.mp3`;
}

/* ── fetching ─────────────────────────────────────────────────────────────
   One at a time with a pause between. The endpoint is generous but it is not
   ours, and a burst of 161 parallel requests is how you get thattled. */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function download(text, lang) {
  const url =
    "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob" +
    `&tl=${lang.slice(0, 2)}&q=${encodeURIComponent(text)}`;

  let lastError = "";
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0", Referer: "https://translate.google.com/" },
      });
      if (!response.ok) {
        lastError = `HTTP ${response.status}`;
      } else {
        const buffer = Buffer.from(await response.arrayBuffer());
        // An error page served as 200 would not start with an MPEG frame sync.
        if (buffer.length > 512 && buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0) {
          return buffer;
        }
        lastError = `not an mp3 (${buffer.length} bytes)`;
      }
    } catch (error) {
      lastError = error.message;
    }
    if (attempt < 3) await sleep(attempt * 1500);
  }
  throw new Error(lastError);
}

/* ── run ──────────────────────────────────────────────────────────────── */

const clips = await collect();
await mkdir(audioDir, { recursive: true });

console.log(`${clips.length} clips to account for.\n`);

const manifest = [];
let fetched = 0;
let kept = 0;
const failures = [];

for (const clip of clips) {
  const name = fileNameFor(clip);
  const target = path.join(audioDir, name);

  const present = !force && (await stat(target).catch(() => null))?.size > 512;
  if (present) {
    kept++;
    manifest.push([clip.key, name]);
    continue;
  }

  try {
    const buffer = await download(clip.text, clip.lang);
    await writeFile(target, buffer);
    fetched++;
    manifest.push([clip.key, name]);
    console.log(`  ✓ ${clip.text}  →  ${name}  (${(buffer.length / 1024).toFixed(1)} KB)`);
    await sleep(250);
  } catch (error) {
    failures.push({ ...clip, reason: error.message });
    console.warn(`  ✗ ${clip.text}  —  ${error.message}`);
  }
}

/* Only strings with a file on disk go in the manifest; the button falls back
   to speech synthesis for anything absent, so a partial run degrades rather
   than breaks. */
const entries = manifest
  .sort(([a], [b]) => (a < b ? -1 : 1))
  .map(([key, name]) => `  ${JSON.stringify(key)}: ${JSON.stringify(`/audio/${name}`)},`)
  .join("\n");

await writeFile(
  manifestPath,
  `/**
 * Generated by scripts/generate-audio.mjs — do not edit by hand.
 *
 * Maps "<lang>|<native script>" to a recorded reading in public/audio/.
 * Anything missing here simply falls back to the browser's own voice.
 *
 * Regenerate with: npm run audio
 */
export const audioClips: Record<string, string> = {
${entries}
};
`,
  "utf8",
);

/* Files whose string was edited or deleted linger otherwise, and nothing else
   would ever tell you. */
const referenced = new Set(manifest.map(([, name]) => name));
const orphans = (await readdir(audioDir)).filter(
  (f) => f.endsWith(".mp3") && !referenced.has(f),
);

console.log(
  `\n${fetched} fetched, ${kept} already present, ${failures.length} failed.` +
    `\nManifest: ${manifest.length} clips → data/audio.ts`,
);
if (orphans.length > 0) {
  console.log(`\n${orphans.length} orphaned file(s) no longer referenced:`);
  for (const f of orphans) console.log(`  ${f}`);
}
if (failures.length > 0) {
  console.error(`\nFailed:`);
  for (const f of failures) console.error(`  ${f.text} (${f.lang}) — ${f.reason}`);
  process.exit(1);
}
