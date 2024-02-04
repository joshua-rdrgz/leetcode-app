import request from '@/api/request';
import apiCache from '@/api/cache';
import { NavigationController } from './navigation/NavigationController';

async function initializeApp() {
  await gatherLeetCodeSuites();
  NavigationController.initialize();
}

async function gatherLeetCodeSuites() {
  const data = await request.get('/api/v1/leetcode/suites');
  apiCache.setSuites(data?.data || []);
}

initializeApp();
