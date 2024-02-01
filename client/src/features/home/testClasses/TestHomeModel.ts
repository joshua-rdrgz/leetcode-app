import apiCache from '@/api/cache';
import { HomeModel } from '../HomeModel';

export class TestHomeModel extends HomeModel {
  clearSuitesData() {
    apiCache.setSuites([]);
  }
}
