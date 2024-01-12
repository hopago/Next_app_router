export type User = {
  id: string;
  nickname: string;
  password: string;
  image: string;
  followingUsers: {
    userId: string;
  }[];
  followers: {
    userId: string;
  }[];
};