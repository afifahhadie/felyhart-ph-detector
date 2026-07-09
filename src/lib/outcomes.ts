export type Outcome = {
  key: "normal" | "waspada" | "bahaya";
  ph: string;
  label: string;
  desc: string;
  explain: string;
  advice: string[];
  vetNote: string;
  color: string;
  bg: string;
  emoji: string;
};

export const OUTCOMES: Outcome[] = [
  {
    key: "normal",
    ph: "6.3",
    label: "Normal",
    desc: "pH urine dalam rentang sehat untuk kucing dewasa.",
    explain:
      "pH 6.0–6.5 adalah rentang ideal untuk kucing dewasa yang sehat. Ini menandakan sistem urinari bekerja dengan baik.",
    advice: [
      "Tetap sediakan air minum segar setiap hari",
      "Pertahankan pola makan saat ini",
      "Cek ulang secara berkala, minimal 1x/bulan",
    ],
    vetNote: "Belum perlu ke dokter hewan — lanjutkan pemantauan rutin.",
    color: "#4FAE8C",
    bg: "#E3F5EE",
    emoji: "🟢",
  },
  {
    key: "waspada",
    ph: "7.8",
    label: "Waspada",
    desc: "Urine cenderung basa (alkaline) — perlu diperhatikan.",
    explain:
      "pH di atas 7.0 dapat meningkatkan risiko pembentukan kristal struvite pada saluran kemih kucing.",
    advice: [
      "Tingkatkan asupan air minum kucing",
      "Pertimbangkan makanan dengan formula urinary care",
      "Amati tanda lain seperti sering ke litter box",
    ],
    vetNote: "Jadwalkan kunjungan ke dokter hewan dalam 1–2 minggu.",
    color: "#C98A22",
    bg: "#FBF0DD",
    emoji: "🟡",
  },
  {
    key: "bahaya",
    ph: "8.6",
    label: "Bahaya",
    desc: "pH urine sangat basa — berpotensi gangguan saluran kemih.",
    explain:
      "pH setinggi ini sering dikaitkan dengan infeksi saluran kemih (UTI) atau kristal struvite yang sudah terbentuk.",
    advice: [
      "Segera hubungi dokter hewan",
      "Amati tanda darurat: sulit buang air kecil, rewel, atau tidak nafsu makan",
      "Jangan tunda — kondisi ini bisa memburuk cepat",
    ],
    vetNote: "Segera periksakan ke dokter hewan dalam 24 jam.",
    color: "#D3556B",
    bg: "#FBE3E8",
    emoji: "🔴",
  },
];

export function phToPct(ph: string): number {
  const v = ((parseFloat(ph) - 5) / 4) * 100;
  return Math.max(2, Math.min(98, v));
}

export function pickRandomOutcome(): Outcome {
  return OUTCOMES[Math.floor(Math.random() * OUTCOMES.length)];
}
