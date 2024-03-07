import { TestNavModel } from '@/navigation/testClasses/TestNavModel';

describe('NavModel', () => {
  let navModel: TestNavModel;

  beforeEach(() => {
    navModel = new TestNavModel();
  });

  afterEach(() => {
    navModel.clearNavHistory();
  });

  describe('pushPageToHistory()', () => {
    it('should push a new page to the navigation history', () => {
      const pageTitle = 'Home';
      const pageUrl = '/';
      navModel.pushPageToHistory(pageTitle, pageUrl);
      expect(navModel.getNavHistory().peek()).toEqual({ pageTitle, pageUrl });
    });
  });

  describe('popCurrentPage()', () => {
    it('should remove the current page from the navigation history', () => {
      const pageTitle1 = 'Home';
      const pageUrl1 = '/';
      const pageTitle2 = 'About';
      const pageUrl2 = '/about';
      navModel.pushPageToHistory(pageTitle1, pageUrl1);
      navModel.pushPageToHistory(pageTitle2, pageUrl2);
      const poppedPage = navModel.popCurrentPage();
      expect(poppedPage).toEqual({ pageTitle: pageTitle2, pageUrl: pageUrl2 });
      expect(navModel.getCurrentPage()?.pageTitle).toBe(pageTitle1);
    });

    it('should return undefined if the navigation history is empty', () => {
      const poppedPage = navModel.popCurrentPage();
      expect(poppedPage).toBeUndefined();
    });
  });

  describe('getCurrentPage()', () => {
    it('should return the current page from the navigation history', () => {
      const pageTitle = 'Home';
      const pageUrl = '/';
      navModel.pushPageToHistory(pageTitle, pageUrl);
      expect(navModel.getCurrentPage()).toEqual({ pageTitle, pageUrl });
    });

    it('should return undefined if the navigation history is empty', () => {
      expect(navModel.getCurrentPage()).toBeUndefined();
    });
  });

  describe('getPrevPage()', () => {
    it('should return the previous page from the navigation history', () => {
      const pageTitle1 = 'Home';
      const pageUrl1 = '/';
      const pageTitle2 = 'About';
      const pageUrl2 = '/about';
      navModel.pushPageToHistory(pageTitle1, pageUrl1);
      navModel.pushPageToHistory(pageTitle2, pageUrl2);
      expect(navModel.getPrevPage()).toEqual({
        pageTitle: pageTitle1,
        pageUrl: pageUrl1,
      });
    });

    it('should return undefined if there is no previous page', () => {
      expect(navModel.getPrevPage()).toBeUndefined();
    });
  });

  describe('hasPrevPage()', () => {
    it('should return true if there is a previous page in the navigation history', () => {
      const pageTitle1 = 'Home';
      const pageUrl1 = '/';
      const pageTitle2 = 'About';
      const pageUrl2 = '/about';
      navModel.pushPageToHistory(pageTitle1, pageUrl1);
      navModel.pushPageToHistory(pageTitle2, pageUrl2);
      expect(navModel.hasPrevPage()).toBe(true);
    });

    it('should return false if there is no previous page in the navigation history', () => {
      expect(navModel.hasPrevPage()).toBe(false);
    });
  });
});
