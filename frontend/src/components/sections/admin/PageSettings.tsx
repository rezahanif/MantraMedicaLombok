'use client';

import React, { useState, useEffect } from "react";
import { useTheme, useIsMobile } from "./AdminContext";
import { supabase } from "@/lib/supabase";
import { Icon, icons } from "./AdminIcons";

export const PageSettings: React.FC = () => {
  const { T, dark, setDark } = useTheme();
  const isMobile = useIsMobile();
  const [tab, setTab] = useState("Profile");
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("Admin Mantra");
  const [email, setEmail] = useState("admin@mantramedica.com");
  const [saved, setSaved] = useState(false);
  const tabs = ["Profile", "Security", "Display", "Integrations"];

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inp: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: `1.5px solid ${T.border}`,
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    color: T.text,
    background: T.surface2,
    fontFamily: "inherit",
  };

  // Integration state — fetch from clinic_info table
  const [integrations, setIntegrations] = useState([
    { id: "gmail",    name: "Gmail",           desc: "Not connected", connected: false, value: "", icon: "📧" },
    { id: "wa",     name: "WhatsApp Number", desc: "Not connected", connected: false, value: "", icon: "💬" },
    { id: "gmaps",  name: "Google Maps",     desc: "Not connected", connected: false, value: "", icon: "🗺️" },
    { id: "location", name: "Location",      desc: "Not connected", connected: false, value: "", icon: "📍" },
  ]);

  const [mapPopup, setMapPopup] = useState<{ id: string; label: string; current: string } | null>(null);
  const [popupInput, setPopupInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [clinicInfoId, setClinicInfoId] = useState<string>("");

  // Load clinic info from database on mount
  useEffect(() => {
    const loadClinicInfo = async () => {
      try {
        const { data } = await supabase.from('clinic_info').select('*').single();
        if (data) {
          setClinicInfoId(data.id);
          setIntegrations((prev) =>
            prev.map((item) => {
              const fieldMap: Record<string, keyof typeof data> = {
                gmail: 'email_address',
                wa: 'whatsapp_number',
                gmaps: 'gmaps_link',
                location: 'address_text',
              };
              const dbField = fieldMap[item.id];
              const value = data[dbField] || '';
              return {
                ...item,
                value,
                connected: !!value,
                desc: value ? `Connected: ${value}` : 'Not connected',
              };
            })
          );
        }
      } catch (err) {
        console.error('Error loading clinic info:', err);
      } finally {
        setLoading(false);
      }
    };
    loadClinicInfo();
  }, []);

  const openPopup = (item: typeof integrations[0]) => {
    setMapPopup({ id: item.id, label: item.name, current: item.value });
    setPopupInput(item.value);
  };

  const savePopup = async () => {
    if (!mapPopup) return;
    try {
      if (!clinicInfoId) {
        console.error("ERROR: Clinic Info ID not loaded yet");
        return;
      }

      const fieldMap: Record<string, string> = {
        gmail: 'email_address',
        wa: 'whatsapp_number',
        gmaps: 'gmaps_link',
        location: 'address_text',
      };
      const dbField = fieldMap[mapPopup.id];

      const { data, error } = await supabase
        .from('clinic_info')
        .update({ [dbField]: popupInput })
        .eq('id', clinicInfoId)
        .select();

      if (error) {
        console.error("UPDATE ERROR:", error.message, error.code);
        throw error;
      }

      setIntegrations((p) =>
        p.map((x) =>
          x.id === mapPopup.id
            ? {
                ...x,
                connected: !!popupInput,
                value: popupInput,
                desc: popupInput ? `Connected: ${popupInput}` : "Not connected",
              }
            : x
        )
      );
      setMapPopup(null);
    } catch (err) {
      console.error('Error saving to database:', err);
    }
  };

  return (
    <div>
      {/* Connect popup modal */}
      {mapPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: T.overlay,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            padding: 20,
          }}
        >
          <div
            style={{
              background: T.surface,
              borderRadius: 20,
              padding: "28px 30px",
              width: "100%",
              maxWidth: 400,
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: T.text, margin: 0 }}>
                {integrations.find((x) => x.id === mapPopup.id)?.connected ? "Change" : "Connect"} {mapPopup.label}
              </h3>
              <button onClick={() => setMapPopup(null)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted, padding: 4 }}>
                <Icon d={icons.x} color={T.textMuted} size={18} />
              </button>
            </div>
            <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 6, fontWeight: 600, textTransform: "uppercase" }}>
              {mapPopup.id === "gmaps"
                ? "Google Maps Embed URL"
                : mapPopup.id === "wa"
                ? "WhatsApp Number"
                : mapPopup.id === "location"
                ? "Location Address"
                : "Email Address"}
            </label>
            <input
              autoFocus
              value={popupInput}
              onChange={(e) => setPopupInput(e.target.value)}
              placeholder={
                mapPopup.id === "gmaps"
                  ? "https://maps.google.com/..."
                  : mapPopup.id === "wa"
                  ? "+62 8xx-xxxx-xxxx"
                  : mapPopup.id === "location"
                  ? "e.g. Rinjani, Lombok Utara"
                  : "email@domain.com"
              }
              style={{ ...inp, marginBottom: 18 }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setMapPopup(null)}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: 10,
                  background: T.surface2,
                  color: T.textMid,
                  border: `1px solid ${T.border}`,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Cancel
              </button>
              <button
                onClick={savePopup}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: 10,
                  background: T.teal,
                  color: "#fff",
                  border: "none",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: T.text, margin: 0 }}>Settings</h1>
        <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>Manage your account and preferences</p>
      </div>
      <div style={{ display: "flex", gap: 14, flexDirection: isMobile ? "column" : "row" }}>
        <div style={{ width: isMobile ? "100%" : 170, flexShrink: 0 }}>
          <div
            style={{
              background: T.surface,
              borderRadius: 14,
              border: `1px solid ${T.border}`,
              overflow: "hidden",
              display: isMobile ? "flex" : "block",
              flexWrap: "wrap",
            }}
          >
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  display: "block",
                  width: isMobile ? "auto" : "100%",
                  flex: isMobile ? 1 : "unset",
                  padding: "11px 14px",
                  textAlign: "left",
                  border: "none",
                  borderBottom: isMobile ? "none" : `1px solid ${T.border}`,
                  borderRight: isMobile ? `1px solid ${T.border}` : "none",
                  background: tab === t ? (dark ? "#1B3530" : "#E8F5F2") : T.surface,
                  color: tab === t ? T.tealDk : T.textMid,
                  fontSize: 12,
                  fontWeight: tab === t ? 700 : 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, padding: "22px 24px" }}>
          {tab === "Profile" && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, margin: "0 0 18px" }}>Profile</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: T.teal,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  AM
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: 0 }}>{name}</p>
                  <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 5px" }}>Super Admin</p>
                  <button style={{ fontSize: 11, color: T.teal, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", fontWeight: 600 }}>
                    Change avatar
                  </button>
                </div>
              </div>
              {(
                [
                  ["Full Name", "text", name, setName],
                  ["Email Address", "email", email, setEmail],
                ] as [string, string, string, (v: string) => void][]
              ).map(([lbl, type, val, setter]) => (
                <div key={lbl} style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 5, fontWeight: 600, textTransform: "uppercase" }}>{lbl}</label>
                  <input type={type} value={val} onChange={(e) => setter(e.target.value)} style={inp} />
                </div>
              ))}
            </div>
          )}
          {tab === "Security" && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, margin: "0 0 18px" }}>Password</h3>
              {["Current Password", "New Password", "Confirm New Password"].map((lbl) => (
                <div key={lbl} style={{ marginBottom: 14, position: "relative" }}>
                  <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 5, fontWeight: 600, textTransform: "uppercase" }}>{lbl}</label>
                  <input type={showPass ? "text" : "password"} placeholder="••••••••" style={{ ...inp, paddingRight: 44 }} />
                  <button onClick={() => setShowPass((p) => !p)} style={{ position: "absolute", right: 12, bottom: 10, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                    <Icon d={showPass ? icons.eyeOff : icons.eye} color={T.textMuted} size={15} />
                  </button>
                </div>
              ))}
              <div style={{ padding: "12px 14px", background: dark ? "#2A2010" : "#FEF6E8", borderRadius: 10, border: `1px solid ${dark ? "#4A3A1A" : "#F5DCA8"}` }}>
                <p style={{ fontSize: 12, color: dark ? "#C9933A" : "#8A5C10", margin: 0 }}>
                  🔒 Use 8+ characters with uppercase, lowercase, numbers, and symbols.
                </p>
              </div>
            </div>
          )}
          {tab === "Display" && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, margin: "0 0 18px" }}>Display</h3>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 10, fontWeight: 600, textTransform: "uppercase" }}>Theme</label>
                <div style={{ display: "flex", gap: 9 }}>
                  {(
                    [
                      ["Light", false],
                      ["Dark", true],
                    ] as [string, boolean][]
                  ).map(([label, isDark]) => (
                    <button
                      key={label}
                      onClick={() => setDark(isDark)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "10px 18px",
                        borderRadius: 9,
                        border: `1.5px solid ${dark === isDark ? T.teal : T.border}`,
                        background: dark === isDark ? (dark ? "#1B3530" : "#E8F5F2") : T.surface,
                        color: dark === isDark ? T.tealDk : T.textMid,
                        fontSize: 13,
                        fontWeight: dark === isDark ? 700 : 500,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <Icon d={isDark ? icons.moon : icons.sun} color={dark === isDark ? T.teal : T.textMuted} size={15} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab === "Integrations" && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, margin: "0 0 18px" }}>Integrations</h3>
              {integrations.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    background: T.surface2,
                    borderRadius: 12,
                    marginBottom: 9,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: T.text, margin: 0 }}>{item.name}</p>
                      <p style={{ fontSize: 11, color: item.connected ? T.teal : T.textMuted, margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openPopup(item)}
                    style={{
                      padding: "7px 14px",
                      borderRadius: 8,
                      border: `1px solid ${item.connected ? T.border : T.teal}`,
                      background: item.connected ? T.surface : dark ? "#1B3530" : "#E8F5F2",
                      color: item.connected ? T.textMid : T.tealDk,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    {item.connected ? "Change" : "Connect"}
                  </button>
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop: 20, paddingTop: 18, borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={save}
              style={{
                padding: "10px 26px",
                borderRadius: 10,
                background: T.teal,
                color: "#fff",
                border: "none",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Save Changes
            </button>
            {saved && <span style={{ fontSize: 13, color: T.teal, fontWeight: 600 }}>✓ Saved</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
