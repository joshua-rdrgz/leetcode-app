import { SuiteData } from '@/models/SuiteData';
import { RomanArabicController } from './RomanArabicController';

export async function romanArabicConvertInit(suiteData: SuiteData) {
  const controller = new RomanArabicController();
  controller.initialize(suiteData);
}
