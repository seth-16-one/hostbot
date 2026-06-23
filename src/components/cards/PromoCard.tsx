import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

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

          <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    height: 170,
    marginRight: 14,
  },

  image: {
    borderRadius: 20,
  },

  overlay: {
    flex: 1,
    borderRadius: 20,
    padding: 18,
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "700",
  },

  description: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
  },
});
