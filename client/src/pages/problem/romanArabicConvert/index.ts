import apiCache from '@/api/cache';
import request from '@/api/request';
import { SuiteData } from '@/models/SuiteData';
import { RomanArabicController } from '@/pages/problem/romanArabicConvert/RomanArabicController';
import { RomanArabicModel } from '@/pages/problem/romanArabicConvert/RomanArabicModel';
import romanArabicView from '@/pages/problem/romanArabicConvert/RomanArabicView';

export async function romanArabicConvertInit(suiteData: SuiteData) {
  const romanArabicModel = new RomanArabicModel(apiCache, request);

  const controller = new RomanArabicController(
    romanArabicModel,
    romanArabicView
  );
  controller.initialize(suiteData);
}
