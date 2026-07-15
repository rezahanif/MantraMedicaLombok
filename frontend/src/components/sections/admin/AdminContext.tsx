'use client';

import { createContext, useContext, useState, useEffect } from "react";

export const lightT = {
  bg: "#F4F8F7",
  surface: "#FFFFFF",
  surface2: "#F4F8F7",
  text: "#212121",
  textMid: "#5A5A5A",
  textMuted: "#9A9A9A",
  border: "#E4ECEB",
  teal: "#65A396",
  tealDk: "#4A7D72",
  tealLt: "#87B2A8",
  danger: "#D95E57",
  amber: "#E8A444",
  overlay: "rgba(33,33,33,0.45)",
};

export const darkT = {
  bg: "#121A19",
  surface: "#1A2523",
  surface2: "#1E2D2B",
  text: "#E8F0EF",
  textMid: "#A0B3B0",
  textMuted: "#5A7A75",
  border: "#263B38",
  teal: "#7CB7AC",
  tealDk: "#A8CFC8",
  tealLt: "#3D635B",
  danger: "#E07B75",
  amber: "#E8A444",
  overlay: "rgba(0,0,0,0.65)",
};

export type ThemeTokens = typeof lightT;

export interface ThemeContextType {
  T: ThemeTokens;
  dark: boolean;
  setDark: (v: boolean) => void;
  page: string;
  setPage: (p: string) => void;
}

export const ThemeCtx = createContext<ThemeContextType>({
  T: lightT,
  dark: false,
  setDark: () => {},
  page: "Dashboard",
  setPage: () => {},
});

export const useTheme = () => useContext(ThemeCtx);

export function useIsMobile(bp = 768) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const c = () => setM(window.innerWidth < bp);
    c();
    window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, [bp]);
  return m;
}
