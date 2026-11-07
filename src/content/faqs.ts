import type { Faq } from './schema'

export const faqs = {
  whatYouBuild: {
    question: 'What do you actually build?',
    answer:
      'Reporting and workforce dashboards, spreadsheet and Apps Script automation, custom workflows, and web and business systems such as landing pages, CRM setup and scheduling workflows. It is usually for teams that want cleaner reporting and faster routines.',
  },
  startSpeed: {
    question: 'Are you available for projects?',
    answer:
      'I work as a Real-Time Analyst and take on selected freelance, part-time and project-based work alongside it. Tell me what you need and I will say whether I can fit it.',
  },
  needStack: {
    question: 'Do I need a specific platform?',
    answer: 'No. I work mainly in Excel, Google Sheets, Apps Script and web tools. If your setup is a poor fit for what you want, I will say so plainly.',
  },
  afterWrite: {
    question: 'What happens after I write?',
    answer: 'I read your message and write back, either with questions about your workflow or with a straight answer on whether I can help.',
  },
} satisfies Record<string, Faq>

export const allFaqs: Faq[] = Object.values(faqs)
