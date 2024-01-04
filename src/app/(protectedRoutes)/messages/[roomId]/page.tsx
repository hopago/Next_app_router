import { faker } from "@faker-js/faker";
import styles from "./page.module.css";
import Link from "next/link";
import BackButton from "../../_components/BackButton";
import cx from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function page() {
  const user = {
    id: "hopago",
    nickname: "호파고",
    image: faker.image.avatarGitHub(),
  };

  const messages = [
    {
      messageId: 1,
      content: "안녕하세요",
      userId: "hopago",
      createdAt: new Date(),
    },
    {
      messageId: 2,
      content: "안녕하세요",
      userId: "dopago",
      createdAt: new Date(),
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <BackButton />
        <div>
          <h2>{user.nickname}</h2>
        </div>
      </div>
      <Link className={styles.userInfo} href={user.nickname}>
        <img src={user.image} alt={user.id} />
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>{user.id}</div>
      </Link>
      <ul className={styles.list}>
        {messages.map((message) => {
          if (message.userId === "hopago") {
            return (
              <li
                key={message.messageId}
                className={cx(styles.message, styles.myMessage)}
              >
                <div className={styles.content}>{message.content}</div>
                <p className={styles.date}>
                  {dayjs(message.createdAt).format("MM월 DD일 A HH시 mm분")}
                </p>
              </li>
            );
          }

          return (
            <li
              key={message.messageId}
              className={cx(styles.message, styles.yourMessage)}
            >
              <div className={styles.content}>{message.content}</div>
              <p className={styles.date}>
                {dayjs(message.createdAt).format("MM월 DD일 A HH시 mm분")}
              </p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
