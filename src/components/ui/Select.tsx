import { useTheme } from "@/theme";
import type { AppTheme } from "@/theme/light";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
};

export default function Select({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.pickerWrapper, disabled && styles.disabled]}>
        <Picker
          enabled={!disabled}
          selectedValue={value}
          onValueChange={onChange}
          dropdownIconColor={theme.colors.text}
          style={styles.picker}
        >
          <Picker.Item label={`Select ${label}`} value="" />

          {options.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      marginBottom: 16,
    },

    label: {
      marginBottom: 8,

      color: theme.colors.secondaryText,

      fontSize: 14,
      fontWeight: "600",
    },

    pickerWrapper: {
      backgroundColor: theme.colors.card,

      borderWidth: 1,
      borderColor: theme.colors.border,

      borderRadius: 16,

      overflow: "hidden",

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 2,
      },

      elevation: 2,
    },

    picker: {
      color: theme.colors.text,
    },

    disabled: {
      opacity: 0.55,
    },
  });
}
