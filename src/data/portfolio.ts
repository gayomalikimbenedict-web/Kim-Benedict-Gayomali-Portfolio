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

export type PortfolioProject = {
  id: number;
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
  demoUrl?: string;
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
    title: "Sechurplets CRM walkthrough",
    description:
      "Animated walkthrough of a lead manager for a single admin: sign in, search leads, change statuses in bulk, and review the audit log. Runs on sample data.",
    demoUrl: "/projects/sechurplets-crm.html",
  },
  {
    id: 2,
    title: "Face Login walkthrough",
    description:
      "Animated walkthrough of a webcam login built with Flask: face detection, three-pose enrollment, a refused face, a successful login, and the protected dashboard. Runs on made-up demo data.",
    demoUrl: "/projects/face-login-walkthrough.html",
  },
];

export const portfolioData = {
  profile: {
    name: "Kim Benedict Gayomali",
    studioLine: "Founder, Sechurplets Studio",
    headline: "Turn raw data into decisions, automatically.",
    subtext:
      "Workforce analyst and automation builder. I turn messy exports into live dashboards, one-click Excel and Sheets tools, and reports teams act on.",
  },
  roles: [
    "Real-Time Analyst (WFM)",
    "Excel and Apps Script Automation",
    "Web Builder",
  ],
  about:
    "I'm a Real-Time Analyst in the e-commerce BPO industry, with two years of tracking attendance, schedule adherence and shrinkage, and reporting hourly to operations leads. I build Excel templates and Google Sheets tools that turn raw exports from in-house systems into report-ready output in one click. Outside work, I'm learning GoHighLevel (CRM, scheduling automation, Google Sheets and Calendar integrations) and building websites with AI assistance.",
  projects,
  services: [
    "Excel and Sheets automation",
    "Reporting dashboards",
    "Workforce and adherence reporting",
    "Apps Script tools",
    "Landing pages",
    "GHL scheduling and CRM setup (in practice)",
  ],
  tools,
  credentials: [
    {
      title: "Excel and Copilot Fundamentals",
      issuer: "Microsoft via Coursera",
      date: "Feb 4, 2026",
    },
    {
      title: "Workforce Planning Fundamentals",
      issuer: "Elevify (TESDA guidelines)",
      date: "Mar 5, 2026",
    },
  ],
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
  contact: {
    email: "EMAIL_TODO",
    linkedin: "LINKEDIN_TODO",
    facebook: "FACEBOOK_TODO",
  },
};
