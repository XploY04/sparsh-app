import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { MainTabNavigator } from "./MainTabNavigator";
import {
  DailyCheckinScreen,
  DoseTrackingScreen,
  QrScannerScreen,
  VideoRecorderScreen,
  EmergencyScreen,
  ReportEventScreen,
} from "../screens";
import { MainStackParamList } from "./types";

const Stack = createStackNavigator<MainStackParamList>();

export const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{
          presentation: "card",
        }}
      />
      <Stack.Screen name="DailyCheckin" component={DailyCheckinScreen} />
      <Stack.Screen name="DoseTracking" component={DoseTrackingScreen} />
      <Stack.Screen name="QrScanner" component={QrScannerScreen} />
      <Stack.Screen name="VideoRecorder" component={VideoRecorderScreen} />
      <Stack.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{
          headerShown: true,
          title: "Emergency Support",
          headerStyle: {
            backgroundColor: "#F44336",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="ReportEvent"
        component={ReportEventScreen}
        options={{
          headerShown: true,
          title: "Report Adverse Event",
          headerStyle: {
            backgroundColor: "#FF9800",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};
