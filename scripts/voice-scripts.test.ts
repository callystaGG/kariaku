import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { CHARACTERS } from '../src/data/characters';
import { CURATED_QUESTION_BANK } from '../src/data/questionBank';

const root = join(__dirname, '..');

/** Minimal CSV reader: quoted fields, doubled quotes, no embedded newlines. */
function parseCsv(path: string): Record<string, string>[] {
  const lines = readFileSync(join(root, path), 'utf8').split('\n').filter(l => l.trim() !== '');
  const parse = (line: string): string[] => {
    const out: string[] = [];
    let cur = '';
    let quoted = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (quoted) {
        if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (ch === '"') quoted = false;
        else cur += ch;
      } else if (ch === '"') quoted = true;
      else if (ch === ',') { out.push(cur); cur = ''; }
      else cur += ch;
    }
    out.push(cur);
    return out;
  };
  const header = parse(lines[0]);
  return lines.slice(1).map(l => {
    const cells = parse(l);
    return Object.fromEntries(header.map((h, i) => [h, cells[i] ?? '']));
  });
}

const VOICES = CHARACTERS.flatMap(c => c.voices.map(v => v.id));
const COUNTS = { sapa: 3, benar: 5, salah: 5, petunjuk: 4, semangat: 3, bintang: 2 } as const;

describe('docs/voices/lines.csv', () => {
  const rows = parseCsv('docs/voices/lines.csv');

  it('has the header and 154 rows', () => {
    const header = readFileSync(join(root, 'docs/voices/lines.csv'), 'utf8').split('\n')[0];
    expect(header).toBe('file,voice,situation,text');
    expect(rows).toHaveLength(154);
  });

  it('every voice has the exact situation counts', () => {
    for (const voice of VOICES) {
      for (const [situation, n] of Object.entries(COUNTS)) {
        expect(rows.filter(r => r.voice === voice && r.situation === situation), `${voice}/${situation}`).toHaveLength(n);
      }
    }
  });

  it('file names are unique and match the layout', () => {
    expect(new Set(rows.map(r => r.file)).size).toBe(rows.length);
    for (const r of rows) {
      expect(r.file).toMatch(new RegExp(`^${r.voice}/${r.situation}-\\d{2}\\.mp3$`));
    }
  });

  it('text is non-empty and at most 120 characters', () => {
    for (const r of rows) {
      expect(r.text.trim().length, r.file).toBeGreaterThan(0);
      expect(r.text.length, r.file).toBeLessThanOrEqual(120);
    }
  });
});

describe('docs/voices/questions.csv', () => {
  const rows = parseCsv('docs/voices/questions.csv');

  it('has one row per (voice, curated question id), 45 questions x 7 voices', () => {
    expect(CURATED_QUESTION_BANK).toHaveLength(45);
    expect(rows).toHaveLength(45 * 7);
    for (const voice of VOICES) {
      const ids = rows.filter(r => r.voice === voice).map(r => r.questionId).sort();
      expect(ids).toEqual(CURATED_QUESTION_BANK.map(q => q.id).sort());
    }
  });

  it('file names follow the layout and the text is the question speechPrompt', () => {
    const byId = new Map(CURATED_QUESTION_BANK.map(q => [q.id, q]));
    for (const r of rows) {
      expect(r.file).toBe(`${r.voice}/q/${r.questionId}.mp3`);
      expect(r.questionId).toMatch(/^[A-Za-z0-9_-]+$/);
      expect(r.text).toBe(byId.get(r.questionId)!.speechPrompt);
    }
  });
});
