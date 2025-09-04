import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Payment } from "@/stores/dorm-store";
import { DollarSign, Clock, CheckCircle, XCircle } from "lucide-react-native";

interface PaymentCardProps {
  payment: Payment;
}

export function PaymentCard({ payment }: PaymentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "#10B981";
      case "pending":
        return "#F59E0B";
      case "rejected":
        return "#EF4444";
      default:
        return "#64748B";
    }
  };

  const getStatusIcon = (status: string) => {
    const color = getStatusColor(status);
    switch (status) {
      case "approved":
        return <CheckCircle color={color} size={16} />;
      case "pending":
        return <Clock color={color} size={16} />;
      case "rejected":
        return <XCircle color={color} size={16} />;
      default:
        return <Clock color={color} size={16} />;
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{payment.userName.charAt(0)}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{payment.userName}</Text>
            <Text style={styles.type}>{payment.type}</Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          {getStatusIcon(payment.status)}
          <Text style={[styles.status, { color: getStatusColor(payment.status) }]}>
            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.amountContainer}>
          <DollarSign color="#1E293B" size={16} />
          <Text style={styles.amount}>${payment.amount}</Text>
        </View>
        <Text style={styles.date}>{new Date(payment.date).toLocaleDateString()}</Text>
      </View>

      {payment.description && (
        <Text style={styles.description}>{payment.description}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0EA5E9",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },
  type: {
    fontSize: 14,
    color: "#64748B",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  amount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },
  date: {
    fontSize: 14,
    color: "#64748B",
  },
  description: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 8,
    fontStyle: "italic",
  },
});