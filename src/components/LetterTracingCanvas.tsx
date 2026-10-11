import React, { useRef, useState, useEffect } from 'react';
import {
  Sparkles,
  RotateCcw,
  Volume2,
  CheckCircle2,
  Palette,
  Info,
  Play,
  Pause,
  Eye,
  EyeOff,
  Eraser,
  HelpCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  Flame,
  Star,
  Check
} from 'lucide-react';
import { sound } from '../utils/audio';
import { voice } from '../audio/voice';
import { useGuide } from '../audio/useGuide';
import confetti from 'canvas-confetti';
import {
  TracingItem,
  TracingCategory,
  CAPITAL_LETTERS_TRACING,
  NUMBERS_TRACING,
  PRE_WRITING_PATTERNS,
  findTracingItem,
  MOTORIC_POSTURE_TIPS,
  StrokeStep
} from '../data/tracingData';

interface LetterTracingCanvasProps {
  initialLetter?: string;
  exampleWord?: string;
  exampleEmoji?: string;
  phonicsSound?: string;
  strokeGuide?: string[];
  availableLetters?: string[];
  category?: TracingCategory;
  onComplete?: () => void;
}

const INK_COLORS = [
  { id: 'rainbow', color: 'rainbow', label: '🌈 Pelangi Ajaib', ring: 'ring-pink-400', hex: '#EC4899' },
  { id: 'gold', color: '#D97706', label: 'Emas Ceria', ring: 'ring-amber-400', hex: '#D97706' },
  { id: 'blue', color: '#1976D2', label: 'Biru Bintang', ring: 'ring-blue-400', hex: '#1976D2' },
  { id: 'rose', color: '#E11D48', label: 'Merah Muda', ring: 'ring-rose-400', hex: '#E11D48' },
  { id: 'emerald', color: '#059669', label: 'Hijau Daun', ring: 'ring-emerald-400', hex: '#059669' },
  { id: 'purple', color: '#7C3AED', label: 'Ungu Magis', ring: 'ring-purple-400', hex: '#7C3AED' },
];

const BRUSH_SIZES = [
  { id: 'fine', size: 14, label: 'Halus' },
  { id: 'medium', size: 22, label: 'Sedang' },
  { id: 'bold', size: 30, label: 'Tebal' },
];

