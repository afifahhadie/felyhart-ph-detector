"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAnalysis } from "@/lib/analysis-context";
import { pickRandomOutcome } from "@/lib/outcomes";
import styles from "./loading.module.css";

export default function LoadingPage() {
  const router = useRouter();
  const { photo, hydrated, setResult } = useAnalysis();

  useEffect(() => {
    if (!hydrated) return;
    if (!photo) {
      router.replace("/upload");
      return;
    }
    const timer = setTimeout(() => {
      setResult(pickRandomOutcome());
      router.replace("/hasil");
    }, 2200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, photo]);

  return (
    <div className={`${styles.screen} fh-fade`}>
      <div className={styles.catWrap}>
        <svg viewBox="0 0 120 120" width="120" height="120">
          <ellipse cx="60" cy="70" rx="44" ry="38" fill="#fff" />
          <path d="M28 42 18 16l26 20z" fill="#fff" />
          <path d="M92 42 102 16 76 36z" fill="#fff" />
          <ellipse className={styles.eye} cx="42" cy="66" rx="5" ry="7" fill="#3A2E4D" />
          <ellipse className={styles.eye} cx="78" cy="66" rx="5" ry="7" fill="#3A2E4D" />
          <ellipse cx="60" cy="80" rx="4" ry="3" fill="#EC5A93" />
          <path d="M52 86q8 6 16 0" stroke="#3A2E4D" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className={styles.message}>Menganalisis warna pasir...</div>
      <div className={styles.dots}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <div className={styles.subMessage}>Mohon tunggu sebentar, ya</div>
    </div>
  );
}
