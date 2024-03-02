import request, { type HTTPMethod } from '@/api/request';
import { BaseView } from '@/base/BaseView';
import { EndpointData } from '@/models/EndpointData';
import { ConversionResult } from '@/models/romanArabicConvert/ConversionResult';
import { ColumnDef, Table } from '@/ui/table';

export class RomanArabicView extends BaseView {
  protected romanArabicSectionTag: HTMLElement;
  protected tableContainer: HTMLDivElement;
  protected table?: Table<ConversionResult>;

  protected tableCols: ColumnDef<ConversionResult>[] = [
    { header: 'Roman Numeral', key: 'romanNumeral' },
    { header: 'Arabic Numeral', key: 'arabicNumeral' },
    { header: 'Found in Cache?', key: 'foundInDB' },
  ];

  constructor() {
    super();
    this.romanArabicSectionTag = document.createElement('section');
    this.romanArabicSectionTag.id = 'roman-arabic-container';
    this.romanArabicSectionTag.classList.add('roman-arabic');

    this.tableContainer = document.createElement('div');
    this.tableContainer.id = 'table-container';
  }

  protected renderImpl(endpointData: EndpointData[]) {
    const pageName = endpointData[0].name;
    const pageDescription = endpointData[0].description;
    const convertEndpoint = endpointData[0].endpoint;
    const flushEndpoint = endpointData[1].endpoint;

    this.resetSectionContainerHTML();

    // Execute render methods in opposite order
    // to place correctly in DOM
    // the render methods `prepend` elements,
    // not `append` or `appendChild` them
    this.renderConversionUI(convertEndpoint, flushEndpoint);
    this.renderHeader(pageName, pageDescription);

    // Append Table Container to Section Container
    this.romanArabicSectionTag.appendChild(this.tableContainer);

    // Append Section Container to DOM
    super.appendContainerToDOM(this.romanArabicSectionTag);

    // Initialize and Render Table
    this.table = new Table({
      containerId: this.tableContainer.id,
      columnDefs: this.tableCols,
    }).initialize([]);
  }

  protected renderHeader(name: string, description: string) {
    const headingContainer = document.createElement('div');
    headingContainer.classList.add('roman-arabic__heading-container');

    const h1Tag = document.createElement('h1');
    h1Tag.textContent = name;
    h1Tag.classList.add('heading', 'roman-arabic__heading');

    const pTag = document.createElement('p');
    pTag.textContent = description;
    pTag.classList.add('paragraph', 'roman-arabic__paragraph');

    headingContainer.appendChild(h1Tag);
    headingContainer.appendChild(pTag);

    this.romanArabicSectionTag.prepend(headingContainer);
  }

  protected renderConversionUI(convertEndpoint: string, flushEndpoint: string) {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('roman-arabic__input-container');

    const labelTag = document.createElement('label');
    labelTag.textContent = 'Enter Roman or Arabic Numeral:';
    labelTag.htmlFor = 'convert-input';
    labelTag.classList.add('roman-arabic__label');

    const inputTag = document.createElement('input');
    inputTag.type = 'text';
    inputTag.id = 'convert-input';
    inputTag.classList.add('input', 'roman-arabic__input');

    const btnsContainer = document.createElement('div');
    btnsContainer.classList.add('roman-arabic__btn-container');

    const convertBtn = this.generateConvertBtn(convertEndpoint, inputTag);
    const flushBtn = this.generateFlushBtn(flushEndpoint);

    btnsContainer.appendChild(convertBtn);
    btnsContainer.appendChild(flushBtn);

    inputContainer.appendChild(labelTag);
    inputContainer.appendChild(inputTag);
    inputContainer.appendChild(btnsContainer);

    this.romanArabicSectionTag.prepend(inputContainer);
  }

  private generateConvertBtn(
    convertEndpoint: string,
    inputTag: HTMLInputElement
  ) {
    const [convertHttpMethod, convertUrl] =
      RomanArabicView.parseEndpoint(convertEndpoint);

    const convertBtnTag = document.createElement('button');
    convertBtnTag.textContent = 'Convert';
    convertBtnTag.classList.add(
      'btn',
      'roman-arabic__btn',
      'roman-arabic__btn--convert'
    );
    convertBtnTag.onclick = async () => {
      const { data } = await request[convertHttpMethod](
        convertUrl.replace('{romanOrArabic}', inputTag.value)
      );
      this.renderResults(data);
    };

    return convertBtnTag;
  }

  private generateFlushBtn(endpoint: string) {
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

      // Reset Table
      this.table?.deleteAllRows();
    };

    return flushBtnTag;
  }

  protected renderResults(data: ConversionResult) {
    console.log('✅DATA RECEIVED: ', data);
    this.table?.addRow(data);
  }

  protected static parseEndpoint(endpoint: string): [HTTPMethod, string] {
    const SPACE = ' ';
    const [method, url] = endpoint.split(SPACE);
    return [method.toLowerCase() as HTTPMethod, url];
  }

  protected resetSectionContainerHTML() {
    this.romanArabicSectionTag.innerHTML = '';
  }
}

export default new RomanArabicView();
