"use client";

// src/components/recovery/WhyChoose.tsx
import { useState } from "react";
import { C } from "@/lib/constants";
import { whyChooseSlides } from "@/data/recoveryData";

export default function WhyChoose() {
  const [slide, setSlide] = useState(0);

  const prev = () => setSlide((s) => (s - 1 + whyChooseSlides.length) % whyChooseSlides.length);
  const next = () => setSlide((s) => (s + 1) % whyChooseSlides.length);

  return (
    <section style={{ background: C.light, padding: "72px 40px", borderTop: "1px solid rgba(139,99,64,0.12)" }}>
      <style>{`
        @media (max-width: 499px) {
          .why-choose-desktop { display: none !important; }
          .why-choose-mobile  { display: flex !important; }
        }
        @media (min-width: 500px) {
          .why-choose-desktop { display: flex !important; }
          .why-choose-mobile  { display: none !important; }
        }
      `}</style>
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
    </section>
  );
}