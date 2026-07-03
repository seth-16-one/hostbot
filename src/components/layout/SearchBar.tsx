import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type SearchBarProps = {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function SearchBar({
  placeholder,
  value,
  onChangeText,
}: SearchBarProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={20}
        color={theme.colors.iconLight}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.iconLight}
        selectionColor={theme.colors.primary}
        cursorColor={theme.colors.primary}
        style={styles.input}
      />
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      height: 56,

      flexDirection: "row",
      alignItems: "center",

      paddingHorizontal: 16,

      borderRadius: 16,

      backgroundColor: theme.colors.card,

      borderWidth: 1,
      borderColor: theme.colors.border,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 4,
      },

      elevation: 3,
    },

    input: {
      flex: 1,
      marginLeft: 10,

      color: theme.colors.text,

      fontSize: 16,
      fontWeight: "500",
    },
  });
}
