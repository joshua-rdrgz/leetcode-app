import { NavigationController } from '@/features/navigation/NavigationController';

export class TestNavigationController extends NavigationController {
  static getRouter() {
    return super.router;
  }
}
