import { RomanArabicView } from '../RomanArabicView';

export class TestRomanArabicView extends RomanArabicView {
  public get RomanArabicSectionTag() {
    return this.romanArabicSectionTag;
  }

  public setRomanArabicSectionTag(newContent: HTMLElement) {
    this.romanArabicSectionTag = newContent;
  }

  public get Table() {
    return this.table;
  }

  public get RenderResults() {
    return this.renderResults;
  }

  public get ParseEndpoint() {
    return RomanArabicView.parseEndpoint;
  }

  public get ResetSectionContainerHTML() {
    return this.resetSectionContainerHTML;
  }
}
