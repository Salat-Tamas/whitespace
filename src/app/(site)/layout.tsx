import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/pageSide/Navbar";
import Footer from "@/components/pageSide/Footer";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { AI } from "./actions";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whitespace hack project",
  description: "# Gamification for the social good",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "select-none")}>
        <AI>
          <Navbar />
          <div className="pt-14 sm:pt-0">
            {children}
            <Analytics />
          </div>
          <Footer />
          <Toaster />
        </AI>
      </body>
    </html>
  );
}
