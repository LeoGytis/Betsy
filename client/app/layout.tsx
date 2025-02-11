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
            className={`${font.className} mx-auto max-w-screen-xl py-12 px-4 lg:p-12`}
          >
            {children}
          </body>
        </BalanceProvider>
      </QueryClientProvider>
    </html>
  );
}
