import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DailyMeal } from "@/stores/dorm-store";
import { Utensils, Clock } from "lucide-react-native";

interface TodaysMealsCardProps {
  meal: DailyMeal;
}

export function TodaysMealsCard({ meal }: TodaysMealsCardProps) {
  const getMealStatus = (lunch: boolean, dinner: boolean) => {
    if (lunch && dinner) return "Both meals";
    if (lunch) return "Lunch only";
    if (dinner) return "Dinner only";
    return "No meals";
  };

  const getStatusColor = (totalMeals: number) => {
    if (totalMeals === 2) return "#10B981";
    if (totalMeals === 1) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{meal.userName.charAt(0)}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{meal.userName}</Text>
            <Text style={styles.status}>
              {getMealStatus(meal.lunch, meal.dinner)}
            </Text>
          </View>
        </View>
        <View style={styles.mealCount}>
          <View style={[styles.countBadge, { backgroundColor: getStatusColor(meal.totalMeals) }]}>
            <Utensils color="#FFFFFF" size={16} />
            <Text style={styles.countText}>{meal.totalMeals}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.mealDetails}>
        <View style={[styles.mealItem, { opacity: meal.lunch ? 1 : 0.5 }]}>
          <Clock color={meal.lunch ? "#10B981" : "#94A3B8"} size={14} />
          <Text style={[styles.mealLabel, { color: meal.lunch ? "#10B981" : "#94A3B8" }]}>
            Lunch
          </Text>
        </View>
        <View style={[styles.mealItem, { opacity: meal.dinner ? 1 : 0.5 }]}>
          <Clock color={meal.dinner ? "#10B981" : "#94A3B8"} size={14} />
          <Text style={[styles.mealLabel, { color: meal.dinner ? "#10B981" : "#94A3B8" }]}>
            Dinner
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
    marginBottom: 8,
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
  status: {
    fontSize: 12,
    color: "#64748B",
  },
  mealCount: {
    alignItems: "center",
  },
  countBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  countText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  mealDetails: {
    flexDirection: "row",
    gap: 16,
  },
  mealItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  mealLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
});