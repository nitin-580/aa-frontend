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
  metadataBase: new URL("https://www.svnitalumniassociation.org"),
  title: {
    default: "SVNIT Alumni Association",
    template: "%s | SVNIT Alumni Association",
  },
  description: "Welcome to the official portal of the Sardar Vallabhbhai National Institute of Technology Alumni Association. Stay Connected. Stay Inspired. Stay SVNIT.",
  applicationName: "SVNIT Alumni Association",
  authors: [{ name: "SVNIT Alumni Association" }],
  creator: "SVNIT Alumni Association",
  publisher: "SVNIT Alumni Association",
  keywords: [
    "SVNIT Alumni Association",
    "SVNIT",
    "SVRCET",
    "Sardar Vallabhbhai National Institute of Technology",
    "Surat",
    "Alumni Portal",
    "ACE Alumnus Accolade"
  ],
  icons: {
    icon: "/logo/logowithoutbg.png",
    shortcut: "/logo/logowithoutbg.png",
    apple: "/logo/logowithoutbg.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.svnitalumniassociation.org",
    siteName: "SVNIT Alumni Association",
    title: "SVNIT Alumni Association | Official Portal",
    description: "Welcome to the official portal of Sardar Vallabhbhai National Institute of Technology Alumni Association. Stay Connected. Stay Inspired. Stay SVNIT.",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "SVNIT Alumni Association - Stay Connected. Stay Inspired. Stay SVNIT.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SVNIT Alumni Association | Official Portal",
    description: "Welcome to the official portal of Sardar Vallabhbhai National Institute of Technology Alumni Association. Stay Connected. Stay Inspired. Stay SVNIT.",
    images: ["/images/og-preview.png"],
  },
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
