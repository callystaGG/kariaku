import React from 'react';
import { Sparkles, Star, Heart, Volume2, BookOpen, Crown } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface DisneyHeroBackgroundProps {
  onMascotClick?: (name: string, phrase: string) => void;
}

export const DisneyHeroBackground: React.FC<DisneyHeroBackgroundProps> = ({ onMascotClick }) => {
  const triggerMascot = (charKey: 'leo' | 'owi' | 'ciko' | 'mimi', name: string, emoji: string, phrase: string) => {
    sound.speakCharacter(charKey, phrase);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.5 }
    });
    if (onMascotClick) {
      onMascotClick(name, phrase);
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0 select-none">
      {/* 1. Whimsical Sky Gradient with Soft Radial Sunlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5D6] via-[#FFFDF5] to-[#F1F8E9] opacity-90" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#FFE082]/35 via-[#FFF9C4]/20 to-transparent rounded-full blur-3xl" />

      {/* 2. Soft Fairytale Rainbow Arch */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] opacity-25 pointer-events-none">
        <svg viewBox="0 0 1000 500" className="w-full h-full">
          <defs>
            <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF8A80" stopOpacity="0.8" />
              <stop offset="20%" stopColor="#FFD180" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#FFFF8D" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#CCFF90" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#80D8FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EA80FC" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M 50 500 A 450 450 0 0 1 950 500"
            fill="none"
            stroke="url(#rainbowGrad)"
            strokeWidth="36"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 3. Drifting Puffy Cartoon Clouds */}
      <div className="absolute top-6 left-4 animate-cloud-drift opacity-60">
        <div className="flex items-center space-x-[-12px]">
          <div className="w-12 h-12 bg-white rounded-full shadow-xs" />
          <div className="w-16 h-16 bg-white rounded-full -mt-3 shadow-xs" />
          <div className="w-12 h-12 bg-white rounded-full shadow-xs" />
        </div>
      </div>

      <div className="absolute top-12 right-8 animate-cloud-drift opacity-50 [animation-delay:4s]">
        <div className="flex items-center space-x-[-10px]">
          <div className="w-10 h-10 bg-white rounded-full shadow-xs" />
          <div className="w-14 h-14 bg-white rounded-full -mt-2 shadow-xs" />
          <div className="w-10 h-10 bg-white rounded-full shadow-xs" />
        </div>
      </div>

      {/* 4. Twinkling Glowing Stars & Sparkles */}
      <div className="absolute top-10 left-1/4 text-amber-400 animate-sparkle">
        <Sparkles className="w-5 h-5 drop-shadow-sm" />
      </div>
      <div className="absolute top-20 right-1/4 text-amber-500 animate-sparkle-delayed">
        <Sparkles className="w-6 h-6 drop-shadow-sm" />
      </div>
      <div className="absolute bottom-28 left-12 text-yellow-500 animate-sparkle">
        <Star className="w-4 h-4 fill-yellow-400" />
      </div>
      <div className="absolute bottom-32 right-16 text-rose-400 animate-sparkle-delayed">
        <Star className="w-4 h-4 fill-rose-300" />
      </div>

      {/* 5. Rolling Green Hill Slopes with Flowers at Bottom */}
      <div className="absolute -bottom-6 left-0 right-0 h-32 opacity-40 pointer-events-none">
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M 0 120 Q 300 40 600 110 T 1200 80 L 1200 200 L 0 200 Z"
            fill="#A5D6A7"
          />
          <path
            d="M 0 150 Q 400 90 800 160 T 1200 130 L 1200 200 L 0 200 Z"
            fill="#81C784"
          />
        </svg>
      </div>

      {/* 6. Interactive Disney Style Mascot Characters Around Corners (pointer-events enabled for children to touch!) */}
      
      {/* Left Mascot: Leo si Singa Juara 🦁 */}
      <div className="absolute bottom-6 left-3 sm:left-6 pointer-events-auto group hidden md:block">
        <button
          type="button"
          onClick={() => triggerMascot('leo', 'Leo', '🦁', 'Rawrrr! Keren sekali! Halo sahabatku! Aku Leo si Singa Juara. Yuk kita berhitung dan belajar matematika bersama!')}
          className="bg-white/90 hover:bg-amber-100/95 backdrop-blur-xs p-2.5 rounded-2xl border-2 border-amber-300 shadow-sm hover:shadow-md transition-all active:scale-90 cursor-pointer flex items-center gap-2 group-hover:scale-105"
          title="Klik Leo si Singa!"
        >
          <span className="text-3xl sm:text-4xl animate-gentle-bob">🦁</span>
          <div className="text-left pr-1">
            <span className="text-[10px] font-black text-amber-800 uppercase block tracking-wider">Sahabat Belajar</span>
            <span className="text-xs font-black text-[#4E342E] flex items-center gap-1">
              Leo si Singa <Sparkles className="w-3 h-3 text-amber-500" />
            </span>
          </div>
        </button>
      </div>

      {/* Right Mascot: Owi si Burung Hantu 🦉 */}
      <div className="absolute bottom-6 right-3 sm:right-6 pointer-events-auto group hidden md:block">
        <button
          type="button"
          onClick={() => triggerMascot('owi', 'Profesor Owi', '🦉', 'Hmm... Kacamata sains sudah terpasang rapi! Hoo-hooo! Tahukah kamu? Rahasia alam semesta dan sains itu sangat ajaib lho!')}
          className="bg-white/90 hover:bg-blue-100/95 backdrop-blur-xs p-2.5 rounded-2xl border-2 border-blue-300 shadow-sm hover:shadow-md transition-all active:scale-90 cursor-pointer flex items-center gap-2 group-hover:scale-105"
          title="Klik Profesor Owi!"
        >
          <span className="text-3xl sm:text-4xl animate-float">🦉</span>
          <div className="text-left pr-1">
            <span className="text-[10px] font-black text-blue-800 uppercase block tracking-wider">Profesor Sains</span>
            <span className="text-xs font-black text-[#4E342E] flex items-center gap-1">
              Owi si Pintar <Star className="w-3 h-3 text-yellow-500 fill-yellow-400" />
            </span>
          </div>
        </button>
      </div>

      {/* Top Left Floating Bunny 🐰 */}
      <div className="absolute top-4 left-3 sm:left-8 pointer-events-auto hidden lg:block">
        <button
          type="button"
          onClick={() => triggerMascot('ciko', 'Ciko', '🐰', 'Boing boing! Hihihi! Aku Ciko si Kelinci Ceria! Membaca buku dongeng dan belajar bersama itu asyik sekali lho!')}
          className="bg-white/80 hover:bg-pink-100 p-2 rounded-2xl border border-pink-200 shadow-2xs hover:shadow-sm transition-transform active:scale-90 cursor-pointer flex items-center gap-1.5 hover:scale-110"
        >
          <span className="text-2xl animate-wiggle">🐰</span>
          <span className="text-[10px] font-black text-pink-700">Ciko Kelinci</span>
        </button>
      </div>

      {/* Top Right Floating Panda 🐼 */}
      <div className="absolute top-4 right-3 sm:right-8 pointer-events-auto hidden lg:block">
        <button
          type="button"
          onClick={() => triggerMascot('mimi', 'Mimi', '🐼', 'Hihihi! Cilukba! Halo sahabatku! Mimi Panda ada di sini. Semangat terus belajarnya ya, kamu pasti bisa!')}
          className="bg-white/80 hover:bg-emerald-100 p-2 rounded-2xl border border-emerald-200 shadow-2xs hover:shadow-sm transition-transform active:scale-90 cursor-pointer flex items-center gap-1.5 hover:scale-110"
        >
          <span className="text-2xl animate-gentle-bob">🐼</span>
          <span className="text-[10px] font-black text-emerald-700">Mimi Panda</span>
        </button>
      </div>
    </div>
  );
};
