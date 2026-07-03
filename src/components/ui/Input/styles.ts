import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 2,
  },

  required: {
    marginLeft: 4,
    color: "#ef4444",
    fontWeight: "700",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 18,
    minHeight: 58,
    paddingHorizontal: 18,
  },

  leftIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 17,
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
