"use client";
import { Quicksand } from "next/font/google";
import "./globals.css";

const font = Quicksand({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} mx-auto max-w-screen-xl p-8 md:p-12 lg:p-20 lg:py-12`}
      >
        {children}
      </body>
    </html>
  );
}
