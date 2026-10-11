import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Clock, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, X, Crown, Calendar, Gift, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

export const SubscriptionExpiryModal: React.FC = () => {
  const {
    isExpiryModalOpen,
    closeExpiryModal,
    openSubscriptionModal,
    parentUser,
    activeChild,
    subscriptionPlans
  } = useApp();

  const [daysRemaining, setDaysRemaining] = useState<number>(7);

  useEffect(() => {
    if (parentUser?.activeSubscription?.expiresAt) {
      try {
        const expDate = new Date(parentUser.activeSubscription.expiresAt);
        const today = new Date();
        const diffTime = expDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysRemaining(diffDays > 0 ? diffDays : 0);
      } catch {
        setDaysRemaining(7);
      }
    }
  }, [parentUser]);

  if (!isExpiryModalOpen) return null;

  const currentPlan = parentUser.activeSubscription;

  const handleRenewNow = () => {
    sound.playFanfare();
    closeExpiryModal();
    openSubscriptionModal();
  };

  const handleRemindLater = () => {
    sound.playPop(420);
    closeExpiryModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2E1C18]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-fadeIn">
      {/* 80% Screen Size Container */}
      <div 
        id="subscription-expiry-modal-container"
        className="w-[92vw] md:w-[80vw] max-w-5xl h-[88vh] md:h-[80vh] max-h-[780px] bg-[#FAF8F0] rounded-3xl sm:rounded-[40px] border-4 border-[#FFB74D] shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-scaleIn text-[#4E342E]"
      >
        {/* Floating Close Button */}
        <button
          id="btn-close-expiry-modal"
          onClick={handleRemindLater}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#8D6E63] hover:text-[#4E342E] border-2 border-[#E7E2D6] flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer"
          title="Tutup Notifikasi"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT / TOP HERO SECTION (45% Width on Desktop) */}
        <div className="md:w-[45%] bg-gradient-to-b from-[#FFF8E1] via-[#FFE082] to-[#FFD54F] p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-[#FFB74D]/60 shrink-0">
          {/* Subtle playful background elements */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/30 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#D97706]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Top Tag & Status */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D97706] text-white rounded-full text-xs font-black tracking-wide uppercase shadow-sm">
              <Clock className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Pemberitahuan Masa Langganan</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-heading text-[#3E2723] mt-2.5 leading-tight tracking-tight">
              Masa Belajar Ananda Segera Berakhir!
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#5D4037] mt-1 leading-relaxed">
              Tersisa <span className="text-[#B45309] font-black underline">{daysRemaining} Hari Lagi</span> sebelum akses modul & fitur premium ditutup.
            </p>
          </div>

          {/* Center Illustration Banner with generated image & fallback */}
          <div className="relative z-10 my-3 sm:my-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-[280px] sm:max-w-[320px] rounded-3xl overflow-hidden shadow-lg border-3 border-white bg-white/80 relative group">
              <img
                src="sub_expiry_banner.png"
                alt="Pengingat Berlangganan Karia Ku"
                className="w-full h-36 sm:h-44 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback visual illustration if image loading is delayed
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-3 right-3 text-white flex items-center justify-between text-[11px] font-black">
                <span className="bg-[#D97706]/90 px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                  <Crown className="w-3 h-3 text-[#FFE082]" />
                  {currentPlan.planName}
                </span>
                <span className="bg-black/60 px-2 py-0.5 rounded-md">
                  Exp: {currentPlan.expiresAt}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Countdown Card */}
          <div className="relative z-10 bg-white/95 backdrop-blur-xs rounded-2xl p-3 sm:p-4 border-2 border-[#FFE082] shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#FFF8E1] border border-[#FFE082] flex items-center justify-center text-2xl font-black text-[#D97706]">
                ⏳
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#8D6E63]">Waktu Tersisa</div>
                <div className="text-sm sm:text-base font-black text-[#4E342E] font-heading">
                  {daysRemaining} Hari Kalender
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2] text-[11px] font-black rounded-lg">
              Segera Habis
            </span>
          </div>
        </div>

        {/* RIGHT / BOTTOM CONTENT SECTION (55% Width on Desktop) */}
        <div className="md:w-[55%] p-5 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#FAF8F0] space-y-4 sm:space-y-5">
          {/* Header Message */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#2E7D32]" />
                Pengingat Ramah untuk Ayah & Bunda
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-heading text-[#4E342E] tracking-tight">
              Jangan Biarkan Semangat Belajar {activeChild.name.split(' ')[0]} Terputus! 🌟
            </h3>
            <p className="text-xs sm:text-sm text-[#6D4C41] mt-1.5 font-medium leading-relaxed">
              Ananda telah mengumpulkan <strong>{activeChild.totalStars} Bintang ⭐</strong> dan menyelesaikan <strong>{activeChild.completedModules.length} Modul Pembelajaran</strong>. Perpanjang sekarang agar pencapaian dan kebiasaan belajar harian tetap berlanjut tanpa hambatan.
            </p>
          </div>

          {/* Benefits to Retain Checklist */}
          <div className="bg-[#F5F2E9] rounded-2xl p-4 border-2 border-[#E7E2D6] space-y-2.5">
            <h4 className="text-xs font-black uppercase text-[#8D6E63] tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#D97706]" />
              Fitur yang Tetap Aktif Bersama Ananda:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-[#4E342E]">
              <div className="flex items-center gap-2 bg-[#FAF8F0] p-2 rounded-xl border border-[#E7E2D6]">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>500+ Soal Bank Kuis Acak</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FAF8F0] p-2 rounded-xl border border-[#E7E2D6]">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>Narasi Suara Ceria AI Guru</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FAF8F0] p-2 rounded-xl border border-[#E7E2D6]">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>Cetak Lembar Latihan Mandiri</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FAF8F0] p-2 rounded-xl border border-[#E7E2D6]">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>Laporan & Analitik Belajar</span>
              </div>
            </div>
          </div>

          {/* Special Early Renewal Promo Box */}
          <div className="bg-gradient-to-r from-[#FFF8E1] to-[#FFE082] rounded-2xl p-3.5 sm:p-4 border-2 border-[#FFE082] flex items-center gap-3.5 shadow-2xs">
            <div className="w-11 h-11 rounded-2xl bg-[#D97706] text-white flex items-center justify-center text-xl shrink-0 shadow-2xs">
              🎁
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-[#4E342E]">Bonus Perpanjangan Lebih Awal:</span>
                <span className="text-[10px] font-black bg-[#D97706] text-white px-1.5 py-0.2 rounded-md">
                  Prioritas VIP
                </span>
              </div>
              <p className="text-[11px] text-[#5D4037] font-semibold mt-0.5">
                Perpanjang sebelum masa habis untuk mempertahankan akumulasi bintang dan bonus materi baru Kurikulum Merdeka!
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              id="btn-expiry-renew-now"
              type="button"
              onClick={handleRenewNow}
              className="flex-1 py-3.5 px-5 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white rounded-2xl font-black font-heading text-sm sm:text-base shadow-md transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer border-2 border-[#FFE082]"
            >
              <Crown className="w-4 h-4 text-[#FFE082]" />
              <span>Perpanjang Paket Sekarang</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              id="btn-expiry-remind-later"
              type="button"
              onClick={handleRemindLater}
              className="py-3.5 px-4 bg-[#FAF8F0] hover:bg-[#F5F2E9] border-2 border-[#D7CCC8] text-[#6D4C41] rounded-2xl font-bold text-xs sm:text-sm transition-all active:scale-98 cursor-pointer text-center"
            >
              Ingatkan Saya Nanti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
