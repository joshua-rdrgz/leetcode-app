import { SuiteData } from '@/models/SuiteData';
import { TestHomeView } from '../testClasses/TestHomeView';
import { NavigateToUrlFn } from '@/navigation/NavigationController';
import { TestBaseView } from '@/base/testClasses/TestBaseView';

describe('HomeView', () => {
  let container: HTMLElement;
  let navigateToUrlFn: jest.MockedFunction<NavigateToUrlFn>;

  const homeView = new TestHomeView();

  beforeEach(() => {
    TestBaseView.setupTestDOM();

    container = document.createElement('section');
    container.id = 'problems';

    homeView.setContainer(container);

    navigateToUrlFn = jest.fn();
  });

  afterEach(() => {
    TestBaseView.teardownTestDOM();
    homeView.clearContainer(); // Clean up
  });

  describe('render()', () => {
    it('should clear the container before rendering', () => {
      container.innerHTML = '<p>Existing content</p>';

      homeView.render([], navigateToUrlFn);

      expect(container.innerHTML).toBe('<div class="grid"></div>');
    });

    it('should render a grid with cards for each suite provided', () => {
      const testSuites: SuiteData[] = [
        {
          name: 'Suite 1',
          shortDescription: '',
          longDescription: 'Desc 1',
          endpoint: '',
        },
        {
          name: 'Suite 2',
          shortDescription: '',
          longDescription: 'Desc 2',
          endpoint: '',
        },
      ];
      const navigateToUrlFn = jest.fn();

      homeView.render(testSuites, navigateToUrlFn);

      const grid = container.querySelector('.grid');
      expect(grid).not.toBeNull();

      const cards = container.querySelectorAll('.card');
      expect(cards.length).toBe(testSuites.length);

      expect(cards[0].querySelector('.card__name')!.textContent).toBe(
        'Suite 1'
      );
    });
  });

  describe('addCardClickHandler', () => {
    it('calls navigate function when card clicked', () => {
      const suite: SuiteData = {
        name: 'Test Problem',
        shortDescription: 'Short description',
        longDescription: 'Long description',
        endpoint: 'test',
      };

      homeView.render([suite], navigateToUrlFn);

      const card = container.querySelector('.card')!;
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      card.dispatchEvent(clickEvent);

      expect(navigateToUrlFn).toHaveBeenCalledWith('test problem');
    });
  });
});
