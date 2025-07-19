import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Card, List, Button, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppStore } from "../store/appStore";
import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";

export const ProfileScreen: React.FC = () => {
  const { language, setLanguage, resetOnboarding } = useAppStore();

  const handleLanguageChange = () => {
    const newLanguage = language === "en" ? "hi" : "en";
    setLanguage(newLanguage);
  };

  const handleLogout = () => {
    Alert.alert(t("profile.logout"), t("profile.logoutConfirm"), [
      {
        text: t("profile.cancel"),
        style: "cancel",
      },
      {
        text: t("profile.logout"),
        style: "destructive",
        onPress: () => {
          resetOnboarding();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader title={t("profile.title")} />

        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title={t("profile.participantId")}
              description="SP-2025-001"
              left={(props) => <List.Icon {...props} icon="account-circle" />}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title={t("profile.language")}
              description={language === "en" ? "English" : "हिन्दी"}
              left={(props) => <List.Icon {...props} icon="translate" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={handleLanguageChange}
            />
            <Divider />
            <List.Item
              title={t("profile.notifications")}
              description="Enabled"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
            <Divider />
            <List.Item
              title={t("profile.support")}
              description="Get help"
              left={(props) => <List.Icon {...props} icon="help-circle" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
            <Divider />
            <List.Item
              title={t("profile.about")}
              description="App version 1.0.0"
              left={(props) => <List.Icon {...props} icon="information" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
          </Card.Content>
        </Card>

        <View style={styles.logoutContainer}>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            icon="logout"
            buttonColor="#FFEBEE"
            textColor="#F44336"
          >
            {t("profile.logout")}
          </Button>
        </View>

        <View style={styles.footer}>
          <Text variant="bodySmall" style={styles.footerText}>
            Sparsh Clinical Trial App
          </Text>
          <Text variant="bodySmall" style={styles.footerText}>
            Stage 2 - Core Functionality
          </Text>
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
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  logoutContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  logoutButton: {
    paddingHorizontal: 32,
    borderColor: "#F44336",
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
  },
  footerText: {
    opacity: 0.5,
    textAlign: "center",
  },
});
