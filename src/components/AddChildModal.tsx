import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AVATARS } from '../data/avatars';
import { GRADES_LIST } from '../data/modulesData';
import { GradeId } from '../types';
import { X, Sparkles, UserPlus, Crown, AlertCircle } from 'lucide-react';
import { sound } from '../utils/audio';
import { getMaxChildrenForPlan } from '../utils/subscriptionPermissions';

export const AddChildModal: React.FC = () => {
  const {
    isAddChildModalOpen,
    closeAddChildModal,
    addChild,
    parentUser,
    subscriptionPlans,
    openSubscriptionModal
  } = useApp();

  const [name, setName] = useState('');
  const [grade, setGrade] = useState<GradeId>('sd-1');
  const [age, setAge] = useState<number>(7);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>('leo');
  const [error, setError] = useState('');

  if (!isAddChildModalOpen) return null;

  const currentChildrenCount = parentUser.children?.length || 0;
  const maxAllowed = getMaxChildrenForPlan(parentUser.activeSubscription?.planId || 'free_trial', subscriptionPlans);
  const isLimitReached = currentChildrenCount >= maxAllowed;

  const handleAvatarSelect = (id: string) => {
    sound.playPop(520);
    setSelectedAvatarId(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLimitReached) {
      setError(`Batas profil anak untuk paket ${parentUser.activeSubscription.planName} (${maxAllowed} anak) telah tercapai.`);
      return;
    }
    if (!name.trim()) {
      setError('Harap masukkan nama panggilan anak.');
      return;
    }
    addChild({
      name: name.trim(),
      grade,
      age,
      avatarId: selectedAvatarId
    });
    setName('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2E1C18]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F0] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-xl border-4 border-[#E7E2D6] relative animate-scaleIn max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="btn-close-add-child-modal"
          onClick={closeAddChildModal}
          className="absolute top-4 right-4 p-2 text-[#8D6E63] hover:text-[#4E342E] rounded-full hover:bg-[#F5F2E9] transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#FFF8E1] text-[#D97706] rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl border-2 border-[#FFE082]">
            👶
          </div>
          <h3 className="text-2xl font-black font-heading text-[#4E342E]">
            Tambah Profil Anak
          </h3>
          <p className="text-xs text-[#6D4C41] mt-0.5 font-semibold">
            Kuota Paket Aktif: <strong className="text-[#4E342E]">{currentChildrenCount} dari {maxAllowed} Profil Anak</strong>
          </p>
        </div>

        {/* Limit Warning Banner if Reached */}
        {isLimitReached && (
          <div className="mb-5 p-4 bg-[#FFF8E1] border-2 border-[#FFE082] rounded-2xl text-xs space-y-2">
            <div className="flex items-center gap-2 font-black text-[#B45309]">
              <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>Batas Kuota Profil Anak Tercapai</span>
            </div>
            <p className="text-[#5D4037] font-medium leading-relaxed">
              Paket Anda saat ini ({parentUser.activeSubscription.planName}) mencakup maksimal <strong>{maxAllowed} profil anak</strong>. Tingkatkan ke <strong>Paket Juara Tahunan</strong> untuk menambahkan hingga 4 anak sekaligus!
            </p>
            <button
              type="button"
              onClick={() => {
                sound.playPop(480);
                closeAddChildModal();
                openSubscriptionModal();
              }}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] text-white rounded-xl font-black flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Crown className="w-4 h-4" />
              <span>Upgrade Paket Langganan</span>
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 p-2.5 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-xs font-bold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Child Name */}
          <div>
            <label className="block text-xs font-black uppercase text-[#8D6E63] tracking-wider mb-1.5">
              Nama Panggilan Anak:
            </label>
            <input
              id="input-child-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Contoh: Budi, Sarah, Rayyan..."
              disabled={isLimitReached}
              className="w-full px-4 py-3 bg-white border-2 border-[#E7E2D6] focus:border-[#D97706] rounded-2xl text-sm font-bold text-[#4E342E] outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Child Grade Selection */}
          <div>
            <label className="block text-xs font-black uppercase text-[#8D6E63] tracking-wider mb-1.5">
              Jenjang / Tingkat Kelas (Semua Jenjang Terbuka):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {GRADES_LIST.map(g => {
                const isSelected = grade === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    disabled={isLimitReached}
                    onClick={() => {
                      sound.playPop(480);
                      setGrade(g.id);
                    }}
                    className={`p-2.5 rounded-2xl border-2 text-left sm:text-center transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                      isSelected
                        ? 'border-[#D97706] bg-[#FFF8E1] text-[#4E342E] font-black shadow-2xs ring-2 ring-[#D97706]/30'
                        : 'border-[#E7E2D6] bg-white hover:bg-[#FAF8F0] text-[#6D4C41]'
                    }`}
                  >
                    <div className="text-xl mb-1">{g.icon}</div>
                    <div className="text-xs font-extrabold truncate">{g.label.split('(')[0]}</div>
                    <div className="text-[10px] text-[#8D6E63]">{g.ageRange}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Age Selection */}
          <div>
            <label className="block text-xs font-black uppercase text-[#8D6E63] tracking-wider mb-1.5">
              Usia Anak:
            </label>
            <div className="flex items-center gap-3">
              <input
                id="input-child-age"
                type="range"
                min={2}
                max={12}
                value={age}
                disabled={isLimitReached}
                onChange={e => setAge(parseInt(e.target.value))}
                className="w-full accent-[#D97706] disabled:opacity-60"
              />
              <span className="w-14 px-2 py-1.5 bg-[#FFF8E1] border border-[#FFE082] text-[#D97706] font-black text-center rounded-xl text-xs shrink-0">
                {age} Thn
              </span>
            </div>
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-black uppercase text-[#8D6E63] tracking-wider mb-1.5">
              Pilih Karakter Avatar Sahabat:
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {AVATARS.map(av => {
                const isSelected = selectedAvatarId === av.id;
                return (
                  <button
                    key={av.id}
                    type="button"
                    disabled={isLimitReached}
                    onClick={() => handleAvatarSelect(av.id)}
                    className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                      isSelected
                        ? 'border-[#D97706] bg-[#FFF8E1] scale-105 shadow-xs ring-2 ring-[#D97706]/30'
                        : 'border-[#E7E2D6] bg-white hover:bg-[#FAF8F0]'
                    }`}
                  >
                    <div className="text-2xl mb-1">{av.emoji}</div>
                    <div className="text-[11px] font-black text-[#4E342E] truncate">{av.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              id="btn-submit-add-child"
              type="submit"
              disabled={isLimitReached}
              className="w-full py-3.5 px-4 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl font-black text-sm shadow-xs transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <UserPlus className="w-4 h-4" />
              <span>Simpan Profil Anak</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
