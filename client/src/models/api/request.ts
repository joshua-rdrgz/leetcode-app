import axios from 'axios';
import catchAxiosAsync from '@/models/api/catchAxiosAsync';

export default {
  get: (url: string) => catchAxiosAsync(async () => await axios.get(url)),
};
