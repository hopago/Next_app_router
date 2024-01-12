const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/`;

export const restFetcher = async ({
  method,
  path,
  body,
  params,
  query,
  queryValue,
  next,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  body?: any;
  params?: string;
  query?: string | string[];
  queryValue?: string | string[];
  next?: Record<string, any>;
}) => {
  try {
    let url = `${BASE_URL}${path}`;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": BASE_URL,
      },
      credentials: "include",
    };

    if (params) {
      url += ( "/" + params );
    }

    if (query?.length && queryValue?.length) {
      if (query?.length === 1 && queryValue?.length === 1) {
        const searchParams = new URLSearchParams(query[0]);
        url += "?" + searchParams.toString()
        url += queryValue[0];
      }
  
      if (query?.length > 1 && queryValue?.length > 1) {
        const firstSearchParams = new URLSearchParams(query[0]);
        const secondSearchParams = new URLSearchParams(query[1]);
        url += `?${firstSearchParams.toString()}${
          queryValue[0]
        }&${secondSearchParams.toString()}${queryValue[1]}`;
      }
    }

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    if (next) {
      fetchOptions.next = { ...next };
    }

    const res = await fetch(url, fetchOptions);

    return res;
  } catch (err) {
    console.error(err);
  }
};
