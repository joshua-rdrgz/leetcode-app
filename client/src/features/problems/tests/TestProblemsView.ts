import { ProblemView } from '../ProblemView';

export class TestProblemView extends ProblemView {
  constructor() {
    super();
  }

  setContainer(container: HTMLElement) {
    this.container = container;
  }

  clearContainerTest() {
    super.clearContainer();
  }
}
