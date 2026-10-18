import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { ChildDashboard } from './components/ChildDashboard';
import { HomePanel } from './components/HomePanel';
import { ModuleViewer } from './components/ModuleViewer';
import { QuizPlayer } from './components/QuizPlayer';
import { KawanGame } from './components/KawanGame';
import { ParentDashboard } from './components/ParentDashboard';
import { AdminPortal } from './components/AdminPortal';
import { ParentalGateModal } from './components/ParentalGateModal';
import { AuthModal } from './components/AuthModal';
import { AddChildModal } from './components/AddChildModal';
import { BadgeShowcaseModal } from './components/BadgeShowcaseModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { BankSoalModal } from './components/BankSoalModal';
import { SubscriptionExpiryModal } from './components/SubscriptionExpiryModal';
import { AdminGateModal } from './components/AdminGateModal';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentMode, activeView, openParentalGate } = useApp();

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-[#4E342E] flex flex-col justify-between selection:bg-[#FFD54F]/40">
      {/* Top Navbar */}
      <Navbar />

      {/* Main App Content View */}
      <main className="flex-1 pb-10">
        {activeView === 'home_panel' ? (
          <HomePanel />
        ) : activeView === 'module_learning' ? (
          <ModuleViewer />
        ) : activeView === 'quiz' ? (
          <QuizPlayer />
        ) : activeView === 'kawan_game' ? (
          <KawanGame />
        ) : currentMode === 'admin' ? (
          <AdminPortal />
        ) : currentMode === 'parent' ? (
          <ParentDashboard />
        ) : (
          <ChildDashboard />
        )}
      </main>

      {/* Natural Tones Warm Footer */}
      <footer className="border-t-2 border-[#E7E2D6] bg-[#FAF8F0]/90 backdrop-blur-xs py-4 px-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8D6E63] font-bold">
          <div className="flex items-center gap-1.5">
            <span className="font-heading font-black text-[#D97706] text-sm">KARIA KU</span>
            <span>— Platform Belajar Interaktif Ceria PAUD s/d SD Kelas 6</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openParentalGate}
              className="text-[#6D4C41] hover:text-[#D97706] flex items-center gap-1 transition-colors font-extrabold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Dasbor Orang Tua</span>
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#A1887F]">
              Dibuat dengan <Heart className="w-3 h-3 text-[#E57373] fill-[#E57373]" /> untuk Anak Indonesia
            </span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <ParentalGateModal />
      <AuthModal />
      <AddChildModal />
      <BadgeShowcaseModal />
      <SubscriptionModal />
      <BankSoalModal />
      <SubscriptionExpiryModal />
      <AdminGateModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
