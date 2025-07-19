import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, IconButton, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAppStore } from "../store/appStore";
import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { OnboardingStackParamList } from "../navigation/types";

type NavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  "VoiceConsent"
>;

export const VoiceConsentScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setVoiceConsentRecorded } = useAppStore();

  const [isRecording, setIsRecording] = useState(false);
  const [isRecorded, setIsRecorded] = useState(false);
  const [recordingTimer, setRecordingTimer] = useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTimer((prev) => {
          if (prev >= 3) {
            // Stop recording after 3 seconds (mock)
            handleStopRecording();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTimer(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingTimer(0);
    setIsRecorded(true);
    setVoiceConsentRecorded(true);
  };

  const handleContinue = () => {
    navigation.navigate("ComprehensionQuiz");
  };

  const getMicrophoneIcon = () => {
    if (isRecording) return "microphone";
    if (isRecorded) return "check-circle";
    return "microphone-outline";
  };

  const getMicrophoneColor = () => {
    if (isRecording) return "#FF5722";
    if (isRecorded) return "#4CAF50";
    return "#2196F3";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title={t("voiceConsent.title")}
          subtitle={t("voiceConsent.subtitle")}
        />

        <Card style={styles.instructionCard}>
          <Card.Content>
            <Text variant="bodyLarge" style={styles.instruction}>
              {t("voiceConsent.instruction")}
            </Text>
            <Text variant="headlineSmall" style={styles.consentText}>
              {t("voiceConsent.consentText")}
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.recordingContainer}>
          <IconButton
            icon={getMicrophoneIcon()}
            size={80}
            iconColor={getMicrophoneColor()}
            style={[
              styles.microphoneButton,
              { backgroundColor: getMicrophoneColor() + "20" },
            ]}
            onPress={
              isRecorded
                ? undefined
                : isRecording
                ? handleStopRecording
                : handleStartRecording
            }
            disabled={isRecorded}
          />

          <Text variant="bodyLarge" style={styles.statusText}>
            {isRecording
              ? `${t("voiceConsent.recording")} (${recordingTimer}s)`
              : isRecorded
              ? t("voiceConsent.consentRecorded")
              : t("voiceConsent.startRecording")}
          </Text>
        </View>

        {isRecorded && (
          <Button
            mode="contained"
            onPress={handleContinue}
            style={styles.continueButton}
            icon="arrow-right"
          >
            {t("voiceConsent.continue")}
          </Button>
        )}
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
  instructionCard: {
    marginBottom: 32,
  },
  instruction: {
    textAlign: "center",
    marginBottom: 16,
  },
  consentText: {
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#2196F3",
  },
  recordingContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  microphoneButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  statusText: {
    textAlign: "center",
    fontWeight: "bold",
    minHeight: 24,
  },
  continueButton: {
    paddingVertical: 8,
  },
});
