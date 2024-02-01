import { type SuiteData } from '@/models/SuiteData';
import { type EndpointData } from '@/models/EndpointData';

class APICache {
  private suites: SuiteData[] = [];
  private endpoints: { [key: string]: EndpointData[] } = {};

  getSuites(): SuiteData[] {
    return this.suites;
  }

  getSuiteByName(name: string): SuiteData | undefined {
    return this.suites.find((p) => p.name.toLowerCase() === name.toLowerCase());
  }

  setSuites(suites: SuiteData[]): void {
    this.suites = suites;
  }

  getEndpoints(endpoint: string): EndpointData[] | undefined {
    return this.endpoints[endpoint];
  }

  setEndpoints(endpoint: string, endpoints: EndpointData[]): void {
    this.endpoints[endpoint] = endpoints;
  }
}

const apiCache = new APICache();

export default apiCache;
