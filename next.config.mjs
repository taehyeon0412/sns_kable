/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      //AWS
    ],
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "k.kakaocdn.net",
      },
    ],
  },
};

export default nextConfig;
