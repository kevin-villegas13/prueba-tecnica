import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/navigation/main-nav";
import { Toaster } from "sonner";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contact Center Dashboard",
  description: "Real-time agent and client management system",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <MainNav />
          <main className="container mx-auto p-4">{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
