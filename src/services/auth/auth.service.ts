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
  async register(input: RegisterInput) {
    const response = await apiClient.post("/auth/register", input, {
      auth: false,
    });

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

  async resendPasswordOtp(email: string): Promise<void> {
    await apiClient.post(
      "/auth/resend-password-otp",
      { email },
      {
        auth: false,
      },
    );
  },

  async resetPassword(input: {
    email: string;
    otp: string;
    password: string;
  }): Promise<void> {
    await apiClient.post<{ success: boolean }>("/auth/reset-password", input, {
      auth: false,
    });
  },

  async verifyEmailOtp(input: { email: string; otp: string }): Promise<void> {
    await apiClient.post("/auth/verify-email-otp", input, {
      auth: false,
    });
  },

  async verifyPasswordOtp(input: {
    email: string;
    otp: string;
  }): Promise<void> {
    await apiClient.post("/auth/verify-password-otp", input, {
      auth: false,
    });
  },

  async resendVerification(email: string): Promise<void> {
    await apiClient.post(
      "/auth/resend-verification",
      { email },
      { auth: false },
    );
  },

  async logout(): Promise<void> {
    const refreshToken = await tokenService.getRefreshToken();
    await apiClient.post<{ success: boolean }>("/auth/logout", {
      refreshToken,
    });
    await tokenService.clearTokens();
  },
};
