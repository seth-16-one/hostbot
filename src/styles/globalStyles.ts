import { SHADOWS } from "@/constants";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,

    ...SHADOWS.lg,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,

    elevation: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
});
