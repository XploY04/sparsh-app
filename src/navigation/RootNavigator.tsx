import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { OnboardingNavigator } from "./OnboardingNavigator";
import { MainStackNavigator } from "./MainStackNavigator";
import { useAppStore } from "../store/appStore";
import { RootStackParamList } from "./types";
import {
  notificationService,
  initializeNotificationListeners,
  cleanupNotificationListeners,
} from "../services/notificationService";

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isOnboardingComplete } = useAppStore();

  useEffect(() => {
    // Initialize notification listeners
    const subscriptions = initializeNotificationListeners();

    // Setup notifications when user completes onboarding
    if (isOnboardingComplete) {
      setupNotifications();
    }

    // Cleanup on unmount
    return () => {
      cleanupNotificationListeners(subscriptions);
    };
  }, [isOnboardingComplete]);

  const setupNotifications = async () => {
    try {
      const permissionGranted = await notificationService.requestPermissions();

      if (permissionGranted) {
        await notificationService.scheduleDailyReminders();
        console.log("Notifications setup completed successfully");
      } else {
        console.log("Notification permissions not granted");
      }
    } catch (error) {
      console.error("Error setting up notifications:", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboardingComplete ? (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <Stack.Screen name="Main" component={MainStackNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
