import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button, StatusModal } from "@/components/ui";
import Input from "@/components/ui/Input";
import { COLORS } from "@/constants";
import { useWalletStore } from "@/store/wallet";
import type { PaymentMethod } from "@/types/wallet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

type PaymentOption = {
  id: PaymentMethod;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  recommended?: boolean;
};

const methods: PaymentOption[] = [
  {
    id: "mpesa",
    label: "M-Pesa",
    icon: "phone-portrait-outline",
    recommended: true,
  },
  {
    id: "card",
    label: "Card",
    icon: "card-outline",
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: "logo-paypal",
  },
];

export default function RechargeScreen() {
  const { packages, createRecharge, verifyPayment } = useWalletStore();

  const [selectedPackage, setSelectedPackage] = useState(packages[1]);

  const [customAmount, setCustomAmount] = useState("");

  const [promoCode, setPromoCode] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [useCustomAmount, setUseCustomAmount] = useState(false);

  const [method, setMethod] = useState<PaymentMethod>("mpesa");

  const [paymentSheetVisible, setPaymentSheetVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const processPayment = async () => {
    try {
      setLoading(true);

      const payload = useCustomAmount
        ? {
            amount: Number(customAmount),
            method,
            phoneNumber,
            promoCode,
          }
        : {
            packageId: selectedPackage.id,
            method,
            phoneNumber,
            promoCode,
          };

      const session = await createRecharge(payload);

      await verifyPayment(session);

      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PageHeader
          title="Recharge Wallet"
          subtitle="Buy credits instantly"
          showBack
        />

        <View style={styles.content}>
          <View style={styles.heroCard}>
            <Ionicons name="wallet" size={36} color={COLORS.white} />

            <Text style={styles.heroTitle}>Recharge your Wallet</Text>

            <Text style={styles.heroSubtitle}>
              Instant top-up with bonuses and promo rewards.
            </Text>
          </View>

          <Text style={styles.title}>Choose Credit Package</Text>

          {packages.map((pkg) => (
            <Pressable
              key={pkg.id}
              style={[
                styles.package,
                selectedPackage.id === pkg.id && styles.selected,
              ]}
              onPress={() => setSelectedPackage(pkg)}
            >
              <View>
                <Text style={styles.packageCredits}>{pkg.credits} Credits</Text>

                {pkg.bonusCredits ? (
                  <Text style={styles.bonus}>
                    +{pkg.bonusCredits} Bonus Credits
                  </Text>
                ) : null}
              </View>

              <Text style={styles.price}>
                {pkg.currency} {pkg.price}
              </Text>
            </Pressable>
          ))}

          <Pressable
            style={styles.customToggle}
            onPress={() => setUseCustomAmount(!useCustomAmount)}
          >
            <Text style={styles.customTitle}>Recharge Custom Amount</Text>

            <Switch
              value={useCustomAmount}
              onValueChange={setUseCustomAmount}
              trackColor={{
                false: COLORS.border,
                true: COLORS.primary,
              }}
            />
          </Pressable>

          {useCustomAmount && (
            <>
              <Input
                label="Recharge Amount"
                placeholder="Minimum KES 100"
                keyboardType="numeric"
                value={customAmount}
                onChangeText={setCustomAmount}
                leftIcon="cash-outline"
              />

              <Input
                label="Promo Code"
                placeholder="Enter promo code"
                value={promoCode}
                onChangeText={setPromoCode}
                leftIcon="gift-outline"
                rightIcon="pricetag-outline"
              />
            </>
          )}

          <Text style={styles.title}>Payment Method</Text>

          {methods.map((item) => (
            <Pressable
              key={item.id}
              style={[styles.method, method === item.id && styles.selected]}
              onPress={() => setMethod(item.id as PaymentMethod)}
            >
              <View style={styles.methodLeft}>
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={COLORS.primary}
                />

                <Text style={styles.methodText}>{item.label}</Text>
              </View>

              {item.recommended && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Recommended</Text>
                </View>
              )}
            </Pressable>
          ))}

          {method === "mpesa" && (
            <Input
              label="M-Pesa Number"
              placeholder="2547XXXXXXXX"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              leftIcon="call-outline"
            />
          )}

          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Payment Summary</Text>

            <View style={styles.row}>
              <Text>Credits</Text>

              <Text>
                {useCustomAmount
                  ? customAmount || "0"
                  : selectedPackage.credits +
                    (selectedPackage.bonusCredits ?? 0)}
              </Text>
            </View>

            <View style={styles.row}>
              <Text>Amount</Text>

              <Text>
                {useCustomAmount
                  ? `KES ${customAmount || 0}`
                  : `${selectedPackage.currency} ${selectedPackage.price}`}
              </Text>
            </View>

            <View style={styles.row}>
              <Text>Method</Text>

              <Text>{method.toUpperCase()}</Text>
            </View>
          </View>

          <Button
            title={
              useCustomAmount
                ? `Continue • KES ${customAmount || 0}`
                : `Continue • ${selectedPackage.currency} ${selectedPackage.price}`
            }
            loading={loading}
            onPress={processPayment}
          />
        </View>

        <StatusModal
          visible={success}
          type="success"
          title="Payment Successful"
          message="Your wallet has been credited successfully."
          primaryText="Back to Wallet"
          onPrimaryPress={() => {
            setSuccess(false);
            router.replace("/wallet");
          }}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  heroCard: {
    backgroundColor: COLORS.primary,
    padding: 24,
    borderRadius: 24,
    marginBottom: 25,
  },

  heroTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.white,
    marginTop: 15,
  },

  heroSubtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "rgba(255,255,255,.85)",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    marginTop: 18,
    color: COLORS.text,
  },

  package: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.successLight,
  },

  packageCredits: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  customToggle: {
    marginTop: 18,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  customTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  bonus: {
    marginTop: 4,
    color: COLORS.success,
    fontWeight: "600",
  },

  price: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primary,
  },

  method: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  methodLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  methodText: {
    marginLeft: 10,
    fontWeight: "700",
    color: COLORS.text,
  },

  badge: {
    backgroundColor: COLORS.success,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  badgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },

  summary: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
  },

  summaryTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 14,
    color: COLORS.text,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
