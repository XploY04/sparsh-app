import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text, Button, Divider, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { MockApiService } from "../services/mockApiService";
import { backgroundColors, textColors } from "../theme/colors";

interface DevHelpScreenProps {
  onBack?: () => void;
}

export const DevHelpScreen: React.FC<DevHelpScreenProps> = ({ onBack }) => {
  const mockParticipants = MockApiService.getMockParticipants();

  const resetMockData = () => {
    MockApiService.resetMockData();
    alert("Mock data reset successfully!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text variant="headlineMedium" style={styles.title}>
              Development Helper
            </Text>
            {onBack && (
              <IconButton
                icon="close"
                size={24}
                onPress={onBack}
                style={styles.closeButton}
              />
            )}
          </View>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Use these credentials to test the activation flow
          </Text>

          <Divider style={styles.divider} />

          <Text variant="titleLarge" style={styles.sectionTitle}>
            Mock Participant Credentials
          </Text>

          {mockParticipants.map((participant, index) => (
            <Card key={index} style={styles.card}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.cardTitle}>
                  Participant {index + 1}
                </Text>
                <View style={styles.credentialRow}>
                  <Text variant="bodyMedium" style={styles.label}>
                    Participant Code:
                  </Text>
                  <Text variant="bodyMedium" style={styles.value}>
                    {participant.participantCode}
                  </Text>
                </View>
                <View style={styles.credentialRow}>
                  <Text variant="bodyMedium" style={styles.label}>
                    Temporary PIN:
                  </Text>
                  <Text variant="bodyMedium" style={styles.value}>
                    {participant.temporaryPin}
                  </Text>
                </View>
                <View style={styles.credentialRow}>
                  <Text variant="bodyMedium" style={styles.label}>
                    Status:
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={[
                      styles.value,
                      { color: participant.activated ? "#4CAF50" : "#FF5722" },
                    ]}
                  >
                    {participant.activated ? "Activated" : "Not Activated"}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}

          <Divider style={styles.divider} />

          <Text variant="titleLarge" style={styles.sectionTitle}>
            Flow Instructions
          </Text>

          <Card style={styles.card}>
            <Card.Content>
              <Text variant="bodyMedium" style={styles.instruction}>
                1. Start the app and select your language
              </Text>
              <Text variant="bodyMedium" style={styles.instruction}>
                2. Use one of the participant codes and temporary PINs above
              </Text>
              <Text variant="bodyMedium" style={styles.instruction}>
                3. Create a new permanent PIN
              </Text>
              <Text variant="bodyMedium" style={styles.instruction}>
                4. Read and accept the dynamic consent form
              </Text>
              <Text variant="bodyMedium" style={styles.instruction}>
                5. Complete the comprehension quiz
              </Text>
              <Text variant="bodyMedium" style={styles.instruction}>
                6. Land on the main dashboard with bottom tabs
              </Text>
            </Card.Content>
          </Card>

          <Button
            mode="outlined"
            onPress={resetMockData}
            style={styles.resetButton}
            icon="refresh"
          >
            Reset Mock Data
          </Button>

          <Text variant="bodySmall" style={styles.note}>
            Note: This screen is only visible in development mode
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColors.screen,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    position: "relative",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    color: textColors.primary,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 16,
    color: textColors.secondary,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    marginBottom: 12,
    color: textColors.primary,
    fontWeight: "600",
  },
  card: {
    marginBottom: 12,
    backgroundColor: backgroundColors.card,
  },
  cardTitle: {
    marginBottom: 8,
    color: textColors.primary,
    fontWeight: "600",
  },
  credentialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    color: textColors.secondary,
    fontWeight: "500",
  },
  value: {
    color: textColors.primary,
    fontWeight: "600",
  },
  instruction: {
    marginBottom: 8,
    lineHeight: 20,
    color: textColors.primary,
  },
  resetButton: {
    marginTop: 16,
    marginBottom: 16,
  },
  note: {
    textAlign: "center",
    color: textColors.tertiary,
    fontStyle: "italic",
  },
});
