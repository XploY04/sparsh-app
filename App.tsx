import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-gesture-handler";

import { RootNavigator } from "./src/navigation/RootNavigator";
import { lightTheme } from "./src/theme/colors";

export default function App() {
  return (
    <PaperProvider theme={lightTheme}>
      <RootNavigator />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