export const LetterTracingCanvas: React.FC<LetterTracingCanvasProps> = ({
  initialLetter = 'A',
  exampleWord,
  exampleEmoji,
  phonicsSound,
  strokeGuide,
  availableLetters,
  category: initialCategory = 'huruf_kapital',
  onComplete
}) => {
  // Active Category & Item Selection
  const [activeCategory, setActiveCategory] = useState<TracingCategory>(() => {
    if (initialLetter && /^[0-9]+$/.test(initialLetter)) return 'angka';
    if (initialLetter && ['|', '—', '/', '∪', 'W', '~'].includes(initialLetter)) return 'pola_dasar';
    return initialCategory;
  });

  const [activeChar, setActiveChar] = useState<string>(initialLetter);
  const [activeInk, setActiveInk] = useState<string>(INK_COLORS[0].color);
  const [brushSize, setBrushSize] = useState<number>(22);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [showHelperDots, setShowHelperDots] = useState<boolean>(true);
  const [showParentTips, setShowParentTips] = useState<boolean>(false);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [strokePointsCount, setStrokePointsCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const guide = useGuide();
  const [rainbowHue, setRainbowHue] = useState<number>(0);

  // Demo animation state
  const [isAnimatingDemo, setIsAnimatingDemo] = useState<boolean>(false);
  const [demoStepIndex, setDemoStepIndex] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Get current active tracing item definition
  const currentItem: TracingItem =
    findTracingItem(activeChar) || {
      id: `custom_${activeChar}`,
      char: activeChar,
      label: `Huruf ${activeChar}`,
      category: activeCategory,
      exampleWord: exampleWord || 'Kata',
      exampleEmoji: exampleEmoji || '⭐',
      rhymeOrMotto: 'Ayo tebalkan dengan penuh semangat!',
      phonicsSound: phonicsSound || `${activeChar}!`,
      strokeGuide: strokeGuide || ['1. Tarik garis dari atas ke bawah'],
      speechGuide: `Ayo tebalkan ${activeChar}! Ikuti arah titik-titik dengan rapi.`,
      strokeSteps: [
        {
          stepNumber: 1,
          instruction: 'Tebalkan garis',
          arrow: '⬇️',
          speechInstruction: 'Tarik garis dari atas ke bawah',
          points: [{ x: 0.5, y: 0.2 }, { x: 0.5, y: 0.8 }]
        }
      ]
    };

  // Switch category list
  const getCategoryItems = () => {
    switch (activeCategory) {
      case 'angka':
        return NUMBERS_TRACING;
      case 'pola_dasar':
        return PRE_WRITING_PATTERNS;
      case 'huruf_kapital':
      default:
        if (availableLetters && availableLetters.length > 0) {
          // If availableLetters passed from specific module step
          const filtered = availableLetters
            .map(char => findTracingItem(char))
            .filter((item): item is TracingItem => Boolean(item));
          if (filtered.length > 0) return filtered;
        }
        return CAPITAL_LETTERS_TRACING;
    }
  };

  const categoryItems = getCategoryItems();

  // Reset and redraw background whenever character changes
  useEffect(() => {
    stopDemoAnimation();
    resetCanvas();
  }, [activeChar, showHelperDots]);

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.clearRect(0, 0, width, height);

    // Draw notebook guidelines (Buku Halus 3 Garis Standar)
    // 1. Top guide line (Garis Atas)
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#E0DCD3';
    ctx.beginPath();
    ctx.moveTo(20, height * 0.20);
    ctx.lineTo(width - 20, height * 0.20);
    ctx.stroke();

    // 2. Middle dashed line (Garis Tengah Putus-putus)
    ctx.beginPath();
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = '#D7CCC8';
    ctx.moveTo(20, height * 0.48);
    ctx.lineTo(width - 20, height * 0.48);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Baseline (Garis Dasar Bawah Tegas)
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#BCAAA4';
    ctx.moveTo(20, height * 0.78);
    ctx.lineTo(width - 20, height * 0.78);
    ctx.stroke();

    // Draw Dotted Letter/Number Template Guide
    ctx.save();
    const fontSize = Math.round(height * 0.60);
    ctx.font = `bold ${fontSize}px "Nunito", "Comic Sans MS", cursive, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Faint fill guide
    ctx.fillStyle = '#F5EFE6';
    ctx.fillText(currentItem.char, width / 2, height * 0.48);

    // Dotted stroke outline
    ctx.strokeStyle = '#BCAAA4';
    ctx.lineWidth = 5;
    ctx.setLineDash([10, 10]);
    ctx.strokeText(currentItem.char, width / 2, height * 0.48);
    ctx.restore();

    // Draw Numbered Checkpoint Dots & Direction Arrows (Titik Awal 1, 2, 3)
    if (showHelperDots && currentItem.strokeSteps && currentItem.strokeSteps.length > 0) {
      currentItem.strokeSteps.forEach(step => {
        if (!step.points || step.points.length === 0) return;
        const startPoint = step.points[0];
        const nextPoint = step.points[1] || step.points[0];

        const cx = startPoint.x * width;
        const cy = startPoint.y * height;

        // Draw start glowing bubble
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#D97706'; // Vibrant amber
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();

        // Step number inside bubble
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(step.stepNumber), cx, cy);

        // Direction arrow guide
        if (nextPoint) {
          const nx = nextPoint.x * width;
          const ny = nextPoint.y * height;
          const angle = Math.atan2(ny - cy, nx - cx);

          const arrowDist = 24;
          const ax = cx + Math.cos(angle) * arrowDist;
          const ay = cy + Math.sin(angle) * arrowDist;

          ctx.beginPath();
          ctx.arc(ax, ay, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();
        }
        ctx.restore();
      });
    }

    setStrokePointsCount(0);
    setIsCompleted(false);
  };

  // Demo Animation Runner
  const stopDemoAnimation = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setIsAnimatingDemo(false);
  };

  const handlePlayDemo = () => {
    if (isAnimatingDemo) {
      stopDemoAnimation();
      return;
    }

    resetCanvas();
    setIsAnimatingDemo(true);
    sound.playPop(520);
    sound.speakIndonesian(currentItem.speechGuide);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const steps = currentItem.strokeSteps;

    if (!steps || steps.length === 0) {
      setIsAnimatingDemo(false);
      return;
    }

    let currentStep = 0;
    let pointProgress = 0;
    let t = 0;

    const animateStroke = () => {
      if (currentStep >= steps.length) {
        setIsAnimatingDemo(false);
        sound.playTada();
        return;
      }

      setDemoStepIndex(currentStep);
      const step = steps[currentStep];
      const pts = step.points;

      if (pts.length < 2) {
        currentStep++;
        animFrameRef.current = requestAnimationFrame(animateStroke);
        return;
      }

      const p1 = pts[pointProgress];
      const p2 = pts[pointProgress + 1];

      if (!p2) {
        currentStep++;
        pointProgress = 0;
        t = 0;
        animFrameRef.current = requestAnimationFrame(animateStroke);
        return;
      }

      const curX = (p1.x + (p2.x - p1.x) * t) * width;
      const curY = (p1.y + (p2.y - p1.y) * t) * height;

      // Draw animated demo line
      ctx.save();
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      const prevX = (p1.x + (p2.x - p1.x) * Math.max(0, t - 0.08)) * width;
      const prevY = (p1.y + (p2.y - p1.y) * Math.max(0, t - 0.08)) * height;
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(curX, curY);
      ctx.stroke();
      ctx.restore();

      if (Math.random() < 0.2) {
        sound.playPencilStroke();
      }

      t += 0.04;
      if (t >= 1) {
        t = 0;
        pointProgress++;
        if (pointProgress >= pts.length - 1) {
          currentStep++;
          pointProgress = 0;
        }
      }

      animFrameRef.current = requestAnimationFrame(animateStroke);
    };

    animFrameRef.current = requestAnimationFrame(animateStroke);
  };

  const getCanvasCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isAnimatingDemo) stopDemoAnimation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    const point = getCanvasCoordinates(e);
    lastPointRef.current = point;
    drawDot(point.x, point.y);
    sound.playPencilStroke();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPointRef.current) return;
    const point = getCanvasCoordinates(e);
    drawLine(lastPointRef.current.x, lastPointRef.current.y, point.x, point.y);
    lastPointRef.current = point;
    setStrokePointsCount(prev => prev + 1);

    if (strokePointsCount % 7 === 0) {
      sound.playPencilStroke();
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    lastPointRef.current = null;

    if (strokePointsCount > 24 && !isCompleted) {
      handleValidate();
    }
  };

  const getCurrentStrokeColor = () => {
    if (isEraser) return '#FAF8F0';
    if (activeInk === 'rainbow') {
      const nextHue = (rainbowHue + 15) % 360;
      setRainbowHue(nextHue);
      return `hsl(${nextHue}, 90%, 55%)`;
    }
    return activeInk;
  };

  const drawDot = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const color = getCurrentStrokeColor();
    ctx.save();
    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, brushSize * 1.2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const drawLine = (fromX: number, fromY: number, toX: number, toY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const color = getCurrentStrokeColor();
    ctx.save();
    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 1.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
    }
    ctx.restore();
  };

  const handleValidate = () => {
    setIsCompleted(true);
    sound.playTada();
    void voice.playLine(guide, 'benar', `Bagus sekali! Tulisan ${currentItem.char} buatanmu sangat rapi!`);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onComplete) {
      onComplete();
    }
  };

  const handleSpeakPhonics = () => {
    sound.playPop(520);
    sound.speakIndonesian(currentItem.phonicsSound);
  };

  const handleSpeakSpeechGuide = () => {
    sound.playPop(540);
    sound.speakIndonesian(currentItem.speechGuide);
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* 🌟 CATEGORY TABS SELECTOR 🌟 */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#FAF8F0] border-2 border-[#E7E2D6] rounded-2xl mb-3 shadow-2xs max-w-md w-full">
        <button
          type="button"
          id="btn-cat-huruf"
          onClick={() => {
            sound.playPop(480);
            setActiveCategory('huruf_kapital');
            setActiveChar(CAPITAL_LETTERS_TRACING[0].char);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeCategory === 'huruf_kapital'
              ? 'bg-[#D97706] text-white shadow-2xs'
              : 'text-[#8D6E63] hover:text-[#4E342E]'
          }`}
        >
          🔤 Huruf Kapital (A-Z)
        </button>

        <button
          type="button"
          id="btn-cat-angka"
          onClick={() => {
            sound.playPop(480);
            setActiveCategory('angka');
            setActiveChar(NUMBERS_TRACING[1].char); // '1'
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeCategory === 'angka'
              ? 'bg-[#1976D2] text-white shadow-2xs'
              : 'text-[#8D6E63] hover:text-[#4E342E]'
          }`}
        >
          🔢 Angka (0-10)
        </button>

        <button
          type="button"
          id="btn-cat-pola"
          onClick={() => {
            sound.playPop(480);
            setActiveCategory('pola_dasar');
            setActiveChar(PRE_WRITING_PATTERNS[0].char);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeCategory === 'pola_dasar'
              ? 'bg-[#059669] text-white shadow-2xs'
              : 'text-[#8D6E63] hover:text-[#4E342E]'
          }`}
        >
          ✏️ Pola Garis Pra-Menulis
        </button>
      </div>

      {/* TOP HERO INFO CARD WITH RHYME & SOUND */}
      <div className="w-full max-w-lg bg-gradient-to-r from-[#FFF8E1] to-[#FFFDE7] border-3 border-[#FFE082] rounded-3xl p-4 sm:p-5 shadow-sm mb-3 text-left">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-3xl bg-white border-2 border-[#FFD54F] flex items-center justify-center text-3xl shadow-2xs shrink-0 animate-bounce">
              {currentItem.exampleEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-[#4E342E] font-heading">
                  {currentItem.label}
                </h3>
                <span className="text-xs font-black text-[#D97706] bg-white px-2.5 py-0.5 rounded-full border border-[#FFE082] shadow-2xs">
                  {currentItem.exampleWord}
                </span>
              </div>
              <p className="text-xs text-[#795548] font-bold mt-0.5">
                {currentItem.rhymeOrMotto || 'Ayo berlatih membuat goresan yang rapi dan tegas!'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 shrink-0">
            <button
              type="button"
              id="btn-speak-phonics"
              onClick={handleSpeakPhonics}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#E3F2FD] hover:bg-[#BBDEFB] text-[#1565C0] rounded-xl text-xs font-black border border-[#90CAF9] shadow-2xs active:scale-95 transition-all cursor-pointer"
              title="Bunyi Fonik"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Bunyi</span>
            </button>

            <button
              type="button"
              id="btn-speak-instructions"
              onClick={handleSpeakSpeechGuide}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#2E7D32] rounded-xl text-xs font-black border border-[#A5D6A7] shadow-2xs active:scale-95 transition-all cursor-pointer"
              title="Panduan Suara Langkah Demi Langkah"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Petunjuk</span>
            </button>
          </div>
        </div>

        {/* Number Counting Objects (Interactive counting visualization) */}
        {currentItem.countingCount !== undefined && currentItem.countingCount > 0 && (
          <div className="mt-3 pt-2.5 border-t border-[#FFE082] flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-black text-[#5D4037]">
              Hitung Jumlah Objek ({currentItem.countingCount}):
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {Array.from({ length: currentItem.countingCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    sound.playPop(500 + i * 40);
                    sound.speakIndonesian(String(i + 1));
                  }}
                  className="w-8 h-8 rounded-xl bg-white border border-[#FFD54F] flex items-center justify-center text-base shadow-2xs hover:scale-115 active:scale-95 transition-all cursor-pointer"
                  title={`Ketuk untuk menghitung ${i + 1}`}
                >
                  {currentItem.exampleEmoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 🎨 INTERACTIVE TRACING CANVAS BOARD 🎨 */}
      <div className="relative bg-[#FAF8F0] p-3 sm:p-4 rounded-3xl border-4 border-[#E7E2D6] shadow-inner max-w-lg w-full flex flex-col items-center">
        {/* Top Floating Controls inside Canvas */}
        <div className="w-full flex items-center justify-between mb-2 px-1">
          {/* Animated Demonstration Player */}
          <button
            type="button"
            id="btn-play-demo-animation"
            onClick={handlePlayDemo}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer ${
              isAnimatingDemo
                ? 'bg-[#E11D48] text-white animate-pulse'
                : 'bg-[#D97706] hover:bg-[#B45309] text-white'
            }`}
          >
            {isAnimatingDemo ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            <span>{isAnimatingDemo ? 'Hentikan Contoh' : '▶️ Putar Contoh Goresan'}</span>
          </button>

          {/* Toggle Helper Dots */}
          <button
            type="button"
            id="btn-toggle-helper-dots"
            onClick={() => {
              sound.playPop(440);
              setShowHelperDots(prev => !prev);
            }}
            className="px-2.5 py-1.5 bg-white hover:bg-[#FFFDE7] border border-[#D7CCC8] text-[#5D4037] rounded-xl text-[11px] font-black flex items-center gap-1 shadow-2xs active:scale-95 cursor-pointer"
          >
            {showHelperDots ? <Eye className="w-3.5 h-3.5 text-[#2E7D32]" /> : <EyeOff className="w-3.5 h-3.5 text-[#8D6E63]" />}
            <span>{showHelperDots ? 'Titik Arah Aktif' : 'Sembunyikan Titik'}</span>
          </button>
        </div>

        {/* Canvas Area */}
        <div className="relative w-full aspect-[4/3] bg-[#FFFDE7]/50 rounded-2xl border-3 border-[#D7CCC8] overflow-hidden touch-none shadow-xs cursor-crosshair">
          <canvas
            ref={canvasRef}
            width={520}
            height={390}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="w-full h-full block"
          />

          {/* Demonstration banner overlay */}
          {isAnimatingDemo && (
            <div className="absolute top-2 left-2 bg-[#D97706]/90 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-xs backdrop-blur-xs animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Memperagakan Langkah {demoStepIndex + 1}...</span>
            </div>
          )}

          {/* Completed feedback banner */}
          {isCompleted && (
            <div className="absolute top-3 right-3 bg-[#E8F5E9] text-[#2E7D32] border-2 border-[#81C784] px-3.5 py-1.5 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-sm animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
              <span>Luar Biasa! ⭐⭐⭐</span>
            </div>
          )}
        </div>

        {/* 🛠️ TOOLBAR: COLOR PALETTE, BRUSH SIZES, ERASER, CLEAR */}
        <div className="w-full mt-3 space-y-2.5">
          {/* Row 1: Inks and Tools */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            {/* Colors */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-black uppercase text-[#8D6E63] mr-1 hidden sm:inline">
                Tinta:
              </span>
              {INK_COLORS.map(ink => {
                const isSelected = activeInk === ink.color && !isEraser;
                return (
                  <button
                    key={ink.id}
                    type="button"
                    onClick={() => {
                      sound.playPop(520);
                      setIsEraser(false);
                      setActiveInk(ink.color);
                    }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all transform active:scale-90 flex items-center justify-center ${
                      isSelected ? `scale-115 ring-3 ${ink.ring} shadow-xs` : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{
                      background:
                        ink.id === 'rainbow'
                          ? 'linear-gradient(135deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #8B00FF)'
                          : ink.hex
                    }}
                    title={ink.label}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                  </button>
                );
              })}

              {/* Eraser Tool */}
              <button
                type="button"
                id="btn-eraser"
                onClick={() => {
                  sound.playPop(440);
                  setIsEraser(prev => !prev);
                }}
                className={`p-1.5 rounded-xl border text-xs font-black transition-all flex items-center gap-1 active:scale-95 cursor-pointer ${
                  isEraser
                    ? 'bg-[#374151] text-white border-[#1F2937] ring-2 ring-gray-400'
                    : 'bg-white border-[#D7CCC8] text-[#5D4037] hover:bg-[#FFF8E1]'
                }`}
                title="Penghapus"
              >
                <Eraser className="w-4 h-4" />
                <span className="text-[10px] hidden sm:inline">Hapus Sebagian</span>
              </button>
            </div>

            {/* Brush Thickness */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#D7CCC8]">
              {BRUSH_SIZES.map(b => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    sound.playPop(480);
                    setBrushSize(b.size);
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                    brushSize === b.size
                      ? 'bg-[#D97706] text-white shadow-2xs'
                      : 'text-[#8D6E63] hover:text-[#4E342E]'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Reset Canvas & Validate */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#E7E2D6] px-1">
            <button
              type="button"
              id="btn-reset-canvas"
              onClick={() => {
                sound.playPop(380);
                resetCanvas();
              }}
              className="flex items-center gap-1 px-3 py-2 bg-white hover:bg-[#FFF8E1] border border-[#D7CCC8] text-[#5D4037] rounded-xl text-xs font-black shadow-2xs active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Hapus Semua</span>
            </button>

            <button
              type="button"
              id="btn-validate-tracing"
              onClick={handleValidate}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#2E7D32] to-[#388E3C] hover:from-[#1B5E20] text-white rounded-xl text-xs font-black shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Cek Tulisan ⭐</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🧭 STEP-BY-STEP STROKE DIRECTION GUIDE ACCORDION 🧭 */}
      {currentItem.strokeGuide && currentItem.strokeGuide.length > 0 && (
        <div className="mt-3.5 p-4 bg-[#FFFDE7] border-2 border-[#FFE082] rounded-3xl max-w-lg w-full text-left shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="font-black text-xs sm:text-sm text-[#B45309] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#D97706]" />
              <span>Urutan Goresan {currentItem.label}:</span>
            </div>
            <button
              type="button"
              onClick={handleSpeakSpeechGuide}
              className="text-[11px] font-black text-[#1565C0] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" /> Dengar Panduan
            </button>
          </div>

          <div className="space-y-1.5">
            {currentItem.strokeGuide.map((guide, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2 bg-white/80 rounded-xl border border-[#FFE082] text-xs font-bold text-[#4E342E]"
              >
                <span className="w-5 h-5 rounded-full bg-[#D97706] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{guide}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🔠 CHARACTER SELECTOR CAROUSEL PILLS 🔠 */}
      <div className="mt-4 w-full max-w-lg">
        <div className="flex items-center justify-between text-[11px] font-black uppercase text-[#8D6E63] mb-2 px-1">
          <span>Pilih untuk Dilatih ({categoryItems.length}):</span>
          <span className="text-[#D97706] font-bold">Sentuh untuk ganti</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 max-h-40 overflow-y-auto p-2 bg-[#FAF8F0] border-2 border-[#E7E2D6] rounded-2xl">
          {categoryItems.map(item => {
            const isSelected = activeChar === item.char;
            return (
              <button
                key={item.id}
                id={`btn-select-char-${item.char}`}
                type="button"
                onClick={() => {
                  sound.playPop(480);
                  setActiveChar(item.char);
                  sound.speakIndonesian(item.label);
                }}
                className={`min-w-[40px] h-10 px-2 rounded-xl font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-[#D97706] text-white shadow-xs scale-105 ring-2 ring-[#FFB74D]'
                    : 'bg-white border border-[#D7CCC8] text-[#5D4037] hover:bg-[#FFF8E1]'
                }`}
              >
                <span>{item.char}</span>
                <span className="text-xs">{item.exampleEmoji}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 👨‍👩‍👧 PARENT & TEACHER FINE-MOTOR POSTURE TIPS (TOGGLEABLE) */}
      <div className="mt-4 w-full max-w-lg">
        <button
          type="button"
          id="btn-toggle-parent-tips"
          onClick={() => {
            sound.playPop(420);
            setShowParentTips(prev => !prev);
          }}
          className="w-full p-3 bg-[#FAF8F0] hover:bg-[#F5F2E9] border-2 border-[#D7CCC8] rounded-2xl flex items-center justify-between text-xs font-black text-[#5D4037] shadow-2xs transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#D97706]" />
            <span>💡 Panduan Motorik Halus & Cara Memegang Pensil (Parents & Guru)</span>
          </div>
          <span>{showParentTips ? '▲ Tutup' : '▼ Buka'}</span>
        </button>

        {showParentTips && (
          <div className="mt-2 p-4 bg-white border-2 border-[#FFE082] rounded-2xl shadow-xs space-y-3 animate-fade-in text-left">
            {MOTORIC_POSTURE_TIPS.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="text-2xl shrink-0">{tip.emoji}</span>
                <div>
                  <h5 className="text-xs font-black text-[#4E342E]">{tip.title}</h5>
                  <p className="text-[11px] text-[#795548] font-medium mt-0.5 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
