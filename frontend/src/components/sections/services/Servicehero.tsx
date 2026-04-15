"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { C } from "@/lib/constants";
import { stats } from "@/data/homeData";

interface ServiceHeroProps {
  photoSlot?: React.ReactNode;
}

export default function ServiceHero({ photoSlot }: ServiceHeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        paddingTop: 51,
        width: "100%",
        maxWidth: "100vw",
        boxSizing: "border-box",
        background: "#FFFFFF",
      }}
      className="overflow-visible"
    >
      {/* ── Keyframe definitions ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideUpStats {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleOverlay {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 499px) {
          .service-hero-stats   { display: none !important; }
          .service-hero-desktop { display: none !important; }
          .service-hero-mobile  { display: flex !important; }
        }
        @media (min-width: 500px) {
          .service-hero-stats   { display: flex !important; }
          .service-hero-desktop { display: block !important; }
          .service-hero-mobile  { display: none !important; }
        }
      `}</style>

      {/* Hero image — z:3, sits above stats card */}
      <Image
        src="/images/MedPage.webp"
        alt=""
        fill
        priority
        style={{
          objectFit: "cover",
          objectPosition: "center -37px",
          zIndex: 3,
          animation: mounted ? "scaleOverlay 1.2s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
        }}
      />

      {/* ── STATS CARD — z:1, sits BEHIND the hero image ──
          Direct child of <section> so it has its own stacking context,
          not inheriting from the text/photo parent. */}
      <div
        className="service-hero-stats"
        style={{
          position: "absolute",
          bottom: 0,
          left: -40,
          width: "63%",
          zIndex: 1,
          background: C.light,
          padding: "clamp(25px, 2.5vw, 36px) clamp(24px, 3vw, 42px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(35px, 4.8vw, 70px)",
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          animation: mounted ? "slideUpStats 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
          animationDelay: "650ms",
          opacity: 0,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              animation: mounted ? "fadeUp 0.5s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
              animationDelay: `${700 + i * 80}ms`,
              opacity: 0,
            }}
          >
            <span style={{ fontSize: "clamp(19px, 1.92vw, 26px)" }}>{s.icon}</span>
            <span
              style={{
                color: C.dark,
                fontSize: "clamp(0.66rem, 0.9vw, 0.84rem)",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── DESKTOP text + photo — z:5, above image AND stats ── */}
      <div
        className="service-hero-desktop"
        style={{
          position: "relative",
          display: "block",
          height: "calc(100vh - 51px)",
          maxWidth: 1400,
          zIndex: 5,
          margin: "0 auto",
          padding: "0 40px",
          boxSizing: "border-box",
        }}
      >
        {/* Text — top left */}
        <div
          style={{
            maxWidth: 480,
            paddingTop: "clamp(32px, 8vh, 80px)",
            paddingLeft: "clamp(0px, 2vw, 40px)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.2)",
              border: "0.5px solid rgba(255,255,255,0.3)",
              borderRadius: 100,
              padding: "4px 12px",
              fontSize: "clamp(10px, 1vw, 12px)",
              color: "rgba(250,250,250,0.7)",
              marginBottom: 12,
              animation: mounted ? "fadeDown 0.6s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
              animationDelay: "200ms",
              opacity: 0,
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 32px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "normal",
                transition: "font-weight 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.fontWeight = "bold")}
              onMouseLeave={(e) => (e.currentTarget.style.fontWeight = "normal")}
            >
              Home
            </Link>
            &nbsp;›&nbsp; Services
          </div>

          <h1
            style={{
              color: C.light,
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 16,
              animation: mounted ? "fadeUp 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
              animationDelay: "300ms",
              opacity: 0,
            }}
          >
            Medical Services at Mantra Medica
          </h1>

          <div
            style={{
              color: "rgba(250,250,250,0.85)",
              fontSize: 14,
              lineHeight: 1.8,
              animation: mounted ? "fadeUp 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
              animationDelay: "450ms",
              opacity: 0,
            }}
          >
            Expert Care in the Heart of Senaru. We combine clinical excellence with a deep understanding of the unique health challenges faced by travelers and adventurers. Our facility handles everything from routine health screenings to critical emergency responses.
          </div>
        </div>

        {/* Photo card — bottom right, z:4 inherited from parent z:5 */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: "clamp(40px, 6vw, 120px)",
            width: "clamp(300px, 30vw, 510px)",
            height: "clamp(390px, 40.5vw, 645px)",
            borderRadius: 24,
            overflow: "hidden",
            background: photoSlot
              ? "transparent"
              : `linear-gradient(to top, ${C.cardDark}, ${C.teal}40)`,
            border: photoSlot ? "none" : `1px solid ${C.tealLight}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(250,250,250,0.3)",
            fontSize: 13,
            animation: mounted ? "slideInRight 0.8s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
            animationDelay: "350ms",
            opacity: 0,
          }}
        >
          {photoSlot ?? "Doctor Photo"}
        </div>

        <p
          style={{
            position: "absolute",
            bottom: "clamp(120px, 15vw, 280px)",
            right: "clamp(240px, 24vw, 80px)",
            color: "rgba(250,250,250,0.85)",
            fontSize: 12,
            padding: "8px 20px",
            borderRadius: 100,
            background: `${C.tealLight}20`,
            backdropFilter: "blur(10px)",
            border: `1px solid ${C.tealLight}40`,
            display: "inline-block",
            animation: mounted ? "fadeIn 0.6s ease both" : "none",
            animationDelay: "600ms",
            opacity: 0,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
          }}
        >
          dr. I Gede Yoga Mahendra Putra
        </p>
      </div>

      {/* ── MOBILE layout (max-width: 500px) ── */}
      <div
        className="service-hero-mobile"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "absolute",
          inset: 0,
          zIndex: 5,
          minHeight: "100vh",
          backgroundImage: `url('/images/MedPage.webp')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Doctor photo — reduced size, right side */}
        <div
          style={{
            position: "absolute",
            width: "50%",
            height: "65%",
            right: 0,
            bottom: "15%",
            zIndex: 0,
            overflow: "hidden",
            borderRadius: "16px 0 0 0",
          }}
        >
          {photoSlot ?? (
            <div style={{ width: "100%", height: "100%", background: C.teal }} />
          )}
        </div>

        {/* Text content — left side, upper-mid zone */}
        <div
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
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.2)",
              border: "0.5px solid rgba(255,255,255,0.3)",
              borderRadius: 100,
              padding: "3px 10px",
              fontSize: 10,
              color: "rgba(250,250,250,0.65)",
              marginBottom: 9,
              width: "fit-content",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 32px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(10px)",
              textDecoration: "none",
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "normal",
                transition: "font-weight 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.fontWeight = "bold")}
              onMouseLeave={(e) => (e.currentTarget.style.fontWeight = "normal")}
            >
              Home
            </Link>
            &nbsp;›&nbsp; Services
          </div>
          <h1 style={{ color: C.light, fontSize: 28, fontWeight: 700, lineHeight: 1.3, marginBottom: 14, animation: mounted ? "fadeUp 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none", animationDelay: "300ms", opacity: mounted ? 1 : 0 }}>
            Medical Services at Mantra Medica
          </h1>
          <div style={{ color: "rgba(250,250,250,0.85)", fontSize: 12, lineHeight: 1.6, animation: mounted ? "fadeUp 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none", animationDelay: "450ms", opacity: mounted ? 1 : 0 }}>
            Expert Care in the Heart of Senaru.
          </div>
        </div>

        {/* Stats card — bay/cove shape (large rounded top), anchored to bottom */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            background: C.light,
            borderRadius: "44px 44px 0 0",
            padding: "32px 20px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            boxShadow: "0 -8px 32px rgba(0,0,0,0.08)",
            animation: mounted ? "slideUpStats 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
            animationDelay: "580ms",
            opacity: 0,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 6,
                animation: mounted ? "fadeUp 0.5s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
                animationDelay: `${640 + i * 70}ms`,
                opacity: 0,
              }}
            >
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <span
                style={{
                  color: C.dark,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.4px",
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Doctor breadcrumb — left side */}
        <p
          style={{
            position: "absolute",
            bottom: "40%",
            left: 120,
            color: "rgba(250,250,250,0.85)",
            fontSize: 10,
            padding: "6px 12px",
            borderRadius: 100,
            background: `rgba(250,250,250,0.15)`,
            backdropFilter: "blur(10px)",
            border: `1px solid rgba(250,250,250,0.3)`,
            display: "inline-block",
            animation: mounted ? "fadeIn 0.6s ease both" : "none",
            animationDelay: "600ms",
            opacity: 0,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            zIndex: 4,
          }}
        >
          dr. I Gede Yoga Mahendra Putra
        </p>
      </div>
    </section>
  );
}