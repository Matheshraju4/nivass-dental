import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import TanstackProvider from "./tanstackProvider";
import { Toaster } from "@/components/ui/sonner"

const outfit = Outfit({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nivass Dental Clinic",
  description: "Nivass Dental Clinic",
  icons: {
    icon: "/dental-care.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        
        <TanstackProvider>
          <Navbar />
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
          {children}
          <Toaster richColors />
        </TanstackProvider>
      </body>
    </html>
  );
}
