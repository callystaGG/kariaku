import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { GRADES_LIST, SUBJECTS_LIST } from '../data/modulesData';
import { DisneyHeroBackground } from './DisneyHeroBackground';
import { DisneyCharacterShowcase } from './DisneyMascotScene';
import {
  Sparkles,
  Crown,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Award,
  BarChart3,
  Volume2,
  Lock,
  ArrowRight,
  LogIn,
  UserPlus,
  Star,
  Zap,
  Play,
  RotateCcw,
  Check,
  Users,
  Layers,
  Heart,
  Smile,
  HelpCircle,
  ChevronDown,
  Quote,
  Flame,
  BadgePercent,
  CheckCircle,
  FileText,
  Clock,
  Laptop
} from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

// Interactive Sample Quizzes for Bento Grid Live Widget
interface SampleQuiz {
  id: string;
  category: string;
  fase: string;
  question: string;
  illustration: string;
  audioPrompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_QUIZZES: SampleQuiz[] = [
  {
    id: 'sample-math',
    category: 'Matematika Fase A (Kelas 1-2)',
    fase: 'Fase A',
    question: 'Di taman ada 4 kelinci putih 🐇 dan datang lagi 3 kelinci cokelat 🐇. Berapa jumlah semua kelinci?',
    illustration: '🐇 🐇 🐇 🐇  +  🐇 🐇 🐇',
    audioPrompt: 'Di taman ada empat kelinci putih dan datang lagi tiga kelinci cokelat. Berapa jumlah semua kelinci?',
    options: ['6 kelinci', '7 kelinci', '8 kelinci', '9 kelinci'],
    correctIndex: 1,
    explanation: 'Hebat! 4 ditambah 3 sama dengan 7 kelinci! 🌟'
  },
  {
    id: 'sample-pancasila',
    category: 'Pendidikan Pancasila Fase B (Kelas 3-4)',
    fase: 'Fase B',
    question: 'Simbol Sila Pertama Pancasila "Ketuhanan Yang Maha Esa" dilambangkan oleh lambang apa?',
    illustration: '⭐ 🌾 🐃 🌳 ⛓️',
    audioPrompt: 'Simbol Sila Pertama Pancasila Ketuhanan Yang Maha Esa dilambangkan oleh lambang apa?',
    options: ['Bintang Emas', 'Pohon Beringin', 'Kepala Banteng', 'Padi dan Kapas'],
    correctIndex: 0,
    explanation: 'Tepat sekali! Bintang Emas melambangkan cahaya rohani bagi setiap manusia. 🌟'
  },
  {
    id: 'sample-science',
    category: 'IPAS Fase C (Kelas 5-6)',
    fase: 'Fase C',
    question: 'Proses tumbuhan hijau mengolah makanan dengan bantuan cahaya matahari dan klorofil disebut...',
    illustration: '☀️ 🌱 💧 🍃',
    audioPrompt: 'Proses tumbuhan hijau mengolah makanan dengan bantuan cahaya matahari disebut apa?',
    options: ['Respirasi', 'Fotosintesis', 'Metamorfosis', 'Penguapan'],
    correctIndex: 1,
    explanation: 'Luar biasa! Fotosintesis menghasilkan oksigen dan glukosa untuk makhluk hidup. 🌟'
  }
];

// Interactive Parent Testimonials Data
const TESTIMONIALS = [
  {
    id: 'testi-1',
    name: 'Ibu Ratna Dewi, S.Pd',
    location: 'Jakarta Selatan',
    childGrade: 'Ibu dari Kenzo (SD Kelas 2)',
    rating: 5,
    avatarBg: 'bg-amber-100 text-amber-800',
    initial: 'RD',
    text: 'Sangat cocok dengan kurikulum sekolah saat ini! Kenzo jadi antusias belajar sendiri karena ada suara panduan bahasa Indonesia dan kuis berhadiah bintang. Sebagai guru dan orang tua, saya sangat merekomendasikan.'
  },
  {
    id: 'testi-2',
    name: 'Bapak Hendra Gunawan',
    location: 'Surabaya',
    childGrade: 'Ayah dari Alya (TK B) & Dimas (SD Kelas 4)',
    rating: 5,
    avatarBg: 'bg-emerald-100 text-emerald-800',
    initial: 'HG',
    text: 'Fitur 1 akun untuk banyak anak di Paket Juara sangat hemat. Saya bisa cek hasil latihan Dimas dan Alya lewat dasbor orang tua dengan PIN proteksi yang aman dari jangkauan anak-anak.'
  },
  {
    id: 'testi-3',
    name: 'Ibu Amanda Natasha',
    location: 'Bandung',
    childGrade: 'Ibu dari Nadine (SD Kelas 1)',
    rating: 5,
    avatarBg: 'bg-blue-100 text-blue-800',
    initial: 'AN',
    text: 'Anak saya awalnya susah diajak membaca, tapi lewat modul bergambar dan kuis visual di sini dia bisa belajar mengeja dan berhitung dengan riang tanpa rasa tertekan.'
  }
];

// FAQ Items Data
interface FaqItem {
  id: string;
  category: 'semua' | 'kurikulum' | 'langganan' | 'fitur';
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'kurikulum',
    question: 'Apakah materi modul sesuai dengan Capaian Pembelajaran Kurikulum Merdeka?',
    answer: 'Ya, seluruh materi dari Fase Fondasi (PAUD/TK), Fase A (SD Kelas 1-2), Fase B (SD Kelas 3-4), hingga Fase C (SD Kelas 5-6) disusun berpedoman pada Capaian Pembelajaran (CP) Kemendikbudristek dengan pendekatan saintifik dan diferensiasi ramah anak.'
  },
  {
    id: 'faq-2',
    category: 'langganan',
    question: 'Bagaimana cara mencoba masa trial gratis 7 hari?',
    answer: 'Cukup daftar akun orang tua baru dan pilih paket Uji Coba Gratis. Anda akan mendapatkan akses penuh selama 7 hari tanpa dipungut biaya dan tanpa ikatan komitmen.'
  },
  {
    id: 'faq-3',
    category: 'fitur',
    question: 'Apakah 1 akun bisa digunakan untuk lebih dari 1 anak?',
    answer: 'Ya! Paket Ceria mendukung hingga 2 profil anak, dan Paket Juara Keluarga mendukung hingga 4 profil anak dengan rekam jejak bintang, nilai kuis, dan riwayat belajar terpisah untuk masing-masing anak.'
  },
  {
    id: 'faq-4',
    category: 'langganan',
    question: 'Metode pembayaran apa saja yang didukung?',
    answer: 'Kami mendukung QRIS instan (GoPay, OVO, ShopeePay, DANA, LinkAja), Virtual Account bank nasional (BCA, Mandiri, BNI, BRI), serta transfer manual bank dengan verifikasi cepat.'
  },
  {
    id: 'faq-5',
    category: 'fitur',
    question: 'Apakah aplikasi ini aman dari konten luar dan iklan?',
    answer: '100% aman. Aplikasi ini bebas dari iklan komersial luar dan memiliki Parental Gate PIN untuk melindungi menu transaksi dan pengaturan dari interaksi tidak disengaja oleh buah hati.'
  }
];

