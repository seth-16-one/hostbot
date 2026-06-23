import { apiClient } from "@/services/api/client";
import { tokenService, type TokenPair } from "@/services/auth/token.service";
import type { AuthUser } from "@/store/auth";

export interface AuthSession extends TokenPair {
  user: AuthUser;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export const authService = {
  async register(input: RegisterInput): Promise<AuthSession> {
    const response = await apiClient.post<AuthSession>("/auth/register", input, {
      auth: false,
    });
    await tokenService.saveTokens(response.data);
    return response.data;
  },

  async login(input: {
    email: string;
    password: string;
  }): Promise<AuthSession> {
    const response = await apiClient.post<AuthSession>("/auth/login", input, {
      auth: false,
    });
    await tokenService.saveTokens(response.data);
    return response.data;
  },

  async googleLogin(idToken: string): Promise<AuthSession> {
    const response = await apiClient.post<AuthSession>(
      "/auth/google",
      { idToken },
      { auth: false },
    );
    await tokenService.saveTokens(response.data);
    return response.data;
  },

  async me(): Promise<AuthUser> {
    const response = await apiClient.get<{ user: AuthUser }>("/auth/me");
    return response.data.user;
  },

  async refresh(refreshToken: string): Promise<AuthSession> {
    const response = await apiClient.post<AuthSession>(
      "/auth/refresh",
      { refreshToken },
      { auth: false, retry: false },
    );
    await tokenService.saveTokens(response.data);
    return response.data;
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post<{ success: boolean }>(
      "/auth/forgot-password",
      { email },
      { auth: false },
    );
  },

  async resetPassword(input: {
    token: string;
    password: string;
  }): Promise<void> {
    await apiClient.post<{ success: boolean }>("/auth/reset-password", input, {
      auth: false,
    });
  },

  async verifyEmail(token: string): Promise<void> {
    await apiClient.post<{ success: boolean }>(
      "/auth/verify-email",
      { token },
      { auth: false },
    );
  },

  async resendVerification(email: string): Promise<void> {
    await apiClient.post<{ success: boolean }>(
      "/auth/resend-verification",
      { email },
      { auth: false },
    );
  },

  async logout(): Promise<void> {
    const refreshToken = await tokenService.getRefreshToken();
    await apiClient.post<{ success: boolean }>("/auth/logout", { refreshToken });
    await tokenService.clearTokens();
  },
};
