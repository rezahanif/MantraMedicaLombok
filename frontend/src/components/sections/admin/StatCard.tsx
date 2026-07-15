'use client';

import React from "react";
import { useTheme } from "./AdminContext";
import { Icon } from "./AdminIcons";

interface StatCardProps {
  label: string;
  value: number | string;
  sub: string;
  subColor?: string;
  iconD: string;
  iconBg?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  sub,
  subColor,
  iconD,
  iconBg,
}) => {
  const { T } = useTheme();
  return (
    <div
      style={{
        background: T.surface,
        borderRadius: 16,
        border: `1px solid ${T.border}`,
        padding: "18px 20px",
        display: "flex",
        alignItems: "flex-start",
        gap: 13,
        minWidth: 0,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: iconBg || T.surface2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon d={iconD} color={T.teal} size={19} />
      </div>
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontSize: 11,
            color: T.textMuted,
            margin: "0 0 3px",
            fontWeight: 600,
            letterSpacing: "0.4px",
            textTransform: "uppercase",
          }}
        >
          {label}
        </p>
        <p style={{ fontSize: 26, fontWeight: 700, color: T.text, margin: "0 0 2px", lineHeight: 1 }}>
          {value}
        </p>
        <p style={{ fontSize: 12, color: subColor || T.teal, margin: 0, fontWeight: 500 }}>{sub}</p>
      </div>
    </div>
  );
};
