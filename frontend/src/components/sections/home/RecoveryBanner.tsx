"use client";

// src/components/home/WorldClassAndRecovery.tsx
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { C } from "@/lib/constants";

/* ═══════════════════════════════════════════════════════════════════════════
   Figma pixel → vw helper
   Reference canvas: 1728 × 735  (recovery.webp banner)

   The desktop <section> is full-width with aspect-ratio 1728/735.
   Because section_width = 100vw  and  section_height = 735/1728 × 100vw,
   every Figma measurement (x, y, width, height) maps to the SAME formula:
       vw(N) = N / 1728 × 100vw
   top / left / right / bottom / width / height / gap / font-size
   all use this single helper and scale proportionally with the viewport.
   ═══════════════════════════════════════════════════════════════════════════ */
const FW = 1728;
const vw = (px: number): string => `${+(px / FW * 100).toFixed(4)}vw`;

/* ─────────────────────────── Service data ─────────────────────────────── */
const miniServices = [
  { id: "pre-trekking", title: "Pre-Trekking Health Certificate", icon: "🏥", imagePath: "/images/pre-trekking.jpg", desc: "Pemeriksaan menyeluruh sebelum mendaki untuk memastikan kondisi fisik Anda optimal." },
  { id: "deep-tissue",  title: "Rinjani Deep Tissue Massage",     icon: "💆", imagePath: "/images/deep-tissue.jpg",  desc: "Pijat tekanan kuat khusus untuk melemaskan otot kaki dan punggung yang kaku setelah mendaki berhari-hari." },
  { id: "altitude",     title: "Altitude Sickness Treatment",     icon: "⛰️", imagePath: "/images/altitude.jpg",     desc: "Penanganan cepat dan profesional untuk gejala penyakit ketinggian setelah pendakian." },
  { id: "reflexology",  title: "Waterfall Post-Walk Reflexology", icon: "🦶", imagePath: "/images/reflexology.jpg",  desc: "Terapi refleksi kaki yang menenangkan setelah perjalanan wisata air terjun di Lombok." },
];

/* ─────────────────── Figma card layout (px relative to 1728 × 735) ───────────────────
   Card 1 (Pre-Trekking): marginLeft 369, marginTop 236, marginBottom 128, marginRight 988
   Card 2 (Altitude):     19 px gap below card 1 → top = 236+371+19 = 626  (overflows 262 px)
   Card 3 (Deep Tissue):  marginLeft 791, marginTop 37, marginBottom 327, marginRight 566
   Card 4 (Reflexology):  19 px gap below card 3 → top = 37+371+19  = 427  (overflows  63 px)
   ──────────────────────────────────────────────────────────────────────────────────── */
const CARD_SIZE     = 371;   // square side in Figma px
const CARD_R        = 100;   // border-radius in Figma px
const CARD_OVERFLOW = 262;   // amount card-2 bleeds below section (max overflow)

const CARD_LAYOUT = [
  { svc: miniServices[0], topPx: 236, leftPx: 369 }, // Pre-Trekking — left col, top
  { svc: miniServices[2], topPx: 626, leftPx: 369 }, // Altitude     — left col, bottom (overflows 262 px)
  { svc: miniServices[1], topPx:  37, leftPx: 791 }, // Deep Tissue  — right col, top
  { svc: miniServices[3], topPx: 427, leftPx: 791 }, // Reflexology  — right col, bottom (overflows 63 px)
];

/* ─────────────────── Mobile constants ─────────────────── */
const MOB_HALF_H    = 260;
const MOB_CARD_H    = 130;
const MOB_CARD_GAP  = 10;
const MOB_CARDS_TOP = MOB_HALF_H - Math.round((MOB_CARD_H * 2 + MOB_CARD_GAP) / 2);

