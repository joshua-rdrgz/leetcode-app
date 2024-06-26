import { CacheProvider } from '@/models/CacheProvider';
import { type EndpointData } from '@/models/EndpointData';
import { type SuiteData } from '@/models/SuiteData';

export class MockCacheProvider implements CacheProvider {
  constructor(
    private suites: SuiteData[] = [],
    private endpoints: { [key: string]: EndpointData[] } = {}
  ) {}

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
