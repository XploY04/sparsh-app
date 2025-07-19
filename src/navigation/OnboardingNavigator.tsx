import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  LanguageSelectionScreen,
  LoginScreen,
  PinSetupScreen,
  AadhaarKycScreen,
  InformedConsentScreen,
  VoiceConsentScreen,
  ComprehensionQuizScreen,
  DashboardPlaceholderScreen,
} from "../screens";
import { OnboardingStackParamList } from "./types";

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="LanguageSelection"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Disable back gesture to prevent skipping steps
      }}
    >
      <Stack.Screen
        name="LanguageSelection"
        component={LanguageSelectionScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="PinSetup" component={PinSetupScreen} />
      <Stack.Screen name="AadhaarKyc" component={AadhaarKycScreen} />
      <Stack.Screen name="InformedConsent" component={InformedConsentScreen} />
      <Stack.Screen name="VoiceConsent" component={VoiceConsentScreen} />
      <Stack.Screen
        name="ComprehensionQuiz"
        component={ComprehensionQuizScreen}
      />
      <Stack.Screen
        name="DashboardPlaceholder"
        component={DashboardPlaceholderScreen}
      />
    </Stack.Navigator>
  );
};
