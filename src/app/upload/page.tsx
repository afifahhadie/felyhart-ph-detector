"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAnalysis } from "@/lib/analysis-context";
import { resizeImage } from "@/lib/resize-image";
import styles from "./upload.module.css";

export default function UploadPage() {
  const router = useRouter();
  const { photo, setPhoto } = useAnalysis();
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    const dataUrl = await resizeImage(file);
    setPhoto(dataUrl);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className={`${styles.screen} fh-fade`}>
      <div className={styles.inner}>
        <button className={styles.backButton} onClick={() => router.push("/")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="#3A2E4D"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Kembali
        </button>

        <h1 className={styles.title}>Unggah Foto Pasir</h1>
        <p className={styles.subtitle}>Pastikan sudah sesuai panduan sebelumnya ya!</p>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => handleFile(e.target.files?.[0])}
          className={styles.hiddenInput}
        />
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={cameraInputRef}
          onChange={(e) => handleFile(e.target.files?.[0])}
          className={styles.hiddenInput}
        />

        {!photo ? (
          <div
            className={`${styles.dropzone} ${dragOver ? styles.dragOver : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragOver(false);
            }}
            onDrop={handleDrop}
          >
            <div className={styles.dropIconCircle}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 8a2 2 0 0 1 2-2h1.5l1-2h7l1 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="13" r="3.5" stroke="#fff" strokeWidth="2" />
              </svg>
            </div>
            <div className={styles.dropTitle}>Ambil atau unggah foto pasir</div>
            <div className={styles.dropSubtitle}>JPG, PNG — maks 10MB</div>
            <div className={styles.dropActions}>
              <button
                className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                onClick={() => cameraInputRef.current?.click()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 8a2 2 0 0 1 2-2h1.5l1-2h7l1 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="13" r="3.5" stroke="#fff" strokeWidth="2" />
                </svg>
                Ambil Foto
              </button>
              <button
                className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="#B39DDB" strokeWidth="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="#B39DDB" />
                  <path
                    d="M21 15l-5-5L5 21"
                    stroke="#B39DDB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Pilih dari Galeri
              </button>
            </div>
            <div className={styles.dropHint}>atau seret foto ke sini</div>
          </div>
        ) : (
          <div className={styles.previewCard}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="Preview pasir kucing" className={styles.previewImage} />
            <div className={styles.previewFooter}>
              <span className={styles.previewLabel}>Foto siap dianalisis ✓</span>
              <button
                className={styles.changePhotoButton}
                onClick={() => fileInputRef.current?.click()}
              >
                Ganti Foto
              </button>
            </div>
          </div>
        )}

        <div className={styles.spacer} />
        <button
          className={`${styles.analyzeButton} ${
            photo ? styles.analyzeButtonEnabled : styles.analyzeButtonDisabled
          }`}
          disabled={!photo}
          onClick={() => router.push("/loading")}
        >
          Analisis Sekarang
        </button>
      </div>
    </div>
  );
}
