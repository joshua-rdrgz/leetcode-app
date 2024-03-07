import { NavView } from '../NavView';

export class TestNavView extends NavView {
  setupNavDOM() {
    this.navContainer = document.createElement('nav');
    this.navContainer.id = 'navbar';
    document.body.appendChild(this.navContainer);
  }

  teardownNavDOM() {
    document.body.removeChild(this.navContainer);
  }

  getNavContainer() {
    return this.navContainer;
  }
}
