import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import ClientLayout from "../components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Portfolio | Digital Architect",
  description: "High-end digital product design and development studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased scrollbar-hide">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent text-foreground relative`}
      >
        <ClientLayout>
          <SmoothScroll>{children}</SmoothScroll>
        </ClientLayout>
      </body>
    </html>
  );
}
