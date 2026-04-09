// src/components/contact/ContactInfo.tsx
import { C } from "@/lib/constants";
import { contactInfo } from "@/data/contactData";

export default function ContactInfo() {
  return (
    <section style={{ background: C.teal, padding: "52px 32px", position: "relative", overflow: "hidden" }}>
      {/* Decorative quotation marks */}
      <div style={{ position: "absolute", top: 16, left: 20, fontSize: 48, color: "rgba(255,255,255,0.08)", lineHeight: 1, fontFamily: "serif" }}>"</div>
      <div style={{ position: "absolute", bottom: 16, right: 20, fontSize: 48, color: "rgba(255,255,255,0.08)", lineHeight: 1, fontFamily: "serif", transform: "rotate(180deg)" }}>"</div>

      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h2 style={{ color: C.light, fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>
          Contact Information
        </h2>

        {/* Desktop: 3-column grid (≥500px) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="hidden min-[500px]:grid">
          {contactInfo.map((item) => (
            <div key={item.primary} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{item.icon}</div>
              <p style={{ color: C.light, fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{item.primary}</p>
              <p style={{ color: "rgba(250,250,250,0.65)", fontSize: 12, marginBottom: 16 }}>{item.secondary}</p>
              <button
                style={{ background: item.ctaColor, color: C.light, border: item.ctaColor === C.teal ? `1px solid rgba(255,255,255,0.4)` : "none", borderRadius: 100, padding: "8px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                {item.cta === "Call Now" ? "📞 " : item.cta === "Send Email" ? "✉️ " : "📍 "}{item.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Mobile: 1-column stack (<500px) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }} className="flex flex-col min-[500px]:hidden">
          {contactInfo.map((item) => (
            <div key={item.primary} style={{ textAlign: "center", background: "rgba(255,255,255,0.08)", padding: 16, borderRadius: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <p style={{ color: C.light, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.primary}</p>
              <p style={{ color: "rgba(250,250,250,0.65)", fontSize: 11, marginBottom: 12 }}>{item.secondary}</p>
              <button
                style={{ background: item.ctaColor, color: C.light, border: item.ctaColor === C.teal ? `1px solid rgba(255,255,255,0.4)` : "none", borderRadius: 100, padding: "7px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer", width: "100%" }}
              >
                {item.cta === "Call Now" ? "📞 " : item.cta === "Send Email" ? "✉️ " : "📍 "}{item.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}