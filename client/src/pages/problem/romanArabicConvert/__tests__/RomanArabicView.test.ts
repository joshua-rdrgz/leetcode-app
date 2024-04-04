import { TestBaseView } from '@/base/testClasses/TestBaseView';
import { EndpointData } from '@/models/EndpointData';
import { ConversionResult } from '@/models/romanArabicConvert/ConversionResult';
import { TestRomanArabicView } from '@/pages/problem/romanArabicConvert/__test-helpers__/TestRomanArabicView';
import { Toast } from '@/ui/toast';

function setToastContainer(container: HTMLElement) {
  (Toast as any).container = container;
}

const endpointData: EndpointData[] = [
  {
    name: 'Roman Numeral Conversion Endpoint',
    description: 'Conversion Description',
    endpoint: 'POST /convert',
  },
  {
    name: 'Flush Cache Endpoint',
    description: 'Flush Description',
    endpoint: 'DELETE /flush',
  },
];

describe('RomanArabicView', () => {
  let view: TestRomanArabicView;
  let toastContainer: HTMLDivElement;

  beforeEach(() => {
    TestBaseView.setupTestDOM();

    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
    setToastContainer(toastContainer);

    view = new TestRomanArabicView();
  });

  afterEach(() => {
    TestBaseView.teardownTestDOM();
    document.body.removeChild(toastContainer);

    jest.restoreAllMocks();
  });

  describe('renderImpl()', () => {
    it('should clear any existing elements before rendering content', () => {
      const existingContent = document.createElement('div');
      existingContent.textContent = 'Existing Content';

      view.setRomanArabicSectionTag(existingContent);

      view.render(endpointData, jest.fn(), jest.fn());

      expect(view.RomanArabicSectionTag).not.toContain(existingContent);
    });
  });

  describe('renderHeader()', () => {
    it('should render the appropriate heading given container', () => {
      view.render(endpointData, jest.fn(), jest.fn());

      const h1Tag = view.RomanArabicSectionTag.querySelector(
        '.roman-arabic__heading'
      );
      const pTag = view.RomanArabicSectionTag.querySelector(
        '.roman-arabic__paragraph'
      );

      expect(h1Tag?.textContent).toMatch(/Conversion/i);
      expect(pTag?.textContent).toMatch(/Conversion/i);
    });
  });

  describe('renderConversionUI()', () => {
    it('should contain the input for users to type a conversion metric', () => {
      view.render(endpointData, jest.fn(), jest.fn());

      const input = view.RomanArabicSectionTag.querySelector(
        '.roman-arabic__input'
      );
      const label = view.RomanArabicSectionTag.querySelector(
        '.roman-arabic__label'
      );

      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
    });
  });

  describe('generateConvertBtn()', () => {
    it('contain the button for converting the input', () => {
      view.render(endpointData, jest.fn(), jest.fn());

      const convertBtn = view.RomanArabicSectionTag.querySelector(
        '.roman-arabic__btn--convert'
      );

      expect(convertBtn).toBeTruthy();
    });

    it("assign the appropriate render parameter to the button's onclick property", () => {
      const onConvert = jest.fn().mockReturnValue({
        romanNumeral: 'I',
        arabicNumeral: 1,
        foundInDB: false,
      });

      view.render(endpointData, onConvert, jest.fn());

      const convertBtn = view.RomanArabicSectionTag.querySelector(
        '.roman-arabic__btn--convert'
      );

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      convertBtn?.dispatchEvent(clickEvent);

      expect(onConvert).toHaveBeenCalled();
    });
  });

  describe('generateFlushBtn()', () => {
    it('contain the button for flushing the cache', () => {
      view.render(endpointData, jest.fn(), jest.fn());

      const convertBtn = view.RomanArabicSectionTag.querySelector(
        '.roman-arabic__btn--flush-cache'
      );

      expect(convertBtn).toBeTruthy();
    });

    it("assign the appropriate render parameter to the button's onclick property", () => {
      const onFlush = jest.fn();

      view.render(endpointData, jest.fn(), onFlush);

      const flushBtn = view.RomanArabicSectionTag.querySelector(
        '.roman-arabic__btn--flush-cache'
      );

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      flushBtn?.dispatchEvent(clickEvent);

      expect(onFlush).toHaveBeenCalled();
    });
  });

  describe('renderResults()', () => {
    it("should call the table's addRow method", () => {
      view.render(endpointData, jest.fn(), jest.fn());

      const addRowSpy = jest.spyOn(view.Table!, 'addRow');

      const data: ConversionResult = {
        romanNumeral: 'I',
        arabicNumeral: 1,
        foundInDB: false,
      };

      view.RenderResults(data);

      expect(addRowSpy).toHaveBeenCalled();
    });
  });

  describe('parseEndpoint()', () => {
    it('should accurately split an endpoint into its method and url', () => {
      const originalMethod = 'GET';
      const originalUrl = '/testing/endpoint';
      const endpoint = `${originalMethod} ${originalUrl}`;

      const [method, url] = view.ParseEndpoint(endpoint);

      expect(method).toEqual(originalMethod.toLowerCase());
      expect(url).toBe(originalUrl);
    });
  });

  describe('resetSectionContainerHTML()', () => {
    it('should clear any existing elements on container', () => {
      const existingContent = document.createElement('div');
      existingContent.textContent = 'Existing Content';

      view.setRomanArabicSectionTag(existingContent);

      view.ResetSectionContainerHTML();

      expect(view.RomanArabicSectionTag.innerHTML).toEqual('');
    });
  });
});
