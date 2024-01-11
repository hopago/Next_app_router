"use server";

import { restFetcher } from "@/hooks/fetcher";
import { redirect } from "next/navigation";

export type SignUpProps = {
  id: string;
  nickname: string;
  password: string;
  image: string;
};

export async function signUp(prevState: any, formData: FormData) {
  let shouldRedirect = false;

  let id;
  let name;
  let password;
  let image;

  const checkAndTrim = (field: string) => {
    const value = formData.get(field);
    if (typeof value === "string") {
      const trimmedValue = value.trim();
      if (!trimmedValue) {
        throw new Error(`Field ${field} is required.|${field}`);
      }
      return trimmedValue;
    } else {
      throw new Error(`Field ${field} should be a string.|${field}`);
    }
  };

  try {
    id = checkAndTrim("id");
    name = checkAndTrim("name");
    password = checkAndTrim("password");
    image = checkAndTrim("image");
  } catch (err: any) {
    return {
      message: err.message,
    }
  }

  const signUpInfo = {
    id,
    nickname: name,
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
