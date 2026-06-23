import { COLORS } from "@/constants";
import { View } from "react-native";

export default function Card({ children, style }: any) {
  return (
    <View
      style={[
        {
          backgroundColor: COLORS.card,
          borderRadius: 18,
          padding: 18,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
