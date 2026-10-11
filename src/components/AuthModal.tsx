import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/audio';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginParent, registerParent, openAdminGate } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Harap isi email dan kata sandi.');
      return;
    }

    if (mode === 'register') {
      if (!name) {
        setError('Harap masukkan nama orang tua / wali.');
        return;
      }
      registerParent(name, email);
    } else {
      loginParent(email, email.includes('sarah') ? 'Bunda Sarah' : undefined);
    }
  };

  const handleQuickDemo = () => {
    loginParent('sarah.bunda@kariaku.id', 'Bunda Sarah');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2E1C18]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F0] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl border-4 border-[#E7E2D6] relative animate-scaleIn">
        {/* Close Button */}
        <button
          id="btn-close-auth-modal"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-[#8D6E63] hover:text-[#4E342E] rounded-full hover:bg-[#F5F2E9] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-[#FFF8E1] rounded-2xl mb-2 text-3xl border-2 border-[#FFE082]">
            👨‍👩‍👧‍👦
          </div>
          <h3 className="text-2xl font-black font-heading text-[#4E342E]">
            {mode === 'login' ? 'Masuk Akun Orang Tua' : 'Daftar Akun KARIA KU'}
          </h3>
          <p className="text-xs sm:text-sm text-[#6D4C41] mt-1 font-semibold">
            {mode === 'login'
              ? 'Pantau kemajuan belajar anak & kelola langganan'
              : 'Dapatkan uji coba gratis 7 hari untuk buah hati Anda'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-[#F5F2E9] p-1.5 rounded-2xl mb-5 border border-[#E7E2D6]">
          <button
            type="button"
            id="tab-auth-login"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2 text-xs sm:text-sm font-extrabold rounded-xl transition-all ${
              mode === 'login' ? 'bg-[#FAF8F0] text-[#4E342E] shadow-2xs' : 'text-[#8D6E63] hover:text-[#4E342E]'
            }`}
          >
            Masuk (Login)
          </button>
          <button
            type="button"
            id="tab-auth-register"
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-2 text-xs sm:text-sm font-extrabold rounded-xl transition-all ${
              mode === 'register' ? 'bg-[#FAF8F0] text-[#4E342E] shadow-2xs' : 'text-[#8D6E63] hover:text-[#4E342E]'
            }`}
          >
            Daftar Baru
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-xs font-bold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-[#4E342E] mb-1">
                Nama Lengkap Orang Tua / Wali
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#A1887F] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  id="input-auth-name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Contoh: Bunda Sarah / Ayah Dimas"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FDFCF0] border-2 border-[#E7E2D6] focus:border-[#D97706] focus:bg-[#FAF8F0] rounded-xl text-sm font-semibold text-[#4E342E] outline-none transition-all placeholder:text-[#A1887F]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#4E342E] mb-1">
              Alamat Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A1887F] absolute left-3.5 top-3.5" />
              <input
                type="email"
                id="input-auth-email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FDFCF0] border-2 border-[#E7E2D6] focus:border-[#D97706] focus:bg-[#FAF8F0] rounded-xl text-sm font-semibold text-[#4E342E] outline-none transition-all placeholder:text-[#A1887F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4E342E] mb-1">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A1887F] absolute left-3.5 top-3.5" />
              <input
                type="password"
                id="input-auth-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FDFCF0] border-2 border-[#E7E2D6] focus:border-[#D97706] focus:bg-[#FAF8F0] rounded-xl text-sm font-semibold text-[#4E342E] outline-none transition-all placeholder:text-[#A1887F]"
              />
            </div>
          </div>

          <button
            type="submit"
            id="btn-auth-submit"
            className="w-full py-3 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] text-white rounded-xl font-extrabold text-sm shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>{mode === 'login' ? 'Masuk Sekarang' : 'Daftar & Mulai Belajar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Quick Button & Admin Access */}
        <div className="mt-5 pt-4 border-t border-[#E7E2D6] space-y-2">
          <button
            type="button"
            id="btn-quick-demo-login"
            onClick={handleQuickDemo}
            className="w-full py-2.5 bg-[#FFF8E1] hover:bg-[#FFE082]/40 border border-[#FFE082] text-[#5D4037] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-[#D97706]" />
            <span>Gunakan Akun Demo (Bunda Sarah)</span>
          </button>

          <button
            type="button"
            id="btn-switch-to-admin-login"
            onClick={() => {
              sound.playPop(480);
              closeAuthModal();
              openAdminGate();
            }}
            className="w-full py-2 bg-[#F3E5F5] hover:bg-[#E1BEE7] border border-[#CE93D8] text-[#6A1B9A] rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#8E24AA]" />
            <span>Login Sebagai Staf Administrator</span>
          </button>
        </div>
      </div>
    </div>
  );
};
