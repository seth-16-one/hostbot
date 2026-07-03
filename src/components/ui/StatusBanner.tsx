import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export type StatusTone = "success" | "warning" | "error" | "info";

type Props = {
  type?: StatusTone;
  title: string;
  message?: string;
};

export default function StatusBanner({ type = "info", title, message }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const tone = {
    success: {
      icon: "checkmark-circle",
      background: theme.colors.successLight,
      color: theme.colors.success,
    },
    warning: {
      icon: "warning",
      background: theme.colors.warningLight,
      color: theme.colors.warning,
    },
    error: {
      icon: "close-circle",
      background: theme.colors.dangerLight,
      color: theme.colors.danger,
    },
    info: {
      icon: "information-circle",
      background: theme.colors.infoLight,
      color: theme.colors.info,
    },
  } as const;

  const item = tone[type];

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: item.background,
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: theme.colors.card,
          },
        ]}
      >
        <Ionicons name={item.icon as any} size={22} color={item.color} />
      </View>

      <View style={styles.copy}>
        <Text
          style={[
            styles.title,
            {
              color: item.color,
            },
          ]}
        >
          {title}
        </Text>

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    banner: {
      flexDirection: "row",
      alignItems: "center",

      marginHorizontal: 20,
      marginBottom: 18,

      padding: 16,

      borderRadius: 18,

      borderWidth: 1,
      borderColor: theme.colors.border,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 2,
    },

    iconContainer: {
      width: 42,
      height: 42,

      borderRadius: 14,

      justifyContent: "center",
      alignItems: "center",

      marginRight: 14,
    },

    copy: {
      flex: 1,
    },

    title: {
      fontSize: 15,
      fontWeight: "800",
    },

    message: {
      marginTop: 4,

      color: theme.colors.secondaryText,

      fontSize: 13,
      lineHeight: 20,
    },
  });
}
