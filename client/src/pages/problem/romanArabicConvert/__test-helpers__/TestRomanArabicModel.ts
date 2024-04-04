import { RomanArabicModel } from '@/pages/problem/romanArabicConvert/RomanArabicModel';

export class TestRomanArabicModel extends RomanArabicModel {
  public get APIClient() {
    return this.apiClient;
  }

  public get CacheProvider() {
    return this.cacheProvider;
  }
}
