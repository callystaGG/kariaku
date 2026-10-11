// Usage: bunx tsx scripts/export-question-lines.ts
// Writes docs/voices/questions.csv: one row per (voice, curated question) with the text to record.
import { writeFileSync } from 'node:fs';
import { CHARACTERS } from '../src/data/characters';
import { CURATED_QUESTION_BANK } from '../src/data/questionBank';

const quote = (value: string) => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);

const rows = ['file,voice,questionId,text'];
for (const voice of CHARACTERS.flatMap(c => c.voices.map(v => v.id))) {
  for (const q of CURATED_QUESTION_BANK) {
    rows.push([`${voice}/q/${q.id}.mp3`, voice, q.id, q.speechPrompt].map(quote).join(','));
  }
}

const target = new URL('../docs/voices/questions.csv', import.meta.url);
writeFileSync(target, rows.join('\n') + '\n');
console.log(`wrote ${rows.length - 1} rows to docs/voices/questions.csv`);
