import Navigo, { type Match } from 'navigo';
import { homePageInit } from '@/features/home';
import { solvePageInit } from '@/features/solve';

export class NavigationController {
  protected static router: Navigo = new Navigo('/');

  static initialize() {
    this.router
      .on({
        // ** HOME PAGE **
        '/': () => {
          homePageInit();
        },
        // ** SOLVE PAGE **
        '/problem/:solvePage': (match: Match) => {
          solvePageInit(match);
        },
        '/page-not-found': () => {
          console.log('not found page');
          // TODO: implement NotFound MVC
        },
      })
      .notFound((match: Match) => {
        console.log('path not found: ', match.url);
        this.router.navigate('/page-not-found');
      })
      .resolve();
  }

  static navigateToUrl(url: string) {
    this.router.navigate(url);
  }
}

export type NavigateToUrlFn = typeof NavigationController.navigateToUrl;
