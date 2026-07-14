import type { Metadata } from "next";
import { Sour_Gummy } from "next/font/google";
import "./globals.css";

const sourGummy = Sour_Gummy({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
const siteUrl = process.env.SITE_URL || (basePath ? `https://zlemonkungz.github.io${basePath}` : "https://zlemonkungz.github.io")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl + basePath),
  title: "Lemon | Developer",
  description:
    "A developer who blends anime aesthetics with clean, maintainable code. ✨ Portfolio with a touch of sakura 🌸",
  keywords: [
    "developer",
    "designer",
    "portfolio",
    "anime",
    "sakura",
    "web developer",
    "frontend",
    "react",
    "next.js",
  ],
  authors: [{ name: "Lemon" }],
  creator: "Lemon",
  openGraph: {
    title: "Lemon | Developer",
    description:
      "A developer who blends anime aesthetics with clean, maintainable code. ✨",
    url: siteUrl,
    siteName: "Sakura Galaxy Portfolio",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lemon | Developer",
    description:
      "A developer who blends anime aesthetics with clean, maintainable code ✨🌸",
    images: [{ url: "/og-image.svg" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourGummy.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <script dangerouslySetInnerHTML={{
          __html: `document.documentElement.dataset.theme=(new Date().getHours()>=6&&new Date().getHours()<18)?"day":"night"`,
        }} />
        {children}
      </body>
    </html>
  );
}