export const HomePanel: React.FC = () => {
  const {
    parentUser,
    subscriptionPlans,
    openAuthModal,
    openSubscriptionModal,
    setActiveView,
    setCurrentMode
  } = useApp();

  // Active plans filter
  const activePlans = subscriptionPlans.filter(p => p.isActive !== false);

  // Check if user is actively logged in (not unauthenticated default guest)
  const isUserLoggedIn = Boolean(
    parentUser &&
    parentUser.id !== 'parent-guest' &&
    parentUser.email &&
    parentUser.email.trim().length > 0
  );

  // 1. Interactive Bento Grid - Quiz State
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizAnsweredCorrectly, setQuizAnsweredCorrectly] = useState<boolean | null>(null);

  // 2. Interactive Bento Grid - Audio Player State
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);

  // 3. Interactive Bento Grid - Gamification Star Burst State
  const [demoStars, setDemoStars] = useState<number>(18);
  const [demoStreak, setDemoStreak] = useState<number>(5);

  // 4. Interactive Bento Grid - Fase Selector
  const [selectedFaseId, setSelectedFaseId] = useState<string>('grade-sd-1');

  // 5. Interactive Product Tour Tab
  const [activeTourTab, setActiveTourTab] = useState<'module' | 'quiz' | 'parent' | 'trophy'>('module');

  // 6. Pricing Period Toggle (Bulanan vs Tahunan)
  const [isAnnualBilling, setIsAnnualBilling] = useState<boolean>(false);

  // 7. FAQ State & Filter
  const [faqFilter, setFaqFilter] = useState<'semua' | 'kurikulum' | 'langganan' | 'fitur'>('semua');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterApp = () => {
    sound.playPop(520);
    if (isUserLoggedIn) {
      setCurrentMode('child');
      setActiveView('child_home');
    } else {
      openAuthModal();
    }
  };

  // Handle Interactive Live Quiz Option Click
  const handleQuizOptionClick = (optionIdx: number) => {
    const currentQuiz = SAMPLE_QUIZZES[selectedQuizIdx];
    setQuizSelectedOption(optionIdx);

    if (optionIdx === currentQuiz.correctIndex) {
      setQuizAnsweredCorrectly(true);
      sound.playSuccess();
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 }
      });
      setDemoStars(prev => prev + 1);
    } else {
      setQuizAnsweredCorrectly(false);
      sound.playError();
    }
  };

  const handleNextSampleQuiz = () => {
    sound.playPop(480);
    setQuizSelectedOption(null);
    setQuizAnsweredCorrectly(null);
    setSelectedQuizIdx((prev) => (prev + 1) % SAMPLE_QUIZZES.length);
  };

  // Handle Interactive Audio Tutor Voice Sample
  const handlePlayVoiceSample = () => {
    const currentQuiz = SAMPLE_QUIZZES[selectedQuizIdx];
    if (isPlayingAudio) {
      sound.stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      sound.playPop(500);
      sound.speakIndonesian(currentQuiz.audioPrompt);
      // Auto toggle off after speech estimated duration
      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 4500);
    }
  };

  // Handle Star Clicker in Gamification Tile
  const handleStarClick = () => {
    sound.playStarCollect();
    setDemoStars(prev => prev + 1);
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.6 }
    });
  };

  const currentQuiz = SAMPLE_QUIZZES[selectedQuizIdx];
  const activeGradeData = GRADES_LIST.find(g => g.id === selectedFaseId) || GRADES_LIST[0];

  const filteredFaqs = faqFilter === 'semua'
    ? FAQ_LIST
    : FAQ_LIST.filter(f => f.category === faqFilter);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 animate-fade-in max-w-7xl mx-auto px-3 sm:px-6">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Modern 21st.dev Hero with Disney FairyTale Animated Accents) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#FFF9E6] via-[#FAF8F0] to-[#FFFDF7] border-2 border-[#FFE082] p-6 sm:p-12 lg:p-16 shadow-xs mt-2">
        {/* Disney Animated FairyTale Background: Clouds, Rainbow, Twinkling Stars & Floating Mascots */}
        <DisneyHeroBackground />

        {/* Ambient background orbs */}
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#FFD54F]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-[#81C784]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#FFE082] shadow-2xs backdrop-blur-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-xs font-black text-[#B45309] tracking-wide uppercase flex items-center gap-1.5">
              <span>✨</span>
              <span>Kurikulum Merdeka 2026</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7CCC8]" />
            <span className="text-xs font-bold text-[#4E342E]">PAUD, TK & SD Kelas 1–6</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading text-[#4E342E] leading-tight tracking-tight drop-shadow-2xs">
            Belajar Ceria, Terarah, dan <span className="text-[#D97706] underline decoration-[#FFE082] decoration-wavy decoration-2">Penuh Prestasi</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#6D4C41] font-medium max-w-2xl mx-auto leading-relaxed">
            Aplikasi edukasi anak Indonesia dengan animasi karakter Disney yang menggemaskan, modul bergambar interaktif, kuis narasi audio ceria, dan dasbor orang tua bijak.
          </p>

          {/* Requirement Alert Banner: Proteksi Login */}
          <div className="bg-white/95 backdrop-blur-xs border-2 border-[#FFE082] rounded-2xl p-4 max-w-xl mx-auto shadow-2xs text-left flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFF8E1] text-[#D97706] flex items-center justify-center shrink-0 border border-[#FFE082]">
              <Lock className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs sm:text-sm font-black text-[#4E342E]">
                Akses Pembelajaran Terproteksi
              </h4>
              <p className="text-[11px] sm:text-xs text-[#6D4C41] font-medium mt-0.5 leading-relaxed">
                {isUserLoggedIn ? (
                  <span className="text-[#2E7D32] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2E7D32]" />
                    <span>
                      Masuk sebagai <strong>{parentUser.name}</strong> ({parentUser.email}). Ruang belajar anak siap dijelajahi!
                    </span>
                  </span>
                ) : (
                  <span>
                    Pelanggan <strong>harus masuk (login) atau mendaftar akun terlebih dahulu</strong> untuk membuka modul pelajaran, latihan kuis berhadiah bintang, dan dasbor orang tua.
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {isUserLoggedIn ? (
              <button
                type="button"
                id="btn-hero-go-learning"
                onClick={handleEnterApp}
                className="px-7 py-3.5 rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white font-black text-sm sm:text-base flex items-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span>Buka Ruang Belajar Anak</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  id="btn-hero-login"
                  onClick={() => {
                    sound.playPop(520);
                    openAuthModal();
                  }}
                  className="px-7 py-3.5 rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white font-black text-sm sm:text-base flex items-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <LogIn className="w-5 h-5 text-amber-200" />
                  <span>Masuk Akun Pelanggan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  id="btn-hero-register"
                  onClick={() => {
                    sound.playPop(480);
                    openAuthModal('register');
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#FFF8E1] border-2 border-[#D7CCC8] hover:border-[#D97706] text-[#4E342E] font-black text-sm sm:text-base flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
                >
                  <UserPlus className="w-5 h-5 text-[#D97706]" />
                  <span>Daftar Coba Gratis (7 Hari)</span>
                </button>
              </>
            )}

            <button
              type="button"
              id="btn-hero-see-pricing"
              onClick={() => scrollToSection('section-pricing-packages')}
              className="px-5 py-3.5 rounded-2xl bg-transparent hover:bg-black/5 text-[#8D6E63] hover:text-[#4E342E] font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Crown className="w-4 h-4 text-[#D97706]" />
              <span>Lihat Paket Berlangganan</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#FFE082]/60 max-w-3xl mx-auto">
            <div className="bg-white/80 p-3 rounded-2xl border border-[#E7E2D6] text-center">
              <span className="text-xl sm:text-2xl font-black font-heading text-[#D97706]">100+</span>
              <p className="text-[11px] font-bold text-[#6D4C41] mt-0.5">Modul Bergambar</p>
            </div>
            <div className="bg-white/80 p-3 rounded-2xl border border-[#E7E2D6] text-center">
              <span className="text-xl sm:text-2xl font-black font-heading text-[#2E7D32]">500+</span>
              <p className="text-[11px] font-bold text-[#6D4C41] mt-0.5">Soal Interaktif & Audio</p>
            </div>
            <div className="bg-white/80 p-3 rounded-2xl border border-[#E7E2D6] text-center">
              <span className="text-xl sm:text-2xl font-black font-heading text-[#1565C0]">4 Fase</span>
              <p className="text-[11px] font-bold text-[#6D4C41] mt-0.5">Kurikulum Merdeka</p>
            </div>
            <div className="bg-white/80 p-3 rounded-2xl border border-[#E7E2D6] text-center">
              <span className="text-xl sm:text-2xl font-black font-heading text-[#6A1B9A]">100%</span>
              <p className="text-[11px] font-bold text-[#6D4C41] mt-0.5">Aman & Bebas Iklan</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 21st.dev BENTO GRID: INTERACTIVE LIVE WIDGETS SHOWCASE */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8F5E9] border border-[#C8E6C9] text-xs font-black text-[#2E7D32] mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Fitur Interaktif 21st.dev</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-[#4E342E]">
            Jelajahi Pengalaman Belajar Masa Kini
          </h2>
          <p className="text-xs sm:text-sm text-[#6D4C41] font-medium mt-1">
            Uji coba langsung beberapa fitur interaktif kami langsung dari halaman depan ini.
          </p>
        </div>

        {/* The Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

          {/* BENTO CARD 1 (col-span-12 lg:col-span-7): LIVE INTERACTIVE MINI-QUIZ */}
          <div className="md:col-span-12 lg:col-span-7 bg-[#FAF8F0] border-2 border-[#E7E2D6] hover:border-[#D97706]/70 rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFE082]/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF8E1] border border-[#FFE082] text-[#D97706] flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black font-heading text-[#4E342E]">
                      Coba Kuis Cepat Interaktif
                    </h3>
                    <p className="text-[11px] text-[#8D6E63] font-bold">
                      {currentQuiz.category}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextSampleQuiz}
                  className="px-3 py-1 bg-white hover:bg-[#FFF8E1] border border-[#E7E2D6] rounded-xl text-[11px] font-black text-[#5D4037] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Ganti Soal ({selectedQuizIdx + 1}/{SAMPLE_QUIZZES.length})</span>
                </button>
              </div>

              {/* Quiz Card Content */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E7E2D6] space-y-3.5">
                {/* Illustration Box */}
                <div className="py-2.5 px-4 bg-[#FFFDF7] border border-[#FFE082]/60 rounded-xl text-center text-xl sm:text-2xl tracking-widest">
                  {currentQuiz.illustration}
                </div>

                {/* Question */}
                <div className="flex items-start gap-2.5">
                  <button
                    type="button"
                    onClick={handlePlayVoiceSample}
                    title="Dengarkan soal dengan suara narasi ramah"
                    className={`p-2 rounded-xl border shrink-0 transition-all cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-[#D97706] text-white border-[#B45309] animate-pulse'
                        : 'bg-[#FFF8E1] text-[#D97706] border-[#FFE082] hover:bg-[#FFE082]/40'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <p className="text-xs sm:text-sm font-extrabold text-[#4E342E] leading-relaxed">
                    {currentQuiz.question}
                  </p>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {currentQuiz.options.map((opt, idx) => {
                    const isSelected = quizSelectedOption === idx;
                    const isCorrect = idx === currentQuiz.correctIndex;
                    let btnStyle = 'bg-[#FAF8F0] border-[#E7E2D6] text-[#4E342E] hover:border-[#D97706]';

                    if (quizSelectedOption !== null) {
                      if (isSelected) {
                        btnStyle = isCorrect
                          ? 'bg-[#E8F5E9] border-[#2E7D32] text-[#1B5E20] font-black'
                          : 'bg-[#FFEBEE] border-[#C62828] text-[#B71C1C] font-black';
                      } else if (isCorrect) {
                        btnStyle = 'bg-[#E8F5E9] border-[#81C784] text-[#1B5E20]';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuizOptionClick(idx)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSelectedOption !== null && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Banner */}
                {quizAnsweredCorrectly !== null && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold transition-all ${
                      quizAnsweredCorrectly
                        ? 'bg-[#E8F5E9] border border-[#A5D6A7] text-[#1B5E20]'
                        : 'bg-[#FFF3E0] border border-[#FFE082] text-[#E65100]'
                    }`}
                  >
                    {quizAnsweredCorrectly ? (
                      <div className="flex items-center justify-between">
                        <span>{currentQuiz.explanation}</span>
                        <span className="text-amber-500 font-black flex items-center gap-1">
                          +1 ⭐
                        </span>
                      </div>
                    ) : (
                      <span>Coba periksa lagi jawabannya yuk! Kamu pasti bisa. 💪</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EFEBE9] flex items-center justify-between text-[11px] text-[#8D6E63] font-bold">
              <span>Fitur Kuis Interaktif Berhadiah Bintang</span>
              <span className="text-[#D97706]">500+ Soal Tersedia di Ruang Belajar →</span>
            </div>
          </div>

          {/* BENTO CARD 2 (col-span-12 lg:col-span-5): LIVE AUDIO TUTOR & NARASI SUARA */}
          <div className="md:col-span-12 lg:col-span-5 bg-[#FAF8F0] border-2 border-[#E7E2D6] hover:border-[#1565C0]/70 rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#E3F2FD]/30 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#E3F2FD] border border-[#90CAF9] text-[#1565C0] flex items-center justify-center font-bold">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black font-heading text-[#4E342E]">
                    Audio Narasi Guru Pendamping
                  </h3>
                  <p className="text-[11px] text-[#8D6E63] font-bold">
                    Suara ramah anak berbahasa Indonesia
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#E7E2D6] space-y-3.5">
                <div className="p-3 bg-[#F5F9FF] border border-[#BBDEFB] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handlePlayVoiceSample}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                        isPlayingAudio
                          ? 'bg-[#1565C0] text-white animate-bounce'
                          : 'bg-[#1976D2] hover:bg-[#1565C0] text-white shadow-xs'
                      }`}
                    >
                      {isPlayingAudio ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div>
                      <p className="text-xs font-black text-[#0D47A1]">
                        {isPlayingAudio ? 'Sedang Membaca...' : 'Dengar Sampel Suara'}
                      </p>
                      <p className="text-[10px] text-[#546E7A] font-bold">
                        Bantu anak belajar mandiri
                      </p>
                    </div>
                  </div>

                  {/* Equalizer Visualizer simulation */}
                  <div className="flex items-end gap-1 h-6">
                    <span className={`w-1 bg-[#1976D2] rounded-full transition-all ${isPlayingAudio ? 'h-5 animate-pulse' : 'h-2'}`} />
                    <span className={`w-1 bg-[#1976D2] rounded-full transition-all ${isPlayingAudio ? 'h-6 animate-bounce' : 'h-3'}`} />
                    <span className={`w-1 bg-[#1976D2] rounded-full transition-all ${isPlayingAudio ? 'h-4 animate-pulse' : 'h-1.5'}`} />
                    <span className={`w-1 bg-[#1976D2] rounded-full transition-all ${isPlayingAudio ? 'h-6 animate-bounce' : 'h-2.5'}`} />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#5D4037]">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#2E7D32]">
                    <Check className="w-3.5 h-3.5" />
                    <span>Membantu anak PAUD & TK yang belum lancar membaca</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#2E7D32]">
                    <Check className="w-3.5 h-3.5" />
                    <span>Dapat dinyalakan atau dimatikan kapan saja</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EFEBE9] flex items-center justify-between text-[11px] text-[#8D6E63] font-bold">
              <span>Fitur Standar Inklusif</span>
              <span className="text-[#1565C0]">Mendukung Audio Interaktif</span>
            </div>
          </div>

          {/* BENTO CARD 3 (col-span-12 lg:col-span-4): GAMIFICATION REWARD & STAR BURST */}
          <div className="md:col-span-12 lg:col-span-4 bg-[#FAF8F0] border-2 border-[#E7E2D6] hover:border-[#F59E0B]/70 rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFF8E1] border border-[#FFE082] text-[#D97706] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black font-heading text-[#4E342E]">
                    Reward Bintang & Piala
                  </h3>
                  <p className="text-[11px] text-[#8D6E63] font-bold">
                    Gamifikasi motivasi belajar
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#E7E2D6] space-y-3 text-center">
                <p className="text-[11px] font-bold text-[#8D6E63]">Klik bintang di bawah untuk mencoba efek reward:</p>

                <button
                  type="button"
                  onClick={handleStarClick}
                  className="w-full py-3 bg-gradient-to-r from-[#FFF8E1] to-[#FFFDF7] hover:from-[#FFE082]/40 hover:to-[#FFF8E1] border-2 border-[#FFE082] rounded-2xl flex items-center justify-center gap-2 shadow-2xs active:scale-95 transition-all cursor-pointer group"
                >
                  <Star className="w-6 h-6 text-amber-500 fill-amber-400 group-hover:scale-125 transition-transform" />
                  <span className="text-lg font-black font-heading text-[#D97706]">{demoStars} Bintang</span>
                </button>

                <div className="flex items-center justify-around pt-1 text-xs">
                  <div className="flex items-center gap-1 font-black text-[#E65100]">
                    <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                    <span>Streak {demoStreak} Hari</span>
                  </div>
                  <div className="flex items-center gap-1 font-black text-[#2E7D32]">
                    <Crown className="w-4 h-4 text-emerald-600" />
                    <span>Level Juara</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#8D6E63] font-bold mt-3 pt-2 border-t border-[#EFEBE9]">
              Anak merasa dihargai pada setiap capaian kecil.
            </p>
          </div>

          {/* BENTO CARD 4 (col-span-12 lg:col-span-8): KURIKULUM MERDEKA INTERACTIVE MATRIX */}
          <div className="md:col-span-12 lg:col-span-8 bg-[#FAF8F0] border-2 border-[#E7E2D6] hover:border-[#2E7D32]/70 rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] text-[#2E7D32] flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black font-heading text-[#4E342E]">
                      Matriks Capaian Kurikulum Merdeka
                    </h3>
                    <p className="text-[11px] text-[#8D6E63] font-bold">
                      Struktur Fase Fondasi hingga Fase C
                    </p>
                  </div>
                </div>
              </div>

              {/* Grade / Fase Tabs */}
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {GRADES_LIST.map((grade) => (
                  <button
                    key={grade.id}
                    type="button"
                    onClick={() => {
                      sound.playPop(480);
                      setSelectedFaseId(grade.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedFaseId === grade.id
                        ? 'bg-[#2E7D32] text-white shadow-xs'
                        : 'bg-white text-[#5D4037] border border-[#E7E2D6] hover:bg-[#E8F5E9]'
                    }`}
                  >
                    <span>{grade.icon}</span>
                    <span>{grade.label}</span>
                  </button>
                ))}
              </div>

              {/* Active Fase Detail Box */}
              <div className="bg-white rounded-2xl p-4 border border-[#E7E2D6] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#1565C0] bg-[#E3F2FD] px-2.5 py-0.5 rounded-full border border-[#90CAF9]">
                    {activeGradeData.fase}
                  </span>
                  <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                    Rentang Usia: {activeGradeData.ageRange}
                  </span>
                </div>

                <h4 className="text-sm font-black text-[#4E342E]">
                  Target Capaian Pembelajaran:
                </h4>
                <p className="text-xs text-[#6D4C41] font-medium leading-relaxed">
                  {activeGradeData.kurikulumDesc}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-[#EFEBE9] flex items-center justify-between text-[11px] text-[#8D6E63] font-bold">
              <span>Materi disusun runtut & menyenangkan</span>
              <span className="text-[#2E7D32]">Tersedia Modul Lengkap →</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2.5 DISNEY ANIMATED MASCOTS & CHARACTERS SHOWCASE */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#FFFDF5] via-[#FFF9E6] to-[#FAF8F0] border-2 border-[#FFE082] p-6 sm:p-10 shadow-xs">
        {/* Soft background sparkles & clouds */}
        <div className="absolute top-4 right-10 text-amber-300 animate-sparkle pointer-events-none">
          <Sparkles className="w-8 h-8 opacity-40" />
        </div>
        <div className="absolute bottom-4 left-8 text-rose-300 animate-sparkle-delayed pointer-events-none">
          <Heart className="w-8 h-8 opacity-30 fill-rose-200" />
        </div>
        
        <DisneyCharacterShowcase />
      </section>

      {/* ========================================================================= */}
      {/* 3. 21st.dev TABBED PRODUCT DEMO & FEATURE WALKTHROUGH */}
      {/* ========================================================================= */}
      <section className="bg-[#FAF8F0] rounded-3xl border-2 border-[#E7E2D6] p-6 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8E1] border border-[#FFE082] text-xs font-black text-[#B45309] mb-2">
            <Laptop className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Showcase Fitur Interaktif</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#4E342E]">
            Tur Pengalaman Aplikasi
          </h2>
          <p className="text-xs sm:text-sm text-[#6D4C41] font-medium mt-1">
            Pilih fitur untuk melihat sekilas tampilan dan kemudahan belajar anak.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          <button
            type="button"
            onClick={() => {
              sound.playPop(480);
              setActiveTourTab('module');
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeTourTab === 'module'
                ? 'bg-[#D97706] text-white shadow-xs scale-105'
                : 'bg-white text-[#5D4037] border border-[#E7E2D6] hover:bg-[#FFF8E1]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Modul Bergambar</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playPop(480);
              setActiveTourTab('quiz');
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeTourTab === 'quiz'
                ? 'bg-[#D97706] text-white shadow-xs scale-105'
                : 'bg-white text-[#5D4037] border border-[#E7E2D6] hover:bg-[#FFF8E1]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Kuis & Bank Soal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playPop(480);
              setActiveTourTab('parent');
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeTourTab === 'parent'
                ? 'bg-[#D97706] text-white shadow-xs scale-105'
                : 'bg-white text-[#5D4037] border border-[#E7E2D6] hover:bg-[#FFF8E1]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dasbor Orang Tua</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playPop(480);
              setActiveTourTab('trophy');
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeTourTab === 'trophy'
                ? 'bg-[#D97706] text-white shadow-xs scale-105'
                : 'bg-white text-[#5D4037] border border-[#E7E2D6] hover:bg-[#FFF8E1]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Koleksi Piala & Lencana</span>
          </button>
        </div>

        {/* Tab Showcase Card */}
        <div className="bg-white rounded-3xl border-2 border-[#E7E2D6] p-6 sm:p-8 max-w-4xl mx-auto shadow-2xs">
          {activeTourTab === 'module' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black text-[#D97706] uppercase tracking-wider">
                  Visual Menyenangkan
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-[#4E342E]">
                  Modul Terstruktur dengan Narasi Suara
                </h3>
                <p className="text-xs sm:text-sm text-[#6D4C41] font-medium leading-relaxed">
                  Pelajaran dipecah menjadi kartu-kartu visual ringkas. Setiap halaman dilengkapi tombol audio narasi agar anak tidak bosan dan lebih mudah menyerap materi.
                </p>
                <div className="space-y-2 text-xs font-bold text-[#4E342E]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    <span>Langkah belajar terpandu per bab</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    <span>Contoh kontekstual kehidupan sehari-hari</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFFDF7] p-5 rounded-2xl border-2 border-[#FFE082] space-y-3 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-black text-[#5D4037]">
                  <span>📘 Modul: Mengenal Hewan Herbivora</span>
                  <span className="text-[#D97706]">Hal 1/3</span>
                </div>
                <div className="text-center py-6 bg-white rounded-xl border border-[#E7E2D6] text-4xl">
                  🐘 🦒 🐇
                </div>
                <p className="text-xs font-bold text-[#4E342E] text-center">
                  "Hewan pemakan tumbuhan disebut herbivora. Contohnya gajah, jerapah, dan kelinci."
                </p>
              </div>
            </div>
          )}

          {activeTourTab === 'quiz' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black text-[#2E7D32] uppercase tracking-wider">
                  Evaluasi Mandiri
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-[#4E342E]">
                  Latihan Soal Interaktif Berhadiah
                </h3>
                <p className="text-xs sm:text-sm text-[#6D4C41] font-medium leading-relaxed">
                  Soal dirancang tidak menegangkan, dilengkapi opsi bantuan, pembahasan langsung, serta reward bintang yang memicu rasa percaya diri anak.
                </p>
                <div className="space-y-2 text-xs font-bold text-[#4E342E]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    <span>Feedback langsung benar/salah secara instan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    <span>Animasi konfeti perayaan kemenangan</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F1F8E9] p-5 rounded-2xl border-2 border-[#C8E6C9] space-y-3 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-black text-[#2E7D32]">
                  <span>🎯 Kuis Cepat: Nilai Tempat Bilangan</span>
                  <span>⭐ +3 Bintang</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#C8E6C9] text-xs font-extrabold text-[#4E342E]">
                  Pada bilangan 358, angka 5 bernilai...
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2 bg-white rounded-lg border border-[#E7E2D6] text-center">Satuan (5)</div>
                  <div className="p-2 bg-[#C8E6C9] rounded-lg border border-[#2E7D32] text-[#1B5E20] text-center font-black">Puluhan (50) ✓</div>
                </div>
              </div>
            </div>
          )}

          {activeTourTab === 'parent' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black text-[#1565C0] uppercase tracking-wider">
                  Transparansi Orang Tua
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-[#4E342E]">
                  Pantau Kemajuan Belajar Tanpa Khawatir
                </h3>
                <p className="text-xs sm:text-sm text-[#6D4C41] font-medium leading-relaxed">
                  Laporan nilai kuis, akurasi pengerjaan, dan waktu belajar tercatat rapi dalam dasbor orang tua yang terproteksi PIN.
                </p>
                <div className="space-y-2 text-xs font-bold text-[#4E342E]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    <span>Kelola profil banyak anak dalam satu akun</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    <span>Cetak dan unduh piagam kelulusan modul</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#E3F2FD] p-5 rounded-2xl border-2 border-[#90CAF9] space-y-3 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-black text-[#1565C0]">
                  <span>📊 Ringkasan Nilai Belajar Kenzo</span>
                  <span className="bg-white px-2 py-0.5 rounded-md">Rata-rata 92%</span>
                </div>
                <div className="space-y-2 bg-white p-3.5 rounded-xl border border-[#90CAF9] text-xs">
                  <div className="flex justify-between font-bold">
                    <span>Matematika (Fase A)</span>
                    <span className="text-[#2E7D32]">95% (Selesai)</span>
                  </div>
                  <div className="w-full bg-[#E0E0E0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#2E7D32] h-full w-[95%]" />
                  </div>
                  <div className="flex justify-between font-bold pt-1">
                    <span>Bahasa Indonesia (Fase A)</span>
                    <span className="text-[#1565C0]">88% (Selesai)</span>
                  </div>
                  <div className="w-full bg-[#E0E0E0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#1565C0] h-full w-[88%]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTourTab === 'trophy' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black text-[#6A1B9A] uppercase tracking-wider">
                  Koleksi Lencana
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-[#4E342E]">
                  Apresiasi Prestasi Nyata
                </h3>
                <p className="text-xs sm:text-sm text-[#6D4C41] font-medium leading-relaxed">
                  Koleksi piala unik dari berbagai mata pelajaran menumbuhkan kebiasaan belajar konsisten dan rasa bangga pada pencapaian diri.
                </p>
                <div className="space-y-2 text-xs font-bold text-[#4E342E]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    <span>Lencana Bintang Cilik, Ahli Hitung, Pejuang Pancasila</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    <span>Penghargaan streak harian rajin belajar</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F3E5F5] p-5 rounded-2xl border-2 border-[#CE93D8] space-y-3 shadow-2xs text-center">
                <span className="text-xs font-black text-[#6A1B9A]">🏆 Lemari Piala Juara</span>
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <div className="bg-white p-3 rounded-xl border border-[#CE93D8] shadow-2xs">
                    <div className="text-2xl">🌟</div>
                    <span className="text-[10px] font-black text-[#4E342E] block mt-1">Bintang 50</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#CE93D8] shadow-2xs">
                    <div className="text-2xl">🥇</div>
                    <span className="text-[10px] font-black text-[#4E342E] block mt-1">Juara Hitung</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#CE93D8] shadow-2xs">
                    <div className="text-2xl">🔥</div>
                    <span className="text-[10px] font-black text-[#4E342E] block mt-1">Streak 7 Hari</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 21st.dev PRICING SECTION WITH BILLING TOGGLE */}
      {/* ========================================================================= */}
      <section id="section-pricing-packages" className="space-y-6 pt-4 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF8E1] border border-[#FFE082] text-xs font-black text-[#B45309]">
            <Crown className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Pilihan Paket Berlangganan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-[#4E342E]">
            Investasi Edukasi Terbaik untuk Buah Hati
          </h2>
          <p className="text-xs sm:text-sm text-[#6D4C41] font-medium">
            Mulai dari uji coba gratis 7 hari tanpa komitmen. Pilih paket yang paling hemat & fleksibel.
          </p>

          {/* Billing Cycle Switch Pill */}
          <div className="pt-3 inline-flex items-center p-1 bg-white border border-[#E7E2D6] rounded-full shadow-2xs">
            <button
              type="button"
              onClick={() => {
                sound.playPop(480);
                setIsAnnualBilling(false);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                !isAnnualBilling
                  ? 'bg-[#4E342E] text-white shadow-2xs'
                  : 'text-[#8D6E63] hover:text-[#4E342E]'
              }`}
            >
              Bulanan
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPop(520);
                setIsAnnualBilling(true);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                isAnnualBilling
                  ? 'bg-[#D97706] text-white shadow-2xs'
                  : 'text-[#8D6E63] hover:text-[#4E342E]'
              }`}
            >
              <span>Tahunan</span>
              <span className="bg-[#2E7D32] text-white text-[10px] px-2 py-0.5 rounded-full">
                Hemat 40%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {activePlans.map((plan) => {
            const isPopular = plan.popular;
            const isFree = plan.price === 0;

            // Price calculation simulation for annual billing preview
            let displayPriceFormatted = plan.priceFormatted;
            let displayPeriodText = plan.periodText;
            let displaySavingsText = plan.savingsText;

            if (isAnnualBilling && plan.price > 0) {
              if (plan.id === 'plan-monthly') {
                displayPriceFormatted = 'Rp 29.000';
                displayPeriodText = '/bulan (ditagih tahunan)';
                displaySavingsText = 'Hemat Rp 240.000 per tahun';
              } else if (plan.id === 'plan-annual') {
                displayPriceFormatted = 'Rp 299.000';
                displayPeriodText = '/tahun';
                displaySavingsText = 'Paling Hemat: Gratis 2 Bulan';
              }
            }

            return (
              <div
                key={plan.id}
                id={`card-plan-${plan.id}`}
                className={`rounded-3xl border-2 p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-200 ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#FFFDE7] to-[#FFF8E1] border-[#F59E0B] shadow-md ring-2 ring-[#F59E0B]/30 scale-102'
                    : 'bg-[#FAF8F0] border-[#E7E2D6] hover:border-[#D97706] shadow-2xs'
                }`}
              >
                {/* Badge Header */}
                {plan.badgeText && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wide shadow-2xs ${
                        isPopular
                          ? 'bg-[#D97706] text-white'
                          : isFree
                          ? 'bg-[#1565C0] text-white'
                          : 'bg-[#2E7D32] text-white'
                      }`}
                    >
                      {plan.badgeText}
                    </span>
                  </div>
                )}

                <div>
                  {/* Header */}
                  <div className="mb-4 pt-1">
                    <h3 className="text-lg sm:text-xl font-black font-heading text-[#4E342E]">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-[#6D4C41] font-semibold mt-1">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price Box */}
                  <div className="py-3.5 px-4 rounded-2xl bg-white/90 border border-[#E7E2D6] mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black font-heading text-[#D97706]">
                        {displayPriceFormatted}
                      </span>
                      <span className="text-xs font-bold text-[#8D6E63]">
                        {displayPeriodText}
                      </span>
                    </div>
                    {displaySavingsText && (
                      <span className="text-[11px] font-extrabold text-[#2E7D32] mt-1 block">
                        {displaySavingsText}
                      </span>
                    )}
                    {plan.maxChildren && (
                      <span className="text-[10px] text-[#8D6E63] font-bold mt-0.5 block">
                        Kapasitas: Hingga {plan.maxChildren} Profil Anak
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-[11px] font-black text-[#8D6E63] uppercase tracking-wider block">
                      Fasilitas Paket:
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-medium text-[#4E342E]">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action */}
                <div className="pt-4 border-t border-[#EFEBE9]">
                  {isUserLoggedIn ? (
                    <button
                      type="button"
                      id={`btn-choose-plan-${plan.id}`}
                      onClick={() => {
                        sound.playPop(520);
                        openSubscriptionModal();
                      }}
                      className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
                        isPopular
                          ? 'bg-[#D97706] hover:bg-[#B45309] text-white shadow-xs'
                          : 'bg-white hover:bg-[#FFF8E1] border-2 border-[#D7CCC8] hover:border-[#D97706] text-[#4E342E]'
                      }`}
                    >
                      <Crown className="w-4 h-4 text-amber-300" />
                      <span>Pilih {plan.name}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      id={`btn-login-for-plan-${plan.id}`}
                      onClick={() => {
                        sound.playPop(520);
                        openAuthModal();
                      }}
                      className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
                        isPopular
                          ? 'bg-[#D97706] hover:bg-[#B45309] text-white shadow-xs'
                          : 'bg-white hover:bg-[#FFF8E1] border-2 border-[#D7CCC8] hover:border-[#D97706] text-[#4E342E]'
                      }`}
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Masuk untuk Mulai Paket</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Security / Payment Guarantee Banner */}
        <div className="bg-[#FAF8F0] p-4 rounded-2xl border border-[#E7E2D6] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#2E7D32] shrink-0" />
            <span className="text-xs font-bold text-[#4E342E]">
              Pembayaran Instan via QRIS (GoPay, OVO, ShopeePay), Transfer Bank & Virtual Account.
            </span>
          </div>
          <span className="text-[11px] font-extrabold text-[#8D6E63] bg-white px-3 py-1 rounded-full border border-[#E7E2D6] shrink-0">
            Garansi Edukasi Bebas Iklan 100%
          </span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 21st.dev TESTIMONIALS & PARENT REVIEWS */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-xs font-black text-[#1565C0] mb-2">
            <Heart className="w-3.5 h-3.5 text-[#1565C0]" />
            <span>Kata Orang Tua Hebat</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#4E342E]">
            Dipercaya Ribuan Keluarga Indonesia
          </h2>
          <p className="text-xs sm:text-sm text-[#6D4C41] font-medium mt-1">
            Lihat cerita bagaimana KARIA KU mendampingi proses belajar harian buah hati.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((testi) => (
            <div
              key={testi.id}
              className="bg-[#FAF8F0] p-5 sm:p-6 rounded-3xl border-2 border-[#E7E2D6] hover:border-[#D97706]/60 transition-all flex flex-col justify-between shadow-2xs"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#5D4037] font-medium leading-relaxed italic">
                  "{testi.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-[#EFEBE9]">
                <div className={`w-10 h-10 rounded-full font-black text-xs flex items-center justify-center ${testi.avatarBg}`}>
                  {testi.initial}
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#4E342E]">
                    {testi.name}
                  </h4>
                  <p className="text-[10px] text-[#8D6E63] font-bold">
                    {testi.childGrade} • {testi.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. 21st.dev FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="bg-[#FAF8F0] rounded-3xl border-2 border-[#E7E2D6] p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8E1] border border-[#FFE082] text-xs font-black text-[#B45309] mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Tanya Jawab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#4E342E]">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xs sm:text-sm text-[#6D4C41] font-medium mt-1">
            Informasi lengkap seputar kurikulum, langganan, dan keamanan akun anak.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {(['semua', 'kurikulum', 'langganan', 'fitur'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  sound.playPop(480);
                  setFaqFilter(cat);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-black capitalize transition-all cursor-pointer ${
                  faqFilter === cat
                    ? 'bg-[#4E342E] text-white shadow-2xs'
                    : 'bg-white text-[#8D6E63] border border-[#E7E2D6] hover:bg-[#FFF8E1]'
                }`}
              >
                {cat === 'semua' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {filteredFaqs.map((faq) => {
            const isOpen = expandedFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E7E2D6] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => {
                    sound.playPop(460);
                    setExpandedFaqId(isOpen ? null : faq.id);
                  }}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FFFDF7]"
                >
                  <span className="text-xs sm:text-sm font-black text-[#4E342E]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8D6E63] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#D97706]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-[#F5F2EA] text-xs text-[#6D4C41] font-medium leading-relaxed animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CALL TO ACTION FOOTER BANNER */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-r from-[#D97706] to-[#B45309] rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 shadow-md">
        <div className="w-14 h-14 mx-auto bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
          ⭐
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading">
          Mulai Petualangan Belajar Menyenangkan Hari Ini
        </h2>
        <p className="text-xs sm:text-sm text-amber-100 max-w-lg mx-auto font-medium">
          Daftarkan akun keluarga Anda sekarang dan nikmati masa uji coba gratis 7 hari tanpa resiko.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          {isUserLoggedIn ? (
            <button
              type="button"
              id="btn-footer-cta-learning"
              onClick={handleEnterApp}
              className="px-7 py-3.5 bg-white text-[#B45309] hover:bg-[#FFF8E1] rounded-2xl font-black text-xs sm:text-sm shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              Masuk ke Ruang Belajar Anak →
            </button>
          ) : (
            <>
              <button
                type="button"
                id="btn-footer-cta-login"
                onClick={() => {
                  sound.playPop(520);
                  openAuthModal();
                }}
                className="px-7 py-3.5 bg-white text-[#B45309] hover:bg-[#FFF8E1] rounded-2xl font-black text-xs sm:text-sm shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                Masuk / Login Akun
              </button>
              <button
                type="button"
                id="btn-footer-cta-register"
                onClick={() => {
                  sound.playPop(480);
                  openAuthModal('register');
                }}
                className="px-7 py-3.5 bg-black/20 hover:bg-black/30 border border-white/40 text-white rounded-2xl font-black text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Daftar Baru (Gratis 7 Hari)
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
