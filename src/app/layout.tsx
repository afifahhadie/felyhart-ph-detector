import type { Metadata } from "next";
import { Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import { AnalysisProvider } from "@/lib/analysis-context";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Felyhart pH Detector",
  description:
    "Cek kondisi kesehatan kucingmu dengan menganalisis warna pasir kucing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fredoka.variable} ${jakarta.variable}`}>
      <body>
        <AnalysisProvider>{children}</AnalysisProvider>
      </body>
    </html>
  );
}
