import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { MainStackParamList } from "../navigation/types";

type DoseTrackingNavigationProp = StackNavigationProp<MainStackParamList>;

export const DoseTrackingScreen: React.FC = () => {
  const navigation = useNavigation<DoseTrackingNavigationProp>();

  const handleScanQR = () => {
    navigation.navigate("QrScanner");
  };

  const handleRecordVideo = () => {
    navigation.navigate("VideoRecorder");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title={t("doseTracking.title")}
          subtitle={t("doseTracking.subtitle")}
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.optionsContainer}>
          <Card style={styles.optionCard}>
            <Card.Content style={styles.cardContent}>
              <Text variant="headlineSmall" style={styles.optionTitle}>
                {t("doseTracking.scanQr")}
              </Text>
              <Text variant="bodyMedium" style={styles.optionDescription}>
                {t("doseTracking.scanDescription")}
              </Text>
              <Button
                mode="contained"
                onPress={handleScanQR}
                style={styles.optionButton}
                icon="qrcode-scan"
              >
                {t("doseTracking.scanQr")}
              </Button>
            </Card.Content>
          </Card>

          <Card style={styles.optionCard}>
            <Card.Content style={styles.cardContent}>
              <Text variant="headlineSmall" style={styles.optionTitle}>
                {t("doseTracking.recordVideo")}
              </Text>
              <Text variant="bodyMedium" style={styles.optionDescription}>
                {t("doseTracking.videoDescription")}
              </Text>
              <Button
                mode="contained"
                onPress={handleRecordVideo}
                style={styles.optionButton}
                icon="video"
              >
                {t("doseTracking.recordVideo")}
              </Button>
            </Card.Content>
          </Card>
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
  optionsContainer: {
    flex: 1,
    gap: 24,
  },
  optionCard: {
    elevation: 4,
  },
  cardContent: {
    alignItems: "center",
    padding: 24,
  },
  optionTitle: {
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "600",
  },
  optionDescription: {
    textAlign: "center",
    marginBottom: 24,
    opacity: 0.7,
    lineHeight: 22,
  },
  optionButton: {
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
});
