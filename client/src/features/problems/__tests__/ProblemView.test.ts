import { NavigateToProblemFn } from '@/features/navigation/NavigationController';
import problemView from '../ProblemView';

describe('ProblemView', () => {
  let container: HTMLElement;
  let navigateToProblemFn: jest.MockedFunction<NavigateToProblemFn>;

  beforeEach(() => {
    // 1. Create Container
    container = document.createElement('div');
    container.id = 'problems';

    // 2. Assign Container to document/problemView
    document.body.appendChild(container);
    problemView.container = container;

    // 3. Mock navigateToProblemFn
    navigateToProblemFn = jest.fn();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('renderGrid', () => {
    it('clears existing container children', () => {
      container.innerHTML = '<p>Existing content</p>';

      problemView.renderGrid([], navigateToProblemFn);

      expect(container.innerHTML).toBe('<section class="grid"></section>');
    });

    it('creates card container element', () => {
      problemView.renderGrid([], navigateToProblemFn);

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

      problemView.renderGrid(problems, navigateToProblemFn);

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

      problemView.renderGrid([problem], navigateToProblemFn);

      const card = container.querySelector('.card')!;
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      card.dispatchEvent(clickEvent);

      expect(navigateToProblemFn).toHaveBeenCalledWith('test problem');
    });
  });
});
