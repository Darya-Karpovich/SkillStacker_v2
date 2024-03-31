import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme.provider";
import { Header } from "@/components/header/header";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex mx-40 flex-col">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
