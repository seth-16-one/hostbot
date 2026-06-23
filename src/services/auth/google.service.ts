import {
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID,
} from "@/config/env";
import { authService } from "@/services/auth/auth.service";
import * as AuthSession from "expo-auth-session";

export const googleService = {
  isAvailable() {
    return Boolean(
      GOOGLE_WEB_CLIENT_ID || GOOGLE_IOS_CLIENT_ID || GOOGLE_ANDROID_CLIENT_ID,
    );
  },

  async login() {
    if (!this.isAvailable()) {
      throw new Error("Google login is not configured");
    }

    const discovery = {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
    };

    const redirectUri = AuthSession.makeRedirectUri();
    const request = new AuthSession.AuthRequest({
      clientId:
        GOOGLE_WEB_CLIENT_ID || GOOGLE_IOS_CLIENT_ID || GOOGLE_ANDROID_CLIENT_ID,
      scopes: ["openid", "profile", "email"],
      redirectUri,
      responseType: AuthSession.ResponseType.IdToken,
    });

    const result = await request.promptAsync(discovery);

    if (result.type !== "success" || !result.params.id_token) {
      throw new Error("Google login was cancelled");
    }

    return authService.googleLogin(result.params.id_token);
  },
};
