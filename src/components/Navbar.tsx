import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getAvatarById } from '../data/avatars';
import {
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Award,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  UserCheck,
  ShieldAlert,
  KeyRound,
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  MoreVertical,
  SlidersHorizontal,
  CheckCircle2,
  Crown,
  LogIn,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/audio';

export const Navbar: React.FC = () => {
  const {
    activeChild,
    parentUser,
    currentMode,
    setCurrentMode,
    activeView,
    setActiveView,
    openParentalGate,
    openBadgeModal,
    openAuthModal,
    openBankSoalModal,
    openSubscriptionModal,
    openAdminGate,
    isAdminAuthenticated,
    logoutAdmin,
    logoutParent,
    adminSelectedTab,
    setAdminSelectedTab,
    soundEnabled,
    toggleSound,
    speechEnabled,
    toggleSpeech,
    setActiveChildId
  } = useApp();

  const [isChildDropdownOpen, setIsChildDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const childDropdownRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const avatar = getAvatarById(activeChild.avatarId);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (childDropdownRef.current && !childDropdownRef.current.contains(event.target as Node)) {
        setIsChildDropdownOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleReturnToChild = () => {
    sound.playPop(500);
    setCurrentMode('child');
    setActiveView('child_home');
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  };

  const handleGoToParent = () => {
    sound.playPop(480);
    setCurrentMode('parent');
    setActiveView('parent_dashboard');
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  };

  const isUserLoggedIn = Boolean(
    parentUser &&
    parentUser.id !== 'parent-guest' &&
    parentUser.email &&
    parentUser.email.trim().length > 0
  );

  const handleLogoClick = () => {
    sound.playPop(440);
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
    if (currentMode === 'admin') {
      setActiveView('admin_portal');
      setAdminSelectedTab('overview');
    } else if (activeView === 'home_panel' || !isUserLoggedIn) {
      setActiveView('home_panel');
    } else if (currentMode === 'child') {
      setActiveView('child_home');
    } else {
      setActiveView('parent_dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F0]/95 backdrop-blur-md border-b border-[#E7E2D6] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Logo - Clean & Compact */}
        <button
          id="btn-logo-home"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 group text-left focus:outline-none cursor-pointer select-none"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[#FFB74D] to-[#FFD54F] p-0.5 shadow-2xs group-hover:scale-105 transition-transform flex items-center justify-center border border-[#FFE082]">
            <div className="w-full h-full bg-[#FAF8F0] rounded-[13px] flex items-center justify-center text-lg sm:text-xl font-black text-[#D97706]">
              ⭐
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-lg sm:text-xl font-black font-heading tracking-tight text-[#4E342E]">
                KARIA KU
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-[#FFF8E1] text-[#B45309] rounded-md border border-[#FFE082]">
                {currentMode === 'admin' ? 'ADMIN' : currentMode === 'parent' ? 'ORTU' : 'PAUD - SD 6'}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-semibold text-[#8D6E63] mt-0.5 hidden sm:block">
              {currentMode === 'admin'
                ? 'Portal Kontrol Administrator'
                : currentMode === 'parent'
                ? 'Dasbor Pendamping Belajar'
                : 'Belajar Interaktif Ceria'}
            </p>
          </div>
        </button>

        {/* ========================================================================= */}
        {/* MODE 0: HOME PANEL / LANDING NAVBAR */}
        {/* ========================================================================= */}
        {activeView === 'home_panel' && (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              id="btn-nav-subscription-packages"
              onClick={() => {
                sound.playPop(480);
                const el = document.getElementById('section-pricing-packages');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else openSubscriptionModal();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFF8E1] hover:bg-[#FFE082]/50 text-[#5D4037] border border-[#FFE082] rounded-full font-black text-xs transition-colors cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Paket Langganan</span>
            </button>

            {isUserLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btn-nav-enter-app"
                  onClick={() => {
                    sound.playPop(520);
                    setCurrentMode('child');
                    setActiveView('child_home');
                  }}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full font-black text-xs sm:text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <span>Masuk Belajar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  id="btn-nav-logout-home"
                  onClick={() => {
                    sound.playPop(350);
                    logoutParent();
                  }}
                  title="Keluar dari Akun"
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#FFEBEE] hover:bg-[#FFCDD2] text-[#C62828] border border-[#EF9A9A] rounded-full font-black text-xs transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btn-nav-login-home"
                  onClick={() => {
                    sound.playPop(480);
                    openAuthModal();
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#4E342E] hover:bg-[#3E2723] text-white rounded-full font-extrabold text-xs sm:text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#FFD54F]" />
                  <span>Masuk Akun</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 1: CHILD LEARNING NAVBAR (SIMPLIFIED & HARMONIOUS) */}
        {/* ========================================================================= */}
        {activeView !== 'home_panel' && currentMode === 'child' && (
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* 1. Unified Child Profile & Star Capsule */}
            <div className="relative" ref={childDropdownRef}>
              <button
                type="button"
                id="btn-child-profile-capsule"
                onClick={() => {
                  sound.playPop(460);
                  if (parentUser.children.length > 1) {
                    setIsChildDropdownOpen(prev => !prev);
                  } else {
                    openBadgeModal();
                  }
                }}
                className="flex items-center gap-1.5 sm:gap-2 pl-2 pr-2.5 py-1 sm:py-1.5 bg-[#FFF8E1] hover:bg-[#FFF3E0] border border-[#FFE082] rounded-full text-[#4E342E] shadow-2xs transition-all active:scale-98 cursor-pointer"
              >
                <span className="text-base sm:text-lg">{avatar.emoji}</span>
                <span className="text-xs sm:text-sm font-black max-w-[70px] sm:max-w-[100px] truncate">
                  {activeChild.name.split(' ')[0]}
                </span>
                
                {/* Stars Counter integrated inside the pill */}
                <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-[#FFD54F] to-[#FFB74D] text-[#3E2723] rounded-full text-xs font-black border border-[#FFE082]">
                  <span className="text-[11px]">⭐</span>
                  <span>{activeChild.totalStars}</span>
                </div>

                {parentUser.children.length > 1 && (
                  <ChevronDown className="w-3 h-3 text-[#8D6E63]" />
                )}
              </button>

              {/* Sibling switcher dropdown if multiple children */}
              {isChildDropdownOpen && parentUser.children.length > 1 && (
                <div className="absolute right-0 mt-2 w-52 bg-[#FAF8F0] border-2 border-[#E7E2D6] rounded-2xl shadow-xl p-2 z-50 animate-fadeIn">
                  <p className="text-[10px] font-black text-[#8D6E63] px-2 py-1 uppercase tracking-wider">
                    Pilih Profil Belajar:
                  </p>
                  {parentUser.children.map(child => {
                    const cAvatar = getAvatarById(child.avatarId);
                    const isCurrent = child.id === activeChild.id;
                    return (
                      <button
                        key={child.id}
                        type="button"
                        id={`btn-select-child-${child.id}`}
                        onClick={() => {
                          sound.playPop(520);
                          setActiveChildId(child.id);
                          setIsChildDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left text-xs font-bold transition-colors cursor-pointer ${
                          isCurrent ? 'bg-[#FFB74D] text-[#3E2723]' : 'hover:bg-[#FFF8E1] text-[#4E342E]'
                        }`}
                      >
                        <span className="text-base">{cAvatar.emoji}</span>
                        <div className="flex-1 truncate">
                          <div className="font-black">{child.name}</div>
                          <div className={`text-[10px] ${isCurrent ? 'text-[#4E342E]' : 'text-[#8D6E63]'}`}>
                            {child.gradeLabel} • {child.totalStars} ⭐
                          </div>
                        </div>
                        {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-[#3E2723]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Audio Toggle Quick Button */}
            <button
              type="button"
              id="btn-toggle-sound"
              onClick={() => toggleSound()}
              title={soundEnabled ? 'Suara Efek Aktif (Klik untuk Mematikan)' : 'Suara Efek Mati (Klik untuk Mengaktifkan)'}
              aria-label="Toggle Sound"
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-[#E8F5E9] border-[#A5D6A7] text-[#2E7D32] hover:bg-[#C8E6C9]'
                  : 'bg-[#F5F2E9] border-[#D7CCC8] text-[#A1887F]'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* 4. More Options Dropdown (Cleans up extra clutter) */}
            <div className="relative" ref={moreMenuRef}>
              <button
                type="button"
                id="btn-nav-more-options"
                onClick={() => {
                  sound.playPop(420);
                  setIsMoreMenuOpen(prev => !prev);
                }}
                title="Menu Lainnya"
                className="p-2 bg-[#F5F2E9] hover:bg-[#EFEBE9] border border-[#D7CCC8] rounded-full text-[#6D4C41] transition-colors cursor-pointer"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Simplified Quick Dropdown Menu */}
              {isMoreMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#FAF8F0] border-2 border-[#E7E2D6] rounded-2xl shadow-xl p-2 z-50 animate-fadeIn">
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPop(500);
                        setIsMoreMenuOpen(false);
                        openBadgeModal();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#4E342E] hover:bg-[#EDE7F6] hover:text-[#4527A0] transition-colors cursor-pointer text-left"
                    >
                      <Award className="w-4 h-4 text-[#5E35B1]" />
                      <div className="flex-1">
                        <div className="font-black">Ruang Badge & Piala</div>
                        <div className="text-[10px] text-[#8D6E63]">
                          {activeChild.badgesEarned.length} piala terkumpul
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playPop(520);
                        setIsMoreMenuOpen(false);
                        openBankSoalModal();
                      }}
                      className="w-full sm:hidden flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#4E342E] hover:bg-[#FFF8E1] hover:text-[#B45309] transition-colors cursor-pointer text-left"
                    >
                      <Sparkles className="w-4 h-4 text-[#D97706]" />
                      <div className="flex-1 font-black">Bank Soal (500+ Soal)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        toggleSpeech();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#4E342E] hover:bg-[#E3F2FD] hover:text-[#1565C0] transition-colors cursor-pointer text-left"
                    >
                      {speechEnabled ? (
                        <Mic className="w-4 h-4 text-[#1565C0]" />
                      ) : (
                        <MicOff className="w-4 h-4 text-[#8D6E63]" />
                      )}
                      <div className="flex-1">
                        <div className="font-black">Narasi Suara Anak</div>
                        <div className="text-[10px] text-[#8D6E63]">
                          {speechEnabled ? 'Aktif' : 'Nonaktif'}
                        </div>
                      </div>
                    </button>

                    <div className="pt-1 border-t border-[#E7E2D6] space-y-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          sound.playPop(480);
                          setIsMoreMenuOpen(false);
                          openAdminGate();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#6A1B9A] hover:bg-[#EDE7F6] transition-colors cursor-pointer text-left"
                      >
                        <ShieldAlert className="w-4 h-4 text-[#8E24AA]" />
                        <span>Login Portal Admin</span>
                      </button>

                      {isUserLoggedIn && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsMoreMenuOpen(false);
                            logoutParent();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#C62828] hover:bg-[#FFEBEE] transition-colors cursor-pointer text-left"
                        >
                          <LogOut className="w-4 h-4 text-[#C62828]" />
                          <span>Keluar Akun (Logout)</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Primary Parent Area Button - Clean & High Contrast */}
            <button
              type="button"
              id="btn-open-parent-gate"
              onClick={() => {
                sound.playPop(480);
                openParentalGate();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#4E342E] hover:bg-[#3E2723] text-white rounded-full font-extrabold text-xs sm:text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFD54F]" />
              <span>Area Ortu</span>
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: PARENT DASHBOARD NAVBAR (CLEAN SEGMENTED CONTROL) */}
        {/* ========================================================================= */}
        {currentMode === 'parent' && (
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Clean Segmented Control */}
            <div className="hidden md:flex items-center bg-[#EFEBE9] p-0.5 rounded-full border border-[#D7CCC8]">
              <button
                type="button"
                id="tab-nav-reports"
                onClick={() => {
                  sound.playPop(480);
                  setActiveView('parent_dashboard');
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'parent_dashboard'
                    ? 'bg-white text-[#4E342E] shadow-2xs'
                    : 'text-[#6D4C41] hover:text-[#3E2723]'
                }`}
              >
                Progres
              </button>
              <button
                type="button"
                id="tab-nav-children"
                onClick={() => {
                  sound.playPop(480);
                  setActiveView('parent_children');
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'parent_children'
                    ? 'bg-white text-[#4E342E] shadow-2xs'
                    : 'text-[#6D4C41] hover:text-[#3E2723]'
                }`}
              >
                Profil Anak ({parentUser.children.length})
              </button>
              <button
                type="button"
                id="tab-nav-sub"
                onClick={() => {
                  sound.playPop(480);
                  setActiveView('parent_subscription');
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'parent_subscription'
                    ? 'bg-white text-[#4E342E] shadow-2xs'
                    : 'text-[#6D4C41] hover:text-[#3E2723]'
                }`}
              >
                Langganan
              </button>
            </div>

            {/* Parent Account / Login Pill */}
            <button
              type="button"
              id="btn-parent-auth-modal"
              onClick={() => {
                sound.playPop(480);
                openAuthModal();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F0] hover:bg-[#F5F2E9] rounded-full text-xs font-bold text-[#4E342E] border border-[#D7CCC8] cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span className="max-w-[80px] truncate">{parentUser.name.split(' ')[0]}</span>
            </button>

            {/* Return to Child Learning Mode */}
            <button
              type="button"
              id="btn-return-child-mode"
              onClick={handleReturnToChild}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-full font-extrabold text-xs sm:text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Belajar</span>
              <span className="text-sm">{avatar.emoji}</span>
            </button>

            {/* Logout Parent Button */}
            <button
              type="button"
              id="btn-parent-logout"
              onClick={() => {
                sound.playPop(350);
                logoutParent();
              }}
              title="Keluar dari Akun Orang Tua"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#FFEBEE] hover:bg-[#FFCDD2] text-[#C62828] border border-[#EF9A9A] rounded-full font-extrabold text-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              id="btn-parent-mobile-menu"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="p-1.5 md:hidden bg-[#F5F2E9] border border-[#D7CCC8] rounded-xl text-[#4E342E] cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 3: ADMIN PORTAL NAVBAR (CLEAN ADMIN CONTROLS) */}
        {/* ========================================================================= */}
        {currentMode === 'admin' && (
          <div className="flex items-center gap-2">
            {/* Desktop Tabs */}
            <div className="hidden lg:flex items-center bg-[#EDE7F6] p-0.5 rounded-full border border-[#D1C4E9]">
              {[
                { id: 'overview', label: 'Ringkasan', icon: <LayoutDashboard className="w-3 h-3" /> },
                { id: 'users', label: 'Pengguna', icon: <Users className="w-3 h-3" /> },
                { id: 'packages', label: 'Paket', icon: <Package className="w-3 h-3" /> },
                { id: 'transactions', label: 'Transaksi', icon: <CreditCard className="w-3 h-3" /> },
                { id: 'settings', label: 'Pengaturan', icon: <Settings className="w-3 h-3" /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  id={`admin-nav-tab-${tab.id}`}
                  onClick={() => {
                    sound.playPop(480);
                    setAdminSelectedTab(tab.id as any);
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                    adminSelectedTab === tab.id
                      ? 'bg-[#4A148C] text-white shadow-2xs'
                      : 'text-[#6A1B9A] hover:bg-[#D1C4E9]/50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Switch to Parent */}
            <button
              type="button"
              id="btn-admin-nav-to-parent"
              onClick={handleGoToParent}
              title="Buka Dasbor Orang Tua"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F0] hover:bg-[#F5F2E9] border border-[#D7CCC8] text-[#4E342E] rounded-full text-xs font-bold transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Dasbor Ortu</span>
            </button>

            {/* Return to Child Mode */}
            <button
              type="button"
              id="btn-admin-nav-to-child"
              onClick={handleReturnToChild}
              title="Lihat Sebagai Anak"
              className="flex items-center gap-1 px-3 py-1.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-full text-xs font-extrabold transition-colors shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Belajar</span>
            </button>

            {/* Logout Admin */}
            <button
              type="button"
              id="btn-admin-nav-logout"
              onClick={() => {
                sound.playPop(360);
                logoutAdmin();
              }}
              title="Keluar Portal Admin"
              className="p-1.5 bg-[#FFEBEE] hover:bg-[#FFCDD2] text-[#C62828] border border-[#EF9A9A] rounded-full transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Admin Menu Toggle */}
            <button
              type="button"
              id="btn-admin-mobile-menu"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="p-1.5 lg:hidden bg-[#EDE7F6] border border-[#D1C4E9] rounded-xl text-[#4A148C] cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MOBILE EXPANDED MENU DRAWER (FOR PARENT & ADMIN) */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F0] border-t border-[#E7E2D6] px-4 py-3 space-y-2 shadow-md animate-fadeIn">
          {currentMode === 'parent' && (
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => {
                  sound.playPop(480);
                  setActiveView('parent_dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full py-2 px-3 rounded-xl text-left text-xs font-bold flex items-center justify-between ${
                  activeView === 'parent_dashboard' ? 'bg-[#FFB74D] text-[#3E2723]' : 'hover:bg-[#F5F2E9] text-[#4E342E]'
                }`}
              >
                <span>📊 Laporan Belajar Anak</span>
                {activeView === 'parent_dashboard' && <CheckCircle2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playPop(480);
                  setActiveView('parent_children');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full py-2 px-3 rounded-xl text-left text-xs font-bold flex items-center justify-between ${
                  activeView === 'parent_children' ? 'bg-[#FFB74D] text-[#3E2723]' : 'hover:bg-[#F5F2E9] text-[#4E342E]'
                }`}
              >
                <span>👶 Profil Anak ({parentUser.children.length})</span>
                {activeView === 'parent_children' && <CheckCircle2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playPop(480);
                  setActiveView('parent_subscription');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full py-2 px-3 rounded-xl text-left text-xs font-bold flex items-center justify-between ${
                  activeView === 'parent_subscription' ? 'bg-[#FFB74D] text-[#3E2723]' : 'hover:bg-[#F5F2E9] text-[#4E342E]'
                }`}
              >
                <span>💳 Paket Langganan ({parentUser.activeSubscription.planName})</span>
                {activeView === 'parent_subscription' && <CheckCircle2 className="w-4 h-4" />}
              </button>

              <div className="pt-2 border-t border-[#E7E2D6] flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPop(480);
                      setIsMobileMenuOpen(false);
                      openAdminGate();
                    }}
                    className="flex-1 py-2 px-3 bg-[#EDE7F6] text-[#4A148C] font-black text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Portal Admin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playPop(480);
                      setIsMobileMenuOpen(false);
                      openAuthModal();
                    }}
                    className="flex-1 py-2 px-3 bg-[#F5F2E9] text-[#4E342E] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>Akun Ortu</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logoutParent();
                  }}
                  className="w-full py-2 px-3 bg-[#FFEBEE] text-[#C62828] font-black text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#FFCDD2] transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar dari Akun (Logout)</span>
                </button>
              </div>
            </div>
          )}

          {currentMode === 'admin' && (
            <div className="space-y-1.5">
              {[
                { id: 'overview', label: 'Ringkasan KPI', icon: <LayoutDashboard className="w-4 h-4" /> },
                { id: 'users', label: 'Kelola Pengguna & Anak', icon: <Users className="w-4 h-4" /> },
                { id: 'packages', label: 'Kelola Paket Langganan', icon: <Package className="w-4 h-4" /> },
                { id: 'transactions', label: 'Riwayat Transaksi', icon: <CreditCard className="w-4 h-4" /> },
                { id: 'settings', label: 'Pengaturan Sistem', icon: <Settings className="w-4 h-4" /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    sound.playPop(480);
                    setAdminSelectedTab(tab.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full py-2 px-3 rounded-xl text-left text-xs font-black flex items-center justify-between ${
                    adminSelectedTab === tab.id ? 'bg-[#4A148C] text-white' : 'hover:bg-[#EDE7F6] text-[#4A148C]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {adminSelectedTab === tab.id && <CheckCircle2 className="w-4 h-4" />}
                </button>
              ))}

              <div className="pt-2 border-t border-[#E7E2D6] flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGoToParent}
                  className="flex-1 py-2 px-3 bg-[#FAF8F0] border border-[#D7CCC8] text-[#4E342E] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Dasbor Ortu</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playPop(360);
                    setIsMobileMenuOpen(false);
                    logoutAdmin();
                  }}
                  className="py-2 px-3 bg-[#FFEBEE] text-[#C62828] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
