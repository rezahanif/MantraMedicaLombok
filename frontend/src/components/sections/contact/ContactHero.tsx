// src/components/contact/ContactHero.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { C } from "@/lib/constants";

interface ContactHeroProps {
  photoSlot?: React.ReactNode;
}

export default function ContactHero({ photoSlot }: ContactHeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100vw",
        boxSizing: "border-box",
        background: `url('/images/ContactPage.webp') center bottom/cover no-repeat`,
        overflow: "hidden",
      }}
    >
      {/* ── Keyframe definitions ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(48px) translateY(0); }
          to   { opacity: 1; transform: translateX(0)    translateY(0); }
        }
        @keyframes slideUpStats {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 499px) {
          .contact-hero-desktop { display: none !important; }
          .contact-hero-mobile  { display: flex !important; }
        }
        @media (min-width: 500px) {
          .contact-hero-desktop { display: block !important; }
          .contact-hero-mobile  { display: none !important; }
        }
        @media (max-width: 499px) and (min-height: 731px) {
          .contact-text-mobile { top: 10% !important; }
          .contact-mobile-breadcrumb { margin-bottom: 4px !important; }
          .contact-mobile-title { margin-bottom: 6px !important; }
        }
      `}</style>

      {/* Desktop layout */}
      <div
        className="contact-hero-desktop"
        style={{
          position: "relative",
          zIndex: 3,
          height: "100vh",
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 40px",
          boxSizing: "border-box",
        }}
      >
        {/* Text content */}
        <div
          style={{
            maxWidth: 480,
            paddingTop: "clamp(125px, 10vh, 150px)",
            paddingLeft: "clamp(0px, 2vw, 40px)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.2)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "4px 12px", fontSize: "clamp(10px, 1vw, 12px)", color: "rgba(250,250,250,0.7)", marginBottom: 12, animation: mounted ? "fadeDown 0.6s cubic-bezier(0.22,0.61,0.36,1) both" : "none", animationDelay: "200ms", opacity: 0, boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 32px rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)", textDecoration: "none" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit", fontWeight: "normal", transition: "font-weight 0.2s ease", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.fontWeight = "bold"} onMouseLeave={(e) => e.currentTarget.style.fontWeight = "normal"}>
              Home
            </Link>
            &nbsp;›&nbsp; Contact
          </div>

          <h1
            style={{
              color: C.light,
              fontSize: "clamp(27px, 3.4vw, 41px)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 16,
              animation: mounted ? "fadeUp 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
              animationDelay: "300ms",
              opacity: 0,
              whiteSpace: "nowrap",
            }}
          >
            Find Us & Get in Touch
          </h1>

          <p
            style={{
              color: "rgba(250,250,250,0.85)",
              fontSize: "clamp(13px, 1.2vw, 15px)",
              lineHeight: 1.8,
              animation: mounted ? "fadeUp 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
              animationDelay: "450ms",
              opacity: 0,
            }}
          >
            We're always here — whether you need urgent care or want to book your recovery session.
          </p>
        </div>
      </div>

      {/* Mobile layout */}
      <div
        className="contact-hero-mobile"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "absolute",
          inset: 0,
          zIndex: 5,
          minHeight: "100vh",
          backgroundImage: `url('/images/ContactPage.webp')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Text content — left side, upper-mid zone */}
        <div
          className="contact-text-mobile"
          style={{
            position: "absolute",
            top: "18%",
            left: 24,
            right: "52%",
            width: 200,
            zIndex: 2,
            overflow: "visible",
          }}
        >
          <div className="contact-mobile-breadcrumb" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.2)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "3px 10px", fontSize: 10, color: "rgba(250,250,250,0.65)", marginBottom: 9, width: "fit-content", boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 32px rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)", textDecoration: "none" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit", fontWeight: "normal", transition: "font-weight 0.2s ease", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.fontWeight = "bold"} onMouseLeave={(e) => e.currentTarget.style.fontWeight = "normal"}>
              Home
            </Link>
            &nbsp;›&nbsp; Contact
          </div>

          <h1
            className="contact-mobile-title"
            style={{
              color: C.light,
              fontSize: 28,
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: 6,
              animation: mounted ? "fadeUp 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
              animationDelay: "300ms",
              opacity: mounted ? 1 : 0,
            }}
          >
            Find Us & Get in Touch
          </h1>

          <p
            style={{
              color: "rgba(250,250,250,0.85)",
              fontSize: 12,
              lineHeight: 1.6,
              animation: mounted ? "fadeUp 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
              animationDelay: "400ms",
              opacity: mounted ? 1 : 0,
            }}
          >
            We're always here — whether you need urgent care or want to book your recovery session.
          </p>
        </div>

        {/* Stats card shape — bay/cove shape (large rounded top), anchored to bottom */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            background: C.light,
            borderRadius: "44px 44px 0 0",
            padding: "50px 16px 70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 -8px 32px rgba(0,0,0,0.08)",
            animation: mounted ? "slideUpStats 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
            animationDelay: "580ms",
            opacity: mounted ? 1 : 0,
            marginTop: "-40px",
            minHeight: "80px",
          }}
        />
      </div>
    </section>
  );
}