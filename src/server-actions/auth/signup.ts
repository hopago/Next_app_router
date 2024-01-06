"use server";

import { fetcher } from "@/hooks/fetcher";

export type SignUpProps = {
  id: string;
  name: string;
  password: string;
  image: string;
};

export async function signUp(signUpInfo: SignUpProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`;

  try {
    const response = await fetcher(url, {
      method: "post",
      body: JSON.stringify(signUpInfo),
      credentials: "include",
    });

    return response;
  } catch (err: any) {
    console.error(err);
  }
}
