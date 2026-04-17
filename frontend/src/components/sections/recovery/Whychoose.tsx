"use client";

// src/components/recovery/WhyChoose.tsx
import { useState } from "react";
import { C } from "@/lib/constants";
import { whyChooseSlides } from "@/data/recoveryData";

// ── Bunga (flower) decorative image – positioned behind content
// Desktop Bunga
const BUNGA_POS_X = -400;                   // Horizontal offset in px: positive = right, negative = left
const BUNGA_POS_Y = -335;                   // Vertical offset in px: positive = down, negative = up
const BUNGA_ZOOM = 0.4;                    // Zoom scale: 1 = 100%, 1.2 = 120%, etc.
const BUNGA_OPACITY = 1;                 // Opacity: 0 = invisible, 1 = fully visible

// Mobile Bunga
const BUNGA_MOBILE_POS_X = -150;            // Horizontal offset in px: positive = right, negative = left
const BUNGA_MOBILE_POS_Y = -355;            // Vertical offset in px: positive = down, negative = up
const BUNGA_MOBILE_ZOOM = 0.45;           // Zoom scale: 1 = 100%, 1.2 = 120%, etc.
const BUNGA_MOBILE_OPACITY = 1;          // Opacity: 0 = invisible, 1 = fully visible

// ── Background image positioning – adjust separately for desktop & mobile
// Desktop: backgroundPosition X/Y offsets and zoom
const BG_DESKTOP_POS_X = 200;              // Horizontal offset in px: positive = right, negative = left
const BG_DESKTOP_POS_Y = 40;              // Vertical offset in px: positive = down, negative = up
const BG_DESKTOP_ZOOM = 0.5;               // Zoom scale: 1 = 100%, 1.2 = 120%, etc.

// Mobile: backgroundPosition X/Y offsets and zoom
const BG_MOBILE_POS_X = 0;               // Horizontal offset in px
const BG_MOBILE_POS_Y = -160;               // Vertical offset in px
const BG_MOBILE_ZOOM = 1;                // Zoom scale

// ── BgCoffee3 object image – positioned behind cards
// Desktop BgCoffee3
const BG3_DESKTOP_POS_X = 300;               // Horizontal offset in px: positive = right, negative = left
const BG3_DESKTOP_POS_Y = -250;               // Vertical offset in px: positive = down, negative = up
const BG3_DESKTOP_ZOOM = 0.2;                // Zoom scale: 1 = 100%, 1.2 = 120%, etc.
const BG3_DESKTOP_OPACITY = 1;             // Opacity: 0 = invisible, 1 = fully visible

// Mobile BgCoffee3
const BG3_MOBILE_POS_X = -40;                // Horizontal offset in px: positive = right, negative = left
const BG3_MOBILE_POS_Y = 270;                // Vertical offset in px: positive = down, negative = up
const BG3_MOBILE_ZOOM = 0.35;                 // Zoom scale: 1 = 100%, 1.2 = 120%, etc.
const BG3_MOBILE_OPACITY = 1;              // Opacity: 0 = invisible, 1 = fully visible

// ── Kembang3 (flower) mirrored – positioned behind content
// Desktop Kembang3 (mirrored)
const KEMBANG3_DESKTOP_POS_X = -450;           // Horizontal offset in px: positive = right, negative = left
const KEMBANG3_DESKTOP_POS_Y = 300;           // Vertical offset in px: positive = down, negative = up
const KEMBANG3_DESKTOP_ZOOM = 0.3;            // Zoom scale: 1 = 100%, 1.2 = 120%, etc.
const KEMBANG3_DESKTOP_OPACITY = 1;         // Opacity: 0 = invisible, 1 = fully visible

// Mobile Kembang3 (mirrored)
const KEMBANG3_MOBILE_POS_X = -150;            // Horizontal offset in px: positive = right, negative = left
const KEMBANG3_MOBILE_POS_Y = 330;            // Vertical offset in px: positive = down, negative = up
const KEMBANG3_MOBILE_ZOOM = 0.5;             // Zoom scale: 1 = 100%, 1.2 = 120%, etc.
const KEMBANG3_MOBILE_OPACITY = 1;          // Opacity: 0 = invisible, 1 = fully visible

