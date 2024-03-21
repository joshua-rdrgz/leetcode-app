export function createApiResponse(
  status: 'success' | 'fail' | 'error',
  statusCode: number,
  data: any
) {
  return {
    status,
    statusCode,
    data,
  };
}
