import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  seconds?: number;
  onResend: () => Promise<void> | void;
};

export default function OtpTimer({ seconds = 60, onResend }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [timeLeft, setTimeLeft] = useState(seconds);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secondsText = String(timeLeft % 60).padStart(2, "0");

  async function handleResend() {
    if (loading) return;

    try {
      setLoading(true);

      await onResend();

      setTimeLeft(seconds);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.footer}>
      <Text style={styles.label}>Didn't receive the code?</Text>

      {timeLeft > 0 ? (
        <Text style={styles.timer}>
          Resend in {minutes}:{secondsText}
        </Text>
      ) : (
        <Pressable disabled={loading} onPress={handleResend}>
          <Text style={styles.resend}>
            {loading ? "Sending..." : "Resend Code"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    footer: {
      marginTop: 24,
      alignItems: "center",
    },

    label: {
      color: theme.colors.muted,
      fontSize: 14,
      textAlign: "center",
    },

    timer: {
      marginTop: 16,
      color: theme.colors.secondaryText,
      fontSize: 14,
      fontWeight: "600",
    },

    resend: {
      marginTop: 16,
      color: theme.colors.primary,
      fontSize: 15,
      fontWeight: "700",
    },
  });
}
