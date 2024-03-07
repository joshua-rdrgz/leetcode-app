import { NavModel } from '@/navigation/NavModel';

export class TestNavModel extends NavModel {
  getNavHistory() {
    return this.navHistory;
  }

  clearNavHistory() {
    this.navHistory.clear();
  }
}
