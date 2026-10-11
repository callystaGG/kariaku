export type GradeId = 'paud' | 'tk' | 'sd-1' | 'sd-2' | 'sd-3' | 'sd-4-6';

export interface ChildProfile {
  id: string;
  parentId: string;
  name: string;
  grade: GradeId;
  gradeLabel: string;
  age: number;
  avatarId: string;
  totalStars: number;
  streakDays: number;
  badgesEarned: string[]; // badge IDs
  completedModules: string[]; // module IDs
  quizHistory: Record<string, QuizAttempt>; // moduleId -> QuizAttempt
  lastActiveAt: string;
}

export interface QuizAttempt {
  moduleId: string;
  highScore: number;
  lastScore: number;
  totalQuestions: number;
  attemptsCount: number;
  completedAt: string;
  starsEarned: number;
}

export interface ParentUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: 'parent' | 'admin' | 'staff';
  status?: 'active' | 'suspended' | 'pending';
  notes?: string;
  activeSubscription: SubscriptionInfo;
  children: ChildProfile[];
  createdAt: string;
  lastLoginAt?: string;
}

export interface SubscriptionInfo {
  planId: string;
  planName: string;
  status: 'active' | 'trial' | 'expired' | 'suspended';
  expiresAt: string;
  startedAt: string;
  priceFormatted: string;
  billingPeriod: string;
  autoRenew: boolean;
  paymentMethod?: string;
  grantedBy?: 'system' | 'payment_gateway' | 'admin';
}

export interface TransactionRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  planId: string;
  planName: string;
  amount: number;
  amountFormatted: string;
  paymentMethod: string;
  status: 'success' | 'pending' | 'failed' | 'refunded';
  createdAt: string;
  notes?: string;
  actionBy: 'user' | 'admin';
}

export interface AvatarItem {
  id: string;
  name: string;
  emoji: string;
  bgGradient: string;
  accentColor: string;
  description: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'math' | 'streak' | 'mastery' | 'character' | 'calistung' | 'science' | 'english';
  unlockedAt?: string;
}

export interface LearningStep {
  id: string;
  title: string;
  subtitle?: string;
  type: 'story' | 'interactive_counter' | 'addition_visual' | 'subtraction_visual' | 'number_line' | 'letter_tracing' | 'syllable_reading' | 'abacus_interactive' | 'english_cards' | 'dialogue_roleplay' | 'alphabet_song' | 'summary';
  prompt: string;
  speechText: string;
  interactiveData?: {
    initialCount?: number;
    targetCount?: number;
    emoji?: string;
    itemLabel?: string;
    itemsA?: { emoji: string; count: number; label: string };
    itemsB?: { emoji: string; count: number; label: string };
    operator?: '+' | '-';
    maxItems?: number;
    interactiveType?: 'tap_to_count' | 'pop_balloons' | 'add_basket' | 'letter_tracing' | 'syllable_reading' | 'abacus_interactive' | 'english_cards' | 'dialogue_roleplay' | 'alphabet_song';
    // Tracing specific
    letter?: string;
    letterCase?: 'upper' | 'lower';
    exampleWord?: string;
    exampleEmoji?: string;
    phonicsSound?: string;
    strokeGuide?: string[];
    availableLetters?: string[];
    // Syllable reading specific
    syllables?: string[];
    fullWord?: string;
    wordMeaning?: string;
    wordEmoji?: string;
    exampleSentence?: string;
    allWords?: Array<{ syllables: string[]; fullWord: string; emoji: string; sentence: string }>;
    // Abacus specific
    targetNumber?: number;
    rodsCount?: number;
    initialRods?: number[];
    showFormula?: string;
    formulaTitle?: string;
    operationType?: 'explore' | 'single_digit' | 'double_digit' | 'small_friend' | 'big_friend' | 'addition' | 'subtraction';
    targetAnswer?: number;
    // English Vocabulary & Flashcards specific
    englishWords?: Array<{
      word: string;
      translation: string;
      phonetic?: string;
      caraBaca?: string;
      emoji: string;
      exampleSentence?: string;
      sentenceTranslation?: string;
      category?: string;
      syllables?: string[];
    }>;
    // English Dialogue & Roleplay specific
    dialogues?: Array<{
      speaker: string;
      textEnglish: string;
      textIndonesian: string;
      avatarEmoji: string;
      audioPitch?: number;
    }>;
    // Alphabet Song & Phonics specific
    alphabetLetters?: Array<{
      letter: string;
      word: string;
      emoji: string;
      sound: string;
    }>;
    songLyrics?: Array<{
      lineEnglish: string;
      lineIndonesian: string;
    }>;
  };
  tips?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  visualEmoji?: string;
  visualCount?: number;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  questionNumber: number;
  prompt: string;
  speechPrompt: string;
  equationVisual?: string;
  itemsVisual?: {
    emoji: string;
    count: number;
    label?: string;
    struckCount?: number;
  }[];
  options: QuizOption[];
  explanation: string;
  hint?: string;
}

export interface LearningModule {
  id: string;
  subjectId: string;
  gradeId: GradeId;
  order: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  kurikulumFase?: string;
  kurikulumFokus?: string;
  estimatedMinutes: number;
  starsReward: number;
  badgeReward: Badge;
  coverEmoji: string;
  themeColor: string;
  themeBg: string;
  themeBorder: string;
  tags: string[];
  steps: LearningStep[];
  quiz: QuizQuestion[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  priceFormatted: string;
  periodText: string;
  badgeText?: string;
  popular?: boolean;
  savingsText?: string;
  features: string[];
  color: string;
  isActive?: boolean;
  maxChildren?: number;
  billingCycleDays?: number;
  isCustom?: boolean;
}

export type AdminPortalTab = 'overview' | 'users' | 'packages' | 'transactions' | 'passwords' | 'settings';

