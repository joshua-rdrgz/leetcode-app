import { TestBaseView } from '@/base/testClasses/TestBaseView';
import { TestNavView } from '@/navigation/testClasses/TestNavView';
import { NavEntry } from '@/navigation/NavModel';

describe('NavView', () => {
  let navView: TestNavView;

  beforeEach(() => {
    // Setup downstream dependencies
    TestBaseView.setupTestDOM();

    // Initialize navView
    navView = new TestNavView();
    navView.setupNavDOM();
  });

  afterEach(() => {
    // Teardown downstream dependencies
    TestBaseView.teardownTestDOM();
    navView.teardownNavDOM();
  });

  describe('render()', () => {
    it('should render the navigation with the current page title', () => {
      const currentPage: NavEntry = { pageTitle: 'Home', pageUrl: '/' };
      navView.render({
        canRenderHomeBtn: () => false,
        onHomeBtnClick: () => {},
        canRenderPrevBtn: () => false,
        onPrevBtnClick: () => {},
        getCurrentPage: () => currentPage,
      });
      const navHeading = document.querySelector('.navbar__heading');
      expect(navHeading?.textContent).toBe(currentPage.pageTitle);
    });

    it('should render the home button when canRenderHomeBtn returns true', () => {
      navView.render({
        canRenderHomeBtn: () => true,
        onHomeBtnClick: () => {},
        canRenderPrevBtn: () => false,
        onPrevBtnClick: () => {},
        getCurrentPage: () => ({ pageTitle: 'About', pageUrl: '/about' }),
      });
      const homeBtn = document.querySelector(
        '.navbar__btn-container button:nth-child(1)'
      );
      expect(homeBtn?.textContent).toBe('Home');
    });

    it('should not render the home button when canRenderHomeBtn returns false', () => {
      navView.render({
        canRenderHomeBtn: () => false,
        onHomeBtnClick: () => {},
        canRenderPrevBtn: () => false,
        onPrevBtnClick: () => {},
        getCurrentPage: () => ({ pageTitle: 'Home', pageUrl: '/' }),
      });
      const homeBtn = document.querySelector(
        '.navbar__btn-container button:nth-child(1)'
      );
      expect(homeBtn).toBeNull();
    });

    it('should render the previous button when canRenderPrevBtn returns true', () => {
      navView.render({
        canRenderHomeBtn: () => false,
        onHomeBtnClick: () => {},
        canRenderPrevBtn: () => true,
        onPrevBtnClick: () => {},
        getCurrentPage: () => ({ pageTitle: 'About', pageUrl: '/about' }),
      });
      const prevBtn = document.querySelector(
        '.navbar__btn-container button:nth-child(1)'
      );
      expect(prevBtn?.textContent).toBe('Back');
    });

    it('should not render the previous button when canRenderPrevBtn returns false', () => {
      navView.render({
        canRenderHomeBtn: () => false,
        onHomeBtnClick: () => {},
        canRenderPrevBtn: () => false,
        onPrevBtnClick: () => {},
        getCurrentPage: () => ({ pageTitle: 'Home', pageUrl: '/' }),
      });
      const prevBtn = document.querySelector(
        '.navbar__btn-container button:nth-child(1)'
      );
      expect(prevBtn).toBeNull();
    });

    it('should not render any buttons when both canRenderHomeBtn and canRenderPrevBtn return false', () => {
      navView.render({
        canRenderHomeBtn: () => false,
        onHomeBtnClick: () => {},
        canRenderPrevBtn: () => false,
        onPrevBtnClick: () => {},
        getCurrentPage: () => ({ pageTitle: 'Home', pageUrl: '/' }),
      });
      const buttons = document.querySelectorAll(
        '.navbar__btn-container button'
      );
      expect(buttons.length).toBe(0);
    });

    it('should render both home and previous buttons when both canRenderHomeBtn and canRenderPrevBtn return true', () => {
      navView.render({
        canRenderHomeBtn: () => true,
        onHomeBtnClick: () => {},
        canRenderPrevBtn: () => true,
        onPrevBtnClick: () => {},
        getCurrentPage: () => ({ pageTitle: 'About', pageUrl: '/about' }),
      });
      const buttons = document.querySelectorAll(
        '.navbar__btn-container button'
      );
      expect(buttons.length).toBe(2);
      expect(buttons[0].textContent).toBe('Back');
      expect(buttons[1].textContent).toBe('Home');
    });

    it('should assign the onHomeBtnClick handler to the home button', () => {
      const onHomeBtnClickMock = jest.fn();
      navView.render({
        canRenderHomeBtn: () => true,
        onHomeBtnClick: onHomeBtnClickMock,
        canRenderPrevBtn: () => false,
        onPrevBtnClick: () => {},
        getCurrentPage: () => ({ pageTitle: 'About', pageUrl: '/about' }),
      });
      const homeBtn = document.querySelector(
        '.navbar__btn-container button:nth-child(1)'
      );
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      homeBtn?.dispatchEvent(event);
      expect(onHomeBtnClickMock).toHaveBeenCalledTimes(1);
    });

    it('should assign the onPrevBtnClick handler to the previous button', () => {
      const onPrevBtnClickMock = jest.fn();
      navView.render({
        canRenderHomeBtn: () => false,
        onHomeBtnClick: () => {},
        canRenderPrevBtn: () => true,
        onPrevBtnClick: onPrevBtnClickMock,
        getCurrentPage: () => ({ pageTitle: 'About', pageUrl: '/about' }),
      });
      const prevBtn = document.querySelector(
        '.navbar__btn-container button:nth-child(1)'
      );
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      prevBtn?.dispatchEvent(event);
      expect(onPrevBtnClickMock).toHaveBeenCalledTimes(1);
    });
  });
});
