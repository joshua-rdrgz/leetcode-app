import { BaseController } from '@/base/BaseController';
import { NotFoundView } from './NotFoundView';

export class NotFoundController extends BaseController {
  private view: NotFoundView;

  constructor(view: NotFoundView) {
    super();
    this.view = view;
  }

  initialize(attemptedUrl: string): void {
    this.view.render(attemptedUrl);
  }
}
