import request from '@/api/request';
import apiCache from '@/api/cache';
import { navigation } from './navigation';

async function initializeApp() {
  await gatherLeetCodeSuites();
  navigation.initialize();
}

async function gatherLeetCodeSuites() {
  const data = await request.get('/api/v1/leetcode/suites', {
    toastSuccessResult: false,
    logSuccessResult: false,
  });
  apiCache.setSuites(data?.data || []);
}

initializeApp();
