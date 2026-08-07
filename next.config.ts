import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Generate plain HTML/CSS/JS files. No Node.js or Cloudflare Worker runtime
  // is required after `npm run build` completes.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { cpus: 1 },
  turbopack: { root: process.cwd() },
};
export default nextConfig;
