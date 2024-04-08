import { NavController } from '@/navigation/NavController';
import { TestNavModel } from '@/navigation/testClasses/TestNavModel';
import { TestNavView } from '@/navigation/testClasses/TestNavView';
import Navigo, { Match } from 'navigo';

export class TestNavController extends NavController {
  view: TestNavView;
  model: TestNavModel;

  constructor(
    router: Navigo,
    testNavModel: TestNavModel,
    testNavView: TestNavView
  ) {
    super(router, testNavModel, testNavView);
    this.view = testNavView;
    this.model = testNavModel;
  }

  // ** NEEDS TO MIRROR ACTUAL IMPLEMENTATION **
  initialize(): this {
    const handleAfterHook = this.getHandleAfterHook();

    this.router
      .hooks({
        after(match) {
          handleAfterHook(match);
        },
      })
      .on({
        // ** HOME PAGE **
        '/': {
          as: 'Home',
          uses() {
            console.log('home page');
          },
        },
        // ** SOLVE PAGE **
        '/problem/:solvePage': {
          as: 'Solve Page',
          uses() {
            console.log('solve page');
          },
        },
        // ** NOT FOUND PAGE **
        '/page-not-found': {
          as: 'Not Found',
          uses: (match: Match) => {
            this.navigateToUrl(
              `/page-not-found?attemptedUrl=${encodeURIComponent(match.url)}`,
              true
            );
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

  getRouter() {
    return this.router;
  }

  getModel() {
    return this.model;
  }

  getView() {
    return this.view;
  }

  setupNavDOM() {
    this.view.setupNavDOM();
  }

  teardownNavDOM() {
    this.view.teardownNavDOM();
  }

  clearNavHistory() {
    this.model.clearNavHistory();
  }

  getHandleAfterHook() {
    return this.handleAfterHook.bind(this);
  }

  getCanRenderHomeBtn() {
    return this.canRenderHomeBtn.bind(this);
  }

  getOnHomeBtnClick() {
    return this.onHomeBtnClick.bind(this);
  }

  getCanRenderPrevBtn() {
    return this.canRenderPrevBtn.bind(this);
  }

  getOnPrevBtnClick() {
    return this.onPrevBtnClick.bind(this);
  }
}
