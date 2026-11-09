/** Everything the site says lives here. Components only display it. */

export const profile = {
  name: 'Kim Benedict Gayomali',
  brand: 'Sechurplets Studio',
  role: 'AI-Assisted Full-Stack Developer',
  email: 'sechurplets.studio@outlook.com',
  location: 'Iloilo City, Philippines',
  linkedin: 'https://www.linkedin.com/in/kimgayomali/',
  github: 'https://github.com/gayomalikimbenedict-web',
  resume: '/Kim_Benedict_Gayomali_Resume.pdf',
} as const

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'How I work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

export const sectionIds: readonly string[] = sections.map((section) => section.id)

export const hero = {
  headlineStart: 'Web applications, business dashboards & ',
  headlineEmphasis: 'workflow automation.',
  sub: 'I build web applications, business dashboards, internal tools, and workflow automation solutions using modern development practices and AI-assisted coding tools. Open to selected freelance and part-time projects.',
  facts: [
    { title: 'Real-Time Analyst', note: 'Inspiro, since July 2024' },
    { title: 'Workforce Management', note: 'background' },
    { title: 'Claude + GitHub Copilot', note: 'in my workflow' },
  ],
  chips: [
    { id: 'a', title: 'Reporting & Analytics', note: 'Real-time dashboards and data insights' },
    { id: 'b', title: 'Workflow Automation', note: 'Excel, Google Sheets, Apps Script' },
    { id: 'c', title: 'Web & Business Tools', note: 'Landing pages, CRM setup' },
  ],
}

export type Service = { id: string; title: string; summary: string; tags: string[] }

export const servicesIntro = {
  title: 'What I can build for you.',
  lede: 'Spreadsheet automation, workforce reporting, custom setup support, and web and business systems. Pick one or combine them.',
}

export const services: Service[] = [
  {
    id: 'templates',
    title: 'Spreadsheet Automation Templates',
    summary:
      'Plug-and-play Google Sheets templates that dedupe, standardize, and match messy CSV exports in one click. No formulas or coding needed.',
    tags: ['Order Data Cleaner', 'Shopify Reconciler', 'Multi-Sheet Merge & Dedupe'],
  },
  {
    id: 'reporting',
    title: 'Reporting & Workforce Analytics',
    summary:
      'Turn raw call, chat, and ticket logs into clean scorecards and share-ready reports, shaped by hands-on Real-Time Analyst experience.',
    tags: ['Agent Performance Tracker', 'Auto Report Builder', 'SLA & adherence reporting'],
  },
  {
    id: 'custom',
    title: 'Custom Automation & Setup Support',
    summary:
      'Have an unusual export layout or a repetitive routine? I adapt the mapping or build a custom workflow your team can run without training.',
    tags: ['Input mapping', 'Custom Apps Script', 'Setup guidance'],
  },
  {
    id: 'web',
    title: 'Web & Business Systems',
    summary: 'Responsive landing pages, CRM setup, and scheduling workflows that support your business and operations.',
    tags: ['Landing pages', 'CRM setup', 'Scheduling workflows'],
  },
]

export type ProjectImage = { src: string; srcSet?: string; alt: string; width: number; height: number }
export type Project = {
  id: string
  kicker: string
  title: string
  summary: string
  href?: string
  layout: 'wide' | 'narrow' | 'full'
  image: ProjectImage
}

export const workIntro = {
  title: 'Builds you can open right now.',
  lede: 'Two animated walkthroughs of tools I built, and one workspace screen. The walkthroughs run on sample data.',
}

export const projects: Project[] = [
  {
    id: 'crm',
    kicker: 'CRM',
    title: 'Sechurplets CRM walkthrough',
    summary:
      'Animated walkthrough of a lead manager for a single admin: sign in, search leads, change statuses in bulk, and review the audit log. Runs on sample data.',
    href: '/projects/sechurplets-crm.html',
    layout: 'wide',
    image: {
      src: '/images/cover-crm-960.webp',
      srcSet: '/images/cover-crm-960.webp 960w, /images/cover-crm-1800.webp 1800w',
      alt: 'Sechurplets CRM walkthrough, opening screen',
      width: 1800,
      height: 1125,
    },
  },
  {
    id: 'face-login',
    kicker: 'Web app',
    title: 'Face Login walkthrough',
    summary:
      'Animated walkthrough of a webcam login built with Flask: face detection, three-pose enrollment, a refused face, a successful login, and the protected dashboard. Runs on made-up demo data.',
    href: '/projects/face-login-walkthrough.html',
    layout: 'narrow',
    image: {
      src: '/images/cover-face-960.webp',
      srcSet: '/images/cover-face-960.webp 960w, /images/cover-face-1800.webp 1800w',
      alt: 'Face Login walkthrough, opening screen',
      width: 1800,
      height: 1125,
    },
  },
  {
    id: 'tracker',
    kicker: 'Workspace screen',
    title: 'Break Schedule Tracker',
    summary: 'See who is due for a break, who was late or forfeited, and who went over their limit, in one view.',
    layout: 'full',
    image: { src: '/images/tracker.webp', alt: 'Break Schedule Tracker, a workspace screen', width: 1024, height: 460 },
  },
]

