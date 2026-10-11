import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  X,
  KeyRound,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Eye,
  EyeOff,
  Server
} from 'lucide-react';
import { sound } from '../utils/audio';

export const AdminGateModal: React.FC = () => {
  const {
    isAdminGateOpen,
    closeAdminGate,
    verifyAdminPin,
    loginAdminDirect,
    adminPin
  } = useApp();

  // Login Mode: 'pin' (keypad quick PIN) or 'credentials' (Email & Password/PIN)
  const [authMode, setAuthMode] = useState<'pin' | 'credentials'>('pin');

  // PIN Mode States
  const [pinInput, setPinInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Credentials Mode States
  const [adminEmail, setAdminEmail] = useState<string>('admin@kariaku.id');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  if (!isAdminGateOpen) return null;

  // Keypad Handlers
  const handleNumberClick = (digit: string) => {
    sound.playPop(480);
    setErrorMsg('');
    if (pinInput.length < 6) {
      setPinInput(prev => prev + digit);
    }
  };

  const handleDelete = () => {
    sound.playPop(380);
    setErrorMsg('');
    setPinInput(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    sound.playPop(360);
    setErrorMsg('');
    setPinInput('');
  };

  // PIN Submit
  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pinInput) {
      setErrorMsg('Masukkan PIN Admin terlebih dahulu.');
      return;
    }

    const success = verifyAdminPin(pinInput);
    if (!success) {
      setErrorMsg('PIN Admin salah. Coba PIN default: ' + (adminPin || '8899'));
      setPinInput('');
    }
  };

  // Credentials Submit
  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!adminEmail.trim() || !adminPassword.trim()) {
      setErrorMsg('Harap masukkan email dan kata sandi / PIN admin.');
      return;
    }

    // Check valid admin credentials (allow master PIN or specific pass)
    const validEmails = ['admin@kariaku.id', 'callystanathaniachasey@gmail.com', 'superadmin@kariaku.id'];
    const isValidEmail = validEmails.includes(adminEmail.trim().toLowerCase()) || adminEmail.includes('admin');
    const isValidPass = adminPassword.trim() === adminPin || adminPassword.trim() === '8899' || adminPassword.trim() === 'admin123';

    if (isValidEmail && isValidPass) {
      sound.playFanfare();
      loginAdminDirect();
    } else {
      setErrorMsg('Email atau kata sandi admin tidak sesuai. Gunakan email: admin@kariaku.id dan kata sandi/PIN: 8899');
    }
  };

  const handleQuickDemoAccess = () => {
    sound.playFanfare();
    loginAdminDirect();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2E1C18]/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#FAF8F0] rounded-3xl sm:rounded-[36px] border-4 border-[#5D4037] shadow-2xl max-w-md w-full p-5 sm:p-7 relative my-auto text-[#4E342E]">
        {/* Close Button */}
        <button
          id="btn-close-admin-gate"
          onClick={() => {
            sound.playPop(360);
            closeAdminGate();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-2xl bg-white border-2 border-[#D7CCC8] text-[#8D6E63] hover:text-[#4E342E] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-[#3E2723] to-[#5D4037] text-white flex items-center justify-center mx-auto mb-2.5 shadow-md border-2 border-[#FAF8F0]">
            <ShieldCheck className="w-7 h-7 text-[#FFD54F]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE7F6] text-[#4527A0] border border-[#D1C4E9] text-[11px] font-black uppercase tracking-wider mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-[#7B1FA2]" />
            <span>Login Administrator</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-heading text-[#4E342E]">
            Portal Kelola KARIA KU
          </h3>
          <p className="text-xs text-[#6D4C41] font-semibold mt-0.5">
            Akses khusus staf pengelola pengguna, database anak, dan paket langganan.
          </p>
        </div>

        {/* Login Method Tabs */}
        <div className="flex bg-[#F5F2E9] p-1 rounded-2xl mb-4 border border-[#E7E2D6]">
          <button
            type="button"
            id="tab-admin-auth-pin"
            onClick={() => {
              sound.playPop(420);
              setAuthMode('pin');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'pin'
                ? 'bg-[#FAF8F0] text-[#4E342E] shadow-2xs border border-[#D7CCC8]'
                : 'text-[#8D6E63] hover:text-[#4E342E]'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-[#D97706]" />
            <span>PIN Cepat</span>
          </button>
          <button
            type="button"
            id="tab-admin-auth-credentials"
            onClick={() => {
              sound.playPop(420);
              setAuthMode('credentials');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'credentials'
                ? 'bg-[#FAF8F0] text-[#4E342E] shadow-2xs border border-[#D7CCC8]'
                : 'text-[#8D6E63] hover:text-[#4E342E]'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-[#1565C0]" />
            <span>Email & Kata Sandi</span>
          </button>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-3.5 p-2.5 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-xs font-bold rounded-2xl text-center animate-shake">
            {errorMsg}
          </div>
        )}

        {/* ================= MODE 1: PIN AUTHENTICATION ================= */}
        {authMode === 'pin' && (
          <div>
            {/* PIN Display */}
            <div className="bg-white rounded-2xl border-2 border-[#D7CCC8] p-3 mb-3 text-center">
              <div className="flex items-center justify-center gap-2.5">
                {[0, 1, 2, 3].map(i => (
                  <div
                    key={i}
                    className={`w-10 h-11 rounded-xl border-2 flex items-center justify-center text-xl font-black transition-all ${
                      pinInput.length > i
                        ? 'border-[#D97706] bg-[#FFF8E1] text-[#4E342E] shadow-2xs'
                        : 'border-[#E7E2D6] bg-[#FAF8F0] text-transparent'
                    }`}
                  >
                    {pinInput.length > i ? '●' : '—'}
                  </div>
                ))}
              </div>
            </div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-3 gap-1.5 mb-3.5">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map(btn => {
                const isAction = btn === 'C' || btn === '⌫';
                return (
                  <button
                    key={btn}
                    type="button"
                    id={`btn-keypad-${btn}`}
                    onClick={() => {
                      if (btn === 'C') handleClear();
                      else if (btn === '⌫') handleDelete();
                      else handleNumberClick(btn);
                    }}
                    className={`h-11 rounded-2xl font-black text-base transition-all active:scale-95 cursor-pointer flex items-center justify-center ${
                      isAction
                        ? 'bg-[#F5F2E9] border-2 border-[#D7CCC8] text-[#8D6E63] hover:bg-[#EFEBE9]'
                        : 'bg-white border-2 border-[#D7CCC8] text-[#4E342E] hover:bg-[#FFF8E1] hover:border-[#D97706] shadow-2xs'
                    }`}
                  >
                    {btn}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              id="btn-submit-admin-pin"
              onClick={() => handlePinSubmit()}
              disabled={pinInput.length === 0}
              className="w-full py-2.5 bg-[#4E342E] hover:bg-[#3E2723] disabled:opacity-50 text-white rounded-2xl font-black text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-[#FFD54F]" />
              <span>Verifikasi PIN & Masuk Admin</span>
            </button>
          </div>
        )}

        {/* ================= MODE 2: EMAIL & PASSWORD / MASTER CREDENTIALS ================= */}
        {authMode === 'credentials' && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-3 mb-3.5">
            <div>
              <label className="block text-xs font-black text-[#4E342E] mb-1">
                Email Administrator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8D6E63] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  id="input-admin-email"
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  placeholder="admin@kariaku.id"
                  className="w-full pl-9.5 pr-4 py-2 bg-white rounded-xl border-2 border-[#D7CCC8] focus:border-[#D97706] text-xs font-bold text-[#4E342E] outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-[#4E342E] mb-1">
                Kata Sandi / PIN Admin
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8D6E63] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="input-admin-password"
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  placeholder="Masukkan kata sandi / PIN (8899)"
                  className="w-full pl-9.5 pr-10 py-2 bg-white rounded-xl border-2 border-[#D7CCC8] focus:border-[#D97706] text-xs font-bold text-[#4E342E] outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-[#4E342E] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-[11px] text-[#8D6E63] bg-white p-2.5 rounded-xl border border-[#E7E2D6]">
              🔐 Akun bawaan: <strong>admin@kariaku.id</strong> | Sandi/PIN: <strong>{adminPin || '8899'}</strong>
            </div>

            <button
              type="submit"
              id="btn-submit-admin-credentials"
              className="w-full py-2.5 bg-[#4E342E] hover:bg-[#3E2723] text-white rounded-2xl font-black text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#FFD54F]" />
              <span>Masuk Sebagai Admin</span>
            </button>
          </form>
        )}

        {/* Footer Quick Access Assistance */}
        <div className="mt-3 pt-3 border-t border-[#E7E2D6]">
          <div className="p-2.5 bg-[#FFF8E1] border border-[#FFE082] rounded-2xl flex items-center justify-between gap-2 text-xs">
            <div className="text-[#6D4C41]">
              <span className="font-black text-[#D97706]">PIN Default:</span>{' '}
              <code className="bg-white px-1.5 py-0.5 rounded border font-mono font-bold text-[#4E342E]">
                {adminPin || '8899'}
              </code>
            </div>

            <button
              type="button"
              id="btn-quick-admin-login"
              onClick={handleQuickDemoAccess}
              className="px-2.5 py-1 bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl font-extrabold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
            >
              <span>1-Klik Masuk</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
