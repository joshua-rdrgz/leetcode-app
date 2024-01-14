import { NavigationController } from '@/navigation/NavigationController';
import { TestNavigationController } from '@/navigation/tests/TestNavigationController';

describe('NavigationController', () => {
  describe('initialize()', () => {
    it('should set up routes on the Navigo router', () => {
      const router = TestNavigationController.getRouter();

      NavigationController.initialize();

      const expectedRoutes = ['', 'problem/:solvePage']; // should be updated with each new route created

      router.routes.forEach((route, routeIdx) => {
        expect(route.name).toBe(expectedRoutes[routeIdx]);
      });
    });

    it('should call router.resolve()', () => {
      const router = TestNavigationController.getRouter();
      const resolveSpy = jest.spyOn(router, 'resolve');

      NavigationController.initialize();

      expect(resolveSpy).toHaveBeenCalled();
    });
  });

  describe('navigateToHome()', () => {
    it('should call router.navigate("/")', () => {
      const router = TestNavigationController.getRouter();
      const navigateSpy = jest.spyOn(router, 'navigate');

      NavigationController.navigateToHome();

      expect(navigateSpy).toHaveBeenCalledWith('/');
    });
  });

  describe('navigateToProblem()', () => {
    it('should call router.navigate() with the encoded cardName', () => {
      const router = TestNavigationController.getRouter();
      const navigateSpy = jest.spyOn(router, 'navigate');
      const cardName = 'example problem';

      NavigationController.navigateToProblem(cardName);

      expect(navigateSpy).toHaveBeenCalledWith('/problem/example%20problem');
    });
  });
});
