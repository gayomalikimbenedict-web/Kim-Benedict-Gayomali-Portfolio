import type { Credential, SocialLink } from './schema'

/** Identity: the name, the brand, the contact details and the picture. Every page reads these. */
export const site = {
  name: 'Kim Benedict Gayomali',
  brand: 'Sechurplets Studio',
  brandParts: ['Sechurplets', 'Studio'],
  logo: {
    light: '/images/brand/mark.webp',
    dark: '/images/brand/mark-light.webp',
    headerLight: '/images/brand/mark-96.webp',
    headerDark: '/images/brand/mark-light-96.webp',
  },
  url: 'https://kimbenedictgayomali-portfolio.vercel.app',
  role: 'AI-Assisted Full-Stack Developer',
  email: 'sechurplets.studio@outlook.com',
  emailSubject: 'Project inquiry',
  replyPromise: 'Your message goes straight to my inbox.',
  location: 'Iloilo City, GMT+8',
  countryCode: 'PH',
  timeZone: 'Asia/Manila',
  timePlace: 'in Iloilo City',
  avatar: { src: '/images/profile/avatar.webp', alt: 'Kim Benedict Gayomali', width: 400, height: 400 },
  avatarSmall: '/images/profile/avatar-224.webp',
} as const

export const certification: Credential = {
  title: 'Workforce Planning Fundamentals',
  detail: 'Course, listed on LinkedIn',
  href: 'https://www.linkedin.com/in/kimgayomali/',
}

export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kimgayomali/', external: true, icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/gayomalikimbenedict-web', external: true, icon: 'github' },
]

export const externalLinks = {
  resource: '/Kim_Benedict_Gayomali_Resume.pdf',
  showcase: '/projects/sechurplets-crm.html',
  company: '#',
} as const

export function mailtoHref(): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject)}`
}
