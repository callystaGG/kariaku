import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, X, Check, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

export const ParentalGateModal: React.FC = () => {
  const { isParentalGateOpen, closeParentalGate, verifyParentalGateSuccess } = useApp();

  const [numA, setNumA] = useState<number>(7);
  const [numB, setNumB] = useState<number>(8);
  const [operator, setOperator] = useState<'+' | '×'>('×');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const generateChallenge = () => {
    // Generate multiplication or addition for adults
    const isMultiply = Math.random() > 0.4;
    if (isMultiply) {
      const a = Math.floor(Math.random() * 6) + 4; // 4 to 9
      const b = Math.floor(Math.random() * 6) + 4; // 4 to 9
      setNumA(a);
      setNumB(b);
      setOperator('×');
    } else {
      const a = Math.floor(Math.random() * 30) + 15;
      const b = Math.floor(Math.random() * 30) + 15;
      setNumA(a);
      setNumB(b);
      setOperator('+');
    }
    setUserAnswer('');
    setErrorMsg('');
  };

  useEffect(() => {
    if (isParentalGateOpen) {
      generateChallenge();
    }
  }, [isParentalGateOpen]);

  if (!isParentalGateOpen) return null;

  const correctAnswer = operator === '+' ? numA + numB : numA * numB;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(userAnswer.trim(), 10);
    if (parsed === correctAnswer) {
      verifyParentalGateSuccess();
    } else {
      sound.playError();
      setErrorMsg('Jawaban belum tepat, silakan coba lagi.');
      setUserAnswer('');
    }
  };

  const handleKeypadPress = (val: string) => {
    sound.playPop(480);
    if (val === 'backspace') {
      setUserAnswer(prev => prev.slice(0, -1));
    } else if (val === 'clear') {
      setUserAnswer('');
    } else {
      if (userAnswer.length < 5) {
        setUserAnswer(prev => prev + val);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2E1C18]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F0] rounded-3xl max-w-md w-full p-6 shadow-xl border-4 border-[#E7E2D6] relative animate-scaleIn">
        {/* Close button */}
        <button
          id="btn-close-parental-gate"
          onClick={closeParentalGate}
          className="absolute top-4 right-4 p-2 text-[#8D6E63] hover:text-[#4E342E] rounded-full hover:bg-[#F5F2E9] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-[#FFF8E1] text-[#D97706] rounded-2xl flex items-center justify-center mx-auto mb-3 border-2 border-[#FFE082]">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black font-heading text-[#4E342E]">
            Kunci Pengaman Orang Tua
          </h3>
          <p className="text-sm text-[#6D4C41] mt-1 font-semibold">
            Khusus orang tua/wali untuk mengakses laporan, profil anak, dan langganan.
          </p>
        </div>

        {/* Challenge Box */}
        <div className="bg-[#FDFCF0] p-4 rounded-2xl border-2 border-[#E7E2D6] text-center mb-5">
          <p className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider mb-1">
            {operator === '+' ? 'Hitung hasil penjumlahan berikut:' : 'Hitung hasil perkalian berikut:'}
          </p>
          <div className="text-3xl font-black text-[#4E342E] flex items-center justify-center gap-2 my-2 font-mono">
            <span>{numA}</span>
            <span className="text-[#D97706]">{operator}</span>
            <span>{numB}</span>
            <span className="text-[#A1887F]">=</span>
            <span className="bg-[#FAF8F0] px-3 py-1 rounded-xl border-2 border-[#FFE082] min-w-[70px] inline-block text-[#D97706]">
              {userAnswer || '?'}
            </span>
          </div>
          <button
            type="button"
            onClick={generateChallenge}
            className="text-xs text-[#D97706] hover:text-[#B45309] font-bold inline-flex items-center gap-1 mt-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Ganti Soal
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-2.5 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-xs font-bold rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        {/* Simple On-screen Keypad for tablets/mobile */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
            <button
              key={k}
              type="button"
              id={`keypad-${k}`}
              onClick={() => {
                if (k === 'C') handleKeypadPress('clear');
                else if (k === '⌫') handleKeypadPress('backspace');
                else handleKeypadPress(k);
              }}
              className="py-3 bg-[#F5F2E9] hover:bg-[#EBE7DC] active:bg-[#D7CCC8] font-black text-lg text-[#4E342E] rounded-xl transition-all shadow-2xs"
            >
              {k}
            </button>
          ))}
        </div>

        {/* Form Action */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <button
            type="submit"
            id="btn-submit-parental-gate"
            disabled={!userAnswer}
            className={`w-full py-3.5 rounded-2xl font-extrabold text-base flex items-center justify-center gap-2 shadow-sm transition-all ${
              userAnswer
                ? 'bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] text-white active:scale-98 cursor-pointer'
                : 'bg-[#E7E2D6] text-[#A1887F] cursor-not-allowed'
            }`}
          >
            <Check className="w-5 h-5" />
            Masuk ke Area Orang Tua
          </button>
          
          {/* Quick Testing Bypass Button */}
          <button
            type="button"
            id="btn-testing-bypass-parental-gate"
            onClick={() => {
              sound.playSuccess();
              verifyParentalGateSuccess();
            }}
            className="w-full py-2.5 bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#2E7D32] border border-[#A5D6A7] rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>🔓 Mode Testing: Buka Langsung (Tanpa Hitung)</span>
          </button>
        </form>
      </div>
    </div>
  );
};
