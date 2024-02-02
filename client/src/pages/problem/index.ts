import { Match } from 'navigo';
import apiCache from '@/api/cache';
import { romanArabicConvertInit } from '@/pages/problem/romanArabicConvert';

export function solvePageInit(match: Match) {
  const suite = apiCache.getSuiteByName(match.data!.solvePage);

  if (!suite) {
    throw new Error('Problem not found');
  }

  switch (suite.name) {
    case 'Roman/Arabic Numeral Converter':
      romanArabicConvertInit(suite);
      break;
    default:
      throw new Error('This page does not exist.');
  }
}
