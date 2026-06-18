import { Inter, Merriweather } from "next/font/google";
import "@/app/(website)/global.css";

import Header from "@/components/header";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const serif = Merriweather({ variable: "--font-serif", subsets: ["latin"] });

interface Props {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={sans.variable + " " + serif.variable}>
      <body className="text-foreground bg-background">
        <Header />
        {children}
      </body>
    </html>
  );
}
