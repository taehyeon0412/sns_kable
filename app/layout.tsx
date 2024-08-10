"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";

/* const inter = Inter({ subsets: ["latin"] }); */

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <Head>
          <title>Kable - 카테고리가 있는 SNS!</title>
          <meta name="description" content="카테고리가 있는 SNS!" />
        </Head>
        <body /* className={inter.className} */>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
