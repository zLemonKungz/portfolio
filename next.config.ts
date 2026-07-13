import type { NextConfig } from "next";

// GitHub Pages auto-detection
const isActions = !!process.env.GITHUB_ACTIONS
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || ""
const basePath = isActions ? `/${repoName}` : ""

const nextConfig: NextConfig = {
  basePath,
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
