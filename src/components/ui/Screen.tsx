import { COLORS } from "@/constants";
import { ScrollView } from "react-native";

export default function Screen({ children }: any) {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}
