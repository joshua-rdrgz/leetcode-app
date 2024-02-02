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
});
