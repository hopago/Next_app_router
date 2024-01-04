"use client";

import styles from "../page.module.css";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  user: {
    id: string;
    nickname: string;
    Message: {
      roomId: number;
      messages: {
        content: string;
        createdAt: Date;
      }[];
    };
  };
};

export default function Room({ user }: Props) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/messages/${user.Message.roomId}`);
  };

  return (
    <div className={styles.room} onClick={onClick}>
      <div className={styles.roomUserImage}>
        <img src={faker.image.avatar()} alt="" />
      </div>
      <div className={styles.roomChatInfo}>
        <div className={styles.roomUserInfo}>
          <b className={styles.postUserName}>{user.nickname}</b>
          &nbsp;
          <span className={styles.postUserId}>@{user.id}</span>
          &nbsp; · &nbsp;
          <span className={styles.postDate}>
            {dayjs(user.Message?.messages.at(-1)?.createdAt).fromNow()}
          </span>
        </div>
        <div className={styles.roomLastChat}>
          {user.Message?.messages.at(-1)?.content}
        </div>
      </div>
    </div>
  );
}
