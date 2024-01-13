import { ProblemModel } from '../ProblemModel';

export class TestProblemModel extends ProblemModel {
  clearData() {
    this.data = [];
  }
}
