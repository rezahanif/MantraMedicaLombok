// src/components/contact/ContactInfo.tsx
"use client";

import Image from "next/image";
import { C } from "@/lib/constants";
import { contactInfo } from "@/data/contactData";

export default function ContactInfo() {
  return (
    <section style={{ background: C.teal, padding: "52px 32px", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .contact-section-heading { animation: fadeIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .contact-info-desktop .contact-card { animation: slideUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .contact-info-desktop .contact-card:nth-child(1) { animation-delay: 0.15s; }
        .contact-info-desktop .contact-card:nth-child(2) { animation-delay: 0.3s; }
        .contact-info-desktop .contact-card:nth-child(3) { animation-delay: 0.45s; }
        .contact-info-mobile .contact-card { animation: slideUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .contact-info-mobile .contact-card:nth-child(1) { animation-delay: 0.15s; }
        .contact-info-mobile .contact-card:nth-child(2) { animation-delay: 0.25s; }
        .contact-info-mobile .contact-card:nth-child(3) { animation-delay: 0.35s; }

        @media (max-width: 499px) {
          .contact-info-desktop { display: none !important; }
          .contact-info-mobile  { display: grid !important; }
        }
        @media (min-width: 500px) {
          .contact-info-desktop { display: grid !important; }
          .contact-info-mobile  { display: none !important; }
        }
      `}</style>

      {/* Decorative quotation marks */}
      <div style={{ position: "absolute", top: 16, left: 20, fontSize: 48, color: "rgba(255,255,255,0.08)", lineHeight: 1, fontFamily: "serif" }}>"</div>
      <div style={{ position: "absolute", bottom: 16, right: 20, fontSize: 48, color: "rgba(255,255,255,0.08)", lineHeight: 1, fontFamily: "serif", transform: "rotate(180deg)" }}>"</div>

      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h2 className="contact-section-heading" style={{ color: C.light, fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>
          Contact Information
        </h2>

        {/* Desktop: 3-column grid (≥500px) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="contact-info-desktop">
          {contactInfo.map((item) => (
            <div key={item.primary} className="contact-card" style={{ textAlign: "center" }}>
              <div style={{ marginBottom: 10 }}>
                <img src={item.icon} alt="" style={{ width: 28, height: 28, objectFit: "contain", margin: "0 auto" }} />
              </div>
              <p style={{ color: C.light, fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{item.primary}</p>
              <p style={{ color: "rgba(250,250,250,0.65)", fontSize: 12, marginBottom: 16 }}>{item.secondary}</p>
              <button
                style={{ 
                  background: item.ctaColor,
                  color: C.light,
                  border: item.ctaColor === C.teal ? `1px solid rgba(255,255,255,0.4)` : "none",
                  borderRadius: 100,
                  padding: "8px 18px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.15)`,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.2), 0 6px 16px rgba(0,0,0,0.25)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.15)`;
                }}
              >
                {item.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Mobile: 1-column stack (<500px) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }} className="contact-info-mobile">
          {contactInfo.map((item) => (
            <div key={item.primary} className="contact-card" style={{ textAlign: "center", background: "rgba(255,255,255,0.08)", padding: 16, borderRadius: 16 }}>
              <div style={{ marginBottom: 8 }}>
                <img src={item.icon} alt="" style={{ width: 32, height: 32, objectFit: "contain", margin: "0 auto" }} />
              </div>
              <p style={{ color: C.light, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.primary}</p>
              <p style={{ color: "rgba(250,250,250,0.65)", fontSize: 11, marginBottom: 12 }}>{item.secondary}</p>
              <button
                style={{ 
                  background: item.ctaColor,
                  color: C.light,
                  border: item.ctaColor === C.teal ? `1px solid rgba(255,255,255,0.4)` : "none",
                  borderRadius: 100,
                  padding: "7px 14px",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%",
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.15)`,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.2), 0 6px 16px rgba(0,0,0,0.25)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.15)`;
                }}
              >
                {item.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}