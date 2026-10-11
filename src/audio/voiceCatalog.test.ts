import { describe, it, expect } from 'vitest';
import { pickClip, questionClip, pickVoice, type Manifest } from './voiceCatalog';
import { getCharacterById } from '../data/characters';

const manifest: Manifest = {
  leo: { sapa: ['/audio/leo/sapa-01.mp3', '/audio/leo/sapa-02.mp3', '/audio/leo/sapa-03.mp3'], benar: ['/audio/leo/benar-01.mp3'], questions: { q1: '/audio/leo/q/q1.mp3' } }
};

describe('pickClip', () => {
  it('returns null for an empty manifest, a missing voice and a missing situation', () => {
    expect(pickClip({}, 'leo', 'sapa', null, Math.random)).toBeNull();
    expect(pickClip(manifest, 'owi', 'sapa', null, Math.random)).toBeNull();
    expect(pickClip(manifest, 'leo', 'salah', null, Math.random)).toBeNull();
  });

  it('never returns the last clip when more than one clip exists', () => {
    const last = '/audio/leo/sapa-02.mp3';
    for (let i = 0; i < 200; i++) {
      expect(pickClip(manifest, 'leo', 'sapa', last, Math.random)).not.toBe(last);
    }
  });

  it('returns the single clip even if it equals last', () => {
    expect(pickClip(manifest, 'leo', 'benar', '/audio/leo/benar-01.mp3', Math.random)).toBe('/audio/leo/benar-01.mp3');
  });
});

describe('questionClip', () => {
  it('finds a clip by question id and returns null when missing', () => {
    expect(questionClip(manifest, 'leo', 'q1')).toBe('/audio/leo/q/q1.mp3');
    expect(questionClip(manifest, 'leo', 'nope')).toBeNull();
    expect(questionClip({}, 'leo', 'q1')).toBeNull();
  });
});

describe('pickVoice', () => {
  it('kids returns budi or callysta, every other character its only voice', () => {
    const kids = getCharacterById('kids');
    const seen = new Set<string>();
    for (let i = 0; i < 200; i++) seen.add(pickVoice(kids, Math.random));
    expect([...seen].sort()).toEqual(['budi', 'callysta']);
    expect(pickVoice(getCharacterById('owi'), Math.random)).toBe('owi');
  });

  it('never returns undefined even when random() returns 1', () => {
    expect(pickVoice(getCharacterById('kids'), () => 1)).toBe('callysta');
  });
});
