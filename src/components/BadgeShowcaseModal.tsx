import React from 'react';
import { useApp } from '../context/AppContext';
import { ALL_BADGES } from '../data/modulesData';
import { X, Award, Sparkles, CheckCircle, Lock } from 'lucide-react';
import { getAvatarById } from '../data/avatars';

export const BadgeShowcaseModal: React.FC = () => {
  const { isBadgeModalOpen, closeBadgeModal, activeChild } = useApp();

  if (!isBadgeModalOpen) return null;

  const avatar = getAvatarById(activeChild.avatarId);
  const earnedCount = activeChild.badgesEarned.length;
  const totalBadges = ALL_BADGES.length;

  return (
    <div className="fixed inset-0 z-50 bg-[#2E1C18]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F0] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-xl border-4 border-[#E7E2D6] relative animate-scaleIn max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="btn-close-badge-modal"
          onClick={closeBadgeModal}
          className="absolute top-4 right-4 p-2 text-[#8D6E63] hover:text-[#4E342E] rounded-full hover:bg-[#F5F2E9] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header with Child Avatar */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#FFF8E1] border-2 border-[#FFE082] text-[#4E342E] shadow-xs mb-2 relative">
            <span className="text-3xl">{avatar.emoji}</span>
            <div className="absolute -bottom-1 -right-1 bg-[#D97706] text-white text-xs font-black p-1 rounded-full border-2 border-[#FAF8F0]">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="text-2xl font-black font-heading text-[#4E342E]">
            Ruang Piala {activeChild.name}
          </h3>
          <p className="text-xs text-[#6D4C41] mt-1 font-semibold">
            Kamu telah mengumpulkan <span className="font-extrabold text-[#D97706]">{earnedCount}</span> dari <span className="font-bold text-[#4E342E]">{totalBadges}</span> Lencana Prestasi!
          </p>

          {/* Progress bar */}
          <div className="w-full bg-[#E7E2D6] rounded-full h-3 mt-3 overflow-hidden border border-[#D7CCC8]">
            <div
              className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(10, (earnedCount / totalBadges) * 100)}%` }}
            />
          </div>
        </div>

        {/* Badges List */}
        <div className="space-y-3">
          {ALL_BADGES.map(badge => {
            const isUnlocked = activeChild.badgesEarned.includes(badge.id);

            return (
              <div
                key={badge.id}
                id={`badge-item-${badge.id}`}
                className={`p-3.5 rounded-2xl border-2 flex items-center gap-3.5 transition-all ${
                  isUnlocked
                    ? 'bg-[#FFF8E1] border-[#FFE082] shadow-2xs'
                    : 'bg-[#F5F2E9] border-[#E7E2D6] opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    isUnlocked
                      ? 'bg-[#FFD54F] text-[#4E342E] shadow-2xs border-2 border-[#FFE082] animate-bounce-short'
                      : 'bg-[#E7E2D6] text-[#A1887F]'
                  }`}
                >
                  {isUnlocked ? badge.emoji : <Lock className="w-5 h-5 text-[#A1887F]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-black text-[#4E342E] truncate">
                      {badge.name}
                    </h4>
                    {isUnlocked && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E8F5E9] text-[#2E7D32]">
                        <CheckCircle className="w-3 h-3" />
                        Didapat
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6D4C41] mt-0.5 font-medium">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-[#E7E2D6] text-center">
          <p className="text-xs font-semibold text-[#8D6E63] flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            Selesaikan modul dan kuis dengan nilai tinggi untuk membuka semua lencana!
          </p>
        </div>
      </div>
    </div>
  );
};
