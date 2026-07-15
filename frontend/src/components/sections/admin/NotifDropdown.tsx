'use client';

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "./AdminContext";
import { Icon, icons } from "./AdminIcons";
import { NOTIFS } from "./AdminConstants";

interface NotifDropdownProps {
  onClose: () => void;
}

export const NotifDropdown: React.FC<NotifDropdownProps> = ({ onClose }) => {
  const { T, dark } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [notifs, setNotifs] = useState(NOTIFS);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    setTimeout(() => document.addEventListener('mousedown', h), 0);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);

  const unread = notifs.filter((n) => !n.read).length;

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: "calc(100% + 10px)",
        right: 0,
        width: 320,
        background: T.surface,
        borderRadius: 16,
        border: `1px solid ${T.border}`,
        boxShadow: `0 8px 32px ${dark ? "rgba(0,0,0,0.4)" : "rgba(33,33,33,0.12)"}`,
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
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>Notifications</span>
          {unread > 0 && (
            <span
              style={{
                background: T.teal,
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                padding: "1px 7px",
                borderRadius: 20,
              }}
            >
              {unread}
            </span>
          )}
        </div>
        {unread > 0 && (
          <button
            onClick={() => setNotifs((p) => p.map((n) => ({ ...n, read: true })))}
            style={{
              fontSize: 11,
              color: T.teal,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 600,
            }}
          >
            Mark all read
          </button>
        )}
      </div>
      <div style={{ maxHeight: 300, overflowY: "auto" }}>
        {notifs.map((n) => (
          <div
            key={n.id}
            onClick={() =>
              setNotifs((p) => p.map((x) => (x.id === n.id ? { ...x, read: true } : x)))
            }
            style={{
              padding: "12px 16px",
              borderBottom: `1px solid ${T.border}`,
              cursor: "pointer",
              background: n.read ? T.surface : dark ? "#1B3530" : "#E8F5F2",
              borderLeft: `3px solid ${n.read ? "transparent" : T.teal}`,
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{n.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: n.read ? 500 : 700, color: T.text, margin: 0 }}>
                  {n.title}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: T.textMid,
                    margin: "2px 0 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {n.body}
                </p>
                <p style={{ fontSize: 10, color: T.textMuted, margin: "2px 0 0" }}>{n.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "10px 16px", borderTop: `1px solid ${T.border}`, textAlign: "center" }}>
        <span style={{ fontSize: 12, color: T.textMuted }}>End of notifications</span>
      </div>
    </div>
  );
};
