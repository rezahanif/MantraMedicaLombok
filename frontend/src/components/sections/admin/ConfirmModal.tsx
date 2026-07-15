'use client';

import React from "react";
import { useTheme } from "./AdminContext";
import { Icon, icons } from "./AdminIcons";

interface ConfirmProps {
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmProps> = ({
  title,
  message,
  confirmLabel = "Confirm",
  danger = false,
  onConfirm,
  onCancel,
}) => {
  const { T } = useTheme();
  return (
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
          maxWidth: 380,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: danger ? "#FDECEA" : "#E8F5F2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <Icon
            d={danger ? icons.trash : icons.calendar}
            color={danger ? "#D95E57" : "#65A396"}
            size={22}
          />
        </div>
        <h3
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: T.text,
            margin: "0 0 8px",
            textAlign: "center",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 13,
            color: T.textMuted,
            lineHeight: 1.6,
            margin: "0 0 22px",
            textAlign: "center",
          }}
        >
          {message}
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onCancel}
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
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "11px",
              borderRadius: 10,
              background: danger ? "#D95E57" : T.teal,
              color: "#fff",
              border: "none",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
