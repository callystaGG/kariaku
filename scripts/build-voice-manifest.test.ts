import { describe, it, expect } from 'vitest';
import { buildManifest } from './build-voice-manifest.mjs';

describe('buildManifest', () => {
  it('groups clips by voice and situation sorted by number', () => {
    const m = buildManifest(['leo/sapa-02.mp3', 'leo/sapa-01.mp3', 'leo/benar-01.mp3', 'mimi/sapa-01.mp3']);
    expect(m).toEqual({
      leo: { sapa: ['/audio/leo/sapa-01.mp3', '/audio/leo/sapa-02.mp3'], benar: ['/audio/leo/benar-01.mp3'] },
      mimi: { sapa: ['/audio/mimi/sapa-01.mp3'] }
    });
  });

  it('maps q/ files to questions by id', () => {
    const m = buildManifest(['budi/q/bank-mat-paud-1.mp3']);
    expect(m).toEqual({ budi: { questions: { 'bank-mat-paud-1': '/audio/budi/q/bank-mat-paud-1.mp3' } } });
  });

  it('ignores files that do not match the layout', () => {
    const m = buildManifest(['README.md', '.DS_Store', 'leo/unknown-01.mp3', 'ghost/sapa-01.mp3', 'leo/sapa-1.wav', 'leo/sapa-01.mp3']);
    expect(m).toEqual({ leo: { sapa: ['/audio/leo/sapa-01.mp3'] } });
  });

  it('returns an empty manifest for empty input', () => {
    expect(buildManifest([])).toEqual({});
  });
});
