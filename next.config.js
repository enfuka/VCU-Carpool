/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "avatar.vercel.sh"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["prisma", "@prisma/client"],
    serverComponentsExternalPackages: ["@tremor/react"],
  },
};

module.exports = nextConfig;
