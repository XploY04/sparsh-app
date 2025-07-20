import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Text, Button, Card, useTheme } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { WelcomeStackParamList } from "../navigation/types";
import { useAppStore } from "../store/appStore";

type WelcomeScreenNavigationProp = StackNavigationProp<
  WelcomeStackParamList,
  "Welcome"
>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const { height, width } = Dimensions.get("window");

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { language } = useAppStore();

  const isHindi = language === "hi";

  const texts = {
    en: {
      title: "Welcome to Sparsh",
      subtitle: "Your Gateway to Clinical Trials",
      description:
        "Discover clinical trials that match your health profile and contribute to advancing medical research while accessing cutting-edge treatments.",
      findTrial: "Find a Trial For Me",
      findTrialSubtext: "Answer a few questions to find suitable trials",
      activateAccount: "Activate My Account",
      activateSubtext: "I'm already enrolled in a trial",
      benefits: [
        "Access to innovative treatments",
        "Expert medical care",
        "Contribute to medical research",
        "Comprehensive health monitoring",
      ],
    },
    hi: {
      title: "स्पर्श में आपका स्वागत है",
      subtitle: "क्लिनिकल ट्रायल्स का आपका गेटवे",
      description:
        "अपने स्वास्थ्य प्रोफाइल से मेल खाने वाले क्लिनिकल ट्रायल खोजें और अत्याधुनिक उपचारों तक पहुंच प्राप्त करते हुए चिकित्सा अनुसंधान को आगे बढ़ाने में योगदान दें।",
      findTrial: "मेरे लिए ट्रायल खोजें",
      findTrialSubtext: "उपयुक्त ट्रायल खोजने के लिए कुछ प्रश्नों के उत्तर दें",
      activateAccount: "अपना खाता सक्रिय करें",
      activateSubtext: "मैं पहले से ही एक ट्रायल में नामांकित हूं",
      benefits: [
        "नवाचार उपचारों तक पहुंच",
        "विशेषज्ञ चिकित्सा देखभाल",
        "चिकित्सा अनुसंधान में योगदान",
        "व्यापक स्वास्थ्य निगरानी",
      ],
    },
  };

  const currentTexts = texts[language];

  const handleFindTrial = () => {
    navigation.navigate("TrialQuestionnaire");
  };

  const handleActivateAccount = () => {
    // Navigate to the existing onboarding flow
    (navigation as any).navigate("Onboarding");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={{
          uri: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjIwMEVFO3N0b3Atb3BhY2l0eTowLjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzIxOTZGMztzdG9wLW9wYWNpdHk6MC4wNSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPHN2Zz4K",
        }}
        style={styles.headerBackground}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            {currentTexts.title}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
            {currentTexts.subtitle}
          </Text>
          <Text
            style={[
              styles.description,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            {currentTexts.description}
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Card
          style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
        >
          <Card.Content style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Text style={[styles.icon, { color: theme.colors.primary }]}>
                🔍
              </Text>
            </View>
            <Text style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
              {currentTexts.findTrial}
            </Text>
            <Text
              style={[
                styles.cardSubtext,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {currentTexts.findTrialSubtext}
            </Text>
            <Button
              mode="contained"
              onPress={handleFindTrial}
              style={[
                styles.actionButton,
                { backgroundColor: theme.colors.primary },
              ]}
              contentStyle={styles.buttonContent}
              labelStyle={{ color: theme.colors.onPrimary }}
            >
              {currentTexts.findTrial}
            </Button>
          </Card.Content>
        </Card>

        <Card
          style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
        >
          <Card.Content style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Text style={[styles.icon, { color: theme.colors.secondary }]}>
                🔑
              </Text>
            </View>
            <Text style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
              {currentTexts.activateAccount}
            </Text>
            <Text
              style={[
                styles.cardSubtext,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {currentTexts.activateSubtext}
            </Text>
            <Button
              mode="outlined"
              onPress={handleActivateAccount}
              style={[
                styles.actionButton,
                { borderColor: theme.colors.secondary },
              ]}
              contentStyle={styles.buttonContent}
              labelStyle={{ color: theme.colors.secondary }}
            >
              {currentTexts.activateAccount}
            </Button>
          </Card.Content>
        </Card>

        <Card
          style={[
            styles.benefitsCard,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          <Card.Content>
            <Text
              style={[styles.benefitsTitle, { color: theme.colors.onSurface }]}
            >
              {isHindi ? "मुख्य लाभ" : "Key Benefits"}
            </Text>
            {currentTexts.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Text
                  style={[styles.benefitIcon, { color: theme.colors.tertiary }]}
                >
                  ✓
                </Text>
                <Text
                  style={[
                    styles.benefitText,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  {benefit}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    height: height * 0.4,
    justifyContent: "center",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "500",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: -40,
  },
  actionCard: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 16,
  },
  cardContent: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 16,
  },
  icon: {
    fontSize: 48,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  cardSubtext: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  actionButton: {
    width: "100%",
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  benefitsCard: {
    marginTop: 8,
    borderRadius: 16,
    elevation: 2,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  benefitIcon: {
    fontSize: 16,
    marginRight: 12,
    fontWeight: "bold",
  },
  benefitText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
});
