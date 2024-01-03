import { ProblemController } from './ProblemController';
import problemModel from './ProblemModel';
import problemView from './ProblemView';

export function problemsPageInit() {
  const problemController = new ProblemController(problemModel, problemView);
  problemController.initialize();
}
