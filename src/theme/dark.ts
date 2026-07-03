import { palette } from "./colors";
import type { AppTheme } from "./light";

export const darkTheme: AppTheme = {
  dark: true,
  colors: {
    primary: palette.green500,
    primaryDark: palette.green600,

    background: "#0B1120",
    card: "#111827",
    surface: "#1F2937",

    text: "#F8FAFC",
    secondaryText: "#CBD5E1",
    subtitleText: "#94A3B8",
    muted: "#94A3B8",

    border: "#334155",
    divider: "#475569",

    success: "#4ADE80",
    successDark: "#86EFAC",
    successDeep: "#BBF7D0",
    successBg: "#14351F",
    successLight: "#102A1A",

    danger: "#F87171",
    dangerDeep: "#FECACA",
    dangerBg: "#451A1A",
    dangerLight: "#2F1515",
    dangerBorder: "#7F1D1D",

    warning: "#FBBF24",
    warningBg: "#422006",
    warningLight: "#4A2F08",

    info: "#60A5FA",
    infoDark: "#93C5FD",
    infoBg: "#172554",
    infoLight: "#111F3D",
    infoBorder: "#1D4ED8",

    wallet: "#FB923C",
    purple: "#A78BFA",

    white: palette.white,
    black: palette.black,

    headerText: palette.white,
    headerSubtitle: "rgba(255,255,255,0.82)",

    tabActive: palette.green500,
    tabInactive: "#64748B",

    icon: "#CBD5E1",
    iconLight: "#94A3B8",

    overlay: "rgba(0,0,0,0.65)",
    backdrop: "rgba(0,0,0,0.75)",
    glass: "rgba(255,255,255,0.08)",
    shadow: palette.black,

    ripple: "rgba(255,255,255,0.12)",
    focus: palette.green500,
    disabled: "#475569",

    transparent: "transparent",

    authBackground: "#0B1120",
    authCard: "#111827",
    authInput: "#1F2937",
    authBorder: "#334155",
    authPlaceholder: "#94A3B8",
    authButton: palette.green500,
    authButtonPressed: palette.green600,
  },
  spacing: { xs: 8, sm: 12, md: 16, lg: 20, xl: 24 },
  radius: { sm: 8, md: 12, lg: 16, xl: 20, pill: 999 },
};
