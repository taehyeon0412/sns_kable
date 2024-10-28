import "./globals.css";
import React from "react";
import ClientProvider from "./ClientProvider";

export const metadata = {
  title: "Kable - 카블, 카테고리 기반의 SNS",
  description:
    "카테고리 기반으로 소통하는 새로운 SNS, 카블에 오신 것을 환영합니다!",
  keywords: ["카블", "Kable", "kable", "SNS", "소셜 미디어", "카테고리 SNS"],
  robots: "index, follow",
  openGraph: {
    title: "Kable - 카블, 카테고리 기반의 SNS",
    description:
      "카테고리 기반으로 소통하는 새로운 SNS, 카블에 오신 것을 환영합니다!",
    url: "https://sns-kable.vercel.app",
    images: [
      {
        url: "https://sns-kable.vercel.app/asset/kable.name.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  verification: {
    google: "awFiCytmipwlaafPegEUNLjWIg9Vu581hmhGrcWAR4I",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://sns-kable.vercel.app",
  name: "Kable - 카블",
  description:
    "카테고리 기반으로 소통하는 새로운 SNS, 카블에 오신 것을 환영합니다!",
  publisher: {
    "@type": "Organization",
    name: "Kable",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <ClientProvider>
        <body>{children}</body>
      </ClientProvider>
    </html>
  );
}
