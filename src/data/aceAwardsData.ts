export interface AccoladeCategoryDetail {
  number: number;
  title: string;
  description: string;
}

export interface AccoladeGroupDetail {
  groupCode: string;
  groupTitle: string;
  categories: AccoladeCategoryDetail[];
}

export const ACCOLADE_DETAILED_GROUPS: AccoladeGroupDetail[] = [
  {
    groupCode: "A",
    groupTitle: "Contribution to Society",
    categories: [
      {
        number: 1,
        title: "Social Impact & Community Service",
        description: "Sustained work in education, health, livelihoods, rural development or poverty alleviation, in any country.",
      },
      {
        number: 2,
        title: "Environment, Sustainability & Climate Action",
        description: "Green technology, conservation, clean energy and sustainable practices.",
      },
      {
        number: 3,
        title: "Humanitarian & Disaster Relief",
        description: "Work in emergencies, refugee support, public health crises and rebuilding efforts.",
      },
      {
        number: 4,
        title: "Public Service & Policy Leadership",
        description: "Contributions through government, civil services, public institutions, policy advocacy or multilateral bodies.",
      },
    ],
  },
  {
    groupCode: "B",
    groupTitle: "Contribution to the Alumni Association",
    categories: [
      {
        number: 5,
        title: "Alumni Engagement & Chapter Building",
        description: "Starting or running city, regional or country alumni chapters, especially outside India.",
      },
      {
        number: 6,
        title: "Alumni Networking & Mentorship",
        description: "Building professional networks, running career guidance programs and mentoring fellow alumni.",
      },
      {
        number: 7,
        title: "Development & Philanthropy",
        description: "Scholarships, donations towards infrastructure development initiatives by the Alumni Association, and fundraising for the Alumni Association.",
      },
    ],
  },
  {
    groupCode: "C",
    groupTitle: "Contribution to SVNIT/SVRCET",
    categories: [
      {
        number: 8,
        title: "Industry-Academia Collaboration",
        description: "Internships, placements, research partnerships, joint projects, guest lectures and curriculum input.",
      },
      {
        number: 9,
        title: "Institute Branding & Global Representation",
        description: "Raising the institute’s global visibility and reputation, and facilitating international linkages, MoUs and exchange programs.",
      },
    ],
  },
  {
    groupCode: "D",
    groupTitle: "Welfare of Students",
    categories: [
      {
        number: 10,
        title: "Student Mentorship & Career Support",
        description: "Placement help, mentoring, skill workshops and interview preparation.",
      },
      {
        number: 11,
        title: "Scholarships & Student Financial Aid",
        description: "Funding, crowd-funding and support for meritorious or economically weaker students.",
      },
      {
        number: 12,
        title: "Global Opportunity Enablement",
        description: "Helping students with higher studies, research positions, jobs and visas abroad.",
      },
    ],
  },
  {
    groupCode: "E",
    groupTitle: "Entrepreneurship & Leadership",
    categories: [
      {
        number: 13,
        title: "Entrepreneurship & Business Leadership",
        description: "Building ventures, start-ups, creating jobs, scaling businesses, and corporate or professional leadership.",
      },
      {
        number: 14,
        title: "Innovation, Research & Technology Leadership",
        description: "Patents, breakthrough products, research impact and deep-tech contributions.",
      },
      {
        number: 15,
        title: "Young Achiever (under 40)",
        description: "Early-career alumni with exceptional impact in any of the above areas, which broadens participation.",
      },
      {
        number: 16,
        title: "Senior Achiever (under 40-60)",
        description: "Advance-career alumni with exceptional impact in any of the above areas, which broadens participation.",
      },
    ],
  },
];

export interface AccoladeGroup {
  group: string;
  categories: string[];
}

export const ACCOLADE_GROUPS: AccoladeGroup[] = ACCOLADE_DETAILED_GROUPS.map((g) => ({
  group: `${g.groupCode} — ${g.groupTitle}`,
  categories: g.categories.map((c) => `${c.number}. ${c.title}`),
}));

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
    description: "A brief on your efforts for the welfare of students of SVRCET/SVNIT.",
  },
  {
    key: "annexure7",
    title: "Annexure 7 — Future Support",
    description: "A brief on how, in future, you intend to extend your contribution and support to alumni activities, SVNIT and its students.",
  },
];

export const ANNEXURE_ADDITIONAL: AnnexureItem = {
  key: "annexure8",
  title: "Annexure 8 — Additional Evidence",
  description: "Additional evidence(s) to support the nomination as per the category selected. Please add more evidence to support the nomination.",
};

export const ALL_ANNEXURES = [...ANNEXURES, ANNEXURE_ADDITIONAL];

