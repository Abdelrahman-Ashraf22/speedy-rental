import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SearchProvider } from "./context/SearchContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Add font-display swap
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Add font-display swap
});

export const metadata: Metadata = {
  title: "Speedy Rentals / Home",
  description:
    "Discover Speedy Rentals, founded in 2010 in Cairo, Egypt. We offer reliable, affordable car rentals with a wide selection of vehicles, easy booking, and top-notch service. Learn about our mission for safety, convenience, and sustainability, and why we're the trusted choice for your adventures. Meet our passionate team dedicated to unforgettable experiences.",

  icons: {
    icon: "/public/logo.webp",
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
        {/* Preconnect to critical origins */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://maps.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
        />

        {/* DNS Prefetch for faster lookups */}
        <link
          rel="dns-prefetch"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="dns-prefetch"
          href="https://maps.googleapis.com"
        />

        {/* Defer Google Maps loading */}
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=marker&v=weekly`}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=marker&v=weekly`}
        />
        <SearchProvider>{children}</SearchProvider>
      </body>
    </html>
  );
}
