import { TestBaseView } from '@/base/testClasses/TestBaseView';
import { NavigationController } from '@/navigation/NavigationController';
import { TestNavigationController } from '@/navigation/testClasses/TestNavigationController';

describe('NavigationController', () => {
  beforeAll(() => {
    TestBaseView.setupTestDOM();
  });

  afterAll(() => {
    TestBaseView.teardownTestDOM();
  });

  describe('initialize()', () => {
    it('should set up routes on the Navigo router', () => {
      const router = TestNavigationController.getRouter();

      NavigationController.initialize();

      const expectedRoutes = ['', 'problem/:solvePage', 'page-not-found'];

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

  describe('navigateToUrl()', () => {
    it('should call router.navigate with the given url', () => {
      const router = TestNavigationController.getRouter();
      const navigateSpy = jest.spyOn(router, 'navigate');

      const testUrl = '/test';
      NavigationController.navigateToUrl(testUrl);

      expect(navigateSpy).toHaveBeenCalledWith(testUrl);
    });

    it('should redirect to page-not-found for invalid URL', () => {
      const router = TestNavigationController.getRouter();
      const navigateSpy = jest.spyOn(router, 'navigate');

      NavigationController.navigateToUrl('/invalid');

      expect(navigateSpy).toHaveBeenCalledWith('/page-not-found');
    });
  });
});
