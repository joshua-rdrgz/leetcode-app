import { ProblemData } from '@/features/problems/ProblemData';
import { RomanArabicController } from './RomanArabicController';

export async function romanArabicConvertInit(problemData: ProblemData) {
  const controller = new RomanArabicController();
  controller.initialize(problemData);
}
