enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export class Toast {
  private static FADE_OUT_ANIMATION_DURATION = 200;

  private static container = document.getElementById('toast-container')!;
  private static instance: Toast;
  private toastDurations: {
    [key in ToastType]: number;
  };

  private constructor() {
    this.toastDurations = {
      success: 3000,
      error: 5000,
      info: 3000,
      warning: 4000,
    };
  }

  public static getInstance(): Toast {
    if (!Toast.instance) {
      Toast.instance = new Toast();
    }
    return Toast.instance;
  }

  public success(message: string): void {
    this.show(message, ToastType.SUCCESS);
  }

  public error(message: string): void {
    this.show(message, ToastType.ERROR);
  }

  public info(message: string): void {
    this.show(message, ToastType.INFO);
  }

  public warning(message: string): void {
    this.show(message, ToastType.WARNING);
  }

  private show(message: string, type: ToastType): void {
    const duration = this.toastDurations[type];

    const toastElement = document.createElement('div');
    toastElement.classList.add('toast', `toast--${type}`);

    const toastEmoji = document.createElement('span');
    toastEmoji.classList.add('toast__emoji');
    switch (type) {
      case ToastType.SUCCESS:
        toastEmoji.textContent = '✅';
        break;
      case ToastType.ERROR:
        toastEmoji.textContent = '🚑';
        break;
      case ToastType.INFO:
        toastEmoji.textContent = '📣';
        break;
      case ToastType.WARNING:
        toastEmoji.textContent = '⚠️';
        break;
    }

    const toastMessage = document.createElement('span');
    toastMessage.classList.add('toast__message');
    toastMessage.textContent = message;

    toastElement.appendChild(toastEmoji);
    toastElement.appendChild(toastMessage);

    Toast.container.appendChild(toastElement);

    setTimeout(() => {
      toastElement.classList.add('toast--done');
      setTimeout(() => {
        Toast.container.removeChild(toastElement);
      }, Toast.FADE_OUT_ANIMATION_DURATION);
    }, duration);
  }
}

const toast = Toast.getInstance();
export { toast };
