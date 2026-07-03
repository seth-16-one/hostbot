import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { Button, StatusBanner, StatusModal } from "@/components/ui";
import { COLORS } from "@/constants";
import { useToast } from "@/context/ToastContext";
import { useDeploymentStore } from "@/store/deployment";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, Share, StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function PairScreen() {
  const { id } = useLocalSearchParams();
  const deploymentId = String(id);
  const { showToast } = useToast();
  const deployment = useDeploymentStore((state) =>
    state.deployments.find((item) => item.id === deploymentId),
  );
  const generateSession = useDeploymentStore((state) => state.generateSession);
  const deployBot = useDeploymentStore((state) => state.deployBot);
  const fetchDeployment = useDeploymentStore((state) => state.fetchDeployment);
  const pollPairingSession = useDeploymentStore((state) => state.pollPairingSession);
  const refreshSession = useDeploymentStore((state) => state.refreshSession);
  const updateDeployment = useDeploymentStore((state) => state.updateDeployment);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showExpiredModal, setShowExpiredModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(300);

  const expiresAt = deployment?.session?.expiresAt;
  const pairCode = deployment?.session?.pairCode ?? "--------";
  const qrValue = deployment?.session?.qrValue ?? pairCode;

  useEffect(() => {
    if (deployment || !deploymentId) return;
    fetchDeployment(deploymentId).catch((error) => {
      showToast({
        title: "Deployment Error",
        message: (error as Error).message,
        type: "error",
      });
    });
  }, [deployment, deploymentId, fetchDeployment, showToast]);

  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining === 0 && deployment) {
        updateDeployment(deployment.id, "expired");
        setShowExpiredModal(true);
      }
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [deployment, expiresAt, updateDeployment]);

  useEffect(() => {
    if (!deployment || deployment.status !== "pairing" || !deployment.session?.id) return;

    const poll = async () => {
      try {
        const session = await pollPairingSession(deployment.id);
        if (!session) return;

        if (session.status === "connected") {
          await deployBot(deployment.id);
          router.replace({
            pathname: "/bots/pair/success",
            params: {
              deploymentId: deployment.id,
              phone: session.phone || deployment.ownerNumber,
              connectedAt: session.connectedAt || new Date().toISOString(),
            },
          } as any);
        }

        if (session.status === "expired") {
          setShowExpiredModal(true);
        }

        if (session.status === "closed") {
          router.replace(`/bots/configure/${deployment.botId}` as any);
        }
      } catch {
        showToast({
          title: "Connection Issue",
          message: "Unable to update pairing status. Please try again.",
          type: "error",
        });
      }
    };

    poll();
    const timer = setInterval(poll, 2500);
    return () => clearInterval(timer);
  }, [deployBot, deployment, pollPairingSession, showToast]);

  const statusTone = useMemo(() => {
    if (deployment?.status === "online") return "success";
    if (deployment?.status === "failed" || deployment?.status === "expired") return "error";
    if (deployment?.status === "deploying") return "info";
    return "warning";
  }, [deployment?.status]);

  if (!deployment) {
    return (
      <View style={styles.center}>
        <Text>Deployment not found</Text>
      </View>
    );
  }

  const copyCode = async () => {
    await Clipboard.setStringAsync(pairCode);
    showToast({
      title: "Pairing Code Copied",
      message: "The pairing code is ready to paste.",
      type: "success",
    });
  };

  const sharePairCode = async () => {
    if (Platform.OS === "web") {
      await Clipboard.setStringAsync(pairCode);
      showToast({
        title: "Pairing Code Copied",
        message: "The pairing code is ready to paste.",
        type: "success",
      });
      return;
    }
    await Share.share({ message: `Pairing Code: ${pairCode}` });
  };

  const retry = async () => {
    setRefreshing(true);
    try {
      await refreshSession(deployment.id);
      showToast({
        title: "Pairing Code Refreshed",
        message: "A new pairing session has started.",
        type: "info",
      });
    } catch (error) {
      showToast({
        title: "Refresh Failed",
        message: (error as Error).message,
        type: "error",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const completePairing = async () => {
    try {
      await deployBot(deployment.id);
      router.replace({
        pathname: "/bots/pair/success",
        params: {
          deploymentId: deployment.id,
          phone: deployment.ownerNumber,
          connectedAt: new Date().toISOString(),
        },
      } as any);
    } catch (error) {
      showToast({
        title: "Start Failed",
        message: (error as Error).message,
        type: "error",
      });
    }
  };

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Pair Device" subtitle="Connect your bot session" showBack />

        <StatusBanner
          type={statusTone}
          title={`Deployment ${deployment.status.replace("_", " ")}`}
          message={`Session ${deployment.session?.id ?? "pending"}`}
        />

        <View style={styles.sessionCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="hardware-chip-outline" size={30} color={COLORS.success} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.botName}>{deployment.botName}</Text>
            <Text style={styles.botCategory}>Session ID: {deployment.session?.id ?? "-"}</Text>
            <Text style={styles.sessionId}>Expires in {secondsLeft}s</Text>
          </View>
        </View>

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
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>QR Code</Text>
          <View style={styles.qrBox}>
            <QRCode value={qrValue} size={180} />
          </View>
        </View>

        <Button title="I Have Paired Device" onPress={completePairing} disabled={deployment.status === "expired"} />
        <Button title="Refresh Pair Code" variant="outline" onPress={retry} loading={refreshing} />

        <StatusModal
          visible={showSuccessModal}
          type="success"
          title="Bot Online"
          message="Your bot is online and ready to manage."
          primaryText="Manage Bot"
          onPrimaryPress={() => {
            setShowSuccessModal(false);
            router.replace(`/bots/manage/${deployment.id}` as any);
          }}
        />
        <StatusModal
          visible={showExpiredModal}
          type="warning"
          title="Session Expired"
          message="Generate a new pairing code to continue."
          primaryText="Generate New Code"
          secondaryText="Close"
          onPrimaryPress={() => {
            setShowExpiredModal(false);
            retry();
          }}
          onSecondaryPress={() => setShowExpiredModal(false)}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
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
    backgroundColor: COLORS.successBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  botName: { fontSize: 18, fontWeight: "700", color: COLORS.text },
  botCategory: { marginTop: 3, color: COLORS.muted },
  sessionId: { marginTop: 5, color: COLORS.success, fontWeight: "600" },
  card: { backgroundColor: COLORS.white, marginHorizontal: 16, marginBottom: 16, padding: 18, borderRadius: 18 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 14, color: COLORS.text },
  code: { fontSize: 30, fontWeight: "700", textAlign: "center", letterSpacing: 3, color: COLORS.text },
  actions: { flexDirection: "row", gap: 10, marginTop: 20 },
  secondary: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  secondaryText: { fontWeight: "700", color: COLORS.primary },
  qrBox: { minHeight: 220, borderRadius: 16, backgroundColor: COLORS.background, justifyContent: "center", alignItems: "center" },
});
