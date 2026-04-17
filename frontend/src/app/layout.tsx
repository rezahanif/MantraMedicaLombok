"use client";

import "./globals.css";
import { C } from "@/lib/constants";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  return (
    <html lang="en" style={{ overflowX: "hidden", width: "100%" }}>
      <body
        style={{
          background: C.light,
          fontFamily: "'Lato', sans-serif",
          color: C.dark,
          margin: 0,
          overflowX: "hidden",
          width: "100%",
          maxWidth: "100vw",
          position: "relative",
        }}
      >
        {!isAdminPage && <Navbar />}
        {children}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}