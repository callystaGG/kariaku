import { AvatarItem } from '../types';

export const AVATARS: AvatarItem[] = [
  {
    id: 'kancil',
    name: 'Kancil Cerdik',
    emoji: '🦌',
    bgGradient: 'from-amber-400 to-orange-500',
    accentColor: '#f59e0b',
    description: 'Pintar, tangkas, dan suka memecahkan teka-teki!'
  },
  {
    id: 'kucing',
    name: 'Mimi Kucing Ceria',
    emoji: '🐱',
    bgGradient: 'from-pink-400 to-rose-500',
    accentColor: '#f43f5e',
    description: 'Lucu, aktif, dan selalu bersemangat mencoba hal baru.'
  },
  {
    id: 'harimau',
    name: 'Riki Harimau Hebat',
    emoji: '🐯',
    bgGradient: 'from-amber-500 to-red-500',
    accentColor: '#ea580c',
    description: 'Pemberani, percaya diri, dan pantang menyerah!'
  },
  {
    id: 'gajah',
    name: 'Gani Gajah Bijak',
    emoji: '🐘',
    bgGradient: 'from-cyan-400 to-blue-500',
    accentColor: '#0284c7',
    description: 'Ramah, teliti, dan ingatannya sangat kuat.'
  },
  {
    id: 'astronot',
    name: 'Bintang Penjelajah',
    emoji: '👨‍🚀',
    bgGradient: 'from-indigo-400 to-purple-600',
    accentColor: '#6366f1',
    description: 'Suka sains, menghitung bintang, dan menjelajah ruang angkasa.'
  },
  {
    id: 'dino',
    name: 'Dino Sahabat Petualang',
    emoji: '🦖',
    bgGradient: 'from-emerald-400 to-teal-600',
    accentColor: '#059669',
    description: 'Kuat, suka belajar di alam, dan penuh rasa ingin tahu.'
  },
  {
    id: 'burung',
    name: 'Koko Kakaktua',
    emoji: '🦜',
    bgGradient: 'from-yellow-400 to-lime-500',
    accentColor: '#84cc16',
    description: 'Cerewet cerdas, suka membaca dan bernyanyi angka.'
  },
  {
    id: 'panda',
    name: 'Panda Riang',
    emoji: '🐼',
    bgGradient: 'from-slate-400 to-zinc-600',
    accentColor: '#52525b',
    description: 'Tenang, fokus, dan tekun saat belajar berhitung.'
  }
];

export const getAvatarById = (id: string): AvatarItem => {
  return AVATARS.find(a => a.id === id) || AVATARS[0];
};
