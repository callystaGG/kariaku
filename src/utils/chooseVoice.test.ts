import { describe, it, expect } from 'vitest';
import { chooseVoice } from './chooseVoice';

describe('chooseVoice', () => {
  const all = { male: 'M', female: 'F', fallback: 'D' };

  it('uses the male voice for male and the female voice for female', () => {
    expect(chooseVoice(all, 'male')).toBe('M');
    expect(chooseVoice(all, 'female')).toBe('F');
  });

  it('male falls back to female, then to the default voice', () => {
    expect(chooseVoice({ male: null, female: 'F', fallback: 'D' }, 'male')).toBe('F');
    expect(chooseVoice({ male: null, female: null, fallback: 'D' }, 'male')).toBe('D');
  });

  it('female falls back to the default voice and never to the male voice', () => {
    expect(chooseVoice({ male: 'M', female: null, fallback: 'D' }, 'female')).toBe('D');
  });

  it('no gender behaves like female; nothing available gives null', () => {
    expect(chooseVoice(all, undefined)).toBe('F');
    expect(chooseVoice({ male: null, female: null, fallback: null }, 'male')).toBeNull();
  });
});
