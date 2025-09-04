import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Shield,
  Info,
  LogOut,
} from "lucide-react-native";
import { useDormStore } from "@/stores/dorm-store";

export default function ProfileTab() {
  const { currentUser, dormInfo } = useDormStore();

  const profileItems = [
    {
      icon: <User color="#0EA5E9" size={20} />,
      title: "Personal Info",
      subtitle: "Manage your profile details",
      onPress: () => {},
    },
    {
      icon: <Shield color="#10B981" size={20} />,
      title: "Role",
      subtitle: currentUser?.role === "admin" ? "Administrator" : "Student",
      onPress: () => {},
    },
    {
      icon: <Info color="#64748B" size={20} />,
      title: "App Version",
      subtitle: "v1.0.0",
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Manage your account</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {currentUser?.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.userName}>{currentUser?.name}</Text>
          <Text style={styles.userEmail}>{currentUser?.email}</Text>
          <View style={styles.rolebadge}>
            <Text style={styles.roleBadgeText}>
              {currentUser?.role === "admin" ? "Admin" : "Student"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dorm Information</Text>
          <View style={styles.dormCard}>
            <View style={styles.dormItem}>
              <MapPin color="#64748B" size={16} />
              <View style={styles.dormItemContent}>
                <Text style={styles.dormItemTitle}>{dormInfo.name}</Text>
                <Text style={styles.dormItemSubtitle}>{dormInfo.address}</Text>
              </View>
            </View>
            <View style={styles.dormItem}>
              <Phone color="#64748B" size={16} />
              <View style={styles.dormItemContent}>
                <Text style={styles.dormItemTitle}>Admin Contact</Text>
                <Text style={styles.dormItemSubtitle}>{dormInfo.adminPhone}</Text>
              </View>
            </View>
            <View style={styles.dormItem}>
              <Mail color="#64748B" size={16} />
              <View style={styles.dormItemContent}>
                <Text style={styles.dormItemTitle}>Support Email</Text>
                <Text style={styles.dormItemSubtitle}>{dormInfo.supportEmail}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            {profileItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.settingItem,
                  index < profileItems.length - 1 && styles.settingItemBorder,
                ]}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.settingIcon}>{item.icon}</View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <LogOut color="#EF4444" size={20} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
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
  userCard: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#0EA5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 12,
  },
  rolebadge: {
    backgroundColor: "#F0F9FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#0EA5E9",
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0EA5E9",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  dormCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
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
  dormItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  dormItemContent: {
    flex: 1,
  },
  dormItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 2,
  },
  dormItemSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  settingsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 40,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
});