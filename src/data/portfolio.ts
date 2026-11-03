import type { IconName } from '../components/Icons';

export type GenericToolIconName =
  | "calendar"
  | "code"
  | "message"
  | "sparkles"
  | "table"
  | "workflow";

export type BrandToolIconName =
  | "google-calendar"
  | "apps-script"
  | "gemini"
  | "microsoft-teams";

export type PortfolioToolIcon =
  | { type: "asset"; src: string; fallback: GenericToolIconName }
  | { type: "brand"; name: BrandToolIconName; color: string }
  | { type: "generic"; name: GenericToolIconName };

export type PortfolioTool = {
  name: string;
  icon: PortfolioToolIcon;
};

export type WhatIDoItem = {
  title: string;
  description: string;
  icon: IconName;
};

export type PortfolioProject = {
  id: number;
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  link?: string;
  linkLabel?: string;
  demoUrl?: string;
};

export type ServiceItem = {
  number: string;
  title: string;
  summary: string;
  description: string;
  icon: IconName;
};

export type ApproachItem = {
  title: string;
  description: string;
};

export type TimelineItem = {
  period: string;
  title: string;
  text: string;
  icon: IconName;
};

export type BringItem = {
  title: string;
  description: string;
  icon: IconName;
};

export type ProfileData = {
  name: string;
  studioLine: string;
  headline: string;
  headlineAccent: string;
  subtext: string;
  portrait: string;
};

const tools: PortfolioTool[] = [
  {
    name: "Google Calendar",
    icon: { type: "brand", name: "google-calendar", color: "#4285F4" },
  },
  {
    name: "Apps Script",
    icon: { type: "brand", name: "apps-script", color: "#34A853" },
  },
  {
    name: "Gemini",
    icon: { type: "brand", name: "gemini", color: "#8E75B2" },
  },
  {
    name: "MS Teams",
    icon: { type: "brand", name: "microsoft-teams", color: "#6264A7" },
  },
  {
    name: "SeaTalk",
    icon: { type: "generic", name: "message" },
  },
  {
    name: "Excel",
    icon: { type: "asset", src: "/logos/excel.svg", fallback: "table" },
  },
  {
    name: "Google Sheets",
    icon: { type: "asset", src: "/logos/sheets.svg", fallback: "table" },
  },
  {
    name: "GoHighLevel",
    icon: { type: "asset", src: "/logos/ghl.svg", fallback: "workflow" },
  },
];

const projects: PortfolioProject[] = [
  {
    id: 1,
    tag: "CRM",
    title: "Sechurplets CRM walkthrough",
    description:
      "Animated walkthrough of a lead manager for a single admin: sign in, search leads, change statuses in bulk, and review the audit log. Runs on sample data.",
    highlights: ["Lead management", "Bulk actions", "Audit log"],
    demoUrl: "/projects/sechurplets-crm.html",
  },
  {
    id: 2,
    tag: "Web App",
    title: "Face Login walkthrough",
    description:
      "Animated walkthrough of a webcam login built with Flask: face detection, three-pose enrollment, a refused face, a successful login, and the protected dashboard. Runs on made-up demo data.",
    highlights: ["Webcam login", "Face detection", "Three-pose enrollment"],
    demoUrl: "/projects/face-login-walkthrough.html",
  },
];

const whatIDo: WhatIDoItem[] = [
  {
    title: "Reporting & Analytics",
    description: "Real-time dashboards, workforce reporting, and data insights.",
    icon: "chart",
  },
  {
    title: "Workflow Automation",
    description: "Excel, Google Sheets, and Apps Script tools to save time.",
    icon: "bolt",
  },
  {
    title: "Web & Business Tools",
    description: "Landing pages, CRM setup, and custom web solutions.",
    icon: "globe",
  },
];

const moreWork = ["Automation tools", "Reporting dashboards", "Business web apps"];

const services: ServiceItem[] = [
  {
    number: "01",
    title: "Reporting & Workforce Analytics",
    summary: "Track performance, monitor adherence, and turn data into clear insights.",
    description:
      "Real-time monitoring, adherence tracking, shrinkage analysis, and operational reporting to keep your team on track.",
    icon: "chart",
  },
  {
    number: "02",
    title: "Spreadsheet & Workflow Automation",
    summary: "Streamline workflows with Excel, Google Sheets, and Apps Script.",
    description:
      "Excel, Google Sheets, and Apps Script solutions for automating repetitive tasks, cleaning data, and generating reports.",
    icon: "sheet",
  },
  {
    number: "03",
    title: "Web & Business Systems",
    summary: "Build simple, responsive web tools for your business.",
    description:
      "Landing pages, CRM setup, and scheduling workflows to support your business and operations.",
    icon: "code",
  },
];

