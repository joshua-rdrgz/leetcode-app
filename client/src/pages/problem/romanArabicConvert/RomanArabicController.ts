import { BaseController } from '@/base/BaseController';
import { SuiteData } from '@/models/SuiteData';
import { RomanArabicModel } from './RomanArabicModel';

export class RomanArabicController extends BaseController {
  protected model: RomanArabicModel;

  constructor(model: RomanArabicModel) {
    super();
    this.model = model;
  }

  async initialize(suiteData: SuiteData) {
    const endpoints = await this.model.getEndpoints(suiteData);
    console.log('init endpoints: ', endpoints);
  }
}