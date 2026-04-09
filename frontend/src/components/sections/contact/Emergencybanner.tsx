// src/components/contact/EmergencyBanner.tsx
import { C } from "@/lib/constants";

export default function EmergencyBanner() {
  return (
    <section style={{ background: C.light, padding: "32px 32px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Desktop: Horizontal flex (≥500px) */}
        <div
          className="hidden min-[500px]:flex"
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
            📞 Emergency Call Now
          </button>
        </div>

        {/* Mobile: Vertical stack (<500px) */}
        <div
          className="flex flex-col min-[500px]:hidden"
          style={{
            background: C.teal,
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
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
            📞 Emergency Call
          </button>
        </div>
      </div>
    </section>
  );
}