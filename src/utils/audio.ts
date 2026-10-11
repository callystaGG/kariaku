/**
 * Audio Synthesizer & Indonesian 7-9 yo Child Narrator Voice for KARIA KU
 * 
 * PERSONA SPECIFICATION:
 * - Fun, playful, and funny Indonesian child aged 7-9 years old who loves learning and teaching other kids.
 * - Super energetic, giggly, and spontaneous.
 * - Naturally mixes Bahasa Indonesia and simple fun English ("Wah, so cool banget!", "Yuk kita learn bareng!", "Let's go!", "Super fun!").
 * - Verbal sound effects ("Wooosh!", "Poof!", "Ta-daaa!", "Boing!", "Ding!").
 * - Uses informal Indonesian particles ("nggak", "tuh", "deh", "nih", "loh", "ih", "eh", "kan").
 * - Natural pauses using "..." and "hmm..." when thinking.
 * - Never sounds like reading — always talks like a lively best friend!
 */

import { chooseVoice } from './chooseVoice';

/**
 * Transforms any input text into clear, fluent, natural, and expressive Indonesian
 * suitable for text-to-speech engines without garbled pronunciations or misreading
 * hyphens in words, reduplications, syllable breakdowns, or number ranges as 'kurang'.
 */
export function formatKidPersonaText(rawText: string, options?: { isExcited?: boolean; addIntro?: boolean }): string {
  if (!rawText) return '';

  let text = rawText;

  // 1. Remove emojis and non-standard symbols that TTS may read out awkwardly
  text = text.replace(/[\u{1F300}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{1F004}-\u{1F0CF}\u{FE00}-\u{FE0F}]/gu, ' ');

  // 2. Educational & Indonesian Abbreviations -> Natural Spoken Phrasing
  const abbreviationMap: Record<string, string> = {
    '\\bPAUD\\b': 'Paud',
    '\\bTK\\s*A\\b': 'Te Ka A',
    '\\bTK\\s*B\\b': 'Te Ka B',
    '\\bTK\\b': 'Te Ka',
    '\\bSD\\b': 'Es De',
    '\\bIPAS\\b': 'Ipas',
    '\\bPPKn\\b': 'Pendidikan Pancasila dan Kewarganegaraan',
    '\\bNo\\.\\s*(\\d+)': 'Nomor $1',
    '\\bNo\\b': 'Nomor',
    '\\bHal\\.\\s*(\\d+)': 'Halaman $1',
    '\\bHal\\b': 'Halaman',
    '\\bs\\.d\\.\\s*(\\d+)': 'sampai dengan $1',
    '\\bs\\.d\\s*(\\d+)': 'sampai dengan $1',
    '\\bs/d\\s*(\\d+)': 'sampai dengan $1',
    '\\bRp\\.?\\s*(\\d+)': '$1 Rupiah',
    '\\bRp\\b': 'Rupiah',
    '\\bIDR\\b': 'Rupiah',
    '\\bkm\\b': 'kilometer',
    '\\bcm\\b': 'sentimeter',
    '\\bmm\\b': 'milimeter',
    '\\bkg\\b': 'kilogram',
    '\\bgram\\b': 'gram',
    '\\bml\\b': 'mililiter',
    '\\bdll\\.?': 'dan lain-lain',
    '\\bdsb\\.?': 'dan sebagainya',
    '\\bdst\\.?': 'dan seterusnya',
    '\\bThn\\b': 'Tahun',
    '\\bthn\\b': 'tahun',
    '\\byaitu:': 'yaitu,',
    '\\bcontoh:': 'contohnya,',
    '\\bcth\\.?': 'contohnya,',
    '\\bKms\\b': 'Kurikulum Merdeka'
  };

  for (const [pattern, replacement] of Object.entries(abbreviationMap)) {
    text = text.replace(new RegExp(pattern, 'gi'), replacement);
  }

  // 3. Ordinal prefixes with numbers: ke-1 -> ke 1, ke-2 -> ke 2, etc. (NEVER 'ke dikurang')
  text = text.replace(/\bke-(\d+)\b/gi, 'ke $1');
  text = text.replace(/\bse-([a-zA-Z]+)\b/gi, 'se $1');

  // 4. Alphabet Ranges & Multi-letter spelling (A-Z -> A sampai Z, A-I-U-E-O -> A, I, U, E, O)
  // Single letter alphabet range like A-Z, a-z, A - Z
  text = text.replace(/\b([A-Za-z])\s*[-–—]\s*([A-Za-z])\b/g, (match, p1, p2) => {
    // If it's A-Z or a-z, read as 'A sampai Z'
    if ((p1 === 'A' || p1 === 'a') && (p2 === 'Z' || p2 === 'z')) {
      return `${p1} sampai ${p2}`;
    }
    // If adjacent letters in uppercase range like A-E
    if (p1.length === 1 && p2.length === 1 && p1.toUpperCase() < p2.toUpperCase()) {
      return `${p1} sampai ${p2}`;
    }
    return `${p1} ${p2}`;
  });

  // 5. Syllables & Word Reduplications (Kata Ulang: anak-anak, teman-teman, BA-JU, RU-MAH, dll.)
  // Replace hyphens between word letters with a space (never read as 'dikurang')
  text = text.replace(/([a-zA-Z\u00C0-\u024F]+)\s*[-–—]\s*([a-zA-Z\u00C0-\u024F]+)/g, '$1 $2');

  // 6. Dash used as bullet point or clause separator (e.g. " - " or start of line "- ")
  text = text.replace(/(^|\n)\s*[-–—•]\s+/g, '$1, ');
  text = text.replace(/\s+[-–—]\s+/g, ', ');

  // 7. Age, Grade, and Number Ranges (e.g. "Usia 4-6 Tahun", "SD 4-6", "Angka 1-20", "1-100")
  // Matches digits connected by hyphen (with or without units/grade context)
  text = text.replace(
    /\b(\d+)\s*[-–—]\s*(\d+)\s*(thn|tahun|bln|bulan|hari|jam|menit|detik|kg|gram|cm|m|km|siswa|anak|orang|biji|butir|buah|lembar|halaman|bab|paket|minggu)?\b/gi,
    (match, num1, num2, unit) => {
      // Check if this looks like a math subtraction (e.g. followed by = or math operator)
      const isMathEquation = /=\s*$/.test(text.substring(0, text.indexOf(match))) ||
        text.substring(text.indexOf(match) + match.length).trim().startsWith('=');
      
      if (!isMathEquation) {
        return unit ? `${num1} sampai ${num2} ${unit}` : `${num1} sampai ${num2}`;
      }
      return `${num1} dikurang ${num2}`;
    }
  );

  // 8. Math Formulas and Subtractions (+5, +1 = +5 - 4, 10 - 4 = 6)
  // Abacus / Algebra formulas with + and -
  text = text.replace(/\+(\d+)\s*=\s*\+(\d+)\s*[-−]\s*(\d+)/g, 'tambah $1 sama dengan tambah $2 dikurang $3');
  text = text.replace(/[-−]\s*(\d+)\s*=\s*[-−]\s*(\d+)\s*\+\s*(\d+)/g, 'kurang $1 sama dengan kurang $2 ditambah $3');
  text = text.replace(/\+(\d+)\s*[-−]\s*(\d+)/g, 'tambah $1 dikurang $2');
  text = text.replace(/\+(\d+)/g, 'tambah $1');
  
  // Explicit math subtraction with equals sign: 10 - 4 = 6 or 10 - 4 =
  text = text.replace(/(\d+)\s*[-−]\s*(\d+)\s*=\s*(\d+)/g, '$1 dikurang $2 sama dengan $3');
  text = text.replace(/(\d+)\s*[-−]\s*(\d+)\s*=/g, '$1 dikurang $2 sama dengan ');
  text = text.replace(/=\s*(\d+)\s*[-−]\s*(\d+)/g, 'sama dengan $1 dikurang $2');
  text = text.replace(/(\d+)\s*\+\s*(\d+)\s*=/g, '$1 ditambah $2 sama dengan ');
  text = text.replace(/(\d+)\s*[x×*]\s*(\d+)\s*=/g, '$1 dikali $2 sama dengan ');
  text = text.replace(/(\d+)\s*[:/÷]\s*(\d+)\s*=/g, '$1 dibagi $2 sama dengan ');

  // Math question keywords followed by subtraction (e.g. "hitunglah 5 - 2", "berapa 10 - 4")
  text = text.replace(/\b(hitunglah|berapa|hasil dari|operasi|selisih|sisa)\s+(\d+)\s*[-−]\s*(\d+)\b/gi, '$1 $2 dikurang $3');

  // Transliterate other math operations
  text = text.replace(/(\d+)\s*\+\s*(\d+)/g, '$1 ditambah $2');
  text = text.replace(/(\d+)\s*[x×*]\s*(\d+)/g, '$1 dikali $2');
  text = text.replace(/(\d+)\s*[:÷]\s*(\d+)/g, '$1 dibagi $2');
  text = text.replace(/(\d+)\s*=\s*(\d+)/g, '$1 sama dengan $2');
  text = text.replace(/=/g, ' sama dengan ');
  text = text.replace(/%/g, ' persen ');
  text = text.replace(/>/g, ' lebih besar dari ');
  text = text.replace(/</g, ' lebih kecil dari ');
  text = text.replace(/\b1\/2\b/g, ' satu per dua ');
  text = text.replace(/\b1\/4\b/g, ' satu per empat ');
  text = text.replace(/\b3\/4\b/g, ' tiga per empat ');
  text = text.replace(/\b1\/3\b/g, ' satu per tiga ');
  text = text.replace(/\b2\/3\b/g, ' dua per tiga ');
  text = text.replace(/½/g, ' satu per dua ');
  text = text.replace(/¼/g, ' satu per empat ');
  text = text.replace(/¾/g, ' tiga per empat ');
  text = text.replace(/⅓/g, ' satu per tiga ');
  text = text.replace(/⅔/g, ' dua per tiga ');

  // 9. Natural Indonesian polishing for warm, educational speech
  text = text.replace(/\btelah\b/gi, 'sudah');
  text = text.replace(/\bamat\b/gi, 'sangat');
  text = text.replace(/\bapabila\b/gi, 'kalau');
  text = text.replace(/\bjika\b/gi, 'kalau');
  text = text.replace(/\bagar\b/gi, 'supaya');
  text = text.replace(/\bbenar sekali\b/gi, 'benar sekali!');
  text = text.replace(/\bkamu hebat\b/gi, 'kamu hebat sekali!');

  // 10. Clean punctuation and formatting markers
  text = text.replace(/[*#_~`^]/g, ' ');
  text = text.replace(/\.{3,}/g, '... ');
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private speechEnabled: boolean = true;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private femaleVoice: SpeechSynthesisVoice | null = null;
  private maleVoice: SpeechSynthesisVoice | null = null;
  private defaultVoice: SpeechSynthesisVoice | null = null;
  private englishVoice: SpeechSynthesisVoice | null = null;
  private isVoicesInitialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.initVoices();
        };
      }
    }
  }

  /**
   * Discovers and selects the best natural Indonesian voices
   */
  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      this.cachedVoices = voices;

      // Score each voice to accurately find genuine Indonesian voices
      const scoredVoices = voices.map(v => {
        const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
        const name = (v.name || '').toLowerCase();
        let score = 0;

        // Severe penalty for Indian/South-Asian English voices that previously matched 'in'
        if (
          lang === 'en-in' ||
          lang.startsWith('hi-') ||
          lang.startsWith('mr-') ||
          lang.startsWith('ta-') ||
          lang.startsWith('te-') ||
          lang.startsWith('kn-') ||
          lang.startsWith('ml-') ||
          lang.startsWith('pa-') ||
          lang.startsWith('ur-') ||
          lang.startsWith('gu-') ||
          lang.startsWith('bn-')
        ) {
          score -= 1000;
        }

        // Exact Indonesian language tags
        if (lang === 'id-id' || lang === 'id' || lang === 'in-id') {
          score += 150;
        } else if (lang.startsWith('id-') || lang.startsWith('id')) {
          score += 100;
        }

        // Indonesian named voices
        if (
          name.includes('indonesia') ||
          name.includes('indonesian') ||
          name.includes('bahasa indonesia') ||
          name.includes('damayanti') ||
          name.includes('gadis') ||
          name.includes('ardi') ||
          name.includes('andika') ||
          name.includes('siti') ||
          name.includes('google bahasa')
        ) {
          score += 200;
        }

        // Malay voices as clean fallback
        if (lang === 'ms-my' || lang === 'ms' || name.includes('malay') || name.includes('melayu')) {
          score += 40;
        }

        return { voice: v, score };
      });

      // Filter for valid Indonesian candidates (score > 0)
      const validCandidates = scoredVoices
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.voice);

      const candidateList = validCandidates.length > 0 ? validCandidates : voices;

      this.femaleVoice = null;
      this.maleVoice = null;
      this.defaultVoice = null;

      for (const v of candidateList) {
        const name = (v.name || '').toLowerCase();
        const isMale = name.includes('male') || name.includes('pria') || name.includes('ardi') || name.includes('andika') || name.includes('david') || name.includes('george');
        const isFemale = name.includes('female') || name.includes('wanita') || name.includes('gadis') || name.includes('damayanti') || name.includes('siti') || name.includes('google');

        if (isFemale && !this.femaleVoice) {
          this.femaleVoice = v;
        } else if (isMale && !this.maleVoice) {
          this.maleVoice = v;
        }

        if (!this.defaultVoice) {
          this.defaultVoice = v;
        }
      }

      // Also find genuine English voices (US or UK/GB) with top quality prioritization
      const englishCandidates = voices.filter(v => {
        const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
        return (
          lang === 'en-us' ||
          lang === 'en-gb' ||
          lang === 'en-au' ||
          lang === 'en-ca' ||
          lang.startsWith('en-')
        );
      });

      if (englishCandidates.length > 0) {
        // Sort candidates: prefer natural / neural / google / Samantha / Karen / Daniel / Jenny / Zira
        const scoredEnglish = englishCandidates.map(v => {
          const name = (v.name || '').toLowerCase();
          const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
          let score = 50;
          if (lang === 'en-us') score += 50;
          if (lang === 'en-gb') score += 40;
          if (name.includes('natural') || name.includes('neural')) score += 100;
          if (name.includes('google')) score += 80;
          if (name.includes('samantha') || name.includes('karen') || name.includes('daniel') || name.includes('zira') || name.includes('jenny')) score += 70;
          if (name.includes('siri') || name.includes('alex')) score += 60;
          return { voice: v, score };
        }).sort((a, b) => b.score - a.score);

        this.englishVoice = scoredEnglish[0].voice;
      }

      if (!this.defaultVoice && voices.length > 0) {
        this.defaultVoice = voices[0];
      }
      this.isVoicesInitialized = true;
    } catch {
      // Voice init safely handled
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setSpeechEnabled(enabled: boolean) {
    this.speechEnabled = enabled;
    if (!enabled) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      this.runStopHooks();
    }
  }

  public isSpeechEnabled(): boolean {
    return this.speechEnabled;
  }

  // =========================================================================
  // FUNNY & SPONTANEOUS CHILD SOUND EFFECTS (Giggles, Whoosh, Ta-daaa, Poof)
  // =========================================================================

  /**
   * 😆 Playful Child Giggle (Hihihi! cute bubbling music box laugh)
   */
  public playKidGiggle() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // 3 quick giggly upward trills (Hi-hi-hi!)
      const gigglePitches = [659.25, 783.99, 987.77, 783.99, 987.77, 1174.66];
      gigglePitches.forEach((freq, idx) => {
        const startTime = now + idx * 0.055;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.08, startTime + 0.04);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.07);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.075);
      });
    } catch {
      // ignore
    }
  }

  /**
   * 💨 Cartoon Whoosh ("Wooosh! Let's go!")
   */
  public playCartoonWhoosh() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(820, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.28);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(1600, now + 0.14);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.28);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch {
      // ignore
    }
  }

  /**
   * ✨ Triumphant Ta-daaa! ("Ta-daaa! Keren banget!")
   */
  public playTada() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // "Ta-" (short prep note) then "-Daaaa!" (long bright chord)
      const prepOsc = ctx.createOscillator();
      const prepGain = ctx.createGain();
      prepOsc.type = 'sine';
      prepOsc.frequency.setValueAtTime(523.25, now); // C5
      prepGain.gain.setValueAtTime(0.2, now);
      prepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      prepOsc.connect(prepGain);
      prepGain.connect(ctx.destination);
      prepOsc.start(now);
      prepOsc.stop(now + 0.1);

      // "-Daaaa!"
      const tadaChords = [659.25, 783.99, 1046.5, 1318.51]; // E5, G5, C6, E6
      tadaChords.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + 0.11);
        gain.gain.setValueAtTime(0.001, now + 0.11);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + 0.11);
        osc.stop(now + 0.58);
      });
    } catch {
      // ignore
    }
  }

  /**
   * 🧮 Sempoa / Abacus Bead Click Sound (Crisp wooden clack)
   */
  public playAbacusClick(isUpper: boolean = false) {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Upper beads (5) have a slightly deeper, fuller resonance; lower beads (1) have a higher click
      const freq = isUpper ? 780 : 1100;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.45, now + 0.04);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(isUpper ? 850 : 1250, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.32, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }

  /**
   * ✍️ Pencil / Brush Tracing Stroke Sound
   */
  public playPencilStroke() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440 + Math.random() * 80, now);
      osc.frequency.linearRampToValueAtTime(520 + Math.random() * 100, now + 0.05);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // ignore
    }
  }

  /**
   * 🔔 Bright Bell Ding (for prompts & speech repeat triggers)
   */
  public playDing() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.05);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.48);
    } catch {
      // ignore
    }
  }

  /**
   * 🔤 Syllable Blend Chime (Harmonious chime when syllables combine)
   */
  public playSyllableBlend() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C - E - G - C
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {
      // ignore
    }
  }

  /**
   * 🦁 Leo the Lion: Playful cub roar & heroic bounce chime
   */
  public playLionRoarJingle() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(360, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(700, now + 0.3);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.34);

      setTimeout(() => {
        this.playPop(620);
      }, 100);
    } catch {
      // ignore
    }
  }

  /**
   * 🐰 Ciko the Bunny: Cartoon bouncy spring "Boooiiiing!"
   */
  public playBunnyBoingJingle() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.22);
      osc.frequency.exponentialRampToValueAtTime(1250, now + 0.32);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // ignore
    }
  }

  /**
   * 🦉 Professor Owi: Curious 2-tone fluty owl "Hoo-Hooo!"
   */
  public playOwlHootJingle() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const hoots = [
        { freq: 460, time: 0, dur: 0.15 },
        { freq: 560, time: 0.16, dur: 0.24 }
      ];

      hoots.forEach(h => {
        const startTime = now + h.time;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(h.freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(h.freq * 0.95, startTime + h.dur);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.22, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + h.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + h.dur + 0.02);
      });
    } catch {
      // ignore
    }
  }

  /**
   * 🐼 Mimi the Panda: Sweet giggly bell sparkle
   */
  public playPandaGiggleJingle() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [783.99, 987.77, 1174.66, 1567.98]; // G5, B5, D6, G6
      notes.forEach((freq, idx) => {
        const startTime = now + idx * 0.055;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.24);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.26);
      });
    } catch {
      // ignore
    }
  }

  /**
   * 🦕 Dino the Explorer: Stomp & baby roar chirp
   */
  public playDinoStompJingle() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const stompOsc = ctx.createOscillator();
      const stompGain = ctx.createGain();
      stompOsc.type = 'triangle';
      stompOsc.frequency.setValueAtTime(120, now);
      stompOsc.frequency.exponentialRampToValueAtTime(50, now + 0.16);

      stompGain.gain.setValueAtTime(0.3, now);
      stompGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      stompOsc.connect(stompGain);
      stompGain.connect(ctx.destination);
      stompOsc.start(now);
      stompOsc.stop(now + 0.21);

      const roarOsc = ctx.createOscillator();
      const roarGain = ctx.createGain();
      roarOsc.type = 'sawtooth';
      roarOsc.frequency.setValueAtTime(200, now + 0.14);
      roarOsc.frequency.exponentialRampToValueAtTime(420, now + 0.26);
      roarOsc.frequency.exponentialRampToValueAtTime(260, now + 0.38);

      roarGain.gain.setValueAtTime(0.001, now + 0.14);
      roarGain.gain.linearRampToValueAtTime(0.18, now + 0.18);
      roarGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      roarOsc.connect(roarGain);
      roarGain.connect(ctx.destination);
      roarOsc.start(now + 0.14);
      roarOsc.stop(now + 0.42);
    } catch {
      // ignore
    }
  }

  /**
   * 👧👦 Budi & Callysta: Xylophone roll
   */
  public playKidsJingle() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [587.33, 739.99, 880.0, 1174.66]; // D major cheerful chime
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const startTime = now + idx * 0.05;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.22);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Pop tap
   */
  public playPop(frequency: number = 440) {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.26, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2600, now);
      filter.frequency.exponentialRampToValueAtTime(900, now + 0.08);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(frequency, now);
      osc1.frequency.exponentialRampToValueAtTime(frequency * 1.35, now + 0.04);
      osc1.frequency.exponentialRampToValueAtTime(frequency * 0.95, now + 0.08);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(frequency * 2.76, now);
      gain2.gain.setValueAtTime(0.12, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc1.connect(filter);
      osc2.connect(gain2);
      gain2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.095);
      osc2.stop(now + 0.05);
    } catch {
      // Audio error ignored safely
    }
  }

  /**
   * Cheerful Celesta arpeggio for correct answers
   */
  public playSuccess() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const startTime = now + idx * 0.08;
        const duration = 0.36;

        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        const overtone = ctx.createOscillator();
        overtone.type = 'sine';
        overtone.frequency.setValueAtTime(freq * 2.76, startTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.001, startTime);
        oscGain.gain.linearRampToValueAtTime(0.2, startTime + 0.015);
        oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        const overtoneGain = ctx.createGain();
        overtoneGain.gain.setValueAtTime(0.001, startTime);
        overtoneGain.gain.linearRampToValueAtTime(0.07, startTime + 0.01);
        overtoneGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.5);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3800, startTime);

        osc.connect(oscGain);
        overtone.connect(overtoneGain);
        oscGain.connect(filter);
        overtoneGain.connect(filter);
        filter.connect(ctx.destination);

        osc.start(startTime);
        overtone.start(startTime);
        osc.stop(startTime + duration + 0.02);
        overtone.stop(startTime + duration + 0.02);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Gentle encouraging bounce on incorrect answer
   */
  public playError() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [349.23, 293.66]; // F4 -> D4
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const startTime = now + idx * 0.12;
        const duration = 0.22;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.92, startTime + duration);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.16, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.02);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Star collect sparkle harp sound
   */
  public playStarCollect() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [587.33, 880, 1174.66, 1760, 2093.0];
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const startTime = now + idx * 0.045;
        const duration = 0.26;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.02);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Victory fanfare on completing a module
   */
  public playFanfare() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const chords = [
        { freqs: [523.25, 659.25, 783.99], time: 0, dur: 0.18 },
        { freqs: [587.33, 739.99, 880.00], time: 0.16, dur: 0.18 },
        { freqs: [659.25, 830.61, 987.77], time: 0.32, dur: 0.22 },
        { freqs: [783.99, 1046.50, 1318.51, 1567.98], time: 0.52, dur: 0.75 }
      ];

      chords.forEach((chord) => {
        const chordStartTime = now + chord.time;
        chord.freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, chordStartTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(3200, chordStartTime);

          gain.gain.setValueAtTime(0.001, chordStartTime);
          gain.gain.linearRampToValueAtTime(0.12, chordStartTime + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, chordStartTime + chord.dur);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(chordStartTime);
          osc.stop(chordStartTime + chord.dur + 0.05);
        });
      });
    } catch {
      // ignore
    }
  }

  private activeSpeechUtterance: SpeechSynthesisUtterance | null = null;
  private isCurrentlySpeaking: boolean = false;
  private speechListeners: Array<(speaking: boolean, text: string) => void> = [];

  public onSpeechStateChange(listener: (speaking: boolean, text: string) => void) {
    this.speechListeners.push(listener);
    return () => {
      this.speechListeners = this.speechListeners.filter(l => l !== listener);
    };
  }

  private stopHooks: Array<() => void> = [];

  /** Registers a callback run whenever speech is stopped or replaced. Returns an unsubscribe function. */
  public registerStopHook(hook: () => void): () => void {
    this.stopHooks.push(hook);
    return () => {
      this.stopHooks = this.stopHooks.filter(h => h !== hook);
    };
  }

  private runStopHooks() {
    for (const hook of this.stopHooks) {
      try {
        hook();
      } catch {
        // one failing hook must not block the others
      }
    }
  }

  /** Lets non-synthesis audio (recorded clips) drive the same speaking indicator. */
  public reportExternalSpeech(speaking: boolean, text: string = '') {
    this.notifySpeechState(speaking, text);
  }

  /** Plays the short jingle that belongs to a character. */
  public playCharacterJingle(effect: 'lion' | 'bunny' | 'owl' | 'panda' | 'dino' | 'kids') {
    if (!this.soundEnabled) return;
    switch (effect) {
      case 'lion': this.playLionRoarJingle(); break;
      case 'bunny': this.playBunnyBoingJingle(); break;
      case 'owl': this.playOwlHootJingle(); break;
      case 'panda': this.playPandaGiggleJingle(); break;
      case 'dino': this.playDinoStompJingle(); break;
      case 'kids': this.playKidsJingle(); break;
    }
  }

  /** Browser Indonesian speech with an explicit pitch and rate (cadangan suara karakter). */
  public speakWithProfile(rawText: string, profile: { pitch: number; rate: number; gender?: 'male' | 'female' }) {
    if (!this.speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      this.runStopHooks();
      this.notifySpeechState(false, '');

      const cleanText = formatKidPersonaText(rawText);
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.pitch = profile.pitch;
      utterance.rate = profile.rate;
      utterance.volume = 1.0;

      if (!this.isVoicesInitialized) {
        this.initVoices();
      }
      const chosen = chooseVoice(
        { male: this.maleVoice, female: this.femaleVoice, fallback: this.defaultVoice },
        profile.gender
      );
      if (chosen) utterance.voice = chosen;

      utterance.onstart = () => this.notifySpeechState(true, rawText);
      utterance.onend = () => this.notifySpeechState(false, '');
      utterance.onerror = () => this.notifySpeechState(false, '');

      this.activeSpeechUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      // speech synthesis errors are handled safely
    }
  }

  private notifySpeechState(speaking: boolean, text: string = '') {
    this.isCurrentlySpeaking = speaking;
    this.speechListeners.forEach(l => {
      try {
        l(speaking, text);
      } catch {
        // ignore
      }
    });
  }

  /**
   * Speak as the Indonesian Child Narrator Friend
   * Clear, well-enunciated, friendly, and easy to understand for young learners!
   */
  public speakIndonesian(rawText: string) {
    if (!this.speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      this.runStopHooks();
      this.notifySpeechState(false, '');

      const cleanText = formatKidPersonaText(rawText);
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';

      // Suara anak-anak Indonesia yang ceria, jernih, dan bersahabat (Child Voice Pitch & Rate)
      utterance.pitch = 1.35;
      utterance.rate = 1.02;
      utterance.volume = 1.0;

      if (!this.isVoicesInitialized) {
        this.initVoices();
      }

      if (this.femaleVoice) {
        utterance.voice = this.femaleVoice;
      } else if (this.defaultVoice) {
        utterance.voice = this.defaultVoice;
      }

      utterance.onstart = () => {
        this.notifySpeechState(true, rawText);
      };
      utterance.onend = () => {
        this.notifySpeechState(false, '');
      };
      utterance.onerror = () => {
        this.notifySpeechState(false, '');
      };

      this.activeSpeechUtterance = utterance;

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis error handled safely
    }
  }

  /**
   * Speak English phrases or vocabulary with natural English pronunciation!
   */
  public speakEnglish(rawText: string, options?: { pitch?: number; rate?: number; lang?: string }) {
    if (!this.speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      this.runStopHooks();
      this.notifySpeechState(false, '');

      // Clean emojis and punctuation
      const cleanText = rawText
        .replace(/[\u{1F300}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{1F004}-\u{1F0CF}\u{FE00}-\u{FE0F}]/gu, ' ')
        .replace(/[*#_~`^]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = options?.lang || 'en-US';
      utterance.pitch = options?.pitch ?? 1.15;
      utterance.rate = options?.rate ?? 0.88; // Ideal tempo for young English learners
      utterance.volume = 1.0;

      if (!this.isVoicesInitialized) {
        this.initVoices();
      }

      if (this.englishVoice) {
        utterance.voice = this.englishVoice;
      }

      utterance.onstart = () => {
        this.notifySpeechState(true, rawText);
      };
      utterance.onend = () => {
        this.notifySpeechState(false, '');
      };
      utterance.onerror = () => {
        this.notifySpeechState(false, '');
      };

      this.activeSpeechUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      // safe fallback
    }
  }

  /**
   * 🐢 Slow & Clear English Speech (Artikulasi Lambat & Jelas untuk Belajar Cara Baca)
   */
  public speakEnglishSlow(rawText: string) {
    this.speakEnglish(rawText, { rate: 0.65, pitch: 1.12 });
  }

  /**
   * 🔤 Spell Letter by Letter then pronounce full word
   * Example: "APPLE" -> "A... P... P... L... E... Apple!"
   */
  public speakEnglishSpelling(word: string) {
    const cleanWord = word.trim().replace(/[^a-zA-Z]/g, '').toUpperCase();
    if (!cleanWord) return;
    const letters = cleanWord.split('').join('. ');
    const speechText = `${letters}. ... ${word}!`;
    this.speakEnglish(speechText, { rate: 0.80, pitch: 1.15 });
  }

  /**
   * 🗣️ Read Syllables breakdown then pronounce full word
   */
  public speakEnglishSyllables(syllables: string[], fullWord: string) {
    if (!syllables || syllables.length === 0) {
      this.speakEnglish(fullWord);
      return;
    }
    const syllText = syllables.join(' ... ');
    const fullText = `${syllText}! ... ${fullWord}!`;
    this.speakEnglish(fullText, { rate: 0.78, pitch: 1.15 });
  }

  /**
   * 🧠 Smart Language Auto-detection Speech Handler
   */
  public speakSmart(text: string, subjectId?: string) {
    if (!text) return;
    if (subjectId === 'bahasa_inggris') {
      // If it's pure Indonesian guide text like "Pilihlah arti kata...", speakIndonesian, else speakEnglish
      const isIndonesianInstruction = /^(pilih|manakah|apa|berapakah|bagaimana|ayo|jawablah|arti|sebutkan|hubungkan|pasangkan|tebak)/i.test(text.trim());
      if (isIndonesianInstruction) {
        this.speakIndonesian(text);
      } else {
        this.speakEnglish(text);
      }
    } else {
      this.speakIndonesian(text);
    }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.notifySpeechState(false, '');
    }
    this.runStopHooks();
  }

  public getActiveVoiceName(): string {
    return this.defaultVoice?.name || 'Bahasa Indonesia (Suara Jernih & Jelas)';
  }
}

export const sound = new SoundEngine();
