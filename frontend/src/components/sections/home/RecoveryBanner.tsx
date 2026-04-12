"use client";

// src/components/home/WorldClassAndRecovery.tsx
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { C } from "@/lib/constants";

const miniServices = [
  {
    id: "pre-trekking",
    title: "Pre-Trekking Health Certificate",
    icon: "🏥",
    imagePath: "/images/pre-trekking.jpg",
    desc: "Pemeriksaan menyeluruh sebelum mendaki untuk memastikan kondisi fisik Anda optimal.",
  },
  {
    id: "deep-tissue",
    title: "Rinjani Deep Tissue Massage",
    icon: "💆",
    imagePath: "/images/deep-tissue.jpg",
    desc: "Pijat tekanan kuat khusus untuk melemaskan otot kaki dan punggung yang kaku setelah mendaki berhari-hari.",
  },
  {
    id: "altitude",
    title: "Altitude Sickness Treatment",
    icon: "⛰️",
    imagePath: "/images/altitude.jpg",
    desc: "Penanganan cepat dan profesional untuk gejala penyakit ketinggian setelah pendakian.",
  },
  {
    id: "reflexology",
    title: "Waterfall Post-Walk Reflexology",
    icon: "🦶",
    imagePath: "/images/reflexology.jpg",
    desc: "Terapi refleksi kaki yang menenangkan setelah perjalanan wisata air terjun di Lombok.",
  },
];

// ── Layout constants ──────────────────────────────────────────────────────────
const TOP_MARGIN    = 48;
const CARD_H        = 250;                          // Desktop card side (square)
const CARD_GAP      = 16;
const CARD_OVERFLOW = Math.round(CARD_H * 0.75);   // 75 % of bottom-left floats below section

// Mobile
const MOB_HALF_H    = 260;
const MOB_CARD_H    = 130;
const MOB_CARD_GAP  = 10;
const MOB_CARDS_TOT = MOB_CARD_H * 2 + MOB_CARD_GAP;
const MOB_CARDS_TOP = MOB_HALF_H - Math.round(MOB_CARDS_TOT / 2);

