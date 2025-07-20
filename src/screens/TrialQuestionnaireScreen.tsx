import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import {
  Text,
  Button,
  Card,
  useTheme,
  Chip,
  TextInput,
  IconButton,
} from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { WelcomeStackParamList } from "../navigation/types";
import { useAppStore } from "../store/appStore";

type TrialQuestionnaireNavigationProp = StackNavigationProp<
  WelcomeStackParamList,
  "TrialQuestionnaire"
>;

interface Props {
  navigation: TrialQuestionnaireNavigationProp;
}

interface Question {
  id: string;
  text: { en: string; hi: string };
  type: "single" | "multiple" | "text" | "number" | "boolean";
  options?: { value: string; label: { en: string; hi: string } }[];
  required: boolean;
}

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
  questionId?: string;
}

const questions: Question[] = [
  {
    id: "age",
    text: {
      en: "What is your age?",
      hi: "आपकी उम्र क्या है?",
    },
    type: "number",
    required: true,
  },
  {
    id: "gender",
    text: {
      en: "What is your gender?",
      hi: "आपका लिंग क्या है?",
    },
    type: "single",
    options: [
      { value: "male", label: { en: "Male", hi: "पुरुष" } },
      { value: "female", label: { en: "Female", hi: "महिला" } },
      { value: "other", label: { en: "Other", hi: "अन्य" } },
    ],
    required: true,
  },
  {
    id: "conditions",
    text: {
      en: "Do you have any of these medical conditions?",
      hi: "क्या आपको इनमें से कोई चिकित्सा स्थिति है?",
    },
    type: "multiple",
    options: [
      { value: "diabetes", label: { en: "Diabetes", hi: "मधुमेह" } },
      {
        value: "hypertension",
        label: { en: "High Blood Pressure", hi: "उच्च रक्तचाप" },
      },
      {
        value: "heart_disease",
        label: { en: "Heart Disease", hi: "हृदय रोग" },
      },
      { value: "cancer", label: { en: "Cancer", hi: "कैंसर" } },
      {
        value: "kidney_disease",
        label: { en: "Kidney Disease", hi: "गुर्दे की बीमारी" },
      },
      {
        value: "none",
        label: { en: "None of the above", hi: "उपरोक्त में से कोई नहीं" },
      },
    ],
    required: true,
  },
  {
    id: "medications",
    text: {
      en: "Are you currently taking any medications?",
      hi: "क्या आप वर्तमान में कोई दवाएं ले रहे हैं?",
    },
    type: "boolean",
    required: true,
  },
  {
    id: "location",
    text: {
      en: "What city are you located in?",
      hi: "आप किस शहर में स्थित हैं?",
    },
    type: "text",
    required: true,
  },
  {
    id: "availability",
    text: {
      en: "How many days per week are you available for study visits?",
      hi: "आप सप्ताह में कितने दिन अध्ययन विज़िट के लिए उपलब्ध हैं?",
    },
    type: "single",
    options: [
      { value: "1", label: { en: "1 day", hi: "1 दिन" } },
      { value: "2", label: { en: "2 days", hi: "2 दिन" } },
      { value: "3", label: { en: "3 days", hi: "3 दिन" } },
      { value: "4+", label: { en: "4+ days", hi: "4+ दिन" } },
    ],
    required: true,
  },
];

