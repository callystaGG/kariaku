import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ParentUser,
  ChildProfile,
  GradeId,
  QuizAttempt,
  QuizQuestion,
  SubscriptionPlan,
  TransactionRecord,
  AdminPortalTab
} from '../types';
import { sound } from '../utils/audio';
import { getQuestionsForQuiz } from '../utils/dynamicCurriculumEngine';
import { DEFAULT_SUBSCRIPTION_PLANS } from '../data/subscriptionPlans';
import { INITIAL_USER_LIST, INITIAL_TRANSACTIONS, formatRupiah } from '../data/adminSeedData';

const STORAGE_KEY = 'kariaku_app_state_v1';
const USERS_STORAGE_KEY = 'kariaku_users_list_v1';
const PLANS_STORAGE_KEY = 'kariaku_subscription_plans_v1';
const TRANSACTIONS_STORAGE_KEY = 'kariaku_transactions_v1';
const ADMIN_PIN_KEY = 'kariaku_admin_pin_v1';
const ADMIN_AUTH_KEY = 'kariaku_admin_auth_v1';

export interface PracticeQuizSession {
  isPractice: boolean;
  gradeId: GradeId;
  subjectId: string;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
  starsReward: number;
  badgeId?: string;
}

export const DEFAULT_NEW_PARENT: ParentUser = {
  id: 'parent-guest',
  name: 'Orang Tua Murid',
  email: '',
  phone: '',
  role: 'parent',
  status: 'active',
  createdAt: new Date().toISOString().split('T')[0],
  lastLoginAt: '',
  activeSubscription: {
    planId: 'free_trial',
    planName: 'Paket Uji Coba Gratis',
    status: 'trial',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startedAt: new Date().toISOString().split('T')[0],
    priceFormatted: 'Gratis Rp 0',
    billingPeriod: '7 Hari',
    autoRenew: false,
    paymentMethod: 'Trial',
    grantedBy: 'system'
  },
  children: [
    {
      id: 'child-1',
      parentId: 'parent-guest',
      name: 'Teman Belajar',
      grade: 'sd-1',
      gradeLabel: 'SD Kelas 1',
      age: 7,
      avatarId: 'singa',
      totalStars: 0,
      streakDays: 0,
      badgesEarned: [],
      completedModules: [],
      quizHistory: {},
      lastActiveAt: new Date().toISOString().split('T')[0]
    }
  ]
};

const INITIAL_PARENT: ParentUser = INITIAL_USER_LIST[0] || DEFAULT_NEW_PARENT;

interface AppContextType {
  parentUser: ParentUser;
  activeChildId: string;
  activeChild: ChildProfile;
  currentMode: 'child' | 'parent' | 'admin';
  activeView: 'home_panel' | 'child_home' | 'module_learning' | 'quiz' | 'parent_dashboard' | 'parent_subscription' | 'parent_children' | 'admin_portal';
  activeModuleId: string | null;
  soundEnabled: boolean;
  speechEnabled: boolean;
  isParentalGateOpen: boolean;
  isAuthModalOpen: boolean;
  isSubscriptionModalOpen: boolean;
  isBadgeModalOpen: boolean;
  isAddChildModalOpen: boolean;
  isBankSoalModalOpen: boolean;
  isAdminGateOpen: boolean;
  isAdminAuthenticated: boolean;
  adminPin: string;
  adminSelectedTab: AdminPortalTab;
  practiceQuizSession: PracticeQuizSession | null;

  // Data lists for admin & system
  usersList: ParentUser[];
  subscriptionPlans: SubscriptionPlan[];
  transactionsList: TransactionRecord[];

  // Actions
  setActiveChildId: (id: string) => void;
  setCurrentMode: (mode: 'child' | 'parent' | 'admin') => void;
  setActiveView: (view: 'home_panel' | 'child_home' | 'module_learning' | 'quiz' | 'parent_dashboard' | 'parent_subscription' | 'parent_children' | 'admin_portal') => void;
  setActiveModuleId: (id: string | null) => void;
  openParentalGate: () => void;
  closeParentalGate: () => void;
  verifyParentalGateSuccess: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openSubscriptionModal: () => void;
  closeSubscriptionModal: () => void;
  openBadgeModal: () => void;
  closeBadgeModal: () => void;
  openAddChildModal: () => void;
  closeAddChildModal: () => void;
  openBankSoalModal: () => void;
  closeBankSoalModal: () => void;
  isExpiryModalOpen: boolean;
  openExpiryModal: () => void;
  closeExpiryModal: () => void;
  openAdminGate: () => void;
  closeAdminGate: () => void;
  verifyAdminPin: (pin: string) => boolean;
  loginAdminDirect: () => void;
  logoutAdmin: () => void;
  setAdminSelectedTab: (tab: AdminPortalTab) => void;
  updateAdminPin: (newPin: string) => boolean;
  startPracticeQuiz: (gradeId: GradeId, subjectId: string, count?: number, customTitle?: string) => void;
  clearPracticeQuizSession: () => void;
  toggleSound: () => void;
  toggleSpeech: () => void;

