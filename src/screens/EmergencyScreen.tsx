import React from "react";
import { View, StyleSheet, ScrollView, Linking, Alert } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { textColors, backgroundColors } from "../theme/colors";

export const EmergencyScreen: React.FC = () => {
  const navigation = useNavigation();

  const emergencyContacts = [
    {
      title: "Trial Medical Team",
      number: "+91-11-2345-6789",
      description: "24/7 medical support for trial participants",
      icon: "hospital-box",
    },
    {
      title: "Emergency Hotline",
      number: "+91-11-1234-5678",
      description: "Immediate emergency medical assistance",
      icon: "phone-alert",
    },
    {
      title: "Principal Investigator",
      number: "+91-98765-43210",
      description: "Dr. Smith - Lead researcher for this trial",
      icon: "account-doctor",
    },
    {
      title: "Local Emergency",
      number: "108",
      description: "National emergency services",
      icon: "ambulance",
    },
  ];

  const handleCallPress = (number: string, title: string) => {
    Alert.alert(
      "Make Emergency Call",
      `Are you sure you want to call ${title} at ${number}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Call",
          onPress: () => {
            Linking.openURL(`tel:${number}`).catch((err) => {
              Alert.alert("Error", "Unable to make phone call");
            });
          },
        },
      ]
    );
  };

  const handleReportEvent = () => {
    navigation.navigate("ReportEvent" as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <ScreenHeader
          title="Emergency Support"
          subtitle="Get immediate help when you need it"
        />

        {/* Emergency Notice */}
        <Card style={styles.emergencyNotice}>
          <Card.Content>
            <View style={styles.noticeHeader}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={24}
                color="#F44336"
              />
              <Text variant="titleMedium" style={styles.noticeTitle}>
                Medical Emergency?
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.noticeText}>
              If you're experiencing a serious medical emergency, call your
              local emergency services immediately or go to the nearest
              hospital.
            </Text>
          </Card.Content>
        </Card>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            24/7 Emergency Contacts
          </Text>
          <Text variant="bodyMedium" style={styles.sectionSubtitle}>
            These numbers are available round the clock for any trial-related
            emergencies
          </Text>

          {emergencyContacts.map((contact, index) => (
            <Card key={index} style={styles.contactCard}>
              <Card.Content>
                <View style={styles.contactHeader}>
                  <MaterialCommunityIcons
                    name={contact.icon as any}
                    size={24}
                    color="#6200EE"
                  />
                  <View style={styles.contactInfo}>
                    <Text variant="titleMedium" style={styles.contactTitle}>
                      {contact.title}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={styles.contactDescription}
                    >
                      {contact.description}
                    </Text>
                  </View>
                </View>
                <View style={styles.contactActions}>
                  <Text variant="titleMedium" style={styles.phoneNumber}>
                    {contact.number}
                  </Text>
                  <Button
                    mode="contained"
                    onPress={() =>
                      handleCallPress(contact.number, contact.title)
                    }
                    style={styles.callButton}
                    icon="phone"
                  >
                    Call
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Report Adverse Event */}
        <Card style={styles.reportCard}>
          <Card.Content>
            <View style={styles.reportHeader}>
              <MaterialCommunityIcons
                name="file-document-edit"
                size={32}
                color="#FF9800"
              />
              <Text variant="titleLarge" style={styles.reportTitle}>
                Report a Serious Adverse Event
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.reportDescription}>
              If you're experiencing any serious side effects or adverse events
              related to the trial medication, please report them immediately.
              Your safety is our top priority.
            </Text>
            <Button
              mode="contained"
              onPress={handleReportEvent}
              style={styles.reportButton}
              icon="alert-circle"
              buttonColor="#FF9800"
            >
              Report Adverse Event
            </Button>
          </Card.Content>
        </Card>

        {/* Additional Information */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.infoTitle}>
              What constitutes a serious adverse event?
            </Text>
            <View style={styles.infoList}>
              <Text variant="bodyMedium" style={styles.infoItem}>
                • Severe allergic reactions or anaphylaxis
              </Text>
              <Text variant="bodyMedium" style={styles.infoItem}>
                • Hospitalization or prolonged hospital stay
              </Text>
              <Text variant="bodyMedium" style={styles.infoItem}>
                • Life-threatening conditions
              </Text>
              <Text variant="bodyMedium" style={styles.infoItem}>
                • Significant disability or incapacity
              </Text>
              <Text variant="bodyMedium" style={styles.infoItem}>
                • Any event you feel is serious or concerning
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
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
    padding: 16,
  },
  emergencyNotice: {
    marginBottom: 24,
    backgroundColor: backgroundColors.error,
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
    color: textColors.error,
    fontWeight: "600",
  },
  noticeText: {
    color: textColors.secondary,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
    color: textColors.primary,
  },
  sectionSubtitle: {
    color: textColors.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  contactCard: {
    marginBottom: 12,
    backgroundColor: backgroundColors.card,
  },
  contactHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactTitle: {
    color: textColors.primary,
    fontWeight: "600",
    marginBottom: 4,
  },
  contactDescription: {
    color: textColors.secondary,
    lineHeight: 18,
  },
  contactActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  phoneNumber: {
    color: "#6200EE",
    fontWeight: "600",
  },
  callButton: {
    minWidth: 80,
  },
  reportCard: {
    marginBottom: 24,
    backgroundColor: backgroundColors.warning,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  reportHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  reportTitle: {
    marginTop: 8,
    textAlign: "center",
    color: textColors.primary,
    fontWeight: "600",
  },
  reportDescription: {
    textAlign: "center",
    color: textColors.secondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  reportButton: {
    alignSelf: "center",
    minWidth: 200,
  },
  infoCard: {
    backgroundColor: backgroundColors.card,
    marginBottom: 24,
  },
  infoTitle: {
    color: textColors.primary,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoList: {
    paddingLeft: 8,
  },
  infoItem: {
    color: textColors.secondary,
    lineHeight: 24,
    marginBottom: 4,
  },
});
