"use client";

import { useEffect, useState } from "react";
import { C } from "@/lib/constants";

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
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100vw",
        boxSizing: "border-box",
        background: `linear-gradient(135deg, #1C3A2E 0%, #2A5240 50%, #1A3028 100%)`,
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
      `}</style>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to right, rgba(15,30,20,0.92) 40%, rgba(15,30,20,0.3) 100%)`,
          zIndex: 2,
          pointerEvents: "none",
          animation: mounted ? "fadeIn 0.8s ease both" : "none",
          animationDelay: "100ms",
        }}
      />

      {/* ── DESKTOP layout (≥500px) ── */}
      <div
        className="hidden min-[500px]:block"
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
        {/* Text content — top left */}
        <div
          style={{
            maxWidth: 480,
            paddingTop: "clamp(125px, 15vh, 150px)",
            paddingLeft: "clamp(0px, 2vw, 40px)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "4px 12px", fontSize: "clamp(10px, 1vw, 12px)", color: "rgba(250,250,250,0.7)", marginBottom: 12, animation: mounted ? "fadeDown 0.6s cubic-bezier(0.22,0.61,0.36,1) both" : "none", animationDelay: "200ms", opacity: 0 }}>
            Home &nbsp;›&nbsp; Services
          </div>

          <h1
            style={{
              color: C.light,
              fontSize: "clamp(32px, 4vw, 48px)",
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

          <p
            style={{
              color: "rgba(250,250,250,0.85)",
              fontSize: "clamp(13px, 1.2vw, 15px)",
              lineHeight: 1.8,
              marginBottom: 12,
              animation: mounted ? "fadeUp 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
              animationDelay: "450ms",
              opacity: 0,
            }}
          >
            Expert Care in the Heart of Senaru. We combine clinical excellence with a deep understanding of the unique health challenges faced by travelers and adventurers. Our facility handles everything from routine health screenings to critical emergency responses.
          </p>
          <p
            style={{
              color: "rgba(250,250,250,0.45)",
              fontSize: "clamp(11px, 0.9vw, 12px)",
            }}
          >
            dr. I Gede Yoga Mahendra Putra
          </p>
        </div>

        {/* Photo card — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: "clamp(40px, 6vw, 120px)",
            zIndex: 4,
            width: "clamp(300px, 30vw, 510px)",
            height: "clamp(390px, 40.5vw, 645px)",
            borderRadius: 24,
            overflow: "hidden",
            background: photoSlot
              ? "transparent"
              : `linear-gradient(to top, ${C.cardDark}, ${C.teal}40)`,
            border: photoSlot
              ? "none"
              : `1px solid ${C.tealLight}30`,
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
          {photoSlot ?? "Service Hero Photo"}
        </div>
      </div>

      {/* ── MOBILE layout (<500px) ── */}
      <div
        className="flex flex-col min-[500px]:hidden"
        style={{
          zIndex: 3,
          position: "relative",
          padding: "clamp(32px, 8vw, 48px) clamp(16px, 5vw, 24px) 0",
          minHeight: "100vh",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "3px 10px", fontSize: 10, color: "rgba(250,250,250,0.65)", marginBottom: 9, width: "fit-content" }}>
          Home &nbsp;›&nbsp; Services
        </div>

        <div style={{ paddingBottom: 24 }}>
          <h1
            style={{
              color: C.light,
              fontSize: "clamp(24px, 6vw, 32px)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            Medical Services at Mantra Medica
          </h1>
          <p
            style={{
              color: "rgba(250,250,250,0.85)",
              fontSize: "clamp(12px, 1.1vw, 14px)",
              lineHeight: 1.8,
            }}
          >
            Expert Care in the Heart of Senaru. We combine clinical excellence with a deep understanding of the unique health challenges faced by travelers and adventurers.
          </p>
          <p
            style={{
              color: "rgba(250,250,250,0.45)",
              fontSize: 11,
              marginTop: 12,
            }}
          >
            dr. I Gede Yoga Mahendra Putra
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "clamp(36px, 22vw, 56px)",
              height: "clamp(46px, 28vw, 72px)",
              borderRadius: 24,
              overflow: "hidden",
              background: photoSlot
                ? "transparent"
                : `linear-gradient(to top, ${C.cardDark}, ${C.teal}40)`,
              border: photoSlot
                ? "none"
                : `1px solid ${C.tealLight}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(250,250,250,0.3)",
              fontSize: 12,
            }}
          >
            {photoSlot ?? "Service Photo"}
          </div>
        </div>
      </div>
    </section>
  );
}