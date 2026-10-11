import type { Character, Situation, VoiceId } from '../data/characters';

export type Manifest = Record<
  string,
  Partial<Record<Situation, string[]>> & { questions?: Record<string, string> }
>;

function index(length: number, random: () => number): number {
  return Math.min(length - 1, Math.floor(random() * length));
}

/** Picks a clip URL for a voice and situation, avoiding `last` when there is a choice. */
export function pickClip(
  manifest: Manifest,
  voice: VoiceId,
  situation: Situation,
  last: string | null,
  random: () => number
): string | null {
  const clips = manifest[voice]?.[situation] ?? [];
  if (clips.length === 0) return null;
  if (clips.length === 1) return clips[0];
  const candidates = clips.filter(url => url !== last);
  return candidates[index(candidates.length, random)];
}

export function questionClip(manifest: Manifest, voice: VoiceId, questionId: string): string | null {
  return manifest[voice]?.questions?.[questionId] ?? null;
}

export function pickVoice(character: Character, random: () => number): VoiceId {
  return character.voices[index(character.voices.length, random)].id;
}
