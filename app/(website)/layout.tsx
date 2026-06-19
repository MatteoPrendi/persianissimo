import {
  Inter,
  Merriweather,
  Noto_Naskh_Arabic,
  Vazirmatn,
} from "next/font/google";
import "@/app/(website)/global.css";

import Header from "@/components/header";
import Footer from "@/components/footer";

import { getCurrentLocale } from "@/utils/locale";
import React from "react";

const latinSans = Inter({ variable: "--latin-sans", subsets: ["latin"] });
const latinSerif = Merriweather({
  variable: "--latin-serif",
  subsets: ["latin"],
});
const persianSerif = Noto_Naskh_Arabic({
  variable: "--persian-serif",
  subsets: ["arabic"],
});
const persianSans = Vazirmatn({
  variable: "--persian-sans",
  subsets: ["arabic"],
});

interface Props {
  readonly children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const lang = await getCurrentLocale();
  const isFarsi = lang === "fa";

  const activeSans = isFarsi ? persianSans : latinSans;
  const activeSerif = isFarsi ? persianSerif : latinSerif;

  return (
    <html
      lang={lang}
      dir={isFarsi ? "rtl" : "ltr"}
      className={`${activeSans.variable} ${activeSerif.variable}`}
      style={
        {
          "--font-sans": isFarsi ? "var(--persian-sans)" : "var(--latin-sans)",
          "--font-serif": isFarsi
            ? "var(--persian-serif)"
            : "var(--latin-serif)",
        } as React.CSSProperties
      }
    >
      <body className="text-foreground bg-background">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
