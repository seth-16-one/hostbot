import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";

type PromoCardProps = {
  title: string;
  description: string;
  image: string;
  action: string;
  link: string;
};

export default function PromoCard({
  title,
  description,
  image,
  action,
  link,
}: PromoCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ImageBackground
      source={{ uri: image }}
      imageStyle={styles.image}
      style={styles.card}
    >
      <View style={styles.overlay}>
        <View>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.description}>{description}</Text>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => router.push(link as any)}
        >
          <Text style={styles.buttonText}>{action}</Text>

          <Ionicons name="arrow-forward" size={16} color={theme.colors.white} />
        </Pressable>
      </View>
    </ImageBackground>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    card: {
      width: 280,
      height: 170,
      marginRight: 14,
    },

    image: {
      borderRadius: 22,
    },

    overlay: {
      flex: 1,

      borderRadius: 22,

      padding: 20,

      justifyContent: "space-between",

      backgroundColor: theme.colors.overlay,
    },

    title: {
      color: theme.colors.white,

      fontSize: 22,

      fontWeight: "800",
    },

    description: {
      marginTop: 8,

      color: theme.colors.white,

      fontSize: 14,

      lineHeight: 21,
    },

    button: {
      flexDirection: "row",

      alignItems: "center",

      alignSelf: "flex-start",

      gap: 6,

      backgroundColor: "rgba(255,255,255,0.15)",

      paddingHorizontal: 14,

      paddingVertical: 10,

      borderRadius: 14,
    },

    buttonText: {
      color: theme.colors.white,

      fontWeight: "800",

      fontSize: 14,
    },
  });
}
