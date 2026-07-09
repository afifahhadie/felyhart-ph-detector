"use client";

import { useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type Tip = {
  title: string;
  subtitle: string;
  bg: string;
  icon: ReactNode;
};

const TIPS: Tip[] = [
  {
    title: "Pencahayaan cukup",
    subtitle: "Hindari ruangan gelap",
    bg: "#EC5A93",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="2" />
        <path
          d="M12 1v3M12 20v3M23 12h-3M4 12H1M20 4l-2 2M6 18l-2 2M20 20l-2-2M6 6 4 4"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Tanpa flash",
    subtitle: "Flash bikin warna terlihat beda",
    bg: "#B39DDB",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"
          stroke="#fff"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M3 3l18 18" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Jarak 20–30 cm",
    subtitle: "Jangan terlalu dekat/jauh",
    bg: "#EC5A93",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Foto dari atas",
    subtitle: "Tegak lurus di atas gundukan",
    bg: "#B39DDB",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="8" width="16" height="12" rx="2" stroke="#fff" strokeWidth="2" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="#fff" strokeWidth="2" />
        <path d="M12 4v0" stroke="#fff" strokeWidth="2" />
        <path d="M2 5l10-3 10 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Tanpa zoom",
    subtitle: "Gunakan kamera normal",
    bg: "#EC5A93",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="10" cy="10" r="6" stroke="#fff" strokeWidth="2" />
        <path d="M20 20l-5-5M3 3l14 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Jangan gunakan zoom",
    subtitle: "Foto tanpa zoom untuk menjaga kualitas dan akurasi warna",
    bg: "#B39DDB",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="10" cy="10" r="6" stroke="#fff" strokeWidth="2" />
        <path d="M8 10h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <path d="M14.5 14.5L20 20" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Singkirkan benda lain di sekitar pasir",
    subtitle: "Pastikan tidak ada kotoran atau benda lain di area yang difoto",
    bg: "#EC5A93",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="#fff" strokeWidth="2" />
        <path
          d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"
          stroke="#fff"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Pastikan lensa kamera bersih",
    subtitle: "Lap lensa HP sebelum memfoto agar foto tidak buram",
    bg: "#B39DDB",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="#fff" strokeWidth="2" />
        <path
          d="M12 8l1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2z"
          fill="#fff"
        />
      </svg>
    ),
  },
];

export default function PanduanPage() {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(false);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 16;
    setAtBottom(isAtBottom);
  };

  return (
    <div className={`${styles.screen} fh-fade`}>
      <div className={styles.inner}>
        <svg className={styles.cloud} viewBox="0 0 200 90" aria-hidden="true">
          <ellipse cx="40" cy="50" rx="38" ry="20" fill="#fff" opacity=".55" />
          <ellipse cx="90" cy="35" rx="46" ry="24" fill="#fff" opacity=".7" />
          <ellipse cx="150" cy="55" rx="34" ry="18" fill="#fff" opacity=".5" />
        </svg>

        <h1 className={styles.title}>
          Yuk, Foto
          <br />
          Pasir Kucingmu
        </h1>
        <p className={styles.subtitle}>
          Ikuti langkah ini biar hasil analisis pH-nya akurat, ya.
        </p>

        <div
          ref={listRef}
          onScroll={handleScroll}
          className={`${styles.cardList} hide-scrollbar`}
        >
          {TIPS.map((tip) => (
            <div className={styles.card} key={tip.title}>
              <div className={styles.iconBox} style={{ background: tip.bg }}>
                {tip.icon}
              </div>
              <div>
                <div className={styles.cardTitle}>{tip.title}</div>
                <div className={styles.cardSubtitle}>{tip.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={`${styles.scrollHint} ${atBottom ? styles.hidden : ""}`}>
          <span className={styles.scrollHintText}>
            Scroll ke bawah, lanjut baca panduan
          </span>
          <svg
            className={styles.scrollHintArrow}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="#6b5b7f"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <button className={styles.ctaButton} onClick={() => router.push("/upload")}>
          Saya Mengerti, Lanjut Foto
        </button>
      </div>
    </div>
  );
}
