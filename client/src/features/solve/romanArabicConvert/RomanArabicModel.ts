import apiCache from '@/api/cache';
import request from '@/api/request';
import { ProblemData } from '@/features/problems/ProblemData';
import { EndpointsData } from '@/features/solve/EndpointsData';

export class RomanArabicModel {
  async getEndpoints(problemData: ProblemData): Promise<EndpointsData[]> {
    const endpoint = problemData.endpoint;
    const response = await request.get(endpoint);
    apiCache.setEndpoints(endpoint, response.data);
    return response.data;
  }
}
