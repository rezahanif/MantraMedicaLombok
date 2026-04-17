"use client";

// src/components/recovery/SignatureTreatment.tsx
// Expand/shrink card switcher — same UX as home ServiceCards
// but warm brown/cream palette to match Recovery page

import { useState } from "react";
import Image from "next/image";
import { treatments } from "@/data/recoveryData";

// ── Card background images
const cardImages = [
  "/images/recovcard1.webp",  // Card 1
  "/images/recovcard2.webp",  // Card 2
];

// ── Card icons
const cardIcons = [
  "/icons/bodymassage.webp", // Card 1
  "/icons/iconbatu.webp",     // Card 2
];

// ── Card image blur effect (shrunk vs expanded)
const CARD_BLUR_SHRUNK = 6;   // Blur px when card is shrunk/inactive
const CARD_BLUR_EXPANDED = 0; // Blur px when card is expanded/active

// ── Card image positioning and zoom – adjust independently per card
// Card 1 (Mountain & Waterfall Rescue) – Desktop
const CARD1_POS_X = 0;                 // Horizontal offset in px: positive = right, negative = left
const CARD1_POS_Y = 0;                 // Vertical offset in px: positive = down, negative = up
const CARD1_ZOOM_SHRUNK = 2;         // Zoom scale when card is shrunk/inactive
const CARD1_ZOOM_EXPANDED = 1;       // Zoom scale when card is expanded/active

// Card 1 (Mountain & Waterfall Rescue) – Mobile Only
const CARD1_MOBILE_POS_X = 0;          // Horizontal offset in px: positive = right, negative = left
const CARD1_MOBILE_POS_Y = 0;          // Vertical offset in px: positive = down, negative = up
const CARD1_MOBILE_ZOOM = 1;           // Zoom scale for mobile (454px baseline - scales via media queries)

// Card 2 (Referral)
const CARD2_POS_X = 0;                 // Horizontal offset in px
const CARD2_POS_Y = 0;                 // Vertical offset in px
const CARD2_ZOOM_SHRUNK = 2;           // Zoom scale when card is shrunk/inactive
const CARD2_ZOOM_EXPANDED = 1;         // Zoom scale when card is expanded/active
const CARD2_MOBILE_ZOOM = 1;           // Zoom scale for mobile (same as Card1, scales via media queries)

// ── Background image positioning – adjust independently for desktop & mobile
// Desktop: backgroundPosition X/Y offsets and zoom
const BG_DESKTOP_POS_X = 0;            // Horizontal offset in px: positive = right, negative = left
const BG_DESKTOP_POS_Y = 390;            // Vertical offset in px: positive = down, negative = up
const BG_DESKTOP_ZOOM = 1;             // Zoom scale: 1 = 100%, 1.2 = 120%, etc.

// Mobile: backgroundPosition X/Y offsets and zoom
const BG_MOBILE_POS_X = 10;             // Horizontal offset in px
const BG_MOBILE_POS_Y = 0;             // Vertical offset in px
const BG_MOBILE_ZOOM = 1.1;              // Zoom scale


// ── Header spacing to cards – adjust separately for desktop & mobile
const HEADER_TO_CARDS_GAP_DESKTOP = 30;  // Gap in px between "Treatment" title and cards (desktop)
const HEADER_TO_CARDS_GAP_MOBILE = 48;   // Gap in px between "Treatment" title and cards (mobile)

// ── Header internal spacing – gap between "Our Signature" and "Treatment" title
const SIGNATURE_TO_TITLE_GAP = -10;        // Gap in px between "Our Signature" flourish and "Treatment" heading

// ── Icon positioning – adjust vertical position via marginBottom in px (positive = down, negative = up)
const ICON_MARGIN_BOTTOM_DESKTOP_SHRUNK = -20;    // Icon margin bottom when card shrunk (desktop)
const ICON_MARGIN_BOTTOM_DESKTOP_EXPANDED = -15;  // Icon margin bottom when card expanded (desktop)
const ICON_MARGIN_BOTTOM_MOBILE = -15;            // Icon margin bottom on mobile

