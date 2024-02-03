import { type NavigateToUrlFn } from '@/navigation/NavigationController';
import { SuiteData } from '@/models/SuiteData';
import { BaseView } from '@/base/BaseView';

export class HomeView extends BaseView {
  protected container: HTMLElement;

  constructor() {
    super();
    this.container = document.createElement('section');
    this.container.id = 'problems';
  }

  protected renderImpl(suites: SuiteData[], navigateToUrlFn: NavigateToUrlFn) {
    this.clearContainer();
    this.renderGrid(suites, navigateToUrlFn);
    this.appendContainerToDOM();
  }

  protected clearContainer() {
    this.container.innerHTML = '';
  }

  private renderGrid(suites: SuiteData[], navigateToUrlFn: NavigateToUrlFn) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('grid');

    suites.forEach((suite) => {
      const card = document.createElement('section');
      card.setAttribute('data-test', 'problem-card');
      card.classList.add('card');
      card.innerHTML = `
                <h2 class="card__name">${suite.name}</h2>
                <p class="card__description">${suite.longDescription}</p>
            `;
      cardContainer.appendChild(card);
    });

    HomeView.addCardClickHandler(cardContainer, navigateToUrlFn);

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
    BaseView.rootElement.appendChild(this.container);
  }
}

export default new HomeView();
