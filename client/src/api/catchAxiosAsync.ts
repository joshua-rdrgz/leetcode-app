import { toast } from '@/ui/toast';
import { type AxiosResponse, AxiosError } from 'axios';

export interface CatchAxiosAsyncOptions {
  toastSuccessResult?: boolean;
  logSuccessResult?: boolean;
}

export default async function catchAxiosAsync(
  fn: () => Promise<AxiosResponse>,
  options: CatchAxiosAsyncOptions = {}
) {
  const { toastSuccessResult = true, logSuccessResult = true } = options;

  try {
    const response = await fn();
    if (toastSuccessResult) {
      toast.success('Action successful!');
    }
    if (logSuccessResult) {
      console.log(
        '✅ SUCCESS ✅ \n',
        'Response: ',
        response,
        '\n\n 📊 Data: 📊',
        response.data
      );
    }

    return response.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      console.log(
        '❌ AXIOS ERROR: ❌ \n',
        'Error: ',
        error,
        '\n\n Response: ',
        error.response,
        '\n\n 💬 Message: 💬 \n',
        error.message
      );
    } else {
      toast.error('Uh oh, something went wrong!');
      console.log('🔥 UNKNOWN ERROR: 🔥 \n', error);
    }

    return null;
  }
}