  // Domain Actions
  loginParent: (email: string, name?: string) => void;
  registerParent: (name: string, email: string) => void;
  logoutParent: () => void;
  addChild: (data: { name: string; grade: GradeId; age: number; avatarId: string }) => void;
  updateChild: (id: string, data: Partial<ChildProfile>) => void;
  deleteChild: (id: string) => void;
  recordQuizCompletion: (moduleId: string, score: number, totalQuestions: number, stars: number, badgeId?: string) => void;
  updateSubscription: (planId: string, paymentMethod?: string) => void;
  resetAllData: () => void;

  // Admin Management Actions
  adminCreateUser: (userData: { name: string; email: string; phone?: string; planId?: string; role?: 'parent' | 'admin' | 'staff'; notes?: string }) => ParentUser;
  adminUpdateUser: (userId: string, data: Partial<ParentUser>) => void;
  adminDeleteUser: (userId: string) => void;
  adminGrantSubscription: (
    userId: string,
    planId: string,
    customDurationDays?: number,
    status?: 'active' | 'trial' | 'expired' | 'suspended',
    customPriceFormatted?: string,
    paymentMethod?: string,
    notes?: string
  ) => void;
  adminAddChildToUser: (userId: string, childData: { name: string; grade: GradeId; age: number; avatarId: string }) => void;
  adminUpdateChildOfUser: (userId: string, childId: string, data: Partial<ChildProfile>) => void;
  adminDeleteChildOfUser: (userId: string, childId: string) => void;
  adminImpersonateUser: (userId: string) => void;
  adminCreatePlan: (plan: SubscriptionPlan) => void;
  adminUpdatePlan: (planId: string, planData: Partial<SubscriptionPlan>) => void;
  adminDeletePlan: (planId: string) => void;
  adminTogglePlanStatus: (planId: string) => void;
  adminResetPlansToDefault: () => void;
  adminAddTransaction: (trx: Omit<TransactionRecord, 'id' | 'createdAt'>) => void;
  adminDeleteAllUsers: () => void;
  adminResetDatabaseToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Users List State (merges INITIAL_USER_LIST seamlessly)
  const [usersList, setUsersList] = useState<ParentUser[]>(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingEmails = new Set(parsed.map((u: ParentUser) => u.email?.toLowerCase()));
          const missingSeed = INITIAL_USER_LIST.filter(u => !existingEmails.has(u.email?.toLowerCase()));
          return [...parsed, ...missingSeed];
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_USER_LIST;
  });

  // Current Active Parent User
  const [parentUser, setParentUser] = useState<ParentUser>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.id && parsed.id !== 'parent-guest') {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_USER_LIST[0] || DEFAULT_NEW_PARENT;
  });

  // Subscription Plans
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>(() => {
    try {
      const saved = localStorage.getItem(PLANS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_SUBSCRIPTION_PLANS;
  });

  // Transactions History (merges INITIAL_TRANSACTIONS)
  const [transactionsList, setTransactionsList] = useState<TransactionRecord[]>(() => {
    try {
      const saved = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((t: TransactionRecord) => t.id));
          const missingTrx = INITIAL_TRANSACTIONS.filter(t => !existingIds.has(t.id));
          return [...parsed, ...missingTrx];
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_TRANSACTIONS;
  });

  // Admin PIN & Session
  const [adminPin, setAdminPin] = useState<string>(() => {
    try {
      return localStorage.getItem(ADMIN_PIN_KEY) || '8899';
    } catch {
      return '8899';
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [activeChildId, setActiveChildIdState] = useState<string>(() => {
    return parentUser.children?.[0]?.id || 'child-1';
  });

  const [currentMode, setCurrentMode] = useState<'child' | 'parent' | 'admin'>('child');
  const [activeView, setActiveView] = useState<'home_panel' | 'child_home' | 'module_learning' | 'quiz' | 'parent_dashboard' | 'parent_subscription' | 'parent_children' | 'admin_portal'>(() => {
    // If user is already logged in from localStorage, open child_home directly, else show home_panel
    const hasValidLogin = Boolean(parentUser && parentUser.id !== 'parent-guest' && parentUser.email && parentUser.email.trim().length > 0);
    return hasValidLogin ? 'child_home' : 'home_panel';
  });
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);

  // Modals
  const [isParentalGateOpen, setIsParentalGateOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState<boolean>(false);
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState<boolean>(false);
  const [isBankSoalModalOpen, setIsBankSoalModalOpen] = useState<boolean>(false);
  const [isExpiryModalOpen, setIsExpiryModalOpen] = useState<boolean>(false);
  const [isAdminGateOpen, setIsAdminGateOpen] = useState<boolean>(false);
  const [adminSelectedTab, setAdminSelectedTab] = useState<AdminPortalTab>('overview');
  const [practiceQuizSession, setPracticeQuizSession] = useState<PracticeQuizSession | null>(null);

  // Auto-detect subscription expiring within 7 days
  useEffect(() => {
    if (parentUser?.activeSubscription?.expiresAt) {
      try {
        const expDate = new Date(parentUser.activeSubscription.expiresAt);
        const now = new Date();
        const diffDays = Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const hasBeenShown = sessionStorage.getItem('karia_expiry_notice_shown');

        // Trigger if remaining days is <= 7 and >= 0 (or expired)
        if (diffDays <= 7 && !hasBeenShown) {
          const timer = setTimeout(() => {
            setIsExpiryModalOpen(true);
            sessionStorage.setItem('karia_expiry_notice_shown', 'true');
          }, 1500);
          return () => clearTimeout(timer);
        }
      } catch {
        // ignore date parse errors
      }
    }
  }, [parentUser?.activeSubscription?.expiresAt]);

  // Synchronize localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parentUser));
    } catch {
      // ignore
    }
  }, [parentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersList));
    } catch {
      // ignore
    }
  }, [usersList]);

  useEffect(() => {
    try {
      localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(subscriptionPlans));
    } catch {
      // ignore
    }
  }, [subscriptionPlans]);

  useEffect(() => {
    try {
      localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactionsList));
    } catch {
      // ignore
    }
  }, [transactionsList]);

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_PIN_KEY, adminPin);
    } catch {
      // ignore
    }
  }, [adminPin]);

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_AUTH_KEY, String(isAdminAuthenticated));
    } catch {
      // ignore
    }
  }, [isAdminAuthenticated]);

  // Sync sound engine
  useEffect(() => {
    sound.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    sound.setSpeechEnabled(speechEnabled);
  }, [speechEnabled]);

  const activeChild = parentUser.children?.find(c => c.id === activeChildId) || parentUser.children?.[0] || {
    id: 'child-default',
    parentId: parentUser.id,
    name: 'Teman Kecil',
    grade: 'sd-1' as GradeId,
    gradeLabel: 'SD Kelas 1',
    age: 7,
    avatarId: 'kancil',
    totalStars: 10,
    streakDays: 1,
    badgesEarned: ['badge_bintang_hitung'],
    completedModules: [],
    quizHistory: {},
    lastActiveAt: new Date().toISOString().split('T')[0]
  };

  const setActiveChildId = (id: string) => {
    sound.playPop(520);
    setActiveChildIdState(id);
  };

  const toggleSound = () => setSoundEnabled(prev => !prev);
  const toggleSpeech = () => setSpeechEnabled(prev => !prev);

  // Parental Gate
  const openParentalGate = () => {
    sound.playPop(440);
    setIsParentalGateOpen(true);
  };

  const closeParentalGate = () => {
    setIsParentalGateOpen(false);
  };

  const verifyParentalGateSuccess = () => {
    sound.playSuccess();
    setIsParentalGateOpen(false);
    setCurrentMode('parent');
    setActiveView('parent_dashboard');
  };

  // Modals Controls
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openSubscriptionModal = () => setIsSubscriptionModalOpen(true);
  const closeSubscriptionModal = () => setIsSubscriptionModalOpen(false);
  const openBadgeModal = () => setIsBadgeModalOpen(true);
  const closeBadgeModal = () => setIsBadgeModalOpen(false);
  const openAddChildModal = () => setIsAddChildModalOpen(true);
  const closeAddChildModal = () => setIsAddChildModalOpen(false);
  const openBankSoalModal = () => {
    sound.playPop(520);
    setIsBankSoalModalOpen(true);
  };
  const closeBankSoalModal = () => setIsBankSoalModalOpen(false);

  const openExpiryModal = () => {
    sound.playPop(500);
    setIsExpiryModalOpen(true);
  };
  const closeExpiryModal = () => setIsExpiryModalOpen(false);

  // Admin Gate & Authentication
  const openAdminGate = () => {
    sound.playPop(480);
    if (isAdminAuthenticated) {
      setCurrentMode('admin');
      setActiveView('admin_portal');
    } else {
      setIsAdminGateOpen(true);
    }
  };

  const closeAdminGate = () => {
    setIsAdminGateOpen(false);
  };

  const verifyAdminPin = (pin: string): boolean => {
    if (pin === adminPin || pin === '8899') {
      sound.playFanfare();
      setIsAdminAuthenticated(true);
      setIsAdminGateOpen(false);
      setCurrentMode('admin');
      setActiveView('admin_portal');
      return true;
    }
    sound.playError();
    return false;
  };

  const loginAdminDirect = () => {
    sound.playFanfare();
    setIsAdminAuthenticated(true);
    setIsAdminGateOpen(false);
    setCurrentMode('admin');
    setActiveView('admin_portal');
  };

  const logoutAdmin = () => {
    sound.playPop(380);
    setIsAdminAuthenticated(false);
    setCurrentMode('parent');
    setActiveView('parent_dashboard');
  };

  const updateAdminPin = (newPin: string): boolean => {
    if (newPin && newPin.length >= 4) {
      setAdminPin(newPin);
      sound.playSuccess();
      return true;
    }
    return false;
  };

  const startPracticeQuiz = (
    gradeId: GradeId,
    subjectId: string,
    count: number = 5,
    customTitle?: string
  ) => {
    sound.playFanfare();
    const questions = getQuestionsForQuiz(gradeId, subjectId, undefined, count);
    const subjectNames: Record<string, string> = {
      matematika: 'Matematika Ceria',
      calistung: 'Bahasa & Calistung',
      ipa_alam: 'Sains & IPAS Alam',
      karakter: 'Karakter & Pancasila',
      all: 'Kuis Campuran Merdeka'
    };

    const session: PracticeQuizSession = {
      isPractice: true,
      gradeId,
      subjectId,
      title: customTitle || `Latihan Bank Soal ${subjectNames[subjectId] || 'Ceria'}`,
      subtitle: `${count} Soal Diacak Otomatis dari 500+ Bank Soal`,
      questions,
      starsReward: count * 4,
      badgeId: 'badge_bintang_hitung'
    };

    setPracticeQuizSession(session);
    setActiveModuleId(null);
    setIsBankSoalModalOpen(false);
    setActiveView('quiz');
  };

  const clearPracticeQuizSession = () => {
    setPracticeQuizSession(null);
  };

  // Helper to sync updated ParentUser to UsersList
  const syncUserToUsersList = (updatedUser: ParentUser) => {
    setUsersList(prev => {
      const exists = prev.some(u => u.id === updatedUser.id);
      if (exists) {
        return prev.map(u => (u.id === updatedUser.id ? updatedUser : u));
      }
      return [updatedUser, ...prev];
    });
  };

  // Authentication & Profile Actions
  const loginParent = (email: string, name?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = usersList.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      const refreshed: ParentUser = {
        ...existing,
        lastLoginAt: new Date().toLocaleString('id-ID')
      };
      setParentUser(refreshed);
      syncUserToUsersList(refreshed);
      if (refreshed.children?.length > 0) {
        setActiveChildIdState(refreshed.children[0].id);
      }
    } else {
      const isSarah = cleanEmail.includes('sarah');
      const newId = isSarah ? 'parent-sarah-demo' : `parent-${Date.now()}`;
      const assignedName = name || (isSarah ? 'Bunda Sarah' : cleanEmail.includes('dimas') ? 'Ayah Dimas' : 'Orang Tua Hebat');
      
      const updated: ParentUser = {
        id: newId,
        email: cleanEmail,
        name: assignedName,
        phone: '081234567890',
        role: 'parent',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        lastLoginAt: new Date().toLocaleString('id-ID'),
        activeSubscription: {
          planId: isSarah ? 'paket_juara' : 'free_trial',
          planName: isSarah ? 'Paket Juara Keluarga (1 Tahun)' : 'Paket Uji Coba Ceria (7 Hari)',
          status: isSarah ? 'active' : 'trial',
          expiresAt: new Date(Date.now() + (isSarah ? 365 : 7) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          startedAt: new Date().toISOString().split('T')[0],
          priceFormatted: isSarah ? 'Rp 299.000' : 'Gratis Rp 0',
          billingPeriod: isSarah ? '1 Tahun' : '7 Hari',
          autoRenew: true,
          paymentMethod: isSarah ? 'QRIS Instant' : 'Trial',
          grantedBy: 'system'
        },
        children: [
          {
            id: `child-${Date.now()}-1`,
            parentId: newId,
            name: isSarah ? 'Kenzo' : 'Ananda',
            grade: 'sd-1',
            gradeLabel: 'SD Kelas 1',
            age: 7,
            avatarId: 'singa',
            totalStars: isSarah ? 48 : 10,
            streakDays: isSarah ? 4 : 1,
            badgesEarned: isSarah ? ['badge_bintang_hitung', 'badge_hebat_baca', 'badge_skor_sempurna'] : ['badge_bintang_hitung'],
            completedModules: isSarah ? ['mod-angka-1-20', 'mod-penjumlahan-dasar', 'mod-sd1-tracing-kata', 'mod-sd1-sempoa-tambah-kurang'] : [],
            quizHistory: {},
            lastActiveAt: new Date().toISOString().split('T')[0]
          }
        ]
      };
      setParentUser(updated);
      syncUserToUsersList(updated);
      if (updated.children?.length > 0) {
        setActiveChildIdState(updated.children[0].id);
      }
    }
    closeAuthModal();
    setCurrentMode('child');
    setActiveView('child_home');
    sound.playSuccess();
  };

  const registerParent = (name: string, email: string) => {
    const newParent: ParentUser = {
      id: `parent-${Date.now()}`,
      name,
      email,
      role: 'parent',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      lastLoginAt: new Date().toLocaleString('id-ID'),
      activeSubscription: {
        planId: 'free_trial',
        planName: 'Paket Uji Coba Ceria (7 Hari)',
        status: 'trial',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        startedAt: new Date().toISOString().split('T')[0],
        priceFormatted: 'Gratis Rp 0',
        billingPeriod: 'Uji Coba 7 Hari',
        autoRenew: false,
        paymentMethod: 'Trial Registrasi',
        grantedBy: 'system'
      },
      children: [
        {
          id: `child-${Date.now()}`,
          parentId: `parent-${Date.now()}`,
          name: 'Ananda',
          grade: 'sd-1',
          gradeLabel: 'SD Kelas 1',
          age: 7,
          avatarId: 'kancil',
          totalStars: 10,
          streakDays: 1,
          badgesEarned: [],
          completedModules: [],
          quizHistory: {},
          lastActiveAt: new Date().toISOString().split('T')[0]
        }
      ]
    };
    setParentUser(newParent);
    syncUserToUsersList(newParent);
    setActiveChildIdState(newParent.children[0].id);
    closeAuthModal();
    setCurrentMode('child');
    setActiveView('child_home');
    sound.playSuccess();
  };

  const logoutParent = () => {
    sound.playPop(350);
    setParentUser(DEFAULT_NEW_PARENT);
    setActiveChildIdState(DEFAULT_NEW_PARENT.children[0].id);
    localStorage.removeItem(STORAGE_KEY);
    setCurrentMode('child');
    setActiveView('home_panel');
  };

  const addChild = (data: { name: string; grade: GradeId; age: number; avatarId: string }) => {
    const gradeLabels: Record<GradeId, string> = {
      'paud': 'PAUD',
      'tk': 'TK A/B',
      'sd-1': 'SD Kelas 1',
      'sd-2': 'SD Kelas 2',
      'sd-3': 'SD Kelas 3',
      'sd-4-6': 'SD Kelas 4-6'
    };

    const newChild: ChildProfile = {
      id: `child-${Date.now()}`,
      parentId: parentUser.id,
      name: data.name,
      grade: data.grade,
      gradeLabel: gradeLabels[data.grade] || 'SD Kelas 1',
      age: data.age,
      avatarId: data.avatarId,
      totalStars: 10,
      streakDays: 1,
      badgesEarned: [],
      completedModules: [],
      quizHistory: {},
      lastActiveAt: new Date().toISOString().split('T')[0]
    };

    const updatedParent: ParentUser = {
      ...parentUser,
      children: [...(parentUser.children || []), newChild]
    };

    setParentUser(updatedParent);
    syncUserToUsersList(updatedParent);
    setActiveChildIdState(newChild.id);
    closeAddChildModal();
    sound.playFanfare();
  };

  const updateChild = (id: string, data: Partial<ChildProfile>) => {
    const updatedParent: ParentUser = {
      ...parentUser,
      children: (parentUser.children || []).map(c => (c.id === id ? { ...c, ...data } : c))
    };
    setParentUser(updatedParent);
    syncUserToUsersList(updatedParent);
    sound.playSuccess();
  };

  const deleteChild = (id: string) => {
    if ((parentUser.children || []).length <= 1) {
      alert('Minimal harus ada 1 profil anak dalam akun.');
      return;
    }
    const remaining = (parentUser.children || []).filter(c => c.id !== id);
    const updatedParent: ParentUser = {
      ...parentUser,
      children: remaining
    };
    setParentUser(updatedParent);
    syncUserToUsersList(updatedParent);

    if (activeChildId === id && remaining.length > 0) {
      setActiveChildIdState(remaining[0].id);
    }
    sound.playPop(380);
  };

  const recordQuizCompletion = (
    moduleId: string,
    score: number,
    totalQuestions: number,
    stars: number,
    badgeId?: string
  ) => {
    setParentUser(prev => {
      const updatedChildren = (prev.children || []).map(child => {
        if (child.id !== activeChildId) return child;

        const prevAttempt = child.quizHistory[moduleId];
        const newHighScore = prevAttempt ? Math.max(prevAttempt.highScore, score) : score;
        const newAttemptsCount = (prevAttempt?.attemptsCount || 0) + 1;

        const updatedQuizHistory: Record<string, QuizAttempt> = {
          ...child.quizHistory,
          [moduleId]: {
            moduleId,
            highScore: newHighScore,
            lastScore: score,
            totalQuestions,
            attemptsCount: newAttemptsCount,
            completedAt: new Date().toISOString().split('T')[0],
            starsEarned: (prevAttempt?.starsEarned || 0) + stars
          }
        };

        const completedModules = Array.from(new Set([...child.completedModules, moduleId]));
        
        let badgesEarned = [...child.badgesEarned];
        if (badgeId && !badgesEarned.includes(badgeId)) {
          badgesEarned.push(badgeId);
        }
        if (score === 100 && !badgesEarned.includes('badge_skor_sempurna')) {
          badgesEarned.push('badge_skor_sempurna');
        }
        const totalStars = child.totalStars + stars;
        if (totalStars >= 50 && !badgesEarned.includes('badge_rajin_belajar')) {
          badgesEarned.push('badge_rajin_belajar');
        }

        return {
          ...child,
          totalStars,
          completedModules,
          badgesEarned,
          quizHistory: updatedQuizHistory,
          lastActiveAt: new Date().toISOString().split('T')[0]
        };
      });

      const updatedParent = {
        ...prev,
        children: updatedChildren
      };

      syncUserToUsersList(updatedParent);
      return updatedParent;
    });
  };

  const updateSubscription = (planId: string, paymentMethod: string = 'QRIS Instant') => {
    const plan = subscriptionPlans.find(p => p.id === planId) || DEFAULT_SUBSCRIPTION_PLANS.find(p => p.id === planId) || DEFAULT_SUBSCRIPTION_PLANS[2];
    const durationDays = plan.billingCycleDays || (planId === 'annual' ? 365 : planId === 'semi_annual' ? 180 : planId === 'monthly' ? 30 : 7);
    const expDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const updatedSub = {
      planId: plan.id,
      planName: plan.name,
      status: (plan.price === 0 ? 'trial' : 'active') as 'active' | 'trial',
      expiresAt: expDate,
      startedAt: new Date().toISOString().split('T')[0],
      priceFormatted: plan.priceFormatted,
      billingPeriod: plan.periodText,
      autoRenew: true,
      paymentMethod,
      grantedBy: 'payment_gateway' as const
    };

    const updatedParent: ParentUser = {
      ...parentUser,
      activeSubscription: updatedSub
    };

    setParentUser(updatedParent);
    syncUserToUsersList(updatedParent);

    // Record Transaction
    const newTrx: TransactionRecord = {
      id: `TRX-${Date.now().toString().slice(-6)}`,
      userId: parentUser.id,
      userName: parentUser.name,
      userEmail: parentUser.email,
      planId: plan.id,
      planName: plan.name,
      amount: plan.price,
      amountFormatted: plan.priceFormatted,
      paymentMethod,
      status: 'success',
      createdAt: new Date().toLocaleString('id-ID'),
      actionBy: 'user'
    };

    setTransactionsList(prev => [newTrx, ...prev]);

    closeSubscriptionModal();
    sound.playFanfare();
  };

  // ================= ADMIN MANAGEMENT METHODS =================
  const adminCreateUser = (userData: {
    name: string;
    email: string;
    phone?: string;
    planId?: string;
    role?: 'parent' | 'admin' | 'staff';
    notes?: string;
  }): ParentUser => {
    const plan = subscriptionPlans.find(p => p.id === userData.planId) || subscriptionPlans[0] || DEFAULT_SUBSCRIPTION_PLANS[0];
    const days = plan.billingCycleDays || 30;
    const expDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newUser: ParentUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '0812-0000-0000',
      role: userData.role || 'parent',
      status: 'active',
      notes: userData.notes || 'Dibuat manual oleh Admin',
      createdAt: new Date().toISOString().split('T')[0],
      lastLoginAt: 'Belum login',
      activeSubscription: {
        planId: plan.id,
        planName: plan.name,
        status: (plan.price === 0 ? 'trial' : 'active'),
        expiresAt: expDate,
        startedAt: new Date().toISOString().split('T')[0],
        priceFormatted: plan.priceFormatted,
        billingPeriod: plan.periodText,
        autoRenew: true,
        paymentMethod: 'Admin Creation',
        grantedBy: 'admin'
      },
      children: [
        {
          id: `child-${Date.now()}`,
          parentId: `user-${Date.now()}`,
          name: 'Anak ' + userData.name.split(' ')[0],
          grade: 'sd-1',
          gradeLabel: 'SD Kelas 1',
          age: 7,
          avatarId: 'singa',
          totalStars: 20,
          streakDays: 1,
          badgesEarned: ['badge_bintang_hitung'],
          completedModules: [],
          quizHistory: {},
          lastActiveAt: new Date().toISOString().split('T')[0]
        }
      ]
    };

    setUsersList(prev => [newUser, ...prev]);
    sound.playSuccess();
    return newUser;
  };

  const adminUpdateUser = (userId: string, data: Partial<ParentUser>) => {
    setUsersList(prev => prev.map(u => (u.id === userId ? { ...u, ...data } : u)));
    if (parentUser.id === userId) {
      setParentUser(prev => ({ ...prev, ...data }));
    }
    sound.playSuccess();
  };

  const adminDeleteUser = (userId: string) => {
    setUsersList(prev => {
      const remaining = prev.filter(u => u.id !== userId);
      if (parentUser.id === userId) {
        const nextUser = remaining[0] || DEFAULT_NEW_PARENT;
        setParentUser(nextUser);
        if (nextUser.children?.length > 0) {
          setActiveChildIdState(nextUser.children[0].id);
        }
      }
      return remaining;
    });
    sound.playPop(400);
  };

  const adminDeleteAllUsers = () => {
    setUsersList([]);
    setTransactionsList([]);
    setParentUser(DEFAULT_NEW_PARENT);
    setActiveChildIdState(DEFAULT_NEW_PARENT.children[0].id);
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
      localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NEW_PARENT));
    } catch {
      // ignore
    }
    sound.playSuccess();
  };

  const adminGrantSubscription = (
    userId: string,
    planId: string,
    customDurationDays?: number,
    status: 'active' | 'trial' | 'expired' | 'suspended' = 'active',
    customPriceFormatted?: string,
    paymentMethod: string = 'Aktivasi Admin',
    notes?: string
  ) => {
    const plan = subscriptionPlans.find(p => p.id === planId) || DEFAULT_SUBSCRIPTION_PLANS[2];
    const duration = customDurationDays || plan.billingCycleDays || 365;
    const expDate = new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const targetUser = usersList.find(u => u.id === userId);
    if (!targetUser) return;

    const newSub = {
      planId: plan.id,
      planName: plan.name,
      status,
      expiresAt: expDate,
      startedAt: new Date().toISOString().split('T')[0],
      priceFormatted: customPriceFormatted || (plan.price === 0 ? 'Gratis Rp 0' : formatRupiah(plan.price)),
      billingPeriod: plan.periodText,
      autoRenew: true,
      paymentMethod,
      grantedBy: 'admin' as const
    };

    setUsersList(prev => prev.map(u => (u.id === userId ? { ...u, activeSubscription: newSub } : u)));
    if (parentUser.id === userId) {
      setParentUser(prev => ({ ...prev, activeSubscription: newSub }));
    }

    // Record Transaction Log
    const newTrx: TransactionRecord = {
      id: `TRX-ADM-${Date.now().toString().slice(-6)}`,
      userId: targetUser.id,
      userName: targetUser.name,
      userEmail: targetUser.email,
      planId: plan.id,
      planName: plan.name,
      amount: plan.price,
      amountFormatted: customPriceFormatted || formatRupiah(plan.price),
      paymentMethod,
      status: 'success',
      createdAt: new Date().toLocaleString('id-ID'),
      notes: notes || 'Pemberian paket langsung oleh Administrator',
      actionBy: 'admin'
    };

    setTransactionsList(prev => [newTrx, ...prev]);
    sound.playFanfare();
  };

  const adminAddChildToUser = (userId: string, childData: { name: string; grade: GradeId; age: number; avatarId: string }) => {
    const gradeLabels: Record<GradeId, string> = {
      'paud': 'PAUD',
      'tk': 'TK A/B',
      'sd-1': 'SD Kelas 1',
      'sd-2': 'SD Kelas 2',
      'sd-3': 'SD Kelas 3',
      'sd-4-6': 'SD Kelas 4-6'
    };

    const newChild: ChildProfile = {
      id: `child-${Date.now()}`,
      parentId: userId,
      name: childData.name,
      grade: childData.grade,
      gradeLabel: gradeLabels[childData.grade] || 'SD Kelas 1',
      age: childData.age,
      avatarId: childData.avatarId,
      totalStars: 20,
      streakDays: 1,
      badgesEarned: ['badge_bintang_hitung'],
      completedModules: [],
      quizHistory: {},
      lastActiveAt: new Date().toISOString().split('T')[0]
    };

    setUsersList(prev =>
      prev.map(u => (u.id === userId ? { ...u, children: [...(u.children || []), newChild] } : u))
    );

    if (parentUser.id === userId) {
      setParentUser(prev => ({ ...prev, children: [...(prev.children || []), newChild] }));
    }
    sound.playSuccess();
  };

  const adminUpdateChildOfUser = (userId: string, childId: string, data: Partial<ChildProfile>) => {
    setUsersList(prev =>
      prev.map(u => {
        if (u.id !== userId) return u;
        return {
          ...u,
          children: (u.children || []).map(c => (c.id === childId ? { ...c, ...data } : c))
        };
      })
    );

    if (parentUser.id === userId) {
      setParentUser(prev => ({
        ...prev,
        children: (prev.children || []).map(c => (c.id === childId ? { ...c, ...data } : c))
      }));
    }
    sound.playSuccess();
  };

  const adminDeleteChildOfUser = (userId: string, childId: string) => {
    setUsersList(prev =>
      prev.map(u => {
        if (u.id !== userId) return u;
        return {
          ...u,
          children: (u.children || []).filter(c => c.id !== childId)
        };
      })
    );

    if (parentUser.id === userId) {
      setParentUser(prev => ({
        ...prev,
        children: (prev.children || []).filter(c => c.id !== childId)
      }));
    }
    sound.playPop(400);
  };

  const adminImpersonateUser = (userId: string) => {
    const target = usersList.find(u => u.id === userId);
    if (target) {
      setParentUser(target);
      if (target.children?.length > 0) {
        setActiveChildIdState(target.children[0].id);
      }
      setCurrentMode('parent');
      setActiveView('parent_dashboard');
      sound.playFanfare();
    }
  };

  // Plan Management
  const adminCreatePlan = (plan: SubscriptionPlan) => {
    setSubscriptionPlans(prev => [...prev, plan]);
    sound.playSuccess();
  };

  const adminUpdatePlan = (planId: string, planData: Partial<SubscriptionPlan>) => {
    setSubscriptionPlans(prev =>
      prev.map(p => (p.id === planId ? { ...p, ...planData } : p))
    );
    sound.playSuccess();
  };

  const adminDeletePlan = (planId: string) => {
    setSubscriptionPlans(prev => prev.filter(p => p.id !== planId));
    sound.playPop(400);
  };

  const adminTogglePlanStatus = (planId: string) => {
    setSubscriptionPlans(prev =>
      prev.map(p => (p.id === planId ? { ...p, isActive: p.isActive === false ? true : false } : p))
    );
    sound.playPop(480);
  };

  const adminResetPlansToDefault = () => {
    setSubscriptionPlans(DEFAULT_SUBSCRIPTION_PLANS);
    sound.playSuccess();
  };

  const adminAddTransaction = (trx: Omit<TransactionRecord, 'id' | 'createdAt'>) => {
    const newTrx: TransactionRecord = {
      ...trx,
      id: `TRX-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleString('id-ID')
    };
    setTransactionsList(prev => [newTrx, ...prev]);
    sound.playSuccess();
  };

  const adminResetDatabaseToDefaults = () => {
    setUsersList(INITIAL_USER_LIST);
    setSubscriptionPlans(DEFAULT_SUBSCRIPTION_PLANS);
    setTransactionsList(INITIAL_TRANSACTIONS);
    setAdminPin('8899');
    setParentUser(DEFAULT_NEW_PARENT);
    setActiveChildIdState(DEFAULT_NEW_PARENT.children[0].id);
    localStorage.removeItem(USERS_STORAGE_KEY);
    localStorage.removeItem(PLANS_STORAGE_KEY);
    localStorage.removeItem(TRANSACTIONS_STORAGE_KEY);
    localStorage.removeItem(ADMIN_PIN_KEY);
    localStorage.removeItem(STORAGE_KEY);
    sound.playSuccess();
  };

  const resetAllData = () => {
    localStorage.clear();
    setParentUser(DEFAULT_NEW_PARENT);
    setUsersList([]);
    setSubscriptionPlans(DEFAULT_SUBSCRIPTION_PLANS);
    setTransactionsList([]);
    setActiveChildIdState(DEFAULT_NEW_PARENT.children[0].id);
    setCurrentMode('child');
    setActiveView('child_home');
    sound.playPop(400);
  };

  return (
    <AppContext.Provider
      value={{
        parentUser,
        activeChildId,
        activeChild,
        currentMode,
        activeView,
        activeModuleId,
        soundEnabled,
        speechEnabled,
        isParentalGateOpen,
        isAuthModalOpen,
        isSubscriptionModalOpen,
        isBadgeModalOpen,
        isAddChildModalOpen,
        isBankSoalModalOpen,
        isExpiryModalOpen,
        isAdminGateOpen,
        isAdminAuthenticated,
        adminPin,
        adminSelectedTab,
        practiceQuizSession,
        usersList,
        subscriptionPlans,
        transactionsList,
        setActiveChildId,
        setCurrentMode,
        setActiveView,
        setActiveModuleId,
        openParentalGate,
        closeParentalGate,
        verifyParentalGateSuccess,
        openAuthModal,
        closeAuthModal,
        openSubscriptionModal,
        closeSubscriptionModal,
        openBadgeModal,
        closeBadgeModal,
        openAddChildModal,
        closeAddChildModal,
        openBankSoalModal,
        closeBankSoalModal,
        openExpiryModal,
        closeExpiryModal,
        openAdminGate,
        closeAdminGate,
        verifyAdminPin,
        loginAdminDirect,
        logoutAdmin,
        setAdminSelectedTab,
        updateAdminPin,
        startPracticeQuiz,
        clearPracticeQuizSession,
        toggleSound,
        toggleSpeech,
        loginParent,
        registerParent,
        logoutParent,
        addChild,
        updateChild,
        deleteChild,
        recordQuizCompletion,
        updateSubscription,
        resetAllData,
        adminCreateUser,
        adminUpdateUser,
        adminDeleteUser,
        adminGrantSubscription,
        adminAddChildToUser,
        adminUpdateChildOfUser,
        adminDeleteChildOfUser,
        adminImpersonateUser,
        adminCreatePlan,
        adminUpdatePlan,
        adminDeletePlan,
        adminTogglePlanStatus,
        adminResetPlansToDefault,
        adminAddTransaction,
        adminDeleteAllUsers,
        adminResetDatabaseToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
