import SearchForm from "../_components/SearchForm";
import ExploreTrendSection from "./_components/ExploreTrendSection";
import styles from "./page.module.css";

export default function page({ params }: { params: string }) {
  // params 없을 때 그냥 모든 포스트 최신 순

  return (
    <main className={styles.main}>
      <div className={styles.formZone}>
        <SearchForm />
      </div>
      <div className={styles.trend}>
        <h3>나를 위한 트랜드</h3>
        <ExploreTrendSection />
      </div>
    </main>
  );
}
