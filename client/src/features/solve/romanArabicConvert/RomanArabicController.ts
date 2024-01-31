import { BaseController } from '@/base/BaseController';
import { ProblemData } from '@/features/problems/ProblemData';
import { RomanArabicModel } from './RomanArabicModel';

export class RomanArabicController extends BaseController {
  model = new RomanArabicModel();

  async initialize(problemData: ProblemData) {
    const endpoints = await this.model.getEndpoints(problemData);
    console.log('init endpoints: ', endpoints);
  }
}
