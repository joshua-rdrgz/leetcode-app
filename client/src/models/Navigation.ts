import { NavEntry } from '@/navigation/NavModel';

export interface Navigation {
  navigateToUrl(url: string, pageHistoryHandled?: boolean): void;
  getCurrAndPrevPages(): {
    currPage: NavEntry | undefined;
    prevPage: NavEntry | undefined;
  };
}
