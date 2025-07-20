import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Text, Card, TextInput, Button, Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";

export const ReportEventScreen: React.FC = () => {
  const navigation = useNavigation();
  const [eventDescription, setEventDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [isRelatedToMedication, setIsRelatedToMedication] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const severityOptions = [
    { label: "Mild - Minor discomfort", value: "mild" },
    { label: "Moderate - Interferes with daily activities", value: "moderate" },
    { label: "Severe - Prevents normal activities", value: "severe" },
    { label: "Life-threatening", value: "life-threatening" },
  ];

  const handleSubmit = async () => {
    if (!eventDescription.trim()) {
      Alert.alert("Error", "Please describe the adverse event");
      return;
    }

    if (!severity) {
      Alert.alert("Error", "Please select the severity level");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      Alert.alert(
        "Report Submitted",
        "The trial team has been notified. Please seek medical attention if required.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <ScreenHeader
          title="Report Adverse Event"
          subtitle="Help us ensure your safety by reporting any concerning symptoms"
        />

        {/* Urgency Notice */}
        <Card style={styles.urgencyNotice}>
          <Card.Content>
            <View style={styles.noticeHeader}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={24}
                color="#F44336"
              />
              <Text variant="titleMedium" style={styles.noticeTitle}>
                Emergency Situation?
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.noticeText}>
              If this is a medical emergency, please call emergency services
              immediately or go to the nearest hospital. Do not wait to submit
              this form.
            </Text>
          </Card.Content>
        </Card>

        {/* Event Description */}
        <Card style={styles.formCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.formTitle}>
              Describe the Adverse Event
            </Text>
            <Text variant="bodyMedium" style={styles.formSubtitle}>
              Please provide as much detail as possible about what happened,
              when it occurred, and any symptoms you experienced.
            </Text>
            <TextInput
              mode="outlined"
              multiline
              numberOfLines={6}
              value={eventDescription}
              onChangeText={setEventDescription}
              placeholder="Describe your symptoms, when they started, how long they lasted, and any other relevant details..."
              style={styles.textInput}
            />
          </Card.Content>
        </Card>

        {/* Severity Selection */}
        <Card style={styles.formCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.formTitle}>
              Severity Level
            </Text>
            <Text variant="bodyMedium" style={styles.formSubtitle}>
              How would you rate the severity of this event?
            </Text>
            {severityOptions.map((option) => (
              <View key={option.value} style={styles.radioOption}>
                <Checkbox
                  status={severity === option.value ? "checked" : "unchecked"}
                  onPress={() => setSeverity(option.value)}
                />
                <Text
                  variant="bodyLarge"
                  style={styles.radioLabel}
                  onPress={() => setSeverity(option.value)}
                >
                  {option.label}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Medication Relation */}
        <Card style={styles.formCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.formTitle}>
              Medication Relation
            </Text>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isRelatedToMedication ? "checked" : "unchecked"}
                onPress={() => setIsRelatedToMedication(!isRelatedToMedication)}
              />
              <Text
                variant="bodyLarge"
                style={styles.checkboxLabel}
                onPress={() => setIsRelatedToMedication(!isRelatedToMedication)}
              >
                I believe this event may be related to the trial medication
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Important Information */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.infoTitle}>
              What happens next?
            </Text>
            <View style={styles.infoList}>
              <Text variant="bodyMedium" style={styles.infoItem}>
                • The trial medical team will be notified immediately
              </Text>
              <Text variant="bodyMedium" style={styles.infoItem}>
                • A medical professional may contact you within 24 hours
              </Text>
              <Text variant="bodyMedium" style={styles.infoItem}>
                • Your safety and well-being is our top priority
              </Text>
              <Text variant="bodyMedium" style={styles.infoItem}>
                • This report helps ensure the safety of all participants
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Submit Button */}
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.submitButton}
          buttonColor="#FF9800"
          icon="send"
        >
          {isSubmitting
            ? "Submitting Report..."
            : "Submit Adverse Event Report"}
        </Button>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    padding: 16,
  },
  urgencyNotice: {
    marginBottom: 24,
    backgroundColor: "#FFEBEE",
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
  noticeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  noticeTitle: {
    marginLeft: 8,
    color: "#F44336",
    fontWeight: "600",
  },
  noticeText: {
    color: "#666",
    lineHeight: 20,
  },
  formCard: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  formTitle: {
    color: "#333",
    fontWeight: "600",
    marginBottom: 8,
  },
  formSubtitle: {
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  textInput: {
    backgroundColor: "#fff",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioLabel: {
    marginLeft: 8,
    flex: 1,
    color: "#333",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkboxLabel: {
    marginLeft: 8,
    flex: 1,
    color: "#333",
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: "#E3F2FD",
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  infoTitle: {
    color: "#333",
    fontWeight: "600",
    marginBottom: 12,
  },
  infoList: {
    paddingLeft: 8,
  },
  infoItem: {
    color: "#666",
    lineHeight: 24,
    marginBottom: 4,
  },
  submitButton: {
    marginTop: 8,
    paddingVertical: 8,
  },
  bottomSpacer: {
    height: 32,
  },
});
