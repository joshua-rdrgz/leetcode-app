import { NavigateToUrlFn } from '@/navigation/NavigationController';
import { TestProblemView } from '../tests/TestProblemsView';

describe('ProblemView', () => {
  let container: HTMLElement;
  let navigateToUrlFn: jest.MockedFunction<NavigateToUrlFn>;

  const problemView = new TestProblemView();

  beforeEach(() => {
    // 1. Create Container
    container = document.createElement('div');
    container.id = 'problems';

    // 2. Assign Container to document/problemView
    document.body.appendChild(container);
    problemView.setContainer(container);

    // 3. Mock navigateToUrlFn
    navigateToUrlFn = jest.fn();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('render', () => {
    it('clears existing container children', () => {
      container.innerHTML = '<p>Existing content</p>';

      problemView.render([], navigateToUrlFn);

      expect(container.innerHTML).toBe('<section class="grid"></section>');
    });

    it('creates card container element', () => {
      problemView.render([], navigateToUrlFn);

      expect(container.querySelector('.grid')).not.toBeNull();
    });

    it('creates card element for each problem', () => {
      const problems = [
        {
          name: 'Problem 1',
          description: 'Desc 1',
          endpoint: '/api/v1/problem-1',
        },
        {
          name: 'Problem 2',
          description: 'Desc 2',
          endpoint: '/api/v1/problem-2',
        },
      ];

      problemView.render(problems, navigateToUrlFn);

      const cards = container.querySelectorAll('.card');
      expect(cards.length).toBe(2);
      expect(cards[0].querySelector('.card__name')!.textContent).toBe(
        'Problem 1'
      );
    });
  });

  describe('addCardClickHandler', () => {
    it('calls navigate function when card clicked', () => {
      const problem = {
        name: 'Test Problem',
        description: 'Test description',
        endpoint: 'test',
      };

      problemView.render([problem], navigateToUrlFn);

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
