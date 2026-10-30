export interface AccoladeGroup {
  group: string;
  categories: string[];
}

export const ACCOLADE_GROUPS: AccoladeGroup[] = [
  {
    group: "A — Contribution to Society",
    categories: [
      "1. Social Impact & Community Service",
      "2. Environment, Sustainability & Climate Action",
      "3. Humanitarian & Disaster Relief",
      "4. Public Service & Policy Leadership",
    ],
  },
  {
    group: "B — Contribution to the Alumni Association",
    categories: [
      "5. Alumni Engagement & Chapter Building",
      "6. Alumni Networking & Mentorship",
      "7. Development & Philanthropy",
    ],
  },
  {
    group: "C — Contribution to SVNIT/SVRCET",
    categories: [
      "8. Industry-Academia Collaboration",
      "9. Institute Branding & Global Representation",
    ],
  },
  {
    group: "D — Welfare of Students",
    categories: [
      "10. Student Mentorship & Career Support",
      "11. Scholarships & Student Financial Aid",
      "12. Global Opportunity Enablement",
    ],
  },
  {
    group: "E — Entrepreneurship & Leadership",
    categories: [
      "13. Entrepreneurship & Business Leadership",
      "14. Innovation, Research & Technology Leadership",
      "15. Young Achiever (under 40)",
      "16. Senior Achiever (40–60)",
    ],
  },
];

export const ALL_CATEGORIES = ACCOLADE_GROUPS.flatMap((g) => g.categories);

export interface AnnexureItem {
  key: string;
  title: string;
  description: string;
}

export const ANNEXURES: AnnexureItem[] = [
  {
    key: "annexure1",
    title: "Annexure 1 — Work Experience",
    description: "Your work experience, starting from the date of graduation till date.",
  },
  {
    key: "annexure2",
    title: "Annexure 2 — Impact of SVRCET/SVNIT",
    description: "A brief on how your stay at SVRCET/SVNIT helped in building your business / professional career and social status.",
  },
  {
    key: "annexure3",
    title: "Annexure 3 — Contribution to Society",
    description: "Your contribution to society and social achievements / recognitions.",
  },
  {
    key: "annexure4",
    title: "Annexure 4 — Alumni Activities",
    description: "Your contribution to alumni activities of SVNIT Alumni Association.",
  },
  {
    key: "annexure5",
    title: "Annexure 5 — Contribution to SVNIT",
    description: "Your contribution to SVNIT.",
  },
  {
    key: "annexure6",
    title: "Annexure 6 — Student Welfare",
    description: "A brief on your efforts for welfare of students of SVRCET/SVNIT.",
  },
  {
    key: "annexure7",
    title: "Annexure 7 — Future Support",
    description: "A brief on how, in future, you intend to extend your contribution and support alumni activities, SVNIT and its students.",
  },
];

export const ANNEXURE_ADDITIONAL: AnnexureItem = {
  key: "annexure8",
  title: "Annexure 8 — Additional Evidence",
  description: "Additional evidence to support the nomination as per the category selected. Add as many evidences as possible (up to 10 files).",
};

export const ELIGIBILITY_RULES = [
  "Nominations are invited from alumni of SVNIT / SVRCET in the prescribed format.",
  "The nomination shall be proposed and seconded by two different alumni.",
  "Current members of the managing committee of SVNITAA are not eligible to file nominations.",
  "Self nominations shall not be accepted.",
  "Alumni currently employed by SVNIT are not eligible to file nominations.",
  "Past recipients of the Distinguished Alumnus Accolade from SVNIT shall not file nominations for the ACE Alumnus Accolade.",
  "All relevant proofs shall be submitted with the application as evidence of the work supporting the claim.",
];

export const SELECTION_CRITERIA = [
  "Contribution to society in general",
  "Contribution to SVNIT Alumni Association",
  "Contribution to SVNIT",
  "Contribution to welfare of SVNIT students",
  "Entrepreneurship and leadership shown in society, profession or business",
];

export const KEY_DATES = [
  {
    date: "25 November 2026",
    label: "Last date for receipt of duly filled and signed nominations",
  },
  {
    date: "26 December 2026",
    label: "Recipient announced at the Global Annual Alumni Convention, and the Accolade is given in person",
  },
];

export const COMMITTEE_MEMBERS = [
  "President, SVNIT Alumni Association (Ex Officio)",
  "Secretary, SVNIT Alumni Association (Ex Officio)",
  "Coordinator, ACE Alumnus Accolade (Alumni)",
];

export const OFFICIAL_EMAILS = [
  "mail@svnitalumni.com",
  "ranjetsinha@gmail.com",
  "omcon.tushar@gmail.com",
];

export const DIGNITARIES = "Coordinator, ACE Alumnus Accolade 2026 · Ranjit Sinha, President · Tushar Mehta, Hon. Secretary";
