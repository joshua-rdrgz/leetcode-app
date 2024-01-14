export abstract class BaseView {
  protected rootElement: HTMLElement;

  constructor() {
    this.rootElement = document.getElementById('root')!; // defined in `index.html`
  }

  render(...args: any[]) {
    this.clearDOM();
    this.renderImpl(...args);
  }

  protected abstract renderImpl(...args: any[]): void;

  protected clearDOM() {
    this.rootElement.innerHTML = '';
  }
}
