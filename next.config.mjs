/** @type {import('next').NextConfig} */
const cspHeader = `
    frame-ancestors https://www.boardone.io/;
`;

const nextConfig = {
  headers: () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: cspHeader.replace(/\n/g, ''),
        },
      ],
    },
  ],
};

export default nextConfig;
