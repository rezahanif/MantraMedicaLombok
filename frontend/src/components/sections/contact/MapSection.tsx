// src/components/contact/MapSection.tsx
// Map on left, service cards on right
// ↓ Replace the map placeholder div with a real Google Maps embed:
//   <iframe src="https://www.google.com/maps/embed?pb=..." width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />

import { C } from "@/lib/constants";
import { serviceCards } from "@/data/contactData";

export default function MapSection() {
  return (
    <section style={{ background: C.light, padding: "0 32px 48px" }}>
      <style>{`
        @media (max-width: 499px) {
          .map-desktop { display: none !important; }
          .map-mobile  { display: flex !important; }
        }
        @media (min-width: 500px) {
          .map-desktop { display: flex !important; }
          .map-mobile  { display: none !important; }
        }
      `}</style>

      {/* Desktop: Side-by-side (≥500px) */}
      <div className="map-desktop" style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 24, alignItems: "flex-start" }}>

        {/* Map */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Location pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.light, border: `1px solid ${C.border}`, borderRadius: 100, padding: "6px 14px", fontSize: 12, color: C.dark, fontWeight: 500, marginBottom: 12, marginTop: -18, position: "relative", zIndex: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            📍 Rinjani, Lombok Utara
          </div>

          {/* Map embed placeholder — replace with real iframe */}
          <div style={{ borderRadius: 16, overflow: "hidden", height: 240, background: "#E8EFF5", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.border}`, fontSize: 13, color: "#888" }}>
            {/* ↓ Replace this div with your Google Maps iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.5!2d116.47!3d-8.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOCozMCcwMC4wIlMgMTE2uzI4JzEyLjAiRQ!5e0!3m2!1sen!2sid!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Service cards */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, paddingTop: 8 }}>
          {serviceCards.map((svc: typeof serviceCards[number]) => (
            <div
              key={svc.title}
              style={{ borderRadius: 18, overflow: "hidden", position: "relative", minHeight: 160, background: svc.bg, border: `1px solid ${C.border}` }}
            >
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.3) 60%, transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 2 }}>
                <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.12)", borderRadius: 100, padding: "3px 10px", fontSize: 10, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(250,250,250,0.75)", marginBottom: 6, width: "fit-content" }}>
                  {svc.tag}
                </div>
                <h4 style={{ color: "#FAFAFA", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{svc.title}</h4>
                <p style={{ color: "#87B2A8", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>⏰ {svc.hours}</p>
                <p style={{ color: "rgba(250,250,250,0.55)", fontSize: 11.5, lineHeight: 1.6, marginBottom: 12 }}>{svc.note}</p>
                <button
                  style={{ background: svc.ctaColor, color: svc.ctaColor === "#FAFAFA" ? "#212121" : "#FAFAFA", border: "none", borderRadius: 100, padding: "8px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}
                >
                  📞 {svc.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Mobile: Stacked (<500px) */}
      <div className="map-mobile" style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Location pill */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.light, border: `1px solid ${C.border}`, borderRadius: 100, padding: "6px 12px", fontSize: 11, color: C.dark, fontWeight: 500 }}>
          📍 Rinjani, Lombok Utara
        </div>

        {/* Map */}
        <div style={{ borderRadius: 16, overflow: "hidden", height: 200, background: "#E8EFF5", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.border}`, fontSize: 13, color: "#888" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.5!2d116.47!3d-8.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOCozMCcwMC4wIlMgMTE2uzI4JzEyLjAiRQ!5e0!3m2!1sen!2sid!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Service cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {serviceCards.map((svc: typeof serviceCards[number]) => (
            <div
              key={svc.title}
              style={{ borderRadius: 16, overflow: "hidden", position: "relative", minHeight: 140, background: svc.bg, border: `1px solid ${C.border}` }}
            >
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.3) 60%, transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: "16px 18px", display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 2 }}>
                <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.12)", borderRadius: 100, padding: "2px 8px", fontSize: 9, letterSpacing: "0.5px", textTransform: "uppercase", color: "rgba(250,250,250,0.75)", marginBottom: 4, width: "fit-content" }}>
                  {svc.tag}
                </div>
                <h4 style={{ color: "#FAFAFA", fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{svc.title}</h4>
                <p style={{ color: "#87B2A8", fontSize: 12, fontWeight: 500, marginBottom: 4 }}>⏰ {svc.hours}</p>
                <p style={{ color: "rgba(250,250,250,0.55)", fontSize: 11, lineHeight: 1.5, marginBottom: 10 }}>{svc.note}</p>
                <button
                  style={{ background: svc.ctaColor, color: svc.ctaColor === "#FAFAFA" ? "#212121" : "#FAFAFA", border: "none", borderRadius: 100, padding: "7px 16px", fontSize: 11, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}
                >
                  📞 {svc.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}