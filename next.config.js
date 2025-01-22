/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/commonQuestions',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/common-questions',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/commonQuestions/:path*',
        destination: '/faq/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig; 