import { type ProblemData } from '@/models/problems/ProblemData';

export class ProblemModel {
  data: ProblemData[] = [];

  async fetchProblems(): Promise<void> {
    const response = await fetch('/api/v1/leetcode/problems');
    const data = await response.json();
    this.data = data.data;
  }
}

export default new ProblemModel();
