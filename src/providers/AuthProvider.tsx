import { useAuthStore } from "@/store/auth";
import { router, useRootNavigationState, useSegments } from "expo-router";
import { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
  const token = useAuthStore((state) => state.token);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (!rootNavigationState?.key || !hydrated) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";

    if (!token && !inAuthGroup) {
      router.replace("/login" as any);
      return;
    }

    if (token && inAuthGroup) {
      router.replace("/dashboard" as any);
    }
  }, [hydrated, rootNavigationState?.key, segments, token]);

  if (!hydrated) {
    return null;
  }

  return <>{children}</>;
}
