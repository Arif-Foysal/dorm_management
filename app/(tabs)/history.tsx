import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Calendar, Filter, Search } from "lucide-react-native";
import { useDormStore } from "@/stores/dorm-store";
import { HistoryCard } from "@/components/HistoryCard";
import { MonthPicker } from "@/components/MonthPicker";

export default function HistoryTab() {
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("December 2024");
  const [filterType, setFilterType] = useState<"all" | "meals" | "payments">("all");
  const { historyItems } = useDormStore();

  const filteredHistory = historyItems.filter((item) => {
    if (filterType === "all") return true;
    return item.type === filterType;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>View past transactions</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.monthSelector}
          onPress={() => setShowMonthPicker(true)}
          activeOpacity={0.7}
        >
          <Calendar color="#0EA5E9" size={20} />
          <Text style={styles.monthText}>{selectedMonth}</Text>
        </TouchableOpacity>

        <View style={styles.filterContainer}>
          {(["all", "meals", "payments"] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterButton,
                filterType === type && styles.filterButtonActive,
              ]}
              onPress={() => setFilterType(type)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  filterType === type && styles.filterTextActive,
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.historyList}>
          {filteredHistory.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <MonthPicker
        visible={showMonthPicker}
        selectedMonth={selectedMonth}
        onSelect={(month) => {
          setSelectedMonth(month);
          setShowMonthPicker(false);
        }}
        onClose={() => setShowMonthPicker(false)}
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
  controls: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
  },
  filterButtonActive: {
    backgroundColor: "#0EA5E9",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  historyList: {
    padding: 20,
    gap: 12,
  },
});