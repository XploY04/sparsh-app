import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";

export const RewardsPlaceholderScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title={t("rewards.title")}
          subtitle={t("rewards.subtitle")}
        />

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text variant="headlineSmall" style={styles.comingSoonText}>
              {t("rewards.comingSoon")}
            </Text>
            <Text variant="bodyLarge" style={styles.description}>
              {t("rewards.description")}
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.placeholderContent}>
          <Text variant="bodyMedium" style={styles.placeholderText}>
            Future features will include:
          </Text>
          <Text variant="bodyMedium" style={styles.featureText}>
            • Daily completion streaks
          </Text>
          <Text variant="bodyMedium" style={styles.featureText}>
            • Achievement badges
          </Text>
          <Text variant="bodyMedium" style={styles.featureText}>
            • Progress tracking
          </Text>
          <Text variant="bodyMedium" style={styles.featureText}>
            • Leaderboards
          </Text>
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
    elevation: 2,
  },
  cardContent: {
    alignItems: "center",
    padding: 24,
  },
  comingSoonText: {
    textAlign: "center",
    marginBottom: 16,
    color: "#FF9800",
    fontWeight: "600",
  },
  description: {
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.8,
  },
  placeholderContent: {
    flex: 1,
  },
  placeholderText: {
    marginBottom: 16,
    fontWeight: "600",
    opacity: 0.7,
  },
  featureText: {
    marginBottom: 8,
    opacity: 0.6,
    paddingLeft: 16,
  },
});
