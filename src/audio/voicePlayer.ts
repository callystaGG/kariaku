import type { Character, Situation } from '../data/characters';
import { FALLBACK_LINES } from './fallbackLines';
import { pickClip, pickVoice, questionClip, type Manifest } from './voiceCatalog';

export interface VoicePlayerDeps {
  manifest: Manifest;
  playUrl(url: string): Promise<void>;
  stopUrl(): void;
  speakFallback(text: string, profile: { pitch: number; rate: number; gender?: 'male' | 'female' }): void;
  stopFallback(): void;
  speechEnabled(): boolean;
  random(): number;
}

export type PlayResult = 'clip' | 'fallback' | 'silent';

export interface VoicePlayer {
  playLine(character: Character, situation: Situation, fallbackText?: string): Promise<PlayResult>;
  playQuestion(character: Character, questionId: string): Promise<boolean>;
  stop(): void;
}

export function createVoicePlayer(deps: VoicePlayerDeps): VoicePlayer {
  const lastClip = new Map<string, string>();
  // Bumped by every stop(). A playback that finds it changed after awaiting was replaced or
  // stopped on purpose, so its rejection (AbortError) must not trigger the speech fallback.
  let generation = 0;

  const stop = () => {
    generation++;
    deps.stopUrl();
    deps.stopFallback();
  };

  const playLine: VoicePlayer['playLine'] = async (character, situation, fallbackText) => {
    if (!deps.speechEnabled()) return 'silent';
    stop();
    const mine = generation;

    const voiceId = pickVoice(character, deps.random);
    const key = `${voiceId}:${situation}`;
    const url = pickClip(deps.manifest, voiceId, situation, lastClip.get(key) ?? null, deps.random);

    if (url) {
      try {
        await deps.playUrl(url);
        lastClip.set(key, url);
        return 'clip';
      } catch {
        if (mine !== generation) return 'silent';
        // Autoplay blocked or file unreadable: fall through to the browser voice.
      }
    }

    const voice = character.voices.find(v => v.id === voiceId) ?? character.voices[0];
    const lines = FALLBACK_LINES[situation];
    const text = fallbackText ?? lines[Math.min(lines.length - 1, Math.floor(deps.random() * lines.length))];
    deps.speakFallback(text, voice.fallback);
    return 'fallback';
  };

  const playQuestion: VoicePlayer['playQuestion'] = async (character, questionId) => {
    if (!deps.speechEnabled()) return false;
    const first = pickVoice(character, deps.random);
    const ordered = [first, ...character.voices.map(v => v.id).filter(id => id !== first)];
    let url: string | null = null;
    for (const voiceId of ordered) {
      url = questionClip(deps.manifest, voiceId, questionId);
      if (url) break;
    }
    if (!url) return false;
    stop();
    const mine = generation;
    try {
      await deps.playUrl(url);
      return true;
    } catch {
      // Replaced or stopped on purpose: handled, the caller must not read the question aloud.
      return mine !== generation;
    }
  };

  return { playLine, playQuestion, stop };
}
