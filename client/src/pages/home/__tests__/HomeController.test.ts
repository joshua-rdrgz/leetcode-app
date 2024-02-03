import { TestBaseView } from '@/base/testClasses/TestBaseView';
import { SuiteData } from '@/models/SuiteData';
import { TestNavigationController } from '@/navigation/testClasses/TestNavigationController';
import { HomeController } from '@/pages/home/HomeController';
import { TestHomeModel } from '@/pages/home/testClasses/TestHomeModel';
import { TestHomeView } from '@/pages/home/testClasses/TestHomeView';

const suiteData: SuiteData[] = [
  {
    name: 'Suite 1',
    shortDescription: 'short description 1',
    longDescription: 'long description 1',
    endpoint: '/endpoint1',
  },
  {
    name: 'Suite 2',
    shortDescription: 'short description 2',
    longDescription: 'long description 2',
    endpoint: '/endpoint2',
  },
];

describe('ProblemController', () => {
  let controller: HomeController;
  let container: HTMLDivElement;

  const homeModel = new TestHomeModel();
  const homeView = new TestHomeView();

  beforeEach(() => {
    // DOM setup
    TestBaseView.setupTestDOM();

    // Clear mocks
    jest.clearAllMocks();

    // Model data injection
    homeModel.setSuites(suiteData);

    // Controller instantiation
    controller = new HomeController(homeModel, homeView);

    // Container injection
    container = document.createElement('div');
    container.id = 'problems';
    homeView.setContainer(container);
  });

  afterEach(() => {
    TestBaseView.teardownTestDOM();
    homeModel.clearSuitesData();
    homeView.clearContainer();
  });

  describe('initialize()', () => {
    it('renders the card grid with fetched problems', async () => {
      const renderGridSpy = jest.spyOn(homeView, 'render');
      await controller.initialize();

      expect(renderGridSpy).toHaveBeenCalledWith(
        homeModel.getSuitesData(),
        expect.any(Function)
      );
    });

    it('handles card clicks and navigates to the correct URL', async () => {
      const routerNavigateSpy = jest.spyOn(
        TestNavigationController.getRouter(),
        'navigate'
      );
      await controller.initialize();

      const cardContainer = document.querySelector('.grid')!;
      const firstCard = cardContainer.querySelector('.card')!;
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      firstCard.dispatchEvent(clickEvent);

      expect(routerNavigateSpy).toHaveBeenCalledWith('/problem/suite%201');
    });
  });
});
