"use client";

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
        background: `linear-gradient(135deg, #3D2208 0%, #6B4425 40%, #8B6340 100%)`,
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
          background: `linear-gradient(to right, rgba(30,14,4,0.88) 40%, rgba(30,14,4,0.2) 100%)`,
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
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "3px 10px", fontSize: "clamp(10px, 1vw, 12px)", color: "rgba(250,250,250,0.65)", marginBottom: 12, animation: mounted ? "fadeDown 0.6s cubic-bezier(0.22,0.61,0.36,1) both" : "none", animationDelay: "200ms", opacity: 0 }}>
            Home &nbsp;›&nbsp; Recovery
          </div>

          <h1
            style={{
              color: C.light,
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 8,
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
          <p
            style={{
              color: "rgba(250,250,250,0.45)",
              fontSize: "clamp(11px, 0.9vw, 12px)",
              marginTop: 12,
            }}
          >
            dr. Nyoman Ardyatri Kairavini
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
              : `linear-gradient(to top, #3D2208, rgba(200,169,106,0.3))`,
            border: photoSlot
              ? "none"
              : `1px solid rgba(200,169,106,0.2)`,
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
          {photoSlot ?? "Recovery Hero Photo"}
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
          Home &nbsp;›&nbsp; Recovery
        </div>

        <div style={{ paddingBottom: 24 }}>
          <h1
            style={{
              color: C.light,
              fontSize: "clamp(24px, 6vw, 32px)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 6,
            }}
          >
            Recovery & Wellness
          </h1>
          <p
            style={{
              color: "#C8A96A",
              fontSize: "clamp(12px, 1.2vw, 14px)",
              fontStyle: "italic",
              marginBottom: 12,
            }}
          >
            Rejuvenate with a View
          </p>
          <p
            style={{
              color: "rgba(250,250,250,0.85)",
              fontSize: "clamp(12px, 1.1vw, 14px)",
              lineHeight: 1.8,
            }}
          >
            At Mantra Medica, we believe that true healing happens when professional technique meets a tranquil environment.
          </p>
          <p
            style={{
              color: "rgba(250,250,250,0.45)",
              fontSize: 11,
              marginTop: 12,
            }}
          >
            dr. Nyoman Ardyatri Kairavini
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
                : `linear-gradient(to top, #3D2208, rgba(200,169,106,0.3))`,
              border: photoSlot
                ? "none"
                : `1px solid rgba(200,169,106,0.2)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(250,250,250,0.3)",
              fontSize: 12,
            }}
          >
            {photoSlot ?? "Recovery Photo"}
          </div>
        </div>
      </div>
    </section>
  );
}