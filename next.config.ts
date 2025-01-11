const nextConfig = {
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    BASE_URL_2: process.env.NEXT_PUBLIC_BASE_URL_2,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.ap-northeast-2.amazonaws.com",
        pathname: "/image.village/**",
      },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
  },
  async rewrites() {
    return [
      {
        source: "/eventApi/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/eventApi/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL_2}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
