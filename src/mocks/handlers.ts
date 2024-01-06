import { SignUpProps } from "@/server-actions/auth/signup";
import { HttpResponse, http } from "msw";

const mockUsers = (() => {
  return [
    {
      id: "1",
      name: "hopago",
      password: "",
      image: "/free-icon-letter-h-7297840"
    },
    {
      id: "2",
      name: "dopago",
      password: "",
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
    const userInfo = await request.json() as unknown as SignUpProps;
    console.log(userInfo);

    const isDuplicated = mockUsers.some(user => user.id === userInfo?.id);
    if (isDuplicated) {
      return new HttpResponse(null, {
        status: 407
      })
    }

    return new HttpResponse(null, {
      status: 200
    });
  })
];
