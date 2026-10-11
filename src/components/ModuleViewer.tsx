import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LEARNING_MODULES } from '../data/modulesData';
import { ArrowLeft, ArrowRight, Volume2, Sparkles, CheckCircle2, RotateCcw, Award, Shuffle } from 'lucide-react';
import { sound } from '../utils/audio';
import { randomizeLearningStepData } from '../utils/dynamicCurriculumEngine';
import { LearningStep } from '../types';
import { LetterTracingCanvas } from './LetterTracingCanvas';
import { SyllableReader } from './SyllableReader';
import { AbacusSimulator } from './AbacusSimulator';
import { EnglishInteractive } from './EnglishVocabularyCards';

export const ModuleViewer: React.FC = () => {
  const { activeModuleId, setActiveView, speechEnabled } = useApp();

  const currentModule = LEARNING_MODULES.find(m => m.id === activeModuleId) || LEARNING_MODULES[0];
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [customStepData, setCustomStepData] = useState<LearningStep | null>(null);

  // Interactive step states
  const [tapCounter, setTapCounter] = useState<number>(0);
  const [isMerged, setIsMerged] = useState<boolean>(false);
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [rabbitPosition, setRabbitPosition] = useState<number>(1);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    const unsub = sound.onSpeechStateChange((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => unsub();
  }, []);

  const baseStep = currentModule.steps[currentStepIndex] || currentModule.steps[0];
  const step = customStepData || baseStep;
  const isLastStep = currentStepIndex === currentModule.steps.length - 1;

  // Auto speak on step change if enabled
  useEffect(() => {
    // Reset states on step change
    setCustomStepData(null);
    setTapCounter(baseStep.interactiveData?.initialCount || 0);
    setIsMerged(false);
    setPoppedBalloons([]);
    setRabbitPosition(1);

    if (speechEnabled && baseStep.speechText) {
      const timer = setTimeout(() => {
        sound.speakSmart(baseStep.speechText, currentModule.subjectId);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, baseStep, speechEnabled, currentModule.subjectId]);

  const handleRandomizeExample = () => {
    sound.playPop(540);
    const randomized = randomizeLearningStepData(baseStep);
    setCustomStepData(randomized);
    setTapCounter(0);
    setIsMerged(false);
    if (speechEnabled && randomized.speechText) {
      sound.speakSmart(randomized.speechText, currentModule.subjectId);
    }
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      sound.stopSpeaking();
      setIsSpeaking(false);
    } else {
      sound.speakSmart(step.speechText || step.prompt, currentModule.subjectId);
    }
  };

  const handleNextStep = () => {
    sound.playPop(520);
    sound.stopSpeaking();
    if (isLastStep) {
      // Start Quiz!
      setActiveView('quiz');
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    sound.playPop(420);
    sound.stopSpeaking();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else {
      setActiveView('child_home');
    }
  };

  // Interactive Counter Handler
  const handleItemTap = (itemIndex: number) => {
    const target = step.interactiveData?.targetCount || 5;
    if (tapCounter < target) {
      const newCount = tapCounter + 1;
      setTapCounter(newCount);
      sound.playPop(300 + newCount * 60);

      if (newCount === target) {
        sound.playSuccess();
      }
    }
  };

  // Subtraction Pop Handler
  const handleBalloonTap = (idx: number) => {
    if (!poppedBalloons.includes(idx)) {
      sound.playPop(650);
      setPoppedBalloons(prev => {
        const next = [...prev, idx];
        if (next.length === 3) {
          sound.playSuccess();
        }
        return next;
      });
    }
  };

  // Rabbit Number Line Hop
  const handleRabbitHop = () => {
    if (rabbitPosition < 20) {
      const nextPos = rabbitPosition + 1;
      setRabbitPosition(nextPos);
      sound.playPop(350 + nextPos * 25);
      if (nextPos === 20 || nextPos % 5 === 0) {
        sound.playStarCollect();
      }
    } else {
      setRabbitPosition(1);
      sound.playPop(350);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <button
          id="btn-module-back-home"
          onClick={() => {
            sound.stopSpeaking();
            setActiveView('child_home');
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF8F0] hover:bg-[#F5F2E9] border-2 border-[#D7CCC8] rounded-2xl text-xs sm:text-sm font-extrabold text-[#4E342E] shadow-2xs active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Beranda</span>
        </button>

        {/* Step Indicator dots */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F0] px-3 py-1.5 rounded-full border-2 border-[#E7E2D6] shadow-2xs">
          {currentModule.steps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                sound.playPop(480);
                setCurrentStepIndex(idx);
              }}
              title={s.title}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'w-7 bg-[#D97706]'
                  : idx < currentStepIndex
                  ? 'w-2.5 bg-[#81C784]'
                  : 'w-2.5 bg-[#D7CCC8]'
              }`}
            />
          ))}
          <span className="text-xs font-black text-[#6D4C41] ml-1">
            {currentStepIndex + 1}/{currentModule.steps.length}
          </span>
        </div>

        {/* Audio Read & Randomize Buttons */}
        <div className="flex items-center gap-2">
          {step.interactiveData && (
            <button
              id="btn-module-randomize-example"
              onClick={handleRandomizeExample}
              title="Acak contoh angka dan benda baru"
              className="flex items-center gap-1.5 px-3 py-2 bg-[#FFFDE7] hover:bg-[#FFF9C4] border-2 border-[#FFE082] rounded-2xl text-xs sm:text-sm font-black text-[#B45309] shadow-2xs active:scale-95 transition-all cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Acak Contoh</span>
            </button>
          )}

          <button
            id="btn-module-read-aloud"
            onClick={handleSpeak}
            className={`flex items-center gap-1.5 px-3 py-2 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-2xs active:scale-95 transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-rose-600 hover:bg-rose-700 ring-2 ring-rose-300 animate-pulse'
                : 'bg-[#1976D2] hover:bg-[#1565C0]'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
            <span className="hidden sm:inline">{isSpeaking ? 'Hentikan' : 'Dengarkan'}</span>
          </button>
        </div>
      </div>

      {/* Main Lesson Stage Card */}
      <div className="bg-[#FAF8F0] rounded-3xl sm:rounded-[36px] border-4 border-[#E7E2D6] shadow-md p-5 sm:p-8 relative overflow-hidden">
        {/* Module category ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF8E1] border border-[#FFE082] rounded-full text-xs font-black text-[#5D4037]">
              <span>{currentModule.coverEmoji}</span>
              <span>{currentModule.title}</span>
            </div>
            {currentModule.kurikulumFase && (
              <span className="text-[10px] font-black text-[#1565C0] bg-[#E3F2FD] px-2.5 py-0.5 rounded-full border border-[#90CAF9]">
                🇮🇩 {currentModule.kurikulumFase}
              </span>
            )}
          </div>

          <div className="text-xs font-bold text-[#8D6E63]">
            Langkah {currentStepIndex + 1} dari {currentModule.steps.length}
          </div>
        </div>

        {/* Step Header */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-[#4E342E] tracking-tight mb-1">
          {step.title}
        </h2>
        {step.subtitle && (
          <p className="text-xs sm:text-sm font-bold text-[#B45309] mb-4">
            {step.subtitle}
          </p>
        )}

        {/* Prompt Speech Bubble */}
        <div className="p-4 sm:p-5 bg-[#FFF8E1] rounded-2xl sm:rounded-3xl border-2 border-[#FFE082] mb-6 text-[#4E342E] font-bold text-sm sm:text-base leading-relaxed">
          {step.prompt}
        </div>

        {/* Interactive Zone */}
        <div className="my-6 min-h-[220px] flex items-center justify-center p-4 bg-[#FDFCF0] rounded-3xl border-2 border-[#E7E2D6]">
          {/* 1. Tap to Count Interactive */}
          {step.interactiveData?.interactiveType === 'tap_to_count' && (
            <div className="text-center w-full">
              <div className="text-xs font-black text-[#8D6E63] uppercase tracking-wider mb-2">
                Sentuh {step.interactiveData.itemLabel} untuk menghitung!
              </div>

              {/* Items Grid */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-4 max-w-md mx-auto">
                {Array.from({ length: step.interactiveData.targetCount || 5 }).map((_, idx) => {
                  const isCounted = idx < tapCounter;
                  return (
                    <button
                      key={idx}
                      id={`tap-item-${idx}`}
                      onClick={() => handleItemTap(idx)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-all transform active:scale-90 ${
                        isCounted
                          ? 'bg-[#FFF8E1] border-3 border-[#D97706] shadow-xs scale-105 rotate-2'
                          : 'bg-[#FAF8F0] border-2 border-[#D7CCC8] hover:border-[#D97706] hover:bg-[#FFF8E1]'
                      }`}
                    >
                      <span>{step.interactiveData?.emoji}</span>
                    </button>
                  );
                })}
              </div>

              {/* Counter Display */}
              <div className="inline-flex items-center gap-3 bg-[#FAF8F0] px-5 py-2.5 rounded-2xl border-2 border-[#FFE082] shadow-2xs mt-2">
                <span className="text-xs font-black text-[#8D6E63]">Jumlah Dihitung:</span>
                <span className="text-2xl sm:text-3xl font-black text-[#D97706] font-heading">
                  {tapCounter} / {step.interactiveData.targetCount}
                </span>
                {tapCounter >= (step.interactiveData.targetCount || 5) && (
                  <span className="text-[#2E7D32] font-extrabold text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Lengkap!
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 2. Add to Basket Interactive */}
          {step.interactiveData?.interactiveType === 'add_basket' && (
            <div className="text-center w-full">
              <div className="text-xs font-black text-[#8D6E63] uppercase tracking-wider mb-2">
                Sentuh jeruk untuk menambahkannya ke keranjang!
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-4">
                {Array.from({ length: (step.interactiveData.targetCount || 7) - 4 }).map((_, idx) => {
                  const isAdded = idx < (tapCounter - 4);
                  return (
                    <button
                      key={idx}
                      id={`tap-basket-item-${idx}`}
                      onClick={() => {
                        if (tapCounter < (step.interactiveData?.targetCount || 7)) {
                          const next = tapCounter + 1;
                          setTapCounter(next);
                          sound.playPop(350 + next * 40);
                          if (next === (step.interactiveData?.targetCount || 7)) {
                            sound.playSuccess();
                          }
                        }
                      }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl transition-all ${
                        isAdded
                          ? 'bg-[#FFF8E1] border-3 border-[#D97706] shadow-xs scale-105'
                          : 'bg-[#FAF8F0] border-2 border-[#D7CCC8] hover:border-[#D97706] animate-wiggle'
                      }`}
                    >
                      🍊
                    </button>
                  );
                })}
              </div>

              <div className="p-4 bg-[#FFF8E1] rounded-2xl inline-flex items-center gap-2 border-2 border-[#FFE082] font-black text-[#4E342E]">
                <span>🧺 Keranjang:</span>
                <span className="text-2xl text-[#D97706]">{tapCounter} Jeruk</span>
                {tapCounter >= (step.interactiveData.targetCount || 7) && (
                  <span className="text-[#2E7D32] font-bold ml-2 text-xs">🎉 Hebat! 4 + 3 = 7</span>
                )}
              </div>
            </div>
          )}

          {/* 3. Addition Visual Merge */}
          {step.type === 'addition_visual' && (
            <div className="text-center w-full">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 my-2">
                {/* Group A */}
                <div className="p-4 bg-[#FFEBEE] border-2 border-[#FFCDD2] rounded-2xl text-center">
                  <div className="text-2xl sm:text-3xl mb-1">🍓🍓🍓</div>
                  <div className="text-xs font-black text-[#C62828]">3 Stroberi</div>
                </div>

                <div className="text-3xl font-black text-[#D97706]">+</div>

                {/* Group B */}
                <div className="p-4 bg-[#FFEBEE] border-2 border-[#FFCDD2] rounded-2xl text-center">
                  <div className="text-2xl sm:text-3xl mb-1">🍓🍓</div>
                  <div className="text-xs font-black text-[#C62828]">2 Stroberi</div>
                </div>

                <div className="text-3xl font-black text-[#8D6E63]">=</div>

                {/* Combined Result */}
                <div className={`p-4 rounded-2xl text-center transition-all ${
                  isMerged
                    ? 'bg-[#E8F5E9] border-3 border-[#81C784] shadow-xs scale-105'
                    : 'bg-[#F5F2E9] border-2 border-dashed border-[#D7CCC8]'
                }`}>
                  <div className="text-2xl sm:text-3xl mb-1">
                    {isMerged ? '🍓🍓🍓🍓🍓' : '❓ ❓ ❓'}
                  </div>
                  <div className="text-xs font-black text-[#2E7D32]">
                    {isMerged ? '5 Stroberi' : 'Sentuh Gabung'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                id="btn-merge-addition"
                onClick={() => {
                  sound.playSuccess();
                  setIsMerged(true);
                }}
                className="mt-4 px-5 py-2.5 bg-gradient-to-r from-[#2E7D32] to-[#388E3C] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white rounded-2xl font-black text-xs sm:text-sm shadow-xs active:scale-95 transition-all"
              >
                {isMerged ? '✓ Berhasil Digabungkan (3 + 2 = 5)' : '✨ Gabungkan Kedua Piring!'}
              </button>
            </div>
          )}

          {/* 4. Subtraction Pop Balloons */}
          {(step.type === 'subtraction_visual' || step.interactiveData?.interactiveType === 'pop_balloons') && (
            <div className="text-center w-full">
              <div className="text-xs font-black text-[#8D6E63] uppercase tracking-wider mb-2">
                Sentuh balon untuk meletuskannya! 🎈💥
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-3 max-w-lg mx-auto">
                {Array.from({ length: step.interactiveData?.initialCount || 6 }).map((_, idx) => {
                  const isPopped = poppedBalloons.includes(idx);
                  return (
                    <button
                      key={idx}
                      id={`balloon-pop-${idx}`}
                      onClick={() => handleBalloonTap(idx)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-all transform active:scale-75 ${
                        isPopped
                          ? 'bg-[#EFEBE9] border-2 border-[#D7CCC8] opacity-40 rotate-12 scale-90'
                          : 'bg-[#E3F2FD] border-2 border-[#90CAF9] hover:border-[#42A5F5] shadow-2xs animate-float'
                      }`}
                    >
                      <span>{isPopped ? '💥' : '🎈'}</span>
                    </button>
                  );
                })}
              </div>

              <div className="p-3.5 bg-[#E3F2FD] rounded-2xl border-2 border-[#90CAF9] inline-flex items-center gap-3 font-black text-[#0D47A1]">
                <span>🎈 Mula-mula: {step.interactiveData?.initialCount || 6}</span>
                <span>💥 Meletus: {poppedBalloons.length}</span>
                <span className="text-base sm:text-lg text-[#1565C0] bg-white px-3 py-1 rounded-xl shadow-2xs">
                  Sisa: {(step.interactiveData?.initialCount || 6) - poppedBalloons.length} Balon
                </span>
              </div>
            </div>
          )}

          {/* 5. Rabbit Number Line */}
          {step.type === 'number_line' && (
            <div className="w-full text-center">
              <div className="text-xs font-black text-[#8D6E63] uppercase tracking-wider mb-3">
                Garis Bilangan Lompat Kelinci (1 - 20)
              </div>

              {/* Number Line Track */}
              <div className="overflow-x-auto pb-3 pt-2">
                <div className="flex items-center gap-1.5 min-w-[500px] justify-center px-4">
                  {Array.from({ length: 20 }, (_, i) => i + 1).map(num => {
                    const isRabbitHere = num === rabbitPosition;
                    return (
                      <div key={num} className="flex flex-col items-center">
                        <div className="h-8 flex items-center justify-center text-xl">
                          {isRabbitHere ? '🐰' : ''}
                        </div>
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                            isRabbitHere
                              ? 'bg-[#D97706] text-white shadow-xs scale-110 ring-2 ring-[#FFB74D]'
                              : num < rabbitPosition
                              ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]'
                              : 'bg-[#FAF8F0] text-[#6D4C41] border border-[#D7CCC8]'
                          }`}
                        >
                          {num}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                id="btn-rabbit-hop"
                onClick={handleRabbitHop}
                className="mt-3 px-6 py-2.5 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] text-white rounded-2xl font-black text-xs sm:text-sm shadow-xs active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <span>🐰 Lompat Maju (+1)</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs font-mono">
                  Posisi: {rabbitPosition}
                </span>
              </button>
            </div>
          )}

          {/* 6. Letter Tracing Canvas Interactive */}
          {(step.type === 'letter_tracing' || step.interactiveData?.interactiveType === 'letter_tracing') && (
            <LetterTracingCanvas
              initialLetter={step.interactiveData?.letter || 'A'}
              exampleWord={step.interactiveData?.exampleWord || 'Apel'}
              exampleEmoji={step.interactiveData?.exampleEmoji || '🍎'}
              phonicsSound={step.interactiveData?.phonicsSound || 'A! A untuk Apel'}
              strokeGuide={step.interactiveData?.strokeGuide}
              availableLetters={step.interactiveData?.availableLetters}
              onComplete={() => {
                sound.playSuccess();
              }}
            />
          )}

          {/* 7. Syllable Reading Interactive */}
          {(step.type === 'syllable_reading' || step.interactiveData?.interactiveType === 'syllable_reading') && (
            <SyllableReader
              initialWord={
                step.interactiveData?.syllables
                  ? {
                      syllables: step.interactiveData.syllables,
                      fullWord: step.interactiveData.fullWord || step.interactiveData.syllables.join(''),
                      emoji: step.interactiveData.wordEmoji || '📖',
                      sentence: step.interactiveData.exampleSentence || 'Ayo membaca bersama teman!'
                    }
                  : undefined
              }
              wordsList={step.interactiveData?.allWords}
              onComplete={() => {
                sound.playSuccess();
              }}
            />
          )}

          {/* 8. Sempoa / Abacus Simulator Interactive */}
          {(step.type === 'abacus_interactive' || step.interactiveData?.interactiveType === 'abacus_interactive') && (
            <AbacusSimulator
              rodsCount={step.interactiveData?.rodsCount || 4}
              initialRods={step.interactiveData?.initialRods}
              targetNumber={step.interactiveData?.targetNumber}
              showFormula={step.interactiveData?.showFormula}
              formulaTitle={step.interactiveData?.formulaTitle}
              operationType={step.interactiveData?.operationType}
              onComplete={() => {
                sound.playSuccess();
              }}
            />
          )}

          {/* 9. English Vocabulary Cards */}
          {(step.type === 'english_cards' || step.interactiveData?.interactiveType === 'english_cards') && (
            <EnglishInteractive
              mode="words"
              words={step.interactiveData?.englishWords}
              onComplete={() => {
                sound.playSuccess();
              }}
            />
          )}

          {/* 10. English Alphabet & Phonics Song */}
          {(step.type === 'alphabet_song' || step.interactiveData?.interactiveType === 'alphabet_song') && (
            <EnglishInteractive
              mode="alphabet"
              alphabetLetters={step.interactiveData?.alphabetLetters}
              songLyrics={step.interactiveData?.songLyrics}
              onComplete={() => {
                sound.playSuccess();
              }}
            />
          )}

          {/* 11. English Dialogue & Roleplay */}
          {(step.type === 'dialogue_roleplay' || step.interactiveData?.interactiveType === 'dialogue_roleplay') && (
            <EnglishInteractive
              mode="dialogue"
              dialogues={step.interactiveData?.dialogues}
              onComplete={() => {
                sound.playSuccess();
              }}
            />
          )}

          {/* 12. Summary / Ready for quiz */}
          {step.type === 'summary' && (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-gradient-to-tr from-[#FFB74D] to-[#FFD54F] rounded-3xl flex items-center justify-center mx-auto mb-3 text-4xl shadow-sm border-4 border-[#FAF8F0] animate-bounce-short">
                🎯
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-[#4E342E] font-heading mb-1">
                Luar Biasa, Kamu Sudah Paham!
              </h4>
              <p className="text-xs sm:text-sm text-[#6D4C41] max-w-sm mx-auto mb-4 font-semibold">
                Yuk selesaikan 5 soal kuis interaktif dan dapatkan reward <strong className="text-[#D97706]">+{currentModule.starsReward} Bintang</strong> serta lencana <strong className="text-[#5E35B1]">{currentModule.badgeReward.name}</strong>!
              </p>

              <button
                type="button"
                id="btn-start-quiz-from-step"
                onClick={handleNextStep}
                className="px-8 py-3.5 bg-gradient-to-r from-[#2E7D32] to-[#388E3C] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white rounded-2xl font-black text-base shadow-md active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <span>Mulai Kuis Sekarang!</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* 7. Story / Tips fallback */}
          {step.type === 'story' && !step.interactiveData && (
            <div className="p-4 bg-[#FAF8F0] rounded-2xl border border-[#E7E2D6] text-[#4E342E] font-bold text-sm">
              💡 {step.tips || 'Perhatikan penjelasan di atas dengan baik ya!'}
            </div>
          )}
        </div>

        {/* Tip Box */}
        {step.tips && step.type !== 'summary' && (
          <div className="p-3 bg-[#E3F2FD] border border-[#90CAF9] rounded-2xl text-[#0D47A1] text-xs font-bold flex items-center gap-2 mb-6">
            <span className="text-base">💡</span>
            <span>{step.tips}</span>
          </div>
        )}

        {/* Bottom Nav Buttons */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t-2 border-[#E7E2D6]">
          <button
            type="button"
            id="btn-step-prev"
            onClick={handlePrevStep}
            className="px-4 sm:px-6 py-3 bg-[#FAF8F0] hover:bg-[#F5F2E9] border border-[#D7CCC8] text-[#6D4C41] rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStepIndex === 0 ? 'Keluar' : 'Sebelumnya'}</span>
          </button>

          <button
            type="button"
            id="btn-step-next"
            onClick={handleNextStep}
            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] text-white rounded-2xl font-black text-xs sm:text-sm shadow-xs active:scale-95 transition-all flex items-center gap-2"
          >
            <span>{isLastStep ? 'Mulai Kuis 🎯' : 'Lanjut Belajar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
