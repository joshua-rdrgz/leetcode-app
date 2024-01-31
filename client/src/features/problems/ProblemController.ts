import { BaseController } from '@/base/BaseController';
import { type ProblemModel } from '@/features/problems/ProblemModel';
import { type ProblemView } from '@/features/problems/ProblemView';

export class ProblemController extends BaseController {
  private model: ProblemModel;
  private view: ProblemView;

  constructor(model: ProblemModel, view: ProblemView) {
    super();
    this.model = model;
    this.view = view;
  }

  async initialize() {
    this.view.render(this.model.getData(), (cardName: string) => {
      const encodedCardName = encodeURIComponent(cardName);
      super.navigateToUrl(`/problem/${encodedCardName}`);
    });
  }
}
