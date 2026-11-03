import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact the SVNIT Alumni Association office at the SVNIT Campus, Surat. Connect with us for alumni queries, convention registration, and support.",
  openGraph: {
    title: "Contact Us | SVNIT Alumni Association",
    description: "Contact the SVNIT Alumni Association office at the SVNIT Campus, Surat.",
    url: "https://www.svnitalumniassociation.org/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
