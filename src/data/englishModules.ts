import { LearningModule } from '../types';
import { ENGLISH_PAUD_TK_MODULES } from './englishModulesPAUD';
import { ENGLISH_SD_MODULES } from './englishModulesSD';

export const ENGLISH_LEARNING_MODULES: LearningModule[] = [
  ...ENGLISH_PAUD_TK_MODULES,
  ...ENGLISH_SD_MODULES
];

export { ENGLISH_PAUD_TK_MODULES, ENGLISH_SD_MODULES };
