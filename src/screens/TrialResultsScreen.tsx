import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import {
  Text,
  Button,
  Card,
  useTheme,
  IconButton,
  Chip,
  ActivityIndicator,
  Divider,
} from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { WelcomeStackParamList } from "../navigation/types";
import { useAppStore } from "../store/appStore";

type TrialResultsNavigationProp = StackNavigationProp<
  WelcomeStackParamList,
  "TrialResults"
>;

type TrialResultsRouteProp = RouteProp<WelcomeStackParamList, "TrialResults">;

interface Props {
  navigation: TrialResultsNavigationProp;
  route: TrialResultsRouteProp;
}

interface Trial {
  id: string;
  title: string;
  description: string;
  condition: string;
  phase: string;
  location: string;
  duration: string;
  compensation: string;
  requirements: string[];
  matchScore: number;
  principalInvestigator: string;
  contactEmail: string;
  contactPhone: string;
  status: "recruiting" | "active" | "completed";
}

// Mock trial data - In real implementation, this would come from the API
const mockTrials: Trial[] = [
  {
    id: "trial-001",
    title: "Diabetes Management Study",
    description:
      "A clinical trial testing a new medication for Type 2 diabetes management with improved glucose control and reduced side effects.",
    condition: "Type 2 Diabetes",
    phase: "Phase 3",
    location: "Mumbai, Delhi, Bangalore",
    duration: "12 months",
    compensation: "₹15,000 per visit",
    requirements: ["Age 25-65", "Type 2 Diabetes", "HbA1c > 7%"],
    matchScore: 95,
    principalInvestigator: "Dr. Rajesh Kumar",
    contactEmail: "diabetes.study@sparsh.com",
    contactPhone: "+91-98765-43210",
    status: "recruiting",
  },
  {
    id: "trial-002",
    title: "Hypertension Prevention Trial",
    description:
      "Research study evaluating a novel approach to preventing high blood pressure in at-risk adults through lifestyle intervention and medication.",
    condition: "Hypertension",
    phase: "Phase 2",
    location: "Chennai, Pune, Hyderabad",
    duration: "8 months",
    compensation: "₹10,000 per visit",
    requirements: ["Age 30-60", "Pre-hypertensive", "BMI 25-35"],
    matchScore: 87,
    principalInvestigator: "Dr. Priya Sharma",
    contactEmail: "hypertension.study@sparsh.com",
    contactPhone: "+91-98765-43211",
    status: "recruiting",
  },
  {
    id: "trial-003",
    title: "Heart Health Monitoring Study",
    description:
      "Long-term study monitoring heart health indicators using wearable devices and regular check-ups to prevent cardiovascular disease.",
    condition: "Cardiovascular Prevention",
    phase: "Observational",
    location: "Kolkata, Jaipur, Lucknow",
    duration: "24 months",
    compensation: "₹8,000 per visit",
    requirements: [
      "Age 40-70",
      "No heart disease history",
      "Willing to wear device",
    ],
    matchScore: 78,
    principalInvestigator: "Dr. Amit Patel",
    contactEmail: "heart.study@sparsh.com",
    contactPhone: "+91-98765-43212",
    status: "recruiting",
  },
];

