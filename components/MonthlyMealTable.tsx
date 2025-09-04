import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MealHistory, User } from "@/stores/dorm-store";
import { Check, X, Minus } from "lucide-react-native";

interface MonthlyMealTableProps {
  mealHistory: MealHistory[];
  users: User[];
  year: number;
  month: number;
}

export function MonthlyMealTable({ mealHistory, users, year, month }: MonthlyMealTableProps) {
  const tableData = useMemo(() => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const dates = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    });

    return users.map(user => {
      const userHistory = mealHistory.filter(h => h.userId === user.id);
      const dailyMeals = dates.map(date => {
        const lunchRecord = userHistory.find(h => h.date === date && h.mealType === 'lunch');
        const dinnerRecord = userHistory.find(h => h.date === date && h.mealType === 'dinner');
        
        let status = 'none';
        let count = 0;
        
        if (lunchRecord && dinnerRecord) {
          if (lunchRecord.consumed && dinnerRecord.consumed) {
            status = 'both';
            count = 2;
          } else if (lunchRecord.consumed || dinnerRecord.consumed) {
            status = 'partial';
            count = 1;
          } else if (lunchRecord.optedOut || dinnerRecord.optedOut) {
            status = 'opted-out';
            count = 0;
          }
        } else if (lunchRecord || dinnerRecord) {
          const record = lunchRecord || dinnerRecord;
          if (record?.consumed) {
            status = 'partial';
            count = 1;
          } else if (record?.optedOut) {
            status = 'opted-out';
            count = 0;
          }
        }
        
        return { date, status, count };
      });
      
      const totalMeals = dailyMeals.reduce((sum, day) => sum + day.count, 0);
      
      return {
        user,
        dailyMeals,
        totalMeals,
      };
    });
  }, [mealHistory, users, year, month]);

  const renderMealStatus = (status: string, count: number) => {
    switch (status) {
      case 'both':
        return <Check color="#10B981" size={14} />;
      case 'partial':
        return <Text style={styles.partialText}>{count}</Text>;
      case 'opted-out':
        return <X color="#EF4444" size={14} />;
      default:
        return <Minus color="#94A3B8" size={14} />;
    }
  };

  const getCellBackgroundColor = (status: string) => {
    switch (status) {
      case 'both':
        return '#DCFCE7';
      case 'partial':
        return '#FEF3C7';
      case 'opted-out':
        return '#FEE2E2';
      default:
        return '#F8FAFC';
    }
  };

  const daysInMonth = new Date(year, month, 0).getDate();
  const dayHeaders = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Meal History</Text>
      <Text style={styles.subtitle}>
        {new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableContainer}>
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={[styles.cell, styles.nameCell, styles.headerCell]}>
              <Text style={styles.headerText}>Name</Text>
            </View>
            {dayHeaders.map(day => (
              <View key={day} style={[styles.cell, styles.dayCell, styles.headerCell]}>
                <Text style={styles.headerText}>{day}</Text>
              </View>
            ))}
            <View style={[styles.cell, styles.totalCell, styles.headerCell]}>
              <Text style={styles.headerText}>Total</Text>
            </View>
          </View>
          
          {/* Data Rows */}
          {tableData.map(({ user, dailyMeals, totalMeals }) => (
            <View key={user.id} style={styles.dataRow}>
              <View style={[styles.cell, styles.nameCell]}>
                <View style={styles.userInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
                  </View>
                  <Text style={styles.userName} numberOfLines={1}>{user.name}</Text>
                </View>
              </View>
              {dailyMeals.map(({ date, status, count }) => (
                <View 
                  key={date} 
                  style={[
                    styles.cell, 
                    styles.dayCell,
                    { backgroundColor: getCellBackgroundColor(status) }
                  ]}
                >
                  {renderMealStatus(status, count)}
                </View>
              ))}
              <View style={[styles.cell, styles.totalCell, styles.totalCellBg]}>
                <Text style={styles.totalText}>{totalMeals}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legend:</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <Check color="#10B981" size={12} />
            <Text style={styles.legendText}>Both meals</Text>
          </View>
          <View style={styles.legendItem}>
            <Text style={[styles.partialText, { fontSize: 12 }]}>1</Text>
            <Text style={styles.legendText}>Partial</Text>
          </View>
          <View style={styles.legendItem}>
            <X color="#EF4444" size={12} />
            <Text style={styles.legendText}>Opted out</Text>
          </View>
          <View style={styles.legendItem}>
            <Minus color="#94A3B8" size={12} />
            <Text style={styles.legendText}>No data</Text>
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
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
  },
  tableContainer: {
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
  },
  dataRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  cell: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
  },
  headerCell: {
    backgroundColor: "#F1F5F9",
  },
  nameCell: {
    width: 120,
    alignItems: "flex-start",
  },
  dayCell: {
    width: 32,
    minHeight: 40,
  },
  totalCell: {
    width: 50,
  },
  totalCellBg: {
    backgroundColor: "#F8FAFC",
  },
  headerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#0EA5E9",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  userName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1E293B",
    flex: 1,
  },
  partialText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D97706",
  },
  totalText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  legend: {
    marginTop: 8,
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendText: {
    fontSize: 10,
    color: "#64748B",
  },
});