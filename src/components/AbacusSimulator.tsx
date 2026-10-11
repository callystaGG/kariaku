import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, Sparkles, CheckCircle2, HelpCircle, Info, Calculator, Zap } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface AbacusSimulatorProps {
  rodsCount?: number;
  initialRods?: number[]; // [thousands, hundreds, tens, units]
  targetNumber?: number;
  showFormula?: string;
  formulaTitle?: string;
  operationType?: string;
  onComplete?: () => void;
}

const ROD_LABELS_4 = ['Ribuan (1.000)', 'Ratusan (100)', 'Puluhan (10)', 'Satuan (1)'];
const ROD_MULTIPLIERS_4 = [1000, 100, 10, 1];

export const AbacusSimulator: React.FC<AbacusSimulatorProps> = ({
  rodsCount = 4,
  initialRods,
  targetNumber,
  showFormula,
  formulaTitle,
  operationType = 'explore',
  onComplete
}) => {
  // Each rod state: { upperActive: boolean (5), lowerCount: number (0-4) }
  const [rods, setRods] = useState<Array<{ upperActive: boolean; lowerCount: number }>>(() => {
    if (initialRods && initialRods.length === rodsCount) {
      return initialRods.map(val => ({
        upperActive: val >= 5,
        lowerCount: val % 5
      }));
    }
    return Array.from({ length: rodsCount }, () => ({ upperActive: false, lowerCount: 0 }));
  });

  const [hasCompletedTarget, setHasCompletedTarget] = useState<boolean>(false);

  // Compute total value
  const multipliers = rodsCount === 4 ? ROD_MULTIPLIERS_4 : [100, 10, 1];
  const rodLabels = rodsCount === 4 ? ROD_LABELS_4 : ['Ratusan (100)', 'Puluhan (10)', 'Satuan (1)'];

  const getRodValue = (rod: { upperActive: boolean; lowerCount: number }) => {
    return (rod.upperActive ? 5 : 0) + rod.lowerCount;
  };

  const totalValue = rods.reduce((acc, rod, idx) => {
    const mult = multipliers[idx] || 1;
    return acc + getRodValue(rod) * mult;
  }, 0);

  // Check target match
  useEffect(() => {
    if (targetNumber !== undefined && totalValue === targetNumber && !hasCompletedTarget) {
      setHasCompletedTarget(true);
      sound.playTada();
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 }
      });
      if (onComplete) {
        onComplete();
      }
    }
  }, [totalValue, targetNumber, hasCompletedTarget, onComplete]);

  // Toggle Upper Bead (5)
  const handleToggleUpper = (rodIdx: number) => {
    setRods(prev => {
      const next = [...prev];
      const isNowActive = !next[rodIdx].upperActive;
      next[rodIdx] = {
        ...next[rodIdx],
        upperActive: isNowActive
      };
      sound.playAbacusClick(true);
      return next;
    });
  };

  // Click Lower Beads (0 to 4)
  const handleLowerBeadClick = (rodIdx: number, beadIndex: number) => {
    // beadIndex: 0 = top of lower deck (1st bead), 3 = bottom of lower deck (4th bead)
    // If clicking on or below current active count, set active to beadIndex + 1
    // If clicking on active bead directly, decrement or reset
    setRods(prev => {
      const next = [...prev];
      const currentCount = next[rodIdx].lowerCount;
      const clickedTargetCount = beadIndex + 1;

      let newCount = clickedTargetCount;
      if (currentCount === clickedTargetCount) {
        // Toggle down by 1
        newCount = clickedTargetCount - 1;
      }

      next[rodIdx] = {
        ...next[rodIdx],
        lowerCount: newCount
      };
      sound.playAbacusClick(false);
      return next;
    });
  };

  const handleReset = () => {
    sound.playPop(380);
    setRods(Array.from({ length: rodsCount }, () => ({ upperActive: false, lowerCount: 0 })));
    setHasCompletedTarget(false);
  };

  const handleSpeakValue = () => {
    sound.speakIndonesian(`Nilai sempoa saat ini adalah ${totalValue}`);
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Header Bar & Target Challenge */}
      <div className="w-full max-w-xl flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF8E1] border-2 border-[#FFE082] flex items-center justify-center text-2xl shadow-2xs">
            🧮
          </div>
          <div>
            <div className="text-xs font-black text-[#4E342E] flex items-center gap-1.5">
              <span>Sempoa Soroban Interaktif</span>
              <span className="text-[10px] bg-[#E3F2FD] text-[#1565C0] border border-[#90CAF9] px-2 py-0.5 rounded-full font-extrabold">
                {rodsCount} Tiang
              </span>
            </div>
            <div className="text-[11px] text-[#8D6E63] font-bold">
              Manik Atas = 5 • Manik Bawah = 1
            </div>
          </div>
        </div>

        {/* Speak & Reset Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSpeakValue}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#E3F2FD] hover:bg-[#BBDEFB] text-[#1565C0] rounded-xl text-xs font-black border border-[#90CAF9] shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Bunyikan Angka</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#FAF8F0] hover:bg-[#F5F2E9] border border-[#D7CCC8] text-[#5D4037] rounded-xl text-xs font-black shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nol-kan</span>
          </button>
        </div>
      </div>

      {/* Target Banner if specified */}
      {targetNumber !== undefined && (
        <div className="w-full max-w-xl mb-3 p-3 bg-[#FFF8E1] border-2 border-[#FFE082] rounded-2xl flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <div>
              <div className="text-xs font-black text-[#8D6E63] uppercase">Tantangan Sempoa:</div>
              <div className="text-sm font-black text-[#D97706]">
                Bentuk angka <strong className="text-base sm:text-lg underline">{targetNumber}</strong> pada sempoa!
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {totalValue === targetNumber ? (
              <span className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] border border-[#81C784] rounded-xl text-xs font-black flex items-center gap-1 animate-bounce">
                <CheckCircle2 className="w-4 h-4" /> Tepat Sekali! ⭐
              </span>
            ) : (
              <span className="px-3 py-1 bg-white/80 text-[#B45309] border border-[#FFE082] rounded-xl text-xs font-black">
                Saat ini: {totalValue}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main Physical Abacus Frame */}
      <div className="relative bg-gradient-to-b from-[#5D4037] via-[#4E342E] to-[#3E2723] p-4 sm:p-6 rounded-3xl sm:rounded-[36px] border-4 sm:border-6 border-[#3E2723] shadow-2xl max-w-xl w-full text-white">
        {/* Top Outer Wood Trim */}
        <div className="flex items-center justify-between mb-3 px-2 border-b border-[#8D6E63]/40 pb-2">
          <div className="text-[11px] font-black text-[#D7CCC8] uppercase tracking-widest flex items-center gap-1.5">
            <span>🧮 SOROBAN ARITMATIKA</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#FFCC80] font-black uppercase mr-2">Total Nilai:</span>
            <span className="text-2xl sm:text-3xl font-black font-heading text-[#FFD54F] bg-black/40 px-3 py-0.5 rounded-xl border border-[#FFE082]/30 shadow-inner">
              {totalValue}
            </span>
          </div>
        </div>

        {/* Abacus Interior Box */}
        <div className="bg-[#FAF8F0] rounded-2xl sm:rounded-3xl p-3 sm:p-4 text-[#4E342E] shadow-inner relative overflow-hidden">
          {/* Rods Columns Container */}
          <div className={`grid grid-cols-${rodsCount} gap-2 sm:gap-4 items-center`}>
            {rods.map((rod, rodIdx) => {
              const rodVal = getRodValue(rod);
              const isUnitRod = rodIdx === rodsCount - 1; // Satuan is rightmost
              return (
                <div key={rodIdx} className="flex flex-col items-center relative">
                  {/* Rod Label Header */}
                  <div className="text-[10px] sm:text-xs font-black text-[#8D6E63] text-center mb-1 truncate w-full">
                    {rodLabels[rodIdx]}
                  </div>

                  {/* Vertical Steel Rod Line */}
                  <div className="relative w-16 sm:w-20 bg-[#F5F2E9] rounded-2xl border-2 border-[#D7CCC8] p-2 flex flex-col items-center shadow-xs">
                    {/* Metal Rod wire behind beads */}
                    <div className="absolute top-2 bottom-2 w-1.5 bg-gradient-to-r from-[#BDBDBD] via-[#E0E0E0] to-[#9E9E9E] rounded-full shadow-inner pointer-events-none" />

                    {/* UPPER DECK (Manik Atas = 5) */}
                    <div className="h-16 w-full flex flex-col items-center justify-start relative z-10">
                      <button
                        type="button"
                        onClick={() => handleToggleUpper(rodIdx)}
                        className={`w-12 sm:w-14 h-8 sm:h-9 rounded-full transition-all transform active:scale-95 shadow-md flex items-center justify-center font-black text-xs cursor-pointer border-2 ${
                          rod.upperActive
                            ? 'translate-y-6 bg-gradient-to-r from-[#D97706] to-[#F59E0B] border-[#B45309] text-white shadow-amber-900/30 ring-2 ring-[#FFD54F]'
                            : 'translate-y-0 bg-gradient-to-r from-[#FFCC80] to-[#FFE082] border-[#D7CCC8] text-[#5D4037] hover:brightness-105'
                        }`}
                        title={`Manik Atas Nilai 5 (${rod.upperActive ? 'Aktif' : 'Diam'})`}
                      >
                        <span>5</span>
                      </button>
                    </div>

                    {/* CENTER BEAM (Palang Pembatas Kayu) */}
                    <div className="w-full h-3 sm:h-3.5 bg-gradient-to-r from-[#4E342E] via-[#5D4037] to-[#3E2723] rounded-md my-1 relative z-20 flex items-center justify-center shadow-xs border-y border-[#3E2723]">
                      {/* Unit Dot Marker on Satuan rod */}
                      {isUnitRod && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FAF8F0] shadow-xs" title="Titik Satuan" />
                      )}
                    </div>

                    {/* LOWER DECK (4 Manik Bawah = 1 each) */}
                    <div className="h-32 sm:h-36 w-full flex flex-col items-center justify-end relative z-10 gap-1">
                      {Array.from({ length: 4 }).map((_, beadIdx) => {
                        const isActive = beadIdx < rod.lowerCount;
                        return (
                          <button
                            key={beadIdx}
                            type="button"
                            onClick={() => handleLowerBeadClick(rodIdx, beadIdx)}
                            className={`w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-all transform active:scale-95 shadow-sm flex items-center justify-center font-black text-[11px] cursor-pointer border-2 ${
                              isActive
                                ? 'bg-gradient-to-r from-[#1976D2] to-[#42A5F5] border-[#1565C0] text-white -translate-y-4 ring-1 ring-[#90CAF9]'
                                : 'bg-gradient-to-r from-[#BBDEFB] to-[#E3F2FD] border-[#B0BEC5] text-[#1565C0] hover:brightness-105'
                            }`}
                            title={`Manik Bawah #${beadIdx + 1} (+1)`}
                          >
                            <span>1</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Single Rod Subtotal Pill */}
                  <div className="mt-2 px-2.5 py-1 bg-[#FAF8F0] border-2 border-[#E7E2D6] rounded-xl text-center shadow-2xs">
                    <span className="text-xs font-black text-[#D97706] font-heading">
                      {rodVal}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Formula & Learning Tips Box */}
      {showFormula && (
        <div className="w-full max-w-xl mt-3.5 p-3.5 bg-[#FFF8E1] border-2 border-[#FFE082] rounded-2xl text-left text-xs text-[#5D4037]">
          <div className="font-black mb-1 text-[#B45309] flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#D97706]" />
            <span>{formulaTitle || 'Rumus Aritmatika Sempoa:'}</span>
          </div>
          <p className="font-bold leading-relaxed">{showFormula}</p>
        </div>
      )}
    </div>
  );
};
