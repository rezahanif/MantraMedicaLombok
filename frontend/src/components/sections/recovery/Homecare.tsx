// src/components/recovery/HomeCare.tsx
import Image from "next/image";
import { C } from "@/lib/constants";
import { homeCareFeatures } from "@/data/recoveryData";

// ── Kembang3 (flower) mirrored – positioned behind content
// Desktop Kembang3 (mirrored)
const KEMBANG3_DESKTOP_POS_X = -450;           // Horizontal offset in px: positive = right, negative = left
const KEMBANG3_DESKTOP_POS_Y = 455;           // Vertical offset in px: positive = down, negative = up
const KEMBANG3_DESKTOP_ZOOM = 0.3;            // Zoom scale: 1 = 100%, 1.2 = 120%, etc.
const KEMBANG3_DESKTOP_OPACITY = 1;         // Opacity: 0 = invisible, 1 = fully visible

// Mobile Kembang3 (mirrored)
const KEMBANG3_MOBILE_POS_X = -150;            // Horizontal offset in px: positive = right, negative = left
const KEMBANG3_MOBILE_POS_Y = 155;            // Vertical offset in px: positive = down, negative = up
const KEMBANG3_MOBILE_ZOOM = 0.5;             // Zoom scale: 1 = 100%, 1.2 = 120%, etc.
const KEMBANG3_MOBILE_OPACITY = 1;          // Opacity: 0 = invisible, 1 = fully visible

// ── BgCoffee3 (object) – positioned behind content on mobile only
const BG3_MOBILE_POS_X = 0;                   // Horizontal offset in px: positive = right, negative = left
const BG3_MOBILE_POS_Y = 1050;                // Vertical offset in px: positive = down, negative = up
const BG3_MOBILE_ZOOM = 0.4;                    // Zoom scale: 1 = 100%, 1.2 = 120%, etc.
const BG3_MOBILE_OPACITY = 1;                // Opacity: 0 = invisible, 1 = fully visible

// ── Quote positioning – adjust vertical position
const QUOTE_MARGIN_TOP_DESKTOP = 0;           // Margin top in px: positive = down, negative = up (desktop)
const QUOTE_MARGIN_BOTTOM_DESKTOP = 24;       // Margin bottom in px (desktop)
const QUOTE_MARGIN_TOP_MOBILE = 0;            // Margin top in px: positive = down, negative = up (mobile)
const QUOTE_MARGIN_BOTTOM_MOBILE = 16;        // Margin bottom in px (mobile)

// ── Icon sizing – adjust dimensions for desktop & mobile
const ICON_WIDTH_DESKTOP = 36;                // Icon width on desktop
const ICON_HEIGHT_DESKTOP = 36;               // Icon height on desktop
const ICON_WIDTH_MOBILE = 32;                 // Icon width on mobile
const ICON_HEIGHT_MOBILE = 32;                // Icon height on mobile

