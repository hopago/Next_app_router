import { SignUpProps } from "@/app/(publicRoutes)/_lib/sign-up";
import { HttpResponse, http } from "msw";

type SignUpPropsWithoutId = Omit<SignUpProps, 'id'>;

const mockUsers = (() => {
  return [
    {
      id: "1",
      name: "hopago",
      password: "hopago",
      image: "/free-icon-letter-h-7297840"
    },
    {
      id: "2",
      name: "dopago",
      password: "dopago",
      image: "/free-icon-letter-h-7297840"
    },
  ]
})();

export const handlers = [
  http.post("/api/login", () => {
    return HttpResponse.json(
      {
        userId: 1,
        nickname: "호파고",
        id: "hopago",
        image: "/free-icon-letter-h-7297840",
      },
      {
        headers: {
          "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
        },
      }
    );
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

    const isDuplicated = mockUsers.some(user => user.name === userInfo?.name);
    if (isDuplicated) {
      return new HttpResponse(null, {
        status: 407
      })
    }

    const userInfo = {
      id: (mockUsers.length + 1).toString(),
      ...bodyInfo
    }

    mockUsers.push(userInfo);

    return new HttpResponse(null, {
      status: 200
    });
  })
];
