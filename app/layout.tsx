import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Director of Business Development - Nabat AI | Abu Dhabi, UAE",
  description: "Apply for the Director of Business Development position at Nabat AI. Nabat is building the operating system for nature — an AI-powered platform helping organizations assess, restore, monitor, and verify critical ecosystems at scale.",
  keywords: "Nabat AI, Business Development, Director, Abu Dhabi, UAE, Climate Technology, AI, Environmental Technology, Jobs, Careers",
  icons: {
    icon: "/title.png",
    shortcut: "/title.png",
    apple: "/title.png",
  },
  openGraph: {
    title: "Director of Business Development - Nabat AI",
    description: "Join Nabat AI in building the operating system for nature. Apply for our Director of Business Development position in Abu Dhabi, UAE.",
    url: "https://nabat.ai",
    siteName: "Nabat AI Careers",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
