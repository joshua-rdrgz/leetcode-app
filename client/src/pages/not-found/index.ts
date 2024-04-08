import { NotFoundController } from './NotFoundController';
import { NotFoundView } from './NotFoundView';

export function notFoundPageInit(attemptedUrl: string) {
  const notFoundView = new NotFoundView();
  const notFoundController = new NotFoundController(notFoundView);
  notFoundController.initialize(attemptedUrl);
}
