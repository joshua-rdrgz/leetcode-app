import axios from 'axios';
import catchAxiosAsync from '@/api/catchAxiosAsync';

export default {
  get: (url: string) => catchAxiosAsync(async () => await axios.get(url)),
};
