import SearchForm from "../_components/SearchForm";
import Trend from "../_components/Trend";
import styles from "./page.module.css";

export default function page() {
  return (
    <main className={styles.main}>
      <div className={styles.formZone}>
        <SearchForm />
      </div>
      <div className={styles.trend}>
        <h3>나를 위한 트랜드</h3>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </main>
  );
}
