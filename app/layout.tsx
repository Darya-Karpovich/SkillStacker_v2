import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header } from '@/components/header/header';
import { ThemeProvider } from '@/components/theme.provider';

import React from 'react';
import './globals.css';
import { QueryClientProvider } from './providers/query-client-provider';
import NextAuthProvider from './providers/session-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SlillStacker',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider>
          <NextAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="mx-40 flex flex-col">
                <Header />
                <React.Suspense
                  fallback={<div className="text-white">Loading...</div>}
                >
                  {children}
                </React.Suspense>
                <Analytics />
              </div>
            </ThemeProvider>
          </NextAuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