export default function WhyChoose() {
  const [slide, setSlide] = useState(0);

  const prev = () => setSlide((s) => (s - 1 + whyChooseSlides.length) % whyChooseSlides.length);
  const next = () => setSlide((s) => (s + 1) % whyChooseSlides.length);

  return (
    <section className="why-choose-section" style={{ background: C.light, padding: "72px 40px", borderTop: "1px solid rgba(139,99,64,0)", position: "relative", margin: 0 }}>
      <style>{`
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
          .why-choose-desktop { display: none !important; }
          .why-choose-mobile  { display: flex !important; }
          .bunga-desktop { display: none !important; }
          .bunga-mobile  { display: block !important; }
          .bg3-desktop { display: none !important; }
          .bg3-mobile  { display: block !important; }
          .kembang3-desktop { display: none !important; }
          .kembang3-mobile  { display: block !important; }
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
          .bunga-desktop { display: block !important; }
          .bunga-mobile  { display: none !important; }
          .bg3-desktop { display: block !important; }
          .bg3-mobile  { display: none !important; }
          .kembang3-desktop { display: block !important; }
          .kembang3-mobile  { display: none !important; }
          .why-choose-section {
            background-image: url('/images/bgcoffee2.webp') !important;
            background-position: calc(50% + ${BG_DESKTOP_POS_X}px) calc(50% + ${BG_DESKTOP_POS_Y}px) !important;
            background-size: ${BG_DESKTOP_ZOOM * 100}% !important;
            background-attachment: scroll !important;
            background-repeat: no-repeat !important;
          }
        }
          0%   { transform: translate(calc(-50% ), calc(-50% - 2px)) scale(1);   opacity: 0.7; }
          70%  { transform: translate(calc(-50% ), calc(-50% - 2px)) scale(1.9); opacity: 0;   }
          100% { transform: translate(calc(-50% ), calc(-50% - 2px)) scale(1);   opacity: 0;   }
        }
      `}</style>

      {/* ── BgCoffee3 (object) layer – Desktop */}
      <div className="bg3-desktop" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 0 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('/images/bgcoffee3.webp')`, backgroundPosition: `calc(50% + ${BG3_DESKTOP_POS_X}px) calc(50% + ${BG3_DESKTOP_POS_Y}px)`, backgroundSize: `${BG3_DESKTOP_ZOOM * 100}%`, backgroundRepeat: "no-repeat", backgroundAttachment: "scroll", opacity: BG3_DESKTOP_OPACITY }} />
      </div>

      {/* ── BgCoffee3 (object) layer – Mobile */}
      <div className="bg3-mobile" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, pointerEvents: "none", borderRadius: 0 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('/images/bgcoffee3.webp')`, backgroundPosition: `calc(50% + ${BG3_MOBILE_POS_X}px) calc(50% + ${BG3_MOBILE_POS_Y}px)`, backgroundSize: `${BG3_MOBILE_ZOOM * 100}%`, backgroundRepeat: "no-repeat", backgroundAttachment: "scroll", opacity: BG3_MOBILE_OPACITY }} />
      </div>

      {/* ── Kembang3 (flower) mirrored layer – Desktop */}
      <div className="kembang3-desktop" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 0 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('/images/kembang3.webp')`, backgroundPosition: `calc(50% + ${KEMBANG3_DESKTOP_POS_X}px) calc(50% + ${KEMBANG3_DESKTOP_POS_Y}px)`, backgroundSize: `${KEMBANG3_DESKTOP_ZOOM * 100}%`, backgroundRepeat: "no-repeat", backgroundAttachment: "scroll", opacity: KEMBANG3_DESKTOP_OPACITY, transform: "scaleX(-1)" }} />
      </div>

      {/* ── Kembang3 (flower) mirrored layer – Mobile */}
      <div className="kembang3-mobile" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, pointerEvents: "none", borderRadius: 0 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('/images/kembang3.webp')`, backgroundPosition: `calc(50% + ${KEMBANG3_MOBILE_POS_X}px) calc(50% + ${KEMBANG3_MOBILE_POS_Y}px)`, backgroundSize: `${KEMBANG3_MOBILE_ZOOM * 100}%`, backgroundRepeat: "no-repeat", backgroundAttachment: "scroll", opacity: KEMBANG3_MOBILE_OPACITY, transform: "scaleX(-1)" }} />
      </div>

      {/* ── Bunga (flower) layer – Desktop */}
      <div className="bunga-desktop" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 0 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('/images/bunga.webp')`, backgroundPosition: `calc(50% + ${BUNGA_POS_X}px) calc(50% + ${BUNGA_POS_Y}px)`, backgroundSize: `${BUNGA_ZOOM * 100}%`, backgroundRepeat: "no-repeat", backgroundAttachment: "scroll", opacity: BUNGA_OPACITY }} />
      </div>

      {/* ── Bunga (flower) layer – Mobile */}
      <div className="bunga-mobile" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, pointerEvents: "none", borderRadius: 0 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('/images/bunga.webp')`, backgroundPosition: `calc(50% + ${BUNGA_MOBILE_POS_X}px) calc(50% + ${BUNGA_MOBILE_POS_Y}px)`, backgroundSize: `${BUNGA_MOBILE_ZOOM * 100}%`, backgroundRepeat: "no-repeat", backgroundAttachment: "scroll", opacity: BUNGA_MOBILE_OPACITY }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
      {/* Decorative flourish separator — centered on page */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 40, maxWidth: 1400, margin: "0 auto 40px" }}>
        <div style={{ height: 1, flex: 1, maxWidth: 150, background: "linear-gradient(to right, transparent, #8B6340)", position: "relative" }}>
          <span style={{ position: "absolute", top: "50%", right: -4, transform: "translateY(-50%)", color: "#8B6340", fontSize: 13 }}>❧</span>
        </div>
        <div style={{ height: 1, flex: 1, maxWidth: 150, background: "linear-gradient(to left, transparent, #8B6340)", position: "relative" }}>
          <span style={{ position: "absolute", top: "50%", left: -4, transform: "translateY(-50%) scaleX(-1)", color: "#8B6340", fontSize: 13 }}>❧</span>
        </div>
      </div>

      {/* Desktop: Side-by-side (≥500px) */}
      <div className="why-choose-desktop" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 48, alignItems: "center" }}>

        {/* Left — text */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "#2C1A0E", fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
            Why Choose Mantra Medica?
          </h2>
          <p style={{ color: "#7A6248", fontSize: 14, lineHeight: 1.85 }}>
            The Best View in Senaru. Unlike any other spa in the area, our facility is designed to harmonize with nature.
            While you receive your treatment, you are treated to breathtaking panoramic views of the lush valleys and
            the Rinjani foothills. It is an immersive experience of comfort and beauty that you won't find anywhere
            else in Senaru.
          </p>
        </div>

        {/* Right — image carousel */}
        <div style={{ flex: 1, position: "relative" }}>
          {/* Slide image placeholder
              ↓ Replace inner div with:
              <Image src={whyChooseSlides[slide].imagePath} fill style={{ objectFit: "cover" }} alt="" /> */}
          <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", position: "relative", background: `linear-gradient(135deg, #3D2208, #6B4425)` }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
              {whyChooseSlides[slide].caption}
            </div>

            {/* Prev / Next arrows */}
            {[{ dir: "prev", fn: prev, pos: 12, arrow: "‹" }, { dir: "next", fn: next, pos: 12, arrow: "›" }].map((btn, bi) => (
              <button
                key={bi}
                onClick={btn.fn}
                style={{
                  position: "absolute",
                  top: "50%",
                  [bi === 0 ? "left" : "right"]: btn.pos,
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.15)",
                  border: "0.5px solid rgba(255,255,255,0.3)",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(4px)",
                }}
              >
                {btn.arrow}
              </button>
            ))}

            {/* Dots */}
            <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
              {whyChooseSlides.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setSlide(i)}
                  style={{ width: i === slide ? 20 : 7, height: 7, borderRadius: 100, background: i === slide ? "#C8A96A" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.3s" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Vertical stack (<500px) */}
      <div className="why-choose-mobile" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>

        {/* Left — text */}
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

        {/* Right — image carousel */}
        <div style={{ width: "100%", position: "relative" }}>
          {/* Slide image placeholder */}
          <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "3/2", position: "relative", background: `linear-gradient(135deg, #3D2208, #6B4425)` }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
              {whyChooseSlides[slide].caption}
            </div>

            {/* Prev / Next arrows */}
            {[{ dir: "prev", fn: prev, pos: 8, arrow: "‹" }, { dir: "next", fn: next, pos: 8, arrow: "›" }].map((btn, bi) => (
              <button
                key={bi}
                onClick={btn.fn}
                style={{
                  position: "absolute",
                  top: "50%",
                  [bi === 0 ? "left" : "right"]: btn.pos,
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.15)",
                  border: "0.5px solid rgba(255,255,255,0.3)",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  color: "#fff",
                  fontSize: 18,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(4px)",
                }}
              >
                {btn.arrow}
              </button>
            ))}

            {/* Dots */}
            <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
              {whyChooseSlides.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setSlide(i)}
                  style={{ width: i === slide ? 16 : 6, height: 6, borderRadius: 100, background: i === slide ? "#C8A96A" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.3s" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}