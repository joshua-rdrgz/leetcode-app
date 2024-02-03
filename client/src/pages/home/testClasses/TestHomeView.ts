import { HomeView } from '../HomeView';

export class TestHomeView extends HomeView {
  constructor() {
    super();
  }

  setContainer(container: HTMLElement) {
    this.container = container;
  }

  clearContainer() {
    super.clearContainer();
  }
}
