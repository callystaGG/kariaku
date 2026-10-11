import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LEARNING_MODULES, SUBJECTS_LIST, GRADES_LIST } from '../data/modulesData';
import { getAvatarById } from '../data/avatars';
import { GradeId } from '../types';
import { Sparkles, Play, Award, CheckCircle2, Star, Clock, Trophy, ChevronRight, Lock, BookOpen, Crown, Check, Compass, Layers, PenTool, X } from 'lucide-react';
import { sound } from '../utils/audio';
import { isGradeAccessible, isModuleAccessible } from '../utils/subscriptionPermissions';
import { LetterTracingCanvas } from './LetterTracingCanvas';

export const ChildDashboard: React.FC = () => {
  const {
    activeChild,
    updateChild,
    setActiveModuleId,
    setActiveView,
    setCurrentMode,
    openBadgeModal,
    openBankSoalModal,
    openSubscriptionModal,
    openAuthModal,
    startPracticeQuiz,
    parentUser
  } = useApp();

  // User can freely switch and access any grade level
  const [selectedGrade, setSelectedGrade] = useState<GradeId>(activeChild.grade || 'sd-1');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('matematika');
  const [isTracingModalOpen, setIsTracingModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (activeChild.grade) {
      setSelectedGrade(activeChild.grade);
    }
  }, [activeChild.id, activeChild.grade]);

  const currentPlanId = parentUser.activeSubscription?.planId || 'free_trial';
  const currentPlanStatus = parentUser.activeSubscription?.status || 'trial';

  const avatar = getAvatarById(activeChild.avatarId);
  const activeSubject = SUBJECTS_LIST.find(s => s.id === selectedSubjectId) || SUBJECTS_LIST[0];
  const activeGradeObj = GRADES_LIST.find(g => g.id === selectedGrade) || GRADES_LIST[2];
  
  // Filter modules for this grade and subject
  const gradeModules = LEARNING_MODULES.filter(m => m.gradeId === selectedGrade);
  const subjectGradeModules = gradeModules.filter(m => m.subjectId === selectedSubjectId);
  const allModulesForSubject = LEARNING_MODULES.filter(m => m.subjectId === selectedSubjectId);
  const finalModules = subjectGradeModules.length > 0 ? subjectGradeModules : allModulesForSubject;

  const handleStartModule = (moduleId: string, isUnlocked: boolean) => {
    sound.playPop(520);
    setCurrentMode('child');
    setActiveModuleId(moduleId);
    setActiveView('module_learning');
  };

  const handleDirectQuiz = (moduleId: string, isUnlocked: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPop(540);
    setCurrentMode('child');
    setActiveModuleId(moduleId);
    setActiveView('quiz');
  };

  const handleSetDefaultGrade = () => {
    sound.playFanfare();
    updateChild(activeChild.id, {
      grade: selectedGrade,
      gradeLabel: activeGradeObj.label.split('(')[0].trim()
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6">
      {/* Friendly Child Banner - Natural Tones Warm Ochre & Amber */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#FFB74D] rounded-3xl sm:rounded-[36px] p-5 sm:p-8 text-[#3E2723] shadow-md border-4 border-[#FFE082]">
        {/* Playful subtle background decors */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FFD54F]/30 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            {/* Big Avatar */}
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-3xl bg-[#FAF8F0] p-1 shadow-sm shrink-0 flex items-center justify-center text-4xl sm:text-5xl border-3 border-[#FFE082] animate-float">
              {avatar.emoji}
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/30 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-xs mb-1 text-[#3E2723]">
                <span>{avatar.name}</span>
                <span>•</span>
                <span>{activeGradeObj.label.split('(')[0]}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-[#3E2723] drop-shadow-2xs">
                Halo, {activeChild.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-xs sm:text-sm font-extrabold text-[#5D4037] mt-1 max-w-md">
                Kamu bebas belajar di semua jenjang kelas! Ayo jelajahi petualangan {activeSubject.name}!
              </p>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex sm:flex-col gap-2.5 w-full sm:w-auto shrink-0">
            {/* Star count */}
            <div className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 bg-[#FAF8F0]/95 text-[#4E342E] px-4 py-2 rounded-2xl font-black text-sm sm:text-base shadow-2xs border border-[#FFE082]">
              <span className="text-xl">⭐</span>
              <div>
                <span className="text-lg font-black text-[#D97706] font-heading">{activeChild.totalStars}</span>
                <span className="text-[11px] text-[#8D6E63] ml-1 font-bold">Bintang</span>
              </div>
            </div>

            {/* Badges Count */}
            <button
              id="btn-banner-badge"
              onClick={openBadgeModal}
              className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 bg-[#4527A0] hover:bg-[#311B92] text-white px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm shadow-2xs transition-transform active:scale-95 border border-[#7E57C2] cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-[#FFD54F]" />
              <span>{activeChild.badgesEarned.length} Lencana Didapat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Grade Selector (Semua Jenjang Terbuka) */}
      <div className="bg-[#FAF8F0] rounded-3xl p-4 sm:p-5 border-2 border-[#E7E2D6] shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#FFF8E1] border border-[#FFE082] flex items-center justify-center text-lg shadow-2xs">
              🎓
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-black font-heading text-[#4E342E] flex items-center gap-2">
                <span>Pilih Jenjang Kelas Belajar</span>
                <span className="text-[10px] font-black text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full border border-[#C8E6C9]">
                  ✓ Semua Jenjang Terbuka
                </span>
              </h3>
              <p className="text-[11px] font-semibold text-[#8D6E63]">
                Klik jenjang kelas di bawah ini untuk berpindah dan mengakses seluruh materi & kuis
              </p>
            </div>
          </div>

          {activeChild.grade !== selectedGrade && (
            <button
              type="button"
              id="btn-set-default-grade"
              onClick={handleSetDefaultGrade}
              className="text-xs font-black text-[#D97706] hover:text-[#B45309] bg-[#FFF8E1] hover:bg-[#FFE082]/60 px-3 py-1.5 rounded-xl border border-[#FFE082] flex items-center gap-1.5 cursor-pointer self-start sm:self-auto transition-colors"
            >
              <Star className="w-3.5 h-3.5 fill-[#D97706]" />
              <span>Simpan ke Profil Anak</span>
            </button>
          )}
        </div>

        {/* Grade Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {GRADES_LIST.map(g => {
            const isSelected = selectedGrade === g.id;
            return (
              <button
                key={g.id}
                id={`btn-select-grade-${g.id}`}
                type="button"
                onClick={() => {
                  sound.playPop(500);
                  setSelectedGrade(g.id);
                }}
                className={`p-3 rounded-2xl border-2 text-left sm:text-center transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#D97706] bg-[#FFF8E1] shadow-xs ring-3 ring-[#D97706]/25 scale-102 font-black'
                    : 'border-[#E7E2D6] bg-white hover:bg-[#F5F2E9] text-[#6D4C41]'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#D97706] text-white flex items-center justify-center text-[10px] shadow-2xs">
                    ✓
                  </span>
                )}
                <div className="text-2xl mb-1 text-center">{g.icon}</div>
                <div>
                  <div className="text-xs font-black text-[#4E342E] leading-tight">
                    {g.label.split('(')[0]}
                  </div>
                  <div className="text-[10px] text-[#8D6E63] font-semibold mt-0.5">
                    {g.ageRange}
                  </div>
                  <div className="text-[9px] font-bold text-[#1565C0] mt-1 truncate">
                    {g.fase.split('(')[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Grade Detail Banner */}
        <div className="bg-[#FFF8E1]/80 rounded-2xl p-3 border border-[#FFE082] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-lg">{activeGradeObj.icon}</span>
            <div>
              <span className="font-extrabold text-[#4E342E]">
                Sedang Mempelajari: <span className="text-[#D97706]">{activeGradeObj.label}</span>
              </span>
              <p className="text-[11px] text-[#6D4C41] font-semibold mt-0.5">
                {activeGradeObj.kurikulumDesc}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-black text-[#1565C0] bg-white px-2.5 py-1 rounded-xl border border-[#90CAF9] shrink-0 self-start sm:self-auto">
            🇮🇩 {activeGradeObj.fase}
          </span>
        </div>
      </div>

      {/* ✍️ FEATURE HIGHLIGHT: STUDIO TRACING HURUF & ANGKA */}
      <div className="bg-gradient-to-r from-[#FFF8E1] via-[#FFFDE7] to-[#FFF3E0] rounded-3xl p-4 sm:p-5 border-3 border-[#FFD54F] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#FFCA28] flex items-center justify-center text-3xl shadow-2xs shrink-0 animate-bounce">
            ✍️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black font-heading text-[#4E342E]">
                Studio Tracing Huruf & Angka
              </h3>
              <span className="bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7] text-[10px] font-black px-2 py-0.5 rounded-full">
                Animasi & Panduan Suara
              </span>
            </div>
            <p className="text-xs text-[#795548] font-bold mt-0.5">
              Latihan menulis A-Z, angka 0-10, & pola garis dengan peragaan animasi pensil otomatis, titik awal nomor 1-2-3, serta tips memegang pensil!
            </p>
          </div>
        </div>

        <button
          type="button"
          id="btn-open-tracing-studio"
          onClick={() => {
            sound.playPop(520);
            setIsTracingModalOpen(true);
          }}
          className="w-full md:w-auto px-5 py-3 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white rounded-2xl font-black text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shrink-0"
        >
          <PenTool className="w-4 h-4" />
          <span>Buka Studio Tracing 🎨</span>
        </button>
      </div>

      {/* Subject Filter Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-black uppercase text-[#8D6E63] tracking-wider">
            Mata Pelajaran {activeGradeObj.label}:
          </span>
          <span className="text-xs text-[#8D6E63] font-bold">
            {SUBJECTS_LIST.length} Mata Pelajaran Tematik
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {SUBJECTS_LIST.map(subj => {
            const isSelected = selectedSubjectId === subj.id;
            return (
              <button
                key={subj.id}
                id={`btn-subject-${subj.id}`}
                onClick={() => {
                  sound.playPop(480);
                  setSelectedSubjectId(subj.id);
                }}
                className={`p-4 rounded-3xl border-3 text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#D97706] bg-[#FFF8E1] shadow-xs ring-4 ring-[#D97706]/20 scale-102'
                    : 'border-[#E7E2D6] bg-[#FAF8F0] hover:bg-[#F5F2E9]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F0] border-2 border-[#E7E2D6] flex items-center justify-center text-2xl shadow-2xs">
                    {subj.iconEmoji}
                  </div>
                  {isSelected && (
                    <span className="px-2 py-0.5 bg-[#D97706] text-white text-[10px] font-black rounded-full shadow-2xs">
                      Aktif
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <h3 className="font-black text-sm sm:text-base font-heading text-[#4E342E]">
                    {subj.name}
                  </h3>
                  <p className="text-xs text-[#8D6E63] line-clamp-2 mt-1 font-medium">
                    {subj.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modules Cards Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg sm:text-xl font-black font-heading text-[#4E342E]">
              Modul {activeSubject.name}
            </h2>
            <span className="bg-[#FFF8E1] text-[#B45309] border border-[#FFE082] text-xs font-black px-2.5 py-0.5 rounded-full">
              {activeGradeObj.label}
            </span>
            <span className="bg-[#E3F2FD] text-[#1565C0] border border-[#90CAF9] text-xs font-black px-2.5 py-0.5 rounded-full">
              🇮🇩 {activeGradeObj.fase}
            </span>
          </div>

          <div className="text-xs font-bold text-[#8D6E63]">
            {activeChild.completedModules.filter(id => finalModules.some(m => m.id === id)).length} dari {finalModules.length} Modul Selesai
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {finalModules.map((module, idx) => {
            const isCompleted = activeChild.completedModules.includes(module.id);
            const quizAttempt = activeChild.quizHistory[module.id];
            const isUnlocked = isModuleAccessible(module.id, selectedGrade, currentPlanId, currentPlanStatus);

            return (
              <div
                key={module.id}
                id={`module-card-${module.id}`}
                onClick={() => handleStartModule(module.id, isUnlocked)}
                className={`rounded-3xl sm:rounded-[32px] border-4 p-5 sm:p-6 transition-all cursor-pointer flex flex-col justify-between group relative shadow-xs hover:shadow-md transform hover:-translate-y-1.5 ${
                  isCompleted
                    ? 'border-[#81C784] bg-gradient-to-b from-[#E8F5E9] to-[#FAF8F0]'
                    : isUnlocked
                    ? 'border-[#E7E2D6] bg-[#FAF8F0] hover:border-[#D97706]'
                    : 'border-[#E7E2D6] bg-[#F5F2E9]/80 opacity-90 hover:border-[#D97706]'
                }`}
              >
                {/* Module Number & Status Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-2xl bg-[#D97706] text-white font-black text-xs flex items-center justify-center shadow-2xs">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-[#8D6E63] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {module.estimatedMinutes} menit
                    </span>
                  </div>

                  {isCompleted ? (
                    <span className="px-2.5 py-1 bg-[#2E7D32] text-white rounded-full text-xs font-black flex items-center gap-1 shadow-2xs animate-bounce-short">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                    </span>
                  ) : !isUnlocked ? (
                    <span className="px-2.5 py-1 bg-[#FFF8E1] border border-[#FFE082] text-[#B45309] rounded-full text-[11px] font-black flex items-center gap-1 shadow-2xs">
                      <Lock className="w-3 h-3 text-[#D97706]" /> Paket VIP
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-[#E8F5E9] border border-[#C8E6C9] text-[#2E7D32] rounded-full text-[11px] font-black flex items-center gap-1 shadow-2xs">
                      <Sparkles className="w-3 h-3 text-[#2E7D32]" /> Siap Belajar
                    </span>
                  )}
                </div>

                {/* Module Icon & Title */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black px-2 py-0.5 bg-[#E3F2FD] text-[#1565C0] border border-[#90CAF9] rounded-lg">
                      {module.kurikulumFase || activeGradeObj.fase}
                    </span>
                  </div>

                  <div className="w-16 h-16 rounded-3xl bg-[#FAF8F0] shadow-xs border-2 border-[#FFE082] flex items-center justify-center text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {module.coverEmoji}
                  </div>

                  <h3 className="font-black text-lg sm:text-xl font-heading text-[#4E342E] tracking-tight leading-snug mb-1">
                    {module.title}
                  </h3>

                  <p className="text-xs text-[#6D4C41] line-clamp-2 mb-2 leading-relaxed font-semibold">
                    {module.shortDesc}
                  </p>

                  {module.kurikulumFokus && (
                    <div className="text-[11px] font-bold text-[#8D6E63] bg-[#FDFCF0] p-2 rounded-xl border border-[#E7E2D6] mb-3 flex items-center gap-1.5">
                      <span className="text-xs">🎯</span>
                      <span className="truncate">{module.kurikulumFokus}</span>
                    </div>
                  )}
                </div>

                {/* Reward preview & Quiz score */}
                <div className="pt-3 border-t border-[#E7E2D6] space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#8D6E63]">Hadiah Modul:</span>
                    <span className="text-[#D97706] font-extrabold flex items-center gap-1">
                      +{module.starsReward} ⭐
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#8D6E63]">Lencana:</span>
                    <span className="text-[#5E35B1] font-extrabold flex items-center gap-1">
                      <span>{module.badgeReward.emoji}</span>
                      <span className="truncate max-w-[110px]">{module.badgeReward.name}</span>
                    </span>
                  </div>

                  {quizAttempt && (
                    <div className="flex items-center justify-between text-xs font-bold bg-[#FAF8F0] p-2 rounded-xl border border-[#E7E2D6]">
                      <span className="text-[#8D6E63]">Nilai Tertinggi:</span>
                      <span className="text-[#2E7D32] font-black font-heading">
                        {quizAttempt.highScore}/100 🎯
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    id={`btn-learn-module-${module.id}`}
                    onClick={() => handleStartModule(module.id, isUnlocked)}
                    className={`py-2.5 px-3 rounded-2xl font-black text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                      isUnlocked
                        ? 'bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white'
                        : 'bg-[#FFF8E1] hover:bg-[#FFE082] text-[#B45309] border border-[#FFE082]'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{isCompleted ? 'Pelajari Lagi' : 'Mulai Belajar'}</span>
                      </>
                    ) : (
                      <>
                        <Crown className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Buka VIP</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    id={`btn-quiz-module-${module.id}`}
                    onClick={(e) => handleDirectQuiz(module.id, isUnlocked, e)}
                    className="py-2.5 px-3 bg-[#FAF8F0] hover:bg-[#F5F2E9] border-2 border-[#D7CCC8] text-[#4E342E] rounded-2xl font-black text-xs flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Kuis ({module.quiz.length} Soal)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✍️ TRACING WORKSHOP STUDIO MODAL ✍️ */}
      {isTracingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-[#FAF8F0] rounded-3xl border-4 border-[#FFD54F] shadow-2xl max-w-2xl w-full p-4 sm:p-6 my-auto relative max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              id="btn-close-tracing-modal"
              onClick={() => {
                sound.playPop(420);
                setIsTracingModalOpen(false);
              }}
              className="absolute top-4 right-4 w-9 h-9 rounded-2xl bg-white border border-[#D7CCC8] hover:bg-[#FFE082] text-[#4E342E] flex items-center justify-center transition-all active:scale-90 shadow-2xs z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3 mb-4 pr-10">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8E1] border-2 border-[#FFD54F] flex items-center justify-center text-2xl shadow-2xs shrink-0">
                ✍️
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black font-heading text-[#4E342E]">
                  Studio Tracing & Menulis Mandiri
                </h2>
                <p className="text-xs text-[#795548] font-bold">
                  Pilih huruf, angka, atau pola garis, lalu ikuti animasi & panduan suara!
                </p>
              </div>
            </div>

            {/* Canvas Component */}
            <LetterTracingCanvas
              initialLetter="A"
              onComplete={() => {
                sound.playSuccess();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
