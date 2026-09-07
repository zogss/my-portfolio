import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Next 16.3 otherwise appends a generated `nextjs-agent-rules` block to
  // CLAUDE.md on every `next dev`, which keeps the working tree dirty.
  agentRules: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [85, 75],
  },
};

export default nextConfig;
