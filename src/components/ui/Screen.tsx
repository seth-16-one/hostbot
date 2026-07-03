import { useTheme } from "@/theme";
import { ReactNode } from "react";
import { ScrollView } from "react-native";

type Props = {
  children: ReactNode;
  backgroundColor?: string;
};

export default function Screen({ children, backgroundColor }: Props) {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: backgroundColor ?? theme.colors.background,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}
