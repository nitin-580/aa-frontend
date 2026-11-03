import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ACE Alumnus Accolade 2026",
  description: "Official Notice Inviting Nominations for ACE Alumnus Accolade 2026. Recognizing distinguished achievements and enduring contributions of alumni.",
  openGraph: {
    title: "ACE Alumnus Accolade 2026 | SVNIT Alumni Association",
    description: "Official Notice Inviting Nominations for ACE Alumnus Accolade 2026. Conferred in person at the Global Alumni Convention at SVNIT Surat.",
    url: "https://www.svnitalumniassociation.org/ace-alumni-accolade",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
