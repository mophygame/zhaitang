import type { NextConfig } from "next";
// Cloudflare's Static HTML Export preset may invoke `next build` directly
// instead of the package script. Loading the sync module here guarantees that
// workspace assets exist under public/ before every Next.js build or dev run.
import "./scripts/sync-creator-assets.mjs";

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
