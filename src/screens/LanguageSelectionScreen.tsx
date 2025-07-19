import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAppStore } from "../store/appStore";
import { setLanguage, t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { OnboardingStackParamList } from "../navigation/types";

type NavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  "LanguageSelection"
>;

export const LanguageSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setLanguage: setStoreLanguage } = useAppStore();

  const handleLanguageSelect = (selectedLanguage: "en" | "hi") => {
    setLanguage(selectedLanguage);
    setStoreLanguage(selectedLanguage);
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title={t("languageSelection.title")}
          subtitle={t("languageSelection.subtitle")}
        />

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => handleLanguageSelect("en")}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            {t("languageSelection.english")}
          </Button>

          <Button
            mode="contained"
            onPress={() => handleLanguageSelect("hi")}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            {t("languageSelection.hindi")}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    marginVertical: 8,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
