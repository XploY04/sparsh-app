import React, { useState, useRef } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, Text, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAppStore } from "../store/appStore";
import { t, getCurrentLanguage } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { informedConsentText } from "../data/mockData";
import { OnboardingStackParamList } from "../navigation/types";

type NavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  "InformedConsent"
>;

export const InformedConsentScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setConsentGiven } = useAppStore();
  const scrollViewRef = useRef<ScrollView>(null);

  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  const currentLanguage = getCurrentLanguage();
  const consentText = informedConsentText[currentLanguage];

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToEnd =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToEnd && !hasScrolledToEnd) {
      setHasScrolledToEnd(true);
    }
  };

  const handleReadAloud = () => {
    if (isReadingAloud) {
      // Stop reading
      setIsReadingAloud(false);
      Alert.alert("Info", "Reading stopped");
    } else {
      // Start reading (mock implementation)
      setIsReadingAloud(true);
      Alert.alert("Info", t("informedConsent.readingAloud"));

      // Mock reading duration - stop after 5 seconds
      setTimeout(() => {
        setIsReadingAloud(false);
      }, 5000);
    }
  };

  const handleRecordConsent = () => {
    setConsentGiven(true);
    navigation.navigate("VoiceConsent");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title={t("informedConsent.title")}
          subtitle={t("informedConsent.subtitle")}
        />

        <View style={styles.documentContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            onScroll={handleScroll}
            scrollEventThrottle={400}
            showsVerticalScrollIndicator={true}
          >
            <Text variant="bodyMedium" style={styles.consentText}>
              {consentText}
            </Text>
          </ScrollView>

          {!hasScrolledToEnd && (
            <View style={styles.scrollHint}>
              <Text variant="bodySmall" style={styles.scrollHintText}>
                {t("informedConsent.scrollToEnd")}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actionContainer}>
          <Button
            mode="outlined"
            onPress={handleReadAloud}
            style={styles.readAloudButton}
            icon={isReadingAloud ? "stop" : "volume-high"}
          >
            {isReadingAloud
              ? t("informedConsent.stopReading")
              : t("informedConsent.readAloud")}
          </Button>

          <Button
            mode="contained"
            onPress={handleRecordConsent}
            disabled={!hasScrolledToEnd}
            style={[
              styles.recordButton,
              { opacity: hasScrolledToEnd ? 1 : 0.5 },
            ]}
            icon="microphone"
          >
            {t("informedConsent.recordConsent")}
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
  },
  documentContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  consentText: {
    lineHeight: 22,
    textAlign: "justify",
  },
  scrollHint: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 8,
    alignItems: "center",
  },
  scrollHintText: {
    color: "#FF6B35",
    fontWeight: "bold",
  },
  actionContainer: {
    gap: 12,
  },
  readAloudButton: {
    marginBottom: 8,
  },
  recordButton: {
    paddingVertical: 8,
  },
});
