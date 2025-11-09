/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*', // allows any external domain
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
