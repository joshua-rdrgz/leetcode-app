import { type ProblemModel } from '@/models/problems/ProblemModel';
import { type ProblemView } from '@/views/ProblemView';

export class ProblemController {
  model: ProblemModel;
  view: ProblemView;

  constructor(model: ProblemModel, view: ProblemView) {
    this.model = model;
    this.view = view;
  }

  async initialize() {
    await this.model.fetchProblems();
    this.view.renderGrid(this.model.data, this.navigateToPage());
  }

  navigateToPage() {
    return function (cardName: string) {
      const url = `/problem/${encodeURIComponent(cardName)}`;
      console.log('Navigating to:', url);
    };
  }
}
