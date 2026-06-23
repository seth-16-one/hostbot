import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import StatusModal from "@/components/ui/StatusModal";
import { COLORS } from "@/constants";
import { useToast } from "@/context/ToastContext";
import { bots } from "@/data";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function PairScreen() {
  const { id } = useLocalSearchParams();
  const { showToast } = useToast();

  const bot = bots.marketplace.find((item) => item.id === Number(id));

  if (!bot) {
    return (
      <View style={styles.center}>
        <Text>Bot not found</Text>
      </View>
    );
  }

  const [pairCode] = useState(
    Math.random().toString(36).substring(2, 10).toUpperCase(),
  );

  const copyCode = async () => {
    await Clipboard.setStringAsync(pairCode);

    showToast("Pairing code copied", "success");
  };

  const sharePairCode = async () => {
    if (Platform.OS === "web") {
      await sharePairCode();
      return;
    }

    await Share.share({
      message: `Pairing Code: ${pairCode}`,
    });
  };

  const [status, setStatus] = useState<
    "pairing" | "failed" | "expired" | "online"
  >("pairing");

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showFailedModal, setShowFailedModal] = useState(false);

  const [showExpiredModal, setShowExpiredModal] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(300);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setStatus("expired");
      setShowExpiredModal(true);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Pair Device" subtitle="Connect your bot session" />

        {/* Session Card */}
        <View style={styles.sessionCard}>
          <View style={styles.iconCircle}>
            <Ionicons name={bot.icon as any} size={30} color={COLORS.success} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.botName}>{bot.name}</Text>

            <Text style={styles.botCategory}>{bot.category}</Text>

            <Text style={styles.sessionId}>
              {status === "pairing" && "Waiting For WhatsApp Connection"}
              {status === "online" && "Connected"}
              {status === "failed" && "Connection Failed"}
              {status === "expired" && "Session Expired"}
            </Text>
          </View>
        </View>

        {/* Deployment Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Deployment Information</Text>

          <InfoRow
            label="Minimum Credits"
            value={`${bot?.minimumCreditsRequired} Credits`}
          />

          <InfoRow
            label="Running Cost"
            value={`${bot?.runCreditsPerHour} Credits/hr`}
          />

          <InfoRow label="Status" value={status} />
        </View>

        {/* Pair Code */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pairing Code</Text>

          <Text style={styles.code}>{pairCode}</Text>

          <View style={styles.actions}>
            <Pressable style={styles.secondary} onPress={copyCode}>
              <Text style={styles.secondaryText}>Copy</Text>
            </Pressable>

            <Pressable style={styles.secondary} onPress={sharePairCode}>
              <Text style={styles.secondaryText}>Share</Text>
            </Pressable>
          </View>
          <Text style={styles.expiryText}>Code expires in {secondsLeft}s</Text>
        </View>

        {/* QR Code */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>QR Code</Text>

          <View style={styles.qrBox}>
            <QRCode value={pairCode} size={180} />

            <View style={{ marginTop: 14 }}>
              <Text style={styles.qrText}>Open WhatsApp</Text>

              <Text style={styles.qrText}>Linked Devices</Text>

              <Text style={styles.qrText}>Link With Phone Number</Text>

              <Text style={styles.qrText}>Enter the code above</Text>
            </View>
          </View>
        </View>

        {/* Status */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Connection Status</Text>

          <View style={styles.statusRow}>
            <View style={styles.statusDot} />

            <Text style={styles.waitingText}>
              {status === "pairing" && "Waiting For Pairing..."}

              {status === "failed" &&
                "Pairing Failed Clear Cached Session and Retry"}

              {status === "expired" && "Session Expired - Generate New Code"}

              {status === "online" && "Connected Successfully"}
            </Text>
          </View>
        </View>

        {/* Retry */}
        <Pressable
          style={styles.retryButton}
          onPress={() => {
            setStatus("pairing");

            setSecondsLeft(300);

            showToast("New pairing session started", "info");
          }}
        >
          <Text style={styles.retryText}>Retry Pairing</Text>
        </Pressable>

        {/* Clear Session */}
        <View style={styles.advancedCard}>
          <Text style={styles.advancedTitle}>Advanced Options</Text>

          <Pressable
            style={styles.clearButton}
            onPress={() => {
              setStatus("expired");

              showToast("Session cleared", "warning");
            }}
          >
            <Text style={styles.clearText}>Clear Cached Session</Text>

            <Text style={styles.clearSubtext}>
              Remove existing pairing data and start fresh
            </Text>
          </Pressable>

          <Pressable
            style={styles.retryButton}
            onPress={() => {
              setStatus("online");

              setShowSuccessModal(true);
            }}
          >
            <Text style={styles.retryText}>Simulate Success</Text>
          </Pressable>
        </View>

        {/* Modals */}
        <StatusModal
          visible={showSuccessModal}
          type="success"
          title="Bot Connected"
          message="Your WhatsApp bot is now online and ready to receive commands."
          primaryText="Manage Bot"
          onPrimaryPress={() => {
            setShowSuccessModal(false);

            router.replace(`/bots/manage/${id}` as any);
          }}
        />

        <StatusModal
          visible={showExpiredModal}
          type="warning"
          title="Session Expired"
          message="Your pairing code has expired. Generate a new code to continue."
          primaryText="Generate New Code"
          secondaryText="Close"
          onPrimaryPress={() => {
            setShowExpiredModal(false);

            setSecondsLeft(300);

            setStatus("pairing");
          }}
          onSecondaryPress={() => setShowExpiredModal(false)}
        />

        <StatusModal
          visible={showFailedModal}
          type="error"
          title="Pairing Failed"
          message="Unable to connect to WhatsApp. Please retry."
          primaryText="Retry"
          onPrimaryPress={() => {
            setShowFailedModal(false);

            setStatus("pairing");
          }}
        />
      </ScrollView>
    </Screen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <Text>{label}</Text>

      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  sessionCard: {
    backgroundColor: COLORS.white,
    margin: 16,
    padding: 18,
    borderRadius: 18,

    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 60,
    height: 60,

    borderRadius: 30,

    backgroundColor: "COLORS.successBg",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  botName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  botCategory: {
    marginTop: 3,
    color: COLORS.muted,
  },

  sessionId: {
    marginTop: 5,
    color: COLORS.success,
    fontWeight: "600",
  },

  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 18,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
    color: COLORS.text,
  },

  code: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 3,
    color: COLORS.text,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  secondary: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",

    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  secondaryText: {
    fontWeight: "700",
    color: COLORS.primary,
  },

  expiryText: {
    marginTop: 12,
    textAlign: "center",
    color: COLORS.warning,
    fontWeight: "600",
  },

  qrBox: {
    height: 240,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },

  qrText: {
    marginTop: 12,
    color: COLORS.muted,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.warning,
    marginRight: 10,
  },

  waitingText: {
    color: COLORS.warning,
    fontWeight: "600",
  },

  retryButton: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
  },

  retryText: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  clearButton: {
    backgroundColor: COLORS.dangerLight,
    borderWidth: 1,
    borderColor: COLORS.dangerBorder,
    padding: 16,
    borderRadius: 14,
  },

  clearText: {
    color: COLORS.danger,
    fontSize: 15,
    fontWeight: "700",
  },

  advancedCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 40,
    padding: 18,
    borderRadius: 18,
  },

  advancedTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.muted,
    marginBottom: 14,
  },

  clearSubtext: {
    color: COLORS.dangerDeep,
    fontSize: 12,
    marginTop: 4,
  },

  devCard: {
    backgroundColor: COLORS.infoLight,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.infoBorder,
  },

  devTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.infoDark,
    marginBottom: 6,
  },

  devText: {
    color: COLORS.subtitleText,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },

  devButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  devButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },
});
