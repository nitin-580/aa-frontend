import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements & Circulars",
  description: "Official bulletin board for SVNIT Alumni Association announcements, convention notices, voting drives, and committee circulars.",
  openGraph: {
    title: "Announcements & Circulars | SVNIT Alumni Association",
    description: "Official bulletin board for SVNIT Alumni Association announcements, convention notices, voting drives, and committee circulars.",
    url: "https://www.svnitalumniassociation.org/announcements",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
