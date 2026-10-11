import { describe, it, expect } from 'vitest';
import { getQuestionsForQuiz } from './dynamicCurriculumEngine';
import { CURATED_QUESTION_BANK } from '../data/questionBank';
import { questionClip, type Manifest } from '../audio/voiceCatalog';

describe('getQuestionsForQuiz and recorded question clips', () => {
  it('keeps the curated bank id in sourceId so a recorded clip can still be found', () => {
    const curatedIds = new Set(CURATED_QUESTION_BANK.map(q => q.id));
    const quiz = getQuestionsForQuiz('paud', 'matematika', undefined, 10);
    const clones = quiz.filter(q => q.id.startsWith('quiz-q-'));
    expect(clones.length).toBeGreaterThan(0);
    for (const q of clones) {
      expect(q.sourceId, q.id).toBeDefined();
      expect(curatedIds.has(q.sourceId!), q.id).toBe(true);
    }
  });

  it('a clip keyed by the bank id is found through the quiz question', () => {
    const quiz = getQuestionsForQuiz('paud', 'matematika', undefined, 10);
    const clone = quiz.find(q => q.id.startsWith('quiz-q-'))!;
    const manifest: Manifest = { leo: { questions: { [clone.sourceId!]: `/audio/leo/q/${clone.sourceId}.mp3` } } };
    expect(questionClip(manifest, 'leo', clone.sourceId ?? clone.id)).toBe(`/audio/leo/q/${clone.sourceId}.mp3`);
  });
});
