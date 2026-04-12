"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { C } from "@/lib/constants";

interface AboutHeroProps {
  photoSlot?: React.ReactNode;
}

export default function AboutHero({ photoSlot }: AboutHeroProps) {
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
        background: `url('/images/ContactPage.webp') center -80px/cover no-repeat`,
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
        @keyframes scaleOverlay {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1);    }
        }
        @media (max-width: 499px) {
          .about-hero-desktop { display: none !important; }
          .about-hero-mobile  { display: flex !important; }
        }
        @media (min-width: 500px) {
          .about-hero-desktop { display: block !important; }
          .about-hero-mobile  { display: none !important; }
        }
      `}</style>
      {/* ── DESKTOP layout (≥500px) ── */}
      <div
        className="about-hero-desktop"
        style={{
          position: "relative",
          display: "block",
          zIndex: 3,
          height: "100vh",
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 40px",
          boxSizing: "border-box",
        }}
      >
        {/* Text content — top left */}
        <div
          style={{
            maxWidth: 480,
            paddingTop: "clamp(125px, 15vh, 150px)",
            paddingLeft: "clamp(0px, 2vw, 40px)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.2)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "4px 12px", fontSize: "clamp(10px, 1vw, 12px)", color: "rgba(250,250,250,0.7)", marginBottom: 12, animation: mounted ? "fadeDown 0.6s cubic-bezier(0.22,0.61,0.36,1) both" : "none", animationDelay: "200ms", opacity: 0, boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 32px rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)", textDecoration: "none" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit", fontWeight: "normal", transition: "font-weight 0.2s ease", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.fontWeight = "bold"} onMouseLeave={(e) => e.currentTarget.style.fontWeight = "normal"}>
              Home
            </Link>
            &nbsp;›&nbsp; About Us
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
            Where Science Meets the Spirit of Rinjani
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
            Founded to serve adventurers and the local community with equal heart.
          </p>
        </div>
      </div>

      {/* ── MOBILE layout (<500px) ── */}
      <div
        className="about-hero-mobile"
        style={{
          display: "flex",
          flexDirection: "column",
          zIndex: 3,
          position: "relative",
          padding: "clamp(32px, 8vw, 48px) clamp(16px, 5vw, 24px) 0",
          minHeight: "100vh",
          justifyContent: "center",
        }}
      >
        <nav className="flex items-center gap-2" aria-label="Breadcrumb" style={{ fontSize: 11, marginBottom: 9, display: "inline-flex", background: "rgba(255,255,255,0.2)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "3px 10px", boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 32px rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)" }}>
          <Link
            href="/"
            className="px-0 py-1 rounded-full transition-all"
            style={{
              textDecoration: "none",
              color: C.tealLight,
              fontWeight: "normal",
              transition: "font-weight 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => e.currentTarget.style.fontWeight = "bold"}
            onMouseLeave={(e) => e.currentTarget.style.fontWeight = "normal"}
          >
            Home
          </Link>
          <span style={{ color: C.tealLight, opacity: 0.5 }}>›</span>
          <span
            className="px-0 py-1 rounded-full"
            style={{
              color: C.light,
            }}
          >
            About
          </span>
        </nav>

        <div style={{ paddingBottom: 24 }}>
          <h1
            style={{
              color: C.light,
              fontSize: "clamp(20px, 5.1vw, 27px)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 12,
              whiteSpace: "nowrap",
            }}
          >
            Where Science Meets the Spirit of Rinjani
          </h1>
          <p
            style={{
              color: "rgba(250,250,250,0.85)",
              fontSize: "clamp(12px, 1.1vw, 14px)",
              lineHeight: 1.8,
            }}
          >
            Founded to serve adventurers and the local community with equal heart.
          </p>
        </div>
      </div>
    </section>
  );
}