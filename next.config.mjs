/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@google/genai'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
