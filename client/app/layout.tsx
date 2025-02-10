"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { BalanceProvider } from "./hooks/useBalance";
import "./styles/globals.css";

const font = Quicksand({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Website Title",
  description: "Website description",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/bet_logo.png",
        href: "/images/bet_logo.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/bet_logo.png",
        href: "/images/bet_logo.png",
      },
    ],
  },
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <BalanceProvider>
          <body
            className={`${font.className} mx-auto max-w-screen-xl p-4 md:p-8 lg:p-12 lg:py-12`}
          >
            {children}
          </body>
        </BalanceProvider>
      </QueryClientProvider>
    </html>
  );
}
