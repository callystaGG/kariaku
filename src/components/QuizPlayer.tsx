import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { LEARNING_MODULES } from '../data/modulesData';
import { QuizOption, QuizQuestion } from '../types';
import { ArrowLeft, Volume2, CheckCircle2, XCircle, Sparkles, Award, RotateCcw, Home, ArrowRight, Shuffle, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { voice } from '../audio/voice';
import { useGuide } from '../audio/useGuide';
import { getQuestionsForQuiz } from '../utils/dynamicCurriculumEngine';

export const QuizPlayer: React.FC = () => {
  const {
    activeModuleId,
    setActiveView,
    setActiveModuleId,
    recordQuizCompletion,
    speechEnabled,
    practiceQuizSession,
    clearPracticeQuizSession,
    startPracticeQuiz
  } = useApp();

  const guide = useGuide();
  const isPracticeMode = Boolean(practiceQuizSession?.isPractice);
  const currentModule = useMemo(() => {
    return LEARNING_MODULES.find(m => m.id === activeModuleId) || LEARNING_MODULES[0];
  }, [activeModuleId]);

  // Dynamic question list state (can be randomized anytime)
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(() => {
    if (practiceQuizSession?.questions && practiceQuizSession.questions.length > 0) {
      return practiceQuizSession.questions;
    }
    // For standard module, initialize with randomized + shuffled options from bank
    return getQuestionsForQuiz(currentModule.gradeId, currentModule.subjectId, currentModule.quiz, 5);
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    const unsub = sound.onSpeechStateChange((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => unsub();
  }, []);

  // Update questions if practiceQuizSession changes
  useEffect(() => {
    if (practiceQuizSession?.questions && practiceQuizSession.questions.length > 0) {
      setActiveQuestions(practiceQuizSession.questions);
      setCurrentQuestionIndex(0);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setCorrectAnswersCount(0);
      setIsQuizCompleted(false);
    }
  }, [practiceQuizSession]);

  const totalQuestions = activeQuestions.length;
  const question = activeQuestions[currentQuestionIndex] || activeQuestions[0];

  // Speak question prompt on mount / change
  useEffect(() => {
    if (!isQuizCompleted && speechEnabled && question?.speechPrompt) {
      const timer = setTimeout(async () => {
        const played = await voice.playQuestion(guide, question.id);
        if (!played) sound.speakSmart(question.speechPrompt, currentModule.subjectId);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, isQuizCompleted, question, speechEnabled, currentModule.subjectId, guide]);

  const handleSpeakQuestion = async () => {
    if (isSpeaking) {
      sound.stopSpeaking();
      setIsSpeaking(false);
    } else {
      const played = await voice.playQuestion(guide, question.id);
      if (!played) sound.speakSmart(question.speechPrompt || question.prompt, currentModule.subjectId);
    }
  };

  const handleSelectOption = (option: QuizOption) => {
    if (isAnswered) return;

    setSelectedOptionId(option.id);
    setIsAnswered(true);

    if (option.isCorrect) {
      sound.playSuccess();
      setCorrectAnswersCount(prev => prev + 1);
      if (speechEnabled) {
        setTimeout(() => { void voice.playLine(guide, 'benar'); }, 350);
      }
    } else {
      sound.playError();
      if (speechEnabled) {
        setTimeout(() => { void voice.playLine(guide, 'salah'); }, 350);
      }
    }
  };

  const handleNextQuestion = () => {
    sound.playPop(500);
    sound.stopSpeaking();

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const scorePercentage = Math.round((correctAnswersCount / totalQuestions) * 100);
    const maxReward = isPracticeMode ? (practiceQuizSession?.starsReward || 20) : currentModule.starsReward;
    const earnedStars = scorePercentage >= 60 ? maxReward : Math.max(5, Math.round(maxReward / 2));
    const targetModuleId = isPracticeMode ? `practice-${practiceQuizSession?.subjectId}` : currentModule.id;
    const targetBadgeId = isPracticeMode ? practiceQuizSession?.badgeId : (scorePercentage >= 60 ? currentModule.badgeReward.id : undefined);

    recordQuizCompletion(
      targetModuleId,
      scorePercentage,
      totalQuestions,
      earnedStars,
      targetBadgeId
    );

    setIsQuizCompleted(true);
    sound.playFanfare();

    if (speechEnabled) {
      setTimeout(() => { void voice.playLine(guide, 'semangat'); }, 500);
    }

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleRestartWithNewQuestions = () => {
    sound.playFanfare();
    sound.stopSpeaking();
    // Generate fresh questions from question bank
    const grade = isPracticeMode ? practiceQuizSession!.gradeId : currentModule.gradeId;
    const subject = isPracticeMode ? practiceQuizSession!.subjectId : currentModule.subjectId;
    const count = totalQuestions > 0 ? totalQuestions : 5;
    const freshQuestions = getQuestionsForQuiz(grade, subject, isPracticeMode ? undefined : currentModule.quiz, count);
    
    setActiveQuestions(freshQuestions);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setCorrectAnswersCount(0);
    setIsQuizCompleted(false);
  };

  const handleRestartQuiz = () => {
    sound.playPop(480);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setCorrectAnswersCount(0);
    setIsQuizCompleted(false);
  };

  const handleGoHome = () => {
    sound.stopSpeaking();
    sound.playPop(440);
    clearPracticeQuizSession();
    setActiveView('child_home');
  };

  const handleNextModule = () => {
    sound.stopSpeaking();
    sound.playPop(520);
    clearPracticeQuizSession();
    const currentIndex = LEARNING_MODULES.findIndex(m => m.id === currentModule.id);
    const nextMod = LEARNING_MODULES[(currentIndex + 1) % LEARNING_MODULES.length];
    setActiveModuleId(nextMod.id);
    setActiveView('module_learning');
  };

  // Completion Screen
  if (isQuizCompleted) {
    const finalScore = Math.round((correctAnswersCount / totalQuestions) * 100);
    const isPassing = finalScore >= 60;
    const maxReward = isPracticeMode ? (practiceQuizSession?.starsReward || 20) : currentModule.starsReward;
    const earnedStars = isPassing ? maxReward : Math.max(5, Math.round(maxReward / 2));

    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center animate-scaleIn">
        <div className="bg-[#FAF8F0] rounded-3xl sm:rounded-[36px] border-4 border-[#E7E2D6] shadow-md p-6 sm:p-10 relative overflow-hidden">
          {/* Trophy Header */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#FFB74D] via-[#FFA726] to-[#FFD54F] flex items-center justify-center mx-auto mb-4 shadow-sm border-4 border-[#FAF8F0] text-5xl sm:text-6xl animate-bounce-short">
            {finalScore === 100 ? '👑' : isPassing ? '🏆' : '🌟'}
          </div>

          <span className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FFF8E1] text-[#5D4037] border border-[#FFE082] mb-2">
            {isPracticeMode ? practiceQuizSession?.title : currentModule.title}
          </span>

          <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#4E342E] tracking-tight mb-2">
            {finalScore === 100
              ? 'Luar Biasa Sempurna!'
              : isPassing
              ? 'Hebat Sekali, Kamu Lulus!'
              : 'Semangat, Coba Lagi Yuk!'}
          </h2>

          <p className="text-xs sm:text-sm text-[#6D4C41] max-w-md mx-auto mb-6 font-semibold">
            {isPassing
              ? 'Kamu telah menyelesaikan kuis ini dengan sangat baik!'
              : 'Jangan berkecil hati, kamu bisa mengacak soal baru untuk berlatih lagi!'}
          </p>

          {/* Score & Stars Display Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto mb-6">
            <div className="p-4 bg-[#FFF8E1] rounded-2xl border-2 border-[#FFE082]">
              <div className="text-xs font-extrabold text-[#8D6E63] uppercase">Nilai Kuis</div>
              <div className="text-3xl sm:text-4xl font-black text-[#D97706] font-heading my-1">
                {finalScore}
              </div>
              <div className="text-[11px] font-bold text-[#6D4C41]">
                {correctAnswersCount} dari {totalQuestions} Soal Benar
              </div>
            </div>

            <div className="p-4 bg-[#FFFDE7] rounded-2xl border-2 border-[#FFF59D]">
              <div className="text-xs font-extrabold text-[#8D6E63] uppercase">Bintang Didapat</div>
              <div className="text-3xl sm:text-4xl font-black text-[#F57F17] font-heading my-1 flex items-center justify-center gap-1">
                <span>+{earnedStars}</span>
                <span className="text-2xl">⭐</span>
              </div>
              <div className="text-[11px] font-bold text-[#6D4C41]">
                Masuk ke Tabungan Bintang
              </div>
            </div>
          </div>

          {/* Badge Unlocked Banner */}
          {isPassing && !isPracticeMode && currentModule.badgeReward && (
            <div className="p-4 bg-[#EDE7F6] rounded-2xl border-2 border-[#D1C4E9] max-w-md mx-auto mb-6 flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-xl bg-[#5E35B1] text-white flex items-center justify-center text-2xl shadow-2xs shrink-0">
                {currentModule.badgeReward.emoji}
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#4527A0] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD54F]" />
                  <span>Lencana Modul Terbuka!</span>
                </div>
                <div className="text-sm font-black text-[#4E342E]">
                  {currentModule.badgeReward.name}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t-2 border-[#E7E2D6]">
            <button
              type="button"
              id="btn-quiz-shuffle-new"
              onClick={handleRestartWithNewQuestions}
              className="w-full sm:w-auto px-5 py-3 bg-[#E8F5E9] hover:bg-[#C8E6C9] border border-[#81C784] text-[#2E7D32] rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Shuffle className="w-4 h-4 text-[#2E7D32]" />
              <span>🎲 Acak Soal Baru Lagi</span>
            </button>

            <button
              type="button"
              id="btn-quiz-home"
              onClick={handleGoHome}
              className="w-full sm:w-auto px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl font-black text-xs sm:text-sm shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </button>

            {!isPracticeMode && (
              <button
                type="button"
                id="btn-quiz-next-mod"
                onClick={handleNextModule}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#2E7D32] to-[#388E3C] hover:from-[#1B5E20] text-white rounded-2xl font-black text-xs sm:text-sm shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Modul Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz View
  const selectedOption = question?.options?.find(o => o.id === selectedOptionId);

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      {/* Quiz Top Bar */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <button
          id="btn-quiz-back"
          onClick={() => {
            sound.stopSpeaking();
            if (isPracticeMode) {
              clearPracticeQuizSession();
              setActiveView('child_home');
            } else {
              setActiveView('module_learning');
            }
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF8F0] hover:bg-[#F5F2E9] border-2 border-[#D7CCC8] rounded-2xl text-xs sm:text-sm font-extrabold text-[#4E342E] shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isPracticeMode ? 'Kembali' : 'Ke Modul'}</span>
        </button>

        {/* Question Counter */}
        <div className="bg-[#FFF8E1] text-[#5D4037] border-2 border-[#FFE082] px-4 py-1.5 rounded-full text-xs font-black">
          Soal {currentQuestionIndex + 1} dari {totalQuestions}
        </div>

        {/* Action buttons: Read Aloud & Shuffle Questions */}
        <div className="flex items-center gap-2">
          <button
            id="btn-quiz-shuffle-quick"
            onClick={handleRestartWithNewQuestions}
            title="Acak Soal Baru dari Bank Soal"
            className="flex items-center gap-1 px-3 py-2 bg-[#FFFDE7] hover:bg-[#FFF9C4] border-2 border-[#FFE082] text-[#B45309] rounded-2xl text-xs font-black shadow-2xs cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Acak Soal</span>
          </button>

          <button
            id="btn-quiz-read-aloud"
            onClick={handleSpeakQuestion}
            className={`flex items-center gap-1.5 px-3 py-2 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-2xs cursor-pointer active:scale-95 transition-all ${
              isSpeaking
                ? 'bg-rose-600 hover:bg-rose-700 ring-2 ring-rose-300 animate-pulse'
                : 'bg-[#1976D2] hover:bg-[#1565C0]'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
            <span className="hidden sm:inline">{isSpeaking ? 'Hentikan' : 'Dengar'}</span>
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-[#FAF8F0] rounded-3xl sm:rounded-[36px] border-4 border-[#E7E2D6] shadow-md p-5 sm:p-8 relative">
        {/* Progress Bar */}
        <div className="w-full bg-[#E7E2D6] h-2.5 rounded-full mb-6 overflow-hidden border border-[#D7CCC8]">
          <div
            className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Module & Kurikulum Merdeka Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-black text-[#5D4037] bg-[#FFF8E1] px-3 py-1 rounded-full border border-[#FFE082] flex items-center gap-1.5">
            {isPracticeMode ? (
              <>
                <Zap className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{practiceQuizSession?.title}</span>
              </>
            ) : (
              <>
                <span>{currentModule.coverEmoji}</span>
                <span>{currentModule.title}</span>
              </>
            )}
          </span>

          <span className="text-[10px] font-black text-[#1565C0] bg-[#E3F2FD] px-2.5 py-1 rounded-full border border-[#90CAF9]">
            {isPracticeMode ? '🎲 Bank Soal Acak' : `🇮🇩 ${currentModule.kurikulumFase || 'Kurikulum Merdeka'}`}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-black font-heading text-[#4E342E] leading-snug mb-5">
          {question?.prompt}
        </h3>

        {/* Visual Item Container (if any) */}
        {question && (question.itemsVisual || question.equationVisual) && (
          <div className="bg-[#FFF8E1]/80 p-4 sm:p-6 rounded-3xl border-2 border-[#FFE082] mb-6 text-center">
            {question.equationVisual && (
              <div className="text-2xl sm:text-3xl font-black text-[#4E342E] font-mono tracking-wider mb-2">
                {question.equationVisual}
              </div>
            )}

            {question.itemsVisual && (
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 my-2">
                {question.itemsVisual.map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#FAF8F0] rounded-2xl border border-[#FFE082] shadow-2xs inline-block">
                    <div className="text-3xl sm:text-4xl tracking-wider mb-1">
                      {Array.from({ length: item.count }).map((_, i) => (
                        <span
                          key={i}
                          className={`inline-block ${
                            item.struckCount && i >= (item.count - item.struckCount)
                              ? 'opacity-40 line-through grayscale scale-90'
                              : 'animate-wiggle'
                          }`}
                        >
                          {item.emoji}
                        </span>
                      ))}
                    </div>
                    {item.label && (
                      <span className="text-[11px] font-extrabold text-[#5D4037]">
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Multiple Choice Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {question?.options?.map((opt, idx) => {
            const isThisSelected = selectedOptionId === opt.id;
            let optionStyles = 'border-[#E7E2D6] bg-[#FDFCF0] hover:bg-[#FFF8E1] hover:border-[#D97706] text-[#4E342E]';

            if (isAnswered) {
              if (opt.isCorrect) {
                optionStyles = 'border-[#81C784] bg-[#E8F5E9] text-[#2E7D32] ring-2 ring-[#A5D6A7] shadow-xs';
              } else if (isThisSelected && !opt.isCorrect) {
                optionStyles = 'border-[#EF9A9A] bg-[#FFEBEE] text-[#C62828] opacity-90';
              } else {
                optionStyles = 'border-[#E7E2D6] bg-[#F5F2E9] opacity-40';
              }
            }

            const letterLabel = String.fromCharCode(65 + idx); // A, B, C, D

            return (
              <button
                key={opt.id}
                id={`quiz-option-${opt.id}`}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt)}
                className={`p-4 rounded-2xl sm:rounded-3xl border-3 text-left font-black text-base sm:text-lg transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyles}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF8F0] border-2 border-[#D7CCC8] flex items-center justify-center text-xs font-black text-[#6D4C41] shrink-0">
                    {letterLabel}
                  </div>
                  <div>
                    <span>{opt.text}</span>
                    {opt.visualEmoji && opt.visualCount && (
                      <div className="text-xl mt-0.5 tracking-tight">
                        {Array.from({ length: opt.visualCount }).map((_, i) => (
                          <span key={i}>{opt.visualEmoji}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {isAnswered && (
                  <div>
                    {opt.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-[#2E7D32] stroke-[2.5]" />
                    ) : isThisSelected ? (
                      <XCircle className="w-6 h-6 text-[#C62828] stroke-[2.5]" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Next Question button */}
        {isAnswered && (
          <div className="p-4 bg-[#FDFCF0] rounded-2xl border-2 border-[#E7E2D6] flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2.5 text-left">
              {selectedOption?.isCorrect ? (
                <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-[#FFF8E1] text-[#D97706] flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
              )}
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#4E342E]">
                  {selectedOption?.isCorrect ? '🎉 Jawabanmu Benar!' : '💡 Pembahasan:'}
                </h4>
                <p className="text-xs text-[#6D4C41] mt-0.5 font-semibold">
                  {question.explanation}
                </p>
              </div>
            </div>

            <button
              type="button"
              id="btn-quiz-next"
              onClick={handleNextQuestion}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] text-white rounded-2xl font-black text-xs sm:text-sm shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>{currentQuestionIndex === totalQuestions - 1 ? 'Lihat Nilai Akhir' : 'Soal Selanjutnya'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
