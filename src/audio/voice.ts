import { sound } from '../utils/audio';
import { createVoicePlayer } from './voicePlayer';
import type { Manifest } from './voiceCatalog';
import manifest from '../data/voiceManifest.json';

let element: HTMLAudioElement | null = null;

function stopUrl() {
  if (element) {
    element.pause();
    element = null;
    sound.reportExternalSpeech(false);
  }
}

/** Resolves when playback has started; rejects if the browser refuses or the file cannot be read. */
function playUrl(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof Audio === 'undefined') {
      reject(new Error('Audio is not available'));
      return;
    }
    stopUrl();
    const audio = new Audio(url);
    element = audio;
    audio.onplaying = () => {
      sound.reportExternalSpeech(true);
      resolve();
    };
    audio.onended = () => {
      if (element === audio) element = null;
      sound.reportExternalSpeech(false);
    };
    audio.onerror = () => {
      if (element === audio) element = null;
      sound.reportExternalSpeech(false);
      reject(new Error(`Could not play ${url}`));
    };
    audio.play().catch(reject);
  });
}

export const voice = createVoicePlayer({
  manifest: manifest as Manifest,
  playUrl,
  stopUrl,
  speakFallback: (text, profile) => sound.speakWithProfile(text, profile),
  stopFallback: () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  },
  speechEnabled: () => sound.isSpeechEnabled(),
  random: Math.random
});

// Any other speech or an explicit stop also silences a playing clip.
sound.registerStopHook(() => voice.stop());
