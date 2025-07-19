import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Card, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAppStore } from "../store/appStore";
import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { OnboardingStackParamList } from "../navigation/types";

type NavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  "AadhaarKyc"
>;

export const AadhaarKycScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setKycCompleted } = useAppStore();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyAadhaar = async () => {
    setIsVerifying(true);

    // Mock verification process - simulate 2 seconds delay
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setKycCompleted(true);

      // Auto-navigate after showing success message
      setTimeout(() => {
        navigation.navigate("InformedConsent");
      }, 2000);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title={t("aadhaarKyc.title")}
          subtitle={t("aadhaarKyc.subtitle")}
        />

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="bodyLarge" style={styles.description}>
              {t("aadhaarKyc.description")}
            </Text>

            <Text variant="bodySmall" style={styles.note}>
              {t("aadhaarKyc.note")}
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.actionContainer}>
          {isVerifying ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text variant="bodyLarge" style={styles.verifyingText}>
                {t("aadhaarKyc.verifying")}
              </Text>
            </View>
          ) : isVerified ? (
            <View style={styles.successContainer}>
              <Text variant="headlineSmall" style={styles.successText}>
                ✅ {t("aadhaarKyc.success")}
              </Text>
              <Text variant="bodyMedium" style={styles.redirectText}>
                Redirecting to consent form...
              </Text>
            </View>
          ) : (
            <Button
              mode="contained"
              onPress={handleVerifyAadhaar}
              style={styles.button}
              icon="shield-check"
            >
              {t("aadhaarKyc.verifyButton")}
            </Button>
          )}
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
  card: {
    marginVertical: 24,
  },
  description: {
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 24,
  },
  note: {
    textAlign: "center",
    fontStyle: "italic",
    opacity: 0.7,
  },
  actionContainer: {
    alignItems: "center",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    alignItems: "center",
    gap: 16,
  },
  verifyingText: {
    textAlign: "center",
  },
  successContainer: {
    alignItems: "center",
    gap: 12,
  },
  successText: {
    textAlign: "center",
    color: "#4CAF50",
    fontWeight: "bold",
  },
  redirectText: {
    textAlign: "center",
    opacity: 0.7,
  },
});
