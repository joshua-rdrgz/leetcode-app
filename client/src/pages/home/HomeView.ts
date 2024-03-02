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
    super.appendContainerToDOM(this.container);
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

      const h2Tag = document.createElement('h2');
      h2Tag.classList.add('heading', 'card__name');
      h2Tag.textContent = suite.name;
      card.appendChild(h2Tag);

      const pTag = document.createElement('p');
      pTag.classList.add('paragraph', 'card__description');
      pTag.textContent = suite.longDescription;
      card.appendChild(pTag);

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
}

export default new HomeView();
