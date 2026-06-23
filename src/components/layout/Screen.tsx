import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  children: ReactNode;
  backgroundColor?: string;
};

export default function Screen({ children, backgroundColor }: ScreenProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor,
      }}
      edges={["top"]}
    >
      {children}
    </SafeAreaView>
  );
}
