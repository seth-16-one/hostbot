import { palette } from "./colors";

export const lightTheme = {
  dark: false,
  colors: {
    primary: palette.green500,
    primaryDark: palette.green600,

    background: "#f8fafc",
    card: palette.white,
    surface: "#f1f5f9",

    text: "#0f172a",
    secondaryText: "#334155",
    subtitleText: "#475569",
    muted: "#64748b",

    border: "#e2e8f0",
    divider: "#e5e7eb",

    success: palette.green600,
    successDark: palette.green700,
    successDeep: palette.green800,
    successBg: "#dcfce7",
    successLight: "#f0fdf4",

    danger: palette.red500,
    dangerDeep: palette.red800,
    dangerBg: "#fee2e2",
    dangerLight: "#fef2f2",
    dangerBorder: "#fecaca",

    warning: palette.amber500,
    warningBg: "#fef3c7",
    warningLight: "#fffbeb",

    info: palette.blue500,
    infoDark: palette.blue700,
    infoBg: "#dbeafe",
    infoLight: "#eff6ff",
    infoBorder: "#bfdbfe",

    wallet: palette.orange600,
    purple: palette.violet500,

    white: palette.white,
    black: palette.black,

    headerText: palette.white,
    headerSubtitle: "rgba(255,255,255,0.85)",

    tabActive: palette.green500,
    tabInactive: "#94a3b8",

    icon: "#64748b",
    iconLight: "#94a3b8",

    overlay: "rgba(0,0,0,0.40)",
    backdrop: "rgba(0,0,0,0.55)",
    glass: "rgba(255,255,255,0.15)",
    shadow: palette.black,

    ripple: "rgba(34,197,94,0.12)",
    focus: palette.green500,
    disabled: "#CBD5E1",

    transparent: "transparent",

    authBackground: "#EEF8F1",
    authCard: "#63DA87",
    authInput: "#1F2937",
    authBorder: "#374151",
    authPlaceholder: "#9CA3AF",
    authButton: palette.green500,
    authButtonPressed: palette.green600,
  },
  spacing: { xs: 8, sm: 12, md: 16, lg: 20, xl: 24 },
  radius: { sm: 8, md: 12, lg: 16, xl: 20, pill: 999 },
};

export type AppTheme = typeof lightTheme;
