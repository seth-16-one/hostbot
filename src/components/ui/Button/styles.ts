import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 16,

    paddingHorizontal: 20,

    gap: 10,
  },

  fullWidth: {
    width: "100%",
  },

  small: {
    height: 44,
  },

  medium: {
    height: 56,
  },

  large: {
    height: 64,
  },

  outline: {
    borderWidth: 1.5,
  },

  disabled: {
    opacity: 0.6,
  },

  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },

  text: {
    fontSize: 16,
    fontWeight: "700",
  },

  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
});
