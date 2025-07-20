import { create } from "zustand";
import { Task, mockTasks } from "../data/tasks";
import { Badge, badges, checkBadgeCriteria } from "../data/badges";

export interface AppState {
  // Language settings
  language: "en" | "hi";
  setLanguage: (language: "en" | "hi") => void;

  // Authentication state
  isAuthenticated: boolean;
  mobileNumber: string;
  isOtpVerified: boolean;
  isPinSet: boolean;
  isKycCompleted: boolean;
  isConsentGiven: boolean;
  isVoiceConsentRecorded: boolean;
  isQuizCompleted: boolean;
  isOnboardingComplete: boolean;

  // Tasks state
  tasks: Task[];
  updateTaskStatus: (
    taskId: string,
    status: "pending" | "completed" | "missed"
  ) => void;

  // Gamification state
  totalPoints: number;
  userBadges: Badge[];
  checkinStreak: number;
  doseStreak: number;
  totalCheckins: number;
  totalDoses: number;
  earlyMorningCheckins: number;
  lastCheckinDate: string | null;
  lastDoseDate: string | null;

  // Gamification actions
  awardPoints: (points: number) => void;
  recordCheckin: () => void;
  recordDose: () => void;
  checkAndUpdateBadges: () => void;

  // Actions
  setMobileNumber: (mobile: string) => void;
  setOtpVerified: (verified: boolean) => void;
  setPinSet: (set: boolean) => void;
  setKycCompleted: (completed: boolean) => void;
  setConsentGiven: (given: boolean) => void;
  setVoiceConsentRecorded: (recorded: boolean) => void;
  setQuizCompleted: (completed: boolean) => void;
  setOnboardingComplete: (complete: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;

  // Reset function for testing
  resetOnboarding: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  language: "en",
  isAuthenticated: false,
  mobileNumber: "",
  isOtpVerified: false,
  isPinSet: false,
  isKycCompleted: false,
  isConsentGiven: false,
  isVoiceConsentRecorded: false,
  isQuizCompleted: false,
  isOnboardingComplete: false,
  tasks: mockTasks,

  // Gamification initial state
  totalPoints: 0,
  userBadges: badges.map((badge) => ({ ...badge, isUnlocked: false })),
  checkinStreak: 0,
  doseStreak: 0,
  totalCheckins: 0,
  totalDoses: 0,
  earlyMorningCheckins: 0,
  lastCheckinDate: null,
  lastDoseDate: null,

  // Actions
  setLanguage: (language) => set({ language }),
  setMobileNumber: (mobileNumber) => set({ mobileNumber }),
  setOtpVerified: (isOtpVerified) => set({ isOtpVerified }),
  setPinSet: (isPinSet) => set({ isPinSet }),
  setKycCompleted: (isKycCompleted) => set({ isKycCompleted }),
  setConsentGiven: (isConsentGiven) => set({ isConsentGiven }),
  setVoiceConsentRecorded: (isVoiceConsentRecorded) =>
    set({ isVoiceConsentRecorded }),
  setQuizCompleted: (isQuizCompleted) => set({ isQuizCompleted }),
  setOnboardingComplete: (isOnboardingComplete) =>
    set({ isOnboardingComplete, isAuthenticated: isOnboardingComplete }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  // Task actions
  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      ),
    })),

  // Gamification actions
  awardPoints: (points) =>
    set((state) => ({
      totalPoints: state.totalPoints + points,
    })),

  recordCheckin: () => {
    const today = new Date().toDateString();
    const state = get();

    // Check if already checked in today
    if (state.lastCheckinDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    // Calculate streak
    let newStreak = 1;
    if (state.lastCheckinDate === yesterdayStr) {
      newStreak = state.checkinStreak + 1;
    }

    // Check if early morning (before 8 AM)
    const currentHour = new Date().getHours();
    const isEarlyMorning = currentHour < 8;

    set((state) => ({
      totalCheckins: state.totalCheckins + 1,
      checkinStreak: newStreak,
      lastCheckinDate: today,
      totalPoints: state.totalPoints + 10, // Award 10 points per checkin
      earlyMorningCheckins: isEarlyMorning
        ? state.earlyMorningCheckins + 1
        : state.earlyMorningCheckins,
    }));

    // Check for new badges
    get().checkAndUpdateBadges();
  },

  recordDose: () => {
    const today = new Date().toDateString();
    const state = get();

    // Check if already recorded dose today
    if (state.lastDoseDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    // Calculate streak
    let newStreak = 1;
    if (state.lastDoseDate === yesterdayStr) {
      newStreak = state.doseStreak + 1;
    }

    set((state) => ({
      totalDoses: state.totalDoses + 1,
      doseStreak: newStreak,
      lastDoseDate: today,
      totalPoints: state.totalPoints + 10, // Award 10 points per dose
    }));

    // Check for new badges
    get().checkAndUpdateBadges();
  },

  checkAndUpdateBadges: () => {
    const state = get();
    const userStats = {
      checkinStreak: state.checkinStreak,
      doseStreak: state.doseStreak,
      totalPoints: state.totalPoints,
      totalCheckins: state.totalCheckins,
      totalDoses: state.totalDoses,
      earlyMorningCheckins: state.earlyMorningCheckins,
    };

    const updatedBadges = checkBadgeCriteria(userStats, state.userBadges);
    set({ userBadges: updatedBadges });
  },

  resetOnboarding: () =>
    set({
      isAuthenticated: false,
      mobileNumber: "",
      isOtpVerified: false,
      isPinSet: false,
      isKycCompleted: false,
      isConsentGiven: false,
      isVoiceConsentRecorded: false,
      isQuizCompleted: false,
      isOnboardingComplete: false,
      tasks: mockTasks, // Reset tasks to default
      // Reset gamification state
      totalPoints: 0,
      userBadges: badges.map((badge) => ({ ...badge, isUnlocked: false })),
      checkinStreak: 0,
      doseStreak: 0,
      totalCheckins: 0,
      totalDoses: 0,
      earlyMorningCheckins: 0,
      lastCheckinDate: null,
      lastDoseDate: null,
    }),
}));
