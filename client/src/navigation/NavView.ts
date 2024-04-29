import { NavEntry } from './NavModel';

type ClickHandler = (this: HTMLButtonElement, ev: MouseEvent) => any;

export class NavView {
  protected navContainer = document.getElementById('nav')!;

  public render({
    canRenderHomeBtn,
    onHomeBtnClick,
    canRenderPrevBtn,
    onPrevBtnClick,
    getCurrentPage,
  }: {
    canRenderHomeBtn(): boolean;
    onHomeBtnClick: ClickHandler;
    canRenderPrevBtn(): boolean;
    onPrevBtnClick: ClickHandler;
    getCurrentPage(): NavEntry | undefined;
  }) {
    this.clearNavigation();

    const currentPage = getCurrentPage();

    const pTag = document.createElement('p');
    pTag.textContent = currentPage ? currentPage.pageTitle : 'Page';
    pTag.classList.add('navbar__heading');
    this.navContainer.appendChild(pTag);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('navbar__btn-container');

    if (canRenderPrevBtn()) {
      const prevBtn = this.generateBtn('Back', onPrevBtnClick, 'back-button');
      prevBtn.classList.add('btn', 'navbar__btn');
      btnContainer.appendChild(prevBtn);
    }

    if (canRenderHomeBtn()) {
      const homeBtn = this.generateBtn('Home', onHomeBtnClick, 'home-button');
      homeBtn.classList.add('btn', 'navbar__btn');
      btnContainer.appendChild(homeBtn);
    }

    this.navContainer.appendChild(btnContainer);
  }

  private generateBtn(
    textContent: string,
    onClickFn: (this: HTMLButtonElement, ev: MouseEvent) => any,
    testId: string
  ) {
    const btn = document.createElement('button');
    btn.textContent = textContent;
    btn.setAttribute('data-test', testId);
    btn.addEventListener('click', onClickFn);

    return btn;
  }

  private clearNavigation() {
    this.navContainer.innerHTML = '';
  }
}

export default new NavView();
