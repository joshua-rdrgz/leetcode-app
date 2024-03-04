import { toast, Toast } from '@/ui/toast';

function setToastContainer(container: HTMLElement) {
  (Toast as any).container = container;
}

describe('Toast', () => {
  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
    setToastContainer(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it.each([
    { method: toast.success, type: 'success' },
    { method: toast.error, type: 'error' },
    { method: toast.info, type: 'info' },
    { method: toast.warning, type: 'warning' },
  ])(
    'should show a $type toast with the correct message',
    ({ method, type }) => {
      const message = `${type} message`;
      method.call(toast, message);

      const toastElement = document.querySelector(`.toast.toast--${type}`);
      expect(toastElement).toBeDefined();
      expect(toastElement?.textContent).toContain(message);
    }
  );

  it.each([
    { method: toast.success, type: 'success', duration: 3000 },
    { method: toast.error, type: 'error', duration: 5000 },
    { method: toast.info, type: 'info', duration: 3000 },
    { method: toast.warning, type: 'warning', duration: 4000 },
  ])(
    'should automatically remove the $type toast after the specified duration',
    ({ method, type, duration }) => {
      jest.useFakeTimers();

      const message = `${type} message`;
      method.call(toast, message);

      expect(document.querySelector(`.toast.toast--${type}`)).toBeDefined();

      jest.advanceTimersByTime(duration);
      expect(document.querySelector('.toast.toast--done')).toBeDefined();

      jest.advanceTimersByTime(200);
      expect(document.querySelector(`.toast.toast--${type}`)).toBeNull();
      expect(document.querySelector(`.toast.toast--done`)).toBeNull();

      jest.useRealTimers();
    }
  );
});
