import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { X } from "lucide-react-native";

interface MonthPickerProps {
  visible: boolean;
  selectedMonth: string;
  onSelect: (month: string) => void;
  onClose: () => void;
}

export function MonthPicker({ visible, selectedMonth, onSelect, onClose }: MonthPickerProps) {
  const months = [
    "January 2025",
    "December 2024",
    "November 2024",
    "October 2024",
    "September 2024",
    "August 2024",
    "July 2024",
    "June 2024",
    "May 2024",
    "April 2024",
    "March 2024",
    "February 2024",
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Month</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X color="#64748B" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {months.map((month) => (
            <TouchableOpacity
              key={month}
              style={[
                styles.monthItem,
                selectedMonth === month && styles.monthItemSelected,
              ]}
              onPress={() => onSelect(month)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.monthText,
                  selectedMonth === month && styles.monthTextSelected,
                ]}
              >
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  monthItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
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
  monthItemSelected: {
    backgroundColor: "#0EA5E9",
  },
  monthText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1E293B",
  },
  monthTextSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});