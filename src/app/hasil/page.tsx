"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAnalysis } from "@/lib/analysis-context";
import { phToPct } from "@/lib/outcomes";
import styles from "./hasil.module.css";

export default function HasilPage() {
  const router = useRouter();
  const { result, hydrated, reset } = useAnalysis();

  useEffect(() => {
    if (!hydrated) return;
    if (!result) {
      router.replace("/upload");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, result]);

  if (!result) return null;

  const handleReanalyze = () => {
    reset();
    router.push("/upload");
  };

  return (
    <div className={`${styles.screen} fh-fade`}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Hasil Analisis</h1>

        <div className={styles.gaugeCard}>
          <div className={styles.gaugeLabel}>Estimasi pH Urine</div>
          <div className={styles.gaugeValue}>{result.ph}</div>
          <div className={styles.gaugeTrack}>
            <div
              className={styles.gaugeMarker}
              style={{ left: `${phToPct(result.ph)}%` }}
            />
          </div>
          <div className={styles.gaugeScale}>
            <span>Asam</span>
            <span>Netral</span>
            <span>Basa</span>
          </div>
        </div>

        <div className={styles.statusCard} style={{ background: result.bg }}>
          <div className={styles.statusIcon}>
            <span className={styles.statusEmoji}>{result.emoji}</span>
          </div>
          <div>
            <div className={styles.statusLabel}>{result.label}</div>
            <div className={styles.statusDesc}>{result.desc}</div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoTitle}>Apa artinya?</div>
          <div className={styles.infoText}>{result.explain}</div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.adviceTitle}>Saran untuk Kamu</div>
          {result.advice.map((tip) => (
            <div className={styles.adviceItem} key={tip}>
              <span className={styles.adviceBullet}>•</span>
              <span>{tip}</span>
            </div>
          ))}
          <div className={styles.vetNote}>{result.vetNote}</div>
        </div>

        <button className={styles.reanalyzeButton} onClick={handleReanalyze}>
          Analisis Ulang
        </button>
      </div>
    </div>
  );
}
