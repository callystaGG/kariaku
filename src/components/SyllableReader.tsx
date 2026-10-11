import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, ArrowRight, BookOpen, Smile, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface WordEntry {
  syllables: string[];
  fullWord: string;
  emoji: string;
  sentence: string;
}

interface SyllableReaderProps {
  initialWord?: WordEntry;
  wordsList?: WordEntry[];
  onComplete?: () => void;
}

const DEFAULT_WORDS: WordEntry[] = [
  {
    syllables: ['BA', 'JU'],
    fullWord: 'BAJU',
    emoji: '👕',
    sentence: 'Ciko memakai baju bersih berwarna biru.'
  },
  {
    syllables: ['BO', 'LA'],
    fullWord: 'BOLA',
    emoji: '⚽',
    sentence: 'Leo menendang bola ke gawang.'
  },
  {
    syllables: ['BU', 'KU'],
    fullWord: 'BUKU',
    emoji: '📚',
    sentence: 'Profesor Owi rajin membaca buku cerita.'
  },
  {
    syllables: ['RO', 'TI'],
    fullWord: 'ROTI',
    emoji: '🍞',
    sentence: 'Mimi suka makan roti selai stroberi.'
  },
  {
    syllables: ['KU', 'DA'],
    fullWord: 'KUDA',
    emoji: '🐴',
    sentence: 'Kuda berlari kencang di padang rumput.'
  },
  {
    syllables: ['MA', 'DU'],
    fullWord: 'MADU',
    emoji: '🍯',
    sentence: 'Madu lebah rasanya sangat manis.'
  }
];

export const SyllableReader: React.FC<SyllableReaderProps> = ({
  initialWord,
  wordsList = DEFAULT_WORDS,
  onComplete
}) => {
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [isMerged, setIsMerged] = useState<boolean>(false);
  const [tappedSyllables, setTappedSyllables] = useState<number[]>([]);

  const currentWord = wordsList[activeWordIndex] || initialWord || DEFAULT_WORDS[0];

  const handleSyllableTap = (index: number, syll: string) => {
    sound.playPop(520 + index * 80);
    sound.speakIndonesian(syll);
    if (!tappedSyllables.includes(index)) {
      setTappedSyllables(prev => [...prev, index]);
    }
  };

  const handleMergeWord = () => {
    setIsMerged(true);
    sound.playSyllableBlend();
    
    // Spell out and pronounce full word & sentence
    const spell = currentWord.syllables.join('... ');
    sound.speakIndonesian(`${spell}... ${currentWord.fullWord}! ${currentWord.sentence}`);

    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.65 }
    });

    if (onComplete) {
      onComplete();
    }
  };

  const handleSelectWord = (idx: number) => {
    sound.playPop(460);
    setActiveWordIndex(idx);
    setIsMerged(false);
    setTappedSyllables([]);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Word Category Badge */}
      <div className="flex items-center gap-2 mb-3 bg-[#FAF8F0] px-4 py-1.5 rounded-full border-2 border-[#E7E2D6] shadow-2xs">
        <BookOpen className="w-4 h-4 text-[#1976D2]" />
        <span className="text-xs font-black text-[#4E342E]">
          Membaca Suku Kata Terbuka • {currentWord.syllables.length} Suku Kata
        </span>
      </div>

      {/* Main Interactive Syllable Card */}
      <div className="bg-[#FAF8F0] p-5 sm:p-7 rounded-3xl sm:rounded-[36px] border-4 border-[#E7E2D6] shadow-inner max-w-lg w-full text-center">
        {/* Syllable Blocks */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-2">
          {currentWord.syllables.map((syll, idx) => {
            const isTapped = tappedSyllables.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSyllableTap(idx, syll)}
                className={`group relative px-5 sm:px-7 py-4 sm:py-5 rounded-2xl sm:rounded-3xl border-3 font-heading font-black text-2xl sm:text-4xl transition-all transform active:scale-95 cursor-pointer shadow-xs ${
                  isTapped
                    ? 'bg-[#FFF8E1] border-[#D97706] text-[#B45309] scale-105 ring-4 ring-[#FFE082]'
                    : 'bg-[#FAF8F0] border-[#90CAF9] text-[#1565C0] hover:bg-[#E3F2FD] hover:border-[#1976D2]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span>{syll}</span>
                  <Volume2 className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[10px] font-bold text-[#8D6E63] mt-1">
                  Ketuk Bunyi
                </div>
              </button>
            );
          })}
        </div>

        {/* Plus / Merge Arrow Indicator */}
        <div className="my-3 text-xs font-black text-[#8D6E63] uppercase tracking-wider flex items-center justify-center gap-2">
          <span>Sentuh setiap suku kata, lalu gabungkan!</span>
        </div>

        {/* Merged Word Reveal Box */}
        <div className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-3 transition-all ${
          isMerged
            ? 'bg-[#E8F5E9] border-[#81C784] shadow-sm scale-102'
            : 'bg-[#F5F2E9] border-dashed border-[#D7CCC8]'
        }`}>
          {isMerged ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl sm:text-5xl">{currentWord.emoji}</span>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-black text-[#2E7D32] font-heading tracking-wide">
                    {currentWord.fullWord}
                  </div>
                  <div className="text-xs text-[#558B2F] font-bold">
                    ({currentWord.syllables.join(' - ')})
                  </div>
                </div>
              </div>

              {/* Sample Sentence */}
              <div className="mt-3 p-3 bg-white/80 rounded-2xl border border-[#A5D6A7] text-xs sm:text-sm font-bold text-[#2E7D32] flex items-center justify-between gap-2">
                <span>"{currentWord.sentence}"</span>
                <button
                  type="button"
                  onClick={() => sound.speakIndonesian(currentWord.sentence)}
                  className="p-1.5 bg-[#E8F5E9] hover:bg-[#C8E6C9] rounded-xl text-[#2E7D32] shrink-0 active:scale-90 transition-all cursor-pointer"
                  title="Dengarkan Kalimat"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-3 text-sm font-bold text-[#8D6E63] flex items-center justify-center gap-2">
              <span>❓ ❓ Belum digabungkan</span>
            </div>
          )}
        </div>

        {/* Action Merge Button */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleMergeWord}
            className="px-6 py-3 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] text-white rounded-2xl font-black text-sm shadow-xs active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isMerged ? '🔊 Baca Ulang Kata & Kalimat' : '✨ Gabungkan & Baca Kata'}</span>
          </button>
        </div>
      </div>

      {/* Vocabulary Selector Cards */}
      {wordsList && wordsList.length > 1 && (
        <div className="mt-4 w-full max-w-lg">
          <div className="text-xs font-black uppercase text-[#8D6E63] mb-2 text-center">
            Pilih Kata Belajar Lainnya:
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {wordsList.map((item, idx) => {
              const isSelected = activeWordIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectWord(idx)}
                  className={`p-2 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFF8E1] border-[#D97706] shadow-xs scale-105'
                      : 'bg-[#FAF8F0] border-[#D7CCC8] hover:bg-[#FFF8E1]'
                  }`}
                >
                  <div className="text-2xl mb-0.5">{item.emoji}</div>
                  <div className="text-[11px] font-black text-[#4E342E]">
                    {item.fullWord}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
