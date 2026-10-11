import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, Star, Heart, Flame, Award, Smile, Music, Mic, Zap } from 'lucide-react';
import { sound, CharacterId } from '../utils/audio';
import confetti from 'canvas-confetti';

export interface DisneyCharacter {
  id: string;
  charKey: CharacterId;
  name: string;
  role: string;
  subject: string;
  emoji: string;
  badge: string;
  voiceStyle: string;
  soundEffectName: string;
  color: string;
  border: string;
  bgGrad: string;
  greeting: string;
  description: string;
  favoriteFood: string;
  personality: string;
}

export const DISNEY_CHARACTERS: DisneyCharacter[] = [
  {
    id: 'char-leo',
    charKey: 'leo',
    name: 'Leo si Singa Juara',
    role: 'Sahabat Cilik 8 Tahun (Pemberani & Ceria)',
    subject: 'Matematika & Logika Berhitung',
    emoji: '🦁',
    badge: '👑 Raja Berhitung',
    voiceStyle: 'Suara Ceria & Bersemangat (Pemberani & Optimis)',
    soundEffectName: 'Auman Singa Lucu 🎺',
    color: 'text-amber-700',
    border: 'border-amber-300 hover:border-amber-500',
    bgGrad: 'from-amber-100 via-orange-50 to-amber-50',
    greeting: 'Rawrrr! Keren sekali! Halo kawan-kawan! Aku Leo si Singa Juara. Belajar berhitung dan matematika itu seru dan mudah sekali kalau kita belajar bersama. Yuk, kita mulai petualangan berhitung sekarang!',
    description: 'Leo anak yang pemberani dan ceria, sangat menyukai tantangan berhitung dan selalu menyemangati teman-temannya.',
    favoriteFood: 'Buah Mangga Manis 🥭',
    personality: 'Pemberani, optimis, dan selalu riang gembira.'
  },
  {
    id: 'char-ciko',
    charKey: 'ciko',
    name: 'Ciko si Kelinci Ceria',
    role: 'Sahabat Cilik 7 Tahun (Lincah & Gemar Membaca)',
    subject: 'Bahasa Indonesia & Literasi Cerita',
    emoji: '🐰',
    badge: '🥕 Bintang Literasi',
    voiceStyle: 'Suara Lincah & Menggemaskan (Ceria & Riang)',
    soundEffectName: 'Lompatan Kelinci 🌀',
    color: 'text-rose-700',
    border: 'border-rose-300 hover:border-rose-500',
    bgGrad: 'from-rose-100 via-pink-50 to-rose-50',
    greeting: 'Boing boing! Hihihi! Halo teman-temanku yang hebat! Aku Ciko si Kelinci Ceria. Membaca buku dongeng dan cerita bergambar itu asyik sekali lho! Tiba-tiba kita bisa bertualang ke negeri ajaib! Ayo, kita buka buku ceritanya dan belajar bersama!',
    description: 'Ciko suka melompat gembira dan tertawa riang saat membaca kisah petualangan menarik.',
    favoriteFood: 'Wortel Madu Renyah 🥕',
    personality: 'Ceria, lincah, ekspresif, dan ramah.'
  },
  {
    id: 'char-owi',
    charKey: 'owi',
    name: 'Profesor Owi si Burung Hantu',
    role: 'Sahabat Cilik 9 Tahun (Penasaran & Teliti)',
    subject: 'IPAS & Eksplorasi Sains Alam',
    emoji: '🦉',
    badge: '🔭 Peneliti Cilik',
    voiceStyle: 'Suara Cerdas & Penuh Rasa Ingin Tahu (Ajaib Sekali!)',
    soundEffectName: 'Seruling Burung Hantu 🦉',
    color: 'text-blue-700',
    border: 'border-blue-300 hover:border-blue-500',
    bgGrad: 'from-blue-100 via-cyan-50 to-blue-50',
    greeting: 'Hmm... Kacamata sainsku sudah terpasang rapi! Hoo-hooo! Tahukah kamu kenapa pelangi punya warna-warni yang indah? Rahasia alam semesta itu ajaib dan luar biasa lho! Yuk, kita selidiki rahasia sains bersama!',
    description: 'Owi selalu penasaran tentang cara kerja alam semesta dan suka mengamati hal-hal baru dengan teliti.',
    favoriteFood: 'Biji Bunga Matahari 🌻',
    personality: 'Cerdas, bijak, suka bereksperimen, dan penuh rasa ingin tahu.'
  },
  {
    id: 'char-mimi',
    charKey: 'mimi',
    name: 'Mimi si Panda Pelangi',
    role: 'Sahabat Cilik 7 Tahun (Manis & Penyayang)',
    subject: 'Pendidikan Pancasila & Budi Pekerti',
    emoji: '🐼',
    badge: '🌸 Sahabat Hangat',
    voiceStyle: 'Suara Lembut & Riang (Ramah & Hangat)',
    soundEffectName: 'Lonceng Gemerincing 🔔',
    color: 'text-emerald-700',
    border: 'border-emerald-300 hover:border-emerald-500',
    bgGrad: 'from-emerald-100 via-teal-50 to-emerald-50',
    greeting: 'Hihihi! Halo teman-temanku tersayang! Mimi punya pelangi kebaikan hari ini. Kalau kita saling membantu, berbagi, dan menyayangi sesama teman, hati kita jadi damai dan bahagia lho. Tetap tersenyum dan semangat ya!',
    description: 'Mimi anak yang ramah dan suka berbagi, selalu mengingatkan teman-temannya untuk saling menyayangi dan berbuat baik.',
    favoriteFood: 'Puding Bambu Manis 🎋',
    personality: 'Penyayang, santun, hangat, dan murah senyum.'
  },
  {
    id: 'char-dino',
    charKey: 'dino',
    name: 'Dino si Penjelajah Hijau',
    role: 'Sahabat Cilik 8 Tahun (Petualang Antariksa)',
    subject: 'Eksplorasi Antariksa & Samudra',
    emoji: '🦕',
    badge: '🚀 Penjelajah Bintang',
    voiceStyle: 'Suara Penjelajah Cilik (Wuuush! Bersemangat)',
    soundEffectName: 'Hentakan Dinosaurus 🐾',
    color: 'text-indigo-700',
    border: 'border-indigo-300 hover:border-indigo-500',
    bgGrad: 'from-indigo-100 via-sky-50 to-indigo-50',
    greeting: 'Wuuush! Duum duum! Rawrrr cilik! Siap menjelajahi bintang-bintang di luar angkasa bersamaku? Alam semesta ini luar biasa luas dan menakjubkan lho! Ayo pegangan yang erat, kita meluncur bersama!',
    description: 'Dino gemar menirukan roket luar angkasa dan mencari rasi bintang baru di langit malam.',
    favoriteFood: 'Daun Semanggi Segar 🍀',
    personality: 'Penuh petualangan, berimajinasi tinggi, dan tangkas.'
  },
  {
    id: 'char-kids',
    charKey: 'kids',
    name: 'Budi & Callysta',
    role: 'Teman Belajar Kompak 8 Tahun (Sahabat Sejati)',
    subject: 'Seluruh Modul Kurikulum Merdeka',
    emoji: '👧👦',
    badge: '🌟 Bintang Prestasi',
    voiceStyle: 'Suara Dua Sahabat Kompak (Horeee! Semangat Bareng)',
    soundEffectName: 'Melodi Xilofon 🎼',
    color: 'text-purple-700',
    border: 'border-purple-300 hover:border-purple-500',
    bgGrad: 'from-purple-100 via-fuchsia-50 to-purple-50',
    greeting: 'Horeee! Halo sahabat hebat! Kami Budi dan Callysta! Belajar di Karia Ku sangat menyenangkan dan membuat kita makin pintar, kan? Yuk, kita selesaikan kuis bersama dan kumpulkan semua bintang juaramu!',
    description: 'Budi dan Callysta selalu belajar bersama, saling menyemangati, dan merayakan keberhasilan teman-temannya.',
    favoriteFood: 'Roti Panggang Cokelat 🥪',
    personality: 'Kompak, rajin, pantang menyerah, dan suportif.'
  }
];

