import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/lib/smooth-scroll";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Flavortown Utils",
  description:
    "The browser extension that makes Flavortown actually good. Command palette, activity heatmap, inline devlogging, 5 hand-tuned themes, and 20+ more features.",
  icons: {
    icon: "/icon128.png",
    apple: "/icon128.png",
  },
  metadataBase: new URL("https://ftutils.hridya.tech"),
  openGraph: {
    title: "Flavortown Utils - 25+ Features, 5 Themes, One Extension",
    description:
      "The browser extension that makes Flavortown actually good. Command palette, activity heatmap, inline devlogging, and 20+ more features.",
    url: "https://ftutils.hridya.tech",
    siteName: "Flavortown Utils",
    images: [
      {
        url: "/icon128.png",
        width: 128,
        height: 128,
        alt: "Flavortown Utils icon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flavortown Utils",
    description:
      "The browser extension that makes Flavortown actually good.",
    images: ["/icon128.png"],
  },
  keywords: [
    "flavortown",
    "browser extension",
    "chrome extension",
    "firefox addon",
    "themes",
    "command palette",
    "developer tools",
    "productivity",
  ],
  authors: [{ name: "Flavortown Utils" }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SmoothScroll>
          <div className="grain-overlay" aria-hidden="true" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
