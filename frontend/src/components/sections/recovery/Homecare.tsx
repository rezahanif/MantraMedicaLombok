// src/components/recovery/HomeCare.tsx
import { C } from "@/lib/constants";
import { homeCareFeatures } from "@/data/recoveryData";

export default function HomeCare() {
  return (
    <section style={{ background: C.light, padding: "64px 40px", borderTop: "1px solid rgba(139,99,64,0.12)" }}>
      <style>{`
        @media (max-width: 499px) {
          .homecare-desktop { display: none !important; }
          .homecare-mobile  { display: flex !important; }
        }
        @media (min-width: 500px) {
          .homecare-desktop { display: flex !important; }
          .homecare-mobile  { display: none !important; }
        }
      `}</style>

      {/* Desktop: 2-column layout (≥500px) */}
      <div className="homecare-desktop" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 32, alignItems: "flex-start" }}>

        {/* Left — 2 feature cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
          {homeCareFeatures.map((f) => (
            <div
              key={f.title}
              style={{ background: "#EDE5D6", border: "0.5px solid rgba(139,99,64,0.15)", borderRadius: 16, padding: "22px 20px", position: "relative", overflow: "hidden" }}
            >
              <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(139,99,64,0.06)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#C8A96A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                  {f.icon}
                </div>
                <h4 style={{ color: "#2C1A0E", fontSize: 15, fontWeight: 700 }}>{f.title}</h4>
              </div>
              <p style={{ color: "#7A6248", fontSize: 13, lineHeight: 1.75 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Right — main text */}
        <div style={{ flex: 1.2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 style={{ color: "#2C1A0E", fontSize: 26, fontWeight: 700, lineHeight: 1.3, marginBottom: 16 }}>
            We Bring the Spa to You:<br />Home Care Services
          </h2>
          <p style={{ color: "#7A6248", fontSize: 14, lineHeight: 1.85, marginBottom: 28 }}>
            Too exhausted to leave your room? We understand. If you've just returned from a grueling 3-day trek
            or a long day at the waterfalls, you don't have to move a muscle.
          </p>

          {/* Quote band */}
          <div style={{ background: "linear-gradient(135deg, #3D2208 0%, #5C3318 100%)", borderRadius: 14, padding: "20px 24px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(200,169,106,0.12) 0%, transparent 60%)" }} />
            <div style={{ width: 24, height: 1, background: "rgba(200,169,106,0.4)", marginBottom: 10 }} />
            <p style={{ fontFamily: "Georgia, serif", fontSize: 16, fontStyle: "italic", color: "#F5E0BC", lineHeight: 1.5, position: "relative" }}>
              "The ultimate reward for your Rinjani adventure awaits."
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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
            We Bring the Spa to You:<br />Home Care Services
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
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#C8A96A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                  {f.icon}
                </div>
                <h4 style={{ color: "#2C1A0E", fontSize: 14, fontWeight: 700 }}>{f.title}</h4>
              </div>
              <p style={{ color: "#7A6248", fontSize: 12, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Quote band */}
        <div style={{ background: "linear-gradient(135deg, #3D2208 0%, #5C3318 100%)", borderRadius: 14, padding: "16px 20px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(200,169,106,0.12) 0%, transparent 60%)" }} />
          <div style={{ width: 20, height: 1, background: "rgba(200,169,106,0.4)", marginBottom: 8 }} />
          <p style={{ fontFamily: "Georgia, serif", fontSize: 14, fontStyle: "italic", color: "#F5E0BC", lineHeight: 1.45, position: "relative" }}>
            "The ultimate reward for your Rinjani adventure awaits."
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
    </section>
  );
}