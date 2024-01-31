import { type ProblemData } from '@/features/problems/ProblemData';
import { type EndpointsData } from '@/features/solve/EndpointsData';

class APICache {
  private problems: ProblemData[] = [];
  private endpoints: { [key: string]: EndpointsData[] } = {};

  getProblems(): ProblemData[] {
    return this.problems;
  }

  getProblemByName(name: string): ProblemData | undefined {
    return this.problems.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
  }

  setProblems(problems: ProblemData[]): void {
    this.problems = problems;
  }

  getEndpoints(endpoint: string): EndpointsData[] | undefined {
    return this.endpoints[endpoint];
  }

  setEndpoints(endpoint: string, endpoints: EndpointsData[]): void {
    this.endpoints[endpoint] = endpoints;
  }
}

const apiCache = new APICache();

export default apiCache;
