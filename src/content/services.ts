import type { Service } from './schema'
import { tools } from './tools'

export const servicesPage = {
  eyebrow: 'Services',
  title: 'What I can build for you.',
  lede: 'Spreadsheet automation, workforce reporting, custom setup support, and web and business systems. Pick one or combine them.',
}

export const servicesSection = {
  eyebrow: servicesPage.eyebrow,
  titleThin: 'Pick one',
  titleBold: 'or stack a few.',
  explore: 'Explore',
  /** Which Work chapter each service's Explore link opens. */
  work: { 'service-1': 'screens', 'service-2': 'screens', 'service-3': 'walkthroughs', 'service-4': 'walkthroughs' } as Record<string, string>,
}

export const services: Service[] = [
  {
    id: 'service-1',
    title: 'Spreadsheet Automation Templates',
    summary: 'Plug-and-play Google Sheets templates that dedupe, standardize, and match messy CSV exports in one click. No formulas or coding needed.',
    outcome: 'Clean data, one click',
    bullets: ['Order Data Cleaner', 'Shopify Reconciler', 'Multi-Sheet Merge & Dedupe'],
    tools: [tools.sheets, tools.appsScript, tools.excel],
  },
  {
    id: 'service-2',
    title: 'Reporting & Workforce Analytics',
    summary: 'Turn raw call, chat, and ticket logs into clean scorecards and share-ready reports, shaped by hands-on Real-Time Analyst experience.',
    outcome: 'Share-ready reports',
    bullets: ['Agent Performance Tracker', 'Auto Report Builder', 'SLA & adherence reporting'],
    tools: [tools.excel, tools.sheets, tools.appsScript],
  },
  {
    id: 'service-3',
    title: 'Custom Automation & Setup Support',
    summary: 'Have an unusual export layout or a repetitive routine? I adapt the mapping or build a custom workflow your team can run without training.',
    outcome: 'Fits your routine',
    bullets: ['Input mapping', 'Custom Apps Script', 'Setup guidance'],
    tools: [tools.appsScript, tools.sheets, tools.javascript],
  },
  {
    id: 'service-4',
    title: 'Web & Business Systems',
    summary: 'Responsive landing pages, CRM setup, and scheduling workflows that support your business and operations.',
    outcome: 'A working web setup',
    bullets: ['Landing pages', 'CRM setup', 'Scheduling workflows'],
    tools: [tools.html, tools.javascript, tools.sqlite],
  },
]
