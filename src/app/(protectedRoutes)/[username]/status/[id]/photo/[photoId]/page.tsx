import styles from "./photoModal.module.css";
import { faker } from "@faker-js/faker";
import ActionButtons from "@/app/(protectedRoutes)/_components/ActionButtons";
import CommentForm from "../../_components/CommentForm";
import Post from "@/app/(protectedRoutes)/_components/Post";
import PhotoModalCloseButton from "./_components/PhotoModalCloseButton";

export default function PhotoModal() {
  const photo = {
    imageId: 1,
    link: faker.image.urlLoremFlickr(),
    Post: {
      content: faker.lorem.text(),
    },
  };

  return (
    <div className={styles.container}>
      <PhotoModalCloseButton />
      <div className={styles.imageZone}>
        <img src={photo.link} alt={photo.Post?.content} />
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${photo.link})` }}
        />
        <div className={styles.buttonZone}>
          <div className={styles.buttonInner}>
            <ActionButtons white />
          </div>
        </div>
      </div>
      <div className={styles.commentZone}>
        <Post noImage />
        <CommentForm />
        <h3
          style={{ marginLeft: "16px", fontWeight: "bold", fontSize: "21px" }}
        >
          리트윗
        </h3>
        <Post />
      </div>
    </div>
  );
}
