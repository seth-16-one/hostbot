import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules } from "react-native";

const ACCESS_TOKEN_KEY = "hostbot.accessToken";
const REFRESH_TOKEN_KEY = "hostbot.refreshToken";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

type EncryptedStorageModule = {
  setItem?: (key: string, value: string) => Promise<void>;
  getItem?: (key: string) => Promise<string | null>;
  removeItem?: (key: string) => Promise<void>;
};

function getEncryptedStorage(): EncryptedStorageModule | null {
  const module = NativeModules.RNEncryptedStorage as
    | EncryptedStorageModule
    | undefined;

  if (!module?.setItem || !module?.getItem || !module?.removeItem) {
    return null;
  }

  return module;
}

async function setSecureItem(key: string, value: string) {
  const encryptedStorage = getEncryptedStorage();

  if (encryptedStorage) {
    try {
      await encryptedStorage.setItem?.(key, value);
      return;
    } catch {
      // Fall back to AsyncStorage below.
    }
  }

  await AsyncStorage.setItem(key, value);
}

async function getSecureItem(key: string) {
  const encryptedStorage = getEncryptedStorage();

  if (encryptedStorage) {
    try {
      const value = await encryptedStorage.getItem?.(key);
      if (value) return value;
    } catch {
      // Fall back to AsyncStorage below.
    }
  }

  return AsyncStorage.getItem(key);
}

async function removeSecureItem(key: string) {
  const encryptedStorage = getEncryptedStorage();

  if (encryptedStorage) {
    try {
      await encryptedStorage.removeItem?.(key);
    } catch {
      // Fall back to AsyncStorage below.
    }
  }

  await AsyncStorage.removeItem(key);
}

function decodeJwtPayload(token: string) {
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

