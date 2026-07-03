import Button from "@/components/ui/Button";

type Props = {
  disabled: boolean;
  loading?: boolean;
  onPress: () => void;
};

export default function OtpResend({
  disabled,
  loading = false,
  onPress,
}: Props) {
  return (
    <Button
      title="Resend Code"
      variant="outline"
      disabled={disabled}
      loading={loading}
      onPress={onPress}
    />
  );
}
