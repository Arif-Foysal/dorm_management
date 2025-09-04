import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  mealsConsumed: number;
  remainingBalance: number;
  roomNumber: string;
}

export interface DailyMeal {
  id: string;
  userId: string;
  userName: string;
  date: string;
  lunch: boolean;
  dinner: boolean;
  totalMeals: number;
}

export interface MealHistory {
  id: string;
  userId: string;
  userName: string;
  date: string;
  mealType: 'lunch' | 'dinner';
  consumed: boolean;
  optedOut: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  category: "food" | "utilities";
  type: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  date: string;
  description?: string;
}

export interface HistoryItem {
  id: string;
  userId: string;
  userName: string;
  type: "meals" | "payments";
  action: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "cancelled";
}

export interface OptOutRequest {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  reason?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface DormInfo {
  name: string;
  address: string;
  adminPhone: string;
  supportEmail: string;
}

interface DormStore {
  currentUser: User | null;
  users: User[];
  payments: Payment[];
  historyItems: HistoryItem[];
  optOutRequests: OptOutRequest[];
  dormInfo: DormInfo;
  dailyMeals: DailyMeal[];
  mealHistory: MealHistory[];
  setCurrentUser: (user: User) => void;
  addOptOutRequest: (request: Omit<OptOutRequest, "id" | "createdAt">) => void;
  addPaymentRequest: (payment: Omit<Payment, "id" | "date">) => void;
  getTodaysMeals: () => DailyMeal[];
  getMonthlyMealHistory: (year: number, month: number) => MealHistory[];
  updateMealConsumption: (userId: string, date: string, mealType: 'lunch' | 'dinner', consumed: boolean) => void;
}

export const useDormStore = create<DormStore>((set) => ({
  currentUser: {
    id: "1",
    name: "John Doe",
    email: "john.doe@university.edu",
    role: "student",
    mealsConsumed: 18,
    remainingBalance: 250,
    roomNumber: "A101",
  },
  users: [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@university.edu",
      role: "student",
      mealsConsumed: 18,
      remainingBalance: 250,
      roomNumber: "A101",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@university.edu",
      role: "student",
      mealsConsumed: 22,
      remainingBalance: 180,
      roomNumber: "A102",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@university.edu",
      role: "admin",
      mealsConsumed: 15,
      remainingBalance: 320,
      roomNumber: "A103",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah.wilson@university.edu",
      role: "student",
      mealsConsumed: 20,
      remainingBalance: 200,
      roomNumber: "A104",
    },
    {
      id: "5",
      name: "Alex Brown",
      email: "alex.brown@university.edu",
      role: "student",
      mealsConsumed: 16,
      remainingBalance: 280,
      roomNumber: "A105",
    },
  ],
  payments: [
    {
      id: "1",
      userId: "1",
      userName: "John Doe",
      category: "food",
      type: "Meal Deposit",
      amount: 300,
      status: "approved",
      date: "2024-12-01",
      description: "Monthly meal deposit",
    },
    {
      id: "2",
      userId: "2",
      userName: "Jane Smith",
      category: "utilities",
      type: "Electricity",
      amount: 85,
      status: "pending",
      date: "2024-12-15",
      description: "December electricity bill",
    },
    {
      id: "3",
      userId: "3",
      userName: "Mike Johnson",
      category: "utilities",
      type: "Internet",
      amount: 45,
      status: "approved",
      date: "2024-12-10",
      description: "Monthly internet bill",
    },
    {
      id: "4",
      userId: "4",
      userName: "Sarah Wilson",
      category: "food",
      type: "Meal Deposit",
      amount: 300,
      status: "pending",
      date: "2024-12-18",
      description: "Monthly meal deposit",
    },
    {
      id: "5",
      userId: "1",
      userName: "John Doe",
      category: "utilities",
      type: "Water",
      amount: 25,
      status: "approved",
      date: "2024-12-12",
      description: "December water bill",
    },
  ],
  historyItems: [
    {
      id: "1",
      userId: "1",
      userName: "John Doe",
      type: "meals",
      action: "Meal Consumed",
      amount: 12,
      date: "2024-12-20",
      status: "completed",
    },
    {
      id: "2",
      userId: "1",
      userName: "John Doe",
      type: "payments",
      action: "Deposit Made",
      amount: 300,
      date: "2024-12-01",
      status: "completed",
    },
    {
      id: "3",
      userId: "2",
      userName: "Jane Smith",
      type: "meals",
      action: "Opt-out Credit",
      amount: 36,
      date: "2024-12-15",
      status: "completed",
    },
    {
      id: "4",
      userId: "3",
      userName: "Mike Johnson",
      type: "payments",
      action: "Utility Payment",
      amount: 45,
      date: "2024-12-10",
      status: "completed",
    },
    {
      id: "5",
      userId: "4",
      userName: "Sarah Wilson",
      type: "meals",
      action: "Meal Consumed",
      amount: 15,
      date: "2024-12-19",
      status: "completed",
    },
  ],
  optOutRequests: [],
  dormInfo: {
    name: "University Heights Dormitory",
    address: "123 Campus Drive, University City, UC 12345",
    adminPhone: "+1 (555) 123-4567",
    supportEmail: "support@dormapp.edu",
  },
  dailyMeals: [
    {
      id: "dm1",
      userId: "1",
      userName: "John Doe",
      date: new Date().toISOString().split('T')[0],
      lunch: true,
      dinner: true,
      totalMeals: 2,
    },
    {
      id: "dm2",
      userId: "2",
      userName: "Jane Smith",
      date: new Date().toISOString().split('T')[0],
      lunch: true,
      dinner: true,
      totalMeals: 2,
    },
    {
      id: "dm3",
      userId: "3",
      userName: "Mike Johnson",
      date: new Date().toISOString().split('T')[0],
      lunch: true,
      dinner: true,
      totalMeals: 2,
    },
    {
      id: "dm4",
      userId: "4",
      userName: "Sarah Wilson",
      date: new Date().toISOString().split('T')[0],
      lunch: true,
      dinner: true,
      totalMeals: 2,
    },
    {
      id: "dm5",
      userId: "5",
      userName: "Alex Brown",
      date: new Date().toISOString().split('T')[0],
      lunch: true,
      dinner: true,
      totalMeals: 2,
    },
  ],
  mealHistory: [
    // Sample data for December 2024
    { id: "mh1", userId: "1", userName: "John Doe", date: "2024-12-01", mealType: "lunch", consumed: true, optedOut: false },
    { id: "mh2", userId: "1", userName: "John Doe", date: "2024-12-01", mealType: "dinner", consumed: true, optedOut: false },
    { id: "mh3", userId: "2", userName: "Jane Smith", date: "2024-12-01", mealType: "lunch", consumed: true, optedOut: false },
    { id: "mh4", userId: "2", userName: "Jane Smith", date: "2024-12-01", mealType: "dinner", consumed: false, optedOut: true },
    { id: "mh5", userId: "3", userName: "Mike Johnson", date: "2024-12-01", mealType: "lunch", consumed: true, optedOut: false },
    { id: "mh6", userId: "3", userName: "Mike Johnson", date: "2024-12-01", mealType: "dinner", consumed: true, optedOut: false },
    { id: "mh7", userId: "4", userName: "Sarah Wilson", date: "2024-12-01", mealType: "lunch", consumed: true, optedOut: false },
    { id: "mh8", userId: "4", userName: "Sarah Wilson", date: "2024-12-01", mealType: "dinner", consumed: true, optedOut: false },
    { id: "mh9", userId: "5", userName: "Alex Brown", date: "2024-12-01", mealType: "lunch", consumed: false, optedOut: true },
    { id: "mh10", userId: "5", userName: "Alex Brown", date: "2024-12-01", mealType: "dinner", consumed: true, optedOut: false },
    // Add more sample data for different dates
    { id: "mh11", userId: "1", userName: "John Doe", date: "2024-12-02", mealType: "lunch", consumed: true, optedOut: false },
    { id: "mh12", userId: "1", userName: "John Doe", date: "2024-12-02", mealType: "dinner", consumed: true, optedOut: false },
    { id: "mh13", userId: "2", userName: "Jane Smith", date: "2024-12-02", mealType: "lunch", consumed: true, optedOut: false },
    { id: "mh14", userId: "2", userName: "Jane Smith", date: "2024-12-02", mealType: "dinner", consumed: true, optedOut: false },
    { id: "mh15", userId: "3", userName: "Mike Johnson", date: "2024-12-02", mealType: "lunch", consumed: true, optedOut: false },
    { id: "mh16", userId: "3", userName: "Mike Johnson", date: "2024-12-02", mealType: "dinner", consumed: false, optedOut: true },
    { id: "mh17", userId: "4", userName: "Sarah Wilson", date: "2024-12-02", mealType: "lunch", consumed: true, optedOut: false },
    { id: "mh18", userId: "4", userName: "Sarah Wilson", date: "2024-12-02", mealType: "dinner", consumed: true, optedOut: false },
    { id: "mh19", userId: "5", userName: "Alex Brown", date: "2024-12-02", mealType: "lunch", consumed: true, optedOut: false },
    { id: "mh20", userId: "5", userName: "Alex Brown", date: "2024-12-02", mealType: "dinner", consumed: true, optedOut: false },
  ],
  setCurrentUser: (user) => set({ currentUser: user }),
  addOptOutRequest: (request) =>
    set((state) => ({
      optOutRequests: [
        ...state.optOutRequests,
        {
          ...request,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  addPaymentRequest: (payment) =>
    set((state) => ({
      payments: [
        ...state.payments,
        {
          ...payment,
          id: Date.now().toString(),
          date: new Date().toISOString().split("T")[0],
        },
      ],
    })),
  getTodaysMeals: (): DailyMeal[] => {
    const today = new Date().toISOString().split('T')[0];
    return useDormStore.getState().dailyMeals.filter((meal: DailyMeal) => meal.date === today);
  },
  getMonthlyMealHistory: (year: number, month: number): MealHistory[] => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    return useDormStore.getState().mealHistory.filter((history: MealHistory) => {
      const historyDate = new Date(history.date);
      return historyDate >= startDate && historyDate <= endDate;
    });
  },
  updateMealConsumption: (userId: string, date: string, mealType: 'lunch' | 'dinner', consumed: boolean) => {
    set((state) => ({
      mealHistory: state.mealHistory.map(history => 
        history.userId === userId && history.date === date && history.mealType === mealType
          ? { ...history, consumed }
          : history
      ),
    }));
  },
}));