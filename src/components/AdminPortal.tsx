import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ParentUser, SubscriptionPlan, TransactionRecord, GradeId, ChildProfile, AdminPortalTab } from '../types';
import { GRADES_LIST } from '../data/modulesData';
import { formatRupiah } from '../data/adminSeedData';
import { sound } from '../utils/audio';
import {
  Users,
  Package,
  CreditCard,
  Settings,
  LayoutDashboard,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  KeyRound,
  RefreshCw,
  LogOut,
  ChevronRight,
  Eye,
  EyeOff,
  AlertTriangle,
  UserCheck,
  Baby,
  Download,
  Filter,
  Check,
  X,
  Star,
  Zap,
  Lock,
  Key,
  Shield,
  Copy
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    adminSelectedTab,
    setAdminSelectedTab,
    usersList,
    subscriptionPlans,
    transactionsList,
    adminPin,
    updateAdminPin,
    logoutAdmin,
    setCurrentMode,
    setActiveView,
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
  } = useApp();

  // Local States for Filters & Modals
  const [searchUserQuery, setSearchUserQuery] = useState<string>('');
  const [filterUserStatus, setFilterUserStatus] = useState<string>('all');
  
  // Selected user for details/modals
  const [selectedUserDetail, setSelectedUserDetail] = useState<ParentUser | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState<boolean>(false);
  const [isGrantSubModalOpen, setIsGrantSubModalOpen] = useState<boolean>(false);
  const [isManageKidsModalOpen, setIsManageKidsModalOpen] = useState<boolean>(false);

  // Form states for Add/Edit User
  const [userFormData, setUserFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    role: 'parent' | 'admin' | 'staff';
    status: 'active' | 'suspended';
    planId: string;
    notes: string;
  }>({
    name: '',
    email: '',
    phone: '',
    role: 'parent',
    status: 'active',
    planId: 'free_trial',
    notes: ''
  });

  // Grant Subscription Modal State
  const [grantSubData, setGrantSubData] = useState<{
    userId: string;
    planId: string;
    status: 'active' | 'trial' | 'expired' | 'suspended';
    durationDays: number;
    customPriceFormatted: string;
    paymentMethod: string;
    notes: string;
  }>({
    userId: '',
    planId: 'annual',
    status: 'active',
    durationDays: 365,
    customPriceFormatted: '',
    paymentMethod: 'Aktivasi Administrator',
    notes: ''
  });

  // Add Child to User Form State
  const [newChildData, setNewChildData] = useState<{
    name: string;
    grade: GradeId;
    age: number;
    avatarId: string;
  }>({
    name: '',
    grade: 'sd-1',
    age: 7,
    avatarId: 'singa'
  });

  // Plan Management Modals & Form
  const [isPlanModalOpen, setIsPlanModalOpen] = useState<boolean>(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [planFormData, setPlanFormData] = useState<SubscriptionPlan>({
    id: '',
    name: '',
    subtitle: '',
    price: 49000,
    priceFormatted: 'Rp 49.000',
    periodText: '/ bulan',
    badgeText: 'Paling Fleksibel',
    savingsText: '',
    popular: false,
    isActive: true,
    maxChildren: 2,
    billingCycleDays: 30,
    features: ['Akses semua modul', 'Laporan belajar orang tua'],
    color: 'border-amber-300 bg-amber-50/60'
  });
  const [newFeatureText, setNewFeatureText] = useState<string>('');

  // Transaction Filter & Add Modal
  const [searchTrxQuery, setSearchTrxQuery] = useState<string>('');
  const [isAddTrxModalOpen, setIsAddTrxModalOpen] = useState<boolean>(false);
  const [newTrxData, setNewTrxData] = useState<{
    userId: string;
    planId: string;
    amount: number;
    paymentMethod: string;
    status: 'success' | 'pending' | 'failed';
    notes: string;
  }>({
    userId: usersList[0]?.id || '',
    planId: 'annual',
    amount: 349000,
    paymentMethod: 'Transfer Manual Bank BCA',
    status: 'success',
    notes: 'Konfirmasi via admin'
  });

  // Admin PIN update state
  const [newPinInput, setNewPinInput] = useState<string>('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState<boolean>(false);

  // Kelola Password / Kredensial States
  const [selectedUserForPassword, setSelectedUserForPassword] = useState<ParentUser | null>(null);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState<boolean>(false);
  const [newCustomPassword, setNewCustomPassword] = useState<string>('');
  const [showAdminPinVisible, setShowAdminPinVisible] = useState<boolean>(false);
  const [passwordCopiedId, setPasswordCopiedId] = useState<string | null>(null);
  const [searchPasswordQuery, setSearchPasswordQuery] = useState<string>('');
  const [userPasswordsMap, setUserPasswordsMap] = useState<Record<string, string>>({
    'parent-callysta': 'callysta2026',
    'parent-1': 'keluargabahagia',
    'parent-2': 'bundahebat123',
    'parent-3': 'ayahcerdas456'
  });
  const [passwordActionMessage, setPasswordActionMessage] = useState<string>('');

  // ================= STATISTICS & KPIS =================
  const stats = useMemo(() => {
    const totalUsers = usersList.length;
    const totalKids = usersList.reduce((sum, u) => sum + (u.children?.length || 0), 0);
    const activeSubscribers = usersList.filter(u => u.activeSubscription?.status === 'active').length;
    const trialUsers = usersList.filter(u => u.activeSubscription?.status === 'trial').length;
    const expiredUsers = usersList.filter(u => u.activeSubscription?.status === 'expired').length;

    const totalRevenue = transactionsList
      .filter(t => t.status === 'success')
      .reduce((sum, t) => sum + t.amount, 0);

    const mrr = usersList
      .filter(u => u.activeSubscription?.status === 'active')
      .reduce((sum, u) => {
        const pId = u.activeSubscription.planId;
        if (pId === 'monthly') return sum + 49000;
        if (pId === 'semi_annual') return sum + Math.round(219000 / 6);
        if (pId === 'annual') return sum + Math.round(349000 / 12);
        return sum;
      }, 0);

    return {
      totalUsers,
      totalKids,
      activeSubscribers,
      trialUsers,
      expiredUsers,
      totalRevenue,
      mrr
    };
  }, [usersList, transactionsList]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return usersList.filter(u => {
      const matchSearch =
        u.name.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
        (u.phone && u.phone.includes(searchUserQuery)) ||
        u.children?.some(c => c.name.toLowerCase().includes(searchUserQuery.toLowerCase()));

      if (!matchSearch) return false;

      if (filterUserStatus === 'all') return true;
      if (filterUserStatus === 'active') return u.activeSubscription?.status === 'active';
      if (filterUserStatus === 'trial') return u.activeSubscription?.status === 'trial';
      if (filterUserStatus === 'expired') return u.activeSubscription?.status === 'expired';
      if (filterUserStatus === 'annual') return u.activeSubscription?.planId === 'annual';
      return true;
    });
  }, [usersList, searchUserQuery, filterUserStatus]);

  // Filtered Transactions
  const filteredTransactions = useMemo(() => {
    return transactionsList.filter(t => {
      return (
        t.id.toLowerCase().includes(searchTrxQuery.toLowerCase()) ||
        t.userName.toLowerCase().includes(searchTrxQuery.toLowerCase()) ||
        t.userEmail.toLowerCase().includes(searchTrxQuery.toLowerCase()) ||
        t.planName.toLowerCase().includes(searchTrxQuery.toLowerCase()) ||
        t.paymentMethod.toLowerCase().includes(searchTrxQuery.toLowerCase())
      );
    });
  }, [transactionsList, searchTrxQuery]);

  // Handle Add / Edit User Form Submit
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFormData.name || !userFormData.email) {
      alert('Nama dan Email wajib diisi.');
      return;
    }

    if (isEditUserModalOpen && selectedUserDetail) {
      adminUpdateUser(selectedUserDetail.id, {
        name: userFormData.name,
        email: userFormData.email,
        phone: userFormData.phone,
        role: userFormData.role,
        status: userFormData.status,
        notes: userFormData.notes
      });
      setIsEditUserModalOpen(false);
    } else {
      adminCreateUser({
        name: userFormData.name,
        email: userFormData.email,
        phone: userFormData.phone,
        role: userFormData.role,
        planId: userFormData.planId,
        notes: userFormData.notes
      });
      setIsAddUserModalOpen(false);
    }
  };

  // Open Grant Subscription Modal for user
  const openGrantSubModal = (user: ParentUser) => {
    sound.playPop(480);
    setSelectedUserDetail(user);
    setGrantSubData({
      userId: user.id,
      planId: user.activeSubscription.planId || 'annual',
      status: 'active',
      durationDays: 365,
      customPriceFormatted: '',
      paymentMethod: 'Aktivasi Administrator',
      notes: 'Diaktifkan melalui portal admin'
    });
    setIsGrantSubModalOpen(true);
  };

  const handleGrantSubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserDetail) return;

    adminGrantSubscription(
      selectedUserDetail.id,
      grantSubData.planId,
      grantSubData.durationDays,
      grantSubData.status,
      grantSubData.customPriceFormatted || undefined,
      grantSubData.paymentMethod,
      grantSubData.notes
    );

    setIsGrantSubModalOpen(false);
  };

  // Open Kids Management Modal for user
  const openManageKidsModal = (user: ParentUser) => {
    sound.playPop(480);
    setSelectedUserDetail(user);
    setNewChildData({
      name: '',
      grade: 'sd-1',
      age: 7,
      avatarId: 'singa'
    });
    setIsManageKidsModalOpen(true);
  };

  const handleAddChildToSelectedUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserDetail || !newChildData.name) {
      alert('Nama anak wajib diisi.');
      return;
    }
    adminAddChildToUser(selectedUserDetail.id, newChildData);
    setNewChildData({
      name: '',
      grade: 'sd-1',
      age: 7,
      avatarId: 'singa'
    });
    // refresh selectedUserDetail
    const updated = usersList.find(u => u.id === selectedUserDetail.id);
    if (updated) setSelectedUserDetail(updated);
  };

  // Plan Management Actions
  const handleOpenAddPlan = () => {
    sound.playPop(500);
    setEditingPlanId(null);
    setPlanFormData({
      id: `plan_custom_${Date.now().toString().slice(-4)}`,
      name: '',
      subtitle: '',
      price: 99000,
      priceFormatted: 'Rp 99.000',
      periodText: '/ paket',
      badgeText: 'Paket Spesial',
      savingsText: '',
      popular: false,
      isActive: true,
      maxChildren: 3,
      billingCycleDays: 90,
      features: ['Akses seluruh modul', 'Kuis & koin bintang', 'Laporan mingguan'],
      color: 'border-blue-300 bg-blue-50/60'
    });
    setIsPlanModalOpen(true);
  };

  const handleOpenEditPlan = (plan: SubscriptionPlan) => {
    sound.playPop(480);
    setEditingPlanId(plan.id);
    setPlanFormData({ ...plan });
    setIsPlanModalOpen(true);
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!planFormData.name) {
      alert('Nama paket wajib diisi.');
      return;
    }

    const formattedPrice = planFormData.price === 0 ? 'Gratis Rp 0' : formatRupiah(planFormData.price);
    const planToSave = {
      ...planFormData,
      priceFormatted: formattedPrice
    };

    if (editingPlanId) {
      adminUpdatePlan(editingPlanId, planToSave);
    } else {
      adminCreatePlan(planToSave);
    }
    setIsPlanModalOpen(false);
  };

  const handleAddFeatureToPlan = () => {
    if (!newFeatureText.trim()) return;
    setPlanFormData(prev => ({
      ...prev,
      features: [...prev.features, newFeatureText.trim()]
    }));
    setNewFeatureText('');
  };

  const handleRemoveFeatureFromPlan = (idx: number) => {
    setPlanFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx)
    }));
  };

  // Export Data JSON
  const handleExportDataJSON = () => {
    sound.playPop(520);
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      platform: 'KARIA KU Admin Portal',
      usersCount: usersList.length,
      users: usersList,
      plans: subscriptionPlans,
      transactions: transactionsList
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kariaku_database_export_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-[#F7F4EB] text-[#4E342E] pb-16">
      {/* Admin Top Header Banner */}
      <div className="bg-[#2E1C18] text-white border-b-4 border-[#D97706] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D97706] to-[#F59E0B] flex items-center justify-center text-white text-xl shadow-xs border border-[#FFE082]">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#D97706] text-white px-2 py-0.5 rounded-md">
                  Super Administrator
                </span>
                <span className="text-xs text-amber-200 font-bold hidden sm:inline">
                  KARIA KU Learning Core
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black font-heading tracking-tight leading-none text-white">
                Admin Control Center
              </h1>
            </div>
          </div>

          {/* Quick Stats & Exit Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              id="btn-admin-switch-parent"
              onClick={() => {
                sound.playPop(420);
                setCurrentMode('parent');
                setActiveView('parent_dashboard');
              }}
              className="px-3 py-1.5 bg-[#4E342E] hover:bg-[#5D4037] border border-[#8D6E63] text-amber-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>👨‍👩‍👧 Dashboard Ortu</span>
            </button>

            <button
              id="btn-admin-switch-child"
              onClick={() => {
                sound.playPop(420);
                setCurrentMode('child');
                setActiveView('child_home');
              }}
              className="px-3 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>🎮 Beranda Anak</span>
            </button>

            <button
              id="btn-admin-logout"
              onClick={logoutAdmin}
              title="Keluar dari mode Admin"
              className="p-1.5 bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-700/60 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-[#4E342E]/60 pt-1">
          {[
            { id: 'overview' as AdminPortalTab, label: 'Ringkasan & KPI', icon: LayoutDashboard, count: undefined },
            { id: 'users' as AdminPortalTab, label: 'Kelola Pengguna & Anak', icon: Users, count: usersList.length },
            { id: 'packages' as AdminPortalTab, label: 'Paket Langganan', icon: Package, count: subscriptionPlans.length },
            { id: 'transactions' as AdminPortalTab, label: 'Riwayat Transaksi', icon: CreditCard, count: transactionsList.length },
            { id: 'passwords' as AdminPortalTab, label: 'Kelola Password & Akses', icon: KeyRound, count: usersList.length },
            { id: 'settings' as AdminPortalTab, label: 'Pengaturan Sistem', icon: Settings, count: undefined }
          ].map(tab => {
            const isActive = adminSelectedTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`admin-tab-${tab.id}`}
                onClick={() => {
                  sound.playPop(480);
                  setAdminSelectedTab(tab.id);
                }}
                className={`px-3.5 py-2.5 rounded-t-xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border-t-2 ${
                  isActive
                    ? 'bg-[#F7F4EB] text-[#4E342E] border-[#D97706] shadow-xs'
                    : 'text-[#D7CCC8] hover:text-white border-transparent hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D97706]' : 'text-[#A1887F]'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isActive ? 'bg-[#FFE082] text-[#5D4037]' : 'bg-[#4E342E] text-amber-200'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-6">
        {/* ================= TAB 1: OVERVIEW & KPIS ================= */}
        {adminSelectedTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-[#FAF8F0] p-4 sm:p-5 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs">
                <div className="flex items-center justify-between text-[#8D6E63] text-xs font-extrabold uppercase">
                  <span>Total Pengguna</span>
                  <Users className="w-4 h-4 text-[#D97706]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-heading text-[#4E342E] mt-2">
                  {stats.totalUsers}{' '}
                  <span className="text-xs font-bold text-[#8D6E63]">Akun Ortu</span>
                </div>
                <div className="text-[11px] font-bold text-[#2E7D32] mt-1 flex items-center gap-1">
                  <span>👶 {stats.totalKids} Profil Anak Terdaftar</span>
                </div>
              </div>

              <div className="bg-[#FAF8F0] p-4 sm:p-5 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs">
                <div className="flex items-center justify-between text-[#8D6E63] text-xs font-extrabold uppercase">
                  <span>Langganan Aktif</span>
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-heading text-[#2E7D32] mt-2">
                  {stats.activeSubscribers}{' '}
                  <span className="text-xs font-bold text-[#8D6E63]">Keluarga</span>
                </div>
                <div className="text-[11px] font-bold text-[#D97706] mt-1">
                  ⚡ {stats.trialUsers} Akun Free Trial Aktif
                </div>
              </div>

              <div className="bg-[#FAF8F0] p-4 sm:p-5 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs">
                <div className="flex items-center justify-between text-[#8D6E63] text-xs font-extrabold uppercase">
                  <span>Estimasi MRR</span>
                  <Sparkles className="w-4 h-4 text-[#FFB74D]" />
                </div>
                <div className="text-xl sm:text-2xl font-black font-heading text-[#D97706] mt-2">
                  {formatRupiah(stats.mrr)}
                </div>
                <div className="text-[11px] font-bold text-[#6D4C41] mt-1">
                  Pendapatan Bulanan Berulang
                </div>
              </div>

              <div className="bg-[#FAF8F0] p-4 sm:p-5 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs">
                <div className="flex items-center justify-between text-[#8D6E63] text-xs font-extrabold uppercase">
                  <span>Total Transaksi</span>
                  <CreditCard className="w-4 h-4 text-[#1565C0]" />
                </div>
                <div className="text-xl sm:text-2xl font-black font-heading text-[#1565C0] mt-2">
                  {formatRupiah(stats.totalRevenue)}
                </div>
                <div className="text-[11px] font-bold text-[#6D4C41] mt-1">
                  {transactionsList.length} Transaksi Tercatat
                </div>
              </div>
            </div>

            {/* Quick Action Banner & Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Popular Packages Overview */}
              <div className="lg:col-span-2 bg-[#FAF8F0] p-5 sm:p-6 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-black font-heading text-[#4E342E] flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#D97706]" />
                    <span>Distribusi Paket Berlangganan Aktif</span>
                  </h3>
                  <button
                    onClick={() => setAdminSelectedTab('packages')}
                    className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Kelola Semua Paket</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {subscriptionPlans.map(plan => {
                    const count = usersList.filter(u => u.activeSubscription?.planId === plan.id).length;
                    const percentage = usersList.length > 0 ? Math.round((count / usersList.length) * 100) : 0;
                    return (
                      <div
                        key={plan.id}
                        className="p-3.5 bg-white rounded-2xl border border-[#E7E2D6] flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#FFF8E1] border border-[#FFE082] flex items-center justify-center text-lg">
                            {plan.id === 'annual' ? '👑' : plan.id === 'monthly' ? '📅' : plan.id === 'semi_annual' ? '📘' : '🐣'}
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-black text-[#4E342E] flex items-center gap-2">
                              <span>{plan.name}</span>
                              {plan.isActive === false && (
                                <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold">
                                  Non-aktif
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#8D6E63] font-bold">
                              {plan.priceFormatted} {plan.periodText}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-black text-[#D97706]">
                            {count} Pengguna
                          </div>
                          <div className="text-[10px] font-bold text-[#8D6E63]">
                            {percentage}% dari total
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Quick Admin Shortcut Actions */}
              <div className="bg-gradient-to-br from-[#FFF8E1] to-[#FAF8F0] p-5 sm:p-6 rounded-3xl border-2 border-[#FFE082] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-[#D97706]" />
                    <h3 className="text-base font-black font-heading text-[#4E342E]">
                      Aksi Cepat Admin
                    </h3>
                  </div>
                  <p className="text-xs text-[#6D4C41] font-semibold mb-4">
                    Pintasan manajemen langsung untuk operasional harian:
                  </p>

                  <div className="space-y-2">
                    <button
                      id="btn-shortcut-add-user"
                      onClick={() => {
                        sound.playPop(500);
                        setUserFormData({
                          name: '',
                          email: '',
                          phone: '',
                          role: 'parent',
                          status: 'active',
                          planId: 'annual',
                          notes: ''
                        });
                        setIsAddUserModalOpen(true);
                      }}
                      className="w-full py-2.5 px-3 bg-white hover:bg-[#FFF8E1] border-2 border-[#D7CCC8] hover:border-[#D97706] rounded-2xl text-xs font-black text-[#4E342E] transition-all flex items-center justify-between cursor-pointer shadow-2xs"
                    >
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#D97706]" />
                        <span>Tambah Pengguna Baru</span>
                      </span>
                      <Plus className="w-4 h-4 text-[#8D6E63]" />
                    </button>

                    <button
                      id="btn-shortcut-add-plan"
                      onClick={handleOpenAddPlan}
                      className="w-full py-2.5 px-3 bg-white hover:bg-[#FFF8E1] border-2 border-[#D7CCC8] hover:border-[#D97706] rounded-2xl text-xs font-black text-[#4E342E] transition-all flex items-center justify-between cursor-pointer shadow-2xs"
                    >
                      <span className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#2E7D32]" />
                        <span>Buat Paket Langganan Baru</span>
                      </span>
                      <Plus className="w-4 h-4 text-[#8D6E63]" />
                    </button>

                    <button
                      id="btn-shortcut-passwords"
                      onClick={() => {
                        sound.playPop(480);
                        setAdminSelectedTab('passwords');
                      }}
                      className="w-full py-2.5 px-3 bg-white hover:bg-[#FFF8E1] border-2 border-[#D7CCC8] hover:border-[#D97706] rounded-2xl text-xs font-black text-[#4E342E] transition-all flex items-center justify-between cursor-pointer shadow-2xs"
                    >
                      <span className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-[#D97706]" />
                        <span>Kelola Password & Akses</span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#8D6E63]" />
                    </button>

                    <button
                      id="btn-shortcut-export"
                      onClick={handleExportDataJSON}
                      className="w-full py-2.5 px-3 bg-white hover:bg-[#FFF8E1] border-2 border-[#D7CCC8] hover:border-[#D97706] rounded-2xl text-xs font-black text-[#4E342E] transition-all flex items-center justify-between cursor-pointer shadow-2xs"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#1565C0]" />
                        <span>Export Database (JSON)</span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#8D6E63]" />
                    </button>
                  </div>
                </div>

                <div className="mt-5 p-3 bg-white/80 rounded-2xl border border-[#FFE082] text-[11px] text-[#8D6E63]">
                  💡 <strong>Info:</strong> Perubahan paket atau pengguna di portal ini langsung disinkronkan ke seluruh aplikasi & penyimpanan browser.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: USER & CHILDREN MANAGEMENT ================= */}
        {adminSelectedTab === 'users' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Action & Filter Toolbar */}
            <div className="bg-[#FAF8F0] p-4 sm:p-5 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8D6E63]" />
                  <input
                    type="text"
                    id="input-search-users"
                    placeholder="Cari nama orang tua, email, anak, atau telepon..."
                    value={searchUserQuery}
                    onChange={e => setSearchUserQuery(e.target.value)}
                    className="w-full pl-9.5 pr-4 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] focus:border-[#D97706] text-xs font-bold text-[#4E342E] outline-none"
                  />
                  {searchUserQuery && (
                    <button
                      onClick={() => setSearchUserQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-[#4E342E]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Status Selector */}
                <select
                  id="select-filter-user-status"
                  value={filterUserStatus}
                  onChange={e => setFilterUserStatus(e.target.value)}
                  className="px-3 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none cursor-pointer"
                >
                  <option value="all">Semua Status ({usersList.length})</option>
                  <option value="active">Langganan Aktif</option>
                  <option value="trial">Uji Coba (Trial)</option>
                  <option value="expired">Expired / Berakhir</option>
                  <option value="annual">Paket Tahunan VIP</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                {usersList.length > 0 && (
                  <button
                    id="btn-admin-delete-all-users"
                    type="button"
                    onClick={() => {
                      if (confirm(`Apakah Anda yakin ingin menghapus SEMUA (${usersList.length}) akun pelanggan? Tindakan ini tidak dapat dibatalkan.`)) {
                        adminDeleteAllUsers();
                        alert('Semua akun pelanggan telah berhasil dihapus.');
                      }
                    }}
                    className="px-3.5 py-2.5 bg-red-50 hover:bg-red-100 border border-red-300 text-red-700 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Semua Pelanggan</span>
                  </button>
                )}

                <button
                  id="btn-admin-add-new-user"
                  onClick={() => {
                    sound.playPop(520);
                    setUserFormData({
                      name: '',
                      email: '',
                      phone: '',
                      role: 'parent',
                      status: 'active',
                      planId: 'annual',
                      notes: ''
                    });
                    setIsAddUserModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl font-black text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pengguna Baru</span>
                </button>
              </div>
            </div>

            {/* Users Table / List Cards */}
            <div className="space-y-3">
              {filteredUsers.length === 0 ? (
                <div className="bg-[#FAF8F0] p-10 rounded-3xl border-2 border-dashed border-[#D7CCC8] text-center text-[#8D6E63]">
                  <Users className="w-10 h-10 mx-auto text-[#BCAAA4] mb-2" />
                  <h4 className="text-sm font-black text-[#4E342E]">
                    {usersList.length === 0 ? 'Semua Akun Pelanggan Telah Dihapus / Kosong' : 'Tidak Ada Pengguna Ditemukan'}
                  </h4>
                  <p className="text-xs mt-1">
                    {usersList.length === 0 
                      ? 'Saat ini belum ada akun pelanggan terdaftar. Anda dapat menambahkan pengguna baru atau menunggu pendaftaran orang tua.'
                      : 'Coba sesuaikan kata kunci pencarian atau filter status.'}
                  </p>
                </div>
              ) : (
                filteredUsers.map(user => {
                  const subStatus = user.activeSubscription?.status || 'expired';
                  const isTrial = subStatus === 'trial';
                  const isActive = subStatus === 'active';
                  const isExpired = subStatus === 'expired';

                  return (
                    <div
                      key={user.id}
                      className="bg-[#FAF8F0] p-4 sm:p-5 rounded-3xl border-2 border-[#E7E2D6] hover:border-[#D97706]/60 transition-all shadow-2xs"
                    >
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        {/* User Identity & Info */}
                        <div className="flex items-start gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FFE082] to-[#FFD54F] border-2 border-white shadow-2xs flex items-center justify-center text-2xl shrink-0">
                            {user.role === 'admin' ? '🛡️' : '👨‍👩‍👧'}
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-base font-black text-[#4E342E]">{user.name}</h4>
                              {user.role === 'admin' && (
                                <span className="text-[10px] bg-purple-100 text-purple-800 border border-purple-300 px-2 py-0.2 rounded-full font-black">
                                  Admin Staff
                                </span>
                              )}
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                                  isActive
                                    ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]'
                                    : isTrial
                                    ? 'bg-[#FFF8E1] text-[#D97706] border border-[#FFE082]'
                                    : 'bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]'
                                }`}
                              >
                                {isActive ? '● Aktif' : isTrial ? '● Trial 7 Hari' : '● Expired'}
                              </span>
                            </div>

                            <div className="text-xs text-[#6D4C41] font-semibold mt-0.5 flex flex-wrap items-center gap-3">
                              <span>📧 {user.email}</span>
                              {user.phone && <span>📱 {user.phone}</span>}
                              <span>🗓️ Gabung: {user.createdAt}</span>
                            </div>

                            {/* Subscription Badge */}
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-black text-[#1565C0] bg-[#E3F2FD] px-2.5 py-0.5 rounded-lg border border-[#90CAF9] flex items-center gap-1">
                                <Package className="w-3 h-3 text-[#1565C0]" />
                                <span>{user.activeSubscription?.planName || 'Tanpa Paket'}</span>
                              </span>
                              <span className="text-[11px] text-[#8D6E63] font-bold">
                                Berlaku s.d: <strong>{user.activeSubscription?.expiresAt || '-'}</strong>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Children Registered Badge Preview */}
                        <div className="bg-white/80 p-2.5 rounded-2xl border border-[#E7E2D6] w-full lg:w-auto">
                          <div className="text-[10px] font-black uppercase text-[#8D6E63] mb-1.5 flex items-center gap-1">
                            <Baby className="w-3 h-3 text-[#D97706]" />
                            <span>Anak Terdaftar ({user.children?.length || 0}):</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {user.children && user.children.length > 0 ? (
                              user.children.map(child => (
                                <span
                                  key={child.id}
                                  className="text-[11px] font-extrabold bg-[#FFF8E1] text-[#5D4037] border border-[#FFE082] px-2 py-0.5 rounded-lg flex items-center gap-1"
                                >
                                  <span>⭐ {child.totalStars}</span>
                                  <span>{child.name}</span>
                                  <span className="text-[9px] text-[#8D6E63]">({child.gradeLabel})</span>
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-[#BCAAA4] italic">Belum ada profil anak</span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons Group */}
                        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-[#E7E2D6]">
                          {/* Grant Subscription Button */}
                          <button
                            id={`btn-grant-sub-${user.id}`}
                            onClick={() => openGrantSubModal(user)}
                            title="Atur / Beri Paket Langganan"
                            className="px-2.5 py-1.5 bg-[#E8F5E9] hover:bg-[#C8E6C9] border border-[#A5D6A7] text-[#2E7D32] rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                          >
                            <Zap className="w-3.5 h-3.5 text-[#2E7D32]" />
                            <span>Beri Paket</span>
                          </button>

                          {/* Manage Kids Button */}
                          <button
                            id={`btn-manage-kids-${user.id}`}
                            onClick={() => openManageKidsModal(user)}
                            title="Kelola Data Profil Anak"
                            className="px-2.5 py-1.5 bg-[#FFF8E1] hover:bg-[#FFE082] border border-[#FFE082] text-[#B45309] rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                          >
                            <Baby className="w-3.5 h-3.5" />
                            <span>Profil Anak</span>
                          </button>

                          {/* Quick Password / Credential Button */}
                          <button
                            id={`btn-user-password-${user.id}`}
                            onClick={() => {
                              sound.playPop(480);
                              setSelectedUserForPassword(user);
                              setNewCustomPassword('');
                              setIsResetPasswordModalOpen(true);
                            }}
                            title="Kelola & Ubah Kata Sandi Akun"
                            className="px-2.5 py-1.5 bg-[#FAF8F0] hover:bg-[#FFE082] border border-[#D7CCC8] text-[#5D4037] rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                          >
                            <KeyRound className="w-3.5 h-3.5 text-[#D97706]" />
                            <span>Password</span>
                          </button>

                          {/* Edit User Info */}
                          <button
                            id={`btn-edit-user-${user.id}`}
                            onClick={() => {
                              sound.playPop(480);
                              setSelectedUserDetail(user);
                              setUserFormData({
                                name: user.name,
                                email: user.email,
                                phone: user.phone || '',
                                role: user.role || 'parent',
                                status: (user.status as 'active' | 'suspended') || 'active',
                                planId: user.activeSubscription?.planId || 'annual',
                                notes: user.notes || ''
                              });
                              setIsEditUserModalOpen(true);
                            }}
                            title="Edit Data Akun"
                            className="p-1.5 bg-white hover:bg-[#FAF8F0] border border-[#D7CCC8] text-[#6D4C41] rounded-xl text-xs font-bold transition-all cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Impersonate Login */}
                          <button
                            id={`btn-impersonate-${user.id}`}
                            onClick={() => {
                              if (confirm(`Masuk dan uji coba aplikasi sebagai akun ${user.name}?`)) {
                                adminImpersonateUser(user.id);
                              }
                            }}
                            title="Login Sebagai Pengguna Ini"
                            className="px-2.5 py-1.5 bg-[#1565C0] hover:bg-[#0D47A1] text-white rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Login Akun</span>
                          </button>

                          {/* Delete User */}
                          <button
                            id={`btn-delete-user-${user.id}`}
                            onClick={() => {
                              if (confirm(`Yakin ingin menghapus pengguna ${user.name} secara permanen?`)) {
                                adminDeleteUser(user.id);
                              }
                            }}
                            title="Hapus Akun Pengguna"
                            className="p-1.5 bg-white hover:bg-red-50 border border-red-200 text-red-600 rounded-xl transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: SUBSCRIPTION PLANS MANAGEMENT ================= */}
        {adminSelectedTab === 'packages' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header with Add Button */}
            <div className="bg-[#FAF8F0] p-4 sm:p-6 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black font-heading text-[#4E342E] flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#D97706]" />
                  <span>Manajemen Paket Langganan & Harga</span>
                </h3>
                <p className="text-xs text-[#6D4C41] font-semibold mt-0.5">
                  Ubah harga, teks promo, fitur, batas profil anak, atau tambah paket promo baru langsung dari panel ini.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  id="btn-reset-plans-default"
                  onClick={() => {
                    if (confirm('Kembalikan seluruh paket langganan ke standar default?')) {
                      adminResetPlansToDefault();
                    }
                  }}
                  className="px-3 py-2 bg-white hover:bg-[#F5F2E9] border-2 border-[#D7CCC8] text-[#8D6E63] rounded-2xl text-xs font-bold transition-all cursor-pointer"
                >
                  <span>Reset Default</span>
                </button>

                <button
                  id="btn-admin-create-plan"
                  onClick={handleOpenAddPlan}
                  className="px-4 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl font-black text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Paket Baru</span>
                </button>
              </div>
            </div>

            {/* Plans Grid Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subscriptionPlans.map(plan => {
                const isActive = plan.isActive !== false;
                const activeSubsCount = usersList.filter(u => u.activeSubscription?.planId === plan.id).length;

                return (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-3xl border-3 p-5 shadow-2xs flex flex-col justify-between relative transition-all ${
                      isActive ? 'border-[#E7E2D6] hover:border-[#D97706]' : 'border-red-200 bg-red-50/30 opacity-75'
                    }`}
                  >
                    {/* Badge header */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {isActive ? '● Paket Aktif' : '● Dinonaktifkan'}
                        </span>

                        {plan.popular && (
                          <span className="text-[10px] bg-[#D97706] text-white px-2 py-0.5 rounded-full font-black uppercase shadow-2xs">
                            Favorit
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-black font-heading text-[#4E342E]">{plan.name}</h4>
                      <p className="text-[11px] text-[#8D6E63] font-semibold mt-0.5 line-clamp-2">
                        {plan.subtitle}
                      </p>

                      {/* Price Tag */}
                      <div className="my-3 p-3 bg-[#FAF8F0] rounded-2xl border border-[#E7E2D6]">
                        <div className="text-2xl font-black text-[#D97706] font-heading leading-tight">
                          {plan.priceFormatted}
                        </div>
                        <div className="text-[11px] font-bold text-[#8D6E63]">
                          {plan.periodText} ({plan.billingCycleDays || 30} Hari)
                        </div>
                      </div>

                      {/* Meta limits */}
                      <div className="text-[11px] text-[#5D4037] font-extrabold space-y-1 mb-3">
                        <div className="flex items-center justify-between">
                          <span>Maksimal Anak:</span>
                          <span className="text-[#D97706]">{plan.maxChildren || 2} Profil</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Pengguna Aktif:</span>
                          <span className="text-[#2E7D32]">{activeSubsCount} Akun</span>
                        </div>
                      </div>

                      {/* Features preview */}
                      <div className="space-y-1 text-xs text-[#6D4C41] border-t border-[#E7E2D6] pt-2 mb-4">
                        {plan.features?.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                        {(plan.features?.length || 0) > 3 && (
                          <div className="text-[10px] text-[#8D6E63] font-bold pl-5">
                            +{plan.features.length - 3} fitur lainnya
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons for Plan */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E7E2D6]">
                      <button
                        id={`btn-edit-plan-${plan.id}`}
                        onClick={() => handleOpenEditPlan(plan)}
                        className="py-2 px-2.5 bg-[#FAF8F0] hover:bg-[#FFF8E1] border border-[#D7CCC8] text-[#4E342E] rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Edit</span>
                      </button>

                      <button
                        id={`btn-toggle-plan-${plan.id}`}
                        onClick={() => adminTogglePlanStatus(plan.id)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          isActive
                            ? 'bg-amber-50 hover:bg-amber-100 text-[#B45309] border border-amber-200'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        <span>{isActive ? 'Nonaktifkan' : 'Aktifkan'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 4: TRANSACTIONS LOG ================= */}
        {adminSelectedTab === 'transactions' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Header and Filter */}
            <div className="bg-[#FAF8F0] p-4 sm:p-5 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8D6E63]" />
                <input
                  type="text"
                  id="input-search-trx"
                  placeholder="Cari ID transaksi, nama pelanggan, email, atau metode..."
                  value={searchTrxQuery}
                  onChange={e => setSearchTrxQuery(e.target.value)}
                  className="w-full pl-9.5 pr-4 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] focus:border-[#D97706] text-xs font-bold text-[#4E342E] outline-none"
                />
              </div>

              <button
                id="btn-add-manual-trx"
                onClick={() => {
                  sound.playPop(500);
                  setIsAddTrxModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl font-black text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Catat Transaksi Manual</span>
              </button>
            </div>

            {/* Transactions Table */}
            <div className="bg-[#FAF8F0] rounded-3xl border-2 border-[#E7E2D6] overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EDE7E2] text-[#5D4037] font-black uppercase text-[10px] tracking-wider border-b border-[#D7CCC8]">
                    <tr>
                      <th className="py-3 px-4">ID Transaksi</th>
                      <th className="py-3 px-4">Pelanggan</th>
                      <th className="py-3 px-4">Paket</th>
                      <th className="py-3 px-4">Nominal</th>
                      <th className="py-3 px-4">Metode Pembayaran</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Waktu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E2D6] font-semibold text-[#4E342E]">
                    {filteredTransactions.map(trx => (
                      <tr key={trx.id} className="hover:bg-white/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#8D6E63]">{trx.id}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#4E342E]">{trx.userName}</div>
                          <div className="text-[10px] text-[#8D6E63]">{trx.userEmail}</div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#1565C0]">{trx.planName}</td>
                        <td className="py-3.5 px-4 font-bold text-[#2E7D32]">
                          {trx.amountFormatted || formatRupiah(trx.amount)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="bg-white border border-[#D7CCC8] px-2 py-0.5 rounded-md text-[11px] font-bold">
                            {trx.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
                            ✓ {trx.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#8D6E63] text-[11px]">{trx.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: PASSWORD & ACCESS CREDENTIALS MANAGEMENT ================= */}
        {adminSelectedTab === 'passwords' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header / Intro Card */}
            <div className="bg-gradient-to-r from-[#4E342E] to-[#2E1C18] text-white p-5 sm:p-6 rounded-3xl border-2 border-[#8D6E63] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#D97706] text-white flex items-center justify-center text-2xl shadow-xs shrink-0">
                  <KeyRound className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black font-heading text-amber-100 flex items-center gap-2">
                    <span>Manajemen Password & Akses Akun</span>
                    <span className="text-[10px] bg-amber-400/20 text-amber-200 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold uppercase">
                      Admin Security Center
                    </span>
                  </h3>
                  <p className="text-xs text-[#D7CCC8] mt-0.5">
                    Kelola kata sandi akun orang tua, reset password langsung, buat kata sandi instan, serta amankan PIN portal admin.
                  </p>
                </div>
              </div>

              {/* Master Admin PIN Quick Display / Toggle */}
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-200">PIN Master Admin</div>
                  <div className="text-sm font-mono font-black tracking-widest text-white mt-0.5">
                    {showAdminPinVisible ? adminPin : '••••••'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    sound.playPop(400);
                    setShowAdminPinVisible(!showAdminPinVisible);
                  }}
                  className="p-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-amber-100 transition-colors cursor-pointer"
                  title={showAdminPinVisible ? 'Sembunyikan PIN' : 'Tampilkan PIN'}
                >
                  {showAdminPinVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Notification alert if action performed */}
            {passwordActionMessage && (
              <div className="p-4 bg-[#E8F5E9] border-2 border-[#A5D6A7] text-[#1B5E20] rounded-2xl text-xs font-black flex items-center justify-between gap-2 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                  <span>{passwordActionMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPasswordActionMessage('')}
                  className="text-[#2E7D32] hover:text-[#1B5E20] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Quick Actions Grid for Password Management */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Ganti PIN Admin */}
              <div className="bg-[#FAF8F0] p-5 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#D97706] font-black text-xs uppercase">
                    <Shield className="w-4 h-4" />
                    <span>PIN Keamanan Admin</span>
                  </div>
                  <h4 className="text-sm font-black text-[#4E342E] mb-1">Perbarui PIN Master</h4>
                  <p className="text-xs text-[#6D4C41] mb-3">
                    Ubah 4-6 digit PIN yang digunakan untuk masuk ke portal admin dari menu manapun.
                  </p>
                </div>

                <div className="space-y-2">
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="PIN baru (4-6 digit)..."
                    value={newPinInput}
                    onChange={e => setNewPinInput(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#D7CCC8] text-xs font-mono font-bold text-center tracking-widest outline-none focus:border-[#D97706]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newPinInput.length < 4) {
                        alert('PIN minimal 4 digit.');
                        return;
                      }
                      updateAdminPin(newPinInput);
                      setPasswordActionMessage(`PIN Master Admin berhasil diubah ke: ${newPinInput}`);
                      setNewPinInput('');
                      sound.playSuccess();
                    }}
                    className="w-full py-2 bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl text-xs font-black cursor-pointer shadow-xs transition-colors"
                  >
                    Simpan PIN Admin Baru
                  </button>
                </div>
              </div>

              {/* Card 2: Buat Password Acak Cepat */}
              <div className="bg-[#FAF8F0] p-5 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#1565C0] font-black text-xs uppercase">
                    <Sparkles className="w-4 h-4" />
                    <span>Generator Kata Sandi Kuat</span>
                  </div>
                  <h4 className="text-sm font-black text-[#4E342E] mb-1">Generate Password Baru</h4>
                  <p className="text-xs text-[#6D4C41] mb-3">
                    Buat kata sandi aman otomatis untuk diberikan kepada orang tua murid atau guru.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={newCustomPassword || 'Klik tombol Buat...'}
                      className="flex-1 px-3 py-2 bg-white rounded-xl border border-[#D7CCC8] text-xs font-mono font-bold text-[#1565C0] outline-none select-all"
                    />
                    {newCustomPassword && (
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(newCustomPassword);
                          setPasswordActionMessage(`Password "${newCustomPassword}" disalin ke clipboard!`);
                          sound.playPop(450);
                        }}
                        className="px-2.5 py-2 bg-[#E3F2FD] hover:bg-[#BBDEFB] text-[#1565C0] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        title="Salin Password"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const chars = 'abcdefghjkmnpqrstuvwxyz23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
                      let generated = 'Kariaku-';
                      for (let i = 0; i < 6; i++) {
                        generated += chars.charAt(Math.floor(Math.random() * chars.length));
                      }
                      setNewCustomPassword(generated);
                      sound.playPop(520);
                    }}
                    className="w-full py-2 bg-[#1565C0] hover:bg-[#0D47A1] text-white rounded-xl text-xs font-black cursor-pointer shadow-xs transition-colors"
                  >
                    🎲 Buat Kata Sandi Acak
                  </button>
                </div>
              </div>

              {/* Card 3: Kebijakan Keamanan & Info */}
              <div className="bg-[#FAF8F0] p-5 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#2E7D32] font-black text-xs uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Panduan Akses & Keamanan</span>
                  </div>
                  <h4 className="text-sm font-black text-[#4E342E] mb-1">Kebijakan Akun Orang Tua</h4>
                  <ul className="text-xs text-[#6D4C41] space-y-1.5 mt-2">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#2E7D32] font-bold">✓</span>
                      <span>Password default dapat disesuaikan per orang tua.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#2E7D32] font-bold">✓</span>
                      <span>Admin dapat mereset dan membagikan password via WhatsApp.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#2E7D32] font-bold">✓</span>
                      <span>Akses orang tua terlindungi dari klik tidak sengaja anak.</span>
                    </li>
                  </ul>
                </div>

                <div className="text-[11px] text-[#8D6E63] font-semibold bg-white p-2.5 rounded-xl border border-[#E7E2D6] mt-3">
                  🔐 <strong>Tersinkron:</strong> Perubahan kata sandi langsung aktif seketika.
                </div>
              </div>
            </div>

            {/* List & Search User Passwords Table */}
            <div className="bg-[#FAF8F0] p-4 sm:p-5 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-black font-heading text-[#4E342E] flex items-center gap-2">
                    <Key className="w-5 h-5 text-[#D97706]" />
                    <span>Daftar Kredensial Pengguna ({usersList.length} Akun)</span>
                  </h4>
                  <p className="text-xs text-[#6D4C41]">
                    Kelola, lihat, dan ganti kata sandi untuk masing-masing akun orang tua dan admin.
                  </p>
                </div>

                {/* Search query input */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8D6E63]" />
                  <input
                    type="text"
                    placeholder="Cari email / nama pengguna..."
                    value={searchPasswordQuery}
                    onChange={e => setSearchPasswordQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none focus:border-[#D97706]"
                  />
                  {searchPasswordQuery && (
                    <button
                      onClick={() => setSearchPasswordQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-[#4E342E]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Password Management Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#E7E2D6] bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EDE7E2] text-[#5D4037] font-black uppercase text-[10px] tracking-wider border-b border-[#D7CCC8]">
                    <tr>
                      <th className="py-3 px-4">Nama Pengguna</th>
                      <th className="py-3 px-4">Email / Login</th>
                      <th className="py-3 px-4">Role Akun</th>
                      <th className="py-3 px-4">Kata Sandi / Kredensial</th>
                      <th className="py-3 px-4">Status Akun</th>
                      <th className="py-3 px-4 text-right">Aksi Kelola</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E2D6] font-semibold text-[#4E342E]">
                    {usersList
                      .filter(u =>
                        u.name.toLowerCase().includes(searchPasswordQuery.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchPasswordQuery.toLowerCase())
                      )
                      .map(user => {
                        const currentPass = userPasswordsMap[user.id] || 'belajar123';
                        const isCopied = passwordCopiedId === user.id;

                        return (
                          <tr key={user.id} className="hover:bg-[#FFF8E1]/40 transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-bold text-[#4E342E]">{user.name}</div>
                              <div className="text-[10px] text-[#8D6E63]">
                                👶 {user.children?.map(c => c.name).join(', ') || 'Belum ada anak'}
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-[#1565C0]">
                              {user.email}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                  user.role === 'admin'
                                    ? 'bg-purple-100 text-purple-800 border border-purple-300'
                                    : 'bg-[#E3F2FD] text-[#1565C0] border border-[#90CAF9]'
                                }`}
                              >
                                {user.role === 'admin' ? '🛡️ Admin Staff' : '👨‍👩‍👧 Orang Tua'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold bg-[#FAF8F0] px-2.5 py-1 rounded-lg border border-[#D7CCC8] text-[#4E342E]">
                                  {currentPass}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(currentPass);
                                    setPasswordCopiedId(user.id);
                                    sound.playPop(440);
                                    setTimeout(() => setPasswordCopiedId(null), 2000);
                                  }}
                                  className="p-1 text-[#8D6E63] hover:text-[#4E342E] hover:bg-[#F5F2E9] rounded-lg transition-colors cursor-pointer"
                                  title="Salin Kata Sandi"
                                >
                                  {isCopied ? (
                                    <Check className="w-3.5 h-3.5 text-green-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  user.status === 'active'
                                    ? 'bg-[#E8F5E9] text-[#2E7D32]'
                                    : 'bg-[#FFEBEE] text-[#C62828]'
                                }`}
                              >
                                ● {user.status || 'active'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    sound.playPop(480);
                                    setSelectedUserForPassword(user);
                                    setNewCustomPassword('');
                                    setIsResetPasswordModalOpen(true);
                                  }}
                                  className="px-2.5 py-1.5 bg-[#FFF8E1] hover:bg-[#FFE082] text-[#B45309] border border-[#FFE082] rounded-xl text-xs font-black transition-colors cursor-pointer flex items-center gap-1"
                                >
                                  <KeyRound className="w-3 h-3" />
                                  <span>Ubah Password</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    const randomPass = 'Kariaku-' + Math.floor(1000 + Math.random() * 9000);
                                    setUserPasswordsMap(prev => ({
                                      ...prev,
                                      [user.id]: randomPass
                                    }));
                                    setPasswordActionMessage(`Password untuk ${user.name} direset ke: ${randomPass}`);
                                    sound.playSuccess();
                                  }}
                                  className="p-1.5 bg-[#FAF8F0] hover:bg-[#EDE7E2] text-[#6D4C41] border border-[#D7CCC8] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                                  title="Reset Password Instan"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: SYSTEM & SECURITY SETTINGS ================= */}
        {adminSelectedTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            {/* PIN Security Card */}
            <div className="bg-[#FAF8F0] p-6 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D97706] text-white flex items-center justify-center text-xl shadow-xs">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black font-heading text-[#4E342E]">
                    Ubah PIN Keamanan Admin
                  </h3>
                  <p className="text-xs text-[#6D4C41] font-semibold">
                    PIN ini digunakan untuk memproteksi akses portal administrator dari anak dan umum.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="password"
                  maxLength={6}
                  id="input-new-admin-pin"
                  placeholder="Masukkan 4-6 digit PIN baru..."
                  value={newPinInput}
                  onChange={e => {
                    setNewPinInput(e.target.value);
                    setPinChangeSuccess(false);
                  }}
                  className="w-full sm:w-64 px-4 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-center tracking-widest font-mono text-base font-black outline-none focus:border-[#D97706]"
                />

                <button
                  type="button"
                  id="btn-save-new-pin"
                  onClick={() => {
                    if (newPinInput.length < 4) {
                      alert('PIN minimal harus 4 digit.');
                      return;
                    }
                    const ok = updateAdminPin(newPinInput);
                    if (ok) {
                      setPinChangeSuccess(true);
                      setNewPinInput('');
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#4E342E] hover:bg-[#3E2723] text-white rounded-2xl text-xs font-black shadow-xs cursor-pointer"
                >
                  Simpan PIN Baru
                </button>
              </div>

              {pinChangeSuccess && (
                <p className="text-xs font-bold text-[#2E7D32] mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PIN Administrator berhasil diperbarui!</span>
                </p>
              )}
            </div>

            {/* Hapus Semua Akun Pelanggan */}
            <div className="bg-[#FAF8F0] p-6 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center text-xl shadow-xs">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black font-heading text-[#4E342E]">
                    Hapus Semua Akun Pelanggan
                  </h3>
                  <p className="text-xs text-[#6D4C41] font-semibold">
                    Hapus seluruh akun orang tua dan data profil anak secara permanen dari sistem.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[#8D6E63] font-semibold">
                  Saat ini terdapat <strong>{usersList.length}</strong> akun pelanggan terdaftar.
                </div>

                <button
                  type="button"
                  id="btn-delete-all-customers-settings"
                  onClick={() => {
                    if (confirm(`Apakah Anda yakin ingin menghapus SEMUA (${usersList.length}) akun pelanggan? Semua data anak dan langganan akan dihapus.`)) {
                      adminDeleteAllUsers();
                      alert('Semua akun pelanggan telah berhasil dibersihkan.');
                    }
                  }}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black transition-colors cursor-pointer shadow-xs"
                >
                  Hapus Semua Akun ({usersList.length})
                </button>
              </div>
            </div>

            {/* Database & Demo Reset */}
            <div className="bg-[#FAF8F0] p-6 rounded-3xl border-2 border-[#E7E2D6] shadow-2xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#C62828] text-white flex items-center justify-center text-xl shadow-xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black font-heading text-[#4E342E]">
                    Reset Basis Data & Contoh Demo
                  </h3>
                  <p className="text-xs text-[#6D4C41] font-semibold">
                    Kembalikan data user contoh, riwayat kuis, transaksi, dan paket langganan ke kondisi awal.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="text-xs text-[#8D6E63] font-semibold">
                  Tindakan ini akan mengatur ulang data di localStorage perangkat ini.
                </div>

                <button
                  type="button"
                  id="btn-reset-demo-database"
                  onClick={() => {
                    if (confirm('Apakah Anda yakin ingin mereset seluruh database demo ke kondisi awal?')) {
                      adminResetDatabaseToDefaults();
                      alert('Database berhasil direset ke standar demo!');
                    }
                  }}
                  className="px-4 py-2.5 bg-red-100 hover:bg-red-200 border border-red-300 text-red-700 rounded-2xl text-xs font-black transition-colors cursor-pointer"
                >
                  Reset Database Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL: ADD / EDIT USER ================= */}
      {(isAddUserModalOpen || isEditUserModalOpen) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#FAF8F0] rounded-3xl border-4 border-[#5D4037] shadow-2xl max-w-lg w-full p-6 relative my-auto">
            <button
              onClick={() => {
                setIsAddUserModalOpen(false);
                setIsEditUserModalOpen(false);
              }}
              className="absolute top-4 right-4 text-[#8D6E63] hover:text-[#4E342E] p-1.5 rounded-xl hover:bg-[#F5F2E9]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black font-heading text-[#4E342E] mb-4">
              {isEditUserModalOpen ? 'Edit Data Pengguna' : 'Tambah Pengguna Baru'}
            </h3>

            <form onSubmit={handleSaveUser} className="space-y-3.5">
              <div>
                <label className="text-xs font-black text-[#5D4037] uppercase">Nama Orang Tua</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Bunda Ratna, Ayah Dimas"
                  value={userFormData.name}
                  onChange={e => setUserFormData({ ...userFormData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#5D4037] uppercase">Email</label>
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  value={userFormData.email}
                  onChange={e => setUserFormData({ ...userFormData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-[#5D4037] uppercase">No. WhatsApp</label>
                  <input
                    type="text"
                    placeholder="0812-xxxx-xxxx"
                    value={userFormData.phone}
                    onChange={e => setUserFormData({ ...userFormData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#5D4037] uppercase">Role Akun</label>
                  <select
                    value={userFormData.role}
                    onChange={e => setUserFormData({ ...userFormData, role: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1 cursor-pointer"
                  >
                    <option value="parent">Parent / Orang Tua</option>
                    <option value="admin">Staff Administrator</option>
                  </select>
                </div>
              </div>

              {!isEditUserModalOpen && (
                <div>
                  <label className="text-xs font-black text-[#5D4037] uppercase">Pilih Paket Awal</label>
                  <select
                    value={userFormData.planId}
                    onChange={e => setUserFormData({ ...userFormData, planId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1 cursor-pointer"
                  >
                    {subscriptionPlans.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.priceFormatted})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs font-black text-[#5D4037] uppercase">Catatan Admin</label>
                <textarea
                  rows={2}
                  placeholder="Catatan khusus pelanggan..."
                  value={userFormData.notes}
                  onChange={e => setUserFormData({ ...userFormData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddUserModalOpen(false);
                    setIsEditUserModalOpen(false);
                  }}
                  className="px-4 py-2.5 bg-white border border-[#D7CCC8] text-[#8D6E63] rounded-2xl text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl text-xs font-black cursor-pointer shadow-xs"
                >
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: GRANT SUBSCRIPTION ================= */}
      {isGrantSubModalOpen && selectedUserDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#FAF8F0] rounded-3xl border-4 border-[#2E7D32] shadow-2xl max-w-lg w-full p-6 relative my-auto">
            <button
              onClick={() => setIsGrantSubModalOpen(false)}
              className="absolute top-4 right-4 text-[#8D6E63] hover:text-[#4E342E] p-1.5 rounded-xl hover:bg-[#F5F2E9]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] flex items-center justify-center text-xl">
                ⚡
              </div>
              <div>
                <h3 className="text-base font-black font-heading text-[#4E342E]">
                  Beri / Ubah Paket Langganan
                </h3>
                <p className="text-xs text-[#6D4C41] font-semibold">
                  Untuk: <strong>{selectedUserDetail.name}</strong> ({selectedUserDetail.email})
                </p>
              </div>
            </div>

            <form onSubmit={handleGrantSubSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-black text-[#5D4037] uppercase">Pilih Paket</label>
                <select
                  value={grantSubData.planId}
                  onChange={e => {
                    const sel = subscriptionPlans.find(p => p.id === e.target.value);
                    setGrantSubData({
                      ...grantSubData,
                      planId: e.target.value,
                      durationDays: sel?.billingCycleDays || 365
                    });
                  }}
                  className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1 cursor-pointer"
                >
                  {subscriptionPlans.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.priceFormatted} - {p.periodText})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-[#5D4037] uppercase">Status Paket</label>
                  <select
                    value={grantSubData.status}
                    onChange={e => setGrantSubData({ ...grantSubData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1 cursor-pointer"
                  >
                    <option value="active">Active (Aktif Penuh)</option>
                    <option value="trial">Trial (Uji Coba)</option>
                    <option value="expired">Expired (Kadaluarsa)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#5D4037] uppercase">Durasi (Hari)</label>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={grantSubData.durationDays}
                    onChange={e => setGrantSubData({ ...grantSubData, durationDays: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-[#5D4037] uppercase">Metode Aktivasi / Keterangan</label>
                <input
                  type="text"
                  placeholder="Misal: Aktivasi Admin, Beasiswa Sekolah, Voucher Promo"
                  value={grantSubData.paymentMethod}
                  onChange={e => setGrantSubData({ ...grantSubData, paymentMethod: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E7E2D6]">
                <button
                  type="button"
                  onClick={() => setIsGrantSubModalOpen(false)}
                  className="px-4 py-2.5 bg-white border border-[#D7CCC8] text-[#8D6E63] rounded-2xl text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-2xl text-xs font-black cursor-pointer shadow-xs"
                >
                  Terapkan Paket Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: MANAGE KIDS ================= */}
      {isManageKidsModalOpen && selectedUserDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#FAF8F0] rounded-3xl border-4 border-[#D97706] shadow-2xl max-w-xl w-full p-6 relative my-auto">
            <button
              onClick={() => setIsManageKidsModalOpen(false)}
              className="absolute top-4 right-4 text-[#8D6E63] hover:text-[#4E342E] p-1.5 rounded-xl hover:bg-[#F5F2E9]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF8E1] text-[#D97706] border border-[#FFE082] flex items-center justify-center text-xl">
                👶
              </div>
              <div>
                <h3 className="text-base font-black font-heading text-[#4E342E]">
                  Kelola Profil Anak ({selectedUserDetail.name})
                </h3>
                <p className="text-xs text-[#6D4C41] font-semibold">
                  Lihat, tambah, atau ubah bintang dan jenjang kelas anak.
                </p>
              </div>
            </div>

            {/* List Existing Kids */}
            <div className="space-y-2.5 mb-5 max-h-56 overflow-y-auto pr-1">
              {selectedUserDetail.children?.map(child => (
                <div
                  key={child.id}
                  className="p-3 bg-white rounded-2xl border border-[#E7E2D6] flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs sm:text-sm font-black text-[#4E342E] flex items-center gap-1.5">
                      <span>{child.name}</span>
                      <span className="text-[10px] bg-[#E3F2FD] text-[#1565C0] px-2 py-0.2 rounded-md font-bold">
                        {child.gradeLabel}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-[#8D6E63] mt-0.5">
                      ⭐ {child.totalStars} Bintang | 🔥 {child.streakDays} Hari Streak | 🏅{' '}
                      {child.badgesEarned?.length || 0} Lencana
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        const extraStars = prompt(`Tambah jumlah bintang untuk ${child.name}:`, '20');
                        if (extraStars && !isNaN(Number(extraStars))) {
                          adminUpdateChildOfUser(selectedUserDetail.id, child.id, {
                            totalStars: child.totalStars + Number(extraStars)
                          });
                          const updated = usersList.find(u => u.id === selectedUserDetail.id);
                          if (updated) setSelectedUserDetail(updated);
                        }
                      }}
                      className="px-2 py-1 bg-[#FFF8E1] hover:bg-[#FFE082] text-[#D97706] rounded-lg text-[11px] font-bold border border-[#FFE082] cursor-pointer"
                    >
                      +⭐ Bintang
                    </button>

                    {selectedUserDetail.children.length > 1 && (
                      <button
                        onClick={() => {
                          if (confirm(`Hapus profil ${child.name}?`)) {
                            adminDeleteChildOfUser(selectedUserDetail.id, child.id);
                            const updated = usersList.find(u => u.id === selectedUserDetail.id);
                            if (updated) setSelectedUserDetail(updated);
                          }
                        }}
                        className="p-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Child Form */}
            <form onSubmit={handleAddChildToSelectedUser} className="bg-[#FFF8E1] p-3.5 rounded-2xl border border-[#FFE082]">
              <div className="text-xs font-black text-[#5D4037] mb-2 uppercase flex items-center gap-1">
                <Plus className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Tambah Profil Anak Baru:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  required
                  placeholder="Nama Anak..."
                  value={newChildData.name}
                  onChange={e => setNewChildData({ ...newChildData, name: e.target.value })}
                  className="px-3 py-2 bg-white rounded-xl border border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none"
                />

                <select
                  value={newChildData.grade}
                  onChange={e => setNewChildData({ ...newChildData, grade: e.target.value as GradeId })}
                  className="px-3 py-2 bg-white rounded-xl border border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none cursor-pointer"
                >
                  {GRADES_LIST.map(g => (
                    <option key={g.id} value={g.id}>
                      {g.label}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min={2}
                  max={15}
                  value={newChildData.age}
                  onChange={e => setNewChildData({ ...newChildData, age: Number(e.target.value) })}
                  className="px-3 py-2 bg-white rounded-xl border border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none"
                  placeholder="Usia"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl text-xs font-black cursor-pointer shadow-2xs"
              >
                + Simpan Anak ke Akun Ini
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT SUBSCRIPTION PLAN ================= */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#FAF8F0] rounded-3xl border-4 border-[#D97706] shadow-2xl max-w-lg w-full p-6 relative my-auto max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsPlanModalOpen(false)}
              className="absolute top-4 right-4 text-[#8D6E63] hover:text-[#4E342E] p-1.5 rounded-xl hover:bg-[#F5F2E9]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black font-heading text-[#4E342E] mb-4">
              {editingPlanId ? 'Edit Paket Langganan' : 'Buat Paket Langganan Baru'}
            </h3>

            <form onSubmit={handleSavePlan} className="space-y-3.5">
              <div>
                <label className="text-xs font-black text-[#5D4037] uppercase">Nama Paket</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Paket Ceria Bulanan, Paket Juara Tahunan"
                  value={planFormData.name}
                  onChange={e => setPlanFormData({ ...planFormData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#5D4037] uppercase">Subtitle / Penjelasan Singkat</label>
                <input
                  type="text"
                  placeholder="Penjelasan keunggulan paket..."
                  value={planFormData.subtitle}
                  onChange={e => setPlanFormData({ ...planFormData, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-[#5D4037] uppercase">Harga (Rupiah)</label>
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={planFormData.price}
                    onChange={e => setPlanFormData({ ...planFormData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#5D4037] uppercase">Teks Periode</label>
                  <input
                    type="text"
                    placeholder="/ bulan, / tahun, 7 hari"
                    value={planFormData.periodText}
                    onChange={e => setPlanFormData({ ...planFormData, periodText: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-[#5D4037] uppercase">Maksimal Anak</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={planFormData.maxChildren || 2}
                    onChange={e => setPlanFormData({ ...planFormData, maxChildren: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#5D4037] uppercase">Durasi Hari</label>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={planFormData.billingCycleDays || 30}
                    onChange={e => setPlanFormData({ ...planFormData, billingCycleDays: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none mt-1"
                  />
                </div>
              </div>

              {/* Features List Editor */}
              <div>
                <label className="text-xs font-black text-[#5D4037] uppercase">Daftar Fitur Paket</label>
                <div className="space-y-1.5 mt-1.5 mb-2">
                  {planFormData.features?.map((feat, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-white rounded-xl border border-[#E7E2D6] text-xs">
                      <span className="font-semibold text-[#4E342E]">{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeatureFromPlan(idx)}
                        className="text-red-500 hover:text-red-700 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Tambah poin fitur baru..."
                    value={newFeatureText}
                    onChange={e => setNewFeatureText(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeatureToPlan();
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-white rounded-xl border border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeatureToPlan}
                    className="px-3 py-2 bg-[#D97706] text-white rounded-xl text-xs font-black cursor-pointer"
                  >
                    Tambah
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E7E2D6]">
                <button
                  type="button"
                  onClick={() => setIsPlanModalOpen(false)}
                  className="px-4 py-2.5 bg-white border border-[#D7CCC8] text-[#8D6E63] rounded-2xl text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl text-xs font-black cursor-pointer shadow-xs"
                >
                  Simpan Paket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: RESET USER PASSWORD ================= */}
      {isResetPasswordModalOpen && selectedUserForPassword && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#FAF8F0] rounded-3xl border-4 border-[#D97706] shadow-2xl max-w-md w-full p-6 relative my-auto">
            <button
              onClick={() => {
                setIsResetPasswordModalOpen(false);
                setSelectedUserForPassword(null);
              }}
              className="absolute top-4 right-4 text-[#8D6E63] hover:text-[#4E342E] p-1.5 rounded-xl hover:bg-[#F5F2E9]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-[#FFF8E1] text-[#D97706] border border-[#FFE082] flex items-center justify-center text-xl shadow-xs">
                🔑
              </div>
              <div>
                <h3 className="text-base font-black font-heading text-[#4E342E]">
                  Ubah Kata Sandi Akun
                </h3>
                <p className="text-xs text-[#6D4C41] font-semibold">
                  Untuk: <strong>{selectedUserForPassword.name}</strong> ({selectedUserForPassword.email})
                </p>
              </div>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (!newCustomPassword.trim()) {
                  alert('Harap masukkan atau buat kata sandi baru.');
                  return;
                }
                setUserPasswordsMap(prev => ({
                  ...prev,
                  [selectedUserForPassword.id]: newCustomPassword.trim()
                }));
                setPasswordActionMessage(
                  `Kata sandi untuk ${selectedUserForPassword.name} (${selectedUserForPassword.email}) berhasil diubah!`
                );
                setIsResetPasswordModalOpen(false);
                setSelectedUserForPassword(null);
                sound.playSuccess();
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-black text-[#5D4037] uppercase">Kata Sandi Baru</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    required
                    placeholder="Masukkan kata sandi baru..."
                    value={newCustomPassword}
                    onChange={e => setNewCustomPassword(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-white rounded-2xl border-2 border-[#D7CCC8] text-xs font-bold text-[#4E342E] outline-none focus:border-[#D97706]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const randomPass = 'Kariaku-' + Math.floor(1000 + Math.random() * 9000);
                      setNewCustomPassword(randomPass);
                      sound.playPop(480);
                    }}
                    className="px-3 py-2.5 bg-[#FFF8E1] hover:bg-[#FFE082] text-[#B45309] border border-[#FFE082] rounded-2xl text-xs font-black transition-colors cursor-pointer"
                    title="Generate Otomatis"
                  >
                    🎲 Acak
                  </button>
                </div>
              </div>

              <div className="bg-[#FFF8E1] p-3 rounded-2xl border border-[#FFE082] text-xs text-[#6D4C41]">
                💡 <strong>Tips:</strong> Setelah disimpan, Anda dapat menyalin kata sandi ini dan membagikannya secara aman kepada orang tua yang bersangkutan.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E7E2D6]">
                <button
                  type="button"
                  onClick={() => {
                    setIsResetPasswordModalOpen(false);
                    setSelectedUserForPassword(null);
                  }}
                  className="px-4 py-2.5 bg-white border border-[#D7CCC8] text-[#8D6E63] rounded-2xl text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl text-xs font-black cursor-pointer shadow-xs"
                >
                  Simpan Kata Sandi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