export type Phase = { title: string; body: string; steps: string[] }

export const approachIntro = {
  title: 'Understand. Plan. Build. Refine.',
  lede: 'Four phases. Under each one are the working steps I follow, one improvement at a time.',
}

export const phases: Phase[] = [
  {
    title: 'Understand the workflow',
    body: 'I learn your goals, existing processes, and operational challenges.',
    steps: ['Identify the problem', 'Define the requirements', 'Set acceptance criteria'],
  },
  {
    title: 'Plan the right solution',
    body: 'I define requirements, set priorities, and plan the best approach.',
    steps: ['Plan the smallest solution'],
  },
  {
    title: 'Build and validate',
    body: 'I develop the solution incrementally, test its functionality, and verify results.',
    steps: ['Build one change at a time', 'Run relevant tests', 'Inspect the real result'],
  },
  {
    title: 'Refine and improve',
    body: 'I review feedback, make improvements, and ensure long-term value.',
    steps: ['Review the changes', 'Approve and integrate', 'Move to the next step'],
  },
]

export type PhilosophyPart = { text: string; key?: boolean }

export const philosophy: PhilosophyPart[] = [
  { text: 'Understand the ' },
  { text: 'problem,', key: true },
  { text: ' develop a practical ' },
  { text: 'solution,', key: true },
  { text: ' execute with ' },
  { text: 'structure,', key: true },
  { text: ' validate the ' },
  { text: 'results,', key: true },
  { text: ' and continuously ' },
  { text: 'improve.', key: true },
]

export const about = {
  title: `Hi, I'm ${profile.name}.`,
  lead: "I'm an AI-Assisted Full-Stack Developer with a background in Workforce Management, business operations, and process optimization.",
  paragraphs: [
    'I build web applications, business dashboards, internal tools, CRM systems, and workflow automation solutions using modern development practices and AI-assisted coding tools. My experience as a Real-Time Analyst at Inspiro gives me practical insight into real business operations and the challenges organizations face.',
    "I use AI development assistants such as Claude and GitHub Copilot for software planning, coding, debugging, and development workflows, alongside critical thinking and proper testing. I also develop independent projects exploring technology, automation, and artificial intelligence, and I'm open to selected freelance, part-time, and project-based collaborations.",
  ],
  photo: {
    src: '/images/about-800.webp',
    srcSet: '/images/about-800.webp 800w, /images/about-1200.webp 1200w',
    alt: `${profile.name} at his workstation`,
    width: 1200,
    height: 1200,
  },
}

export const experience = {
  period: 'July 2024 – Present',
  role: 'Real-Time Analyst (Workforce Management)',
  company: 'Inspiro',
  summary: 'Monitor schedule adherence and intraday performance, coordinate staffing adjustments with operations, and support SLA targets.',
}

export const skills: string[] = [
  'Business Process Automation',
  'CRM Automation',
  'CRM Software',
  'Microsoft Excel',
  'Workforce Management',
  'HTML',
  'JavaScript',
  'Web Development',
  'Dashboard',
  'Business Intelligence',
  'Web Application',
  'Automated Workflow',
  'Data Analysis',
  'Process Improvement',
  'AI App Development',
  'OpenCV',
  'Full-Stack Development',
  'SQLite',
]

export const credentials = [
  { title: 'Workforce Planning Fundamentals', detail: 'Course, listed on LinkedIn' },
  { title: 'Excel and Copilot Fundamentals', detail: 'Course, listed on LinkedIn' },
  { title: 'Core Academy', detail: 'Ignite, ACES and WORK programs' },
  { title: 'Based in Iloilo City', detail: 'Asia/Manila time zone' },
]

export const contactIntro = {
  title: 'Have a workflow that needs fixing?',
  lede: 'Describe the report, workflow or tool you need, and what you use today. Two or three lines is enough.',
}

export const workTogether: string[] = [
  'Share your goals, workflow, and challenges.',
  'Define clear requirements and project priorities.',
  'Develop practical solutions tailored to your needs.',
  'Maintain clear communication throughout the project.',
  'Review progress, gather feedback, and make improvements.',
  'Test and refine the final solution before delivery.',
]
