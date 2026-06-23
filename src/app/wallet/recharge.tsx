import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button, StatusModal } from "@/components/ui";
import { COLORS } from "@/constants";
import { useWalletStore } from "@/store/wallet";
import type { PaymentMethod, RechargePackage } from "@/types/wallet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const methods: { id: PaymentMethod; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: "mpesa", label: "M-Pesa", icon: "phone-portrait-outline" },
  { id: "card", label: "Card", icon: "card-outline" },
  { id: "paypal", label: "PayPal", icon: "logo-paypal" },
];

export default function RechargeScreen() {
  const { packages, createRecharge, verifyPayment } = useWalletStore();
  const [selected, setSelected] = useState<RechargePackage>(packages[0]);
  const [method, setMethod] = useState<PaymentMethod>("mpesa");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const processPayment = async () => {
    setLoading(true);
    try {
      const session = await createRecharge(selected.id, method);
      await verifyPayment(session);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Recharge Credits" subtitle="Select package and payment" showBack />
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Select Package</Text>
          {packages.map((item) => (
            <Pressable
              key={item.id}
              style={[styles.card, selected.id === item.id && styles.selected]}
              onPress={() => setSelected(item)}
            >
              <Text style={styles.cardTitle}>{item.credits + (item.bonusCredits ?? 0)} Credits</Text>
              <Text style={styles.meta}>{item.currency} {item.price}</Text>
            </Pressable>
          ))}
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.methods}>
            {methods.map((item) => (
              <Pressable
                key={item.id}
                style={[styles.method, method === item.id && styles.selected]}
                onPress={() => setMethod(item.id)}
              >
                <Ionicons name={item.icon} size={22} color={COLORS.primary} />
                <Text style={styles.methodText}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Button title="Pay and Recharge" loading={loading} onPress={processPayment} />
        <StatusModal
          visible={success}
          type="success"
          title="Recharge Successful"
          message="Credits have been added to your wallet."
          primaryText="View Wallet"
          onPrimaryPress={() => {
            setSuccess(false);
            router.replace("/wallet" as any);
          }}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  sectionTitle: { color: COLORS.text, fontSize: 17, fontWeight: "700", marginBottom: 12, marginTop: 8 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    padding: 16,
  },
  selected: { borderColor: COLORS.primary, backgroundColor: COLORS.successLight },
  cardTitle: { color: COLORS.text, fontSize: 18, fontWeight: "800" },
  meta: { color: COLORS.muted, marginTop: 4 },
  methods: { flexDirection: "row", gap: 10 },
  method: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    alignItems: "center",
  },
  methodText: { color: COLORS.text, fontWeight: "700", marginTop: 6 },
});
