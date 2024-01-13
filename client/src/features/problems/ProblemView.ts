import { type NavigateToProblemFn } from '@/features/navigation/NavigationController';
import { ProblemData } from './ProblemData';

export class ProblemView {
  protected container: HTMLElement;

  constructor() {
    this.container = document.getElementById('problems')!;
  }

  renderGrid(
    problems: ProblemData[],
    navigateToProblemFn: NavigateToProblemFn
  ) {
    this.container.innerHTML = '';

    const cardContainer = document.createElement('section');
    cardContainer.classList.add('grid');

    problems.forEach((problem) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
                <h2 class="card__name">${problem.name}</h2>
                <p class="card__description">${problem.description}</p>
            `;
      cardContainer.appendChild(card);
    });

    ProblemView.addCardClickHandler(cardContainer, navigateToProblemFn);

    this.container.appendChild(cardContainer);
  }

  private static addCardClickHandler(
    cardContainer: HTMLElement,
    navigateToProblemFn: NavigateToProblemFn
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

        navigateToProblemFn(cardName);
      }
    });
  }
}

export default new ProblemView();
