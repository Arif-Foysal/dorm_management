import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "@/stores/dorm-store";
import { Utensils, DollarSign } from "lucide-react-native";

interface MealCardProps {
  user: User;
}

export function MealCard({ user }: MealCardProps) {
  const getBalanceColor = (balance: number) => {
    if (balance > 200) return "#10B981";
    if (balance > 100) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.room}>Room {user.roomNumber}</Text>
          </View>
        </View>
        {user.role === "admin" && (
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>Admin</Text>
          </View>
        )}
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <View style={styles.statIcon}>
            <Utensils color="#0EA5E9" size={16} />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{user.mealsConsumed}</Text>
            <Text style={styles.statLabel}>Meals</Text>
          </View>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <View style={styles.statIcon}>
            <DollarSign color={getBalanceColor(user.remainingBalance)} size={16} />
          </View>
          <View style={styles.statContent}>
            <Text
              style={[
                styles.statValue,
                { color: getBalanceColor(user.remainingBalance) },
              ]}
            >
              ${user.remainingBalance}
            </Text>
            <Text style={styles.statLabel}>Balance</Text>
          </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0EA5E9",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
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
  room: {
    fontSize: 14,
    color: "#64748B",
  },
  adminBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F59E0B",
  },
  adminBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#D97706",
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 16,
  },
});