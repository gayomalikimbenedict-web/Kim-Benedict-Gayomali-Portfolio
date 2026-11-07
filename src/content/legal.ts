import { site } from './site'

export type LegalSection = { heading: string; paragraphs: string[] }

export type LegalDoc = {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

export const privacyPolicy: LegalDoc = {
  title: 'Privacy Policy',
  updated: 'November 6, 2026',
  intro: `This policy covers ${site.url.replace('https://', '')}, the portfolio of ${site.name} trading as ${site.brand}. It is a plain-language description of what this site stores and what it does not, not legal advice.`,
  sections: [
    {
      heading: 'What this site collects',
      paragraphs: [
        "The contact form opens your own email app with the message already written. Nothing you type is sent to or stored by this site.",
        `If you email me, I use your message only to reply. To have it deleted, write to ${site.email}.`,
      ],
    },
    {
      heading: 'What your browser stores',
      paragraphs: ['This site saves your theme choice and whether the sidebar is collapsed in your browser (localStorage). Nothing else is stored.'],
    },
    {
      heading: 'Analytics',
      paragraphs: ['This site does not run analytics.'],
    },
    {
      heading: 'Hosting',
      paragraphs: ['The site is hosted on Vercel, which may log your IP address, the page requested and the time.'],
    },
    {
      heading: 'Your rights',
      paragraphs: [`To ask what I hold about you or to ask me to delete it, write to ${site.email}.`],
    },
    {
      heading: 'Changes',
      paragraphs: ['If this policy changes, the date at the top changes.'],
    },
  ],
}

export const termsOfService: LegalDoc = {
  title: 'Terms of Service',
  updated: 'November 6, 2026',
  intro: `These terms cover your use of this portfolio site, run by ${site.name} trading as ${site.brand}. They are a plain-language summary, not legal advice.`,
  sections: [
    {
      heading: 'Using this site',
      paragraphs: ['You may browse this site and open its walkthroughs. The walkthroughs and sample pages use made-up names, addresses and data.'],
    },
    {
      heading: 'Working together',
      paragraphs: ['Nothing on this site is a binding offer. Client work starts only after we agree the scope in writing.'],
    },
    {
      heading: 'Intellectual property',
      paragraphs: ['The copy, pictures and my own work on this site belong to me. Tool names are used only to say what I work with. The layout is based on a licensed template; see the project license.'],
    },
    {
      heading: 'No warranties',
      paragraphs: ['The site is provided as is. I try to keep it accurate and available but do not promise either.'],
    },
    {
      heading: 'External links',
      paragraphs: ['Links to other sites are for convenience. I am not responsible for their content.'],
    },
    {
      heading: 'Governing law',
      paragraphs: ['These terms are governed by the laws of the Philippines.'],
    },
    {
      heading: 'Contact',
      paragraphs: [`Questions about these terms: ${site.email}.`],
    },
  ],
}
