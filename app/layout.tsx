import { Header } from "@/components/header/header";
import { ThemeProvider } from "@/components/theme.provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./providers/session-provider";
import { QueryClientProvider } from "./providers/query-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SlillStacker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <NextAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex mx-40 flex-col">
                <Header />
                {children}
                <Analytics />
              </div>
            </ThemeProvider>
          </NextAuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
