import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, Sparkles, ShieldCheck, CreditCard, QrCode, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export const SubscriptionModal: React.FC = () => {
  const { isSubscriptionModalOpen, closeSubscriptionModal, parentUser, updateSubscription, subscriptionPlans } = useApp();

  const activePlans = subscriptionPlans.filter(p => p.isActive !== false && p.id !== 'free_trial');

  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    parentUser.activeSubscription.planId || activePlans[0]?.id || 'annual'
  );
  const [step, setStep] = useState<'select' | 'payment' | 'success'>('select');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'gopay' | 'bca' | 'credit_card'>('qris');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isSubscriptionModalOpen) return null;

  const currentSelectedPlan = subscriptionPlans.find(p => p.id === selectedPlanId) || activePlans[0] || subscriptionPlans[0];

  const handleProceedToPayment = () => {
    sound.playPop(520);
    setStep('payment');
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    sound.playPop(480);

    const methodLabels: Record<string, string> = {
      qris: 'QRIS Instant (GoPay/OVO/ShopeePay)',
      gopay: 'GoPay Direct',
      bca: 'BCA Virtual Account',
      credit_card: 'Kartu Kredit/Debit'
    };

    setTimeout(() => {
      setIsProcessing(false);
      updateSubscription(selectedPlanId, methodLabels[paymentMethod] || 'QRIS Instant');

      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      setStep('success');
    }, 1200);
  };

  const handleClose = () => {
    setStep('select');
    closeSubscriptionModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2E1C18]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF8F0] rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-xl border-4 border-[#E7E2D6] relative animate-scaleIn my-auto max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="btn-close-subscription-modal"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-[#8D6E63] hover:text-[#4E342E] rounded-full hover:bg-[#F5F2E9] transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {step === 'select' && (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <span className="px-3 py-1 bg-[#FFF8E1] text-[#5D4037] rounded-full text-xs font-black tracking-wide uppercase inline-block mb-2 border border-[#FFE082]">
                ⭐ Investasi Cerdas untuk Masa Depan Anak
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#4E342E]">
                Pilih Paket Langganan KARIA KU
              </h3>
              <p className="text-xs sm:text-sm text-[#6D4C41] max-w-lg mx-auto mt-1 font-semibold">
                Buka akses penuh modul interaktif Matematika, Calistung, Sains, dan Karakter dengan kurikulum terstruktur.
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {activePlans.map(plan => {
                const isSelected = selectedPlanId === plan.id;

                return (
                  <div
                    key={plan.id}
                    id={`plan-card-${plan.id}`}
                    onClick={() => {
                      sound.playPop(480);
                      setSelectedPlanId(plan.id);
                    }}
                    className={`relative p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#D97706] bg-[#FFF8E1] shadow-xs ring-2 ring-[#FFB74D] transform -translate-y-1'
                        : 'border-[#E7E2D6] bg-[#FDFCF0] hover:border-[#D7CCC8] hover:bg-[#FAF8F0]'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white text-[10px] font-black uppercase tracking-wider py-1 px-3 rounded-full shadow-xs">
                        ⭐ Paling Populer & Hemat
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-extrabold text-base text-[#4E342E]">
                          {plan.name}
                        </h4>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#D97706] bg-[#D97706] text-white' : 'border-[#D7CCC8]'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <p className="text-xs text-[#8D6E63] mb-3 font-semibold">{plan.subtitle}</p>

                      <div className="mb-4">
                        <div className="text-2xl sm:text-3xl font-black text-[#4E342E] font-heading">
                          {plan.priceFormatted}
                        </div>
                        <div className="text-[11px] font-bold text-[#B45309]">
                          {plan.periodText}
                        </div>
                        {plan.savingsText && (
                          <span className="inline-block mt-1 text-[10px] font-extrabold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                            {plan.savingsText}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 border-t border-[#E7E2D6] pt-3">
                        {plan.features.map((f, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-[#5D4037] font-medium">
                            <Check className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      id={`btn-select-plan-${plan.id}`}
                      className={`w-full mt-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                        isSelected
                          ? 'bg-[#D97706] hover:bg-[#B45309] text-white shadow-2xs'
                          : 'bg-[#F5F2E9] hover:bg-[#EBE7DC] text-[#4E342E]'
                      }`}
                    >
                      {isSelected ? 'Paket Terpilih ✓' : 'Pilih Paket'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Trial Note & CTA */}
            <div className="bg-[#FDFCF0] p-4 rounded-2xl border border-[#E7E2D6] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E8F5E9] text-[#2E7D32] rounded-xl flex items-center justify-center font-black shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-extrabold text-[#4E342E]">
                    Garansi Kepuasan & Batalkan Kapan Saja
                  </h5>
                  <p className="text-[11px] text-[#8D6E63] font-medium">
                    Tidak ada kontrak terikat. Profil anak dan bintang tersimpan selamanya.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  id="btn-testing-instant-subscribe"
                  onClick={() => {
                    sound.playSuccess();
                    updateSubscription(selectedPlanId);
                    try {
                      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
                    } catch {}
                    setStep('success');
                  }}
                  className="w-full sm:w-auto px-4 py-3 bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#2E7D32] border border-[#A5D6A7] rounded-2xl font-black text-xs transition-colors cursor-pointer text-center"
                >
                  ⚡ Mode Testing: Aktifkan Instan
                </button>

                <button
                  type="button"
                  id="btn-proceed-payment"
                  onClick={handleProceedToPayment}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] text-white rounded-2xl font-extrabold text-sm shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lanjut Bayar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div>
            {/* Payment header */}
            <div className="text-center mb-6">
              <span className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-black tracking-wide uppercase inline-block mb-1">
                Alur Pembayaran Aman (Simulasi MVP)
              </span>
              <h3 className="text-2xl font-black font-heading text-[#4E342E]">
                Pilih Metode Pembayaran
              </h3>
              <p className="text-xs text-[#8D6E63] mt-1 font-semibold">
                Ringkasan Paket: <strong className="text-[#4E342E]">{currentSelectedPlan.name}</strong> ({currentSelectedPlan.priceFormatted})
              </p>
            </div>

            {/* Methods */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: 'qris', name: 'QRIS (GoPay, OVO, ShopeePay, DANA)', icon: <QrCode className="w-5 h-5 text-[#7B1FA2]" /> },
                { id: 'gopay', name: 'E-Wallet Instant (GoPay / Shopee)', icon: <Sparkles className="w-5 h-5 text-[#00897B]" /> },
                { id: 'bca', name: 'Virtual Account (BCA / Mandiri / BRI)', icon: <Building2 className="w-5 h-5 text-[#1976D2]" /> },
                { id: 'credit_card', name: 'Kartu Kredit / Debit Visa / Master', icon: <CreditCard className="w-5 h-5 text-[#D97706]" /> },
              ].map(m => {
                const isMethodSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    id={`btn-paymethod-${m.id}`}
                    onClick={() => {
                      sound.playPop(460);
                      setPaymentMethod(m.id as any);
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                      isMethodSelected
                        ? 'border-[#D97706] bg-[#FFF8E1] shadow-2xs'
                        : 'border-[#E7E2D6] bg-[#FDFCF0] hover:bg-[#FAF8F0]'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-[#FAF8F0] border border-[#E7E2D6]">
                      {m.icon}
                    </div>
                    <div className="text-xs font-black text-[#4E342E]">
                      {m.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Total and confirm */}
            <div className="bg-[#FDFCF0] p-4 rounded-2xl border-2 border-[#E7E2D6] mb-6">
              <div className="flex justify-between items-center text-xs text-[#8D6E63] mb-1.5 font-medium">
                <span>Subtotal ({currentSelectedPlan.name})</span>
                <span className="font-bold text-[#4E342E]">{currentSelectedPlan.priceFormatted}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#2E7D32] font-bold mb-2">
                <span>Diskon Peluncuran Ceria</span>
                <span>Termasuk</span>
              </div>
              <div className="border-t border-[#E7E2D6] pt-2 flex justify-between items-center">
                <span className="font-black text-sm text-[#4E342E]">Total Pembayaran:</span>
                <span className="font-black text-xl text-[#D97706] font-heading">
                  {currentSelectedPlan.priceFormatted}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                id="btn-back-to-select"
                onClick={() => setStep('select')}
                className="px-4 py-3 bg-[#F5F2E9] hover:bg-[#EBE7DC] text-[#4E342E] rounded-xl text-xs font-bold transition-colors"
              >
                Kembali
              </button>

              <button
                type="button"
                id="btn-confirm-subscription-payment"
                disabled={isProcessing}
                onClick={handleCompletePayment}
                className="flex-1 py-3.5 bg-gradient-to-r from-[#2E7D32] to-[#388E3C] hover:from-[#1B5E20] text-white rounded-2xl font-extrabold text-sm shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Memproses Pembayaran...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Konfirmasi & Aktifkan Paket ({currentSelectedPlan.priceFormatted})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-[#E8F5E9] text-[#2E7D32] rounded-3xl flex items-center justify-center mx-auto mb-4 border-4 border-[#A5D6A7] text-4xl animate-bounce-short">
              🎉
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#4E342E] mb-1">
              Langganan Berhasil Diaktifkan!
            </h3>
            <p className="text-sm text-[#6D4C41] max-w-md mx-auto mb-6 font-semibold">
              Selamat! Akun Anda kini aktif dengan <strong className="text-[#2E7D32]">{currentSelectedPlan.name}</strong>. Semua modul belajar interaktif telah terbuka penuh untuk ananda!
            </p>

            <button
              type="button"
              id="btn-finish-subscription"
              onClick={handleClose}
              className="px-8 py-3.5 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] text-white rounded-2xl font-black text-sm shadow-xs active:scale-95 transition-all"
            >
              Mulai Belajar Sekarang 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
