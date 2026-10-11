import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  Play,
  CheckCircle2,
  BookOpen,
  Music,
  MessageCircle,
  Mic,
  Star,
  Turtle,
  SpellCheck,
  Headphones,
  Award,
  Layers
} from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { getEnglishCaraBaca, PHONICS_WORD_FAMILIES } from '../utils/englishPronunciation';

export interface EnglishWordItem {
  word: string;
  translation: string;
  phonetic?: string;
  caraBaca?: string;
  emoji: string;
  exampleSentence?: string;
  sentenceTranslation?: string;
  category?: string;
  syllables?: string[];
}

export interface EnglishDialogueItem {
  speaker: string;
  textEnglish: string;
  textIndonesian: string;
  avatarEmoji: string;
  audioPitch?: number;
}

export interface EnglishAlphabetItem {
  letter: string;
  word: string;
  emoji: string;
  sound: string;
}

interface EnglishInteractiveProps {
  mode: 'words' | 'alphabet' | 'dialogue';
  words?: EnglishWordItem[];
  dialogues?: EnglishDialogueItem[];
  alphabetLetters?: EnglishAlphabetItem[];
  songLyrics?: Array<{ lineEnglish: string; lineIndonesian: string }>;
  onComplete?: () => void;
}

export const EnglishInteractive: React.FC<EnglishInteractiveProps> = ({
  mode,
  words = [],
  dialogues = [],
  alphabetLetters = [],
  songLyrics = [],
  onComplete
}) => {
  // Word Cards State
  const [selectedWordIndex, setSelectedWordIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'cards' | 'grid' | 'phonics_lab'>('cards');
  const [playedWords, setPlayedWords] = useState<string[]>([]);
  const [customNameInput, setCustomNameInput] = useState<string>('ALYA');
  const [spellingActive, setSpellingActive] = useState<boolean>(false);
  const [activeDialogueIndex, setActiveDialogueIndex] = useState<number | null>(null);
  const [activeSongLine, setActiveSongLine] = useState<number | null>(null);

  // Listen & Repeat interactive state
  const [repeatState, setRepeatState] = useState<{
    word: string;
    stage: 'idle' | 'listening' | 'countdown' | 'repeating' | 'success';
    countdown: number;
  }>({
    word: '',
    stage: 'idle',
    countdown: 3
  });

  // Selected Phonics Family
  const [selectedFamilyIndex, setSelectedFamilyIndex] = useState<number>(0);

  // Sound handlers
  const handlePlayWord = (word: string, isSlow: boolean = false) => {
    sound.playPop(520);
    if (isSlow) {
      sound.speakEnglishSlow(word);
    } else {
      sound.speakEnglish(word);
    }

    if (!playedWords.includes(word)) {
      const next = [...playedWords, word];
      setPlayedWords(next);
      if (next.length >= Math.min(words.length, 3)) {
        onComplete?.();
      }
    }
  };

  const handleSpellWord = (word: string) => {
    sound.playPop(540);
    sound.speakEnglishSpelling(word);
  };

  const handlePlaySentence = (sentence: string, isSlow: boolean = false) => {
    sound.playPop(560);
    if (isSlow) {
      sound.speakEnglishSlow(sentence);
    } else {
      sound.speakEnglish(sentence);
    }
  };

  const handleStartListenRepeat = (word: string) => {
    setRepeatState({ word, stage: 'listening', countdown: 3 });
    sound.playPop(600);
    sound.speakEnglish(word, { rate: 0.82 });

    // Step 2: Countdown
    setTimeout(() => {
      setRepeatState(prev => ({ ...prev, stage: 'countdown', countdown: 3 }));
      const timer = setInterval(() => {
        setRepeatState(prev => {
          if (prev.countdown <= 1) {
            clearInterval(timer);
            // Step 3: Speak now!
            setTimeout(() => {
              setRepeatState(p => ({ ...p, stage: 'repeating' }));
              sound.playDing();
              // Step 4: Success feedback
              setTimeout(() => {
                setRepeatState(p => ({ ...p, stage: 'success' }));
                sound.playSuccess();
                confetti({
                  particleCount: 40,
                  spread: 60,
                  origin: { y: 0.65 }
                });
                setTimeout(() => {
                  setRepeatState({ word: '', stage: 'idle', countdown: 3 });
                }, 3000);
              }, 2500);
            }, 300);
            return { ...prev, countdown: 0 };
          }
          return { ...prev, countdown: prev.countdown - 1 };
        });
      }, 700);
    }, 1200);
  };

  const handlePlayDialogue = (idx: number, dialogue: EnglishDialogueItem, isSlow: boolean = false) => {
    setActiveDialogueIndex(idx);
    sound.playPop(480);
    if (isSlow) {
      sound.speakEnglishSlow(dialogue.textEnglish);
    } else {
      sound.speakEnglish(dialogue.textEnglish, { pitch: dialogue.audioPitch || 1.15 });
    }
  };

  const handlePlayAlphabetLetter = (item: EnglishAlphabetItem) => {
    sound.playPop(600);
    const reading = getEnglishCaraBaca(item.word);
    sound.speakEnglish(`${item.letter}. ${item.letter} for ${item.word}.`);
  };

  const handleSpellName = (name: string) => {
    if (!name.trim()) return;
    setSpellingActive(true);
    sound.playPop(500);

    const clean = name.trim().toUpperCase();
    const letters = clean.split('').filter(c => /[A-Z]/.test(c));
    const spelledText = `${clean}! ${letters.join('... ')}! ${clean}!`;

    sound.speakEnglish(spelledText, { rate: 0.82 });
    setTimeout(() => {
      setSpellingActive(false);
    }, letters.length * 900 + 1000);
  };

  const handlePlaySongLine = (line: string, idx: number) => {
    setActiveSongLine(idx);
    sound.playPop(520);
    sound.speakEnglish(line, { rate: 0.88 });
  };

  // 1. ALPHABET & SONG MODE
  if (mode === 'alphabet') {
    return (
      <div className="w-full space-y-6">
        {/* Song Sing-Along Player */}
        {songLyrics.length > 0 && (
          <div className="bg-gradient-to-br from-[#FFF9C4] to-[#FFF59D] border-3 border-[#FBC02D] rounded-3xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-[#F57F17] text-white rounded-2xl text-lg shadow-2xs">
                  <Music className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#5D4037] font-heading">
                    The Alphabet Song 🎶
                  </h3>
                  <p className="text-xs text-[#795548] font-bold">
                    Sentuh baris lagu untuk mendengarkan nada ceria!
                  </p>
                </div>
              </div>

              <button
                type="button"
                id="btn-play-full-song"
                onClick={() => {
                  const fullSong = songLyrics.map(s => s.lineEnglish).join('. ');
                  sound.playFanfare();
                  sound.speakEnglish(fullSong, { rate: 0.92 });
                }}
                className="px-4 py-2 bg-[#F57F17] hover:bg-[#E65100] text-white text-xs sm:text-sm font-black rounded-2xl shadow-2xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Putar Lagu Lengkap</span>
              </button>
            </div>

            {/* Lyrics Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              {songLyrics.map((item, idx) => (
                <button
                  key={idx}
                  id={`btn-song-line-${idx}`}
                  onClick={() => handlePlaySongLine(item.lineEnglish, idx)}
                  className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                    activeSongLine === idx
                      ? 'bg-white border-[#E65100] shadow-xs scale-102 ring-2 ring-[#FFE082]'
                      : 'bg-white/80 border-[#FFF176] hover:bg-white hover:border-[#FBC02D]'
                  }`}
                >
                  <div className="text-sm font-black text-[#4E342E] flex items-center justify-between">
                    <span>{item.lineEnglish}</span>
                    <Volume2 className="w-4 h-4 text-[#F57F17] shrink-0 ml-2" />
                  </div>
                  <div className="text-xs text-[#8D6E63] font-medium mt-0.5">
                    {item.lineIndonesian}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Spell Your Name Interactive */}
        <div className="bg-[#FAF8F0] border-3 border-[#FFE082] rounded-3xl p-5 sm:p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#F57F17]" />
            <h3 className="text-base sm:text-lg font-black text-[#4E342E] font-heading">
              Spell Your Name (Mengeja Nama Sendiri) ✍️
            </h3>
          </div>
          <p className="text-xs text-[#8D6E63] font-semibold max-w-md mx-auto mb-4">
            Ketik namamu di bawah ini, lalu dengarkan bagaimana namamu dieja huruf per huruf dalam bahasa Inggris!
          </p>

          <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
            <input
              type="text"
              id="input-spell-name"
              value={customNameInput}
              onChange={e => setCustomNameInput(e.target.value.toUpperCase())}
              placeholder="Ketik Nama (Contoh: ALYA)"
              maxLength={12}
              className="w-full px-4 py-2.5 bg-white border-2 border-[#D7CCC8] focus:border-[#F57F17] rounded-2xl font-black text-center text-lg text-[#4E342E] tracking-widest uppercase outline-none"
            />
            <button
              type="button"
              id="btn-spell-name"
              disabled={spellingActive || !customNameInput.trim()}
              onClick={() => handleSpellName(customNameInput)}
              className="px-5 py-2.5 bg-[#F57F17] hover:bg-[#E65100] text-white font-black text-xs sm:text-sm rounded-2xl shadow-xs disabled:opacity-50 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
            >
              {spellingActive ? 'Mengeja...' : 'Eja Nama! 🗣️'}
            </button>
          </div>

          {/* Spelled Letter Visualizer */}
          {customNameInput.trim() && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {customNameInput.split('').map((char, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl bg-white border-2 border-[#FFD54F] flex items-center justify-center font-black text-base text-[#D97706] shadow-2xs animate-fade-in"
                >
                  {char}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Letter Cards Grid */}
        {alphabetLetters.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-black text-[#4E342E] flex items-center gap-1.5">
                <span>🔤 Kartu Huruf & Fonik (A to Z)</span>
              </h4>
              <span className="text-xs font-bold text-[#8D6E63]">
                Sentuh untuk mendengar cara membaca!
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {alphabetLetters.map((item, idx) => {
                const cara = getEnglishCaraBaca(item.word);

                return (
                  <button
                    key={idx}
                    id={`btn-alphabet-${item.letter.toLowerCase()}`}
                    type="button"
                    onClick={() => handlePlayAlphabetLetter(item)}
                    className="p-3.5 bg-white hover:bg-[#FFFDE7] border-2 border-[#FFE082] hover:border-[#FBC02D] rounded-2xl text-center transition-all transform active:scale-95 shadow-2xs hover:shadow-xs cursor-pointer group"
                  >
                    <div className="text-3xl sm:text-4xl mb-1 group-hover:scale-110 transition-transform">
                      {item.emoji}
                    </div>
                    <div className="text-xl font-black text-[#D97706] font-heading">
                      {item.letter}
                    </div>
                    <div className="text-xs font-black text-[#4E342E]">
                      {item.word}
                    </div>
                    <div className="text-[10px] font-bold text-[#2E7D32] bg-[#E8F5E9] rounded-lg px-1.5 py-0.5 mt-1">
                      🗣️ "{cara.caraBaca}"
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. DIALOGUE & ROLEPLAY MODE
  if (mode === 'dialogue') {
    return (
      <div className="w-full space-y-4">
        <div className="bg-[#FAF8F0] border-3 border-[#FFE082] rounded-3xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-[#E7E2D6]">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#D97706] text-white rounded-2xl text-lg shadow-2xs">
                <MessageCircle className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#4E342E] font-heading">
                  Percakapan Bahasa Inggris (Dialogue Roleplay) 💬
                </h3>
                <p className="text-xs text-[#8D6E63] font-semibold">
                  Sentuh balon bicara untuk mendengarkan pengucapan percakapan alami!
                </p>
              </div>
            </div>

            <button
              type="button"
              id="btn-play-all-dialogues"
              onClick={() => {
                let delay = 0;
                dialogues.forEach((d, idx) => {
                  setTimeout(() => {
                    handlePlayDialogue(idx, d);
                  }, delay);
                  delay += 2400;
                });
              }}
              className="px-3.5 py-2 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-black rounded-2xl shadow-2xs flex items-center gap-1 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Putar Semua</span>
            </button>
          </div>

          {/* Dialogue Bubbles */}
          <div className="space-y-3">
            {dialogues.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeDialogueIndex === idx;

              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-white border-2 border-[#FFE082] flex items-center justify-center text-xl shrink-0 shadow-2xs">
                    {item.avatarEmoji}
                  </div>

                  <div className={`max-w-md ${isEven ? 'text-left' : 'text-right'}`}>
                    <div className="text-[11px] font-black text-[#8D6E63] mb-0.5">
                      {item.speaker}
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl border-2 transition-all text-left shadow-2xs ${
                        isActive
                          ? 'bg-[#FFF9C4] border-[#F57F17] ring-2 ring-[#FFE082]'
                          : isEven
                          ? 'bg-white border-[#E0E0E0]'
                          : 'bg-[#E3F2FD] border-[#90CAF9]'
                      }`}
                    >
                      <div className="text-sm font-black text-[#4E342E] mb-1">
                        "{item.textEnglish}"
                      </div>
                      <div className="text-xs text-[#616161] font-medium border-t border-[#E0E0E0] pt-1 mt-1">
                        {item.textIndonesian}
                      </div>

                      <div className="flex items-center gap-2 mt-2 pt-1 border-t border-dashed border-[#BDBDBD]">
                        <button
                          type="button"
                          id={`btn-dialogue-normal-${idx}`}
                          onClick={() => handlePlayDialogue(idx, item, false)}
                          className="px-2.5 py-1 bg-[#D97706] hover:bg-[#B45309] text-white text-[11px] font-black rounded-lg flex items-center gap-1 active:scale-95 cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Normal</span>
                        </button>
                        <button
                          type="button"
                          id={`btn-dialogue-slow-${idx}`}
                          onClick={() => handlePlayDialogue(idx, item, true)}
                          className="px-2.5 py-1 bg-[#FAF8F0] hover:bg-[#F5F2E9] border border-[#D7CCC8] text-[#4E342E] text-[11px] font-black rounded-lg flex items-center gap-1 active:scale-95 cursor-pointer"
                        >
                          <Turtle className="w-3 h-3 text-[#2E7D32]" />
                          <span>Lambat & Jelas</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-[#FFF8E1] border-2 border-[#FFE082] rounded-2xl text-center">
            <p className="text-xs font-bold text-[#5D4037]">
              💡 <strong>Tips Parents:</strong> Gunakan teknik roleplay bergantian peran (Mother/Father & Anak) agar si Kecil percaya diri berbicara bahasa Inggris!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. FLASHCARDS & VOCABULARY MODE
  const currentWord = words[selectedWordIndex] || words[0];
  const caraBacaInfo = currentWord ? getEnglishCaraBaca(currentWord.word, currentWord.caraBaca) : { caraBaca: '', syllables: [] };

  return (
    <div className="w-full space-y-4">
      {/* Tab Selector & Stats Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black text-[#8D6E63] uppercase tracking-wider">
            Kosakata: {words.length} Kata
          </span>
          {playedWords.length > 0 && (
            <span className="text-[10px] font-black bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-full border border-[#C8E6C9]">
              ✓ {playedWords.length} Dipelajari
            </span>
          )}
        </div>

        {/* View mode switcher */}
        <div className="flex items-center gap-1 bg-[#FAF8F0] p-1 rounded-2xl border border-[#E7E2D6]">
          <button
            type="button"
            id="tab-view-cards"
            onClick={() => {
              sound.playPop(450);
              setViewMode('cards');
            }}
            className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-[#D97706] text-white shadow-2xs'
                : 'text-[#8D6E63] hover:text-[#4E342E]'
            }`}
          >
            🎴 Kartu Cara Baca
          </button>

          <button
            type="button"
            id="tab-view-phonics"
            onClick={() => {
              sound.playPop(450);
              setViewMode('phonics_lab');
            }}
            className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
              viewMode === 'phonics_lab'
                ? 'bg-[#2E7D32] text-white shadow-2xs'
                : 'text-[#8D6E63] hover:text-[#4E342E]'
            }`}
          >
            🔬 Lab Fonik (Word Families)
          </button>

          <button
            type="button"
            id="tab-view-grid"
            onClick={() => {
              sound.playPop(450);
              setViewMode('grid');
            }}
            className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[#D97706] text-white shadow-2xs'
                : 'text-[#8D6E63] hover:text-[#4E342E]'
            }`}
          >
            📋 Daftar Semua ({words.length})
          </button>
        </div>
      </div>

      {/* 1. FLASHCARD FOCUS VIEW WITH INDONESIAN READING GUIDE */}
      {viewMode === 'cards' && currentWord && (
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl border-4 border-[#FFE082] shadow-md p-5 sm:p-6 text-center relative overflow-hidden transition-all">
            {/* Top Category Badge */}
            {currentWord.category && (
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF8E1] border border-[#FFE082] rounded-full text-[11px] font-black text-[#B45309] mb-2">
                <Sparkles className="w-3 h-3" />
                {currentWord.category}
              </div>
            )}

            {/* Giant Emoji Display */}
            <div className="w-24 h-24 mx-auto rounded-3xl bg-[#FAF8F0] border-2 border-[#E7E2D6] flex items-center justify-center text-5xl my-1 shadow-2xs animate-float">
              {currentWord.emoji}
            </div>

            {/* English Word */}
            <h3 className="text-3xl sm:text-4xl font-black font-heading text-[#4E342E] tracking-tight mt-2">
              {currentWord.word}
            </h3>

            {/* International Phonetic (IPA) */}
            {currentWord.phonetic && (
              <div className="text-xs font-mono font-bold text-[#8D6E63] mt-0.5">
                {currentWord.phonetic}
              </div>
            )}

            {/* 🌟 PROMINENT INDONESIAN READING GUIDE (CARA MEMBACA) 🌟 */}
            <div className="my-3 p-3 bg-gradient-to-r from-[#E8F5E9] to-[#C8E6C9] border-2 border-[#81C784] rounded-2xl shadow-2xs">
              <div className="text-[11px] font-black text-[#2E7D32] uppercase tracking-wider mb-0.5">
                🗣️ Panduan Cara Membaca (Lidah Indonesia):
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#1B5E20] tracking-wide font-heading">
                Dibaca: "{caraBacaInfo.caraBaca}"
              </div>
              {caraBacaInfo.phonicsTip && (
                <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                  💡 {caraBacaInfo.phonicsTip}
                </div>
              )}
            </div>

            {/* Indonesian Translation */}
            <div className="text-base font-black text-[#D97706] mb-3">
              Arti: <strong>{currentWord.translation}</strong>
            </div>

            {/* 🎧 MULTI-SPEED AUDIO BUTTONS (SUPER CLEAR ARTICULATION) */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {/* 1. Normal Speed */}
              <button
                type="button"
                id="btn-pronounce-normal"
                onClick={() => handlePlayWord(currentWord.word, false)}
                className="p-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-xs rounded-2xl shadow-2xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Normal (1.0x)</span>
              </button>

              {/* 2. Slow Phonics Speed */}
              <button
                type="button"
                id="btn-pronounce-slow"
                onClick={() => handlePlayWord(currentWord.word, true)}
                className="p-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black text-xs rounded-2xl shadow-2xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
              >
                <Turtle className="w-4 h-4" />
                <span>Lambat & Jelas</span>
              </button>

              {/* 3. Spell Out Letters */}
              <button
                type="button"
                id="btn-spell-word"
                onClick={() => handleSpellWord(currentWord.word)}
                className="p-2.5 bg-[#1565C0] hover:bg-[#0D47A1] text-white font-black text-xs rounded-2xl shadow-2xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
              >
                <SpellCheck className="w-4 h-4" />
                <span>Eja Huruf (A-B-C)</span>
              </button>
            </div>

            {/* 🗣️ LISTEN & REPEAT INTERACTIVE BUTTON */}
            <div className="mt-3">
              {repeatState.stage === 'idle' && (
                <button
                  type="button"
                  id="btn-listen-repeat"
                  onClick={() => handleStartListenRepeat(currentWord.word)}
                  className="w-full py-2.5 bg-[#FAF8F0] hover:bg-[#FFF8E1] border-2 border-[#FFE082] text-[#B45309] font-black text-xs rounded-2xl flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                >
                  <Mic className="w-4 h-4 text-[#D97706]" />
                  <span>Latihan Tirukan Suara (Listen & Repeat) 🎯</span>
                </button>
              )}

              {repeatState.stage === 'listening' && (
                <div className="p-3 bg-[#E3F2FD] border-2 border-[#90CAF9] rounded-2xl text-[#1565C0] font-black text-xs flex items-center justify-center gap-2 animate-pulse">
                  <Headphones className="w-4 h-4" />
                  <span>Dengarkan baik-baik...</span>
                </div>
              )}

              {repeatState.stage === 'countdown' && (
                <div className="p-3 bg-[#FFF9C4] border-2 border-[#FBC02D] rounded-2xl text-[#F57F17] font-black text-sm flex items-center justify-center gap-2 animate-bounce">
                  <span>Bersiap tirukan dalam: {repeatState.countdown}...</span>
                </div>
              )}

              {repeatState.stage === 'repeating' && (
                <div className="p-3 bg-[#E8F5E9] border-2 border-[#81C784] rounded-2xl text-[#2E7D32] font-black text-sm flex items-center justify-center gap-2">
                  <Mic className="w-5 h-5 animate-ping text-[#2E7D32]" />
                  <span>Ayo Ucapkan Sekarang: "{currentWord.word}"! 🗣️</span>
                </div>
              )}

              {repeatState.stage === 'success' && (
                <div className="p-3 bg-[#C8E6C9] border-2 border-[#4CAF50] rounded-2xl text-[#1B5E20] font-black text-xs flex items-center justify-center gap-2">
                  <Star className="w-4 h-4 text-[#F57F17] fill-[#F57F17]" />
                  <span>Hebat Sekali! Pengucapanmu Sangat Bagus! 🌟</span>
                </div>
              )}
            </div>

            {/* Example Sentence Box */}
            {currentWord.exampleSentence && (
              <div className="mt-4 p-3 bg-[#FDFCF0] border-2 border-dashed border-[#FFE082] rounded-2xl text-left">
                <div className="flex items-center justify-between text-xs font-black text-[#4E342E] mb-1">
                  <span>📖 Contoh Kalimat:</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      id="btn-play-sentence-normal"
                      onClick={() => handlePlaySentence(currentWord.exampleSentence || '', false)}
                      className="p-1 hover:bg-[#FFF8E1] rounded text-[#D97706] cursor-pointer"
                      title="Putar Normal"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      id="btn-play-sentence-slow"
                      onClick={() => handlePlaySentence(currentWord.exampleSentence || '', true)}
                      className="p-1 hover:bg-[#FFF8E1] rounded text-[#2E7D32] cursor-pointer"
                      title="Putar Lambat"
                    >
                      <Turtle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm font-black text-[#1565C0]">
                  "{currentWord.exampleSentence}"
                </div>
                {currentWord.sentenceTranslation && (
                  <div className="text-xs font-semibold text-[#8D6E63] mt-0.5">
                    {currentWord.sentenceTranslation}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Card Carousel Navigation */}
          <div className="flex items-center justify-between gap-3 mt-4">
            <button
              type="button"
              id="btn-prev-word"
              disabled={selectedWordIndex === 0}
              onClick={() => {
                sound.playPop(440);
                setSelectedWordIndex(prev => Math.max(0, prev - 1));
              }}
              className="px-4 py-2.5 bg-[#FAF8F0] hover:bg-[#F5F2E9] border border-[#D7CCC8] text-[#6D4C41] rounded-2xl font-black text-xs disabled:opacity-40 transition-all cursor-pointer"
            >
              ← Kosakata Lalu
            </button>

            <span className="text-xs font-black text-[#6D4C41]">
              {selectedWordIndex + 1} / {words.length}
            </span>

            <button
              type="button"
              id="btn-next-word"
              disabled={selectedWordIndex >= words.length - 1}
              onClick={() => {
                sound.playPop(480);
                setSelectedWordIndex(prev => Math.min(words.length - 1, prev + 1));
              }}
              className="px-4 py-2.5 bg-[#FAF8F0] hover:bg-[#F5F2E9] border border-[#D7CCC8] text-[#6D4C41] rounded-2xl font-black text-xs disabled:opacity-40 transition-all cursor-pointer"
            >
              Kosakata Berikut →
            </button>
          </div>
        </div>
      )}

      {/* 2. PHONICS LAB (WORD FAMILIES) */}
      {viewMode === 'phonics_lab' && (
        <div className="space-y-4">
          <div className="bg-[#FAF8F0] border-3 border-[#81C784] rounded-3xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 bg-[#2E7D32] text-white rounded-2xl text-lg shadow-2xs">
                🔬
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#1B5E20] font-heading">
                  Lab Membaca Fonik (English Word Families)
                </h3>
                <p className="text-xs text-[#2E7D32] font-semibold">
                  Rahasia membaca cepat bahasa Inggris: gabungkan bunyi konsonan depan dengan akhiran kata!
                </p>
              </div>
            </div>

            {/* Word Family Selector Pills */}
            <div className="flex flex-wrap gap-2 my-4">
              {PHONICS_WORD_FAMILIES.map((fam, idx) => (
                <button
                  key={idx}
                  id={`btn-family-${fam.family}`}
                  onClick={() => {
                    sound.playPop(520);
                    setSelectedFamilyIndex(idx);
                    sound.speakEnglish(`${fam.family}... ${fam.words[0].word}`);
                  }}
                  className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer border-2 ${
                    selectedFamilyIndex === idx
                      ? 'bg-[#2E7D32] border-[#1B5E20] text-white shadow-xs scale-105'
                      : 'bg-white border-[#C8E6C9] text-[#2E7D32] hover:bg-[#E8F5E9]'
                  }`}
                >
                  <span>Family {fam.family}</span>
                  <span className="text-[10px] ml-1 opacity-80">({fam.caraBacaFamily})</span>
                </button>
              ))}
            </div>

            {/* Current Family Words Blending */}
            {PHONICS_WORD_FAMILIES[selectedFamilyIndex] && (
              <div className="space-y-3">
                <div className="p-3 bg-white border-2 border-[#A5D6A7] rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-[#2E7D32]">
                      Keluarga Kata: <strong>{PHONICS_WORD_FAMILIES[selectedFamilyIndex].family}</strong> ({PHONICS_WORD_FAMILIES[selectedFamilyIndex].sound})
                    </span>
                    <div className="text-xs font-bold text-[#1B5E20]">
                      {PHONICS_WORD_FAMILIES[selectedFamilyIndex].caraBacaFamily}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const allWords = PHONICS_WORD_FAMILIES[selectedFamilyIndex].words.map(w => w.word).join(', ');
                      sound.speakEnglish(allWords);
                    }}
                    className="px-3 py-1.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dengar Semua</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {PHONICS_WORD_FAMILIES[selectedFamilyIndex].words.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white border-2 border-[#C8E6C9] rounded-2xl shadow-2xs hover:shadow-xs transition-all text-center"
                    >
                      <div className="text-4xl mb-1">{item.emoji}</div>

                      {/* Blending Visualization: Onset + Rime */}
                      <div className="flex items-center justify-center gap-1 font-heading text-2xl font-black my-1">
                        <span className="text-[#D97706] bg-[#FFF8E1] px-2 py-0.5 rounded-lg border border-[#FFE082]">
                          {item.onset}
                        </span>
                        <span className="text-[#8D6E63]">+</span>
                        <span className="text-[#1565C0] bg-[#E3F2FD] px-2 py-0.5 rounded-lg border border-[#90CAF9]">
                          {item.rime}
                        </span>
                        <span className="text-[#8D6E63]">=</span>
                        <span className="text-[#2E7D32]">{item.word}</span>
                      </div>

                      <div className="text-xs font-black text-[#1B5E20] bg-[#E8F5E9] py-1 rounded-xl my-1.5">
                        🗣️ Dibaca: "{item.caraBaca}"
                      </div>

                      <div className="text-xs font-bold text-[#6D4C41] mb-2">
                        Artinya: {item.translation}
                      </div>

                      <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-[#E0E0E0]">
                        <button
                          type="button"
                          onClick={() => sound.speakEnglish(item.word)}
                          className="px-2.5 py-1 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black text-[11px] rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Normal</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => sound.speakEnglishSlow(item.word)}
                          className="px-2.5 py-1 bg-[#FAF8F0] hover:bg-[#F5F2E9] border border-[#D7CCC8] text-[#4E342E] font-black text-[11px] rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Turtle className="w-3 h-3 text-[#2E7D32]" />
                          <span>Lambat</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => sound.speakEnglishSpelling(item.word)}
                          className="px-2.5 py-1 bg-[#FAF8F0] hover:bg-[#F5F2E9] border border-[#D7CCC8] text-[#1565C0] font-black text-[11px] rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <SpellCheck className="w-3 h-3" />
                          <span>Eja</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {words.map((item, idx) => {
            const isPlayed = playedWords.includes(item.word);
            const reading = getEnglishCaraBaca(item.word, item.caraBaca);

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all shadow-2xs flex flex-col justify-between ${
                  isPlayed
                    ? 'bg-white border-[#A5D6A7]'
                    : 'bg-[#FAF8F0] border-[#E7E2D6] hover:border-[#FFB74D] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-3xl">{item.emoji}</span>
                  <button
                    type="button"
                    onClick={() => handlePlayWord(item.word, false)}
                    className="p-1.5 bg-[#FFF8E1] hover:bg-[#FFE082] rounded-xl text-[#D97706] cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <div className="text-sm font-black text-[#4E342E] leading-tight">
                    {item.word}
                  </div>
                  <div className="text-xs font-bold text-[#D97706]">
                    {item.translation}
                  </div>
                  <div className="text-[11px] font-black text-[#2E7D32] bg-[#E8F5E9] px-1.5 py-0.5 rounded-md mt-1">
                    🗣️ "{reading.caraBaca}"
                  </div>
                  {item.phonetic && (
                    <div className="text-[10px] text-[#8D6E63] font-mono mt-0.5">
                      {item.phonetic}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 mt-2 pt-2 border-t border-[#E7E2D6]">
                  <button
                    type="button"
                    onClick={() => handlePlayWord(item.word, true)}
                    className="text-[10px] font-black text-[#2E7D32] hover:underline flex items-center gap-0.5"
                  >
                    <Turtle className="w-3 h-3" /> Lambat
                  </button>
                  <span className="text-[#BDBDBD]">•</span>
                  <button
                    type="button"
                    onClick={() => handleSpellWord(item.word)}
                    className="text-[10px] font-black text-[#1565C0] hover:underline flex items-center gap-0.5"
                  >
                    <SpellCheck className="w-3 h-3" /> Eja
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
