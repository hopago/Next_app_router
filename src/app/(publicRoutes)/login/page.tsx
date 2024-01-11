"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Main from "../_components/Main";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user) {
    router.replace("/home");
    return null;
  }

  router.replace("/i/flow/login");
  return <Main />;
}
