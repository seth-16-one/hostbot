import { useAuthStore } from "@/store/auth";
import { router, useRootNavigationState, useSegments } from "expo-router";
import { useEffect, useRef } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const loadSession = useAuthStore((state) => state.loadSession);
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      loadSession();
    }
  }, [loadSession]);

  useEffect(() => {
    if (!rootNavigationState?.key || isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/login" as any);
      return;
    }

    if (isAuthenticated && inAuthGroup) {
      router.replace("/dashboard" as any);
    }
  }, [isAuthenticated, isLoading, rootNavigationState?.key, segments]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
