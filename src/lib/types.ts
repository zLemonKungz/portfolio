export interface Project {
  id: string
  title: string
  category: 'web' | 'design' | 'art'
  image: string
  description?: string
  link?: string
  tech?: string[]
  year?: string
  width: 1 | 2
  height: 1 | 2
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
  color: string
}

export interface PortfolioConfig {
  name: string
  title: string
  tagline: string
  quote: string
  avatar: string
  about: string
  skills: string[]
  projects: Project[]
  social: SocialLink[]
  footer: string
  theme: {
    primary: string
    primaryLight: string
    primaryDeep: string
    accent: string
    accent2: string
    gold: string
  }
}
