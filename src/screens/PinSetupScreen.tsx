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

type NavigationProp = StackNavigationProp<OnboardingStackParamList, "PinSetup">;

export const PinSetupScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setPinSet } = useAppStore();

  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState<string[]>(["", "", "", ""]);
  const [isPinEntered, setIsPinEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePinChange = (newPin: string[]) => {
    setPin(newPin);
    // Check if PIN is complete
    if (newPin.every((digit) => digit !== "")) {
      setIsPinEntered(true);
    } else {
      setIsPinEntered(false);
    }
  };

  const handleConfirmPinChange = (newConfirmPin: string[]) => {
    setConfirmPin(newConfirmPin);
  };

  const handleSetPin = async () => {
    const pinString = pin.join("");
    const confirmPinString = confirmPin.join("");

    if (pinString.length !== 4 || confirmPinString.length !== 4) {
      Alert.alert("Error", "Please enter a 4-digit PIN");
      return;
    }

    if (pinString !== confirmPinString) {
      Alert.alert("Error", t("pinSetup.pinMismatch"));
      setConfirmPin(["", "", "", ""]);
      return;
    }

    setIsLoading(true);

    // Mock API call to save PIN
    setTimeout(() => {
      setIsLoading(false);
      setPinSet(true);
      Alert.alert("Success", t("pinSetup.pinSet"), [
        {
          text: "OK",
          onPress: () => navigation.navigate("AadhaarKyc"),
        },
      ]);
    }, 1000);
  };

  const isPinComplete = pin.every((digit) => digit !== "");
  const isConfirmPinComplete = confirmPin.every((digit) => digit !== "");
  const canProceed = isPinComplete && isConfirmPinComplete;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title={t("pinSetup.title")}
          subtitle={t("pinSetup.subtitle")}
        />

        <View style={styles.form}>
          <View style={styles.pinSection}>
            <Text variant="bodyLarge" style={styles.label}>
              {t("pinSetup.enterPin")}
            </Text>
            <PinInput
              value={pin}
              onChange={handlePinChange}
              secureTextEntry={true}
            />
          </View>

          {isPinEntered && (
            <View style={styles.pinSection}>
              <Text variant="bodyLarge" style={styles.label}>
                {t("pinSetup.confirmPin")}
              </Text>
              <PinInput
                value={confirmPin}
                onChange={handleConfirmPinChange}
                secureTextEntry={true}
              />
            </View>
          )}

          <Button
            mode="contained"
            onPress={handleSetPin}
            loading={isLoading}
            disabled={!canProceed || isLoading}
            style={styles.button}
          >
            {t("common.continue")}
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
  form: {
    gap: 24,
  },
  pinSection: {
    alignItems: "center",
  },
  label: {
    marginBottom: 16,
    fontWeight: "bold",
  },
  button: {
    marginTop: 16,
  },
});
