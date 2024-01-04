import Room from "./_components/Room";
import styles from "./page.module.css";

export default function page() {
  const users = [
    {
      id: "hopago",
      nickname: "호파고",
      Message: {
        roomId: 1,
        messages: [
          { content: "안녕하세요", createdAt: new Date() },
          { content: "안녕하세요", createdAt: new Date() },
        ],
      }
    },
    {
      id: "dopago",
      nickname: "도파고",
      Message: {
        roomId: 2,
        messages: [
          { content: "안녕하세요", createdAt: new Date() },
          { content: "안녕하세요", createdAt: new Date() },
        ],
      }
    }
  ]

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h3>쪽지</h3>
      </div>

      {users.map(user => (
        <Room key={user.id} user={user} />
      ))}
    </main>
  );
}
