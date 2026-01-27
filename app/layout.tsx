import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import ClientLayout from "../components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://makeyou.online";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MakeYou - Premium Web Development & Digital Solutions | India",
    template: "%s | MakeYou Digital",
  },
  description:
    "Professional web development agency in India. We build stunning websites for local businesses - Kirana stores, Salons, Clinics, Gyms, Cafes & Coaching Centers. Affordable pricing starting ₹4,999.",
  keywords: [
    "web development India",
    "website design",
    "affordable website",
    "local business website",
    "digital agency India",
    "MakeYou",
    "website for kirana store",
    "salon website",
    "clinic website",
    "gym website",
    "cafe website",
    "coaching center website",
    "Next.js developer",
    "React developer India",
    "freelance web developer",
  ],
  authors: [{ name: "Ronak Kumar Singh", url: siteUrl }],
  creator: "Ronak Kumar Singh",
  publisher: "MakeYou Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "MakeYou Digital",
    title: "MakeYou - Premium Web Development & Digital Solutions",
    description:
      "Professional web development for Indian local businesses. Stunning websites starting ₹4,999. Kirana stores, Salons, Clinics, Gyms & more.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "MakeYou Digital - Web Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MakeYou - Premium Web Development & Digital Solutions",
    description:
      "Professional web development for Indian local businesses. Stunning websites starting ₹4,999.",
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@makeyouonline",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "MakeYou Digital",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
      },
      description:
        "Professional web development agency specializing in affordable websites for Indian local businesses.",
      email: "ronakkumar20062006@gmail.com",
      telephone: "+91-7009097789",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "India",
      },
      sameAs: [
        "https://twitter.com/makeyouonline",
        "https://instagram.com/makeyouonline",
        "https://linkedin.com/company/makeyouonline",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "MakeYou Digital",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "MakeYou Digital",
      image: `${siteUrl}/og-image.jpg`,
      telephone: "+91-7009097789",
      email: "ronakkumar20062006@gmail.com",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "21:00",
      },
    },
    {
      "@type": "Service",
      name: "Website Development",
      provider: { "@id": `${siteUrl}/#organization` },
      description: "Professional website development for local businesses in India",
      areaServed: "India",
      offers: {
        "@type": "Offer",
        price: "4999",
        priceCurrency: "INR",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased scrollbar-hide">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent text-foreground relative`}
      >
        <ClientLayout>
          <SmoothScroll>{children}</SmoothScroll>
        </ClientLayout>
      </body>
    </html>
  );
}
