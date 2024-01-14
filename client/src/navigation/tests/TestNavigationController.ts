import { NavigationController } from '@/navigation/NavigationController';

export class TestNavigationController extends NavigationController {
  static getRouter() {
    return super.router;
  }
}
