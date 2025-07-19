import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppStore } from "../store/appStore";
import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";

export const DashboardPlaceholderScreen: React.FC = () => {
  const { resetOnboarding } = useAppStore();

  const handleResetDemo = () => {
    resetOnboarding();
    // In a real app, you'd navigate back to the language selection
    // For now, this just resets the state for testing
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title={t("dashboard.title")}
          subtitle={t("dashboard.welcome")}
        />

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="bodyLarge" style={styles.description}>
              {t("dashboard.subtitle")}
            </Text>
            <Text variant="bodyMedium" style={styles.placeholder}>
              {t("dashboard.placeholder")}
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.actionContainer}>
          <Text variant="bodySmall" style={styles.demoNote}>
            This completes the Stage 1 onboarding flow.
          </Text>

          <Button
            mode="outlined"
            onPress={handleResetDemo}
            style={styles.resetButton}
            icon="refresh"
          >
            Reset Demo
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
  },
  card: {
    marginBottom: 32,
    flex: 1,
  },
  description: {
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 24,
  },
  placeholder: {
    textAlign: "center",
    fontStyle: "italic",
    opacity: 0.7,
  },
  actionContainer: {
    alignItems: "center",
    gap: 16,
  },
  demoNote: {
    textAlign: "center",
    fontStyle: "italic",
    opacity: 0.6,
  },
  resetButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
});
