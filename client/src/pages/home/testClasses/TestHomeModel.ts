import apiCache from '@/api/cache';
import { SuiteData } from '@/models/SuiteData';
import { HomeModel } from '../HomeModel';

export class TestHomeModel extends HomeModel {
  clearSuitesData() {
    apiCache.setSuites([]);
  }

  setSuites(suites: SuiteData[]): void {
    apiCache.setSuites(suites);
  }
}
