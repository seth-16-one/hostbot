import {
  REQUEST_RETRIES,
  REQUEST_TIMEOUT_MS,
  requireApiUrl,
} from "@/config/env";
import { tokenService } from "@/services/auth/token.service";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  auth?: boolean;
  retry?: boolean;
  timeoutMs?: number;
}

export class ApiError extends Error {
  status: number;
  payload?: unknown;
  code:
    | "NETWORK_ERROR"
    | "TIMEOUT"
    | "UNAUTHORIZED"
    | "SERVER_ERROR"
    | "VALIDATION_ERROR";

  constructor(
    message: string,
    status: number,
    code: ApiError["code"] = "SERVER_ERROR",
    payload?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

function getFriendlyMessage(status: number, payload: any) {
  if (status === 0) return "Unable to connect. Check your internet connection.";
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 408) return "The request timed out. Please try again.";
  if (status === 400) return payload?.message || payload?.error?.message || "Please check your input and try again.";
  if (status === 404) return "The requested item could not be found.";
  if (status >= 500)
    return "The server is unavailable. Please try again later.";
  if (payload?.message) return payload.message;
  return "Request failed. Please try again.";
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json().catch(() => undefined);
  }

  const text = await response.text().catch(() => "");
  return text ? { message: text } : undefined;
}

async function refreshAccessToken() {
  const refreshToken = await tokenService.getRefreshToken();
  if (!refreshToken) return null;

  const response = await rawRequest<{
    accessToken: string;
    refreshToken: string;
  }>("POST", "/auth/refresh", { refreshToken }, { auth: false, retry: false });

  await tokenService.saveTokens(response.data);
  return response.data.accessToken;
}

async function rawRequest<T>(
  method: HttpMethod,
  path: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const baseUrl = requireApiUrl();
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? REQUEST_TIMEOUT_MS,
  );

  try {
    const accessToken =
      options.auth === false ? null : await tokenService.getAccessToken();
    const response = await fetch(`${baseUrl}${path}`, {
      method,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const payload = await parseResponse(response);

    if (!response.ok) {
      throw new ApiError(
        getFriendlyMessage(response.status, payload),
        response.status,
        response.status === 401 ? "UNAUTHORIZED" : "SERVER_ERROR",
        payload,
      );
    }

    return {
      data: payload as T,
      message: payload?.message,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    const isTimeout = (error as Error).name === "AbortError";
    throw new ApiError(
      isTimeout
        ? "The request timed out. Please try again."
        : "Unable to connect. Check your internet connection.",
      isTimeout ? 408 : 0,
      isTimeout ? "TIMEOUT" : "NETWORK_ERROR",
    );
  } finally {
    clearTimeout(timeout);
  }
}

async function request<T>(
  method: HttpMethod,
  path: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const attempts = options.retry === false ? 0 : REQUEST_RETRIES;

  for (let attempt = 0; attempt <= attempts; attempt += 1) {
    try {
      return await rawRequest<T>(method, path, body, options);
    } catch (error) {
      const apiError = error as ApiError;

      if (apiError.status === 401 && options.auth !== false && attempt === 0) {
        const refreshed = await refreshAccessToken().catch(() => null);
        if (refreshed) continue;
      }

      if (
        attempt < attempts &&
        (apiError.code === "NETWORK_ERROR" || apiError.code === "TIMEOUT")
      ) {
        continue;
      }

      throw apiError;
    }
  }

  throw new ApiError("Request failed. Please try again.", 0);
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>("GET", path, undefined, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, body, options),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PUT", path, body, options),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", path, body, options),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, undefined, options),
};
