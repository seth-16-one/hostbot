import { useAuthStore } from "@/store/auth";
import Constants from "expo-constants";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export class ApiError extends Error {
  status: number;
  payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

const extra = Constants.expoConfig?.extra as { apiBaseUrl?: string } | undefined;
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? extra?.apiBaseUrl ?? "";

async function request<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  body?: unknown,
): Promise<ApiResponse<T>> {
  if (!API_BASE_URL) {
    throw new ApiError("API base URL is not configured", 500);
  }

  const token = useAuthStore.getState().token;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => undefined);

  if (!response.ok) {
    throw new ApiError(
      payload?.message ?? "Request failed",
      response.status,
      payload,
    );
  }

  return {
    data: payload as T,
    message: payload?.message,
    status: response.status,
  };
}

export const apiClient = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};
