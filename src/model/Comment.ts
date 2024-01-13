import { PostImage } from "./Post";
import { User } from "./User";

export type Comment = {
  postId: number;
  commentId: number;
  User: User;
  content: string;
  createdAt: Date;
  Images: (PostImage | null)[];
};
