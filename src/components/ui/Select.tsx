import { COLORS } from "@/constants";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export default function Select({ label, value, onChange, options }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={{ color: COLORS.text }}
        >
          {options.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },

  pickerWrapper: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    overflow: "hidden",
  },

  label: {
    marginBottom: 6,
    color: COLORS.muted,
    fontWeight: "500",
  },
});
