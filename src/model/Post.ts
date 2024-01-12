export type Post = {
  postId: number;
  content: string;
  User: {
    id: string;
    nickname: string;
    image: string;
  };
  createdAt: Date;
  Images: (PostImage | null)[];
};

export type PostImage = {
  imageId: number;
  link: string;
};
