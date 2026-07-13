# Sakura Galaxy Portfolio — Design Spec

> เว็บไซต์พอร์ตโฟลิโอแนวอนิเมะ One Page สำหรับ Developer / Designer
> Concept: Sakura Dream x Pastel Galaxy — ซากุระฝันพบดวงดาว
> ภาษา: English (ปรับแต่งได้ทั้งหมดผ่าน config)

---

## 1. ภาพรวม (Overview)

### 1.1 โครงสร้างเว็บ (One Page, 4 Sections)

```
┌──────────────────────────────────────┐
│ 🌸 Hero                              │
│   - Profile pic + Name + Title       │
│   - Quote + CTA → Gallery            │
│   - Scroll indicator                 │
├──────────────────────────────────────┤
│ ⭐ About + Skills                    │
│   - Bio text (English)               │
│   - Tools & Tech badges              │
├──────────────────────────────────────┤
│ 🖼️ Gallery (Bento Grid)             │
│   - Filter tabs (All / Web / Design / Art)
│   - Bento Grid คละขนาด               │
│   - Lightbox (prev/next/close)       │
│   - Load More                        │
├──────────────────────────────────────┤
│ 📬 Contact + Footer                  │
│   - Social Bubbles (gradient circles)│
│   - Footer "Made with 🌸✨"          │
└──────────────────────────────────────┘
```

### 1.2 Tech Stack
| องค์ประกอบ | เทคโนโลยี |
|-----------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | TailwindCSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Google Fonts (Noto Sans JP, Zen Maru Gothic) |

### 1.3 ปรับแต่งได้ผ่านไฟล์เดียว
`src/config/portfolio.ts` — เปลี่ยนชื่อ, bio, skills, projects, social links, colors ได้
(กำหนด Type ไว้ใน `src/lib/types.ts`)

---

## 2. สไตล์ภาพรวม (Visual Style)

### 2.1 Color Palette
| สี | Hex | การใช้งาน |
|----|------|---------|
| Sakura Pink | `#FFB7C5` | Primary |
| Sakura Light | `#FFD1DC` | Background |
| Sakura Deep | `#FF8FA3` | Accent |
| Lavender | `#D4B5E8` | Secondary |
| Sky Blue | `#B5D8EB` | Tertiary |
| Gold | `#FFE57F` | Sparkles |
| Dark | `#2D1B2E` | Text |
| Muted | `#7C5C7A` | Muted text |
| Cream | `#FFF5F5` | Page background |

### 2.2 Typography
- **Heading**: Zen Maru Gothic (น่ารัก โค้งมน)
- **Body**: Noto Sans JP (อ่านง่าย)

### 2.3 CSS Animation
- Sakura petals ลอย (10 ใบ, fall keyframes)
- Sparkle กระพริบ (2s cycle)
- Scroll-triggered fade-in (Intersection Observer via Framer Motion)
- Hover: Scale + Glow + Shadow
- อนิเมชัน GPU-accelerated (transform, opacity)

---

## 3. Component Tree

```
page.tsx
├── BackgroundEffects
│   ├── SakuraPetals (CSS animation)
│   └── SparkleDecorations (CSS animation)
├── Navbar (sticky, scroll-spy active state)
├── Hero (profile + name + quote + CTA)
├── About
│   ├── BioText (glass card)
│   └── SkillBadges[] (hover animation)
├── Gallery
│   ├── FilterTabs (pill buttons)
│   ├── BentoGrid (2x2, 1x1, 2x1, 1x2 cells)
│   │   └── ProjectCard[] (image + hover overlay)
│   ├── LightboxModal (full screen)
│   └── LoadMoreButton
└── Contact
    ├── SocialBubbles[] (gradient circles)
    └── Footer (copyright + tagline)
```

---

## 4. Data Flow

### 4.1 Portfolio Config (`src/config/portfolio.ts`)
```typescript
export interface PortfolioConfig {
  name: string        // "Your Name"
  title: string       // "Developer & Designer"
  tagline: string     // "Code with a touch of sakura 🌸"
  quote: string       // คำคม
  avatar: string      // path รูปโปรไฟล์
  about: string       // Bio (ใช้ whitespace-pre-line)
  skills: string[]    // ["Next.js", "Tailwind", ...]
  projects: Project[] // { id, title, category, image, description, link, width, height }
  social: SocialLink[]// { platform, url, icon, color }
  footer: string      // "Made with 🌸✨"
  theme: { primary, primaryLight, primaryDeep, accent, accent2, gold }
}
```

### 4.2 Image Management
- รูปโปรไฟล์ → `/public/images/avatar.png`
- รูปโปรเจกต์ → `/public/images/` หรือ external URL
- Placeholder: `/public/images/placeholder.svg`
- ใช้ Next.js `<Image>` component

---

## 5. เพิ่มเนื้อหาของคุณ

1. เปิด `src/config/portfolio.ts`
2. เปลี่ยน `name`, `title`, `tagline`, `quote`, `about`
3. เพิ่ม `skills` ที่ใช้จริง
4. เพิ่ม `projects` (ช่องละ title, category, image path)
5. แก้ `social` links ให้เป็นของคุณ
6. ใส่รูปใน `/public/images/`

---

*Spec version 1.1 — One Page English Config-based — 2026-07-13*
