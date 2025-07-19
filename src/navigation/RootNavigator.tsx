import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { OnboardingNavigator } from "./OnboardingNavigator";
import { MainStackNavigator } from "./MainStackNavigator";
import { useAppStore } from "../store/appStore";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isOnboardingComplete } = useAppStore();

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
