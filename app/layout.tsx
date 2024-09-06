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
      <html lang="en">
        <Head>
          <title>Kable - 카테고리가 있는 SNS!</title>
          <meta name="description" content="카테고리가 있는 SNS!" />
        </Head>
        <body>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
