import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HistoryItem } from "@/stores/dorm-store";
import { Utensils, CreditCard, CheckCircle, Clock, XCircle } from "lucide-react-native";

interface HistoryCardProps {
  item: HistoryItem;
}

export function HistoryCard({ item }: HistoryCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meals":
        return <Utensils color="#0EA5E9" size={16} />;
      case "payments":
        return <CreditCard color="#10B981" size={16} />;
      default:
        return <CheckCircle color="#64748B" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10B981";
      case "pending":
        return "#F59E0B";
      case "cancelled":
        return "#EF4444";
      default:
        return "#64748B";
    }
  };

  const getStatusIcon = (status: string) => {
    const color = getStatusColor(status);
    switch (status) {
      case "completed":
        return <CheckCircle color={color} size={12} />;
      case "pending":
        return <Clock color={color} size={12} />;
      case "cancelled":
        return <XCircle color={color} size={12} />;
      default:
        return <Clock color={color} size={12} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.typeIcon}>{getTypeIcon(item.type)}</View>
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.action}>{item.action}</Text>
            <View style={styles.statusContainer}>
              {getStatusIcon(item.status)}
              <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                {item.status}
              </Text>
            </View>
          </View>
          <Text style={styles.user}>{item.userName}</Text>
          <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>
            {item.type === "meals" ? `${item.amount} meals` : `$${item.amount}`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  typeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  action: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    flex: 1,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  status: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  user: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: "#94A3B8",
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },
});