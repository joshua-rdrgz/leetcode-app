import { createApiResponse } from '@/api/testClasses/createApiResponse';
import { SuiteData } from '@/models/SuiteData';

export const suite: SuiteData = {
  name: '...',
  shortDescription: '...',
  longDescription: '...',
  endpoint: '/api/v1/leetcode/solve/roman-arabic-convert',
};

export const requestResponseData: { [key: string]: any } = {
  'GET /api/v1/leetcode/solve/roman-arabic-convert': createApiResponse(
    'success',
    200,
    [
      {
        name: 'Roman Numeral Conversion Endpoint',
        description: 'Converts between Roman and Arabic numerals',
        endpoint:
          'GET /api/v1/leetcode/solve/roman-arabic-convert/{romanOrArabic}',
      },
      {
        name: 'Flush Cache Endpoint',
        description: 'Flushes the cache',
        endpoint: 'DELETE /api/v1/leetcode/solve/roman-arabic-convert/cache',
      },
    ]
  ),
};
