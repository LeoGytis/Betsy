"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Quicksand } from "next/font/google";
import { BalanceProvider } from "./hooks/useBalance";
import "./styles/globals.css";

const font = Quicksand({
  subsets: ["latin"],
});

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
