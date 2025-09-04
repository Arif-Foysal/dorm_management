import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Plus, ChevronDown, ChevronRight } from "lucide-react-native";
import { useDormStore } from "@/stores/dorm-store";
import { PaymentCard } from "@/components/PaymentCard";
import { PaymentRequestModal } from "@/components/PaymentRequestModal";

export default function PaymentsTab() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    food: true,
    utilities: true,
  });
  const { users, payments, currentUser } = useDormStore();

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const foodPayments = payments.filter((p) => p.category === "food");
  const utilityPayments = payments.filter((p) => p.category === "utilities");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payments</Text>
        <Text style={styles.subtitle}>Manage deposits and bills</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => setShowRequestModal(true)}
          activeOpacity={0.8}
        >
          <Plus color="#FFFFFF" size={20} />
          <Text style={styles.requestButtonText}>Make Payment Request</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection("food")}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionTitle}>Food Deposits</Text>
            {expandedSections.food ? (
              <ChevronDown color="#64748B" size={20} />
            ) : (
              <ChevronRight color="#64748B" size={20} />
            )}
          </TouchableOpacity>

          {expandedSections.food && (
            <View style={styles.sectionContent}>
              {foodPayments.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} />
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection("utilities")}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionTitle}>Utilities</Text>
            {expandedSections.utilities ? (
              <ChevronDown color="#64748B" size={20} />
            ) : (
              <ChevronRight color="#64748B" size={20} />
            )}
          </TouchableOpacity>

          {expandedSections.utilities && (
            <View style={styles.sectionContent}>
              {utilityPayments.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <PaymentRequestModal
        visible={showRequestModal}
        onClose={() => setShowRequestModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  requestButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0EA5E9",
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  requestButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
  },
  sectionContent: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 8,
  },
});