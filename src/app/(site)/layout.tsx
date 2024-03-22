import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/pageSide/Navbar";
import Footer from "@/components/pageSide/Footer";
import { cn } from "@/lib/utils";

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
      <body className={cn(inter.className, 'select-none' )}>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
