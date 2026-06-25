import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",

    borderRadius: 16,

    padding: 16,

    marginBottom: 18,
  },

  iconContainer: {
    marginRight: 14,
    marginTop: 2,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
  },

  message: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
  },

  closeButton: {
    marginLeft: 12,
    padding: 2,
  },
});
