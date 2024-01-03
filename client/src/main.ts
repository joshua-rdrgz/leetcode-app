import { NavigationController } from '@/features/navigation/NavigationController';

function initializeApp() {
  NavigationController.initialize();
  NavigationController.navigateToHome();
}

initializeApp();
