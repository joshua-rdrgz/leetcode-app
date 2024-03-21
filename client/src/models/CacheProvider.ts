import { EndpointData } from '@/models/EndpointData';
import { SuiteData } from '@/models/SuiteData';

export interface CacheProvider {
  getSuites(): SuiteData[];
  getSuiteByName(name: string): SuiteData | undefined;
  setSuites(suites: SuiteData[]): void;
  getEndpoints(endpoint: string): EndpointData[] | undefined;
  setEndpoints(endpoint: string, endpoints: EndpointData[]): void;
}
