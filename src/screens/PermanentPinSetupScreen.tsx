import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAppStore } from "../store/appStore";
import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { PinInput } from "../components/PinInput";
import { OnboardingStackParamList } from "../navigation/types";
import { textColors, backgroundColors } from "../theme/colors";

type NavigationProp = StackNavigationProp<OnboardingStackParamList, "PinSetup">;

export const PermanentPinSetupScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setPinSet } = useAppStore();

  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState<string[]>(["", "", "", ""]);
  const [step, setStep] = useState<"enter" | "confirm">("enter");
  const [isLoading, setIsLoading] = useState(false);

  const handlePinChange = (newPin: string[]) => {
    if (step === "enter") {
      setPin(newPin);
      // Auto-advance to confirmation when pin is complete
      if (newPin.every((digit) => digit !== "")) {
        setTimeout(() => setStep("confirm"), 300);
      }
    } else {
      setConfirmPin(newPin);
    }
  };

  const handleConfirmPin = async () => {
    const pinString = pin.join("");
    const confirmPinString = confirmPin.join("");

    if (pinString !== confirmPinString) {
      Alert.alert("Error", t("permanentPin.pinMismatch"));
      // Reset confirmation and go back to enter step
      setConfirmPin(["", "", "", ""]);
      setStep("enter");
      return;
    }

    setIsLoading(true);

    // Simulate PIN storage (in real app, you'd hash and store securely)
    setTimeout(() => {
      setPinSet(true);
      setIsLoading(false);

      Alert.alert("Success", t("permanentPin.pinSet"), [
        {
          text: t("permanentPin.continue"),
          onPress: () => navigation.navigate("InformedConsent"),
        },
      ]);
    }, 1000);
  };

  const handleBackToEnter = () => {
    setStep("enter");
    setConfirmPin(["", "", "", ""]);
  };

  const isComplete =
    step === "enter"
      ? pin.every((digit) => digit !== "")
      : confirmPin.every((digit) => digit !== "");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title={t("permanentPin.title")}
          subtitle={t("permanentPin.subtitle")}
        />

        <View style={styles.form}>
          <View style={styles.pinContainer}>
            <Text variant="bodyLarge" style={styles.label}>
              {step === "enter"
                ? t("permanentPin.enterPin")
                : t("permanentPin.confirmPin")}
            </Text>

            <PinInput
              value={step === "enter" ? pin : confirmPin}
              onChange={handlePinChange}
            />

            {step === "enter" && pin.every((digit) => digit !== "") && (
              <Text variant="bodySmall" style={styles.successText}>
                ✓ PIN entered successfully
              </Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            {step === "confirm" && (
              <>
                <Button
                  mode="outlined"
                  onPress={handleBackToEnter}
                  disabled={isLoading}
                  style={styles.backButton}
                >
                  Back to Edit PIN
                </Button>

                <Button
                  mode="contained"
                  onPress={handleConfirmPin}
                  loading={isLoading}
                  disabled={isLoading || !isComplete}
                  style={styles.confirmButton}
                >
                  Confirm PIN
                </Button>
              </>
            )}
          </View>

          <Text variant="bodySmall" style={styles.helpText}>
            This PIN will be used to secure your account and access sensitive
            features. Please choose a PIN that is easy for you to remember but
            difficult for others to guess.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColors.screen,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  form: {
    alignItems: "center",
    gap: 32,
  },
  pinContainer: {
    alignItems: "center",
    gap: 16,
    width: "100%",
  },
  label: {
    fontWeight: "600",
    color: textColors.primary,
    textAlign: "center",
  },
  successText: {
    color: "#4CAF50",
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  backButton: {
    marginBottom: 8,
  },
  confirmButton: {
    paddingVertical: 8,
  },
  helpText: {
    textAlign: "center",
    color: textColors.secondary,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
});
