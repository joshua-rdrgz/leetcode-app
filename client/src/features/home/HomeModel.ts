import apiCache from '@/api/cache';

export class HomeModel {
  getSuitesData() {
    return apiCache.getSuites();
  }
}

export default new HomeModel();
