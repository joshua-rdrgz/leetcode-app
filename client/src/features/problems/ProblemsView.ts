import { type NavigateToUrlFn } from '@/navigation/NavigationController';
import { ProblemData } from './ProblemData';
import { BaseView } from '@/base/BaseView';

export class ProblemsView extends BaseView {
  protected container: HTMLElement;

  constructor() {
    super();
    this.container = document.createElement('section');
    this.container.id = 'problems';
  }

  protected renderImpl(
    problems: ProblemData[],
    navigateToUrlFn: NavigateToUrlFn
  ) {
    this.clearContainer();
    this.renderGrid(problems, navigateToUrlFn);
    this.appendContainerToDOM();
  }

  protected clearContainer() {
    this.container.innerHTML = '';
  }

  private renderGrid(
    problems: ProblemData[],
    navigateToUrlFn: NavigateToUrlFn
  ) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('grid');

    problems.forEach((problem) => {
      const card = document.createElement('div');
      card.setAttribute('data-test', 'problem-card');
      card.classList.add('card');
      card.innerHTML = `
                <h2 class="card__name">${problem.name}</h2>
                <p class="card__description">${problem.description}</p>
            `;
      cardContainer.appendChild(card);
    });

    ProblemsView.addCardClickHandler(cardContainer, navigateToUrlFn);

    this.container.appendChild(cardContainer);
  }

  private static addCardClickHandler(
    cardContainer: HTMLElement,
    navigateToUrlFn: NavigateToUrlFn
  ) {
    cardContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const card = target.closest('.card');
      if (card) {
        const cardName = card
          .querySelector('h2')
          ?.textContent?.trim()
          ?.toLowerCase();

        if (!cardName)
          throw new Error('Card must have a name to navigate to it.');

        navigateToUrlFn(cardName);
      }
    });
  }

  private appendContainerToDOM() {
    this.rootElement.appendChild(this.container);
  }
}

export default new ProblemsView();
