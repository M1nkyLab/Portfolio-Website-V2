import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/common/LenisProvider";
import MagneticCursor from "@/components/common/MagneticCursor";
import Preloader from "@/components/common/Preloader";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Syed Haziq | Portfolio",
  description: "Vibe Coding Intern & Frontend Developer showcasing my latest projects and skills.",
  keywords: ["Syed Haziq", "Web Developer", "Portfolio", "Frontend Developer", "Next.js"],
  openGraph: {
    title: "Syed Haziq | Portfolio",
    description: "Vibe Coding Intern & Frontend Developer showcasing my latest projects and skills.",
    url: "https://portfolio-website-v2-nu.vercel.app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <LenisProvider>
          <MagneticCursor />
          {children}
          <SpeedInsights />
        </LenisProvider>
      </body>
    </html>
  );
}
