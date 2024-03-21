export const findEndpointData = (
  requestResponseData: any,
  endpoint: string
) => {
  for (const [request, response] of Object.entries(requestResponseData)) {
    const [_, url] = request.split(' ');
    if (url === endpoint) {
      return (response as any).data;
    }
  }
  return undefined;
};
