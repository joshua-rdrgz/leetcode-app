import { BaseController } from '@/base/BaseController';
import { Navigation } from '@/models/Navigation';
import { type HomeModel } from '@/pages/home/HomeModel';
import { type HomeView } from '@/pages/home/HomeView';

export class HomeController extends BaseController {
  private model: HomeModel;
  private view: HomeView;
  protected navService: Navigation;

  constructor(model: HomeModel, view: HomeView, navService: Navigation) {
    super();
    this.model = model;
    this.view = view;
    this.navService = navService;
  }

  async initialize() {
    this.view.render(this.model.getSuitesData(), (cardName: string) => {
      const encodedCardName = encodeURIComponent(cardName);
      this.navService.navigateToUrl(`/problem/${encodedCardName}`);
    });
  }
}