export const ELIGIBILITY_RULES = [
  "Nominations are invited from alumni of SVNIT / SVRCET in the prescribed format.",
  "The nomination shall be proposed and supported by two different alumni.",
  "Self-nominations shall not be accepted.",
  "Current members of the managing committee of SVNITAA are not eligible to file a nomination for AAA.",
  "Alumni who are currently employed by SVNIT are not eligible to file nominations.",
  "Past recipients of the Distinguished Alumnus Accolade from SVNIT shall not file nominations for the Ace Alumnus Accolade.",
  "All relevant proofs shall be submitted with the application as evidence of the work and in support of the claim.",
];

export const SELECTION_CRITERIA = [
  "Contribution to the Society in general",
  "Contribution to SVNIT Alumni Association",
  "Contribution to SVNIT",
  "Contribution to the welfare of SVNIT students",
  "Entrepreneurship and leadership quality exhibited in society, profession, business, etc.",
];

export const KEY_DATES = [
  {
    date: "25 November 2026",
    label: "Last date for nomination (Last date of receipt of duly filled and signed nominations)",
    badge: "Closing Date",
  },
  {
    date: "26 December 2026",
    label: "Global Alumni Convention: Accolade announced and presented in person",
    badge: "Convention Day",
  },
  {
    date: "In Person",
    label: "Recipient must be present physically on Global Convention Day to receive the Accolade",
    badge: "Requirement",
  },
];

export interface CommitteeOfficer {
  name: string;
  role: string;
  designation: string;
}

export const COMMITTEE_OFFICERS: CommitteeOfficer[] = [
  {
    name: "Akshay Pachchigar",
    role: "Coordinator",
    designation: "Ace Alumnus Accolade 2026 (Alumni)",
  },
  {
    name: "Tushar Mehta",
    role: "Hon. Secretary",
    designation: "SVNIT Alumni Association (Ex Officio)",
  },
  {
    name: "Ranjit Sinha",
    role: "President",
    designation: "SVNIT Alumni Association (Ex Officio)",
  },
];

export const COMMITTEE_MEMBERS = [
  "President, SVNIT Alumni Association (Ex Officio)",
  "Hon. Secretary, SVNIT Alumni Association (Ex Officio)",
  "Coordinator, Ace Alumnus Accolade 2026 (Alumni)",
];

export const OFFICIAL_EMAILS = [
  "mail@svnitalumni.com",
  "ranjetsinha@gmail.com",
  "omcon.tushar@gmail.com",
];

export const POSTAL_ADDRESS = {
  recipient: "The Secretary",
  organization: "SVNIT Alumni Association",
  institute: "Sardar Vallabhbhai National Institute of Technology (SVNIT)",
  locality: "Ichchanath",
  city: "Surat",
  pincode: "395007",
  state: "Gujarat, India",
};

export const DIGNITARIES =
  "(Akshay Pachchigar) Coordinator, AAA 2026 · (Tushar Mehta) Hon. Secretary, SVNITAA · (Ranjit Sinha) President, SVNITAA";

export interface CircularSignatory {
  name: string;
  designation: string;
  email: string;
}

export interface RegistrationDriveCircular {
  title: string;
  subtitle: string;
  driveViewUrl: string;
  drivePreviewUrl: string;
  pdfDownloadUrl: string;
  imageUrl: string;
  portalUrl: string;
  decisionDate: string;
  candidateDeadline: string;
  voterDeadline: string;
  signatories: CircularSignatory[];
}

export const REGISTRATION_DRIVE_CIRCULAR: RegistrationDriveCircular = {
  title: "SVNIT Alumni Registration Drive on Portal",
  subtitle:
    "Mandatory for Voting in Upcoming SVNIT Alumni Association Management Committee Election & Nomination Rights",
  driveViewUrl:
    "https://drive.google.com/file/d/1leBxndbwCLEs8V6nC30KnEn6ML_8GPhy/view?usp=sharing",
  drivePreviewUrl:
    "https://drive.google.com/file/d/1leBxndbwCLEs8V6nC30KnEn6ML_8GPhy/preview",
  pdfDownloadUrl: "/downloads/SVNIT_Alumni_Registration_Drive.pdf",
  imageUrl: "/images/circulars/alumni_registration_drive_notice.png",
  portalUrl: "https://alumniportal.svnit.ac.in/",
  decisionDate: "23rd October 2026",
  candidateDeadline: "15th November 2026",
  voterDeadline: "30th November 2026",
  signatories: [
    {
      name: "Prof. Upena Dalal",
      designation: "Dean - Alumni and RG",
      email: "dean_arg@svnit.ac.in",
    },
    {
      name: "Er. Ranjit Sinha",
      designation: "President - SVNIT Alumni Association",
      email: "ranjetsinha@gmail.com",
    },
  ],
};
