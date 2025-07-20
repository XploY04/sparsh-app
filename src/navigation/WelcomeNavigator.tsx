import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { WelcomeStackParamList } from "./types";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { TrialQuestionnaireScreen } from "../screens/TrialQuestionnaireScreen";
import { TrialResultsScreen } from "../screens/TrialResultsScreen";
import { TrialApplicationScreen } from "../screens/TrialApplicationScreen";
import { ApplicationSuccessScreen } from "../screens/ApplicationSuccessScreen";

const Stack = createStackNavigator<WelcomeStackParamList>();

export const WelcomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="TrialQuestionnaire"
        component={TrialQuestionnaireScreen}
      />
      <Stack.Screen name="TrialResults" component={TrialResultsScreen} />
      <Stack.Screen
        name="TrialApplication"
        component={TrialApplicationScreen}
      />
      <Stack.Screen
        name="ApplicationSuccess"
        component={ApplicationSuccessScreen}
      />
    </Stack.Navigator>
  );
};
