import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/common/LenisProvider";
import MagneticCursor from "@/components/common/MagneticCursor";
import Preloader from "@/components/common/Preloader";

export const metadata: Metadata = {
  title: "Syed Haziq",
  description: "Portfolio of Syed Haziq, Frontend Developer",
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
        </LenisProvider>
      </body>
    </html>
  );
}
