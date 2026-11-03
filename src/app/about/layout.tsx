import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the SVNIT Alumni Association, connecting generations of SVNIT and SVRCET graduates, celebrating our collective legacy, and giving back to our alma mater.",
  openGraph: {
    title: "About Us | SVNIT Alumni Association",
    description: "Connecting generations of SVNIT graduates, celebrating our collective legacy, and giving back to our alma mater.",
    url: "https://www.svnitalumniassociation.org/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
