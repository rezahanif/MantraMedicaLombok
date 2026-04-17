"use client";

// src/components/recovery/WhyChoose.tsx
import { useState, useRef } from "react";
import { C } from "@/lib/constants";
import { whyChooseSlides } from "@/data/recoveryData";



const BG_DESKTOP_POS_X = 200;
const BG_DESKTOP_POS_Y = 50;
const BG_DESKTOP_ZOOM = 0.5;

const BG_MOBILE_POS_X = 0;
const BG_MOBILE_POS_Y = -160;
const BG_MOBILE_ZOOM = 1;

const BG3_DESKTOP_POS_X = 300;
const BG3_DESKTOP_POS_Y = -250;
const BG3_DESKTOP_ZOOM = 0.2;
const BG3_DESKTOP_OPACITY = 1;

const BG3_MOBILE_POS_X = -40;
const BG3_MOBILE_POS_Y = 280;
const BG3_MOBILE_ZOOM = 0.35;
const BG3_MOBILE_OPACITY = 1;



// ── Swipe hook ────────────────────────────────────────────────
function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? onSwipeLeft() : onSwipeRight();
    }
    touchStartX.current = null;
  };

  return { onTouchStart, onTouchEnd };
}

export default function WhyChoose() {
  const [slide, setSlide] = useState(0);

  const prev = () => setSlide((s) => (s - 1 + whyChooseSlides.length) % whyChooseSlides.length);
  const next = () => setSlide((s) => (s + 1) % whyChooseSlides.length);

  // Swipe left → next, swipe right → prev
  const swipe = useSwipe(next, prev);

  return (
    <section className="why-choose-section" style={{ background: C.light, padding: "72px 40px", borderTop: "1px solid rgba(139,99,64,0)", position: "relative", margin: 0, overflow: "visible" }}>
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
        .whychoose-header  { animation: fadeUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .whychoose-content { animation: fadeUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; animation-delay: 0.2s; }
        .whychoose-buttons { animation: fadeUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; animation-delay: 0.3s; }
        @keyframes pulseRing {
          0%   { transform: translate(calc(-50%), calc(-50% - 2px)) scale(1);   opacity: 0.7; }
          70%  { transform: translate(calc(-50%), calc(-50% - 2px)) scale(1.9); opacity: 0;   }
          100% { transform: translate(calc(-50%), calc(-50% - 2px)) scale(1);   opacity: 0;   }
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
        .carousel-slide {
          user-select: none;
          -webkit-user-select: none;
          touch-action: pan-y;
        }
        @media (max-width: 499px) {
          .why-choose-desktop { display: none !important; }
          .why-choose-mobile  { display: flex !important; }

          .bg3-desktop        { display: none !important; }
          .bg3-mobile         { display: block !important; }

          .why-choose-section {
            background-image: url('/images/bgcoffee2.webp') !important;
            background-position: calc(50% + ${BG_MOBILE_POS_X}px) calc(50% + ${BG_MOBILE_POS_Y}px) !important;
            background-size: ${BG_MOBILE_ZOOM * 100}% !important;
            background-attachment: scroll !important;
            background-repeat: no-repeat !important;
          }
        }
        @media (min-width: 500px) {
          .why-choose-desktop { display: flex !important; }
          .why-choose-mobile  { display: none !important; }

          .bg3-desktop        { display: block !important; }
          .bg3-mobile         { display: none !important; }

          .why-choose-section {
            background-image: url('/images/bgcoffee2.webp') !important;
            background-position: calc(50% + ${BG_DESKTOP_POS_X}px) calc(50% + ${BG_DESKTOP_POS_Y}px) !important;
            background-size: ${BG_DESKTOP_ZOOM * 100}% !important;
            background-attachment: scroll !important;
            background-repeat: no-repeat !important;
          }
        }
      `}</style>

      {/* ── BgCoffee3 – Desktop */}
      <div className="bg3-desktop" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('/images/bgcoffee3.webp')`, backgroundPosition: `calc(50% + ${BG3_DESKTOP_POS_X}px) calc(50% + ${BG3_DESKTOP_POS_Y}px)`, backgroundSize: `${BG3_DESKTOP_ZOOM * 100}%`, backgroundRepeat: "no-repeat", opacity: BG3_DESKTOP_OPACITY }} />
      </div>

      {/* ── BgCoffee3 – Mobile */}
      <div className="bg3-mobile" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('/images/bgcoffee3.webp')`, backgroundPosition: `calc(50% + ${BG3_MOBILE_POS_X}px) calc(50% + ${BG3_MOBILE_POS_Y}px)`, backgroundSize: `${BG3_MOBILE_ZOOM * 100}%`, backgroundRepeat: "no-repeat", opacity: BG3_MOBILE_OPACITY }} />
      </div>





      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Decorative separator */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 40, maxWidth: 1400, margin: "0 auto 40px" }}>
          <div style={{ height: 1, flex: 1, maxWidth: 150, background: "linear-gradient(to right, transparent, #8B6340)", position: "relative" }}>
            <span style={{ position: "absolute", top: "50%", right: -4, transform: "translateY(-50%)", color: "#8B6340", fontSize: 13 }}>❧</span>
          </div>
          <div style={{ height: 1, flex: 1, maxWidth: 150, background: "linear-gradient(to left, transparent, #8B6340)", position: "relative" }}>
            <span style={{ position: "absolute", top: "50%", left: -4, transform: "translateY(-50%) scaleX(-1)", color: "#8B6340", fontSize: 13 }}>❧</span>
          </div>
        </div>

        {/* ── DESKTOP ≥500px ── */}
        <div className="why-choose-desktop" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 48, alignItems: "center" }}>

          {/* Left — text */}
          <div style={{ flex: 1 }} className="whychoose-content">
            <h2 style={{ color: "#2C1A0E", fontSize: 28, fontWeight: 700, marginBottom: 16 }} className="whychoose-header">
              Why Choose Mantra Medica?
            </h2>
            <p style={{ color: "#7A6248", fontSize: 14, lineHeight: 1.85 }}>
              The Best View in Senaru. Unlike any other spa in the area, our facility is designed to harmonize with nature.
              While you receive your treatment, you are treated to breathtaking panoramic views of the lush valleys and
              the Rinjani foothills. It is an immersive experience of comfort and beauty that you won't find anywhere
              else in Senaru.
            </p>
          </div>

          {/* Right — carousel */}
          <div style={{ flex: 1, position: "relative" }}>
            <div
              className="carousel-slide"
              {...swipe}
              style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", position: "relative", background: `linear-gradient(135deg, #3D2208, #6B4425)`, cursor: "grab" }}
            >
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
                {whyChooseSlides[slide].caption}
              </div>

              {[{ fn: prev, side: "left",  arrow: "‹" }, { fn: next, side: "right", arrow: "›" }].map((btn, bi) => (
                <button
                  key={bi}
                  onClick={btn.fn}
                  style={{
                    position: "absolute", top: "50%",
                    [btn.side]: 12,
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.15)",
                    border: "0.5px solid rgba(255,255,255,0.3)",
                    borderRadius: "50%", width: 36, height: 36,
                    color: "#fff", fontSize: 20, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {btn.arrow}
                </button>
              ))}

              <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
                {whyChooseSlides.map((_, i) => (
                  <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 20 : 7, height: 7, borderRadius: 100, background: i === slide ? "#C8A96A" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.3s" }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE <500px ── */}
        <div className="why-choose-mobile" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>

          <div style={{ width: "100%" }}>
            <h2 style={{ color: "#2C1A0E", fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
              Why Choose Mantra Medica?
            </h2>
            <p style={{ color: "#7A6248", fontSize: 13, lineHeight: 1.8 }}>
              The Best View in Senaru. Unlike any other spa in the area, our facility is designed to harmonize with nature.
              While you receive your treatment, you are treated to breathtaking panoramic views of the lush valleys and
              the Rinjani foothills. It is an immersive experience of comfort and beauty that you won't find anywhere
              else in Senaru.
            </p>
          </div>

          <div style={{ width: "100%", position: "relative" }}>
            <div
              className="carousel-slide"
              {...swipe}
              style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "3/2", position: "relative", background: `linear-gradient(135deg, #3D2208, #6B4425)`, cursor: "grab" }}
            >
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                {whyChooseSlides[slide].caption}
              </div>

              {[{ fn: prev, side: "left",  arrow: "‹" }, { fn: next, side: "right", arrow: "›" }].map((btn, bi) => (
                <button
                  key={bi}
                  onClick={btn.fn}
                  style={{
                    position: "absolute", top: "50%",
                    [btn.side]: 8,
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.15)",
                    border: "0.5px solid rgba(255,255,255,0.3)",
                    borderRadius: "50%", width: 32, height: 32,
                    color: "#fff", fontSize: 18, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {btn.arrow}
                </button>
              ))}

              <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
                {whyChooseSlides.map((_, i) => (
                  <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 16 : 6, height: 6, borderRadius: 100, background: i === slide ? "#C8A96A" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.3s" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}