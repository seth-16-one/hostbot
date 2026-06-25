import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
  },

  required: {
    marginLeft: 4,
    color: "#ef4444",
    fontWeight: "700",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    minHeight: 56,
    paddingHorizontal: 16,
  },

  leftIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 16,
  },

  rightButton: {
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  message: {
    fontSize: 13,
    marginTop: 6,
    fontWeight: "500",
  },
});
