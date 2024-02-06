import request, { type HTTPMethod } from '@/api/request';
import { BaseView } from '@/base/BaseView';
import { EndpointData } from '@/models/EndpointData';

interface ConversionResult {
  romanNumeral: string;
  arabicNumeral: number;
  foundInDB: boolean;
}

export class RomanArabicView extends BaseView {
  protected romanArabicSectionTag: HTMLElement;

  constructor() {
    super();
    this.romanArabicSectionTag = document.createElement('section');
    this.romanArabicSectionTag.id = 'roman-arabic-container';
  }

  protected renderImpl(endpointData: EndpointData[]) {
    const pageName = endpointData[0].name;
    const pageDescription = endpointData[0].description;
    const convertEndpoint = endpointData[0].endpoint;
    const flushEndpoint = endpointData[1].endpoint;

    this.renderHeader(pageName, pageDescription);
    this.renderConvertUI(convertEndpoint);
    this.renderFlushUI(flushEndpoint);

    super.appendContainerToDOM(this.romanArabicSectionTag);
  }

  private renderHeader(name: string, description: string) {
    const h1Tag = document.createElement('h1');
    h1Tag.textContent = name;
    h1Tag.classList.add('heading', 'roman-arabic__heading');

    const pTag = document.createElement('p');
    pTag.textContent = description;
    pTag.classList.add('paragraph', 'roman-arabic__paragraph');

    this.romanArabicSectionTag.appendChild(h1Tag);
    this.romanArabicSectionTag.appendChild(pTag);
  }

  private renderConvertUI(endpoint: string) {
    const [httpMethod, url] = RomanArabicView.parseEndpoint(endpoint);

    const inputContainer = document.createElement('div');

    const labelTag = document.createElement('label');
    labelTag.textContent = 'Enter Roman or Arabic Numeral:';
    labelTag.htmlFor = 'convert-input';
    labelTag.classList.add('arabic-convert__label');

    const inputTag = document.createElement('input');
    inputTag.type = 'text';
    inputTag.id = 'convert-input';
    inputTag.classList.add('input', 'roman-arabic__input');

    const convertBtnTag = document.createElement('button');
    convertBtnTag.textContent = 'Convert';
    convertBtnTag.classList.add(
      'btn',
      'roman-arabic__btn',
      'roman-arabic__btn--convert'
    );
    convertBtnTag.onclick = async () => {
      const { data } = await request[httpMethod](
        url.replace('{romanOrArabic}', inputTag.value)
      );
      this.renderResults(data);
    };

    inputContainer.appendChild(labelTag);
    inputContainer.appendChild(inputTag);
    inputContainer.appendChild(convertBtnTag);

    this.romanArabicSectionTag.appendChild(inputContainer);
  }

  private renderFlushUI(endpoint: string) {
    const [method, url] = RomanArabicView.parseEndpoint(endpoint);

    const flushBtnTag = document.createElement('button');
    flushBtnTag.textContent = 'Flush Cache';
    flushBtnTag.classList.add(
      'btn',
      'roman-arabic__btn',
      'roman-arabic__btn--flush-cache'
    );
    flushBtnTag.onclick = async () => {
      await request[method](url);
      console.log('🗑️ Cache Flushed');
    };

    this.romanArabicSectionTag.appendChild(flushBtnTag);
  }

  protected renderResults(data: ConversionResult) {
    console.log('✅DATA RECEIVED: ', data);

    // Render table of results
  }

  private static parseEndpoint(endpoint: string): [HTTPMethod, string] {
    const SPACE = ' ';
    const [method, url] = endpoint.split(SPACE);
    return [method.toLowerCase() as HTTPMethod, url];
  }
}

export default new RomanArabicView();
