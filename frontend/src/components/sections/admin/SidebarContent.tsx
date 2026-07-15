'use client';

import React from "react";
import { useTheme } from "./AdminContext";
import { Icon, icons } from "./AdminIcons";

interface SidebarContentProps {
  page: string;
  setPage: (p: string) => void;
  pendingCount?: number;
  onNavClick?: () => void;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  page,
  setPage,
  pendingCount = 0,
  onNavClick,
}) => {
  const { T, dark } = useTheme();

  const nav = [
    { id: "Dashboard",    icon: icons.dashboard, label: "Dashboard" },
    { id: "Appointments", icon: icons.calendar,  label: "Appointments", badge: pendingCount },
    { id: "Services",     icon: icons.service,   label: "Services" },
    { id: "Reviews",      icon: icons.star,      label: "Reviews" },
    { id: "Photos",       icon: icons.image,     label: "Photos" },
  ];

  const bottom = [
    { id: "Settings", icon: icons.settings, label: "Settings" },
    { id: "Help",     icon: icons.help,     label: "Help"     },
  ];

  const go = (id: string) => {
    setPage(id);
    onNavClick?.();
  };

  const btnStyle = (id: string, danger = false): React.CSSProperties => {
    const active = page === id;
    return {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      padding: "10px 10px",
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      marginBottom: 2,
      textAlign: "left",
      fontFamily: "inherit",
      background: active
        ? danger
          ? dark ? "#2A1110" : "#FDECEA"
          : dark ? "#1B3530" : "#E8F5F2"
        : "transparent",
      color: active
        ? danger ? "#D95E57" : T.tealDk
        : danger ? "#D95E57" : T.textMid,
    };
  };

  return (
    <>
      <div
        style={{
          padding: "20px 9px 16px",
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <img
            src="/images/logonavbar.webp"
            alt="Mantra Medica"
            style={{ width: 120, height: 27, borderRadius: 9, objectFit: "contain" }}
          />
        </div>
      </div>
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: T.textMuted,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            padding: "4px 8px 6px",
            margin: 0,
          }}
        >
          Menu
        </p>
        {nav.map((item) => (
          <button key={item.id} onClick={() => go(item.id)} style={btnStyle(item.id)}>
            <Icon d={item.icon} color={page === item.id ? T.teal : T.textMuted} size={16} />
            <span style={{ fontSize: 13, fontWeight: page === item.id ? 700 : 500, flex: 1 }}>
              {item.label}
            </span>
            {(item.badge || 0) > 0 && (
              <span
                style={{
                  background: page === item.id ? T.teal : dark ? "#1B3530" : "#E8F5F2",
                  color: page === item.id ? "#fff" : T.tealDk,
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "1px 6px",
                  borderRadius: 20,
                }}
              >
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div style={{ padding: "10px 10px 14px", borderTop: `1px solid ${T.border}` }}>
        {bottom.map((item) => (
          <button key={item.id} onClick={() => go(item.id)} style={btnStyle(item.id)}>
            <Icon d={item.icon} color={page === item.id ? T.teal : T.textMuted} size={16} />
            <span style={{ fontSize: 13, fontWeight: page === item.id ? 700 : 500 }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};
