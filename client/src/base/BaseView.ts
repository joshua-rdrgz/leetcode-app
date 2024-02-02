export abstract class BaseView {
  protected static rootElement = document.getElementById('root')!;

  render(...args: any[]) {
    BaseView.clearDOM();
    this.renderImpl(...args);
  }

  protected abstract renderImpl(...args: any[]): void;

  protected static clearDOM() {
    BaseView.rootElement.innerHTML = '';
  }
}
