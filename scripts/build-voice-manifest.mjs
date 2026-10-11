import { existsSync, readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const VOICES = ['leo', 'ciko', 'owi', 'mimi', 'dino', 'budi', 'callysta'];
const SITUATIONS = ['sapa', 'benar', 'salah', 'petunjuk', 'semangat', 'bintang'];

const LINE_RE = new RegExp(`^(${VOICES.join('|')})/(${SITUATIONS.join('|')})-(\\d+)\\.mp3$`);
const QUESTION_RE = new RegExp(`^(${VOICES.join('|')})/q/([A-Za-z0-9_-]+)\\.mp3$`);

/**
 * Builds the clip manifest from paths relative to public/audio, e.g.
 * "leo/sapa-01.mp3" and "leo/q/bank-mat-paud-1.mp3". Anything else is ignored.
 */
export function buildManifest(relativePaths) {
  const manifest = {};
  const lines = [];

  for (const path of relativePaths) {
    const line = LINE_RE.exec(path);
    if (line) {
      lines.push({ voice: line[1], situation: line[2], n: Number(line[3]), url: `/audio/${path}` });
      continue;
    }
    const question = QUESTION_RE.exec(path);
    if (question) {
      const entry = (manifest[question[1]] ??= {});
      (entry.questions ??= {})[question[2]] = `/audio/${path}`;
    }
  }

  lines.sort((a, b) => a.n - b.n || a.url.localeCompare(b.url));
  for (const { voice, situation, url } of lines) {
    const entry = (manifest[voice] ??= {});
    (entry[situation] ??= []).push(url);
  }
  return manifest;
}

function listFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...listFiles(full));
    else out.push(full);
  }
  return out;
}

function main() {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const audioDir = join(root, 'public', 'audio');
  const files = listFiles(audioDir).map(f => relative(audioDir, f).split(sep).join('/'));
  const manifest = buildManifest(files);
  const target = join(root, 'src', 'data', 'voiceManifest.json');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, JSON.stringify(manifest, null, 2) + '\n');
  const clips = Object.values(manifest).reduce(
    (n, v) => n + Object.entries(v).reduce((m, [k, val]) => m + (k === 'questions' ? Object.keys(val).length : val.length), 0),
    0
  );
  console.log(`voice manifest: ${clips} clip(s) -> src/data/voiceManifest.json`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
