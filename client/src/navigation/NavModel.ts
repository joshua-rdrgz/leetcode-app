import { Stack } from '@/state/stack';

export interface NavEntry {
  pageTitle: string;
  pageUrl: string;
}

export class NavModel {
  public pageHistoryHandled: boolean;
  protected navHistory: Stack<NavEntry>;

  constructor() {
    this.pageHistoryHandled = false;
    this.navHistory = new Stack();
  }

  pushPageToHistory(pageTitle: string, pageUrl: string) {
    this.navHistory.push({ pageTitle, pageUrl });
  }

  popCurrentPage() {
    return this.navHistory.pop();
  }

  getCurrentPage() {
    return this.navHistory.peek();
  }

  getPrevPage() {
    return this.navHistory.peekPrev();
  }

  hasPrevPage() {
    return this.navHistory.size() > 1;
  }
}

export default new NavModel();
