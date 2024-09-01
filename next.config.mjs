/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
};

export default nextConfig;
