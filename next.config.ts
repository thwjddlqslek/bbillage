const nextConfig = {
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.ap-northeast-2.amazonaws.com",
        port: "",
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
        destination: "https://frontapi.bbillage.com:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
