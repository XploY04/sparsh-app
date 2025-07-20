import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure how notifications are displayed when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export interface NotificationService {
  requestPermissions: () => Promise<boolean>;
  scheduleDailyReminders: () => Promise<void>;
  cancelAllNotifications: () => Promise<void>;
}

export const notificationService: NotificationService = {
  // Request notification permissions
  requestPermissions: async (): Promise<boolean> => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return false;
      }

      // For Android, we need to create a notification channel
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("daily-reminders", {
          name: "Daily Reminders",
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#6200EE",
        });
      }

      return true;
    } catch (error) {
      console.error("Error requesting notification permissions:", error);
      return false;
    }
  },

  // Schedule daily reminder notifications
  scheduleDailyReminders: async (): Promise<void> => {
    try {
      // Cancel any existing notifications first
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Schedule daily check-in reminder (9 AM)
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Sparsh Daily Check-in",
          body: "Don't forget to report how you're feeling today!",
          sound: "default",
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          hour: 9,
          minute: 0,
          repeats: true,
        },
      });

      // Schedule evening medication reminder (8 PM)
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Medication Reminder",
          body: "It's time to take and verify your evening dose.",
          sound: "default",
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          hour: 20,
          minute: 0,
          repeats: true,
        },
      });

      // Schedule morning medication reminder (8 AM)
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Morning Medication",
          body: "Time for your morning dose verification.",
          sound: "default",
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          hour: 8,
          minute: 0,
          repeats: true,
        },
      });

      // Schedule a motivational reminder (6 PM)
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Stay on Track! 🏆",
          body: "You're doing great! Check your progress and earn more badges.",
          sound: "default",
          priority: Notifications.AndroidNotificationPriority.DEFAULT,
        },
        trigger: {
          hour: 18,
          minute: 0,
          repeats: true,
        },
      });

      console.log("Daily notifications scheduled successfully");
    } catch (error) {
      console.error("Error scheduling notifications:", error);
    }
  },

  // Cancel all scheduled notifications
  cancelAllNotifications: async (): Promise<void> => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("All notifications cancelled");
    } catch (error) {
      console.error("Error cancelling notifications:", error);
    }
  },
};

// Helper to handle notification responses (when user taps notification)
export const handleNotificationResponse = (
  response: Notifications.NotificationResponse
) => {
  const notificationData = response.notification.request.content.data;

  // You can handle different notification types here
  console.log("Notification tapped:", notificationData);

  // TODO: Navigate to appropriate screen based on notification type
  // This would require navigation reference or deep linking setup
};

// Initialize notification listeners
export const initializeNotificationListeners = () => {
  // Listen for notifications when app is in foreground
  const foregroundSubscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log("Notification received in foreground:", notification);
    }
  );

  // Listen for notification responses (when user taps notification)
  const responseSubscription =
    Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );

  return {
    foregroundSubscription,
    responseSubscription,
  };
};

// Clean up notification listeners
export const cleanupNotificationListeners = (subscriptions: {
  foregroundSubscription: Notifications.Subscription;
  responseSubscription: Notifications.Subscription;
}) => {
  subscriptions.foregroundSubscription.remove();
  subscriptions.responseSubscription.remove();
};
