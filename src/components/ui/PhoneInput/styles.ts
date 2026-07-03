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

  countrySection: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },

  plus: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 2,
  },

  countryInput: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  divider: {
    width: 1,
    height: 26,
    marginHorizontal: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 17,
  },
});
