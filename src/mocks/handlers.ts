import { SignUpProps } from "@/app/(publicRoutes)/_lib/sign-up";
import { HttpResponse, http } from "msw";

type SignUpPropsWithoutId = Omit<SignUpProps, "id">;
type LoginProps = {
  id: string;
  password: string;
};

const mockUsers = (() => {
  return [
    {
      id: "1",
      nickname: "hopago",
      password: "hopago",
      image: "/free-icon-letter-h-7297840",
    },
    {
      id: "2",
      nickname: "dopago",
      password: "dopago",
      image: "/free-icon-letter-h-7297840",
    },
  ];
})();

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const bodyInfo = (await request.json()) as LoginProps;
    console.log(bodyInfo);

    const { id: nickname, password: credentialsPassword } = bodyInfo;

    const findUser = mockUsers.find((user) => user.nickname === nickname);
    if (!findUser) {
      return new HttpResponse("Wrong credentials...", {
        status: 401,
      });
    }

    const comparePassword = credentialsPassword === findUser.password;
    if (!comparePassword) {
      return new HttpResponse("Wrong credentials...", {
        status: 401,
      });
    }

    const { password, ...user } = findUser;

    return HttpResponse.json(user, {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),
  http.post("/api/logout", () => {
    return HttpResponse.json(null, {
      headers: {
        "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  http.post("/api/signup", async ({ request }) => {
    const bodyInfo = (await request.json()) as unknown as SignUpPropsWithoutId;

    const isDuplicated = mockUsers.some((user) => user.nickname === userInfo?.nickname);
    if (isDuplicated) {
      return new HttpResponse(null, {
        status: 407,
      });
    }

    const userInfo = {
      id: (mockUsers.length + 1).toString(),
      ...bodyInfo,
    };

    mockUsers.push(userInfo);

    return new HttpResponse(null, {
      status: 200,
    });
  }),
];
