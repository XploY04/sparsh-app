import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, TextInput, Text, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAppStore } from "../store/appStore";
import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { OnboardingStackParamList } from "../navigation/types";
import { textColors, backgroundColors } from "../theme/colors";
import { authService, ActivationCredentials } from "../services/authService";
import { DevHelpScreen } from "./DevHelpScreen";

type NavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  "AccountActivation"
>;

export const AccountActivationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    setParticipantCode,
    setAuthToken,
    setAccountActivated,
    setTrialProfile,
  } = useAppStore();

  const [participantCode, setParticipantCodeLocal] = useState("");
  const [temporaryPin, setTemporaryPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDevHelp, setShowDevHelp] = useState(false);

  // Show dev help in development mode
  if (__DEV__ && showDevHelp) {
    return <DevHelpScreen onBack={() => setShowDevHelp(false)} />;
  }

  const validateInputs = (): boolean => {
    if (!participantCode.trim() || !temporaryPin.trim()) {
      Alert.alert("Error", t("accountActivation.missingFields"));
      return false;
    }

    if (temporaryPin.length !== 4 || !/^\d{4}$/.test(temporaryPin)) {
      Alert.alert("Error", "Temporary PIN must be exactly 4 digits");
      return false;
    }

    return true;
  };

  const handleActivation = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    const credentials: ActivationCredentials = {
      participantCode: participantCode.trim(),
      temporaryPin: temporaryPin,
    };

    try {
      const result = await authService.activateAccount(credentials);

      if (result.success && result.token) {
        // Store the participant code and token
        setParticipantCode(participantCode.trim());
        setAuthToken(result.token);
        setAccountActivated(true);

        // Fetch participant profile immediately after activation
        const profile = await authService.getParticipantProfile();
        if (profile) {
          setTrialProfile(profile);
        }

        Alert.alert("Success", t("accountActivation.success"), [
          {
            text: "OK",
            onPress: () => navigation.navigate("PinSetup"),
          },
        ]);
      } else {
        Alert.alert("Error", result.message || t("accountActivation.error"));
      }
    } catch (error) {
      console.error("Activation error:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <ScreenHeader
            title={t("accountActivation.title")}
            subtitle={t("accountActivation.subtitle")}
          />
          {__DEV__ && (
            <IconButton
              icon="help-circle"
              size={24}
              onPress={() => setShowDevHelp(true)}
              style={styles.helpButton}
            />
          )}
        </View>

        <View style={styles.form}>
          <TextInput
            label={t("accountActivation.participantCodeLabel")}
            placeholder={t("accountActivation.participantCodePlaceholder")}
            value={participantCode}
            onChangeText={setParticipantCodeLocal}
            mode="outlined"
            style={styles.input}
            disabled={isLoading}
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <TextInput
            label={t("accountActivation.temporaryPinLabel")}
            placeholder={t("accountActivation.temporaryPinPlaceholder")}
            value={temporaryPin}
            onChangeText={setTemporaryPin}
            keyboardType="numeric"
            maxLength={4}
            mode="outlined"
            style={styles.input}
            disabled={isLoading}
            secureTextEntry
          />

          <Button
            mode="contained"
            onPress={handleActivation}
            loading={isLoading}
            disabled={
              isLoading || !participantCode.trim() || !temporaryPin.trim()
            }
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            {isLoading
              ? t("accountActivation.activating")
              : t("accountActivation.activate")}
          </Button>

          <Text variant="bodySmall" style={styles.helpText}>
            Please use the participant code and temporary PIN provided by your
            study coordinator.
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
  header: {
    position: "relative",
  },
  helpButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: backgroundColors.card,
  },
  button: {
    marginTop: 24,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  helpText: {
    textAlign: "center",
    color: textColors.secondary,
    marginTop: 16,
    lineHeight: 20,
  },
});
