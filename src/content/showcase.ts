import type { Faq, Image, ProductFilm, ProductTab } from './schema'
import { externalLinks } from './site'

/** The address shown in the film window's browser bar. The walkthrough itself uses this made-up host. */
export const showcaseHost = 'crm.example.com'

export const showcasePage = {
  eyebrow: 'Showcase',
  titleThin: 'One build,',
  titleBold: 'shown step by step.',
  lede: 'Sechurplets CRM is a lead manager for a single admin. This walkthrough signs in, finds a lead, changes statuses in bulk and reviews the audit log. It runs on sample data.',
  footnote: 'A single self-contained page that replays the CRM opening. No real records are used.',
  cta: { label: 'Open the walkthrough', href: externalLinks.showcase, external: true },
  roomsTitle: 'The five steps',
}

const room = (file: string, alt: string): Image => ({
  src: `/images/showcase/${file}.webp`,
  alt,
  width: 1100,
  height: 1000,
})

export const showcaseFilm: ProductFilm = {
  src: '/media/showcase-film.mp4',
  poster: { src: '/images/showcase/film-poster.webp', alt: 'Sechurplets CRM walkthrough film', width: 1280, height: 720 },
  pagePosters: { phone: '/images/showcase/film-poster-640.webp', wide: '/images/showcase/film-poster-960.webp' },
  name: 'Sechurplets CRM: the full walkthrough',
  description: 'Sign in, find a lead, change statuses in bulk, check the audit log, and see the summary, in that order.',
  duration: '0:44',
  published: '2026-11-06',
}

export const showcaseStats: [string, string][] = [
  ['5', 'walkthrough steps'],
  ['1', 'admin account'],
  ['3', 'core tools: find, bulk update, audit'],
  ['0', 'real records, sample data only'],
]

export const productTabs: ProductTab[] = [
  {
    id: 'sign-in',
    label: 'Sign in',
    body: 'One admin account signs in to the lead manager. The walkthrough starts at the sign-in form, then opens the lead list.',
    image: room('room-1', 'Sechurplets CRM sign-in step'),
  },
  {
    id: 'find',
    label: 'Find a lead',
    body: 'Search by name, email or phone, or filter by status. The list updates as you type.',
    image: room('room-2', 'Sechurplets CRM lead list with search and status filter'),
  },
  {
    id: 'select-all',
    label: 'Select all',
    body: 'Select every lead on the page and change their status together. The walkthrough then shows how many were updated and how many already had that status.',
    image: room('room-3', 'Sechurplets CRM bulk status change'),
  },
  {
    id: 'audit-log',
    label: 'Audit log',
    body: 'Every change is recorded with its action, the lead number, the old and new status, and who made it.',
    image: room('room-4', 'Sechurplets CRM audit log'),
  },
  {
    id: 'summary',
    label: 'Summary',
    body: 'A short recap of what the walkthrough covered, ending the replay.',
    image: room('room-5', 'Sechurplets CRM summary step'),
  },
]

export const showcaseFaq: Faq[] = [
  {
    question: 'Is this a real client system?',
    answer: 'No. The walkthrough runs on sample data with example.com addresses. No real records are shown.',
  },
  {
    question: 'Who is it for?',
    answer: 'A single admin who needs to find leads, change many statuses at once, and see an audit trail of every change.',
  },
  {
    question: 'Can I try it myself?',
    answer: 'Yes. Open the walkthrough, use the step buttons to jump between steps, or press Replay to start again.',
  },
]
