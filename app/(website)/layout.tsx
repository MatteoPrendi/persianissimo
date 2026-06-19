import { Inter, Merriweather } from "next/font/google";
import "@/app/(website)/global.css";

import Header from "@/components/header";
import Footer from "@/components/footer";

import { getCurrentLocale } from "@/utils/locale";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const serif = Merriweather({ variable: "--font-serif", subsets: ["latin"] });

interface Props {
  readonly children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const lang = await getCurrentLocale();

  return (
    <html lang={lang} className={`${sans.variable} ${serif.variable}`}>
      <body className="text-foreground bg-background">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
