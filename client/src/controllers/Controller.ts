import request from '@/models/api/request';

class Controller {
  async init() {
    await request.get('/api/v1/leetcode/problems');
  }
}

export default new Controller();
