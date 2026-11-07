import type { Image, WorkChapter, WorkItem } from './schema'
import { method } from './method'
import { tools } from './tools'
import { workCount } from './work'

export const homeHero = {
  headlineThin: 'Business dashboards &',
  headlineBold: 'Workflow automation.',
  subhead: 'I build web applications, business dashboards, internal tools, and workflow automation solutions. Open to selected freelance and part-time projects.',
  cta: { label: 'Get in touch', to: '/#contact' },
}

export type ManifestoPart = string | { key: string }

/** The working philosophy, in my own words, with the five verbs picked out. */
export const homeManifesto = {
  eyebrow: method.eyebrow,
  parts: [
    'Understand the',
    { key: 'problem,' },
    'develop a practical',
    { key: 'solution,' },
    'execute with',
    { key: 'structure,' },
    'validate the',
    { key: 'results,' },
    'and continuously',
    { key: 'improve.' },
  ] satisfies ManifestoPart[],
}

export const homeSections = {
  work: {
    eyebrow: 'Selected work',
    title: 'Builds you can open right now.',
  },
  proof: {
    eyebrow: 'Proof',
    title: 'Feedback and experience.',
  },
  objections: {
    eyebrow: 'Before you write',
    title: 'Quick answers.',
  },
}

export const ctaBand = {
  title: 'Tell me what is eating your week.',
  body: 'Describe the workflow, report or tool you need, and what you use today. Two or three lines is enough.',
  button: 'Email me your question',
}

/* ---------- Work section ---------- */

const cover = (id: string, label: string): Image => ({
  src: `/images/covers/${id}.webp`,
  alt: `${label}, opening screen`,
  width: 1800,
  height: 1125,
  srcSet: [480, 640, 960].map((w) => `/images/covers/${w}/${id}.webp ${w}w`).join(', ') + `, /images/covers/${id}.webp 1800w`,
})

/** The URL of a chapter's showcase sheet. Real, shareable and in the sitemap. */
export const chapterPath = (id: string) => `/work/${id}`

export const workSection = {
  ...homeSections.work,
  /** The title as one display line in the hero's thin + bold pairing. */
  titleThin: 'Builds you can',
  titleBold: 'open right now.',
  all: { label: `See all ${workCount} builds`, to: '/work' },
}

const walkthroughItems: WorkItem[] = [
  {
    id: 'sechurplets-crm',
    name: 'Sechurplets CRM walkthrough',
    kicker: 'CRM',
    summary:
      'Animated walkthrough of a lead manager for a single admin: sign in, search leads, change statuses in bulk, and review the audit log. Runs on sample data.',
    image: cover('sechurplets-crm', 'Sechurplets CRM walkthrough'),
    href: '/projects/sechurplets-crm.html',
  },
  {
    id: 'face-login-walkthrough',
    name: 'Face Login walkthrough',
    kicker: 'Web app',
    summary:
      'Animated walkthrough of a webcam login built with Flask: face detection, three-pose enrollment, a refused face, a successful login, and the protected dashboard. Runs on made-up demo data.',
    image: cover('face-login-walkthrough', 'Face Login walkthrough'),
    href: '/projects/face-login-walkthrough.html',
  },
]

const screenItems: WorkItem[] = [
  {
    id: 'break-schedule-tracker',
    name: 'Break Schedule Tracker',
    kicker: 'Workspace screen',
    summary: 'See who is due for a break, who was late or forfeited, and who went over their limit, in one view.',
    image: { src: '/images/screens/break-schedule-tracker.webp', alt: 'Break Schedule Tracker, a workspace screen', width: 1024, height: 460 },
  },
]

/**
 * The Work chapters, in bento order. The bento's grid areas in work.css are keyed by chapter id, so
 * adding a chapter means adding its area there too.
 */
export const workChapters: WorkChapter[] = [
  {
    id: 'walkthroughs',
    title: 'Project Walkthroughs',
    line: 'Two builds, replayed step by step.',
    count: walkthroughItems.length,
    unit: 'walkthroughs',
    description:
      'Animated walkthroughs of two tools I built, a lead manager and a webcam login. Both run on sample data, so you can open them and click through freely.',
    marks: [tools.javascript, tools.html, tools.flask],
    items: walkthroughItems,
  },
  {
    id: 'screens',
    title: 'Screens',
    line: 'A workspace screen from my day-to-day tools.',
    count: screenItems.length,
    unit: 'screen',
    description: 'A break schedule tracker view: who is due for a break, who was late, and who went over their limit.',
    marks: [tools.javascript, tools.html],
    items: screenItems,
  },
]

export const findChapter = (id: string | undefined) => workChapters.find((chapter) => chapter.id === id)
