import { QuizQuestion, LearningStep, GradeId, LearningModule } from '../types';
import { CURATED_QUESTION_BANK } from '../data/questionBank';
import {
  shuffleArray,
  generateProceduralMathQuestion,
  generateProceduralLanguageQuestion,
  generateProceduralScienceQuestion,
  generateProceduralCharacterQuestion,
  generateProceduralEnglishQuestion,
  randomInt,
  randomChoice
} from './proceduralGenerators';

export interface PracticeQuizConfig {
  gradeId: GradeId;
  subjectId: string;
  questionCount: number;
  title?: string;
  customBadgeId?: string;
}

/**
 * Returns total count of available unique questions (Curated + Infinite dynamic procedural)
 */
export function getBankSoalStatistics() {
  const curatedCount = CURATED_QUESTION_BANK.length;
  return {
    curatedCount,
    dynamicCombinationsCount: '1.000+',
    totalAvailableText: '500+ Bank Soal & Materi Aktif',
  };
}

/**
 * Generates a randomized quiz set for a given module or free practice
 * by mixing curated bank questions and dynamic procedural questions.
 */
export function getQuestionsForQuiz(
  gradeId: GradeId,
  subjectId: string,
  baseModuleQuiz?: QuizQuestion[],
  desiredCount: number = 5
): QuizQuestion[] {
  const result: QuizQuestion[] = [];

  // 1. Gather curated questions matching grade and subject
  const matchingCurated = CURATED_QUESTION_BANK.filter(
    q => q.gradeId === gradeId && (q.subjectId === subjectId || subjectId === 'all')
  );

  // Also include base module quiz if provided
  const moduleQuestions = baseModuleQuiz ? [...baseModuleQuiz] : [];

  // Combine and shuffle pool
  const curatedPool = shuffleArray([...matchingCurated, ...moduleQuestions]);

  // Take from curated pool first
  const takeCuratedCount = Math.min(curatedPool.length, Math.floor(desiredCount * 0.6));
  for (let i = 0; i < takeCuratedCount && curatedPool.length > 0; i++) {
    const q = curatedPool[i];
    // Clone with shuffled options
    result.push({
      ...q,
      id: `quiz-q-${i}-${q.id}`,
      sourceId: q.id,
      questionNumber: result.length + 1,
      options: shuffleArray(q.options)
    });
  }

  // 2. Fill the rest with fresh procedural questions
  let proceduralIndex = 0;
  while (result.length < desiredCount) {
    let procQ: QuizQuestion;
    if (subjectId === 'matematika') {
      procQ = generateProceduralMathQuestion(gradeId, proceduralIndex);
    } else if (subjectId === 'calistung' || subjectId === 'belajar_membaca') {
      procQ = generateProceduralLanguageQuestion(gradeId, proceduralIndex);
    } else if (subjectId === 'ipa_alam') {
      procQ = generateProceduralScienceQuestion(gradeId, proceduralIndex);
    } else if (subjectId === 'karakter') {
      procQ = generateProceduralCharacterQuestion(gradeId, proceduralIndex);
    } else if (subjectId === 'bahasa_inggris') {
      procQ = generateProceduralEnglishQuestion(gradeId, proceduralIndex);
    } else {
      // Mixed subjects
      const generators = [
        generateProceduralMathQuestion,
        generateProceduralLanguageQuestion,
        generateProceduralScienceQuestion,
        generateProceduralCharacterQuestion,
        generateProceduralEnglishQuestion
      ];
      const gen = randomChoice(generators);
      procQ = gen(gradeId, proceduralIndex);
    }

    result.push({
      ...procQ,
      questionNumber: result.length + 1
    });
    proceduralIndex++;
  }

  // Final shuffle of the entire batch so order is unpredictable
  return shuffleArray(result).map((q, idx) => ({
    ...q,
    questionNumber: idx + 1
  }));
}

/**
 * Regenerates dynamic numbers and interactive examples for a module's step
 * allowing children to practice with fresh examples on demand!
 */
export function randomizeLearningStepData(step: LearningStep): LearningStep {
  if (step.type === 'interactive_counter') {
    const fruits = [
      { emoji: '🍎', label: 'Apel Segar' },
      { emoji: '🍊', label: 'Jeruk Manis' },
      { emoji: '🍓', label: 'Stroberi Lezat' },
      { emoji: '⭐', label: 'Bintang Terang' },
      { emoji: '🎈', label: 'Balon Terbang' },
      { emoji: '🥕', label: 'Wortel Kelinci' },
      { emoji: '🍰', label: 'Kue Ulang Tahun' }
    ];
    const picked = randomChoice(fruits);
    const newTarget = randomInt(4, 9);

    return {
      ...step,
      prompt: `Sentuh dan hitung hingga terkumpul ${newTarget} ${picked.label} ${picked.emoji}!`,
      speechText: `Ayo sentuh dan hitung bersama hingga terkumpul ${newTarget} ${picked.label}!`,
      interactiveData: {
        ...step.interactiveData,
        emoji: picked.emoji,
        itemLabel: picked.label,
        initialCount: 0,
        targetCount: newTarget,
        maxItems: newTarget + 3
      }
    };
  }

  if (step.type === 'addition_visual') {
    const countA = randomInt(2, 6);
    const countB = randomInt(2, 5);
    const total = countA + countB;
    const fruits = ['🍎', '🍊', '🍓', '⭐', '🎈'];
    const emoji = randomChoice(fruits);

    return {
      ...step,
      prompt: `Mari gabungkan ${countA} ${emoji} di keranjang kiri dan ${countB} ${emoji} di keranjang kanan. Berapakah jumlahnya?`,
      speechText: `Mari gabungkan ${countA} buah di kiri dan ${countB} buah di kanan. Berapakah jumlahnya?`,
      interactiveData: {
        ...step.interactiveData,
        itemsA: { emoji, count: countA, label: 'Keranjang Kiri' },
        itemsB: { emoji, count: countB, label: 'Keranjang Kanan' },
        operator: '+'
      }
    };
  }

  return step;
}
