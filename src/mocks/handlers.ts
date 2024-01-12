import { SignUpProps } from "@/app/(publicRoutes)/_lib/sign-up";
import { faker } from "@faker-js/faker";
import { HttpResponse, http } from "msw";

type SignUpPropsWithoutId = Omit<SignUpProps, "id">;
type LoginProps = {
  id: string;
  password: string;
};

function generateDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}

const mockUsers = (() => {
  return [
    {
      id: "1",
      nickname: "hopago",
      password: "hopago",
      image: "/free-icon-letter-h-7297840.png",
      followingUsers: [
        {
          userId: "2",
        },
      ],
      followers: [
        {
          userId: "2",
        },
      ],
    },
    {
      id: "2",
      nickname: "dopago",
      password: "dopago",
      image: "/free-icon-letter-h-7297840.png",
      followingUsers: [
        {
          userId: "1",
        },
      ],
      followers: [
        {
          userId: "1",
        },
      ],
    },
  ];
})();

const mockPosts = (() => {
  return [
    {
      postId: 1,
      User: {
        ...mockUsers[0],
      },
      content: `${mockUsers[0].nickname} is ${mockUsers[0].nickname}!!!`,
      Images: [
        {
          imageId: 1,
          link: faker.image.urlLoremFlickr(),
        },
      ],
      createdAt: generateDate(),
    },
    {
      postId: 2,
      User: {
        ...mockUsers[1],
      },
      content: `${mockUsers[1].nickname} is ${mockUsers[1].nickname}!!!`,
      Images: [
        {
          imageId: 2,
          link: faker.image.urlLoremFlickr(),
        },
      ],
      createdAt: generateDate(),
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

    const isDuplicated = mockUsers.some(
      (user) => user.nickname === userInfo?.nickname
    );
    if (isDuplicated) {
      return new HttpResponse(null, {
        status: 407,
      });
    }

    const userInfo = {
      id: (mockUsers.length + 1).toString(),
      followingUsers: [],
      followers: [],
      ...bodyInfo,
    };

    mockUsers.push(userInfo);

    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.get("/api/post", async ({ request }) => {
    const url = new URL(request.url);

    const fetchType = url.searchParams.get("fetchType");
    const userId = url.searchParams.get("userId");
    const searchTerm = url.searchParams.get("search");

    if (fetchType === "recommends") {
      return HttpResponse.json(mockPosts);
    }

    if (fetchType === "following" && userId) {
      const foundUser = mockUsers.find((user) => user.id === userId);
      if (!foundUser?.followingUsers?.length) {
        return new HttpResponse("Post not found...", {
          status: 404,
        });
      }

      const followingUsersPosts = foundUser.followingUsers.flatMap((user) => {
        return mockPosts.filter((post) => post.User.id === user.userId);
      });

      return HttpResponse.json(followingUsersPosts);
    }

    if (searchTerm) {
      const filteredPosts = mockPosts.filter((post) => {
        return post.content
          .trim()
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      });

      return HttpResponse.json(filteredPosts);
    }
  }),
];
