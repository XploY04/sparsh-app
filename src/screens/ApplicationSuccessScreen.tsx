import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Text, Button, Card, useTheme, Divider } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { WelcomeStackParamList } from "../navigation/types";
import { useAppStore } from "../store/appStore";

type ApplicationSuccessNavigationProp = StackNavigationProp<
  WelcomeStackParamList,
  "ApplicationSuccess"
>;

type ApplicationSuccessRouteProp = RouteProp<
  WelcomeStackParamList,
  "ApplicationSuccess"
>;

interface Props {
  navigation: ApplicationSuccessNavigationProp;
  route: ApplicationSuccessRouteProp;
}

const { height } = Dimensions.get("window");

export const ApplicationSuccessScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const { language } = useAppStore();
  const { trialTitle } = route.params;

  const isHindi = language === "hi";

  const texts = {
    en: {
      title: "Application Submitted!",
      subtitle: "Thank you for your interest in clinical research",
      description: `Your application for "${trialTitle}" has been successfully submitted and is now under review by our research team.`,
      whatNext: "What happens next?",
      steps: [
        {
          step: "1",
          title: "Application Review",
          description:
            "Our team will review your application within 2-3 business days",
        },
        {
          step: "2",
          title: "Screening Call",
          description:
            "If eligible, we'll contact you for a brief screening interview",
        },
        {
          step: "3",
          title: "Medical Evaluation",
          description:
            "Complete medical assessments to confirm your eligibility",
        },
        {
          step: "4",
          title: "Trial Enrollment",
          description: "Begin your participation in the clinical trial",
        },
      ],
      importantInfo: "Important Information",
      infoPoints: [
        "We will contact you within 2-3 business days",
        "Please keep your phone available for screening calls",
        "You may be asked to provide additional medical records",
        "Participation is voluntary and you can withdraw at any time",
      ],
      contact: "Need Help?",
      contactDesc:
        "If you have any questions or need to update your information, please contact our research team.",
      email: "Email: trials@sparsh.com",
      phone: "Phone: 1800-SPARSH-1 (1800-772-7741)",
      findMoreTrials: "Find More Trials",
      activateAccount: "Activate My Account",
      backToHome: "Back to Home",
    },
    hi: {
      title: "आवेदन जमा हुआ!",
      subtitle: "क्लिनिकल रिसर्च में आपकी रुचि के लिए धन्यवाद",
      description: `"${trialTitle}" के लिए आपका आवेदन सफलतापूर्वक जमा हो गया है और अब हमारी अनुसंधान टीम द्वारा इसकी समीक्षा की जा रही है।`,
      whatNext: "आगे क्या होगा?",
      steps: [
        {
          step: "1",
          title: "आवेदन समीक्षा",
          description:
            "हमारी टीम 2-3 व्यावसायिक दिनों के भीतर आपके आवेदन की समीक्षा करेगी",
        },
        {
          step: "2",
          title: "स्क्रीनिंग कॉल",
          description:
            "यदि योग्य हैं, तो हम एक संक्षिप्त स्क्रीनिंग साक्षात्कार के लिए आपसे संपर्क करेंगे",
        },
        {
          step: "3",
          title: "चिकित्सा मूल्यांकन",
          description:
            "आपकी पात्रता की पुष्टि के लिए संपूर्ण चिकित्सा आकलन पूरा करें",
        },
        {
          step: "4",
          title: "ट्रायल नामांकन",
          description: "क्लिनिकल ट्रायल में अपनी भागीदारी शुरू करें",
        },
      ],
      importantInfo: "महत्वपूर्ण जानकारी",
      infoPoints: [
        "हम 2-3 व्यावसायिक दिनों के भीतर आपसे संपर्क करेंगे",
        "कृपया स्क्रीनिंग कॉल के लिए अपना फ़ोन उपलब्ध रखें",
        "आपसे अतिरिक्त चिकित्सा रिकॉर्ड प्रदान करने को कहा जा सकता है",
        "भागीदारी स्वैच्छिक है और आप किसी भी समय वापस ले सकते हैं",
      ],
      contact: "सहायता चाहिए?",
      contactDesc:
        "यदि आपके कोई प्रश्न हैं या आपको अपनी जानकारी अपडेट करनी है, तो कृपया हमारी अनुसंधान टीम से संपर्क करें।",
      email: "ईमेल: trials@sparsh.com",
      phone: "फ़ोन: 1800-SPARSH-1 (1800-772-7741)",
      findMoreTrials: "और ट्रायल्स खोजें",
      activateAccount: "अपना खाता सक्रिय करें",
      backToHome: "होम पर वापस जाएं",
    },
  };

  const currentTexts = texts[language];

  const handleFindMoreTrials = () => {
    navigation.navigate("TrialQuestionnaire");
  };

  const handleActivateAccount = () => {
    // Navigate to the existing onboarding flow
    navigation.navigate("Onboarding" as any);
  };

  const handleBackToHome = () => {
    navigation.navigate("Welcome");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.successIcon}>
          <Text style={[styles.checkmark, { color: theme.colors.tertiary }]}>
            ✅
          </Text>
        </View>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          {currentTexts.title}
        </Text>
        <Text
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          {currentTexts.subtitle}
        </Text>
        <Text
          style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
        >
          {currentTexts.description}
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          style={[styles.stepsCard, { backgroundColor: theme.colors.surface }]}
        >
          <Card.Content>
            <Text style={[styles.cardTitle, { color: theme.colors.primary }]}>
              {currentTexts.whatNext}
            </Text>

            {currentTexts.steps.map((step, index) => (
              <View key={step.step}>
                <View style={styles.stepContainer}>
                  <View
                    style={[
                      styles.stepNumber,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepNumberText,
                        { color: theme.colors.onPrimary },
                      ]}
                    >
                      {step.step}
                    </Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text
                      style={[
                        styles.stepTitle,
                        { color: theme.colors.onSurface },
                      ]}
                    >
                      {step.title}
                    </Text>
                    <Text
                      style={[
                        styles.stepDescription,
                        { color: theme.colors.onSurfaceVariant },
                      ]}
                    >
                      {step.description}
                    </Text>
                  </View>
                </View>
                {index < currentTexts.steps.length - 1 && (
                  <View
                    style={[
                      styles.stepConnector,
                      { backgroundColor: theme.colors.outline },
                    ]}
                  />
                )}
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card
          style={[
            styles.infoCard,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          <Card.Content>
            <Text style={[styles.cardTitle, { color: theme.colors.primary }]}>
              {currentTexts.importantInfo}
            </Text>

            {currentTexts.infoPoints.map((point, index) => (
              <View key={index} style={styles.infoPoint}>
                <Text style={[styles.bullet, { color: theme.colors.tertiary }]}>
                  •
                </Text>
                <Text
                  style={[
                    styles.infoText,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  {point}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card
          style={[
            styles.contactCard,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Card.Content>
            <Text style={[styles.cardTitle, { color: theme.colors.primary }]}>
              {currentTexts.contact}
            </Text>
            <Text
              style={[
                styles.contactDescription,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {currentTexts.contactDesc}
            </Text>

            <Divider style={styles.divider} />

            <View style={styles.contactDetails}>
              <Text
                style={[
                  styles.contactDetail,
                  { color: theme.colors.onSurface },
                ]}
              >
                {currentTexts.email}
              </Text>
              <Text
                style={[
                  styles.contactDetail,
                  { color: theme.colors.onSurface },
                ]}
              >
                {currentTexts.phone}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            onPress={handleFindMoreTrials}
            style={[styles.actionButton, { borderColor: theme.colors.primary }]}
            contentStyle={styles.buttonContent}
            labelStyle={{ color: theme.colors.primary }}
          >
            {currentTexts.findMoreTrials}
          </Button>

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

          <Button
            mode="contained"
            onPress={handleBackToHome}
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.primary },
            ]}
            contentStyle={styles.buttonContent}
          >
            {currentTexts.backToHome}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  successIcon: {
    marginBottom: 16,
  },
  checkmark: {
    fontSize: 64,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  content: {
    padding: 20,
  },
  stepsCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 16,
  },
  infoCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 16,
  },
  contactCard: {
    marginBottom: 24,
    elevation: 2,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  stepConnector: {
    width: 2,
    height: 20,
    marginLeft: 15,
    marginBottom: 8,
  },
  infoPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  infoText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 18,
  },
  contactDescription: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 16,
  },
  divider: {
    marginBottom: 16,
  },
  contactDetails: {
    gap: 8,
  },
  contactDetail: {
    fontSize: 14,
    fontWeight: "500",
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