/* ─────────────────── Shared card text style (Figma spec) ─────────────────── */
const CARD_TXT: React.CSSProperties = {
  color: "#65A396",
  fontFamily: "Inter, sans-serif",
  fontSize: vw(32),
  fontWeight: 500,
  lineHeight: "150%",
  letterSpacing: "-0.352px",
  textShadow: "0 4px 4px rgba(0,0,0,0.25)",
  margin: 0,
};

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

  return (
    <>
      <style>{`
        @keyframes fadeUp    { from { opacity:0; transform:translateY(36px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft  { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeRight { from { opacity:0; transform:translateX(40px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes cardPop   { from { opacity:0; transform:translateY(28px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
        @keyframes quoteReveal { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

        @media (max-width: 499px) {
          .wcr-desktop { display: none !important; }
          .wcr-mobile  { display: block !important; }
        }
        @media (min-width: 500px) {
          .wcr-desktop { display: block !important; }
          .wcr-mobile  { display: none !important; }
        }
      `}</style>

      <div ref={wrapRef} style={{ position: "relative", zIndex: 1 }}>

        {/* ════════════════════════ DESKTOP ════════════════════════
            Full-width section with exact Figma aspect-ratio.
            overflow:visible so cards can bleed into the quote band.     */}
        <section
          className="wcr-desktop"
          style={{ position: "relative", width: "100%", aspectRatio: `${FW} / 735`, overflow: "visible" }}
        >
          {/* Background photo — inner div clips it */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <Image src="/images/recovery.webp" alt="Recovery" fill priority style={{ objectFit: "cover", objectPosition: "center" }} />
          </div>

          {/* ── World-Class heading + white More Services button
               Figma: marginLeft 57, marginTop 72, width 553
               Button: w 257.3 × h 75, gap 58 below heading               */}
          <div style={{
            position: "absolute",
            top: vw(72), left: vw(57),
            width: vw(553),
            display: "flex", flexDirection: "column", gap: vw(58),
            animation: anim("fadeLeft", 100),
            opacity: inView ? undefined : 0,
            zIndex: 2,
          }}>
            <h2 style={{
              color: C.light,
              fontFamily: "Lato, sans-serif",
              fontSize: vw(37), fontWeight: 800,
              lineHeight: "150%", letterSpacing: "-0.352px",
              textShadow: "0 4px 4px rgba(0,0,0,0.25)",
              margin: 0,
            }}>
              World-Class Healthcare<br />
              Services for you and your<br />
              loved ones
            </h2>

            <button style={{
              width: vw(257.3), height: vw(75), flexShrink: 0,
              background: C.light, color: C.dark,
              border: "none", borderRadius: vw(100),
              fontFamily: "Inter, sans-serif",
              fontSize: vw(20), fontWeight: 600, letterSpacing: "0.45px",
              cursor: "pointer", display: "inline-flex",
              alignItems: "center", justifyContent: "center", gap: vw(8),
              animation: inView ? "fadeIn 0.5s ease 500ms both" : "none",
              opacity: inView ? undefined : 0,
            }}>
              More Services &nbsp; &nbsp; &nbsp; <span style={{ fontSize: vw(30), fontWeight: 900 }}>→</span>
            </button>
          </div>

          {/* ── Four cards — Figma-exact absolute positions ── */}
          {CARD_LAYOUT.map(({ svc, topPx, leftPx }, i) => {
            const on = activeCard === svc.id;
            return (
              <div
                key={svc.id}
                style={{
                  position: "absolute",
                  top: vw(topPx), left: vw(leftPx),
                  width: vw(CARD_SIZE), height: vw(CARD_SIZE),
                  borderRadius: vw(CARD_R),
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: `0 ${vw(8)} ${vw(32)} rgba(0,0,0,0.35)`,
                  background: `linear-gradient(150deg, ${C.cardMid} 0%, ${C.cardDark} 100%)`,
                  transition: "transform 0.22s ease",
                  animation: inView ? `cardPop 0.65s cubic-bezier(0.22,0.61,0.36,1) ${200 + i * 100}ms both` : "none",
                  opacity: inView ? undefined : 0,
                  zIndex: 3,
                }}
                onClick={() => toggleCard(svc.id)}
                onMouseEnter={e => { if (!on) e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* Photo background */}
                <Image
                  src={svc.imagePath} alt={svc.title} fill
                  style={{ objectFit: "cover", opacity: on ? 0.18 : 0.82, transition: "opacity 0.4s ease" }}
                />

                {/* Gradient vignette — inactive only */}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "linear-gradient(to top, rgba(6,6,6,0.72) 0%, rgba(6,6,6,0.06) 55%, transparent 100%)",
                  opacity: on ? 0 : 1, transition: "opacity 0.35s ease",
                }} />

                {/* Dark overlay — active only */}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "rgba(8,14,10,0.85)",
                  opacity: on ? 1 : 0, transition: "opacity 0.35s ease",
                }} />

                {/* Icon: Figma top 14, right 55, size 62×62 */}
                <div style={{
                  position: "absolute", top: vw(14), right: vw(55), zIndex: 4,
                  width: vw(62), height: vw(62),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.15)", borderRadius: vw(12),
                  backdropFilter: "blur(4px)", fontSize: vw(26),
                }}>
                  {svc.icon}
                </div>

                {/* ── INACTIVE layer: title centered, marginBottom 77 ── */}
                <div style={{
                  position: "absolute", inset: 0, zIndex: 5,
                  display: on ? "none" : "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end", alignItems: "center",
                  paddingBottom: vw(77),
                  paddingLeft: vw(20), paddingRight: vw(20),
                  textAlign: "center",
                  opacity: on ? 0 : 1, transition: "opacity 0.22s ease",
                  pointerEvents: "none",
                  visibility: on ? "hidden" : "visible",
                  overflow: "hidden",
                  animation: inView ? "fadeUp 0.6s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
                  animationDelay: `${280 + i * 100}ms`,
                }}>
                  <p style={{ ...CARD_TXT }}>{svc.title}</p>
                </div>

                {/* ── ACTIVE layer: title left-aligned, marginBottom 243, marginLeft 21 ── */}
                <div style={{
                  position: "absolute", inset: 0, zIndex: 6,
                  display: on ? "flex" : "none",
                  flexDirection: "column",
                  justifyContent: "flex-end", alignItems: "flex-start",
                  paddingBottom: vw(243),
                  paddingLeft: vw(21), paddingRight: vw(20),
                  opacity: on ? 1 : 0, 
                  visibility: on ? "visible" : "hidden",
                  transition: "opacity 0.3s ease 0.06s",
                  pointerEvents: "none",
                  overflow: "hidden",
                  animation: on ? "fadeUp 0.5s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
                }}>
                  <p style={{ ...CARD_TXT, textAlign: "left", marginBottom: "0.4em" }}>{svc.title}</p>
                  <p style={{ color: "rgba(255,255,255,0.82)", fontFamily: "Inter, sans-serif", fontSize: vw(13), lineHeight: 1.55, margin: 0 }}>
                    {svc.desc}
                  </p>
                </div>

                {/* White arrow — active only, bottom-right */}
                <span style={{
                  position: "absolute", bottom: vw(18), right: vw(18), zIndex: 7,
                  color: "#ffffff", fontSize: vw(22), lineHeight: 1,
                  opacity: on ? 1 : 0,
                  transform: on ? "translateX(0)" : "translateX(-8px)",
                  transition: "opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s",
                  pointerEvents: "none",
                }}>→</span>
              </div>
            );
          })}

          {/* ── Glass More Services button + Recharge heading
               Figma: bottom 47, right 38, container width 465
               Button: w 257.3 × h 75, gap 58 above Recharge text          */}
          <div style={{
            position: "absolute",
            bottom: vw(47), right: vw(38),
            width: vw(465),
            display: "flex", flexDirection: "column", gap: vw(58),
            alignItems: "flex-end",
            animation: anim("fadeRight", 100),
            opacity: inView ? undefined : 0,
            zIndex: 2,
          }}>
            <button style={{
              width: vw(257.3), height: vw(75), flexShrink: 0,
              background: "rgba(255,255,255,0.15)", color: C.light,
              border: "none", borderRadius: vw(100),
              fontFamily: "Inter, sans-serif",
              fontSize: vw(20), fontWeight: 600, letterSpacing: "0.45px",
              cursor: "pointer", display: "inline-flex",
              alignItems: "center", justifyContent: "center", gap: vw(8),
              backdropFilter: "blur(10px)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 24px rgba(0,0,0,0.3)",
              animation: inView ? "fadeIn 0.5s ease 500ms both" : "none",
              opacity: inView ? undefined : 0,
            }}>
              <span style={{ fontSize: vw(30), fontWeight: 900 }}>←</span> &nbsp; &nbsp; &nbsp; More Services
            </button>

            {/* Figma: w 465, h 174, fontSize 40, weight 800, Lato, right-aligned */}
            <h2 style={{
              color: "#FAFAFA",
              fontFamily: "Lato, sans-serif",
              fontSize: vw(35), fontWeight: 800,
              lineHeight: "normal",
              textAlign: "right",
              textShadow: "0 4px 4px rgba(0,0,0,0.25)",
              margin: 0, width: "100%",
            }}>
              Recharge After Every<br />
              Journey with Expert<br />
              Recovery Care
            </h2>
          </div>
        </section>

        {/* ════════════════════════ MOBILE ════════════════════════ */}
        <div className="wcr-mobile" style={{ position: "relative" }}>

          {/* Top band — solid teal, World-Class */}
          <div style={{ height: MOB_HALF_H, background: "#2b7a6b", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "28px 20px 0" }}>
            <h2 style={{ color: C.light, fontSize: 20, fontWeight: 700, lineHeight: 1.37, margin: "0 0 14px", animation: anim("fadeUp", 100), opacity: inView ? undefined : 0 }}>
              World-Class Healthcare<br />Services for you and your<br />loved ones
            </h2>
            <button style={{ background: C.light, color: C.dark, border: "none", borderRadius: 100, padding: "9px 18px", fontSize: 12, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, animation: inView ? "fadeIn 0.5s ease 400ms both" : "none", opacity: inView ? undefined : 0 }}>
              More Services →
            </button>
          </div>

          {/* Bottom band — photo bg, Recharge */}
          <div style={{ height: MOB_HALF_H, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", padding: "0 20px 24px" }}>
            <Image src="/images/recovery.webp" alt="Recovery" fill style={{ objectFit: "cover", objectPosition: "center" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, animation: anim("fadeUp", 600), opacity: inView ? undefined : 0 }}>
              <button style={{ background: "rgba(255,255,255,0.15)", color: C.light, border: "none", borderRadius: 100, padding: "9px 18px", fontSize: 12, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, backdropFilter: "blur(10px)", boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 24px rgba(0,0,0,0.3)" }}>
                ← More Services
              </button>
              <h2 style={{ color: C.light, fontSize: 20, fontWeight: 700, lineHeight: 1.37, margin: 0 }}>
                Recharge After Every Journey with Expert Recovery Care
              </h2>
            </div>
          </div>

          {/* Cards 2×2 centred on seam */}
          <div style={{ position: "absolute", top: MOB_CARDS_TOP, left: 16, right: 16, zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: MOB_CARD_GAP }}>
            {miniServices.map((svc, i) => {
              const on = activeCard === svc.id;
              return (
                <div key={svc.id} style={{ borderRadius: 28, overflow: "hidden", position: "relative", height: MOB_CARD_H, cursor: "pointer", border: "1px solid rgba(255,255,255,0.12)", background: `linear-gradient(150deg, ${C.cardMid} 0%, ${C.cardDark} 100%)`, transition: "transform 0.2s ease", animation: inView ? `cardPop 0.65s cubic-bezier(0.22,0.61,0.36,1) ${200 + i * 80}ms both` : "none", opacity: inView ? undefined : 0 }} onClick={() => toggleCard(svc.id)}>
                  <Image src={svc.imagePath} alt={svc.title} fill style={{ objectFit: "cover", opacity: on ? 0.18 : 0.82, transition: "opacity 0.4s ease" }} />
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to top, rgba(6,6,6,0.72) 0%, transparent 60%)", opacity: on ? 0 : 1, transition: "opacity 0.35s ease" }} />
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "rgba(8,14,10,0.85)", opacity: on ? 1 : 0, transition: "opacity 0.35s ease" }} />
                  <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(107, 18, 18, 0.15)", borderRadius: 8, padding: "4px 6px", fontSize: 12, backdropFilter: "blur(4px)", zIndex: 3 }}>{svc.icon}</div>
                  <div style={{ position: "absolute", inset: 0, zIndex: 4, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", padding: "0 8px 12px", textAlign: "center", opacity: on ? 0 : 1, transition: "opacity 0.22s ease", pointerEvents: "none" }}>
                    <p style={{ color: "#65A396", fontSize: 10, fontWeight: 600, lineHeight: 1.3, margin: 0 }}>{svc.title}</p>
                  </div>
                  <div style={{ position: "absolute", inset: 0, zIndex: 5, padding: "10px 8px", opacity: on ? 1 : 0, transition: "opacity 0.3s ease 0.05s", pointerEvents: "none" }}>
                    <p style={{ color: "#65A396", fontSize: 10, fontWeight: 600, lineHeight: 1.3, margin: "0 0 4px" }}>{svc.title}</p>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 9, lineHeight: 1.4, margin: 0 }}>{svc.desc}</p>
                  </div>
                  <span style={{ position: "absolute", bottom: 8, right: 8, zIndex: 6, color: "#fff", fontSize: 12, opacity: on ? 1 : 0, transition: "opacity 0.3s ease 0.1s", pointerEvents: "none" }}>→</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ════════════════════════ QUOTE BAND ════════════════════════
            paddingTop = CARD_OVERFLOW + 56px  so the floating cards sit
            visually above the quote text without colliding.
            overflow:hidden clips the gradienthero image — no height expansion. */}
        <section style={{
          position: "relative",
          overflow: "hidden",
          background: C.light,
          paddingTop: `calc(${vw(CARD_OVERFLOW)} + 56px)`,
          paddingBottom: vw(56),
          paddingLeft: "40px",
          paddingRight: "40px",
          textAlign: "center",
          borderTop: `1px solid ${C.border}`,
          zIndex: 0,
        }}>
          {/* gradienthero decorative motif — shifted -48px up, opacity 0.75 */}
          <div style={{ position: "absolute", top: `calc(-${vw(48)})`, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: "none" }}>
            <Image src="/images/gradienthero.webp" alt="" fill style={{ objectFit: "cover", objectPosition: "top center", opacity: 0.75 }} />
          </div>

          {/* Opening petik icon: Figma marginRight 144 from page */}
          <div style={{ position: "absolute", top: vw(32), right: vw(144), zIndex: 1, pointerEvents: "none", width: vw(56), height: vw(40) }}>
            <Image src="/icons/petik.webp" alt="" fill style={{ objectFit: "contain", opacity: 0.7 }} />
          </div>

          {/* Closing petik icon: Figma marginLeft 187 from page, rotated 180° */}
          <div style={{ position: "absolute", bottom: vw(32), left: vw(187), zIndex: 1, pointerEvents: "none", width: vw(56), height: vw(40), transform: "rotate(180deg)" }}>
            <Image src="/icons/petik.webp" alt="" fill style={{ objectFit: "contain", opacity: 0.7 }} />
          </div>

          {/* Quote text — Figma spec: width 1519, Inter 32 weight 500, C.teal */}
          <p style={{
            position: "relative", zIndex: 1,
            color: C.teal,
            maxWidth: vw(1519),
            width: "100%",
            margin: "0 auto",
            fontFamily: "Inter, sans-serif",
            fontSize: vw(32), fontWeight: 500,
            lineHeight: "150%", letterSpacing: "-0.352px",
            textShadow: "0 4px 4px rgba(0,0,0,0.25)",
            animation: inView ? "quoteReveal 0.8s cubic-bezier(0.22,0.61,0.36,1) 700ms both" : "none",
            opacity: inView ? undefined : 0,
          }}>
            Mantra Medica is more than just a clinic; we are your<br />
            dedicated health partner in Lombok. Trust your recovery to the medical experts who care.
          </p>
        </section>

      </div>
    </>
  );
}