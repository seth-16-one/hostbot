import { authService, type RegisterInput } from "@/services/auth/auth.service";
import { tokenService } from "@/services/auth/token.service";
import { create } from "zustand";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  username?: string;
  email: string;
  phone?: string;

  credits?: number;
  avatar?: string;
  role?: string;

  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthStore {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCheckedSession: boolean;
  error: string | null;
  login: (input: { email: string; password: string }) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  googleLogin: (session: {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  loadSession: () => Promise<void>;
  setSession: (
    user: AuthUser,
    accessToken: string,
    refreshToken: string,
  ) => Promise<void>;
  clearSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  hasCheckedSession: false,
  error: null,

  setSession: async (user, accessToken, refreshToken) => {
    await tokenService.saveTokens({ accessToken, refreshToken });
    set({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isLoading: false,
      hasCheckedSession: true,
      error: null,
    });
  },

  clearSession: async () => {
    await tokenService.clearTokens();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      hasCheckedSession: true,
      error: null,
    });
  },

  login: async (input) => {
    set({ isLoading: true, error: null });
    try {
      const session = await authService.login(input);
      await get().setSession(
        session.user,
        session.accessToken,
        session.refreshToken,
      );
    } catch (error) {
      set({
        isLoading: false,
        hasCheckedSession: true,
        error: (error as Error).message,
      });
      throw error;
    }
  },

  register: async (input) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      await authService.register(input);

      set({
        isLoading: false,
        hasCheckedSession: true,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        hasCheckedSession: true,
        error: (error as Error).message,
      });

      throw error;
    }
  },

  googleLogin: async (session) => {
    await get().setSession(
      session.user,
      session.accessToken,
      session.refreshToken,
    );
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } finally {
      await get().clearSession();
    }
  },

  refreshSession: async () => {
    const refreshToken = await tokenService.getRefreshToken();
    if (!refreshToken) {
      await get().clearSession();
      return;
    }

    const session = await authService.refresh(refreshToken);
    await get().setSession(
      session.user,
      session.accessToken,
      session.refreshToken,
    );
  },

  loadSession: async () => {
    set({ isLoading: true, error: null });

    try {
      const accessToken = await tokenService.getAccessToken();
      const refreshToken = await tokenService.getRefreshToken();

      if (!accessToken || !refreshToken) {
        await get().clearSession();
        return;
      }

      if (tokenService.isTokenExpired(accessToken)) {
        await get().refreshSession();
        return;
      }
      const user = await authService.me();

      set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
        hasCheckedSession: true,
        error: null,
      });
    } catch (error) {

      try {
        await get().refreshSession();
      } catch (refreshError) {
        await get().clearSession();
      }
    }
  },
}));


