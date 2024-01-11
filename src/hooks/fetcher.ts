const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/`;

export const restFetcher = async ({
  method,
  path,
  body,
  params,
  next,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  body?: any;
  params?: any;
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
      const searchParams = new URLSearchParams(params);
      url += "?" + searchParams.toString();
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
