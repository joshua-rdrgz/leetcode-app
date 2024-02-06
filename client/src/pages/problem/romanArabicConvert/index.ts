import { SuiteData } from '@/models/SuiteData';
import { RomanArabicController } from './RomanArabicController';
import romanArabicModel from '@/pages/problem/romanArabicConvert/RomanArabicModel';
import romanArabicView from '@/pages/problem/romanArabicConvert/RomanArabicView';

export async function romanArabicConvertInit(suiteData: SuiteData) {
  const controller = new RomanArabicController(
    romanArabicModel,
    romanArabicView
  );
  controller.initialize(suiteData);
}
