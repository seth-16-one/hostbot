import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type SearchBarProps = {
  placeholder: string;
};

export default function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color="COLORS.tabInactive" />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="COLORS.tabInactive"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,

    height: 55,

    borderRadius: 16,

    paddingHorizontal: 16,

    flexDirection: "row",

    alignItems: "center",

    elevation: 5,
  },

  input: {
    flex: 1,

    marginLeft: 10,

    fontSize: 16,
  },
});
