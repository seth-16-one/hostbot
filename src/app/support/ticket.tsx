import PageHeader from "@/components/layout/PageHeader";
import Screen from "@/components/layout/Screen";
import { COLORS } from "@/constants";
import { support } from "@/data";

const tickets = support.tickets;

import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function TicketScreen() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [botName, setBotName] = useState("");
  const [message, setMessage] = useState("");

  const submitTicket = () => {
    const ticket = {
      id: Date.now().toString(),
      subject,
      category,
      priority,
      botName,
      message,
      status: "Open",
      createdAt: new Date().toISOString(),
    };

    console.log("Ticket Submitted:", ticket);

    alert("Ticket submitted successfully");
  };

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ScrollView style={styles.container}>
        <PageHeader title="Submit Ticket" subtitle="Contact support" showBack />

        <View style={styles.content}>
          <TextInput
            placeholder="Subject"
            value={subject}
            onChangeText={setSubject}
            style={styles.input}
          />

          <TextInput
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />

          <TextInput
            placeholder="Priority"
            value={priority}
            onChangeText={setPriority}
            style={styles.input}
          />

          <TextInput
            placeholder="Bot Name (Optional)"
            value={botName}
            onChangeText={setBotName}
            style={styles.input}
          />

          <TextInput
            placeholder="Describe your issue..."
            value={message}
            onChangeText={setMessage}
            multiline
            style={styles.message}
          />

          <Button title="Submit Ticket" onPress={submitTicket} />

          <Text style={styles.historyTitle}>Recent Tickets</Text>

          {tickets.map((ticket) => (
            <View key={ticket.id} style={styles.ticketCard}>
              <View>
                <Text style={styles.ticketSubject}>
                  {ticket.id} {ticket.subject}
                </Text>

                <Text style={styles.ticketDate}>{ticket.date}</Text>
              </View>

              <Text
                style={[
                  styles.ticketStatus,
                  ticket.status === "Open"
                    ? styles.open
                    : ticket.status === "Resolved"
                      ? styles.resolved
                      : styles.closed,
                ]}
              >
                {ticket.status}
              </Text>
            </View>
          ))}
        </View>
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
    padding: 20,
  },

  input: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },

  message: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    height: 150,
    textAlignVertical: "top",
    marginBottom: 20,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "700",
  },

  historyTitle: {
    marginTop: 30,
    marginBottom: 14,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  ticketCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ticketSubject: {
    fontWeight: "600",
    color: COLORS.text,
  },

  ticketDate: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },

  ticketStatus: {
    fontWeight: "700",
  },

  open: {
    color: COLORS.warning,
  },

  resolved: {
    color: COLORS.primary,
  },

  closed: {
    color: COLORS.muted,
  },
});