export const TrialQuestionnaireScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { language } = useAppStore();
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [textInput, setTextInput] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    // Start with welcome message
    const welcomeMessage: ChatMessage = {
      id: "welcome",
      type: "bot",
      content:
        language === "hi"
          ? "नमस्कार! मैं आपको उपयुक्त क्लिनिकल ट्रायल खोजने में मदद करूंगा। कृपया कुछ प्रश्नों के उत्तर दें।"
          : "Hello! I'll help you find suitable clinical trials. Please answer a few questions.",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);

    // Ask first question after a delay
    setTimeout(() => {
      askQuestion(0);
    }, 1000);
  }, [language]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const askQuestion = (questionIndex: number) => {
    if (questionIndex >= questions.length) return;

    const question = questions[questionIndex];
    const questionMessage: ChatMessage = {
      id: `question-${question.id}`,
      type: "bot",
      content: question.text[language],
      timestamp: new Date(),
      questionId: question.id,
    };

    setMessages((prev) => [...prev, questionMessage]);
  };

  const handleAnswer = (answer: any) => {
    const userMessage: ChatMessage = {
      id: `answer-${currentQuestion.id}`,
      type: "user",
      content: formatAnswerForDisplay(answer),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));

    // Clear inputs
    setTextInput("");
    setSelectedOptions([]);

    if (isLastQuestion) {
      // Complete questionnaire
      setTimeout(() => {
        const completionMessage: ChatMessage = {
          id: "completion",
          type: "bot",
          content:
            language === "hi"
              ? "धन्यवाद! अब मैं आपके लिए उपयुक्त ट्रायल खोज रहा हूं..."
              : "Thank you! Now I'm searching for suitable trials for you...",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, completionMessage]);
        setIsCompleted(true);

        // Navigate to results after delay
        setTimeout(() => {
          navigation.navigate("TrialResults", {
            answers: { ...answers, [currentQuestion.id]: answer },
          });
        }, 2000);
      }, 1000);
    } else {
      // Ask next question
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        askQuestion(currentQuestionIndex + 1);
      }, 1000);
    }
  };

  const formatAnswerForDisplay = (answer: any): string => {
    if (currentQuestion.type === "boolean") {
      return answer
        ? language === "hi"
          ? "हां"
          : "Yes"
        : language === "hi"
        ? "नहीं"
        : "No";
    }
    if (currentQuestion.type === "multiple" && Array.isArray(answer)) {
      return answer
        .map((value) => {
          const option = currentQuestion.options?.find(
            (opt) => opt.value === value
          );
          return option?.label[language] || value;
        })
        .join(", ");
    }
    if (currentQuestion.type === "single") {
      const option = currentQuestion.options?.find(
        (opt) => opt.value === answer
      );
      return option?.label[language] || answer;
    }
    return String(answer);
  };

  const handleOptionSelect = (value: string) => {
    if (currentQuestion.type === "multiple") {
      const newSelection = selectedOptions.includes(value)
        ? selectedOptions.filter((item) => item !== value)
        : [...selectedOptions, value];
      setSelectedOptions(newSelection);
    } else {
      handleAnswer(value);
    }
  };

  const handleMultipleSubmit = () => {
    if (selectedOptions.length > 0) {
      handleAnswer(selectedOptions);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleAnswer(
        currentQuestion.type === "number" ? Number(textInput) : textInput.trim()
      );
    }
  };

  const handleBooleanAnswer = (value: boolean) => {
    handleAnswer(value);
  };

  const renderQuestion = () => {
    if (isCompleted || currentQuestionIndex >= questions.length) return null;

    return (
      <View style={styles.questionContainer}>
        {currentQuestion.type === "single" && (
          <View style={styles.optionsContainer}>
            {currentQuestion.options?.map((option) => (
              <Chip
                key={option.value}
                mode="outlined"
                onPress={() => handleOptionSelect(option.value)}
                style={[
                  styles.optionChip,
                  { borderColor: theme.colors.primary },
                ]}
                textStyle={{ color: theme.colors.primary }}
              >
                {option.label[language]}
              </Chip>
            ))}
          </View>
        )}

        {currentQuestion.type === "multiple" && (
          <View>
            <View style={styles.optionsContainer}>
              {currentQuestion.options?.map((option) => (
                <Chip
                  key={option.value}
                  mode={
                    selectedOptions.includes(option.value) ? "flat" : "outlined"
                  }
                  onPress={() => handleOptionSelect(option.value)}
                  style={[
                    styles.optionChip,
                    selectedOptions.includes(option.value)
                      ? { backgroundColor: theme.colors.primary }
                      : { borderColor: theme.colors.primary },
                  ]}
                  textStyle={{
                    color: selectedOptions.includes(option.value)
                      ? theme.colors.onPrimary
                      : theme.colors.primary,
                  }}
                >
                  {option.label[language]}
                </Chip>
              ))}
            </View>
            <Button
              mode="contained"
              onPress={handleMultipleSubmit}
              disabled={selectedOptions.length === 0}
              style={styles.submitButton}
            >
              {language === "hi" ? "जारी रखें" : "Continue"}
            </Button>
          </View>
        )}

        {(currentQuestion.type === "text" ||
          currentQuestion.type === "number") && (
          <View style={styles.textInputContainer}>
            <TextInput
              value={textInput}
              onChangeText={setTextInput}
              mode="outlined"
              keyboardType={
                currentQuestion.type === "number" ? "numeric" : "default"
              }
              placeholder={
                language === "hi"
                  ? "आपका उत्तर लिखें..."
                  : "Type your answer..."
              }
              style={styles.textInput}
              right={
                <TextInput.Icon
                  icon="send"
                  onPress={handleTextSubmit}
                  disabled={!textInput.trim()}
                />
              }
              onSubmitEditing={handleTextSubmit}
            />
          </View>
        )}

        {currentQuestion.type === "boolean" && (
          <View style={styles.booleanContainer}>
            <Button
              mode="contained"
              onPress={() => handleBooleanAnswer(true)}
              style={[
                styles.booleanButton,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              {language === "hi" ? "हां" : "Yes"}
            </Button>
            <Button
              mode="outlined"
              onPress={() => handleBooleanAnswer(false)}
              style={[
                styles.booleanButton,
                { borderColor: theme.colors.primary },
              ]}
              labelStyle={{ color: theme.colors.primary }}
            >
              {language === "hi" ? "नहीं" : "No"}
            </Button>
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          iconColor={theme.colors.onSurface}
        />
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
          {language === "hi" ? "ट्रायल खोजें" : "Find Trials"}
        </Text>
        <View style={styles.headerProgress}>
          <Text
            style={[
              styles.progressText,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            {currentQuestionIndex + 1}/{questions.length}
          </Text>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.type === "bot" ? styles.botMessage : styles.userMessage,
            ]}
          >
            <Card
              style={[
                styles.messageCard,
                {
                  backgroundColor:
                    message.type === "bot"
                      ? theme.colors.surfaceVariant
                      : theme.colors.primary,
                },
              ]}
            >
              <Card.Content style={styles.messageContent}>
                <Text
                  style={[
                    styles.messageText,
                    {
                      color:
                        message.type === "bot"
                          ? theme.colors.onSurfaceVariant
                          : theme.colors.onPrimary,
                    },
                  ]}
                >
                  {message.content}
                </Text>
              </Card.Content>
            </Card>
          </View>
        ))}
      </ScrollView>

      {renderQuestion()}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerProgress: {
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "500",
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 100,
  },
  messageContainer: {
    marginBottom: 16,
  },
  botMessage: {
    alignItems: "flex-start",
  },
  userMessage: {
    alignItems: "flex-end",
  },
  messageCard: {
    maxWidth: "80%",
    elevation: 2,
  },
  messageContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  questionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  optionChip: {
    marginBottom: 8,
  },
  submitButton: {
    borderRadius: 12,
  },
  textInputContainer: {
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: "white",
  },
  booleanContainer: {
    flexDirection: "row",
    gap: 12,
  },
  booleanButton: {
    flex: 1,
    borderRadius: 12,
  },
});
