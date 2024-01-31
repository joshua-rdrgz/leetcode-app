import apiCache from '@/api/cache';

export class ProblemModel {
  getData() {
    return apiCache.getProblems();
  }
}

export default new ProblemModel();
