import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header/header';
import { ThemeProvider } from '@/components/theme.provider';
import React from 'react';
import './globals.css';
import { QueryClientProvider } from './providers/query-client-provider';
import NextAuthProvider from './providers/session-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SkillStacker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              <Toaster richColors toastOptions={{}} />
            </ThemeProvider>
          </NextAuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
