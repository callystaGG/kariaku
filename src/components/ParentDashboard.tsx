import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LEARNING_MODULES, GRADES_LIST } from '../data/modulesData';
import { getAvatarById } from '../data/avatars';
import { QuizAttempt, GradeId } from '../types';
import {
  Users,
  Award,
  CreditCard,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  LogOut,
  RefreshCw,
  Star,
  Printer,
  Crown,
  FileText,
  AlertCircle
} from 'lucide-react';
import { sound } from '../utils/audio';
import { getMaxChildrenForPlan, isPrintableWorksheetAllowed } from '../utils/subscriptionPermissions';
import { DEFAULT_SUBSCRIPTION_PLANS } from '../data/subscriptionPlans';

export const ParentDashboard: React.FC = () => {
  const {
    parentUser,
    activeChild,
    setActiveChildId,
    activeView,
    setActiveView,
    openAddChildModal,
    deleteChild,
    openSubscriptionModal,
    openAuthModal,
    openBankSoalModal,
    openAdminGate,
    startPracticeQuiz,
    setCurrentMode,
    logoutParent,
    resetAllData,
    subscriptionPlans,
    updateSubscription,
    openExpiryModal
  } = useApp();

  const [activeTab, setActiveTab] = useState<'progress' | 'children' | 'subscription' | 'settings'>('progress');
  const [selectedChildForReportId, setSelectedChildForReportId] = useState<string>(activeChild.id);
  const [showWorksheetModal, setShowWorksheetModal] = useState(false);
  const [worksheetGrade, setWorksheetGrade] = useState<GradeId>('sd-1');
  const [worksheetTopic, setWorksheetTopic] = useState<'tambah' | 'kurang' | 'membilang' | 'huruf'>('tambah');

  // Synchronize activeTab whenever activeView changes from header navigation
  React.useEffect(() => {
    if (activeView === 'parent_children') {
      setActiveTab('children');
    } else if (activeView === 'parent_subscription') {
      setActiveTab('subscription');
    } else if (activeView === 'parent_dashboard') {
      setActiveTab('progress');
    }
  }, [activeView]);

  const reportChild = parentUser.children.find(c => c.id === selectedChildForReportId) || activeChild;
  const avatar = getAvatarById(reportChild.avatarId);

  const maxAllowedChildren = getMaxChildrenForPlan(parentUser.activeSubscription?.planId || 'free_trial', subscriptionPlans);
  const isWorksheetAvailable = isPrintableWorksheetAllowed(parentUser.activeSubscription?.planId || 'free_trial');

  // Stats calculation
  const totalModulesCount = LEARNING_MODULES.length;
  const completedCount = reportChild.completedModules.length;
  const progressPercent = Math.round((completedCount / totalModulesCount) * 100);

  const quizAttempts = Object.values(reportChild.quizHistory) as QuizAttempt[];
  const quizScores = quizAttempts.map(q => q.highScore);
  const avgScore = quizScores.length > 0
    ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
    : 0;

  const handleTabChange = (tab: 'progress' | 'children' | 'subscription' | 'settings') => {
    sound.playPop(480);
    setActiveTab(tab);
    if (tab === 'progress') setActiveView('parent_dashboard');
    else if (tab === 'children') setActiveView('parent_children');
    else if (tab === 'subscription') setActiveView('parent_subscription');
  };

  const handlePrintWorksheet = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Parent Header Card */}
      <div className="bg-[#3E2723] text-[#FDFCF0] rounded-3xl sm:rounded-[36px] p-6 sm:p-8 shadow-md border-4 border-[#2E1C18] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFB74D]/20 border border-[#FFB74D]/40 text-[#FFE082] rounded-full text-xs font-black tracking-wider uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Dasbor Orang Tua / Wali</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-[#FDFCF0]">
              Selamat Datang, {parentUser.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#D7CCC8] mt-1">
              Akun: <span className="text-[#FAF8F0] font-semibold">{parentUser.email}</span> • Status: <span className="text-[#A5D6A7] font-bold">{parentUser.activeSubscription.planName}</span>
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              id="btn-parent-open-sub"
              onClick={openSubscriptionModal}
              className="px-4 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-black rounded-2xl text-xs sm:text-sm shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Crown className="w-4 h-4" />
              <span>Kelola Langganan</span>
            </button>

            <button
              id="btn-parent-dash-logout"
              onClick={() => {
                sound.playPop(350);
                logoutParent();
              }}
              className="px-4 py-2.5 bg-[#4E342E] hover:bg-[#2E1C18] text-[#FFCDD2] hover:text-white border border-[#8D6E63] font-black rounded-2xl text-xs sm:text-sm shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-[#EF5350]" />
              <span>Keluar Akun</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-[#4E342E]">
          {[
            { id: 'progress', label: 'Laporan Belajar Anak', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'children', label: `Kelola Profil Anak (${parentUser.children.length}/${maxAllowedChildren})`, icon: <Users className="w-4 h-4" /> },
            { id: 'subscription', label: 'Paket Langganan', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'settings', label: 'Pengaturan Akun', icon: <Settings className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              id={`parent-tab-${tab.id}`}
              onClick={() => handleTabChange(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#FAF8F0] text-[#4E342E] shadow-xs font-extrabold'
                  : 'bg-[#2E1C18]/60 text-[#D7CCC8] hover:text-[#FAF8F0] hover:bg-[#2E1C18]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: LAPORAN BELAJAR */}
      {activeTab === 'progress' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Child Switcher Ribbon if multiple children */}
          {parentUser.children.length > 1 && (
            <div className="bg-[#FAF8F0] p-3 rounded-2xl border-2 border-[#E7E2D6] flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-black text-[#8D6E63] uppercase tracking-wider pl-2 shrink-0">
                Pilih Laporan Anak:
              </span>
              <div className="flex items-center gap-2">
                {parentUser.children.map(child => {
                  const isSelected = child.id === reportChild.id;
                  const cAvatar = getAvatarById(child.avatarId);
                  return (
                    <button
                      key={child.id}
                      type="button"
                      onClick={() => {
                        sound.playPop(480);
                        setSelectedChildForReportId(child.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#D97706] text-white shadow-2xs'
                          : 'bg-[#F5F2E9] text-[#4E342E] hover:bg-[#EBE7DC]'
                      }`}
                    >
                      <span>{cAvatar.emoji}</span>
                      <span>{child.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Child Profile Summary Overview */}
          <div className="bg-[#FAF8F0] rounded-3xl p-6 sm:p-8 border-2 border-[#E7E2D6] shadow-2xs">
            <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-[#E7E2D6]">
              <div className="w-20 h-20 rounded-3xl bg-[#FFF8E1] border-3 border-[#FFE082] flex items-center justify-center text-5xl shadow-2xs">
                {avatar.emoji}
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-black font-heading text-[#4E342E]">
                    {reportChild.name}
                  </h2>
                  <span className="px-2.5 py-0.5 bg-[#FFF8E1] text-[#B45309] border border-[#FFE082] rounded-full text-xs font-black">
                    {reportChild.gradeLabel}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#8D6E63] mt-1 font-semibold">
                  Usia: {reportChild.age} Tahun • Karakter: <strong className="text-[#D97706]">{avatar.name}</strong> • Terdaftar: {reportChild.createdAt}
                </p>
              </div>

              {/* Printable Worksheet trigger */}
              <button
                type="button"
                onClick={() => {
                  sound.playPop(500);
                  if (isWorksheetAvailable) {
                    setShowWorksheetModal(true);
                  } else {
                    openSubscriptionModal();
                  }
                }}
                className="px-4 py-2.5 bg-[#FFF8E1] hover:bg-[#FFE082] text-[#B45309] border border-[#FFE082] rounded-2xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-2xs transition-transform active:scale-95"
              >
                <Printer className="w-4 h-4 text-[#D97706]" />
                <span>Cetak Lembar Kerja Anak</span>
              </button>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
              <div className="bg-[#F5F2E9] p-4 rounded-2xl border border-[#E7E2D6]">
                <div className="text-xs text-[#8D6E63] font-bold uppercase tracking-wider">Total Bintang</div>
                <div className="text-2xl font-black text-[#D97706] mt-1 font-heading flex items-center gap-1">
                  <span>{reportChild.totalStars}</span>
                  <span className="text-base">⭐</span>
                </div>
                <div className="text-[11px] text-[#6D4C41] mt-0.5">Penghargaan belajar</div>
              </div>

              <div className="bg-[#F5F2E9] p-4 rounded-2xl border border-[#E7E2D6]">
                <div className="text-xs text-[#8D6E63] font-bold uppercase tracking-wider">Modul Selesai</div>
                <div className="text-2xl font-black text-[#2E7D32] mt-1 font-heading">
                  {completedCount} <span className="text-xs text-[#8D6E63] font-bold">/ {totalModulesCount}</span>
                </div>
                <div className="text-[11px] text-[#6D4C41] mt-0.5">{progressPercent}% kurikulum tuntas</div>
              </div>

              <div className="bg-[#F5F2E9] p-4 rounded-2xl border border-[#E7E2D6]">
                <div className="text-xs text-[#8D6E63] font-bold uppercase tracking-wider">Rata-Rata Kuis</div>
                <div className="text-2xl font-black text-[#1565C0] mt-1 font-heading">
                  {avgScore} <span className="text-xs font-bold text-[#8D6E63]">/100</span>
                </div>
                <div className="text-[11px] text-[#6D4C41] mt-0.5">{quizScores.length} kuis dikerjakan</div>
              </div>

              <div className="bg-[#F5F2E9] p-4 rounded-2xl border border-[#E7E2D6]">
                <div className="text-xs text-[#8D6E63] font-bold uppercase tracking-wider">Lencana Juara</div>
                <div className="text-2xl font-black text-[#5E35B1] mt-1 font-heading flex items-center gap-1">
                  <span>{reportChild.badgesEarned.length}</span>
                  <span className="text-base">🏆</span>
                </div>
                <div className="text-[11px] text-[#6D4C41] mt-0.5">Koleksi prestasi</div>
              </div>
            </div>
          </div>

          {/* Detailed Progress Table */}
          <div className="bg-[#FAF8F0] rounded-3xl p-6 border-2 border-[#E7E2D6] shadow-2xs">
            <h3 className="text-lg font-black font-heading text-[#4E342E] mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D97706]" />
              <span>Detail Progres Modul & Nilai Kuis</span>
            </h3>

            <div className="divide-y divide-[#E7E2D6]">
              {LEARNING_MODULES.map(module => {
                const isCompleted = reportChild.completedModules.includes(module.id);
                const quizAttempt = reportChild.quizHistory[module.id];

                return (
                  <div key={module.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl w-10 h-10 rounded-xl bg-[#F5F2E9] flex items-center justify-center shrink-0 border border-[#E7E2D6]">
                        {module.coverEmoji}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-[#4E342E]">{module.title}</h4>
                        <p className="text-xs text-[#8D6E63] font-medium">{module.shortDesc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:text-right shrink-0">
                      {isCompleted ? (
                        <span className="px-2.5 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-bold flex items-center gap-1 border border-[#C8E6C9]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-[#FFF8E1] text-[#B45309] rounded-full text-xs font-bold border border-[#FFE082]">
                          Belum Selesai
                        </span>
                      )}

                      <div className="min-w-[70px] text-right">
                        <div className="text-[10px] text-[#8D6E63] font-bold">Skor Kuis</div>
                        <div className="font-black text-sm text-[#4E342E]">
                          {quizAttempt ? `${quizAttempt.highScore}/100 🎯` : '-'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI / Parent Recommendation Note */}
          <div className="bg-[#FFF8E1] rounded-3xl p-6 border-2 border-[#FFE082] shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D97706] text-white flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                💡
              </div>
              <div>
                <h4 className="text-base font-black text-[#4E342E] font-heading">
                  Catatan Rekomendasi Pintar untuk Bunda & Ayah:
                </h4>
                <p className="text-xs sm:text-sm text-[#5D4037] mt-1 leading-relaxed font-medium">
                  {reportChild.name} menunjukkan pemahaman yang sangat baik dalam membilang angka 1-20 dan penjumlahan. Untuk mengoptimalkan daya ingat konsep pengurangan, Anda dapat mengajak ananda berlatih 10 menit setiap sore dengan objek nyata di rumah (seperti buah atau mainan balok).
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-[#B45309]">
                  <span>🎯 Langkah berikutnya:</span>
                  <span className="underline">Buka Modul Pengurangan Asyik bersama anak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Soal & Kurikulum Coverage Card */}
          <div className="bg-[#FAF8F0] rounded-3xl p-6 border-2 border-[#E7E2D6] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] flex items-center justify-center text-2xl shrink-0">
                ⚡
              </div>
              <div>
                <h4 className="text-base font-black text-[#4E342E] font-heading">
                  Bank Soal & Materi Merdeka (500+ Soal & Acak Otomatis)
                </h4>
                <p className="text-xs text-[#6D4C41] font-semibold mt-0.5">
                  Tersedia untuk jenjang PAUD, TK, SD 1, SD 2, SD 3, dan SD 4-6 dengan algoritma randomisasi dinamis.
                </p>
              </div>
            </div>

            <button
              id="btn-parent-test-banksoal"
              onClick={() => {
                sound.playPop(520);
                setCurrentMode('child');
                openBankSoalModal();
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white rounded-2xl font-black text-xs shadow-xs hover:from-[#B45309] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>🚀 Uji Coba Bank Soal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: KELOLA PROFIL ANAK */}
      {activeTab === 'children' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-black font-heading text-[#4E342E]">
                Profil Anak Terdaftar
              </h3>
              <p className="text-xs text-[#8D6E63] font-semibold">
                Kuota Paket {parentUser.activeSubscription.planName}: <strong className="text-[#4E342E]">{parentUser.children.length} dari {maxAllowedChildren} profil anak</strong> terpakai.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {parentUser.children.length >= maxAllowedChildren && (
                <button
                  type="button"
                  onClick={openSubscriptionModal}
                  className="px-3.5 py-2 bg-[#FFF8E1] hover:bg-[#FFE082] text-[#B45309] border border-[#FFE082] rounded-2xl font-black text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Crown className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Tambah Kuota Profil</span>
                </button>
              )}

              <button
                type="button"
                id="btn-add-new-child-trigger"
                onClick={openAddChildModal}
                className="px-4 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl font-black text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Anak Baru</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parentUser.children.map(child => {
              const cAvatar = getAvatarById(child.avatarId);
              const isActive = child.id === activeChild.id;

              return (
                <div
                  key={child.id}
                  id={`child-manage-card-${child.id}`}
                  className={`bg-[#FAF8F0] rounded-3xl p-5 border-3 transition-all flex flex-col justify-between ${
                    isActive ? 'border-[#D97706] ring-2 ring-[#FFB74D] shadow-xs' : 'border-[#E7E2D6]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-[#FFF8E1] border-2 border-[#FFE082] flex items-center justify-center text-3xl shadow-2xs">
                        {cAvatar.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-base text-[#4E342E]">{child.name}</h4>
                          {isActive && (
                            <span className="px-2 py-0.5 bg-[#FFF8E1] text-[#B45309] rounded-full text-[10px] font-black border border-[#FFE082]">
                              Sedang Aktif
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#8D6E63] font-semibold">
                          {child.gradeLabel} • {child.age} Tahun
                        </p>
                        <p className="text-xs text-[#D97706] font-bold mt-0.5">
                          Karakter: {cAvatar.name}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      id={`btn-delete-child-${child.id}`}
                      onClick={() => {
                        if (confirm(`Yakin ingin menghapus profil ${child.name}?`)) {
                          deleteChild(child.id);
                        }
                      }}
                      className="p-2 text-[#A1887F] hover:text-[#C62828] rounded-xl hover:bg-[#FFEBEE] transition-colors cursor-pointer"
                      title="Hapus Profil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Stats Pill */}
                  <div className="grid grid-cols-3 gap-2 bg-[#F5F2E9] p-2.5 rounded-2xl border border-[#E7E2D6] text-center mb-4">
                    <div>
                      <div className="text-[10px] text-[#8D6E63] font-bold uppercase">Bintang</div>
                      <div className="font-black text-[#D97706] text-sm">{child.totalStars} ⭐</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#8D6E63] font-bold uppercase">Modul</div>
                      <div className="font-black text-[#2E7D32] text-sm">{child.completedModules.length} Selesai</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#8D6E63] font-bold uppercase">Lencana</div>
                      <div className="font-black text-[#5E35B1] text-sm">{child.badgesEarned.length} 🏆</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    id={`btn-activate-child-${child.id}`}
                    onClick={() => {
                      setActiveChildId(child.id);
                    }}
                    className={`w-full py-2 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#FFF8E1] text-[#5D4037] border border-[#FFE082]'
                        : 'bg-[#F5F2E9] hover:bg-[#EBE7DC] text-[#4E342E]'
                    }`}
                  >
                    {isActive ? 'Profil Sedang Digunakan' : 'Pilih Jadi Profil Aktif'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: LANGGANAN */}
      {activeTab === 'subscription' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Expiry Alert Card (1 Week Notice Feature) */}
          <div className="bg-gradient-to-r from-[#FFF8E1] via-[#FFE082] to-[#FFD54F] rounded-3xl p-5 sm:p-6 border-2 border-[#FFB74D] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#D97706] text-white flex items-center justify-center text-2xl shadow-sm shrink-0">
                ⏳
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#D97706] text-white text-[10px] font-black uppercase rounded-full">
                    Sistem Pengingat 7 Hari
                  </span>
                  <span className="text-xs font-bold text-[#5D4037]">Otomatis Pop-Up 80% Layar</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-[#3E2723] mt-0.5">
                  Notifikasi Berlangganan 1 Minggu Sebelum Paket Habis
                </h4>
                <p className="text-xs text-[#5D4037] font-semibold mt-0.5">
                  Pop-up interaktif akan muncul secara otomatis 7 hari sebelum masa berlaku berakhir agar ananda tidak kehilangan akses belajar.
                </p>
              </div>
            </div>

            <button
              type="button"
              id="btn-preview-expiry-modal"
              onClick={() => {
                sound.playPop(500);
                openExpiryModal();
              }}
              className="px-5 py-3 bg-[#3E2723] hover:bg-[#2E1C18] text-[#FFE082] rounded-2xl font-black text-xs sm:text-sm shadow-sm transition-transform active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer border border-[#8D6E63]"
            >
              <Sparkles className="w-4 h-4 text-[#FFE082]" />
              <span>Buka Pratinjau Pop-Up (80% Layar)</span>
            </button>
          </div>

          {/* Active Plan Overview */}
          <div className="bg-[#FAF8F0] rounded-3xl p-6 sm:p-8 border-2 border-[#E7E2D6] shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E2D6]">
              <div>
                <span className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-black tracking-wide uppercase inline-block mb-1">
                  Langganan Aktif
                </span>
                <h3 className="text-2xl font-black font-heading text-[#4E342E]">
                  {parentUser.activeSubscription.planName}
                </h3>
                <p className="text-xs sm:text-sm text-[#8D6E63] mt-0.5 font-semibold">
                  Tagihan: <strong className="text-[#4E342E]">{parentUser.activeSubscription.priceFormatted}</strong> • Berlaku hingga <strong className="text-[#4E342E]">{parentUser.activeSubscription.expiresAt}</strong>
                </p>
              </div>

              <button
                type="button"
                id="btn-upgrade-plan-tab"
                onClick={openSubscriptionModal}
                className="px-6 py-3 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] text-white rounded-2xl font-black text-xs sm:text-sm shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                Ubah / Perpanjang Paket
              </button>
            </div>

            {/* Feature Checklist */}
            <div className="mt-6">
              <h4 className="text-xs font-black text-[#8D6E63] uppercase tracking-wider mb-3">
                Keuntungan yang Anda Nikmati:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-[#4E342E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>Akses kurikulum interaktif Matematika & Calistung</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>Audio narasi ramah anak otomatis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>Mendukung hingga {maxAllowedChildren} profil anak sekaligus</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>Laporan analitik detail & bebas iklan 100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Plan Switcher Comparison */}
          <div className="bg-[#FAF8F0] rounded-3xl p-6 border-2 border-[#E7E2D6] shadow-2xs">
            <h4 className="font-black text-base text-[#4E342E] mb-4">
              Pilihan Paket Berlangganan Karia Ku
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DEFAULT_SUBSCRIPTION_PLANS.map(plan => {
                const isCurrent = parentUser.activeSubscription.planId === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`rounded-2xl p-4 border-2 flex flex-col justify-between transition-all ${
                      isCurrent
                        ? 'border-[#2E7D32] bg-[#E8F5E9]/50 shadow-2xs ring-2 ring-[#81C784]/30'
                        : 'border-[#E7E2D6] bg-white hover:border-[#D97706]'
                    }`}
                  >
                    <div>
                      {isCurrent && (
                        <span className="px-2 py-0.5 bg-[#2E7D32] text-white text-[9px] font-black uppercase rounded-full tracking-wider mb-2 inline-block">
                          Paket Saat Ini
                        </span>
                      )}
                      {plan.badgeText && !isCurrent && (
                        <span className="px-2 py-0.5 bg-[#D97706] text-white text-[9px] font-black uppercase rounded-full tracking-wider mb-2 inline-block">
                          {plan.badgeText}
                        </span>
                      )}
                      <h5 className="font-black text-sm text-[#4E342E]">{plan.name}</h5>
                      <div className="text-base font-black text-[#D97706] mt-1">{plan.priceFormatted}</div>
                      <p className="text-[11px] text-[#8D6E63] mt-1 font-medium">{plan.subtitle}</p>
                      
                      <ul className="mt-3 space-y-1.5 text-[11px] text-[#5D4037] font-semibold">
                        {plan.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-[#2E7D32] shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E7E2D6]">
                      {isCurrent ? (
                        <button
                          type="button"
                          disabled
                          className="w-full py-2 bg-[#E8F5E9] text-[#2E7D32] text-xs font-black rounded-xl cursor-default"
                        >
                          Sedang Digunakan
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            sound.playPop(520);
                            openSubscriptionModal();
                          }}
                          className="w-full py-2 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-black rounded-xl transition-all shadow-2xs cursor-pointer"
                        >
                          Pilih Paket Ini
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment History UI */}
          <div className="bg-[#FAF8F0] rounded-3xl p-6 border-2 border-[#E7E2D6] shadow-2xs">
            <h4 className="font-black text-base text-[#4E342E] mb-3">
              Riwayat Pembayaran & Faktur
            </h4>
            <div className="divide-y divide-[#E7E2D6] text-xs sm:text-sm">
              <div className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-extrabold text-[#4E342E]">{parentUser.activeSubscription.planName}</div>
                  <div className="text-[#8D6E63] text-xs font-medium">{parentUser.activeSubscription.startedAt} • QRIS Automatic</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-[#4E342E]">{parentUser.activeSubscription.priceFormatted}</div>
                  <span className="text-[10px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                    Berhasil
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PENGATURAN AKUN */}
      {activeTab === 'settings' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#FAF8F0] rounded-3xl p-6 border-2 border-[#E7E2D6] shadow-2xs space-y-4">
            <h3 className="text-lg font-black font-heading text-[#4E342E]">
              Informasi Akun Orang Tua
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#8D6E63] mb-1">Nama Orang Tua</label>
                <div className="p-3 bg-[#FDFCF0] rounded-xl border border-[#E7E2D6] font-bold text-sm text-[#4E342E]">
                  {parentUser.name}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8D6E63] mb-1">Alamat Email</label>
                <div className="p-3 bg-[#FDFCF0] rounded-xl border border-[#E7E2D6] font-bold text-sm text-[#4E342E]">
                  {parentUser.email}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E2D6] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={openAdminGate}
                className="text-xs font-bold text-[#8D6E63] hover:text-[#4E342E] flex items-center gap-1 cursor-pointer"
              >
                <span>🔑 Masuk ke Portal Admin Sistem</span>
              </button>

              <button
                type="button"
                onClick={logoutParent}
                className="px-4 py-2 bg-[#FFEBEE] text-[#C62828] hover:bg-[#FFCDD2] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar Akun Orang Tua</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Worksheet Modal */}
      {showWorksheetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F0] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-4 border-[#FFE082] relative animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">🖨️</span>
                <div>
                  <h3 className="text-xl font-black font-heading text-[#4E342E]">
                    Lembar Kerja Latihan Mandiri
                  </h3>
                  <p className="text-xs text-[#8D6E63] font-semibold">
                    Siap dicetak untuk latihan anak di rumah tanpa gawai!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowWorksheetModal(false)}
                className="p-2 text-[#8D6E63] hover:text-[#4E342E] rounded-full hover:bg-[#F5F2E9] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Selection */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-[#8D6E63] mb-1.5 uppercase tracking-wider">
                  1. Pilih Topik Lembar Kerja:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-black">
                  {[
                    { id: 'tambah', label: '➕ Penjumlahan Ceria' },
                    { id: 'kurang', label: '➖ Pengurangan Asyik' },
                    { id: 'membilang', label: '🔢 Membilang Objek' },
                    { id: 'huruf', label: '🔤 Mengenal Huruf Vokal' }
                  ].map(top => (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => setWorksheetTopic(top.id as any)}
                      className={`p-2.5 rounded-xl border-2 text-center cursor-pointer transition-all ${
                        worksheetTopic === top.id
                          ? 'border-[#D97706] bg-[#FFF8E1] text-[#4E342E] shadow-2xs'
                          : 'border-[#E7E2D6] bg-white text-[#6D4C41]'
                      }`}
                    >
                      {top.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Printable Worksheet Preview Card */}
              <div className="bg-white p-5 rounded-2xl border-2 border-dashed border-[#BCAAA4] space-y-3 font-mono text-xs text-[#3E2723]">
                <div className="text-center pb-2 border-b border-[#D7CCC8]">
                  <div className="font-black text-sm font-sans text-[#4E342E]">KARIA KU - LEMBAR LATIHAN MANDIRI</div>
                  <div className="text-[10px] text-[#8D6E63]">Nama: {reportChild.name} | Kelas: {reportChild.gradeLabel} | Tanggal: ____________</div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-2">
                  <div className="p-2 border border-[#E7E2D6] rounded-lg">1. 🍎🍎 + 🍎🍎🍎 = [ &nbsp; ]</div>
                  <div className="p-2 border border-[#E7E2D6] rounded-lg">2. ⭐⭐⭐ + ⭐⭐ = [ &nbsp; ]</div>
                  <div className="p-2 border border-[#E7E2D6] rounded-lg">3. 🐱🐱🐱🐱 + 🐱 = [ &nbsp; ]</div>
                  <div className="p-2 border border-[#E7E2D6] rounded-lg">4. 🎈🎈 + 🎈🎈🎈🎈 = [ &nbsp; ]</div>
                </div>

                <div className="text-right text-[10px] text-[#8D6E63] italic pt-1">
                  Nilai: _______ / 100 ⭐
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePrintWorksheet}
                className="flex-1 py-3 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Lembar Soal Ini (Print)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