const approach: ApproachItem[] = [
  {
    title: "Understand the workflow",
    description: "Learn your goals, processes, and challenges.",
  },
  {
    title: "Build the useful version",
    description: "Develop a solution that fits your needs.",
  },
  {
    title: "Refine with feedback",
    description: "Improve and optimize for better results.",
  },
];

const experience = {
  intro:
    "Real-time workforce analysis, adherence, and shrinkage, with hourly reporting and spreadsheet workflow improvements.",
  timeline: [
    {
      period: "2022 – Present",
      title: "Real-Time Analyst",
      text: "Monitor operations, track adherence, and generate insights for better decisions.",
      icon: "briefcase",
    },
    {
      period: "",
      title: "Excel and Apps Script Automation",
      text: "Build tools and workflows using Excel, Google Sheets, and Apps Script.",
      icon: "gear",
    },
    {
      period: "",
      title: "Web Builder",
      text: "Develop internal tools and landing pages to support business operations.",
      icon: "code",
    },
  ],
  bring: [
    {
      title: "Operational awareness",
      description: "Understand the bigger picture.",
      icon: "chart",
    },
    {
      title: "Reliable reporting",
      description: "Turn data into actionable insights.",
      icon: "shield",
    },
    {
      title: "Process improvement",
      description: "Find better, simpler ways.",
      icon: "bolt",
    },
    {
      title: "Thoughtful tools",
      description: "Automate the repetitive.",
      icon: "code",
    },
  ],
  focusAreas: [
    "Workforce Analytics",
    "Automation & Reporting",
    "Excel & Google Sheets",
    "Web Development",
  ],
  performance: {
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    adherence: [78, 88, 86, 90, 86, 89, 87],
    shrinkage: [38, 46, 40, 49, 46, 49, 53],
  },
};

const about = {
  heading: "I like making messy work",
  headingAccent: "simpler.",
  text:
    "I'm a Real-Time Analyst in the e-commerce BPO industry, with experience tracking attendance, schedule adherence, and shrinkage. I build Excel and Google Sheets reporting tools, learn Apps Script, and develop web tools to automate and improve everyday work.",
  photo: "/images/avatar.png",
  howIWork: [
    {
      title: "Understand the problem",
      description: "I take time to learn the context, the goals, and the real needs.",
    },
    {
      title: "Build for real use",
      description: "I create practical solutions, not just fancy ones.",
    },
    {
      title: "Improve with feedback",
      description: "I refine and iterate to make the solution better over time.",
    },
  ],
  learning: ["Apps Script", "CRM Workflows", "Responsive Web Design"],
};

const contact = {
  email: "",
  facebook: "",
  linkedin: "https://www.linkedin.com/in/kimgayomali/",
  intro:
    "I work with teams that want cleaner reporting, faster workflows, and tools that are easy to keep using.",
  projectTypes: [
    "Reporting dashboard",
    "Automation workflow",
    "CRM setup",
    "Web tool",
    "Custom process improvement",
  ],
};

export const portfolioData = {
  profile: {
    name: "Kim Benedict Gayomali",
    studioLine: "Founder, Sechurplets Studio",
    headline: "I turn operational data into",
    headlineAccent: "tools people can actually use.",
    subtext:
      "Real-Time Analyst and Automation Builder, specializing in workforce analytics, reporting dashboards, and web solutions.",
    portrait: "/images/avatar.png",
  },
  whatIDo,
  projects,
  moreWork,
  services,
  approach,
  experience,
  about,
  contact,
  tools,
  testimonials: [
    {
      quote: "Thanks for alignment yesterday, this is good start, team!",
      attribution: "Operations stakeholder, e-commerce BPO client",
      tag: "Reporting template",
    },
  ],
  results: [
    "Hourly reporting for operations leads",
    "SLA-focused aging case tracking",
    "One-click data cleanup",
  ],
};
