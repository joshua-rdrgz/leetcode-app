import Navigo from 'navigo';
import { NavController } from './NavController';
import navModel from './NavModel';
import navView from './NavView';
import { TestNavController } from './testClasses/TestNavController';
import { TestNavModel } from './testClasses/TestNavModel';
import { TestNavView } from './testClasses/TestNavView';

function createNavigation(): NavController {
  return new NavController(new Navigo('/'), navModel, navView);
}

function createTestNavigation(): TestNavController {
  const model = new TestNavModel();
  const view = new TestNavView();
  return new TestNavController(new Navigo('/'), model, view);
}

export const navigation = createNavigation();

export const testNavigation = createTestNavigation();
