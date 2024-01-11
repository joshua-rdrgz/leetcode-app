import { type AxiosResponse, AxiosError } from 'axios';

export default async function catchAxiosAsync(
  fn: () => Promise<AxiosResponse>
) {
  try {
    const response = await fn();
    console.log(
      '✅ SUCCESS ✅ \n',
      'Response: ',
      response,
      '\n\n 📊 Data: 📊',
      response.data
    );

    return response.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
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
      console.log('🔥 UNKNOWN ERROR: 🔥 \n', error);
    }

    return null;
  }
}