export const DisneyCharacterShowcase: React.FC = () => {
  const [activeCharId, setActiveCharId] = useState<string>('char-leo');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isAnySpeaking, setIsAnySpeaking] = useState<boolean>(false);

  useEffect(() => {
    const unsub = sound.onSpeechStateChange((speaking) => {
      setIsAnySpeaking(speaking);
      if (!speaking) {
        setSpeakingId(null);
      }
    });
    return () => unsub();
  }, []);

  const activeCharacter = DISNEY_CHARACTERS.find(c => c.id === activeCharId) || DISNEY_CHARACTERS[0];

  const handleSpeak = (char: DisneyCharacter, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (speakingId === char.id && isAnySpeaking) {
      sound.stopSpeaking();
      setSpeakingId(null);
      return;
    }

    setSpeakingId(char.id);
    
    // Trigger distinct cute & funny mascot voice & sound effect
    sound.speakCharacter(char.id, char.greeting);

    confetti({
      particleCount: 35,
      spread: 65,
      origin: { y: 0.7 }
    });
  };

  const handleStop = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.stopSpeaking();
    setSpeakingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-100 to-rose-100 border border-amber-300 text-xs font-black text-amber-900 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
          <span>Suara Sahabat Belajar Cilik Indonesia (Usia 7–9 Tahun)</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-[#4E342E]">
          Teman Belajar Cilik yang Ceria & Bersahabat!
        </h2>
        <p className="text-xs sm:text-sm text-[#6D4C41] font-medium">
          Karakter sahabat belajar seusia 7–9 tahun yang ekspresif, hangat, gemar menyemangati, dan membuat belajar jadi sangat menyenangkan!
        </p>
      </div>

      {/* Characters Carousel / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {DISNEY_CHARACTERS.map((char) => {
          const isSelected = char.id === activeCharId;
          const isSpeaking = speakingId === char.id;

          return (
            <button
              key={char.id}
              type="button"
              onClick={() => {
                setActiveCharId(char.id);
                handleSpeak(char);
              }}
              className={`p-3.5 rounded-3xl border-2 transition-all cursor-pointer text-center relative overflow-hidden flex flex-col items-center justify-between group ${
                isSelected
                  ? `bg-gradient-to-b ${char.bgGrad} ${char.border} shadow-md scale-105 ring-2 ring-amber-400`
                  : 'bg-white/90 hover:bg-amber-50/50 border-[#E7E2D6] hover:border-amber-300 shadow-2xs hover:scale-102'
              }`}
            >
              {/* Floating Sparkle for Selected */}
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 text-amber-500 animate-sparkle">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Big Animated 3D Emoji Avatar */}
              <div className="relative py-1.5">
                <div
                  className={`text-4xl sm:text-5xl transition-transform duration-300 select-none ${
                    isSpeaking ? 'animate-bounce scale-125' : isSelected ? 'animate-float' : 'group-hover:scale-110'
                  }`}
                >
                  {char.emoji}
                </div>
                {isSpeaking && (
                  <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                )}
              </div>

              {/* Name and Badge */}
              <div className="mt-1 space-y-0.5 w-full">
                <h4 className="text-xs font-black font-heading text-[#4E342E] truncate">
                  {char.name}
                </h4>
                <p className="text-[10px] font-bold text-[#8D6E63] truncate">
                  {char.badge}
                </p>
                <div className="text-[9px] font-extrabold text-[#B45309] bg-amber-50/80 px-1.5 py-0.5 rounded-full truncate">
                  {char.soundEffectName}
                </div>
              </div>

              {/* Sound Action Pill */}
              <div className="mt-2 w-full pt-1.5 border-t border-black/5 flex items-center justify-center gap-1 text-[10px] font-black text-[#D97706]">
                <Volume2 className={`w-3 h-3 ${isSpeaking ? 'animate-pulse text-rose-600' : ''}`} />
                <span>{isSpeaking ? 'Ngobrol Asik...' : 'Dengar Suara'}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Featured Active Character Spotlight Card */}
      <div className={`rounded-3xl border-2 ${activeCharacter.border} bg-gradient-to-r ${activeCharacter.bgGrad} p-6 sm:p-8 shadow-xs relative overflow-hidden`}>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/40 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          {/* Avatar & Voice Button */}
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-3 bg-white/85 backdrop-blur-xs p-5 rounded-2xl border border-white shadow-2xs">
            <div className="text-6xl sm:text-7xl animate-float select-none drop-shadow-md">
              {activeCharacter.emoji}
            </div>
            <div>
              <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[11px] font-black inline-block mb-1">
                {activeCharacter.badge}
              </span>
              <h3 className="text-lg sm:text-xl font-black font-heading text-[#4E342E]">
                {activeCharacter.name}
              </h3>
              <p className="text-xs font-bold text-[#6D4C41]">
                {activeCharacter.role}
              </p>
            </div>

            {/* Voice Style Pill */}
            <div className="w-full bg-amber-50 rounded-xl p-2.5 border border-amber-200 text-left space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-800">
                <Mic className="w-3.5 h-3.5 text-amber-600" />
                <span>Persona Suara Teman Cilik:</span>
              </div>
              <p className="text-[11px] font-extrabold text-[#4E342E] leading-tight">
                {activeCharacter.voiceStyle}
              </p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 pt-0.5">
                <Music className="w-3 h-3" />
                <span>Jingle Efek: {activeCharacter.soundEffectName}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSpeak(activeCharacter)}
              className={`w-full py-2.5 px-4 rounded-xl text-white text-xs font-black flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all cursor-pointer ${
                speakingId === activeCharacter.id && isAnySpeaking
                  ? 'bg-rose-600 hover:bg-rose-700 ring-2 ring-rose-300 animate-pulse'
                  : 'bg-gradient-to-r from-[#D97706] to-[#EA580C] hover:from-[#B45309] hover:to-[#C2410C]'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${speakingId === activeCharacter.id && isAnySpeaking ? 'animate-bounce' : ''}`} />
              <span>{speakingId === activeCharacter.id && isAnySpeaking ? '⏹️ Hentikan Suara' : '🔊 Dengar Suara Sahabat Ini'}</span>
            </button>
          </div>

          {/* Details & Quote Speech Bubble */}
          <div className="md:col-span-8 space-y-4">
            {/* Disney Speech Bubble */}
            <div className="bg-white rounded-2xl p-5 border-2 border-amber-200/80 shadow-2xs relative">
              <div className="absolute -left-2.5 top-6 w-4 h-4 bg-white border-l-2 border-b-2 border-amber-200/80 rotate-45 hidden md:block" />
              <div className="flex items-center justify-between gap-2 text-xs font-black text-amber-700 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Smile className="w-4 h-4 text-amber-600" />
                  <span>Obrolan Ceria & Suara Lucu:</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-black">
                  {activeCharacter.soundEffectName}
                </span>
              </div>
              <p className="text-sm sm:text-base font-extrabold text-[#4E342E] leading-relaxed italic">
                "{activeCharacter.greeting}"
              </p>
            </div>

            {/* Character Traits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/80 p-3 rounded-xl border border-black/5">
                <span className="text-[10px] font-bold text-[#8D6E63] uppercase block">Pelajaran Favorit</span>
                <span className="font-black text-[#4E342E] mt-0.5 block">{activeCharacter.subject}</span>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-black/5">
                <span className="text-[10px] font-bold text-[#8D6E63] uppercase block">Sifat Lucu</span>
                <span className="font-black text-[#4E342E] mt-0.5 block">{activeCharacter.personality}</span>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-black/5">
                <span className="text-[10px] font-bold text-[#8D6E63] uppercase block">Camilan Kesukaan</span>
                <span className="font-black text-[#4E342E] mt-0.5 block">{activeCharacter.favoriteFood}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
