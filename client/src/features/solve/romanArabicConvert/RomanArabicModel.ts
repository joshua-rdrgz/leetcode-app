import apiCache from '@/api/cache';
import request from '@/api/request';
import { SuiteData } from '@/models/SuiteData';
import { EndpointData } from '@/models/EndpointData';

export class RomanArabicModel {
  async getEndpoints(suiteData: SuiteData): Promise<EndpointData[]> {
    const accessEndpoint = suiteData.endpoint;
    const response = await request.get(accessEndpoint);
    apiCache.setEndpoints(accessEndpoint, response.data);
    return response.data;
  }
}
