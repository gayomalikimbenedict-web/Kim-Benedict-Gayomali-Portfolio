import type { Image, ToolMark } from './schema'
import { certification, externalLinks, site } from './site'
import { tools } from './tools'

export const aboutSection = {
  eyebrow: 'About',
  titleThin: "Hi, I'm",
  titleBold: `${site.name}.`,
  lede: "I'm an AI-Assisted Full-Stack Developer with a background in Workforce Management, business operations, and process optimization.",
  lead: 'I build web applications, business dashboards, internal tools, CRM systems, and workflow automation solutions using modern development practices and AI-assisted coding tools. My experience as a Real-Time Analyst at Inspiro gives me practical insight into real business operations and the challenges organizations face.',
  leadQuiet:
    "I use AI development assistants such as Claude and GitHub Copilot for software planning, coding, debugging, and development workflows, alongside critical thinking and proper testing. I also develop independent projects exploring technology, automation, and artificial intelligence, and I'm open to selected freelance, part-time, and project-based collaborations.",
  note: {
    company: `${site.brand} is my studio.`,
    product: { label: 'Sechurplets CRM walkthrough', href: externalLinks.showcase },
    rest: 'is one of the builds on this site and runs on sample data.',
  },
  picture: {
    src: '/images/profile/about.webp',
    srcSet: '/images/profile/800/about.webp 800w, /images/profile/about.webp 1200w',
    alt: `${site.name} at his workstation`,
    width: 1200,
    height: 1200,
  } satisfies Image,
}

export const capabilities: { title: string; tools: ToolMark[] }[] = [
  { title: 'Reporting & analytics', tools: [tools.excel, tools.sheets, tools.appsScript] },
  { title: 'Workflow automation', tools: [tools.appsScript, tools.sheets, tools.javascript, tools.excel] },
  { title: 'Web & business tools', tools: [tools.html, tools.javascript, tools.sqlite, tools.flask, tools.opencv] },
  { title: 'AI-assisted development', tools: [tools.claude, tools.copilot] },
]

export type AboutCredential = {
  id: 'cert' | 'place' | 'community' | 'partner'
  title: string
  detail: string
  image?: Image
  imageDark?: Image
  href?: string
}

/** Four cards. The ids are layout slots: a card without an image shows the title and detail only. */
export const credentials: AboutCredential[] = [
  { id: 'cert', title: certification.title, detail: certification.detail, href: certification.href },
  { id: 'place', title: `Based ${site.timePlace}`, detail: 'Asia/Manila time zone' },
  { id: 'community', title: 'Core Academy', detail: 'Ignite, ACES and WORK programs', href: 'https://www.linkedin.com/in/kimgayomali/' },
  { id: 'partner', title: 'Excel and Copilot Fundamentals', detail: 'Course, listed on LinkedIn', href: 'https://www.linkedin.com/in/kimgayomali/' },
]
