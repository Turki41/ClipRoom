import type { Metadata } from "next";
import "./globals.css";
import { satoshi } from "@/fonts/font";
import { Karla } from "next/font/google";

const geistKarla = Karla({
  variable: "--font-geist-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClipRoom",
  description: "Record, share, and manage your clips in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistKarla.variable} ${satoshi.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
