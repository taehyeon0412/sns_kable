"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import React from "react";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="ko">
        <Head>
          <title>Kable - 카블, 카테고리 기반의 SNS</title>
          <meta
            name="description"
            content="카테고리 기반으로 소통하는 새로운 SNS, 카블에 오신 것을 환영합니다!"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="keywords"
            content="카블, Kable, SNS, 소셜 미디어, 카테고리 SNS"
          />
          <meta name="robots" content="index, follow" />
          <meta
            property="og:title"
            content="Kable - 카블, 카테고리 기반의 SNS"
          />
          <meta
            property="og:description"
            content="카테고리 기반으로 소통하는 새로운 SNS, 카블에 오신 것을 환영합니다!"
          />
          <meta
            property="og:image"
            content="https://sns-kable.vercel.app/asset/kable.name.png"
          />
          <meta property="og:url" content="https://sns-kable.vercel.app" />
          <meta property="og:type" content="website" />
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": "https://sns-kable.vercel.app",
                "name": "kable - 카블",
                "description": "카테고리 기반으로 소통하는 새로운 SNS, 카블에 오신 것을 환영합니다!",
                "publisher": {
                  "@type": "Organization",
                  "name": "kable"
                }
              }
            `}
          </script>
        </Head>
        <body>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
