import { SignUpProps } from "@/app/(publicRoutes)/_lib/sign-up";
import { Post } from "@/model/Post";
import { faker } from "@faker-js/faker";
import { HttpResponse, http } from "msw";

type SignUpPropsWithoutId = Omit<SignUpProps, "id">;
type LoginProps = {
  id: string;
  password: string;
};
type MockPost = {
  postId: number;
  User: {
    id: string;
    nickname: string;
    password: string;
    image: string;
    followingUsers: {
      userId: string;
    }[];
    followers: {
      userId: string;
    };
  };
  content: string;
  Images: {
    imageId: number;
    link: string;
  }[];
  createdAt: Date;
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
    {
      postId: 3,
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
    {
      postId: 4,
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
    {
      postId: 5,
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

const mockComments = (() => {
  return [
    {
      postId: 1,
      commentId: 1,
      User: {
        ...mockUsers[1],
      },
      content: `${mockUsers[0]} is ${mockUsers[1]}???`,
      Images: [
        {
          imageId: 2,
          link: faker.image.urlLoremFlickr(),
        },
      ],
      createdAt: generateDate(),
    },
    {
      postId: 2,
      commentId: 2,
      User: {
        ...mockUsers[0],
      },
      content: `${mockUsers[1].nickname} is ${mockUsers[0].nickname}???`,
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

const mockTrends = (() => {
  return [
    {
      tagId: 1,
      title: "hopago",
      count: 123,
    },
    {
      tagId: 2,
      title: "hopago",
      count: 123,
    },
    {
      tagId: 3,
      title: "hopago",
      count: 123,
    },
    {
      tagId: 4,
      title: "hopago",
      count: 123,
    },
    {
      tagId: 5,
      title: "hopago",
      count: 123,
    },
  ];
})();

export const handlers = [
  // AUTH
  http.post("/api/login", async ({ request }) => {
    const bodyInfo = (await request.json()) as LoginProps;

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
  // GET POSTS
  http.get("/api/posts", async ({ request }) => {
    const url = new URL(request.url);

    const fetchType = url.searchParams.get("fetchType");
    const userId = url.searchParams.get("userId");
    const searchTerm = url.searchParams.get("q");
    const f = url.searchParams.get("f");
    const pf = url.searchParams.get("pf");
    const cursor = Number(url.searchParams.get("cursor")) || 0;
    const pageNumber = 5;

    if (fetchType === "recommends") {
      // const isNextPage = mockPosts.length > cursor + pageNumber;

      // if (!isNextPage) {
      //   const lastPageNumber = mockPosts.length - 1;
      //   if (lastPageNumber === cursor)
      //     return new HttpResponse("Post not found...", {
      //       status: 400,
      //     });

      //   const slicedPosts = mockPosts.slice(cursor, lastPageNumber + 1);

      //   return HttpResponse.json(slicedPosts);
      // }

      if (cursor === 0) {
        return HttpResponse.json(mockPosts);
      }

      const temporaryPosts: MockPost[] = [
        ...Array(cursor)
          .fill(0)
          .reduce((acc: Post[], item: number, index: number) => {
            return [...acc, { ...mockPosts[index % mockPosts.length] }];
          }, []),
      ];

      temporaryPosts.forEach((post, index) => {
        post.postId = cursor + (index + 1);
        post.Images[0].imageId = cursor + (index + 1);
      });

      const posts = [...mockPosts, ...temporaryPosts];
      const slicedPosts = posts.slice(cursor, cursor + pageNumber);

      return HttpResponse.json(slicedPosts);
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
      if (f) {
        const filteredPosts = mockPosts.filter((post) =>
          post.content
            .trim()
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
        );

        const sortedPosts = filteredPosts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return HttpResponse.json(sortedPosts);
      }

      if (f && pf) {
        const currentUser = mockUsers.find((user) => user.id === userId);
        if (!currentUser)
          return new HttpResponse("User not found...", {
            status: 404,
          });

        const followingUser = [...currentUser?.followingUsers];
        const ids = followingUser.map((user) => user.userId);
        const found = mockPosts.filter((post) => {
          return ids.includes(post.User.id);
        });

        const posts = found.filter((post) =>
          post.content
            .trim()
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
        );

        const sortedPosts = posts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return HttpResponse.json(sortedPosts);
      }

      if (pf) {
        const currentUser = mockUsers.find((user) => user.id === userId);
        if (!currentUser)
          return new HttpResponse("User not found...", {
            status: 404,
          });

        const followingUser = [...currentUser?.followingUsers];
        const ids = followingUser.map((user) => user.userId);
        const found = mockPosts.filter((post) => {
          return ids.includes(post.User.id);
        });

        return HttpResponse.json(found);
      }

      const filteredPosts = mockPosts.filter((post) => {
        return post.content
          .trim()
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      });

      return HttpResponse.json(filteredPosts);
    }
  }),
  // GET COMMENTS
  http.get("/api/posts/:postId/comments", async ({ params }) => {
    const { postId } = params;

    const currComments = mockComments.filter(
      (comment) => comment.postId === Number(postId)
    );

    if (!currComments)
      return new HttpResponse("Comment not found...", {
        status: 400,
      });

    return HttpResponse.json(currComments);
  }),
  // GET POST
  http.get("/api/posts/:postId", async ({ params }) => {
    const { postId } = params;

    const found = mockPosts.find((post) => post.postId === Number(postId));
    if (!found)
      return new HttpResponse("Post not found...", {
        status: 400,
      });

    return HttpResponse.json(found);
  }),
  // GET FOLLOW RECOMMEND
  http.get("/api/users/recommend", async () => {
    return HttpResponse.json(mockUsers.slice(0, 1));
  }),
  // GET USER POSTS
  http.get("/api/users/:userId/posts", async ({ params }) => {
    const { userId } = params;

    const found = mockPosts.filter((post) => post.User.id === userId);

    if (!found)
      return new HttpResponse("Post not found...", {
        status: 400,
      });

    return HttpResponse.json(found);
  }),
  // GET USER
  http.get("/api/users/:userId", async ({ params }) => {
    const { userId } = params;

    if (!userId)
      return new HttpResponse("User Id required...", {
        status: 400,
      });

    const found = mockUsers.find((user) => user.id === userId);
    if (!found)
      return new HttpResponse("User not found...", {
        status: 404,
      });

    return HttpResponse.json(found);
  }),
  // GET TRENDS
  http.get("/api/trends", async () => {
    return HttpResponse.json(mockTrends);
  }),
];