export default function SignatureTreatment() {
  const [active, setActive] = useState(0);

  return (
    <section className="sig-treatment-section" style={{ backgroundImage: `url('/images/bgcoffee1.webp')`, backgroundPosition: `calc(50% + ${BG_DESKTOP_POS_X}px) calc(50% + ${BG_DESKTOP_POS_Y}px)`, backgroundSize: `${BG_DESKTOP_ZOOM * 100}%`, backgroundRepeat: "no-repeat", backgroundAttachment: "scroll", padding: "60px 40px", position: "relative", margin: 0 }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .treatment-header {
          animation: fadeUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        .treatment-card {
          animation: slideInLeft 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        .treatment-card:nth-child(2) {
          animation: slideInRight 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        @keyframes pulseRing {
          0%   { transform: translate(calc(-50% ), calc(-50% - 2px)) scale(1);   opacity: 0.7; }
          70%  { transform: translate(calc(-50% ), calc(-50% - 2px)) scale(1.9); opacity: 0;   }
          100% { transform: translate(calc(-50% ), calc(-50% - 2px)) scale(1);   opacity: 0;   }
        }
        .hint-pulse {
          position: absolute;
          width: 32px; height: 32px;
          border-radius: 50%;
          top: 50%; left: 50%;
          transform: translate(calc(-50% - 2px), calc(-50% - 2px));
          animation: pulseRing 2.2s ease-out infinite;
          pointer-events: none;
        }
        @media (max-width: 499px) {
          .treat-desktop { display: none !important; }
          .treat-mobile  { display: flex !important; }
          .treat-mobile-tag { display: none !important; }
          .sig-treatment-section {
            background-position: calc(50% + ${BG_MOBILE_POS_X}px) calc(50% + ${BG_MOBILE_POS_Y}px) !important;
            background-size: ${BG_MOBILE_ZOOM * 100}% !important;
          }
          .treatment-header { margin-bottom: ${HEADER_TO_CARDS_GAP_MOBILE}px !important; }

          .card-img-zoom { backgroundSize: 100% !important; }
        }
        /* Gradual zoom scaling for mobile: 454px (1x) → 250px (2x) */
        @media (max-width: 454px) {
          .card-img-zoom { backgroundSize: 105% !important; }
        }
        @media (max-width: 400px) {
          .card-img-zoom { backgroundSize: 125% !important; }
        }
        @media (max-width: 350px) {
          .card-img-zoom { backgroundSize: 150% !important; }
        }
        @media (max-width: 300px) {
          .card-img-zoom { backgroundSize: 175% !important; }
        }
        @media (max-width: 250px) {
          .card-img-zoom { backgroundSize: 200% !important; }
        }
        @media (min-width: 500px) {
          .treat-desktop { display: flex !important; }
          .treat-mobile  { display: none !important; }
          .sig-treatment-section {
            background-position: calc(50% + ${BG_DESKTOP_POS_X}px) calc(50% + ${BG_DESKTOP_POS_Y}px) !important;
            background-size: ${BG_DESKTOP_ZOOM * 100}% !important;
          }
          .treatment-header { margin-bottom: ${HEADER_TO_CARDS_GAP_DESKTOP}px !important; }

        }
      `}</style>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        


        <div style={{ position: "relative", zIndex: 1 }}>

        {/* Header — matches client's existing flourish style */}
        <div className="treatment-header" style={{ textAlign: "center", marginBottom: HEADER_TO_CARDS_GAP_DESKTOP }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: SIGNATURE_TO_TITLE_GAP }}>
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
          {treatments.slice(0, 2).map((t, i) => {
            const isActive = active === i;
            const posX = i === 0 ? CARD1_POS_X : CARD2_POS_X;
            const posY = i === 0 ? CARD1_POS_Y : CARD2_POS_Y;
            const imgZoom = i === 0 ? (isActive ? CARD1_ZOOM_EXPANDED : CARD1_ZOOM_SHRUNK) : (isActive ? CARD2_ZOOM_EXPANDED : CARD2_ZOOM_SHRUNK);
            const blur = isActive ? CARD_BLUR_EXPANDED : CARD_BLUR_SHRUNK;
            
            return (
              <div
                key={t.id}
                className="treatment-card"
                onClick={() => setActive(i)}
                style={{
                  flex: isActive ? 2.4 : 1,
                  transition: "flex 0.55s cubic-bezier(0.4,0,0.2,1)",
                  borderRadius: 20,
                  overflow: "hidden",
                  position: "relative",
                  cursor: isActive ? "default" : "pointer",
                  border: "0.5px solid rgba(139,99,64,0.2)",
                }}
              >
                {/* Blurred background image layer */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${cardImages[i]}')`, backgroundPosition: `calc(50% + ${posX}px) calc(50% + ${posY}px)`, backgroundSize: `${imgZoom * 100}%`, backgroundRepeat: "no-repeat", filter: `blur(${blur}px)`, zIndex: 0 }} />
                
                <div style={{ position: "absolute", inset: 0, background: isActive ? "linear-gradient(to top, rgba(20,8,2,0.95) 0%, rgba(20,8,2,0.45) 55%, rgba(20,8,2,0.08) 100%)" : "linear-gradient(to top, rgba(20,8,2,0.88) 0%, rgba(20,8,2,0.2) 100%)", transition: "background 0.4s", zIndex: 1 }} />

                {/* Collapsed hint with pulse animation */}
                {!isActive && (
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none", zIndex: 3 }}>
                    <div style={{ position: "relative", width: 32, height: 32, margin: "0 auto 8px" }}>
                      <Image
                        src="/icons/taptoexpandicon.webp"
                        alt="Expand"
                        width={28}
                        height={28}
                        style={{ objectFit: "contain", opacity: 0.8 }}
                      />
                      <div className="hint-pulse" style={{ border: `1.5px solid rgba(255,255,255,0.5)` }} />
                    </div>
                    <p style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>Expand</p>
                  </div>
                )}

                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: isActive ? "32px 26px" : "22px 18px", zIndex: 2, transition: "padding 0.4s" }}>
                  <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", borderRadius: 100, padding: "3px 10px", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(250,250,250,0.7)", marginBottom: 10, width: "fit-content" }}>
                    {t.tag}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {cardIcons[i] && (
                      <Image
                        src={cardIcons[i]}
                        alt={t.title}
                        width={isActive ? 28 : 20}
                        height={isActive ? 28 : 20}
                        style={{ objectFit: "contain", flexShrink: 0, marginBottom: isActive ? ICON_MARGIN_BOTTOM_DESKTOP_EXPANDED : ICON_MARGIN_BOTTOM_DESKTOP_SHRUNK }}
                      />
                    )}
                    <h3 style={{ color: "#FFF5E4", fontSize: isActive ? 24 : 17, fontWeight: 600, lineHeight: 1.2, marginBottom: isActive ? 6 : 0, transition: "font-size 0.4s" }}>
                      {t.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: 11, color: "rgba(250,250,250,0.4)", letterSpacing: "1px", marginBottom: isActive ? 12 : 0 }}>{t.hours}</p>

                  {/* Expandable */}
                  <div style={{ maxHeight: isActive ? 240 : 0, overflow: "hidden", opacity: isActive ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.35s" }}>
                    <div style={{ width: 28, height: 1, background: "rgba(200,169,106,0.5)", marginBottom: 12 }} />
                    <p style={{ fontSize: 13, color: "rgba(250,250,250,0.62)", lineHeight: 1.78, marginBottom: 20 }}>{t.desc}</p>
                    <button 
                      style={{ background: "#C8A96A", color: "#1C0E04", border: "none", borderRadius: 100, padding: "10px 22px", fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.2)", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 6px 16px rgba(0,0,0,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.2)";
                      }}
                    >
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
          {treatments.slice(0, 2).map((t, i) => {
            const posX = i === 0 ? CARD1_MOBILE_POS_X : CARD2_POS_X;
            const posY = i === 0 ? CARD1_MOBILE_POS_Y : CARD2_POS_Y;
            const imgZoom = i === 0 ? CARD1_MOBILE_ZOOM : CARD2_MOBILE_ZOOM;
            
            return (
              <div 
                key={t.id} 
                style={{ 
                  borderRadius: 20, 
                  overflow: "hidden", 
                  position: "relative", 
                  minHeight: 260, 
                  border: "0.5px solid rgba(139,99,64,0.2)" 
                }}>
                {/* Blurred background image layer */}
                <div className="card-img-zoom" style={{ position: "absolute", inset: 0, backgroundImage: `url('${cardImages[i]}')`, backgroundPosition: `calc(50% + ${posX}px) calc(50% + ${posY}px)`, backgroundRepeat: "no-repeat", zIndex: 0 }} />
                
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,8,2,0.92) 0%, rgba(20,8,2,0.15) 70%, transparent 100%)", zIndex: 1 }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px 20px", zIndex: 2 }}>
                  <div className="treat-mobile-tag" style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", borderRadius: 100, padding: "3px 10px", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(250,250,250,0.7)", marginBottom: 8, width: "fit-content" }}>{t.tag}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {cardIcons[i] && (
                      <Image
                        src={cardIcons[i]}
                        alt={t.title}
                        width={18}
                        height={18}
                        style={{ objectFit: "contain", flexShrink: 0, marginBottom: ICON_MARGIN_BOTTOM_MOBILE }}
                      />
                    )}
                    <h3 style={{ color: "#FFF5E4", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{t.title}</h3>
                  </div>
                  <p style={{ color: "rgba(250,250,250,0.4)", fontSize: 11, marginBottom: 10 }}>{t.hours}</p>
                  <p style={{ color: "rgba(250,250,250,0.62)", fontSize: 12, lineHeight: 1.6, marginBottom: 16 }}>{t.desc}</p>
                  <button 
                    style={{ background: "#C8A96A", color: "#1C0E04", border: "none", borderRadius: 100, padding: "10px 22px", fontSize: 11, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.2)", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 6px 16px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.2)";
                    }}
                  >
                    {t.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        </div>
      </div>
    </section>
  );
}