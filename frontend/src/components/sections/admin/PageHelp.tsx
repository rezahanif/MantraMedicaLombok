'use client';

import React from "react";
import { useTheme } from "./AdminContext";
import { Icon, icons } from "./AdminIcons";

export const PageHelp: React.FC = () => {
  const { T, dark } = useTheme();
  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: T.text, margin: 0 }}>Help & Support</h1>
        <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>Contact the Mantra Medica technical team</p>
      </div>
      <div style={{ maxWidth: 520 }}>
        <div
          style={{
            background: T.surface,
            borderRadius: 20,
            border: `1px solid ${T.border}`,
            padding: "28px 30px",
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: dark ? "#1B3530" : "#E8F5F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <Icon d={icons.help} color={T.teal} size={26} />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, margin: "0 0 8px" }}>Need help?</h2>
          <p style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.7, margin: "0 0 24px" }}>
            Reach out directly for support, feature requests, or dashboard issues.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "13px 18px",
                borderRadius: 12,
                background: dark ? "#0E2A24" : "#E8F8F0",
                border: `1.5px solid ${dark ? "#1E4A3E" : "#A8DFC8"}`,
                textDecoration: "none",
              }}
            >
              <Icon d={icons.map} color="#128C7E" size={20} />
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: dark ? "#5ECFB5" : "#0A6B54", margin: 0 }}>
                  WhatsApp Super Admin
                </p>
                <p style={{ fontSize: 11, color: dark ? "#3A9478" : "#3A9478", margin: 0 }}>
                  +62 812-3456-7890 · Usually replies in minutes
                </p>
              </div>
            </a>
            <a
              href="mailto:superadmin@mantramedica.com"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "13px 18px",
                borderRadius: 12,
                background: dark ? "#111830" : "#EEF2FF",
                border: `1.5px solid ${dark ? "#243060" : "#C4CFFE"}`,
                textDecoration: "none",
              }}
            >
              <Icon d={icons.mail} color="#4361CB" size={20} />
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: dark ? "#7B9FE8" : "#2B3E9E", margin: 0 }}>
                  Email Super Admin
                </p>
                <p style={{ fontSize: 11, color: dark ? "#4C5FA5" : "#4C5FA5", margin: 0 }}>
                  superadmin@mantramedica.com · Within 24h
                </p>
              </div>
            </a>
          </div>
        </div>
        <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, padding: "18px 22px" }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: T.text, margin: "0 0 13px" }}>Frequently Asked</h3>
          {[
            ["How do I add an appointment?", "Appointments → New Booking, fill in details and submit."],
            ["How do I publish a review?", "Go to Reviews and click Publish on the review."],
            ["How do I connect Google Maps?", "Settings → Integrations → Google Maps → Connect, paste your embed URL."],
          ].map(([q, a], i) => (
            <div key={i} style={{ marginBottom: 11, paddingBottom: 11, borderBottom: i < 2 ? `1px solid ${T.border}` : "none" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: T.text, margin: "0 0 2px" }}>{q}</p>
              <p style={{ fontSize: 11, color: T.textMuted, margin: 0, lineHeight: 1.6 }}>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PageHelp;
