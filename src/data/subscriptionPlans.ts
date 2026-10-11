import { SubscriptionPlan } from '../types';

export const DEFAULT_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free_trial',
    name: 'Paket Uji Coba Ceria',
    subtitle: 'Gratis 7 Hari untuk Keluarga Baru',
    price: 0,
    priceFormatted: 'Gratis Rp 0',
    periodText: 'selama 7 hari pertama',
    badgeText: 'Mulai Gratis',
    savingsText: 'Coba semua fitur tanpa biaya',
    isActive: true,
    maxChildren: 1,
    billingCycleDays: 7,
    features: [
      'Akses ke 3 modul Matematika dasar',
      '1 Profil anak dengan avatar ceria',
      'Kuis interaktif & reward bintang',
      'Dashboard ringkasan orang tua',
      'Tanpa kartu kredit'
    ],
    color: 'border-slate-300 bg-white hover:border-amber-400'
  },
  {
    id: 'monthly',
    name: 'Paket Ceria Bulanan',
    subtitle: 'Fleksibel & Terjangkau Setiap Bulan',
    price: 49000,
    priceFormatted: 'Rp 49.000',
    periodText: '/ bulan',
    badgeText: 'Paling Fleksibel',
    savingsText: 'Bisa dibatalkan kapan saja',
    isActive: true,
    maxChildren: 2,
    billingCycleDays: 30,
    features: [
      'Akses SEMUA modul & mata pelajaran',
      'Hingga 2 profil anak dalam 1 akun',
      'Audio narasi suara anak otomatis',
      'Laporan progress lengkap orang tua',
      'Badge & sertifikat prestasi digital',
      'Bebas iklan 100%'
    ],
    color: 'border-amber-300 bg-amber-50/60 hover:border-amber-500'
  },
  {
    id: 'annual',
    name: 'Paket Juara Tahunan',
    subtitle: 'Paling Hemat untuk Persiapan Prestasi Anak',
    price: 349000,
    priceFormatted: 'Rp 349.000',
    periodText: '/ tahun (~Rp 29.000/bln)',
    badgeText: 'Paling Populer & Hemat 40%',
    popular: true,
    savingsText: 'Hemat Rp 239.000 per tahun!',
    isActive: true,
    maxChildren: 4,
    billingCycleDays: 365,
    features: [
      'Akses VIP SEMUA jenjang (PAUD, TK, SD 1-6)',
      'Hingga 4 profil anak (cocok untuk kakak & adik)',
      'Laporan analitik mingguan ke WhatsApp orang tua',
      'Lembar kerja cetak (Printable PDF Worksheet)',
      'Konsultasi tumbuh kembang belajar anak',
      'Bebas iklan 100% & support prioritas'
    ],
    color: 'border-amber-500 bg-gradient-to-b from-amber-50 to-orange-50 ring-4 ring-amber-400/30'
  },
  {
    id: 'semi_annual',
    name: 'Paket Pintar Semester (6 Bulan)',
    subtitle: 'Pas untuk Satu Semester Sekolah',
    price: 219000,
    priceFormatted: 'Rp 219.000',
    periodText: '/ 6 bulan (~Rp 36.500/bln)',
    badgeText: 'Hemat 25%',
    savingsText: 'Hemat Rp 75.000',
    isActive: true,
    maxChildren: 3,
    billingCycleDays: 180,
    features: [
      'Akses semua modul SD kelas 1-3',
      'Hingga 3 profil anak',
      'Laporan mingguan kemajuan belajar',
      'Badge digital & penghargaan berkala',
      'Bebas iklan 100%'
    ],
    color: 'border-emerald-300 bg-emerald-50/60 hover:border-emerald-500'
  }
];

export const SUBSCRIPTION_PLANS = DEFAULT_SUBSCRIPTION_PLANS;
