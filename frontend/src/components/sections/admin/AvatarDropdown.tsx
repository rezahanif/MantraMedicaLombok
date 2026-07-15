'use client';

import React, { useEffect, useRef } from "react";
import { useTheme } from "./AdminContext";
import { Icon, icons } from "./AdminIcons";

interface AvatarDropdownProps {
  onClose: () => void;
  onLogout: () => void;
}

export const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ onClose, onLogout }) => {
  const { T, dark } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    setTimeout(() => document.addEventListener('mousedown', h), 0);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: "calc(100% + 10px)",
        right: 0,
        width: 220,
        background: T.surface,
        borderRadius: 14,
        border: `1px solid ${T.border}`,
        boxShadow: `0 8px 28px ${dark ? "rgba(0,0,0,0.45)" : "rgba(33,33,33,0.13)"}`,
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 16px",
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: T.teal,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          AM
        </div>
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: T.text,
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Admin Mantra
          </p>
          <p style={{ fontSize: 11, color: T.textMuted, margin: 0 }}>Super Admin</p>
        </div>
      </div>
      <div style={{ padding: "6px" }}>
        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            width: "100%",
            padding: "9px 10px",
            borderRadius: 9,
            border: "none",
            background: "transparent",
            color: "#D95E57",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            textAlign: "left",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = dark ? "#2A1110" : "#FDECEA")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <Icon d={icons.logout} color="#D95E57" size={15} />
          Sign Out
        </button>
      </div>
    </div>
  );
};
