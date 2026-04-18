"use client";

import { useState, useEffect } from "react";
import { C } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

// src/components/shared/ClinicStatsBar.tsx
// Reusable on any page — stats pill + emergency banner
// Colors: #D95E57 (red), #65A396 (teal), #177C65 (dark teal)

const COLORS = {
  red:      "#D95E57",
  teal:     "#65A396",
  darkTeal: "#177C65",
  light:     C.light,
  dark:     "#212121",
};

const stats = [
  {
    label: "Licensed Doctors",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#177C65" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: "Fast Response",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#177C65" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    label: "Trek-Specialist",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#177C65" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l4-8 4 5 3-3 4 6"/><circle cx="17" cy="6" r="2"/>
      </svg>
    ),
  },
  {
    label: "Open Daily 08.00–22.00",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#177C65" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
];

export default function ClinicStatsBar() {
  const [whatsappNumber, setWhatsappNumber] = useState("");

  // Fetch WhatsApp from clinic_info
  useEffect(() => {
    const fetchWhatsApp = async () => {
      try {
        const { data } = await supabase.from('clinic_info').select('whatsapp_number').single();
        if (data?.whatsapp_number) setWhatsappNumber(data.whatsapp_number);
      } catch (err) {
        console.error('Error fetching WhatsApp:', err);
      }
    };
    fetchWhatsApp();
  }, []);

  return (
    <div style={{ background: COLORS.light }}>

      {/* STATS PILL */}
      <div style={{ padding: "24px 32px 0" }}>

        {/* Desktop — single pill with dividers */}
        <div
          className="stats-desktop-pill hidden min-[600px]:flex"
          style={{
            maxWidth: 860, margin: "0 auto",
            border: `1.5px solid ${COLORS.teal}`,
            borderRadius: 100, padding: "14px 32px",
            alignItems: "center", justifyContent: "space-around",
            background: COLORS.light,
          }}
        >
          {stats.map((s, i) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {i > 0 && <div style={{ width: 1, height: 32, background: `${COLORS.teal}40`, marginRight: 10 }} />}
              <div style={{ flexShrink: 0 }}>{s.icon}</div>
              <span style={{ color: COLORS.dark, fontSize: 13, fontWeight: 600, lineHeight: 1.3, whiteSpace: "nowrap" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile — 2x2 grid of mini pills */}
        <div
          className="grid min-[600px]:hidden"
          style={{ gridTemplateColumns: "1fr 1fr", gap: 10, maxWidth: 480, margin: "0 auto" }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                border: `1.5px solid ${COLORS.teal}`, borderRadius: 16,
                padding: "12px 14px", display: "flex", alignItems: "center",
                gap: 8, background: COLORS.light,
              }}
            >
              <div style={{ flexShrink: 0 }}>{s.icon}</div>
              <span style={{ color: COLORS.dark, fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* EMERGENCY BANNER */}
      <div className="emergency-banner-container" style={{ padding: "20px 32px 28px" }}>
        <div
          className="emergency-banner"
          style={{
            maxWidth: 860, margin: "0 auto",
            background: COLORS.teal, borderRadius: 100,
            padding: "16px 24px 16px 32px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: 16,
          }}
        >
          <p style={{ color: COLORS.light, fontSize: 16, fontWeight: 600, margin: 0, whiteSpace: "nowrap" }}>
            Need urgent help? We're here 24/7
          </p>
          <button
            className="emergency-call-btn"
            onClick={() => {
              if (whatsappNumber) {
                window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`, "_blank");
              }
            }}
            style={{
              background: COLORS.red, color: COLORS.light,
              border: "none", borderRadius: 100, padding: "10px 20px",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
              flexShrink: 0, whiteSpace: "nowrap",
            }}
          >
            {/* Replace with: <Image src="/icons/whatsapp.svg" width={16} height={16} alt="" /> */}
            <svg className="emergency-call-icon" width="16" height="16" viewBox="0 0 24 24" fill="#FAFAFA">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="emergency-call-text">Emergency Call Now</span>
          </button>
        </div>
      </div>

      {/* Mobile: stack banner vertically on very small screens */}
      <style>{`
        @media (max-width: 744px) and (min-width: 600px) {
          .stats-desktop-pill {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
            border-radius: 20px !important;
            padding: 12px 14px !important;
            max-width: 480px !important;
            border: none !important;
          }
          .stats-desktop-pill > div {
            border: 1.5px solid #65A396 !important;
            border-radius: 16px !important;
            padding: 10px 12px !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            background: #FAFAFA !important;
          }
          .stats-desktop-pill > div > div:first-child {
            display: none !important;
          }
        }
        @media (max-width: 599px) {
          .emergency-banner-container {
            padding: 16px 16px 24px !important;
          }
          .emergency-banner {
            padding: 12px 16px !important;
            gap: 8px !important;
          }
          .emergency-banner p { 
            font-size: 14px !important;
            white-space: normal !important; 
          }
        }
        @media (max-width: 460px) {
          .emergency-banner-container {
            padding: 12px 16px 16px !important;
            display: flex;
            justify-content: center;
          }
          .emergency-banner {
            maxWidth: 480 !important;
            width: 100% !important;
            padding: 12px 14px !important;
            gap: 0 !important;
            border-radius: 20px !important;
          }
          .emergency-banner p { 
            font-size: 11px !important;
            white-space: nowrap !important;
            flex-shrink: 0;
            margin: 0 !important;
          }
        }
        @media (max-width: 599px) {
          .emergency-call-btn {
            width: 40px !important;
            height: 40px !important;
            padding: 0 !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 11px !important;
            gap: 0 !important;
          }
          .emergency-call-text { display: none !important; }
          .emergency-call-icon { width: 16px !important; height: 16px !important; }
        }
      `}</style>
    </div>
  );
}