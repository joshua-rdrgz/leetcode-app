import { Match } from 'navigo';
import apiCache from '@/api/cache';
import { romanArabicConvertInit } from '@/features/solve/romanArabicConvert';

export function solvePageInit(match: Match) {
  const problemData = apiCache.getProblemByName(match.data!.solvePage);

  if (!problemData) {
    throw new Error('Problem not found');
  }

  switch (problemData.name) {
    case 'Roman/Arabic Numeral Converter':
      romanArabicConvertInit(problemData);
      break;
    default:
      throw new Error('This page does not exist.');
  }
}