export default function HomeCare() {
  return (
    <section style={{ background: C.light, padding: "64px 40px", borderTop: "1px solid rgba(139,99,64,0)" }}>
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
        .homecare-card {
          animation: fadeUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        .homecare-content {
          animation: slideInRight 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both;
          animation-delay: 0.2s;
        }
        .homecare-quote {
          animation: fadeUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both;
          animation-delay: 0.4s;
        }
        .homecare-buttons {
          animation: fadeUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both;
          animation-delay: 0.5s;
        }
        @media (max-width: 499px) {
          .homecare-desktop { display: none !important; }
          .homecare-mobile  { display: flex !important; }
          .kembang3-desktop { display: none !important; }
          .kembang3-mobile  { display: block !important; }
          .bg3-mobile { display: block !important; }
        }
        @media (min-width: 500px) {
          .homecare-desktop { display: flex !important; }
          .homecare-mobile  { display: none !important; }
          .kembang3-desktop { display: block !important; }
          .kembang3-mobile  { display: none !important; }
          .bg3-mobile { display: none !important; }
        }
      `}</style>

      {/* ── Kembang3 (flower) mirrored layer – Desktop */}
      <div className="kembang3-desktop" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 0 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('/images/kembang3.webp')`, backgroundPosition: `calc(50% + ${KEMBANG3_DESKTOP_POS_X}px) calc(50% + ${KEMBANG3_DESKTOP_POS_Y}px)`, backgroundSize: `${KEMBANG3_DESKTOP_ZOOM * 100}%`, backgroundRepeat: "no-repeat", backgroundAttachment: "scroll", opacity: KEMBANG3_DESKTOP_OPACITY, transform: "scaleX(-1)" }} />
      </div>

      {/* ── Kembang3 (flower) mirrored layer – Mobile */}
      <div className="kembang3-mobile" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, pointerEvents: "none", borderRadius: 0 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('/images/kembang3.webp')`, backgroundPosition: `calc(50% + ${KEMBANG3_MOBILE_POS_X}px) calc(50% + ${KEMBANG3_MOBILE_POS_Y}px)`, backgroundSize: `${KEMBANG3_MOBILE_ZOOM * 100}%`, backgroundRepeat: "no-repeat", backgroundAttachment: "scroll", opacity: KEMBANG3_MOBILE_OPACITY, transform: "scaleX(-1)" }} />
      </div>

      {/* ── BgCoffee3 (object) layer – Mobile only */}
      <div className="bg3-mobile" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, pointerEvents: "none", borderRadius: 0 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('/images/bgcoffee3.webp')`, backgroundPosition: `calc(50% + ${BG3_MOBILE_POS_X}px) calc(50% + ${BG3_MOBILE_POS_Y}px)`, backgroundSize: `${BG3_MOBILE_ZOOM * 100}%`, backgroundRepeat: "no-repeat", backgroundAttachment: "scroll", opacity: BG3_MOBILE_OPACITY }} />
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

      <div className="homecare-desktop" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 32, alignItems: "flex-start" }}>

        {/* Left — 2 feature cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
          {homeCareFeatures.map((f, idx) => (
            <div
              key={f.title}
              className="homecare-card"
              style={{ background: "#EDE5D6", border: "0.5px solid rgba(139,99,64,0.15)", borderRadius: 16, padding: "22px 20px", position: "relative", overflow: "hidden", animationDelay: `${idx * 0.1}s` }}
            >
              <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(139,99,64,0.06)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <Image
                  src={`/${f.icon}`}
                  alt={f.title}
                  width={ICON_WIDTH_DESKTOP}
                  height={ICON_HEIGHT_DESKTOP}
                  style={{ objectFit: "contain", flexShrink: 0 }}
                />
                <h4 style={{ color: "#2C1A0E", fontSize: 15, fontWeight: 700 }}>{f.title}</h4>
              </div>
              <p style={{ color: "#7A6248", fontSize: 13, lineHeight: 1.75 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Right — main text */}
        <div style={{ flex: 1.2, display: "flex", flexDirection: "column", justifyContent: "center" }} className="homecare-content">
          <h2 style={{ color: "#2C1A0E", fontSize: 26, fontWeight: 700, lineHeight: 1.3, marginBottom: 16, direction: "rtl" }}>
            We Bring the Spa to You<br />Home Care Services
          </h2>
          <p style={{ color: "#7A6248", fontSize: 14, lineHeight: 1.85, marginBottom: 28, direction: "rtl" }}>
            Too exhausted to leave your room? We understand. If you've just returned from a grueling 3-day trek
            or a long day at the waterfalls, you don't have to move a muscle.
          </p>

          {/* Quote band */}
          <div style={{ background: "linear-gradient(135deg, #3D2208 0%, #5C3318 100%)", borderRadius: 14, padding: "20px 24px", marginTop: QUOTE_MARGIN_TOP_DESKTOP, marginBottom: QUOTE_MARGIN_BOTTOM_DESKTOP, position: "relative", overflow: "hidden" }} className="homecare-quote">
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(200,169,106,0.12) 0%, transparent 60%)" }} />
            <div style={{ width: 24, height: 1, background: "rgba(200,169,106,0.4)", marginBottom: 10 }} />
            <p style={{ fontFamily: "Georgia, serif", fontSize: 16, fontStyle: "italic", color: "#F5E0BC", lineHeight: 1.5, position: "relative", direction: "rtl" }}>
              "The ultimate reward for your Rinjani adventure awaits"
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }} className="homecare-buttons">
            <button style={{ background: "#C8A96A", color: "#1C0E04", border: "none", borderRadius: 100, padding: "11px 24px", fontSize: 12, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}>
              Book Your Session
            </button>
            <button style={{ background: "transparent", color: "#6B4E2A", border: "0.5px solid #8B6340", borderRadius: 100, padding: "11px 20px", fontSize: 12, letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}>
              Request Home Care
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: Stacked layout (<500px) */}
      <div className="homecare-mobile" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Main text first */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ color: "#2C1A0E", fontSize: 22, fontWeight: 700, lineHeight: 1.3, marginBottom: 8 }}>
              We Bring the Spa to You <br />Home Care Services
          </h2>
          <p style={{ color: "#7A6248", fontSize: 13, lineHeight: 1.75, marginBottom: 0 }}>
            Too exhausted to leave your room? We understand. If you've just returned from a grueling trek or a long day at the waterfalls, you don't have to move a muscle.
          </p>
        </div>

        {/* Feature cards stacked */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {homeCareFeatures.map((f) => (
            <div
              key={f.title}
              style={{ background: "#EDE5D6", border: "0.5px solid rgba(139,99,64,0.15)", borderRadius: 16, padding: "16px 18px", position: "relative", overflow: "hidden" }}
            >
              <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(139,99,64,0.06)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Image
                  src={`/${f.icon}`}
                  alt={f.title}
                  width={ICON_WIDTH_MOBILE}
                  height={ICON_HEIGHT_MOBILE}
                  style={{ objectFit: "contain", flexShrink: 0 }}
                />
                <h4 style={{ color: "#2C1A0E", fontSize: 14, fontWeight: 700 }}>{f.title}</h4>
              </div>
              <p style={{ color: "#7A6248", fontSize: 12, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Quote band */}
        <div style={{ background: "linear-gradient(135deg, #3D2208 0%, #5C3318 100%)", borderRadius: 14, padding: "16px 20px", marginTop: QUOTE_MARGIN_TOP_MOBILE, marginBottom: QUOTE_MARGIN_BOTTOM_MOBILE, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(200,169,106,0.12) 0%, transparent 60%)" }} />
          <div style={{ width: 20, height: 1, background: "rgba(200,169,106,0.4)", marginBottom: 8 }} />
          <p style={{ fontFamily: "Georgia, serif", fontSize: 14, fontStyle: "italic", color: "#F5E0BC", lineHeight: 1.45, position: "relative" }}>
            "The ultimate reward for your Rinjani adventure awaits"
          </p>
        </div>

        {/* Buttons stacked */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button style={{ background: "#C8A96A", color: "#1C0E04", border: "none", borderRadius: 100, padding: "10px 20px", fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", width: "100%" }}>
            Book Your Session
          </button>
          <button style={{ background: "transparent", color: "#6B4E2A", border: "0.5px solid #8B6340", borderRadius: 100, padding: "10px 20px", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", width: "100%" }}>
            Request Home Care
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}