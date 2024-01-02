import Link from "next/link";
import styles from "./layout.module.css";
import Image from "next/image";
import hLogo from "@/../public/free-icon-letter-h-7297840.png";
import NavMenu from "./_components/NavMenu";
import LogoutButton from "./_components/LogoutButton";
import TrendSection from "./_components/TrendSection";
import FollowRecommend from "./_components/FollowRecommend";
import RightSearchForm from "./_components/RightSearchForm";

export default function layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <header className={styles.leftSectionWrapper}>
        <section className={styles.leftSection}>
          <div className={styles.leftSectionFixed}>
            <Link className={styles.logo} href="/home">
              <div className={styles.logoPill}>
                <Image width={40} height={40} src={hLogo} alt="h.com로고" />
              </div>
            </Link>
            <nav>
              <ul>
                <NavMenu />
              </ul>
              <Link href="/compose/tweet" className={styles.postButton}>
                게시하기
              </Link>
            </nav>
            <LogoutButton />
          </div>
        </section>
      </header>
      <aside className={styles.rightSectionWrapper}>
        <div className={styles.rightSectionInner}>
          <main className={styles.main}>{children}</main>
          <section className={styles.rightSection}>
            <RightSearchForm />
            <TrendSection />
            <div className={styles.followRecommend}>
              <h3>팔로우 추천</h3>
              <FollowRecommend />
            </div>
          </section>
        </div>
      </aside>
      {modal}
    </div>
  );
}
