import { describe, it, expect, vi } from 'vitest';
import { createVoicePlayer, type VoicePlayerDeps } from './voicePlayer';
import { FALLBACK_LINES } from './fallbackLines';
import { getCharacterById } from '../data/characters';
import type { Manifest } from './voiceCatalog';

const leo = getCharacterById('leo');

function setup(overrides: Partial<VoicePlayerDeps> = {}) {
  const calls: string[] = [];
  const deps: VoicePlayerDeps = {
    manifest: {
      leo: {
        sapa: ['/audio/leo/sapa-01.mp3', '/audio/leo/sapa-02.mp3'],
        benar: ['/audio/leo/benar-01.mp3'],
        questions: { q1: '/audio/leo/q/q1.mp3' }
      }
    } as Manifest,
    playUrl: vi.fn(async (url: string) => { calls.push(`play:${url}`); }),
    stopUrl: vi.fn(() => { calls.push('stopUrl'); }),
    speakFallback: vi.fn((text: string) => { calls.push(`speak:${text}`); }),
    stopFallback: vi.fn(() => { calls.push('stopFallback'); }),
    speechEnabled: () => true,
    random: Math.random,
    ...overrides
  };
  return { deps, calls, player: createVoicePlayer(deps) };
}

describe('FALLBACK_LINES', () => {
  it('has at least one line for every situation', () => {
    for (const s of ['sapa', 'benar', 'salah', 'petunjuk', 'semangat', 'bintang'] as const) {
      expect(FALLBACK_LINES[s].length).toBeGreaterThan(0);
    }
  });
});

describe('playLine', () => {
  it('plays a clip and reports clip', async () => {
    const { player, deps } = setup();
    expect(await player.playLine(leo, 'benar')).toBe('clip');
    expect(deps.playUrl).toHaveBeenCalledWith('/audio/leo/benar-01.mp3');
    expect(deps.speakFallback).not.toHaveBeenCalled();
  });

  it('empty manifest falls back to speech with the voice pitch and rate and reports fallback', async () => {
    const { player, deps } = setup({ manifest: {} });
    expect(await player.playLine(leo, 'salah')).toBe('fallback');
    expect(deps.speakFallback).toHaveBeenCalledTimes(1);
    const [text, profile] = (deps.speakFallback as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(FALLBACK_LINES.salah).toContain(text);
    expect(profile).toEqual({ pitch: 1.28, rate: 1.02 });
  });

  it('uses fallbackText when given', async () => {
    const { player, deps } = setup({ manifest: {} });
    await player.playLine(leo, 'sapa', 'Halo dari teks khusus');
    expect(deps.speakFallback).toHaveBeenCalledWith('Halo dari teks khusus', { pitch: 1.28, rate: 1.02 });
  });

  it('a rejecting playUrl (NotAllowedError) falls back to speech and does not throw', async () => {
    const err = Object.assign(new Error('blocked'), { name: 'NotAllowedError' });
    const { player, deps } = setup({ playUrl: vi.fn(async () => { throw err; }) });
    await expect(player.playLine(leo, 'benar')).resolves.toBe('fallback');
    expect(deps.speakFallback).toHaveBeenCalledTimes(1);
  });

  it('speechEnabled false returns silent and calls nothing', async () => {
    const { player, deps } = setup({ speechEnabled: () => false });
    expect(await player.playLine(leo, 'sapa')).toBe('silent');
    expect(deps.playUrl).not.toHaveBeenCalled();
    expect(deps.speakFallback).not.toHaveBeenCalled();
    expect(deps.stopUrl).not.toHaveBeenCalled();
  });

  it('starting a new line stops the previous one before playing', async () => {
    const { player, calls } = setup();
    await player.playLine(leo, 'benar');
    expect(calls.slice(0, 3)).toEqual(['stopUrl', 'stopFallback', 'play:/audio/leo/benar-01.mp3']);
  });

  it('does not repeat the same clip twice in a row for the same voice and situation', async () => {
    const { player, deps } = setup();
    for (let i = 0; i < 30; i++) await player.playLine(leo, 'sapa');
    const urls = (deps.playUrl as ReturnType<typeof vi.fn>).mock.calls.map(c => c[0]);
    for (let i = 1; i < urls.length; i++) expect(urls[i]).not.toBe(urls[i - 1]);
  });

  it('kids always resolves to a real voice and never throws on an empty manifest', async () => {
    const { player, deps } = setup({ manifest: {}, random: () => 1 });
    await expect(player.playLine(getCharacterById('kids'), 'sapa')).resolves.toBe('fallback');
    expect((deps.speakFallback as ReturnType<typeof vi.fn>).mock.calls[0][1]).toEqual({ pitch: 1.4, rate: 1.04 });
  });
});

describe('playQuestion', () => {
  it('returns true when a question clip exists', async () => {
    const { player, deps } = setup();
    expect(await player.playQuestion(leo, 'q1')).toBe(true);
    expect(deps.playUrl).toHaveBeenCalledWith('/audio/leo/q/q1.mp3');
  });

  it('returns false and plays nothing when there is no clip', async () => {
    const { player, deps } = setup();
    expect(await player.playQuestion(leo, 'missing')).toBe(false);
    expect(deps.playUrl).not.toHaveBeenCalled();
  });

  it('returns false when playback is rejected so the caller can fall back', async () => {
    const { player } = setup({ playUrl: vi.fn(async () => { throw new Error('x'); }) });
    expect(await player.playQuestion(leo, 'q1')).toBe(false);
  });

  it('kids tries the other voice when the picked one has no clip for the question', async () => {
    const { player, deps } = setup({
      manifest: { callysta: { questions: { q9: '/audio/callysta/q/q9.mp3' } } } as Manifest,
      random: () => 0 // picks budi first, which has no clip
    });
    expect(await player.playQuestion(getCharacterById('kids'), 'q9')).toBe(true);
    expect(deps.playUrl).toHaveBeenCalledWith('/audio/callysta/q/q9.mp3');
  });

  it('returns false when speech is disabled', async () => {
    const { player, deps } = setup({ speechEnabled: () => false });
    expect(await player.playQuestion(leo, 'q1')).toBe(false);
    expect(deps.playUrl).not.toHaveBeenCalled();
  });
});

describe('stop', () => {
  it('stops both the clip and the speech fallback', () => {
    const { player, deps } = setup();
    player.stop();
    expect(deps.stopUrl).toHaveBeenCalled();
    expect(deps.stopFallback).toHaveBeenCalled();
  });
});
