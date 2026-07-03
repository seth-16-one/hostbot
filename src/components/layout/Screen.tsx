import { useTheme } from "@/theme";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  children: ReactNode;
  backgroundColor?: string;
};

export default function Screen({ children, backgroundColor }: ScreenProps) {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: backgroundColor ?? theme.colors.background,
      }}
      edges={["top"]}
    >
      {children}
    </SafeAreaView>
  );
}
