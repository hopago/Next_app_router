import Post from "../_components/Post";
import PostForm from "../_components/PostForm";
import Tab from "./_components/Tab";
import TabContextProvider from "./context/TabContextProvider";
import styles from "./page.module.css";

export default function page() {
  return (
    <div className={styles.main}>
      <TabContextProvider>
        <Tab />
        <PostForm />
        <Post />
        <Post />
        <Post />
      </TabContextProvider>
    </div>
  );
}
