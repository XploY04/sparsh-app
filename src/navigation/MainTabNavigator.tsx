import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { DashboardScreen, RewardsScreen, ProfileScreen } from "../screens";
import { EmergencyFAB } from "../components";
import { t } from "../locales/i18n";
import { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof MaterialCommunityIcons.glyphMap;

            switch (route.name) {
              case "Dashboard":
                iconName = focused ? "home" : "home-outline";
                break;
              case "Rewards":
                iconName = focused ? "trophy" : "trophy-outline";
                break;
              case "Profile":
                iconName = focused ? "account" : "account-outline";
                break;
              default:
                iconName = "circle";
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#6200EE",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            paddingBottom: 8,
            paddingTop: 8,
            height: 64,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarLabel: t("tabs.dashboard"),
          }}
        />
        <Tab.Screen
          name="Rewards"
          component={RewardsScreen}
          options={{
            tabBarLabel: t("tabs.rewards"),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: t("tabs.profile"),
          }}
        />
      </Tab.Navigator>
      <EmergencyFAB />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
