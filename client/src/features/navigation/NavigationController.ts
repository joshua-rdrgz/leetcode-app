import Navigo, { type Match } from 'navigo';
import { problemsPageInit } from '@/features/problems';

export class NavigationController {
  private static router: Navigo = new Navigo('/');

  static initialize() {
    this.router
      .on({
        // ** HOME PAGE **
        '/': problemsPageInit,
        // ** SOLVE PAGE **
        '/problem/:solvePage': (match: Match) => {
          console.log('match: ', match);
        },
      })
      .resolve();
  }

  static navigateToHome() {
    this.router.navigate('/');
  }

  static navigateToProblem(cardName: string) {
    const encodedCardName = encodeURIComponent(cardName);
    this.router.navigate(`/problem/${encodedCardName}`);
  }
}

export type NavigateToProblemFn = typeof NavigationController.navigateToProblem;
