"use client";

// src/components/recovery/SignatureTreatment.tsx
// Expand/shrink card switcher — same UX as home ServiceCards
// but warm brown/cream palette to match Recovery page

import { useState } from "react";
import { C } from "@/lib/constants";
import { treatments } from "@/data/recoveryData";

const cardGradients = [
  `linear-gradient(150deg, #3D2208 0%, #6B4425 100%)`,
  `linear-gradient(150deg, #2A1F0E 0%, #4A3520 100%)`,
  `linear-gradient(150deg, #1A2C28 0%, #2E4A3E 100%)`,
];

export default function SignatureTreatment() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ background: "#F7F2EA", padding: "72px 32px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header — matches client's existing flourish style */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 4 }}>
            <div style={{ height: 1, flex: 1, maxWidth: 120, background: "linear-gradient(to right, transparent, #8B6340)", position: "relative" }}>
              <span style={{ position: "absolute", top: "50%", right: -4, transform: "translateY(-50%)", color: "#8B6340", fontSize: 13 }}>❧</span>
            </div>
            <span style={{ fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", color: "#8B6340", fontWeight: 400 }}>Our Signature</span>
            <div style={{ height: 1, flex: 1, maxWidth: 120, background: "linear-gradient(to left, transparent, #8B6340)", position: "relative" }}>
              <span style={{ position: "absolute", top: "50%", left: -4, transform: "translateY(-50%) scaleX(-1)", color: "#8B6340", fontSize: 13 }}>❧</span>
            </div>
          </div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 44, fontWeight: 400, color: "#2C1A0E", lineHeight: 1 }}>
            Treatment
          </h2>
        </div>

        {/* Desktop expand/shrink */}
        <div className="treat-desktop" style={{ display: "flex", gap: 14, height: 460 }}>
          {treatments.map((t, i) => {
            const isActive = active === i;
            return (
              <div
                key={t.id}
                onClick={() => setActive(i)}
                style={{
                  flex: isActive ? 2.4 : 1,
                  transition: "flex 0.55s cubic-bezier(0.4,0,0.2,1)",
                  borderRadius: 20,
                  overflow: "hidden",
                  position: "relative",
                  cursor: isActive ? "default" : "pointer",
                  border: "0.5px solid rgba(139,99,64,0.2)",
                  // ↓ Replace with: background: `url('${t.imagePath}') center/cover no-repeat`
                  background: cardGradients[i],
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: isActive ? "linear-gradient(to top, rgba(20,8,2,0.95) 0%, rgba(20,8,2,0.45) 55%, rgba(20,8,2,0.08) 100%)" : "linear-gradient(to top, rgba(20,8,2,0.88) 0%, rgba(20,8,2,0.2) 100%)", transition: "background 0.4s" }} />

                {/* Collapsed hint */}
                {!isActive && (
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none", zIndex: 3 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", color: "rgba(255,255,255,0.45)", fontSize: 14 }}>+</div>
                    <p style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Expand</p>
                  </div>
                )}

                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: isActive ? "32px 26px" : "22px 18px", zIndex: 2, transition: "padding 0.4s" }}>
                  <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", borderRadius: 100, padding: "3px 10px", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(250,250,250,0.7)", marginBottom: 10, width: "fit-content" }}>
                    {t.tag}
                  </div>
                  <h3 style={{ color: "#FFF5E4", fontSize: isActive ? 24 : 17, fontWeight: 600, lineHeight: 1.2, marginBottom: isActive ? 6 : 0, transition: "font-size 0.4s" }}>
                    {t.title}
                  </h3>
                  <p style={{ fontSize: 11, color: "rgba(250,250,250,0.4)", letterSpacing: "1px", marginBottom: isActive ? 12 : 0 }}>{t.hours}</p>

                  {/* Expandable */}
                  <div style={{ maxHeight: isActive ? 240 : 0, overflow: "hidden", opacity: isActive ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.35s" }}>
                    <div style={{ width: 28, height: 1, background: "rgba(200,169,106,0.5)", marginBottom: 12 }} />
                    <p style={{ fontSize: 13, color: "rgba(250,250,250,0.62)", lineHeight: 1.78, marginBottom: 20 }}>{t.desc}</p>
                    <button style={{ background: "#C8A96A", color: "#1C0E04", border: "none", borderRadius: 100, padding: "10px 22px", fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}>
                      {t.cta}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical stack */}
        <div className="treat-mobile" style={{ display: "none", flexDirection: "column", gap: 16 }}>
          {treatments.map((t, i) => (
            <div key={t.id} style={{ borderRadius: 20, overflow: "hidden", position: "relative", minHeight: 260, background: cardGradients[i], border: "0.5px solid rgba(139,99,64,0.2)" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,8,2,0.92) 0%, rgba(20,8,2,0.15) 70%, transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px 20px", zIndex: 2 }}>
                <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", borderRadius: 100, padding: "3px 10px", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(250,250,250,0.7)", marginBottom: 8, width: "fit-content" }}>{t.tag}</div>
                <h3 style={{ color: "#FFF5E4", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{t.title}</h3>
                <p style={{ color: "rgba(250,250,250,0.4)", fontSize: 11, marginBottom: 10 }}>{t.hours}</p>
                <p style={{ color: "rgba(250,250,250,0.62)", fontSize: 13, lineHeight: 1.75, marginBottom: 16 }}>{t.desc}</p>
                <button style={{ background: "#C8A96A", color: "#1C0E04", border: "none", borderRadius: 100, padding: "10px 22px", fontSize: 11, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}>{t.cta}</button>
              </div>
            </div>
          ))}
        </div>

      </div>
      <style>{`
        @media (max-width: 860px) {
          .treat-desktop { display: none !important; }
          .treat-mobile  { display: flex !important; }
        }
      `}</style>
    </section>
  );
}