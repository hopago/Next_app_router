"use server";

import { restFetcher } from "@/hooks/fetcher";
import { redirect } from "next/navigation";

export type SignUpProps = {
  id: string;
  name: string;
  password: string;
  image: string;
};

export async function signUp(prevState: any, formData: FormData) {
  let shouldRedirect = false;

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const image = formData.get("image") as string;

  if (!id || !name || !password || !image)
    return {
      message: "All fields required...",
    };

  const signUpInfo = {
    id,
    name,
    password,
    image,
  };

  try {
    const response = await restFetcher({
      method: "POST",
      path: "api/signup",
      body: {
        ...signUpInfo,
      },
    });

    if (!response) {
      return {
        message: "Internal server error...",
        status: 500,
      };
    }

    if (response.status === 407) {
      return {
        message: "User already existed...",
      };
    }

    if (response.status === 200) {
      shouldRedirect = true;
    }
  } catch (err: any) {
    console.error(err);
  }

  if (shouldRedirect) {
    redirect("/home");
  }
}
