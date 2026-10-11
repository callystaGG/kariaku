import { describe, it, expect, vi } from 'vitest';
import { sound } from '../utils/audio';
import { voice } from './voice';
import { getCharacterById } from '../data/characters';

describe('SoundEngine bridge', () => {
  it('stopSpeaking runs registered stop hooks, and an unsubscribed hook is not called', () => {
    const kept = vi.fn();
    const dropped = vi.fn();
    const offKept = sound.registerStopHook(kept);
    const offDropped = sound.registerStopHook(dropped);
    offDropped();
    sound.stopSpeaking();
    expect(kept).toHaveBeenCalledTimes(1);
    expect(dropped).not.toHaveBeenCalled();
    offKept();
  });

  it('a throwing stop hook does not stop the others', () => {
    const second = vi.fn();
    const off1 = sound.registerStopHook(() => { throw new Error('boom'); });
    const off2 = sound.registerStopHook(second);
    expect(() => sound.stopSpeaking()).not.toThrow();
    expect(second).toHaveBeenCalled();
    off1(); off2();
  });

  it('reportExternalSpeech notifies speech listeners', () => {
    const listener = vi.fn();
    const off = sound.onSpeechStateChange(listener);
    sound.reportExternalSpeech(true, 'halo');
    sound.reportExternalSpeech(false);
    expect(listener).toHaveBeenNthCalledWith(1, true, 'halo');
    expect(listener).toHaveBeenNthCalledWith(2, false, '');
    off();
  });
});

describe('voice singleton', () => {
  it('without recordings and without a browser it reports fallback and never throws', async () => {
    await expect(voice.playLine(getCharacterById('leo'), 'sapa')).resolves.toBe('fallback');
    await expect(voice.playQuestion(getCharacterById('leo'), 'bank-mat-paud-1')).resolves.toBe(false);
  });
});
