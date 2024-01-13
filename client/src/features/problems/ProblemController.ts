import { type ProblemModel } from '@/features/problems/ProblemModel';
import { type ProblemView } from '@/features/problems/ProblemView';
import { NavigationController } from '@/features/navigation/NavigationController';

export class ProblemController {
  private model: ProblemModel;
  private view: ProblemView;

  constructor(model: ProblemModel, view: ProblemView) {
    this.model = model;
    this.view = view;
  }

  async initialize() {
    await this.model.fetchProblems();
    this.view.renderGrid(this.model.getData(), (cardName: string) => {
      NavigationController.navigateToProblem(cardName);
    });
  }
}
