import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GRADES_LIST, SUBJECTS_LIST } from '../data/modulesData';
import { GradeId } from '../types';
import { Sparkles, X, Shuffle, Award, CheckCircle2, Zap, BookOpen, Brain, Layers, Lock, Crown } from 'lucide-react';
import { sound } from '../utils/audio';
import { getBankSoalStatistics } from '../utils/dynamicCurriculumEngine';
import { isGradeAccessible } from '../utils/subscriptionPermissions';

export const BankSoalModal: React.FC = () => {
  const {
    isBankSoalModalOpen,
    closeBankSoalModal,
    startPracticeQuiz,
    openSubscriptionModal,
    activeChild,
    parentUser
  } = useApp();

  const currentPlanId = parentUser.activeSubscription?.planId || 'free_trial';
  // Allow user to pick any grade level freely
  const [selectedGrade, setSelectedGrade] = useState<GradeId>(activeChild.grade || 'sd-1');
  const [selectedSubject, setSelectedSubject] = useState<string>('matematika');
  const [questionCount, setQuestionCount] = useState<number>(5);

  if (!isBankSoalModalOpen) return null;

  const stats = getBankSoalStatistics();
  const currentGradeObj = GRADES_LIST.find(g => g.id === selectedGrade) || GRADES_LIST[2];
  const isSelectedGradeOpen = isGradeAccessible(selectedGrade, currentPlanId);

  const handleStart = () => {
    sound.playFanfare();
    startPracticeQuiz(selectedGrade, selectedSubject, questionCount);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#FAF8F0] rounded-3xl sm:rounded-[36px] border-4 border-[#FFE082] shadow-2xl max-w-xl w-full p-5 sm:p-7 relative overflow-hidden my-auto text-[#4E342E]">
        {/* Playful Top Background Gradient */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#FFB74D] opacity-20 pointer-events-none" />

        {/* Close Button */}
        <button
          id="btn-close-banksoal-modal"
          onClick={() => {
            sound.playPop(400);
            closeBankSoalModal();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-2xl bg-white border-2 border-[#E7E2D6] text-[#8D6E63] hover:text-[#4E342E] hover:bg-[#FFF8E1] flex items-center justify-center transition-colors shadow-2xs z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D97706] to-[#F59E0B] text-white flex items-center justify-center text-3xl shadow-sm border-2 border-white shrink-0 animate-bounce-short">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#2E7D32]" />
                {stats.totalAvailableText}
              </span>
              <span className="text-[10px] font-black text-[#1565C0] bg-[#E3F2FD] border border-[#90CAF9] px-2 py-0.5 rounded-full">
                Semua Jenjang Terbuka
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-heading text-[#4E342E] leading-tight">
              Bank Soal & Kuis Acak
            </h2>
            <p className="text-xs text-[#6D4C41] font-semibold mt-0.5">
              Pilih jenjang kelas & mata pelajaran untuk latihan interaktif dengan ratusan variasi soal!
            </p>
          </div>
        </div>

        {/* Section 1: Pilih Jenjang Belajar */}
        <div className="space-y-4 mb-5">
          <div>
            <label className="text-xs font-black uppercase text-[#8D6E63] tracking-wider flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#D97706]" />
                1. Pilih Tingkat / Jenjang Kelas:
              </span>
              <span className="text-[10px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full border border-[#C8E6C9]">
                Bebas Diakses
              </span>
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {GRADES_LIST.map(g => {
                const isSelected = selectedGrade === g.id;
                return (
                  <button
                    key={g.id}
                    id={`btn-banksoal-grade-${g.id}`}
                    type="button"
                    onClick={() => {
                      sound.playPop(480);
                      setSelectedGrade(g.id);
                    }}
                    className={`p-2 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#D97706] bg-[#FFF8E1] shadow-2xs ring-2 ring-[#D97706]/30 font-black'
                        : 'border-[#E7E2D6] bg-[#FDFCF0] hover:bg-[#FFF8E1] text-[#6D4C41]'
                    }`}
                  >
                    <div className="text-lg">{g.icon}</div>
                    <div className="text-[11px] font-extrabold truncate">{g.label.split('(')[0]}</div>
                    <div className="text-[9px] text-[#8D6E63]">{g.ageRange}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Pilih Mata Pelajaran */}
          <div>
            <label className="text-xs font-black uppercase text-[#8D6E63] tracking-wider flex items-center gap-1.5 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
              2. Pilih Mata Pelajaran:
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SUBJECTS_LIST.map(s => {
                const isSelected = selectedSubject === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      sound.playPop(500);
                      setSelectedSubject(s.id);
                    }}
                    className={`p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#D97706] bg-[#FFF8E1] shadow-2xs ring-2 ring-[#D97706]/30'
                        : 'border-[#E7E2D6] bg-[#FDFCF0] hover:bg-[#FFF8E1]'
                    }`}
                  >
                    <div className="text-2xl mb-1">{s.iconEmoji}</div>
                    <div className="text-xs font-black text-[#4E342E] line-clamp-1">{s.name}</div>
                    <div className="text-[10px] font-bold text-[#8D6E63] mt-0.5">Soal Diacak 🎲</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Pilih Jumlah Soal */}
          <div>
            <label className="text-xs font-black uppercase text-[#8D6E63] tracking-wider flex items-center gap-1.5 mb-2">
              <Brain className="w-3.5 h-3.5 text-[#D97706]" />
              3. Jumlah Soal Latihan:
            </label>

            <div className="grid grid-cols-3 gap-2">
              {[
                { count: 5, label: '5 Soal Kilat', reward: '20 ⭐', badge: 'Pemanasan' },
                { count: 10, label: '10 Soal Standar', reward: '40 ⭐', badge: 'Paling Populer', popular: true },
                { count: 15, label: '15 Soal Juara', reward: '60 ⭐', badge: 'Tantangan Master' }
              ].map(opt => {
                const isSelected = questionCount === opt.count;
                return (
                  <button
                    key={opt.count}
                    type="button"
                    onClick={() => {
                      sound.playPop(520);
                      setQuestionCount(opt.count);
                    }}
                    className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#2E7D32] bg-[#E8F5E9] shadow-xs ring-2 ring-[#81C784]/40 font-black'
                        : 'border-[#E7E2D6] bg-[#FDFCF0] hover:bg-[#FFF8E1]'
                    }`}
                  >
                    {opt.popular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#D97706] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider shadow-2xs">
                        Favorit
                      </span>
                    )}
                    <div className="text-xs font-black text-[#2E7D32]">{opt.label}</div>
                    <div className="text-[10px] font-bold text-[#D97706] mt-0.5">Hadiah: {opt.reward}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Feature Highlight Pill */}
        <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-2xl p-3 mb-5 flex items-center gap-2.5 text-xs text-[#5D4037]">
          <Shuffle className="w-4 h-4 text-[#D97706] shrink-0" />
          <div className="font-semibold">
            {isSelectedGradeOpen ? (
              <span>Susunan soal dan pilihan jawaban <strong>diacak secara cerdas</strong> dengan tingkat kesulitan adaptif!</span>
            ) : (
              <span className="text-[#B45309]">Jenjang kelas ini memerlukan upgrade ke <strong>Paket Berlangganan</strong> untuk membuka akses latihan kuis.</span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          id="btn-start-random-quiz"
          onClick={handleStart}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white font-black font-heading text-base sm:text-lg shadow-sm hover:shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer border-2 border-[#FFE082]"
        >
          {isSelectedGradeOpen ? (
            <>
              <Zap className="w-5 h-5 text-[#FFE082] fill-[#FFE082]" />
              <span>Mulai Kuis Acak Sekarang!</span>
            </>
          ) : (
            <>
              <Crown className="w-5 h-5 text-[#FFE082]" />
              <span>Buka Akses Berlangganan</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
