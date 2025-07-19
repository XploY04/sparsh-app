import { create } from "zustand";
import { Task, mockTasks } from "../data/tasks";

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

export const useAppStore = create<AppState>((set) => ({
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
    }),
}));
