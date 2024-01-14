import { NavigationController } from '@/navigation/NavigationController';

export abstract class BaseController {
  abstract initialize(...args: any[]): void;

  protected navigateToUrl(url: string) {
    NavigationController.navigateToUrl(url);
  }
}
