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
  icon: IconName;
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
    description: "I learn your goals, existing processes, and operational challenges.",
    icon: "expand",
  },
  {
    title: "Plan the right solution",
    description: "I define requirements, set priorities, and plan the best approach.",
    icon: "check",
  },
  {
    title: "Build and validate",
    description: "I develop the solution incrementally, test its functionality, and verify results.",
    icon: "code",
  },
  {
    title: "Refine and improve",
    description: "I review feedback, make improvements, and ensure long-term value.",
    icon: "trending",
  },
];

const experience = {
  intro:
    "I currently work as a Real-Time Analyst at Inspiro, monitoring schedule adherence and intraday performance, coordinating staffing adjustments with operations, and supporting SLA targets.",
  timeline: [
    {
      period: "July 2024 – Present",
      title: "Real-Time Analyst (Workforce Management)",
      text: "At Inspiro, monitor schedule adherence and intraday performance, coordinate staffing adjustments with operations, and support SLA targets.",
      icon: "briefcase",
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
    "Business Process Automation",
    "CRM Automation",
    "CRM Software",
    "Microsoft Excel",
    "Workforce Management",
    "HTML",
    "JavaScript",
    "Web Development",
    "Dashboard",
    "Business Intelligence",
    "Web Application",
    "Automated Workflow",
    "Data Analysis",
    "Process Improvement",
    "AI App Development",
    "OpenCV",
    "Full-Stack Development",
    "SQLite",
  ],
  performance: {
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    adherence: [78, 88, 86, 90, 86, 89, 87],
    shrinkage: [38, 46, 40, 49, 46, 49, 53],
  },
};

const aboutIntro =
  "I'm an AI-Assisted Full-Stack Developer with a background in Workforce Management, business operations, and process optimization.";
const aboutParagraphs = [
  "I build web applications, business dashboards, internal tools, CRM systems, and workflow automation solutions using modern development practices and AI-assisted coding tools. My experience as a Real-Time Analyst at Inspiro gives me practical insight into real business operations and the challenges organizations face.",
  "I use AI development assistants such as Claude and GitHub Copilot for software planning, coding, debugging, and development workflows, alongside critical thinking and proper testing. I also develop independent projects exploring technology, automation, and artificial intelligence, and I'm open to selected freelance, part-time, and project-based collaborations.",
];

const about = {
  heading: "I like making messy work",
  headingAccent: "simpler.",
  intro: aboutIntro,
  paragraphs: aboutParagraphs,
  workingPhilosophy:
    "Understand the problem, develop a practical solution, execute with structure, validate the results, and continuously improve.",
  text: [aboutIntro, ...aboutParagraphs].join(" "),
  skills: [
    "Workforce management",
    "Dashboards",
    "CRM systems",
    "Workflow automation",
    "AI-assisted development",
  ],
  photo: "/images/784db55f-efa8-403c-89a9-f09ff212016f.jfif",
  learning: ["Apps Script", "CRM Workflows", "Responsive Web Design"],
};

const contact = {
  email: "sechurplets.studio@outlook.com",
  facebook: "",
  github: "https://github.com/gayomalikimbenedict-web",
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
    studioLine: "AI-Assisted Full-Stack Developer",
    headline: "Web applications, business dashboards &",
    headlineAccent: "workflow automation.",
    subtext:
      "I build web applications, business dashboards, internal tools, and workflow automation solutions using modern development practices and AI-assisted coding tools. Open to selected freelance and part-time projects.",
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