export default function WorldClassAndRecovery() {
  const [inView,     setInView]     = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  const anim = (name: string, delay: number) =>
    inView ? `${name} 0.7s cubic-bezier(0.22,0.61,0.36,1) ${delay}ms both` : "none";

  const toggleCard = (id: string) =>
    setActiveCard(prev => (prev === id ? null : id));

  // ── Card inner: render function (not component) to avoid remount ──────────
  const renderCardInner = (
    id: string,
    icon: string,
    title: string,
    desc: string,
    h: number,
  ) => {
    const on = activeCard === id;
    const TOP_ACTIVE = Math.round(h * 0.2); // 1/5 of card height

    return (
      <>
        {/* Soft base gradient — non-active only */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to top, rgba(10,10,10,0.60) 0%, rgba(10,10,10,0.05) 55%, transparent 100%)",
          opacity: on ? 0 : 1,
          transition: "opacity 0.35s ease",
        }} />

        {/* Dark overlay — active only */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "rgba(14,20,16,0.82)",
          opacity: on ? 1 : 0,
          transition: "opacity 0.35s ease",
        }} />

        {/* Icon badge */}
        <div style={{
          position: "absolute", top: 12, right: 12, zIndex: 3,
          background: "rgba(255,255,255,0.15)", borderRadius: 10,
          padding: "6px 8px", fontSize: 18, backdropFilter: "blur(4px)",
        }}>
          {icon}
        </div>

        {/*
          NON-ACTIVE layer:
          Title centered horizontally, lifted slightly from bottom center
        */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 4,
          display: "flex", flexDirection: "column",
          justifyContent: "center",       // vertically centered, slightly lifted
          alignItems: "center",
          paddingBottom: Math.round(h * 0.10),  // slight upward lift from true center
          paddingLeft: 14, paddingRight: 14,
          opacity: on ? 0 : 1,
          transition: "opacity 0.22s ease",
          textAlign: "center",
          pointerEvents: "none",
        }}>
          <p style={{
            color: C.light, fontSize: 14, fontWeight: 600,
            lineHeight: 1.35, letterSpacing: "0.45px", margin: 0,
          }}>
            {title}
          </p>
        </div>

        {/*
          ACTIVE layer:
          Title left-aligned at TOP_ACTIVE from top, description below, arrow bottom-right
        */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 5,
          paddingTop: TOP_ACTIVE,
          paddingLeft: 16, paddingRight: 16,
          opacity: on ? 1 : 0,
          transition: "opacity 0.3s ease 0.05s",
          pointerEvents: "none",
        }}>
          <p style={{
            color: C.light, fontSize: 14, fontWeight: 700,
            lineHeight: 1.3, letterSpacing: "0.45px",
            margin: "0 0 10px", textAlign: "left",
          }}>
            {title}
          </p>
          <p style={{
            color: "rgba(255,255,255,0.78)", fontSize: 12,
            lineHeight: 1.55, margin: 0, textAlign: "left",
          }}>
            {desc}
          </p>
        </div>

        {/* White arrow — active only, bottom-right */}
        <span style={{
          position: "absolute", bottom: 16, right: 16, zIndex: 6,
          color: "#ffffff", fontSize: 22, lineHeight: 1,
          opacity: on ? 1 : 0,
          transform: on ? "translateX(0)" : "translateX(-8px)",
          transition: "opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s",
          pointerEvents: "none",
        }}>→</span>
      </>
    );
  };

  const cardStyle = (delay: number, h: number = CARD_H): React.CSSProperties => ({
    borderRadius: 44,
    overflow: "hidden",
    position: "relative",
    height: h,
    width: h,
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 8px 28px rgba(0,0,0,0.28)",
    background: `linear-gradient(150deg, ${C.cardMid} 0%, ${C.cardDark} 100%)`,
    transition: "transform 0.2s ease",
    animation: inView ? `cardPop 0.65s cubic-bezier(0.22,0.61,0.36,1) ${delay}ms both` : "none",
    opacity: inView ? undefined : 0,
    flexShrink: 0,
  });

  // ── Button styles (identical visual weight) ────────────────────────────────
  const btnWhite: React.CSSProperties = {
    background: C.light, color: C.dark,
    border: "none", borderRadius: 100,
    padding: "11px 22px", fontSize: 13, fontWeight: 500,
    cursor: "pointer", display: "inline-flex", alignItems: "center",
    gap: 8, whiteSpace: "nowrap", letterSpacing: "0.45px",
  };

  const btnGlass: React.CSSProperties = {
    background: "rgba(255,255,255,0.15)", color: C.light,
    border: "none", borderRadius: 100,
    padding: "11px 22px", fontSize: 13, fontWeight: 500,
    cursor: "pointer", display: "inline-flex", alignItems: "center",
    gap: 8, whiteSpace: "nowrap", letterSpacing: "0.45px",
    backdropFilter: "blur(10px)",
    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 24px rgba(0,0,0,0.3)",
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp    { from { opacity:0; transform:translateY(36px); }  to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft  { from { opacity:0; transform:translateX(-32px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeRight { from { opacity:0; transform:translateX(32px); }  to { opacity:1; transform:translateX(0); } }
        @keyframes cardPop   { from { opacity:0; transform:translateY(28px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
        @keyframes quoteReveal { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

        @media (max-width: 499px) {
          .wcr-desktop { display: none !important; }
          .wcr-mobile  { display: block !important; }
        }
        @media (min-width: 500px) {
          .wcr-desktop { display: grid !important; }
          .wcr-mobile  { display: none !important; }
        }
      `}</style>

      <div ref={wrapRef} style={{ position: "relative", zIndex: 1 }}>

        {/* ══════════════════ MAIN SECTION ══════════════════ */}
        <section style={{ position: "relative", overflow: "visible", minHeight: 480 }}>

          {/* Background photo — clipped */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <Image
              src="/images/recovery.webp"
              alt="Recovery Background"
              fill priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>

          {/*
            ─── DESKTOP GRID ───
            Col 1 & 4 are 1fr (fluid text), col 2 & 3 are fixed CARD_H px.
            paddingLeft on col 1 mirrors Hero.tsx pattern.
            paddingRight on col 4 mirrors col 1 for symmetry.

            maxWidth: 1200 so that at typical 1200-1400px viewports,
            1fr columns are ~280-350px — enough for 3-line headings at 26px.
          */}
          <div
            className="wcr-desktop"
            style={{
              gridTemplateColumns: `1fr ${CARD_H}px ${CARD_H}px 1fr`,
              gap: `0 20px`,
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 40px",
              position: "relative",
              zIndex: 1,
              minHeight: 480,
              alignItems: "stretch",
            }}
          >

            {/*
              COL 1 — World-Class heading, top-anchored, left-aligned.
              paddingLeft matches Hero.tsx: clamp(0px, 2vw, 40px)
              <br/> tags force the exact 3-line wrap the user asked for:
                Line 1: "World-Class Healthcare"
                Line 2: "Services for you and your"
                Line 3: "loved ones"
            */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "flex-start",
              paddingTop: TOP_MARGIN,
              paddingLeft: "clamp(0px, 2vw, 40px)",
              animation: anim("fadeLeft", 100),
              opacity: inView ? undefined : 0,
            }}>
              <h2 style={{
                color: C.light,
                fontSize: "clamp(20px, 2.2vw, 28px)",
                fontWeight: 700,
                lineHeight: 1.38,
                margin: "0 0 22px",
                letterSpacing: "0.45px",
              }}>
                World-Class Healthcare<br />
                Services for you and your<br />
                loved ones
              </h2>
              <button style={{
                ...btnWhite,
                animation: inView ? "fadeIn 0.5s ease 500ms both" : "none",
                opacity: inView ? undefined : 0,
              }}>
                More Services &nbsp;&nbsp;&nbsp; →
              </button>
            </div>

            {/*
              COL 2 — Left cards, bottom-anchored + overflowing.
              CARD_OVERFLOW px of the bottom card bleeds into the quote band.
            */}
            <div style={{
              display: "flex", flexDirection: "column",
              justifyContent: "flex-end", gap: CARD_GAP,
              transform: `translateY(${CARD_OVERFLOW}px)`,
              position: "relative", zIndex: 3,
            }}>
              {[miniServices[0], miniServices[2]].map((item, i) => (
                <div
                  key={item.id}
                  style={cardStyle(200 + i * 180)}
                  onClick={() => toggleCard(item.id)}
                  onMouseEnter={e => { if (activeCard !== item.id) e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {renderCardInner(item.id, item.icon, item.title, item.desc, CARD_H)}
                </div>
              ))}
            </div>

            {/*
              COL 3 — Right cards, top-anchored at half world-class top margin.
            */}
            <div style={{
              display: "flex", flexDirection: "column",
              justifyContent: "flex-start", gap: CARD_GAP,
              paddingTop: TOP_MARGIN / 2,
            }}>
              {[miniServices[1], miniServices[3]].map((item, i) => (
                <div
                  key={item.id}
                  style={cardStyle(290 + i * 180)}
                  onClick={() => toggleCard(item.id)}
                  onMouseEnter={e => { if (activeCard !== item.id) e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {renderCardInner(item.id, item.icon, item.title, item.desc, CARD_H)}
                </div>
              ))}
            </div>

            {/*
              COL 4 — Recharge heading, bottom-anchored, right-aligned.
              alignItems: flex-end → button + h2 both flush right.
              paddingRight mirrors col 1 paddingLeft for symmetry.
            */}
            <div style={{
              display: "flex", flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              paddingBottom: TOP_MARGIN,
              paddingRight: "clamp(0px, 2vw, 40px)",
              gap: 14,
              animation: anim("fadeRight", 100),
              opacity: inView ? undefined : 0,
            }}>
              <button style={{
                ...btnGlass,
                animation: inView ? "fadeIn 0.5s ease 500ms both" : "none",
                opacity: inView ? undefined : 0,
              }}>
                ← &nbsp;&nbsp;&nbsp;More Services
              </button>
              <h2 style={{
                color: C.light,
                fontSize: "clamp(20px, 2.2vw, 28px)",
                fontWeight: 700,
                lineHeight: 1.38,
                margin: 0,
                textAlign: "right",
                letterSpacing: "0.45px",
              }}>
                Recharge After Every Journey<br />
                with Expert Recovery Care
              </h2>
            </div>
          </div>

          {/* ─── MOBILE ─── */}
          <div className="wcr-mobile" style={{ position: "relative" }}>

            {/* Top band — solid teal, World-Class */}
            <div style={{
              height: MOB_HALF_H,
              background: "#2b7a6b",
              display: "flex", flexDirection: "column",
              alignItems: "flex-start",
              padding: "28px 20px 0",
            }}>
              <h2 style={{
                color: C.light, fontSize: 20, fontWeight: 700,
                lineHeight: 1.37, margin: "0 0 14px", letterSpacing: "0.45px",
                animation: anim("fadeUp", 100), opacity: inView ? undefined : 0,
              }}>
                World-Class Healthcare<br />Services for you and your<br />loved ones
              </h2>
              <button style={{
                ...btnWhite, fontSize: 12, padding: "9px 18px",
                animation: inView ? "fadeIn 0.5s ease 400ms both" : "none",
                opacity: inView ? undefined : 0,
              }}>
                More Services →
              </button>
            </div>

            {/* Bottom band — photo bg, Recharge */}
            <div style={{
              height: MOB_HALF_H, position: "relative", overflow: "hidden",
              display: "flex", flexDirection: "column",
              justifyContent: "flex-end", alignItems: "flex-end",
              padding: "0 20px 24px",
            }}>
              <Image src="/images/recovery.webp" alt="Recovery" fill
                style={{ objectFit: "cover", objectPosition: "center" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }} />
              <div style={{
                position: "relative", zIndex: 1, textAlign: "right",
                display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10,
                animation: anim("fadeUp", 600), opacity: inView ? undefined : 0,
              }}>
                <button style={{ ...btnGlass, fontSize: 12, padding: "9px 18px" }}>← More Services</button>
                <h2 style={{ color: C.light, fontSize: 20, fontWeight: 700, lineHeight: 1.37, margin: 0, letterSpacing: "0.45px" }}>
                  Recharge After Every Journey with Expert Recovery Care
                </h2>
              </div>
            </div>

            {/* Cards centred on seam */}
            <div style={{
              position: "absolute", top: MOB_CARDS_TOP,
              left: 16, right: 16, zIndex: 2,
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: MOB_CARD_GAP,
            }}>
              {miniServices.map((item, i) => (
                <div key={item.id} style={cardStyle(200 + i * 80, MOB_CARD_H)}
                  onClick={() => toggleCard(item.id)}>
                  {renderCardInner(item.id, item.icon, item.title, item.desc, MOB_CARD_H)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ QUOTE BAND ══════════════════ */}
        {/*
          gradienthero.webp is the decorative motif.
          Its wrapper is extended 48px ABOVE the section (negative top) so
          the motif visually starts at the top of the quote area.
          overflow:hidden on the section clips it — no height expansion.
          Increased opacity to 0.75 per user request.

          The floating left cards bleed CARD_OVERFLOW px into this section,
          so paddingTop = CARD_OVERFLOW + 40 keeps the quote text clear.
        */}
        <section style={{
          position: "relative",
          overflow: "hidden",
          background: C.light,
          padding: `${CARD_OVERFLOW + 40}px 32px 56px`,
          textAlign: "center",
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          zIndex: 0,
        }}>

          {/* gradienthero decorative background — shifted UP 48px */}
          <div style={{
            position: "absolute",
            top: -48,        // ← moved up
            left: 0, right: 0, bottom: 0,
            zIndex: 0, pointerEvents: "none",
          }}>
            <Image
              src="/images/gradienthero.webp"
              alt=""
              fill
              style={{
                objectFit: "cover",
                objectPosition: "top center",
                opacity: 0.75,   // ← increased opacity
              }}
            />
          </div>

          {/*
            Quote block:
            - No " " marks — replaced by petik.webp icon above + rotated below
            - No italic, no bold
            - color: C.teal (green)
            - Line break after "your" in the first sentence
          */}
          <div style={{
            position: "relative", zIndex: 1,
            maxWidth: 640, margin: "0 auto",
            animation: inView ? "quoteReveal 0.8s cubic-bezier(0.22,0.61,0.36,1) 700ms both" : "none",
            opacity: inView ? undefined : 0,
          }}>

            {/* Opening petik icon */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <Image
                src="/icons/petik.webp"
                alt="quote"
                width={36}
                height={26}
                style={{ opacity: 0.65 }}
              />
            </div>

            <p style={{
              color: C.teal,
              fontSize: 18,
              fontWeight: 400,
              lineHeight: 1.75,
              margin: 0,
              fontStyle: "normal",    // ← not italic
            }}>
              Mantra Medica is more than just a clinic; we are your<br />
              dedicated health partner in Lombok. Trust your recovery to the medical experts who care.
            </p>

            {/* Closing petik icon — rotated 180° */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
              <Image
                src="/icons/petik.webp"
                alt=""
                width={36}
                height={26}
                style={{ opacity: 0.65, transform: "rotate(180deg)" }}
              />
            </div>
          </div>
        </section>

      </div>
    </>
  );
}