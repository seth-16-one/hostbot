import { StatusBar } from "expo-status-bar";

type Props = {
  light?: boolean;
};

export default function AppStatusBar({ light = false }: Props) {
  return <StatusBar style="auto" />;
}
