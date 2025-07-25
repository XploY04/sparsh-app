import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Text, RadioButton, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAppStore } from "../store/appStore";
import { t, getCurrentLanguage } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { quizQuestions } from "../data/mockData";
import { OnboardingStackParamList } from "../navigation/types";

type NavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  "ComprehensionQuiz"
>;

export const ComprehensionQuizScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setQuizCompleted, setOnboardingComplete, trialProfile } =
    useAppStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showQuizComplete, setShowQuizComplete] = useState(false);

  const currentLanguage = getCurrentLanguage();

  // Use dynamic quiz from trial profile, fallback to mock data
  let questions = quizQuestions[currentLanguage];

  // If trial profile has dynamic questions, use them
  if (trialProfile?.comprehensionQuiz?.questions) {
    questions = trialProfile.comprehensionQuiz.questions.map((q: any) => ({
      id: q.id,
      question: q.text[currentLanguage] || q.text.en,
      options: q.options.map(
        (opt: any) => opt.label[currentLanguage] || opt.label.en
      ),
      correctAnswer: q.options.findIndex(
        (opt: any) => opt.value === q.correctAnswer
      ),
    }));
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    const selectedAnswer = selectedAnswers[currentQuestionIndex];

    if (selectedAnswer === undefined) {
      Alert.alert("Error", "Please select an answer");
      return;
    }

    if (selectedAnswer !== currentQuestion.correctAnswer) {
      Alert.alert("Incorrect", t("comprehensionQuiz.incorrect"));
      return;
    }

    Alert.alert("Correct!", t("comprehensionQuiz.correct"));

    if (isLastQuestion) {
      // Quiz completed
      setQuizCompleted(true);
      setShowQuizComplete(true);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinishOnboarding = () => {
    setOnboardingComplete(true);
    Alert.alert("Success!", t("comprehensionQuiz.welcomeMessage"), [
      {
        text: t("comprehensionQuiz.proceedToDashboard"),
        onPress: () => {
          // This will trigger the RootNavigator to switch to Main stack
          // which contains the MainTabNavigator
        },
      },
    ]);
  };

  if (showQuizComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.completionContainer}>
            <Text variant="headlineMedium" style={styles.completionTitle}>
              🎉 {t("comprehensionQuiz.quizComplete")}
            </Text>
            <Text variant="bodyLarge" style={styles.completionSubtitle}>
              {t("comprehensionQuiz.welcomeMessage")}
            </Text>
            <Button
              mode="contained"
              onPress={handleFinishOnboarding}
              style={styles.completionButton}
              icon="arrow-right"
            >
              {t("comprehensionQuiz.proceedToDashboard")}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title={t("comprehensionQuiz.title")}
          subtitle={t("comprehensionQuiz.subtitle")}
        />

        <View style={styles.progressContainer}>
          <Text variant="titleMedium" style={styles.progressText}>
            {t("comprehensionQuiz.question", {
              number: currentQuestionIndex + 1,
              total: questions.length,
            })}
          </Text>
        </View>

        <Card style={styles.questionCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.questionText}>
              {currentQuestion.question}
            </Text>

            <RadioButton.Group
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              value={selectedAnswers[currentQuestionIndex]?.toString() || ""}
            >
              {currentQuestion.options.map((option, index) => (
                <View key={index} style={styles.optionContainer}>
                  <RadioButton.Item
                    label={option}
                    value={index.toString()}
                    labelStyle={styles.optionLabel}
                  />
                </View>
              ))}
            </RadioButton.Group>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleNext}
          disabled={selectedAnswers[currentQuestionIndex] === undefined}
          style={styles.nextButton}
          icon={isLastQuestion ? "check" : "arrow-right"}
        >
          {isLastQuestion
            ? t("comprehensionQuiz.finish")
            : t("comprehensionQuiz.next")}
        </Button>
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
  progressContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  progressText: {
    fontWeight: "bold",
    color: "#2196F3",
  },
  questionCard: {
    marginBottom: 24,
    flex: 1,
  },
  questionText: {
    marginBottom: 24,
    lineHeight: 32,
  },
  optionContainer: {
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 16,
    lineHeight: 24,
  },
  nextButton: {
    paddingVertical: 8,
  },
  completionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  completionTitle: {
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  completionSubtitle: {
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  completionButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
});
