import { BaseView } from '../BaseView';

export class TestBaseView extends BaseView {
  protected renderImpl() {}

  static setupTestDOM() {
    BaseView.rootElement = document.createElement('div');
    BaseView.rootElement.id = 'root';
    document.body.appendChild(BaseView.rootElement);
  }

  static teardownTestDOM() {
    document.body.removeChild(BaseView.rootElement);
  }
}
