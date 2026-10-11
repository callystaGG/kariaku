import { describe, it, expect } from 'vitest';
import { CHARACTERS, getCharacterById } from './characters';

describe('character roster', () => {
  it('has exactly six characters with unique ids', () => {
    expect(CHARACTERS).toHaveLength(6);
    expect(new Set(CHARACTERS.map(c => c.id)).size).toBe(6);
  });

  it('every voice id is unique across all characters', () => {
    const ids = CHARACTERS.flatMap(c => c.voices.map(v => v.id));
    expect(ids).toHaveLength(7);
    expect(new Set(ids).size).toBe(7);
  });

  it('kids has voices budi and callysta; every other character has exactly one voice with its own id', () => {
    const kids = CHARACTERS.find(c => c.id === 'kids')!;
    expect(kids.voices.map(v => v.id)).toEqual(['budi', 'callysta']);
    for (const c of CHARACTERS.filter(c => c.id !== 'kids')) {
      expect(c.voices.map(v => v.id)).toEqual([c.id]);
    }
  });

  it('fallback pitch and rate stay within 0.5..2 for every voice', () => {
    for (const v of CHARACTERS.flatMap(c => c.voices)) {
      expect(v.fallback.pitch).toBeGreaterThanOrEqual(0.5);
      expect(v.fallback.pitch).toBeLessThanOrEqual(2);
      expect(v.fallback.rate).toBeGreaterThanOrEqual(0.5);
      expect(v.fallback.rate).toBeLessThanOrEqual(2);
    }
  });

  it('getCharacterById returns leo for an unknown id', () => {
    expect(getCharacterById('rusa').id).toBe('leo');
    expect(getCharacterById('mimi').id).toBe('mimi');
  });
});
