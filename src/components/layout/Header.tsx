import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "./SearchBar";

type HeaderProps = {
  name?: string;
  subtitle: string;
  showProfile?: boolean;
  showName?: boolean;
  showSearch?: boolean;
};

export default function Header({
  name,
  subtitle,
  showProfile = false,
  showName = false,
  showSearch = false,
}: HeaderProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const styles = createStyles(theme);

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  const now = new Date();

  const currentTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentDate = now.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top + -20,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <View style={styles.brandContainer}>
            <Text style={styles.brandText}>HB</Text>
          </View>

          <View>
            <Text style={styles.appName}>Host Bot</Text>

            <Text style={styles.appTag}>WhatsApp Hosting</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/notifications",
              } as any)
            }
          >
            <View style={styles.notificationContainer}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={theme.colors.white}
              />

              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </Pressable>

          {showProfile && (
            <Pressable
              style={styles.profileButton}
              onPress={() => router.push("/profile")}
            >
              <Ionicons
                name="person-circle"
                size={50}
                color={theme.colors.white}
              />
            </Pressable>
          )}
        </View>
      </View>

      <Text style={styles.greeting}>{greeting}</Text>

      {showName && <Text style={styles.userName}>{name}</Text>}

      <Text style={styles.timeText}>
        {currentDate} • {currentTime}
      </Text>

      <Text style={styles.subtitle}>{subtitle}</Text>

      {showSearch && (
        <View style={styles.searchWrapper}>
          <SearchBar placeholder="Search Bots..." />
        </View>
      )}
    </View>
  );
}

function createStyles(theme: any) {
  return StyleSheet.create({
    header: {
      backgroundColor: theme.colors.primary,

      paddingHorizontal: 24,
      paddingBottom: 14,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },

    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },

    brandRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    brandContainer: {
      width: 50,
      height: 50,
      borderRadius: 14,

      backgroundColor: "rgba(255,255,255,0.15)",

      justifyContent: "center",
      alignItems: "center",
    },

    brandText: {
      color: theme.colors.white,
      fontSize: 22,
      fontWeight: "800",
      letterSpacing: 1,
    },

    appName: {
      color: theme.colors.white,
      fontSize: 18,
      fontWeight: "700",
    },

    appTag: {
      color: "rgba(255,255,255,0.82)",
      fontSize: 12,
    },

    actionsRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },

    notificationContainer: {
      position: "relative",
    },

    badge: {
      position: "absolute",

      top: -5,
      right: -5,

      width: 18,
      height: 18,

      borderRadius: 9,

      backgroundColor: theme.colors.danger,

      justifyContent: "center",
      alignItems: "center",
    },

    badgeText: {
      color: theme.colors.white,
      fontSize: 10,
      fontWeight: "700",
    },

    profileButton: {
      borderRadius: 25,
    },

    greeting: {
      color: theme.colors.white,
      fontSize: 18,
      fontWeight: "600",
    },

    userName: {
      color: theme.colors.white,
      fontSize: 32,
      fontWeight: "700",
      marginTop: 2,
    },

    timeText: {
      color: "rgba(255,255,255,0.85)",
      fontSize: 13,
      marginTop: 4,
    },

    subtitle: {
      color: theme.colors.white,
      fontSize: 15,
      marginTop: 8,
      lineHeight: 22,
    },

    searchWrapper: {
      marginTop: 16,
    },
  });
}
