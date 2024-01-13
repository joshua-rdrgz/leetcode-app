import { ProblemView } from '../ProblemView';

export class TestProblemView extends ProblemView {
  clearContainer() {
    this.container.innerHTML = '';
  }

  setContainer(container: HTMLElement) {
    this.container = container;
  }
}
