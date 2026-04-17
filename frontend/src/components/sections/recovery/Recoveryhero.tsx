"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { C } from "@/lib/constants";

interface RecoveryHeroProps {
  photoSlot?: React.ReactNode;
}

export default function RecoveryHero({ photoSlot }: RecoveryHeroProps) {
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
        background: `url('/images/RelaxPage.webp') center bottom/cover no-repeat`,
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
        @media (max-width: 499px) {
          .recovery-hero-desktop { display: none !important; }
          .recovery-hero-mobile  { display: flex !important; }
        }
        @media (min-width: 500px) {
          .recovery-hero-desktop { display: block !important; }
          .recovery-hero-mobile  { display: none !important; }
        }
      `}</style>

      {/* ── DESKTOP layout (≥500px) ── */}
      <div
        className="recovery-hero-desktop"
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
        {/* Breadcrumb — inside text content */}
        <div
          style={{
            maxWidth: 480,
            paddingTop: "clamp(125px, 15vh, 150px)",
            paddingLeft: "clamp(0px, 2vw, 40px)",
            boxSizing: "border-box",
          }}
        >
          {/* Breadcrumb — inside text content */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.2)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "3px 10px", fontSize: "clamp(10px, 1vw, 12px)", color: "rgba(250,250,250,0.65)", marginBottom: 12, animation: mounted ? "fadeDown 0.6s cubic-bezier(0.22,0.61,0.36,1) both" : "none", animationDelay: "200ms", opacity: 0, boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 32px rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)", textDecoration: "none" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit", fontWeight: "normal", transition: "font-weight 0.2s ease", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.fontWeight = "bold"} onMouseLeave={(e) => e.currentTarget.style.fontWeight = "normal"}>
              Home
            </Link>
            &nbsp;›&nbsp; Recovery
          </div>

          <h1
            style={{
              color: C.light,
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 8,
              maxWidth: "100%",
              whiteSpace: "nowrap",
              animation: mounted ? "fadeUp 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
              animationDelay: "300ms",
              opacity: 0,
            }}
          >
            Recovery & Wellness
          </h1>

          <p
            style={{
              color: "#C8A96A",
              fontSize: "clamp(14px, 1.3vw, 16px)",
              fontStyle: "italic",
              marginBottom: 12,
              letterSpacing: "0.5px",
              animation: mounted ? "fadeDown 0.6s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
              animationDelay: "250ms",
              opacity: 0,
            }}
          >
            Rejuvenate with a View
          </p>

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
            At Mantra Medica, we believe that true healing happens when professional technique meets a tranquil environment. After the physical demands of trekking Mount Rinjani, your body deserves more than just a quick fix — it deserves a sanctuary.
          </p>
        </div>

        {/* Photo card — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: "clamp(40px, 6vw, 120px)",
            zIndex: 4,
            width: "clamp(270px, 27vw, 459px)",
            height: "clamp(351px, 36.45vw, 581px)",
            borderRadius: 24,
            overflow: "hidden",
            background: photoSlot ? "transparent" : "#f0f0f0",
            border: photoSlot ? "none" : `1px solid rgba(200,169,106,0.2)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(250,250,250,0.3)",
            fontSize: 13,
            animation: mounted ? "slideInRight 0.8s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
            animationDelay: "350ms",
            opacity: 0,
            backgroundImage: photoSlot ? undefined : `url('/images/DrIra.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!photoSlot && !photoSlot ? null : photoSlot}
        </div>

        {/* Doctor name — overlaid on photo */}
        <p
          style={{
            position: "absolute",
            bottom: "clamp(120px, 15vw, 280px)",
            right: "clamp(240px, 24vw, 80px)",
            zIndex: 5,
            color: "rgba(250,250,250,0.85)",
            fontSize: 12,
            padding: "8px 20px",
            borderRadius: 100,
            background: "rgba(133, 90, 49, 0.3)",
            backdropFilter: "blur(10px)",
            border: "0.5px solid rgba(240, 200, 150, 0.4)",
            display: "inline-block",
            animation: mounted ? "fadeIn 0.6s ease both" : "none",
            animationDelay: "600ms",
            opacity: 0,
            boxShadow: "inset 0 1px 2px rgba(240, 200, 150, 0.2), 0 8px 32px rgba(0, 0, 0, 0.25)",
          }}
        >
          dr. Nyoman Ardyatri Kairavini
        </p>
      </div>

      {/* ── MOBILE layout (<500px) ── */}
      <div
        className="recovery-hero-mobile"
        style={{
          display: "flex",
          flexDirection: "column",
          zIndex: 3,
          position: "relative",
          minHeight: "100vh",
          justifyContent: "flex-end",
          backgroundImage: `url('/images/RelaxPage.webp')`,
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
            width: 160,
            zIndex: 2,
            overflow: "visible",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.2)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "3px 10px", fontSize: 10, color: "rgba(250,250,250,0.65)", marginBottom: 9, width: "fit-content", boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 32px rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)", textDecoration: "none" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit", fontWeight: "normal", transition: "font-weight 0.2s ease", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.fontWeight = "bold"} onMouseLeave={(e) => e.currentTarget.style.fontWeight = "normal"}>
              Home
            </Link>
            &nbsp;›&nbsp; Recovery
          </div>

          <h1
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
            Recovery & Wellness
          </h1>

          <p
            style={{
              color: "#C8A96A",
              fontSize: "clamp(12px, 1.2vw, 14px)",
              fontStyle: "italic",
              marginBottom: 8,
              animation: mounted ? "fadeDown 0.6s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
              animationDelay: "200ms",
              opacity: mounted ? 1 : 0,
            }}
          >
            Rejuvenate with a View
          </p>

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
            At Mantra Medica, we believe that true healing happens when professional technique meets a tranquil environment.
          </p>
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
            opacity: mounted ? 1 : 0,
            marginTop: "-40px",
            minHeight: "45px",
          }}
        />

        {/* Doctor breadcrumb — left side */}
        <p
          style={{
            position: "absolute",
            bottom: "40%",
            left: 210,
            color: "rgba(250,250,250,0.85)",
            fontSize: 10,
            padding: "6px 12px",
            borderRadius: 100,
            background: `rgba(133, 90, 49, 0.3)`,
            backdropFilter: "blur(10px)",
            border: `0.5px solid rgba(240, 200, 150, 0.4)`,
            display: "inline-block",
            animation: mounted ? "fadeIn 0.6s ease both" : "none",
            animationDelay: "600ms",
            opacity: 0,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            zIndex: 4,
          }}
        >
          dr. Nyoman Ardyatri Kairavini
        </p>
      </div>
    </section>
  );
}