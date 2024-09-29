/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone", // Next.js의 서버 구성 옵션 추가
  images: {
    domains: [
      //AWS
      "kablesnsbucket.s3.ap-northeast-2.amazonaws.com",
    ],
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "k.kakaocdn.net",
      },
      {
        hostname: "kablesnsbucket.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
  experimental: {
    appDir: true, // app 디렉토리와 관련된 기능을 활성화
  },
  // CORS 설정 추가
  async headers() {
    return [
      {
        // 모든 API 경로에 대해 CORS 허용
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://sns-kable.vercel.app",
          }, // 배포 환경 도메인으로 설정
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ],
      },
    ];
  },
};

export default nextConfig;
