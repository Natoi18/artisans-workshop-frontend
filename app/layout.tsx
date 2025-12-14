import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import PiLoader from "./pi-loader";

export const metadata: Metadata = {
  title: "Made with App Studio",
  description:
    "Skill-sharing made simple: connect, learn, and pay artisans worldwide using Pi.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body className="min-h-screen bg-background antialiased">
        {/* ✅ Load Pi SDK ONCE for the entire app */}
        <PiLoader />

        {children}
      </body>
    </html>
  );
}
