import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { FloatingHomeButton } from "./components/home-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick & Morty Search",
  description:
    "A simple web app let you search your fav character from Rick And Morty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mt-10 flex w-full flex-row items-center justify-center">
          <p className="text-3xl font-bold text-white">
            Rick And Morty Characters Search <span>🤖</span>
          </p>
        </div>
        <div className="mt-20">{children}</div>

        <FloatingHomeButton />
      </body>
    </html>
  );
}
