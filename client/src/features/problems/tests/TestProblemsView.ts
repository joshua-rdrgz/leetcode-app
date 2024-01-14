import { ProblemsView } from '../ProblemsView';

export class TestProblemView extends ProblemsView {
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
