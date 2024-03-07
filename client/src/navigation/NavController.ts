import Navigo, { Match } from 'navigo';
import { BaseController } from '@/base/BaseController';
import { NavModel } from '@/navigation/NavModel';
import { homePageInit } from '@/pages/home';
import { solvePageInit } from '@/pages/problem';
import { NavView } from '@/navigation/NavView';
import { Navigation } from '@/models/Navigation';

export class NavController extends BaseController implements Navigation {
  protected router: Navigo;
  protected model: NavModel;
  protected view: NavView;

  constructor(router: Navigo, model: NavModel, view: NavView) {
    super();
    this.router = router;
    this.model = model;
    this.view = view;
  }

  initialize() {
    const handleBeforeHook = this.handleBeforeHook.bind(this);

    this.router
      .hooks({
        before(done, match) {
          handleBeforeHook(match);
          done();
        },
      })
      .on({
        // ** HOME PAGE **
        '/': {
          as: 'Home',
          uses() {
            homePageInit();
          },
        },
        // ** SOLVE PAGE **
        '/problem/:solvePage': {
          as: 'Solve Page',
          uses(match: Match) {
            solvePageInit(match);
          },
        },
        '/page-not-found': {
          as: 'Not Found',
          uses() {
            console.log('not found page');
            // TODO: implement NotFound MVC
          },
        },
      })
      .notFound((match: Match) => {
        console.log('path not found: ', match.url);
        this.router.navigate('/page-not-found');
      })
      .resolve();

    return this;
  }

  navigateToUrl(url: string, pageHistoryHandled = false) {
    this.model.pageHistoryHandled = pageHistoryHandled;
    this.router.navigate(url);
  }

  getCurrAndPrevPages() {
    return {
      currPage: this.model.getCurrentPage(),
      prevPage: this.model.getPrevPage(),
    };
  }

  protected handleBeforeHook(match: Match) {
    const pageUrl = match.url.trim().length === 0 ? '/' : `/${match.url}`;
    if (!this.model.pageHistoryHandled) {
      this.model.pushPageToHistory(match.route.name, pageUrl);
    }
    this.model.pageHistoryHandled = false;

    this.view.render({
      canRenderHomeBtn: this.canRenderHomeBtn.bind(this),
      onHomeBtnClick: this.onHomeBtnClick.bind(this),
      canRenderPrevBtn: this.canRenderPrevBtn.bind(this),
      onPrevBtnClick: this.onPrevBtnClick.bind(this),
      getCurrentPage: this.model.getCurrentPage.bind(this.model),
    });
  }

  protected canRenderHomeBtn() {
    const { currPage } = this.getCurrAndPrevPages();
    return currPage?.pageUrl !== '/';
  }

  protected onHomeBtnClick() {
    this.navigateToUrl('/');
  }

  protected canRenderPrevBtn() {
    const { prevPage } = this.getCurrAndPrevPages();
    return !!prevPage;
  }

  protected onPrevBtnClick() {
    if (this.model.hasPrevPage()) {
      this.model.popCurrentPage();
      this.navigateToUrl(this.model.getCurrentPage()!.pageUrl, true);
    }
  }
}

export type NavigateToUrlFn = InstanceType<
  typeof NavController
>['navigateToUrl'];
