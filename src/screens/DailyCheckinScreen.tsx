import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Button, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAppStore } from "../store/appStore";
import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { MainStackParamList } from "../navigation/types";

type DailyCheckinNavigationProp = StackNavigationProp<MainStackParamList>;

export const DailyCheckinScreen: React.FC = () => {
  const navigation = useNavigation<DailyCheckinNavigationProp>();
  const { updateTaskStatus, recordCheckin } = useAppStore();
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const mockResponses = [
    "I feel fine, just a mild headache.",
    "I'm feeling good today, no side effects.",
    "I have some nausea but it's manageable.",
    "Everything is normal, feeling well.",
    "A bit tired but overall okay.",
  ];

  const handleMicPress = () => {
    if (isListening) return;

    setIsListening(true);
    setTranscribedText("");
    setShowConfirmation(false);

    // Simulate listening for 3 seconds
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);

      // Simulate processing for 2 seconds
      setTimeout(() => {
        const randomResponse =
          mockResponses[Math.floor(Math.random() * mockResponses.length)];
        setTranscribedText(randomResponse);
        setIsProcessing(false);
        setShowConfirmation(true);
      }, 2000);
    }, 3000);
  };

  const handleConfirm = () => {
    // Update the task status to completed
    updateTaskStatus("1", "completed"); // Assuming task ID "1" is daily check-in

    // Record the check-in for gamification (this awards points and updates streaks)
    recordCheckin();

    // Show success message and navigate back
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  const handleTryAgain = () => {
    setTranscribedText("");
    setShowConfirmation(false);
  };

  const getMicrophoneIcon = () => {
    if (isListening) return "microphone";
    if (isProcessing) return "microphone-settings";
    return "microphone-outline";
  };

  const getMicrophoneColor = () => {
    if (isListening) return "#F44336";
    if (isProcessing) return "#FF9800";
    return "#2196F3";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title={t("dailyCheckin.title")}
          subtitle={t("dailyCheckin.subtitle")}
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <Card style={styles.chatCard}>
          <Card.Content>
            <View style={styles.botMessage}>
              <Text variant="bodyLarge" style={styles.promptText}>
                {t("dailyCheckin.prompt")}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.microphoneContainer}>
          <IconButton
            icon={getMicrophoneIcon()}
            iconColor={getMicrophoneColor()}
            size={80}
            style={[
              styles.microphoneButton,
              {
                backgroundColor: isListening ? "#FFEBEE" : "#E3F2FD",
                borderColor: getMicrophoneColor(),
              },
            ]}
            onPress={handleMicPress}
            disabled={isListening || isProcessing}
          />

          <Text variant="bodyMedium" style={styles.microphoneLabel}>
            {isListening
              ? t("dailyCheckin.listening")
              : isProcessing
              ? t("dailyCheckin.processing")
              : t("dailyCheckin.tapToSpeak")}
          </Text>
        </View>

        {transcribedText && (
          <Card style={styles.transcriptionCard}>
            <Card.Content>
              <Text variant="bodyLarge" style={styles.transcribedText}>
                {t("dailyCheckin.transcribed", { text: transcribedText })}
              </Text>
            </Card.Content>
          </Card>
        )}

        {showConfirmation && (
          <View style={styles.confirmationContainer}>
            <Text variant="titleMedium" style={styles.confirmationText}>
              {t("dailyCheckin.isCorrect")}
            </Text>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleConfirm}
                style={styles.confirmButton}
                icon="check"
              >
                {t("dailyCheckin.yes")}
              </Button>

              <Button
                mode="outlined"
                onPress={handleTryAgain}
                style={styles.retryButton}
                icon="refresh"
              >
                {t("dailyCheckin.tryAgain")}
              </Button>
            </View>
          </View>
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
  },
  chatCard: {
    marginBottom: 32,
    elevation: 2,
  },
  botMessage: {
    padding: 16,
    backgroundColor: "#E8F5E8",
    borderRadius: 12,
  },
  promptText: {
    lineHeight: 24,
  },
  microphoneContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  microphoneButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    marginBottom: 16,
  },
  microphoneLabel: {
    textAlign: "center",
    fontWeight: "500",
  },
  transcriptionCard: {
    marginBottom: 24,
    backgroundColor: "#F5F5F5",
  },
  transcribedText: {
    fontStyle: "italic",
    lineHeight: 24,
  },
  confirmationContainer: {
    alignItems: "center",
  },
  confirmationText: {
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
  },
  confirmButton: {
    paddingHorizontal: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
  },
});
