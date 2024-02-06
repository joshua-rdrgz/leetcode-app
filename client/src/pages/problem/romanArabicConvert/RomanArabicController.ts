import { BaseController } from '@/base/BaseController';
import { SuiteData } from '@/models/SuiteData';
import { RomanArabicModel } from './RomanArabicModel';
import { RomanArabicView } from './RomanArabicView';

export class RomanArabicController extends BaseController {
  protected model: RomanArabicModel;
  protected view: RomanArabicView;

  constructor(model: RomanArabicModel, view: RomanArabicView) {
    super();
    this.model = model;
    this.view = view;
  }

  async initialize(suiteData: SuiteData) {
    const endpoints = await this.model.getEndpoints(suiteData);
    this.view.render(endpoints);
  }
}
