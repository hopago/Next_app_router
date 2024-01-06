
export const fetcher = (url: string, requestInit: RequestInit | undefined) => {
  return fetch(url, requestInit);
};
