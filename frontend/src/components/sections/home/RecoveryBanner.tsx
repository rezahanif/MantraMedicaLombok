"use client";

// src/components/home/WorldClassAndRecovery.tsx
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { C } from "@/lib/constants";

const miniServices = [
  { title: "Pre-Trekking Health Certificate", icon: "🏥", imagePath: "/images/pre-trekking.jpg" },
  { title: "Rinjani Deep Tissue Massage",     icon: "💆", imagePath: "/images/deep-tissue.jpg"  },
  { title: "Altitude Sickness Treatment",     icon: "⛰️", imagePath: "/images/altitude.jpg"     },
  { title: "Waterfall Post-Walk Reflexology", icon: "🦶", imagePath: "/images/reflexology.jpg"  },
];

export default function WorldClassAndRecovery() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Shared animation helper
  const anim = (name: string, delay: number, extra = "") =>
    inView ? `${name} 0.7s cubic-bezier(0.22,0.61,0.36,1) ${delay}ms both${extra ? ", " + extra : ""}` : "none";

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cardPop {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes quoteReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── MAIN SECTION ── */}
      <section
        ref={sectionRef}
        style={{ position: "relative", overflow: "hidden", minHeight: 480, display: "flex", alignItems: "stretch" }}
      >
        {/* Background Image */}
        <Image
          src="/images/recovery.webp"
          alt="Recovery Banner"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
            position: "absolute",
          }}
        />
        
        {/* Gradient Hero Image below text layer */}
        <Image
          src="/images/gradienthero.webp"
          alt="Gradient Background"
          width={1920}
          height={540}
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
            position: "absolute",
            top: 480,
            left: 0,
            width: "100%",
            height: "auto",
            zIndex: 0,
          }}
        />

        {/* ── DESKTOP ── */}
        <div
          className="hidden min-[500px]:flex max-w-6xl mx-auto"
          style={{ alignItems: "center", gap: 0, width: "100%", padding: "72px 32px", position: "relative", zIndex: 1 }}
        >
          {/* LEFT — slides in from left */}
          <div
            style={{
              flex: "0 0 260px", paddingRight: 32,
              animation: anim("fadeLeft", 100),
              opacity: inView ? undefined : 0,
            }}
          >
            <h2 style={{ color: C.light, fontSize: 24, fontWeight: 700, lineHeight: 1.35, marginBottom: 20 }}>
              World-Class Healthcare Services for you and your loved ones
            </h2>
            <button
              style={{
                background: "transparent", color: C.tealLight, border: `1px solid ${C.teal}`,
                borderRadius: 100, padding: "10px 20px", fontSize: 13, fontWeight: 500,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                animation: inView ? "fadeIn 0.5s ease 500ms both" : "none",
                opacity: inView ? undefined : 0,
              }}
            >
              More Services →
            </button>
          </div>

          {/* CENTER — cards pop up staggered */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "0 -8px", zIndex: 3 }}>
            {miniServices.map((item, i) => (
              <div
                key={item.title}
                style={{
                  borderRadius: 12, overflow: "hidden", position: "relative",
                  minHeight: 160, aspectRatio: "1", cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  background: `linear-gradient(150deg, ${C.cardMid} 0%, ${C.cardDark} 100%)`,
                  transition: "transform 0.2s",
                  animation: inView ? `cardPop 0.65s cubic-bezier(0.22,0.61,0.36,1) ${200 + i * 90}ms both` : "none",
                  opacity: inView ? undefined : 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "16px 14px", zIndex: 2 }}>
                  <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 8px", fontSize: 16, backdropFilter: "blur(4px)" }}>
                    {item.icon}
                  </div>
                  <p style={{ color: C.light, fontSize: 12, fontWeight: 600, lineHeight: 1.35, marginBottom: 6 }}>{item.title}</p>
                  <span style={{ color: C.tealLight, fontSize: 14 }}>→</span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — slides in from right */}
          <div
            style={{
              flex: "0 0 240px", paddingLeft: 32, textAlign: "right",
              animation: anim("fadeRight", 100),
              opacity: inView ? undefined : 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, color: "rgba(250,250,250,0.4)", fontSize: 12, marginBottom: 20, cursor: "pointer" }}>
              ← More Services
            </div>
            <h2 style={{ color: C.light, fontSize: 24, fontWeight: 700, lineHeight: 1.3, marginBottom: 20 }}>
              Recharge After Every Journey with Expert Recovery Care
            </h2>
            <div
              style={{
                display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end",
                animation: inView ? "fadeIn 0.5s ease 550ms both" : "none",
                opacity: inView ? undefined : 0,
              }}
            >
              <button style={{ background: C.light, color: C.dark, border: "none", borderRadius: 100, padding: "11px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                More Services
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div
          className="flex flex-col min-[500px]:hidden"
          style={{ width: "100%", padding: "48px 20px", position: "relative", zIndex: 1, gap: 32 }}
        >
          <div
            style={{
              textAlign: "center",
              animation: inView ? "fadeUp 0.6s cubic-bezier(0.22,0.61,0.36,1) 100ms both" : "none",
              opacity: inView ? undefined : 0,
            }}
          >
            <h2 style={{ color: C.light, fontSize: 20, fontWeight: 700, lineHeight: 1.3, marginBottom: 16 }}>
              World-Class Healthcare Services for you and your loved ones
            </h2>
            <button style={{ background: "transparent", color: C.tealLight, border: `1px solid ${C.teal}`, borderRadius: 100, padding: "8px 16px", fontSize: 12, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
              More Services →
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            {miniServices.map((item, i) => (
              <div
                key={item.title}
                style={{
                  borderRadius: 12, overflow: "hidden", position: "relative", minHeight: 120, aspectRatio: "1",
                  cursor: "pointer", border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  background: `linear-gradient(150deg, ${C.cardMid} 0%, ${C.cardDark} 100%)`,
                  animation: inView ? `cardPop 0.6s cubic-bezier(0.22,0.61,0.36,1) ${200 + i * 80}ms both` : "none",
                  opacity: inView ? undefined : 0,
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "12px", zIndex: 2 }}>
                  <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "4px 6px", fontSize: 14, backdropFilter: "blur(4px)", width: "fit-content", marginLeft: "auto" }}>{item.icon}</div>
                  <div>
                    <p style={{ color: C.light, fontSize: 11, fontWeight: 600, lineHeight: 1.3, marginBottom: 4 }}>{item.title}</p>
                    <span style={{ color: C.tealLight, fontSize: 12 }}>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              textAlign: "center",
              animation: inView ? "fadeUp 0.6s cubic-bezier(0.22,0.61,0.36,1) 600ms both" : "none",
              opacity: inView ? undefined : 0,
            }}
          >
            <h2 style={{ color: C.light, fontSize: 20, fontWeight: 700, lineHeight: 1.3, marginBottom: 16 }}>
              Recharge After Every Journey with Expert Recovery Care
            </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
              <button style={{ background: C.light, color: C.dark, border: "none", borderRadius: 100, padding: "9px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>More Services</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE BAND ── */}
      <section
        style={{
          background: C.light,
          padding: "56px 32px",
          textAlign: "center",
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <p
          style={{
            color: C.dark,
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1.7,
            maxWidth: 640,
            margin: "0 auto",
            fontStyle: "italic",
            // Quote uses its own IntersectionObserver via CSS animation-play-state trick:
            // simple fade-up tied to the section entering view
            animation: inView ? "quoteReveal 0.8s cubic-bezier(0.22,0.61,0.36,1) 700ms both" : "none",
            opacity: inView ? undefined : 0,
          }}
        >
          "Mantra Medica is more than just a clinic; we are your dedicated health partner in Lombok.{" "}
          <strong style={{ fontStyle: "normal", fontWeight: 600 }}>Trust your recovery</strong> to the medical experts who care."
        </p>
      </section>
    </>
  );
}