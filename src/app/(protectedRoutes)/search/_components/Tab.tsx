"use client";

import { useState } from "react";
import styles from "./tab.module.css"
import { useRouter, useSearchParams } from "next/navigation";

export default function Tab() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [current, setCurrent] = useState(searchParams.get("f") ? "new" : "hot");

  const onClickHot = () => {
    setCurrent("hot");
    
    router.replace(`/search?q=${searchParams.get("q")}`);
  };
  
  const onClickNew = () => {
    setCurrent("new");

    if (searchParams.has("f")) {
      router.replace(`/search?${searchParams.toString()}`);
    } else {
      router.replace(`/search?${searchParams.toString()}&f=f`);
    }
  };

  return (
    <div className={styles.homeFixed}>
      <div className={styles.homeTab}>
        <div onClick={onClickHot}>
          인기
          <div className={styles.tabIndicator} hidden={current === "new"}></div>
        </div>
        <div onClick={onClickNew}>
          최신
          <div className={styles.tabIndicator} hidden={current === "hot"}></div>
        </div>
      </div>
    </div>
  );
}
