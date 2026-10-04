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
  projects: [
    {
      id: 1,
      title: "Aging Cases Dashboard",
      description:
        "For an e-commerce BPO client: shows updated cases per agent so team leads can spot the most aged cases, push follow-up, and stay within the 24-hour SLA.",
      link: "",
      linkLabel: "",
    },
    {
      id: 2,
      title: "Raw-File-to-Report Excel Template",
      description:
        "Formulas that convert in-house tool extracts into ready-to-send reports.",
      link: "",
      linkLabel: "",
    },
    {
      id: 3,
      title: "Sechurplets Studio Templates",
      description:
        "Seven Apps Script-powered Google Sheets tools: Order Data Cleaner, Shopify Reconciler, Agent Performance Tracker, Multi-Sheet Merge & Dedupe, Auto Report Builder, Global Time Zone Sync Engine, and Full Toolkit Bundle. $24 to $299 on Gumroad.",
      link: "GUMROAD_URL_TODO",
      linkLabel: "Visit Gumroad store",
    },
  ],
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
