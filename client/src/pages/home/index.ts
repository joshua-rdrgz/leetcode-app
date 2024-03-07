import { navigation } from '@/navigation';
import { HomeController } from './HomeController';
import homeModel from './HomeModel';
import homeView from './HomeView';

export function homePageInit() {
  const homeController = new HomeController(homeModel, homeView, navigation);
  homeController.initialize();
}
