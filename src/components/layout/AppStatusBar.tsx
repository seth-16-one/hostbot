import { useTheme } from "@/theme";
import { StatusBar } from "expo-status-bar";

type Props = {
  light?: boolean;
};

export default function AppStatusBar({ light = false }: Props) {
  const { theme } = useTheme();

  return <StatusBar style={light ? "light" : theme.dark ? "light" : "dark"} />;
}
