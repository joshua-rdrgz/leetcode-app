import request from '@/api/request';
import { type ProblemData } from './ProblemData';

class ProblemModel {
  data: ProblemData[] = [];

  async fetchProblems(): Promise<void> {
    const data = await request.get('/api/v1/leetcode/problems');
    this.data = data?.data || [];
  }
}

export type { ProblemModel };

export default new ProblemModel();
