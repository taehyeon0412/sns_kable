/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
