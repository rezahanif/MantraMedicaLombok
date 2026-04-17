// src/components/contact/EmergencyBanner.tsx
import { C } from "@/lib/constants";

export default function EmergencyBanner() {
  return (
    <section style={{ background: C.light, padding: "32px 32px" }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .banner-desktop { animation: fadeIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .banner-mobile  { animation: fadeIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; animation-delay: 0.15s; }

        @media (max-width: 860px) {
          .banner-desktop { display: none !important; }
          .banner-mobile  { display: flex !important; }
        }
      `}</style>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Desktop: Horizontal flex (≥860px) */}
        <div
          className="banner-desktop"
          style={{
            background: C.teal,
            borderRadius: 100,
            padding: "16px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <p style={{ color: C.light, fontSize: 16, fontWeight: 600 }}>
            Need urgent help? We're here 24/7
          </p>
          <button
            style={{
              background: "#E05A4E",
              color: C.light,
              border: "none",
              borderRadius: 100,
              padding: "10px 22px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 7,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <img src="/icons/whatsappwhite.webp" alt="WhatsApp" style={{ width: 18, height: 18 }} />
            Emergency Call Now
          </button>
        </div>

        {/* Mobile: Vertical stack (<860px) */}
        <div
          className="banner-mobile"
          style={{
            background: C.teal,
            borderRadius: 16,
            padding: "16px 20px",
            display: "none",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            textAlign: "center",
          }}
        >
          <p style={{ color: C.light, fontSize: 14, fontWeight: 600 }}>
            Need urgent help? We're here 24/7
          </p>
          <button
            style={{
              background: "#E05A4E",
              color: C.light,
              border: "none",
              borderRadius: 100,
              padding: "10px 16px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            <img src="/icons/whatsappwhite.webp" alt="WhatsApp" style={{ width: 16, height: 16 }} />
            Emergency Call
          </button>
        </div>
      </div>
    </section>
  );
}