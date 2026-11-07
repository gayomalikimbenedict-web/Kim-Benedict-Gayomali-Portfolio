import type { ClientAccount, Quote, VideoTestimonial } from './schema'

export const proofPage = {
  eyebrow: 'Proof',
  titleThin: 'Feedback and',
  titleBold: 'experience.',
  bands: { videos: 'On camera', quotes: 'Written feedback', clients: 'Experience' },
  lede: 'Written feedback from people I have worked with, and my current role. The quotes are shown without names.',
}

export const clientAccounts: ClientAccount[] = [
  {
    label: 'Inspiro, July 2024 to present',
    role: 'Real-Time Analyst (Workforce Management)',
    work: 'Monitor schedule adherence and intraday performance, coordinate staffing adjustments with operations, and support SLA targets.',
    tags: ['Schedule adherence', 'Intraday performance', 'SLA targets'],
  },
]

/** No video clips yet. The On camera band is not shown. */
export const videoTestimonials: VideoTestimonial[] = []

export const communityQuotes: Quote[] = [
  {
    name: 'Subject Matter Expert',
    context: 'E-commerce client',
    text: "I'm on off and I didn't see the message. Thank God you managed the SLA, otherwise gone.",
  },
  {
    name: 'Subject Matter Expert',
    context: 'E-commerce client',
    text: "I've already huddled with the agents on what needs to be done. Today we successfully managed it. Thank you so much.",
  },
  {
    name: 'Operations Lead',
    context: 'E-commerce Logistics Team',
    text: 'We use these templates to handle our core weekly reports now. Tasks that forced our operations team to waste half a day are fully resolved in under three minutes.',
  },
  {
    name: 'Operations Director',
    context: 'Multi-Store Shopify Brand',
    text: 'Our managers review store performance metrics directly from the automated output dashboard. We no longer waste time hunting down broken formatting cells before meetings.',
  },
]
