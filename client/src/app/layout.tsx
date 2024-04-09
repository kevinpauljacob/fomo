import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "fomo | Your ticket to endless excitement!",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} bg-gradient-to-br from-[#4e4376] to-[#616161] text-white`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
