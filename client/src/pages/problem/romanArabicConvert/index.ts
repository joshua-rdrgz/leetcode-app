import apiCache from '@/api/cache';
import request from '@/api/request';
import { SuiteData } from '@/models/SuiteData';
import romanArabicView from '@/pages/problem/romanArabicConvert/RomanArabicView';
import { RomanArabicController } from './RomanArabicController';
import { RomanArabicModel } from './RomanArabicModel';

export async function romanArabicConvertInit(suiteData: SuiteData) {
  const romanArabicModel = new RomanArabicModel(apiCache, request);

  const controller = new RomanArabicController(
    romanArabicModel,
    romanArabicView
  );
  controller.initialize(suiteData);
}
