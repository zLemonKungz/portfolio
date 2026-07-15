import { PortfolioConfig } from "@/lib/types"

const portfolio: PortfolioConfig = {
  // ─── Personal Info ───────────────────────────
  name: "Lemon",
  title: "Developer",
  tagline: "Code with a touch of sakura 🌸",
  quote: "Code is my canvas, creativity is my compiler",
  avatar: "/images/profile.png",

  // ─── About ───────────────────────────────────
  about: `A developer who blends anime aesthetics with clean, maintainable code.

Daily life: staring at screens, writing code,
and finding beauty in every bit of data. 💻`,

  // ─── Skills ──────────────────────────────────
  skills: [
    "Next.js", "React", "TypeScript", "Tailwind",
    "JavaScript", "HTML/CSS", "Git", "Figma",
    "Node.js", "PostgreSQL",
  ],

  // ─── Projects ────────────────────────────────
  projects: [
    {
      id: "proj-1",
      title: "Animate",
      category: "web",
      image: "/images/web-animate.png",
      description: "A full-stack web application platform",
      link: "https://animate-apps.ddns.net",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      year: "2026",
      width: 2,
      height: 2,
    },
  ],

  // ─── Social Links ────────────────────────────
  social: [
    { platform: "Twitter",   url: "https://x.com/zLemonKungz",          icon: "twitter",    color: "#FFB7C5" },
    { platform: "GitHub",    url: "https://github.com/zLemonKungz",     icon: "github",     color: "#B5D8EB" },
    { platform: "MyAnimeList", url: "https://myanimelist.net/profile/zLemonKungz", icon: "myanimelist", color: "#2E51A2" },
  ],

  // ─── Footer ──────────────────────────────────
  footer: "Made with zLemonKungz's touch of sakura",

  // ─── Integrations ────────────────────────────
  malUser: "zLemonKungz",
  lastfmUser: "zLemonKungz",

  // ─── Theme ───────────────────────────────────
  theme: {
    primary: "#FFB7C5",
    primaryLight: "#FFD1DC",
    primaryDeep: "#FF8FA3",
    accent: "#D4B5E8",
    accent2: "#B5D8EB",
    gold: "#FFE57F",
  },
}

export default portfolio
