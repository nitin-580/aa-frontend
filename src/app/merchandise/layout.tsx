import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Merchandise",
  description: "Official SVNIT Alumni Association merchandise: premium apparel, executive diaries, keepsakes, and heritage souvenirs representing SVNIT Surat.",
  openGraph: {
    title: "Official Merchandise | SVNIT Alumni Association",
    description: "Official SVNIT Alumni Association merchandise: premium apparel, executive diaries, keepsakes, and heritage souvenirs representing SVNIT Surat.",
    url: "https://www.svnitalumniassociation.org/merchandise",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
