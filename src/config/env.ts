import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra as
  | {
      apiUrl?: string;
      googleWebClientId?: string;
      googleIosClientId?: string;
      googleAndroidClientId?: string;
    }
  | undefined;

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? extra?.apiUrl ?? "";

export const GOOGLE_WEB_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? extra?.googleWebClientId ?? "";

export const GOOGLE_IOS_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? extra?.googleIosClientId ?? "";

export const GOOGLE_ANDROID_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ??
  extra?.googleAndroidClientId ??
  "";

export const REQUEST_TIMEOUT_MS = 15000;
export const REQUEST_RETRIES = 1;

export function requireApiUrl() {
  if (!API_URL) {
    throw new Error("EXPO_PUBLIC_API_URL is not configured");
  }

  return API_URL.replace(/\/$/, "");
}
