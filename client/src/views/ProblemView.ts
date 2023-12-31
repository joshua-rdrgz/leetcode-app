import { ProblemData } from '@/models/problems/ProblemData';
import { type ProblemController } from '@/controllers/ProblemController';

type CardNavigatorFn = ReturnType<ProblemController['navigateToPage']>;

export class ProblemView {
  container: HTMLElement;

  constructor() {
    this.container = document.getElementById('problems')!;
  }

  renderGrid(problems: ProblemData[], cardNavigatorFn: CardNavigatorFn) {
    this.container.innerHTML = '';

    const cardContainer = document.createElement('section');
    cardContainer.classList.add('grid');

    problems.forEach((problem) => {
      // 1. Create Card
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
                <h2 class="card__name">${problem.name}</h2>
                <p class="card__description">${problem.description}</p>
            `;

      // 2. Add Card Event Listener
      ProblemView.#addCardClickHandler(card, cardNavigatorFn);

      // 3. Add to container
      cardContainer.appendChild(card);
    });

    this.container.appendChild(cardContainer);
  }

  static #addCardClickHandler(
    card: HTMLDivElement,
    cardNavigatorFn: CardNavigatorFn
  ) {
    card.addEventListener('click', (e) => {
      const target = e.target as HTMLDivElement;
      const cardName = target
        .querySelector('h2')!
        .textContent!.trim()!
        .toLowerCase();

      if (cardName) {
        cardNavigatorFn(cardName);
      }
    });
  }
}

export default new ProblemView();
