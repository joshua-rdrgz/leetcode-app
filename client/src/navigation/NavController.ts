import { BaseController } from '@/base/BaseController';
import { Navigation } from '@/models/Navigation';
import { NavModel } from '@/navigation/NavModel';
import { NavView } from '@/navigation/NavView';
import { homePageInit } from '@/pages/home';
import { notFoundPageInit } from '@/pages/not-found';
import { solvePageInit } from '@/pages/problem';
import Navigo, { Match } from 'navigo';

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
          uses(match: Match) {
            const attemptedUrl = decodeURIComponent(
              match.params?.attemptedUrl || ''
            );
            notFoundPageInit(attemptedUrl);
          },
        },
      })
      .notFound((match: Match) => {
        this.router.navigate(
          `/page-not-found?attemptedUrl=${encodeURIComponent(match.url)}`
        );
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