export const TrialResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const { language } = useAppStore();
  const { answers } = route.params;

  const [trials, setTrials] = useState<Trial[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const isHindi = language === "hi";

  const texts = {
    en: {
      title: "Matching Trials",
      subtitle:
        "Based on your answers, here are trials you may be eligible for:",
      noTrials: "No matching trials found",
      noTrialsDesc:
        "We couldn't find any trials matching your criteria at this time. Please check back later or contact us for assistance.",
      matchScore: "Match Score",
      phase: "Phase",
      duration: "Duration",
      location: "Location",
      compensation: "Compensation",
      requirements: "Requirements",
      apply: "Apply Now",
      contact: "Contact Information",
      pi: "Principal Investigator",
      email: "Email",
      phone: "Phone",
      retry: "Try Again",
      loading: "Finding matching trials...",
    },
    hi: {
      title: "मैचिंग ट्रायल्स",
      subtitle:
        "आपके उत्तरों के आधार पर, यहां वे ट्रायल्स हैं जिनके लिए आप पात्र हो सकते हैं:",
      noTrials: "कोई मैचिंग ट्रायल नहीं मिला",
      noTrialsDesc:
        "हम इस समय आपके मापदंडों से मेल खाने वाले कोई ट्रायल नहीं खोज सके। कृपया बाद में जांचें या सहायता के लिए हमसे संपर्क करें।",
      matchScore: "मैच स्कोर",
      phase: "चरण",
      duration: "अवधि",
      location: "स्थान",
      compensation: "मुआवजा",
      requirements: "आवश्यकताएं",
      apply: "अभी आवेदन करें",
      contact: "संपर्क जानकारी",
      pi: "मुख्य अन्वेषक",
      email: "ईमेल",
      phone: "फ़ोन",
      retry: "पुनः प्रयास करें",
      loading: "मैचिंग ट्रायल्स खोजे जा रहे हैं...",
    },
  };

  const currentTexts = texts[language];

  useEffect(() => {
    fetchTrials();
  }, []);

  const fetchTrials = async () => {
    try {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In real implementation, call: GET /api/trials/public
      // const response = await fetch('/api/trials/public', {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      // const data = await response.json();

      // For now, use mock data and filter based on answers
      const filteredTrials = mockTrials.filter((trial) => {
        // Simple matching logic based on answers
        let matches = true;

        // Age matching
        if (answers.age && (answers.age < 25 || answers.age > 70)) {
          matches = false;
        }

        // Condition matching
        if (answers.conditions && Array.isArray(answers.conditions)) {
          const hasRelevantCondition = answers.conditions.some(
            (condition) =>
              trial.condition.toLowerCase().includes(condition) ||
              trial.description.toLowerCase().includes(condition)
          );
          if (!hasRelevantCondition && !answers.conditions.includes("none")) {
            // If user has specific conditions, show relevant trials
            const conditionKeywords = ["diabetes", "hypertension", "heart"];
            const userHasTrackedCondition = answers.conditions.some(
              (condition) => conditionKeywords.includes(condition)
            );
            if (userHasTrackedCondition) {
              matches = hasRelevantCondition;
            }
          }
        }

        return matches;
      });

      // Sort by match score
      filteredTrials.sort((a, b) => b.matchScore - a.matchScore);

      setTrials(filteredTrials);
    } catch (error) {
      console.error("Error fetching trials:", error);
      Alert.alert(
        isHindi ? "त्रुटि" : "Error",
        isHindi ? "ट्रायल्स लोड करने में त्रुटि हुई।" : "Error loading trials."
      );
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTrials();
    setRefreshing(false);
  };

  const handleApply = (trial: Trial) => {
    navigation.navigate("TrialApplication", {
      trialId: trial.id,
      trialTitle: trial.title,
    });
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return theme.colors.tertiary;
    if (score >= 75) return theme.colors.secondary;
    return "#FF9800"; // warning color
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <IconButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          iconColor={theme.colors.onSurface}
          style={styles.backButton}
        />
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text
          style={[styles.loadingText, { color: theme.colors.onSurfaceVariant }]}
        >
          {currentTexts.loading}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          iconColor={theme.colors.onSurface}
        />
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
          {currentTexts.title}
        </Text>
        <IconButton
          icon="refresh"
          onPress={onRefresh}
          iconColor={theme.colors.onSurface}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          {currentTexts.subtitle}
        </Text>

        {trials.length === 0 ? (
          <Card
            style={[
              styles.noTrialsCard,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Card.Content style={styles.noTrialsContent}>
              <Text
                style={[
                  styles.noTrialsIcon,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                🔍
              </Text>
              <Text
                style={[
                  styles.noTrialsTitle,
                  { color: theme.colors.onSurface },
                ]}
              >
                {currentTexts.noTrials}
              </Text>
              <Text
                style={[
                  styles.noTrialsDesc,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                {currentTexts.noTrialsDesc}
              </Text>
              <Button
                mode="outlined"
                onPress={() => navigation.navigate("TrialQuestionnaire")}
                style={styles.retryButton}
              >
                {currentTexts.retry}
              </Button>
            </Card.Content>
          </Card>
        ) : (
          trials.map((trial) => (
            <Card
              key={trial.id}
              style={[
                styles.trialCard,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <Card.Content>
                <View style={styles.trialHeader}>
                  <Text
                    style={[
                      styles.trialTitle,
                      { color: theme.colors.onSurface },
                    ]}
                  >
                    {trial.title}
                  </Text>
                  <Chip
                    mode="flat"
                    style={[
                      styles.matchChip,
                      { backgroundColor: getMatchScoreColor(trial.matchScore) },
                    ]}
                    textStyle={{ color: "white", fontWeight: "bold" }}
                  >
                    {trial.matchScore}% {currentTexts.matchScore}
                  </Chip>
                </View>

                <Text
                  style={[styles.condition, { color: theme.colors.primary }]}
                >
                  {trial.condition}
                </Text>

                <Text
                  style={[
                    styles.description,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  {trial.description}
                </Text>

                <View style={styles.trialDetails}>
                  <View style={styles.detailRow}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: theme.colors.onSurface },
                      ]}
                    >
                      {currentTexts.phase}:
                    </Text>
                    <Text
                      style={[
                        styles.detailValue,
                        { color: theme.colors.onSurfaceVariant },
                      ]}
                    >
                      {trial.phase}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: theme.colors.onSurface },
                      ]}
                    >
                      {currentTexts.duration}:
                    </Text>
                    <Text
                      style={[
                        styles.detailValue,
                        { color: theme.colors.onSurfaceVariant },
                      ]}
                    >
                      {trial.duration}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: theme.colors.onSurface },
                      ]}
                    >
                      {currentTexts.location}:
                    </Text>
                    <Text
                      style={[
                        styles.detailValue,
                        { color: theme.colors.onSurfaceVariant },
                      ]}
                    >
                      {trial.location}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: theme.colors.onSurface },
                      ]}
                    >
                      {currentTexts.compensation}:
                    </Text>
                    <Text
                      style={[
                        styles.detailValue,
                        { color: theme.colors.tertiary, fontWeight: "bold" },
                      ]}
                    >
                      {trial.compensation}
                    </Text>
                  </View>
                </View>

                <View style={styles.requirements}>
                  <Text
                    style={[
                      styles.requirementsTitle,
                      { color: theme.colors.onSurface },
                    ]}
                  >
                    {currentTexts.requirements}:
                  </Text>
                  <View style={styles.requirementsList}>
                    {trial.requirements.map((req, index) => (
                      <Chip
                        key={index}
                        mode="outlined"
                        style={[
                          styles.requirementChip,
                          { borderColor: theme.colors.outline },
                        ]}
                        textStyle={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {req}
                      </Chip>
                    ))}
                  </View>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.contactInfo}>
                  <Text
                    style={[
                      styles.contactTitle,
                      { color: theme.colors.onSurface },
                    ]}
                  >
                    {currentTexts.contact}:
                  </Text>
                  <Text
                    style={[
                      styles.contactDetail,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      {currentTexts.pi}:
                    </Text>{" "}
                    {trial.principalInvestigator}
                  </Text>
                  <Text
                    style={[
                      styles.contactDetail,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      {currentTexts.email}:
                    </Text>{" "}
                    {trial.contactEmail}
                  </Text>
                  <Text
                    style={[
                      styles.contactDetail,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      {currentTexts.phone}:
                    </Text>{" "}
                    {trial.contactPhone}
                  </Text>
                </View>

                <Button
                  mode="contained"
                  onPress={() => handleApply(trial)}
                  style={[
                    styles.applyButton,
                    { backgroundColor: theme.colors.primary },
                  ]}
                  contentStyle={styles.applyButtonContent}
                >
                  {currentTexts.apply}
                </Button>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 44,
    left: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  noTrialsCard: {
    elevation: 2,
    borderRadius: 16,
  },
  noTrialsContent: {
    alignItems: "center",
    paddingVertical: 32,
  },
  noTrialsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noTrialsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  noTrialsDesc: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    borderRadius: 12,
  },
  trialCard: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 16,
  },
  trialHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  trialTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginRight: 12,
  },
  matchChip: {
    alignSelf: "flex-start",
  },
  condition: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  trialDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    flex: 1,
  },
  requirements: {
    marginBottom: 16,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  requirementsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  requirementChip: {
    marginBottom: 4,
  },
  divider: {
    marginVertical: 16,
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  contactDetail: {
    fontSize: 13,
    marginBottom: 4,
  },
  applyButton: {
    borderRadius: 12,
  },
  applyButtonContent: {
    paddingVertical: 8,
  },
});
