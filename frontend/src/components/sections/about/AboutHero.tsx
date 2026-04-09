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
        background: `linear-gradient(135deg, ${C.dark} 0%, ${C.cardMid} 60%, ${C.teal}55 100%)`,
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
      `}</style>
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to right, ${C.dark}D0 28%, ${C.dark}50 55%, transparent 100%)`,
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
            Home &nbsp;›&nbsp; About Us
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
            Where Science Meets{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${C.tealLight}, ${C.teal})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontStyle: "italic",
              }}
            >
              the Spirit of Rinjani
            </span>
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
          {photoSlot ?? "About Hero Photo"}
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
        <nav className="flex items-center gap-2" aria-label="Breadcrumb" style={{ fontSize: 11, marginBottom: 9 }}>
          <Link
            href="/"
            className="px-2 py-1 rounded-full border transition-colors"
            style={{
              borderColor: C.border,
              color: C.tealLight,
              backgroundColor: `${C.cardDark}80`,
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <span style={{ color: C.tealLight, opacity: 0.5 }}>›</span>
          <span
            className="px-2 py-1 rounded-full border"
            style={{
              borderColor: C.teal,
              color: C.light,
              backgroundColor: `${C.teal}22`,
            }}
          >
            About
          </span>
        </nav>

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
            {photoSlot ?? "About Photo"}
          </div>
        </div>
      </div>
    </section>
  );
}