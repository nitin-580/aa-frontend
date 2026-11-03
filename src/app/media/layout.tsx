import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media & Photo Gallery",
  description: "Relive cherished memories from milestone jubilee reunions, convention fulfillments, and official merchandise deliveries at SVNIT Surat.",
  openGraph: {
    title: "Media & Photo Gallery | SVNIT Alumni Association",
    description: "Official SVNIT Alumni Association photo gallery, YouTube short previews, and Instagram reels.",
    url: "https://www.svnitalumniassociation.org/media",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
