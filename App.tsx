import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-gesture-handler";

import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <PaperProvider>
      <RootNavigator />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
