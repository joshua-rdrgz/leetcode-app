import { BaseController } from '@/base/BaseController';
import { type ProblemModel } from '@/features/problems/ProblemModel';
import { type ProblemsView } from '@/features/problems/ProblemsView';

export class ProblemController extends BaseController {
  private model: ProblemModel;
  private view: ProblemsView;

  constructor(model: ProblemModel, view: ProblemsView) {
    super();
    this.model = model;
    this.view = view;
  }

  async initialize() {
    await this.model.fetchProblems();
    this.view.render(this.model.getData(), (cardName: string) => {
      const encodedCardName = encodeURIComponent(cardName);
      super.navigateToUrl(`/problem/${encodedCardName}`);
    });
  }
}
