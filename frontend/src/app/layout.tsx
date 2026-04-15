import "./globals.css";
import { C } from "@/lib/constants";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export const metadata = {
  title: "Mantra Medica",
  description: "Your Health & Recovery Hub at the Gateway to Rinjani",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ overflowX: "hidden", width: "100%" }}>
      <body
        style={{
          background: C.light,
          fontFamily: "'Inter', sans-serif",
          color: C.dark,
          margin: 0,
          overflowX: "hidden",
          width: "100%",
          maxWidth: "100vw",
          position: "relative",
        }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}