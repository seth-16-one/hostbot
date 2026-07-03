import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    paddingHorizontal: 22,
    gap: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  fullWidth: {
    width: "100%",
  },

  small: {
    height: 46,
  },

  medium: {
    height: 50,
  },

  large: {
    height: 62,
  },

  outline: {
    borderWidth: 1.5,
  },

  disabled: {
    opacity: 0.55,
  },

  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },

  text: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
