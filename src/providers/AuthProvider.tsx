import { useAuthStore } from "@/store/auth";
import { router, useRootNavigationState, useSegments } from "expo-router";
import { useEffect, useRef } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const hasCheckedSession = useAuthStore((state) => state.hasCheckedSession);
  const loadSession = useAuthStore((state) => state.loadSession);
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      loadSession();
    }
  }, [loadSession]);

  useEffect(() => {
    if (!rootNavigationState?.key || !hasCheckedSession || isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/login" as any);
      return;
    }

    if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)/dashboard" as any);
    }
  }, [
    hasCheckedSession,
    isAuthenticated,
    isLoading,
    rootNavigationState?.key,
    segments,
  ]);

  if (!hasCheckedSession) {
    return null;
  }

  return <>{children}</>;
}
