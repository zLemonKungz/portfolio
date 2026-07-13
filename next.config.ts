import type { NextConfig } from "next";

const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

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
