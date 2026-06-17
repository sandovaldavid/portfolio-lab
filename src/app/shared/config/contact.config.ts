/**
 * Single source of truth for all personal contact info, social links, and URLs.
 * Update here → propagates everywhere.
 */

export const OWNER = {
  name: 'David Sandoval',
  fullName: 'Juan David Sandoval Salvador',
  email: 'contact@devsandoval.me',
  domain: 'devsandoval.me',
  siteUrl: 'https://devsandoval.me',
  location: 'Piura, Peru',
  resumeFile: '/David_Sandoval_Salvador-resume.pdf',
  avatarFile: '/profile/avatar.webp',
} as const;

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  ariaLabel: string;
  external: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/sandovaldavid',
    ariaLabel: 'GitHub profile — sandovaldavid',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sandovaldavid',
    ariaLabel: 'LinkedIn profile — sandovaldavid',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${OWNER.email}`,
    ariaLabel: `Send email to ${OWNER.email}`,
    external: false,
  },
];
