import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react";
import Providers from "./providers";

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
 
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Quizz",
  description: "Put Your Knowledge to the Test with AI Genrated Quizz ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
     <Providers>
      {children}
     </Providers>
      </body>
    </html>
  );
}
