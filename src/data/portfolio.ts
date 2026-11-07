import type { IconName } from '../components/Icons';

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
  description: string;
  tags: string[];
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
    title: "Spreadsheet Automation Templates",
    description:
      "Plug-and-play Google Sheets templates that dedupe, standardize, and match messy CSV exports in one click. No formulas or coding needed.",
    tags: ["Order Data Cleaner", "Shopify Reconciler", "Multi-Sheet Merge & Dedupe"],
    icon: "sheet",
  },
  {
    number: "02",
    title: "Reporting & Workforce Analytics",
    description:
      "Turn raw call, chat, and ticket logs into clean scorecards and share-ready reports, shaped by hands-on Real-Time Analyst experience.",
    tags: ["Agent Performance Tracker", "Auto Report Builder", "SLA & adherence reporting"],
    icon: "chart",
  },
  {
    number: "03",
    title: "Custom Automation & Setup Support",
    description:
      "Have an unusual export layout or a repetitive routine? I adapt the mapping or build a custom workflow your team can run without training.",
    tags: ["Input mapping", "Custom Apps Script", "Setup guidance"],
    icon: "bolt",
  },
  {
    number: "04",
    title: "Web & Business Systems",
    description:
      "Responsive landing pages, CRM setup, and scheduling workflows that support your business and operations.",
    tags: ["Landing pages", "CRM setup", "Scheduling workflows"],
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
  photo: "/images/about-photo.webp",
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
    portrait: "/images/hero-portrait.webp",
  },
  whatIDo,
  projects,
  moreWork,
  services,
  approach,
  experience,
  about,
  contact,
  testimonials: [
    {
      quote:
        "I'm on off and I didn't see the message. Thank God you managed the SLA, otherwise gone.",
      attribution: "Subject Matter Expert, e-commerce client",
      tag: "SLA protection",
    },
    {
      quote:
        "I've already huddled with the agents on what needs to be done. Today we successfully managed it. Thank you so much.",
      attribution: "Subject Matter Expert, e-commerce client",
      tag: "Real-time coordination",
    },
    {
      quote:
        "We use these templates to handle our core weekly reports now. Tasks that forced our operations team to waste half a day are fully resolved in under three minutes.",
      attribution: "Operations Lead, E-commerce Logistics Team",
      tag: "Weekly reports",
    },
    {
      quote:
        "Our managers review store performance metrics directly from the automated output dashboard. We no longer waste time hunting down broken formatting cells before meetings.",
      attribution: "Operations Director, Multi-Store Shopify Brand",
      tag: "Dashboard output",
    },
  ],
};
