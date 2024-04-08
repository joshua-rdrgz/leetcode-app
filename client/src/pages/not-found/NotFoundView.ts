import { BaseView } from '@/base/BaseView';

export class NotFoundView extends BaseView {
  protected renderImpl(attemptedUrl: string): void {
    const container = document.createElement('div');
    container.classList.add('not-found');
    container.innerHTML = `
      <h1 class="heading">The page ${
        attemptedUrl ? `/${attemptedUrl}` : ''
      } could not be found.</h1>
      <p class="paragraph">Please visit the <a href="/" data-navigo>home page</a> to see available pages.</p>
    `;
    this.appendContainerToDOM(container);
  }
}
