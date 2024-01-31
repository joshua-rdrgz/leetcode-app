import Navigo, { type Match } from 'navigo';
import { problemsPageInit } from '@/features/problems';
import { solvePageInit } from '@/features/solve';

export class NavigationController {
  protected static router: Navigo = new Navigo('/');

  static initialize() {
    this.router
      .on({
        // ** HOME PAGE **
        '/': () => {
          problemsPageInit();
        },
        // ** SOLVE PAGE **
        '/problem/:solvePage': (match: Match) => {
          solvePageInit(match);
        },
      })
      .resolve();
  }

  static navigateToHome() {
    this.router.navigate('/');
  }

  static navigateToUrl(url: string) {
    this.router.navigate(url);
  }
}

export type NavigateToUrlFn = typeof NavigationController.navigateToUrl;
