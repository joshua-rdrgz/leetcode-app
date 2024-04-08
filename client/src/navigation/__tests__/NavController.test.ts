import { TestBaseView } from '@/base/testClasses/TestBaseView';
import { testNavigation } from '@/navigation';
import { TestNavController } from '@/navigation/testClasses/TestNavController';
import { NavEntry } from '@/navigation/NavModel';
import { Match } from 'navigo';

describe('NavController', () => {
  let navController: TestNavController;

  beforeEach(() => {
    // Setup downstream dependencies
    TestBaseView.setupTestDOM();
    testNavigation.setupNavDOM();

    // initialize navController
    navController = testNavigation.initialize();
  });

  afterEach(() => {
    // Teardown downstream dependencies
    TestBaseView.teardownTestDOM();
    navController.teardownNavDOM();
    navController.clearNavHistory();

    jest.clearAllMocks();
  });

  describe('navigateToUrl()', () => {
    it('should navigate to the specified URL', () => {
      const url = '/problem/123';
      navController.navigateToUrl(url);
      expect(navController.getModel().getCurrentPage()?.pageUrl).toBe(url);
    });
  });

  describe('getCurrAndPrevPages()', () => {
    it('should return the current and previous pages', () => {
      const page1: NavEntry = { pageTitle: 'Home', pageUrl: '/' };
      const page2: NavEntry = {
        pageTitle: 'Solve Page',
        pageUrl: '/problem/123',
      };
      navController
        .getModel()
        .pushPageToHistory(page1.pageTitle, page1.pageUrl);
      navController
        .getModel()
        .pushPageToHistory(page2.pageTitle, page2.pageUrl);

      const { currPage, prevPage } = navController.getCurrAndPrevPages();
      expect(currPage).toEqual(page2);
      expect(prevPage).toEqual(page1);
    });
  });

  describe('handleAfterHook()', () => {
    it('should handle the after hook and update the model and view', () => {
      const match = {
        url: 'problem/123', // Navigo Match comes without leading '/'
        route: { name: 'Solve Page' },
      } as Match;
      const renderSpy = jest.spyOn(navController.getView(), 'render');
      navController.getHandleAfterHook()(match);

      expect(navController.getModel().getCurrentPage()).toEqual({
        pageTitle: 'Solve Page',
        pageUrl: '/problem/123',
      });
      expect(renderSpy).toHaveBeenCalledWith({
        canRenderHomeBtn: expect.any(Function),
        onHomeBtnClick: expect.any(Function),
        canRenderPrevBtn: expect.any(Function),
        onPrevBtnClick: expect.any(Function),
        getCurrentPage: expect.any(Function),
      });
    });
  });

  describe('canRenderHomeBtn()', () => {
    it('should determine if the home button can be rendered', () => {
      navController.getModel().pushPageToHistory('Home', '/');
      expect(navController.getCanRenderHomeBtn()()).toBe(false);

      navController.getModel().pushPageToHistory('Solve Page', '/problem/123');
      expect(navController.getCanRenderHomeBtn()()).toBe(true);
    });
  });

  describe('onHomeBtnClick()', () => {
    it('should navigate to the home URL when the home button is clicked', () => {
      navController.getModel().pushPageToHistory('Solve Page', '/problem/123');
      navController.getOnHomeBtnClick()();
      expect(navController.getModel().getCurrentPage()?.pageUrl).toBe('/');
    });
  });

  describe('canRenderPrevBtn()', () => {
    it('should determine if the previous button can be rendered', () => {
      expect(navController.getCanRenderPrevBtn()()).toBe(false);

      navController.getModel().pushPageToHistory('Home', '/');
      navController.getModel().pushPageToHistory('Solve Page', '/problem/123');
      expect(navController.getCanRenderPrevBtn()()).toBe(true);
    });
  });

  describe('onPrevBtnClick()', () => {
    it('should navigate to the previous page when the previous button is clicked', () => {
      navController.getModel().pushPageToHistory('Home', '/');
      navController.getModel().pushPageToHistory('Solve Page', '/problem/123');
      navController.getOnPrevBtnClick()();
      expect(navController.getModel().getCurrentPage()?.pageUrl).toBe('/');
    });

    it('should not navigate to the previous page when there is no previous page', () => {
      navController.getOnPrevBtnClick()();
      expect(navController.getModel().getCurrentPage()).toBeUndefined();
    });
  });
});
