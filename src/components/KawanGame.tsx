import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChildProfile } from '../types';

/** Jenjang kariaku -> id jenjang game Kawan Belajar (public/kawan-belajar). */
export function gameLevelFor(child: Pick<ChildProfile, 'grade' | 'age'>): string {
  switch (child.grade) {
    case 'paud': return 'kb';
    case 'tk': return child.age >= 5 ? 'tkb' : 'tka';
    case 'sd-1':
    case 'sd-2': return 'sd12';
    case 'sd-3': return 'sd34';
    default: return child.age <= 9 ? 'sd34' : 'sd56';
  }
}

export const KawanGame: React.FC = () => {
  const { activeChild, updateChild, setActiveView } = useApp();
  // Bintang yang sudah dihitung per anak, agar tidak terhitung dua kali.
  const counted = useRef<number | null>(null);
  const childRef = useRef(activeChild);
  childRef.current = activeChild;

  useEffect(() => {
    counted.current = null;
    const onMessage = (e: MessageEvent) => {
      const d = e.data;
      if (!d || d.source !== 'kawan-belajar' || d.type !== 'session') return;
      const child = childRef.current;
      const stars = Math.max(0, Math.min(3, Number(d.stars) || 0));
      updateChild(child.id, {
        totalStars: child.totalStars + stars,
        streakDays: Math.max(child.streakDays, Number(d.streak) || 0),
        lastActiveAt: new Date().toISOString(),
      }, true);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [activeChild.id]);

  const src = `/kawan-belajar/index.html?embed=1&child=${encodeURIComponent(activeChild.id)}&level=${gameLevelFor(activeChild)}`;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 space-y-3">
      <button
        type="button"
        onClick={() => setActiveView('child_home')}
        className="inline-flex items-center gap-1.5 text-sm font-black text-[#6D4C41] hover:text-[#D97706] bg-[#FAF8F0] border-2 border-[#E7E2D6] rounded-2xl px-3 py-1.5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </button>
      <div className="rounded-3xl overflow-hidden border-4 border-[#FFE082] shadow-md bg-[#DCEFFF]">
        <iframe
          title="Kawan Belajar"
          src={src}
          className="w-full block border-0"
          style={{ height: 'calc(100dvh - 11rem)', minHeight: 520 }}
          allow="autoplay"
        />
      </div>
    </div>
  );
};
