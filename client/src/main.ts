import request from '@/api/request';
import apiCache from '@/api/cache';
import { NavigationController } from './navigation/NavigationController';

async function initializeApp() {
  const data = await request.get('/api/v1/leetcode/problems');
  apiCache.setProblems(data?.data || []);

  NavigationController.initialize();
}

initializeApp();
