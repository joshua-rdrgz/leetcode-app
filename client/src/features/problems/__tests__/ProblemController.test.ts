import { TestNavigationController } from '@/features/navigation/tests/TestNavigationController';
import { ProblemController } from '@/features/problems/ProblemController';
import { TestProblemModel } from '@/features/problems/tests/TestProblemModel';
import { TestProblemView } from '@/features/problems/tests/TestProblemView';

jest.mock('@/api/request', () => ({
  get: jest.fn().mockResolvedValue({
    data: [
      { name: 'Two Sum', description: 'Problem description' },
      { name: 'Add Two Numbers', description: 'Another problem description' },
    ],
  }),
}));

describe('ProblemController', () => {
  let controller: ProblemController;
  let container: HTMLDivElement;

  const problemModel = new TestProblemModel();
  const problemView = new TestProblemView();

  beforeEach(() => {
    jest.clearAllMocks();

    controller = new ProblemController(problemModel, problemView);

    container = document.createElement('div');
    container.id = 'problems';
    document.body.appendChild(container);
    problemView.setContainer(container);
  });

  afterEach(() => {
    problemModel.clearData();
    problemView.clearContainer();
  });

  describe('initialize()', () => {
    it('fetches problems and updates the model', async () => {
      await controller.initialize();

      expect(problemModel.getData()).toEqual([
        { name: 'Two Sum', description: 'Problem description' },
        { name: 'Add Two Numbers', description: 'Another problem description' },
      ]);
    });

    it('renders the card grid with fetched problems', async () => {
      const renderGridSpy = jest.spyOn(problemView, 'renderGrid');
      await controller.initialize();

      expect(renderGridSpy).toHaveBeenCalledWith(
        problemModel.getData(),
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

      expect(routerNavigateSpy).toHaveBeenCalledWith('/problem/two%20sum');
    });

    it('handles errors during problem fetching', async () => {
      jest
        .mocked(require('@/api/request').get)
        .mockRejectedValueOnce(new Error('API Error'));

      await expect(controller.initialize()).rejects.toThrow('API Error');

      // TODO: Check if appropriate failure message is shown in the view
    });
  });
});
