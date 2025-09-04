import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Plus, Users, TrendingUp, Calendar } from "lucide-react-native";
import { useDormStore } from "@/stores/dorm-store";
import { OptOutModal } from "@/components/OptOutModal";
import { MealCard } from "@/components/MealCard";
import { StatsCard } from "@/components/StatsCard";
import { TodaysMealsCard } from "@/components/TodaysMealsCard";
import { MonthlyMealTable } from "@/components/MonthlyMealTable";

export default function FoodTab() {
  const [showOptOutModal, setShowOptOutModal] = useState(false);
  const { users, currentUser, getTodaysMeals, getMonthlyMealHistory } = useDormStore();

  const todaysMeals = useMemo(() => getTodaysMeals(), [getTodaysMeals]);
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  const monthlyHistory = useMemo(() => 
    getMonthlyMealHistory(currentYear, currentMonth), 
    [getMonthlyMealHistory, currentYear, currentMonth]
  );

  const totalUsers = users.length;
  const avgMealsConsumed = Math.round(
    users.reduce((sum, user) => sum + user.mealsConsumed, 0) / totalUsers
  );
  
  const todaysTotalMeals = todaysMeals.reduce((sum, meal) => sum + meal.totalMeals, 0);
  const todaysAvgMeals = todaysMeals.length > 0 ? (todaysTotalMeals / todaysMeals.length).toFixed(1) : "0";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal Tracker</Text>
        <Text style={styles.subtitle}>Current Month Overview</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <StatsCard
            icon={<Users color="#0EA5E9" size={20} />}
            title="Total Residents"
            value={totalUsers.toString()}
            subtitle="Active members"
          />
          <StatsCard
            icon={<Calendar color="#10B981" size={20} />}
            title="Today's Avg"
            value={todaysAvgMeals}
            subtitle="Meals per person"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          <Text style={styles.sectionSubtitle}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>

        <View style={styles.todaysMealsList}>
          {todaysMeals.map((meal) => (
            <TodaysMealsCard key={meal.id} meal={meal} />
          ))}
        </View>

        <View style={styles.monthlyHistoryContainer}>
          <MonthlyMealTable 
            mealHistory={monthlyHistory}
            users={users}
            year={currentYear}
            month={currentMonth}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Monthly Overview</Text>
          <Text style={styles.sectionSubtitle}>
            All residents meal consumption
          </Text>
        </View>

        <View style={styles.mealsList}>
          {users.map((user) => (
            <MealCard key={user.id} user={user} />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowOptOutModal(true)}
        activeOpacity={0.8}
      >
        <Plus color="#FFFFFF" size={24} />
      </TouchableOpacity>

      <OptOutModal
        visible={showOptOutModal}
        onClose={() => setShowOptOutModal(false)}
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
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  todaysMealsList: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  monthlyHistoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  mealsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 12,
  },
  fab: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0EA5E9",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});