import { BaseController } from '@/base/BaseController';
import { type HomeModel } from '@/features/home/HomeModel';
import { type HomeView } from '@/features/home/HomeView';

export class HomeController extends BaseController {
  private model: HomeModel;
  private view: HomeView;

  constructor(model: HomeModel, view: HomeView) {
    super();
    this.model = model;
    this.view = view;
  }

  async initialize() {
    this.view.render(this.model.getSuitesData(), (cardName: string) => {
      const encodedCardName = encodeURIComponent(cardName);
      super.navigateToUrl(`/problem/${encodedCardName}`);
    });
  }
}
