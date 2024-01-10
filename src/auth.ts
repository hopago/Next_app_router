import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { restFetcher } from "./hooks/fetcher";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const authResponse = await restFetcher({
          path: "api/login",
          method: "POST",
          body: {
            id: credentials?.username,
            password: credentials?.password,
          },
        });

        if (!authResponse?.ok) {
          return null;
        }

        const user = await authResponse?.json();
        console.log("user", user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});
