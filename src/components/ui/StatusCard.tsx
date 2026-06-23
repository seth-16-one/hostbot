import StatusBanner, { type StatusTone } from "./StatusBanner";

export default function StatusCard(props: {
  type?: StatusTone;
  title: string;
  message?: string;
}) {
  return <StatusBanner {...props} />;
}
