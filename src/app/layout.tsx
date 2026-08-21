import type { Metadata } from "next";
import { Dancing_Script, Quicksand, Montserrat } from "next/font/google";
import "./globals.css";
import SimulatedEmailToast from "@/components/common/SimulatedEmailToast";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand-script",
});

const dancing_script = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
});

export const metadata: Metadata = {
  title: "SVNIT Alumni Association Store",
  description: "Official merchandise store of Sardar Vallabhbhai National Institute of Technology Alumni Association",
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${dancing_script.variable} ${quicksand.variable} font-sans antialiased`}
        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
      >
        <CartProvider>
          {children}
        </CartProvider>
        <SimulatedEmailToast />
      </body>
    </html>
  );
}
