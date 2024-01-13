import request from '@/api/request';
import { type ProblemData } from './ProblemData';

export class ProblemModel {
  protected data: ProblemData[] = [];

  async fetchProblems(): Promise<void> {
    const data = await request.get('/api/v1/leetcode/problems');
    this.data = data?.data || [];
  }

  getData() {
    return this.data;
  }
}

export default new ProblemModel();
