import { SuiteData } from '@/models/SuiteData';
import { RomanArabicController } from './RomanArabicController';
import romanArabicModel from '@/pages/problem/romanArabicConvert/RomanArabicModel';

export async function romanArabicConvertInit(suiteData: SuiteData) {
  const controller = new RomanArabicController(romanArabicModel);
  controller.initialize(suiteData);
}
