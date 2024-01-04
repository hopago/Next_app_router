import Post from "../_components/Post";
import SearchForm from "../_components/SearchForm";
import Trend from "../_components/Trend";
import styles from "./page.module.css";
import BackButton from "../_components/BackButton";
import Tab from "./_components/Tab";

type Props = {
  searchParams: {
    q?: string;
    f?: string;
    pf?: string;
  };
};

export default function page({ searchParams }: Props) {
  return (
     <main className={styles.main}>
      <div className={styles.searchTop}>
        <div className={styles.searchZone}>
          <div className={styles.buttonZone}>
            <BackButton />
          </div>
          <div className={styles.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={styles.list}>
        <Post />
        <Post />
        <Post />
        {/*<SearchResult searchParams={searchParams} />*/}
      </div>
    </main>
  );
}
