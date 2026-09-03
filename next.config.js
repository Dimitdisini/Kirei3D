/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/lacak',
        destination: '/tracking',
      },
    ];
  },
};

module.exports = nextConfig;
