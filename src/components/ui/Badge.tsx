import { Text, View } from "react-native";

export default function Badge({ text, color }: any) {
  return (
    <View
      style={{
        backgroundColor: color,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "600",
        }}
      >
        {text}
      </Text>
    </View>
  );
}
