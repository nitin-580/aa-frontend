import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SVNIT Alumni Portal",
  description: "Official SVNIT Alumni Portal for registrations, alumni membership cards, and voting rights in the upcoming Alumni Association Management Committee elections.",
  openGraph: {
    title: "SVNIT Alumni Portal | SVNIT Alumni Association",
    description: "Official SVNIT Alumni Portal for registrations, alumni membership cards, and voting rights.",
    url: "https://www.svnitalumniassociation.org/alumni-portal",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
