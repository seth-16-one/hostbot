import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from "react-native-encrypted-storage";

const ACCESS_TOKEN_KEY = "hostbot.accessToken";
const REFRESH_TOKEN_KEY = "hostbot.refreshToken";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

async function setSecureItem(key: string, value: string) {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch {
    await AsyncStorage.setItem(key, value);
  }
}

async function getSecureItem(key: string) {
  try {
    const value = await EncryptedStorage.getItem(key);
    if (value) return value;
  } catch {
    // Fall back below.
  }

  return AsyncStorage.getItem(key);
}

async function removeSecureItem(key: string) {
  try {
    await EncryptedStorage.removeItem(key);
  } catch {
    // Fall back below.
  }

  await AsyncStorage.removeItem(key);
}

function decodeJwtPayload(token: string): { exp?: number } | null {
  try {
    const payload = token.split(".")[0];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export const tokenService = {
  async saveTokens(tokens: TokenPair) {
    await Promise.all([
      setSecureItem(ACCESS_TOKEN_KEY, tokens.accessToken),
      setSecureItem(REFRESH_TOKEN_KEY, tokens.refreshToken),
    ]);
  },

  async getAccessToken() {
    return getSecureItem(ACCESS_TOKEN_KEY);
  },

  async getRefreshToken() {
    return getSecureItem(REFRESH_TOKEN_KEY);
  },

  async clearTokens() {
    await Promise.all([
      removeSecureItem(ACCESS_TOKEN_KEY),
      removeSecureItem(REFRESH_TOKEN_KEY),
    ]);
  },

  isTokenExpired(token: string, skewSeconds = 60) {
    const payload = decodeJwtPayload(token);
    if (!payload?.exp) return false;
    return payload.exp <= Math.floor(Date.now() / 1000) + skewSeconds;
  },
};
