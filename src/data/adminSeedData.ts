import { ParentUser, TransactionRecord } from '../types';

export const INITIAL_USER_LIST: ParentUser[] = [
  {
    id: 'parent-sarah-demo',
    name: 'Bunda Sarah',
    email: 'sarah.bunda@kariaku.id',
    phone: '081234567890',
    role: 'parent',
    status: 'active',
    createdAt: '2025-01-10',
    lastLoginAt: new Date().toLocaleString('id-ID'),
    activeSubscription: {
      planId: 'paket_juara',
      planName: 'Paket Juara Keluarga (1 Tahun)',
      status: 'active',
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      startedAt: '2025-01-10',
      priceFormatted: 'Rp 299.000',
      billingPeriod: '1 Tahun',
      autoRenew: true,
      paymentMethod: 'QRIS Instant',
      grantedBy: 'system'
    },
    children: [
      {
        id: 'child-kenzo-1',
        parentId: 'parent-sarah-demo',
        name: 'Kenzo',
        grade: 'sd-1',
        gradeLabel: 'SD Kelas 1',
        age: 7,
        avatarId: 'singa',
        totalStars: 48,
        streakDays: 4,
        badgesEarned: ['badge_bintang_hitung', 'badge_hebat_baca', 'badge_skor_sempurna'],
        completedModules: [
          'mod-angka-1-20',
          'mod-penjumlahan-dasar',
          'mod-sd1-tracing-kata',
          'mod-sd1-belajar-membaca',
          'mod-sd1-sempoa-tambah-kurang'
        ],
        quizHistory: {
          'mod-angka-1-20': {
            moduleId: 'mod-angka-1-20',
            highScore: 100,
            lastScore: 100,
            totalQuestions: 5,
            attemptsCount: 2,
            completedAt: '2025-02-15',
            starsEarned: 20
          },
          'mod-penjumlahan-dasar': {
            moduleId: 'mod-penjumlahan-dasar',
            highScore: 100,
            lastScore: 100,
            totalQuestions: 5,
            attemptsCount: 1,
            completedAt: '2025-02-18',
            starsEarned: 20
          },
          'mod-sd1-sempoa-tambah-kurang': {
            moduleId: 'mod-sd1-sempoa-tambah-kurang',
            highScore: 100,
            lastScore: 100,
            totalQuestions: 5,
            attemptsCount: 1,
            completedAt: '2025-02-20',
            starsEarned: 20
          }
        },
        lastActiveAt: new Date().toISOString().split('T')[0]
      },
      {
        id: 'child-alya-2',
        parentId: 'parent-sarah-demo',
        name: 'Alya',
        grade: 'tk',
        gradeLabel: 'TK A/B',
        age: 5,
        avatarId: 'kucing',
        totalStars: 32,
        streakDays: 3,
        badgesEarned: ['badge_bintang_hitung', 'badge_hebat_baca'],
        completedModules: [
          'mod-tk-tracing-huruf',
          'mod-tk-belajar-membaca',
          'mod-tk-sempoa-angka-1-9'
        ],
        quizHistory: {
          'mod-tk-tracing-huruf': {
            moduleId: 'mod-tk-tracing-huruf',
            highScore: 100,
            lastScore: 100,
            totalQuestions: 5,
            attemptsCount: 1,
            completedAt: '2025-02-19',
            starsEarned: 15
          }
        },
        lastActiveAt: new Date().toISOString().split('T')[0]
      }
    ]
  },
  {
    id: 'parent-dimas-demo',
    name: 'Ayah Dimas',
    email: 'dimas.ayah@kariaku.id',
    phone: '081398765432',
    role: 'parent',
    status: 'active',
    createdAt: '2025-02-01',
    lastLoginAt: '2025-02-25',
    activeSubscription: {
      planId: 'paket_ceria',
      planName: 'Paket Ceria (1 Bulan)',
      status: 'active',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      startedAt: '2025-02-01',
      priceFormatted: 'Rp 49.000',
      billingPeriod: '1 Bulan',
      autoRenew: true,
      paymentMethod: 'GoPay',
      grantedBy: 'system'
    },
    children: [
      {
        id: 'child-dimas-1',
        parentId: 'parent-dimas-demo',
        name: 'Nadine',
        grade: 'sd-2',
        gradeLabel: 'SD Kelas 2',
        age: 8,
        avatarId: 'rusa',
        totalStars: 24,
        streakDays: 2,
        badgesEarned: ['badge_bintang_hitung'],
        completedModules: ['mod-sd2-sempoa-teman-kecil'],
        quizHistory: {},
        lastActiveAt: '2025-02-25'
      }
    ]
  }
];

export const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'TRX-20250110-001',
    userId: 'parent-sarah-demo',
    userName: 'Bunda Sarah',
    userEmail: 'sarah.bunda@kariaku.id',
    planId: 'paket_juara',
    planName: 'Paket Juara Keluarga (1 Tahun)',
    amount: 299000,
    amountFormatted: 'Rp 299.000',
    paymentMethod: 'QRIS Instant',
    status: 'success',
    createdAt: '2025-01-10 09:30',
    actionBy: 'user'
  },
  {
    id: 'TRX-20250201-002',
    userId: 'parent-dimas-demo',
    userName: 'Ayah Dimas',
    userEmail: 'dimas.ayah@kariaku.id',
    planId: 'paket_ceria',
    planName: 'Paket Ceria (1 Bulan)',
    amount: 49000,
    amountFormatted: 'Rp 49.000',
    paymentMethod: 'GoPay',
    status: 'success',
    createdAt: '2025-02-01 14:15',
    actionBy: 'user'
  }
];

export const formatRupiah = (amount: number): string => {
  if (amount === 0) return 'Rp 0';
  return 'Rp ' + amount.toLocaleString('id-ID');
};

