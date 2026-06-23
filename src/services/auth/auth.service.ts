import { apiClient } from "@/services/api/client";
import type { AuthUser } from "@/store/auth";

export interface AuthSession {
  user: AuthUser;
  token: string;
}

export const authService = {
  async register(input: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthSession> {
    const response = await apiClient.post<AuthSession>("/auth/register", input);
    return response.data;
  },

  async login(input: {
    email: string;
    password: string;
  }): Promise<AuthSession> {
    const response = await apiClient.post<AuthSession>("/auth/login", input);
    return response.data;
  },

  async me(): Promise<AuthUser> {
    const response = await apiClient.get<{ user: AuthUser }>("/auth/me");
    return response.data.user;
  },

  async logout(): Promise<void> {
    await apiClient.post<{ success: boolean }>("/auth/logout");
  },
};
