import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Text,
  Button,
  Card,
  useTheme,
  IconButton,
  TextInput,
  Checkbox,
  Divider,
  HelperText,
} from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { WelcomeStackParamList } from "../navigation/types";
import { useAppStore } from "../store/appStore";

type TrialApplicationNavigationProp = StackNavigationProp<
  WelcomeStackParamList,
  "TrialApplication"
>;

type TrialApplicationRouteProp = RouteProp<
  WelcomeStackParamList,
  "TrialApplication"
>;

interface Props {
  navigation: TrialApplicationNavigationProp;
  route: TrialApplicationRouteProp;
}

interface ApplicationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalHistory: string;
  currentMedications: string;
  agreeToTerms: boolean;
  agreeToContact: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export const TrialApplicationScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const { language } = useAppStore();
  const { trialId, trialTitle } = route.params;

  const [formData, setFormData] = useState<ApplicationForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    medicalHistory: "",
    currentMedications: "",
    agreeToTerms: false,
    agreeToContact: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isHindi = language === "hi";

  const texts = {
    en: {
      title: "Apply for Trial",
      subtitle: `Complete your application for: ${trialTitle}`,
      personalInfo: "Personal Information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number",
      dateOfBirth: "Date of Birth (DD/MM/YYYY)",
      address: "Address",
      city: "City",
      state: "State",
      pincode: "PIN Code",
      emergencyContact: "Emergency Contact",
      emergencyContactName: "Emergency Contact Name",
      emergencyContactPhone: "Emergency Contact Phone",
      medicalInfo: "Medical Information",
      medicalHistory: "Medical History (Optional)",
      medicalHistoryHint:
        "Please describe any relevant medical conditions, surgeries, or treatments",
      currentMedications: "Current Medications (Optional)",
      currentMedicationsHint: "List all medications you are currently taking",
      consent: "Consent and Agreements",
      agreeToTerms:
        "I agree to the terms and conditions of this clinical trial",
      agreeToContact: "I agree to be contacted by the research team",
      submit: "Submit Application",
      submitting: "Submitting...",
      required: "This field is required",
      invalidEmail: "Please enter a valid email address",
      invalidPhone: "Please enter a valid phone number",
      invalidDate: "Please enter a valid date (DD/MM/YYYY)",
      invalidPincode: "Please enter a valid PIN code",
      mustAgreeTerms: "You must agree to the terms and conditions",
      mustAgreeContact: "You must agree to be contacted",
    },
    hi: {
      title: "ट्रायल के लिए आवेदन करें",
      subtitle: `इसके लिए अपना आवेदन पूरा करें: ${trialTitle}`,
      personalInfo: "व्यक्तिगत जानकारी",
      firstName: "पहला नाम",
      lastName: "अंतिम नाम",
      email: "ईमेल पता",
      phone: "फ़ोन नंबर",
      dateOfBirth: "जन्म तिथि (दिन/माह/वर्ष)",
      address: "पता",
      city: "शहर",
      state: "राज्य",
      pincode: "पिन कोड",
      emergencyContact: "आपातकालीन संपर्क",
      emergencyContactName: "आपातकालीन संपर्क का नाम",
      emergencyContactPhone: "आपातकालीन संपर्क फ़ोन",
      medicalInfo: "चिकित्सा जानकारी",
      medicalHistory: "चिकित्सा इतिहास (वैकल्पिक)",
      medicalHistoryHint:
        "कृपया किसी भी प्रासंगिक चिकित्सा स्थिति, सर्जरी या उपचार का वर्णन करें",
      currentMedications: "वर्तमान दवाएं (वैकल्पिक)",
      currentMedicationsHint:
        "वे सभी दवाएं सूचीबद्ध करें जो आप वर्तमान में ले रहे हैं",
      consent: "सहमति और समझौते",
      agreeToTerms: "मैं इस क्लिनिकल ट्रायल के नियमों और शर्तों से सहमत हूं",
      agreeToContact: "मैं अनुसंधान टीम द्वारा संपर्क किए जाने से सहमत हूं",
      submit: "आवेदन जमा करें",
      submitting: "जमा कर रहे हैं...",
      required: "यह फ़ील्ड आवश्यक है",
      invalidEmail: "कृपया एक वैध ईमेल पता दर्ज करें",
      invalidPhone: "कृपया एक वैध फ़ोन नंबर दर्ज करें",
      invalidDate: "कृपया एक वैध तारीख दर्ज करें (दिन/माह/वर्ष)",
      invalidPincode: "कृपया एक वैध पिन कोड दर्ज करें",
      mustAgreeTerms: "आपको नियमों और शर्तों से सहमत होना चाहिए",
      mustAgreeContact: "आपको संपर्क किए जाने से सहमत होना चाहिए",
    },
  };

  const currentTexts = texts[language];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "dateOfBirth",
      "address",
      "city",
      "state",
      "pincode",
      "emergencyContactName",
      "emergencyContactPhone",
    ];

    requiredFields.forEach((field) => {
      if (
        !formData[field as keyof ApplicationForm] ||
        String(formData[field as keyof ApplicationForm]).trim() === ""
      ) {
        newErrors[field] = currentTexts.required;
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = currentTexts.invalidEmail;
    }

    // Phone validation (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (
      formData.phone &&
      !phoneRegex.test(formData.phone.replace(/[\s\-\+]/g, ""))
    ) {
      newErrors.phone = currentTexts.invalidPhone;
    }

    // Emergency phone validation
    if (
      formData.emergencyContactPhone &&
      !phoneRegex.test(formData.emergencyContactPhone.replace(/[\s\-\+]/g, ""))
    ) {
      newErrors.emergencyContactPhone = currentTexts.invalidPhone;
    }

    // Date validation (DD/MM/YYYY)
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (formData.dateOfBirth && !dateRegex.test(formData.dateOfBirth)) {
      newErrors.dateOfBirth = currentTexts.invalidDate;
    }

    // PIN code validation
    const pincodeRegex = /^\d{6}$/;
    if (formData.pincode && !pincodeRegex.test(formData.pincode)) {
      newErrors.pincode = currentTexts.invalidPincode;
    }

    // Consent validations
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = currentTexts.mustAgreeTerms;
    }

    if (!formData.agreeToContact) {
      newErrors.agreeToContact = currentTexts.mustAgreeContact;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof ApplicationForm,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert(
        isHindi ? "त्रुटि" : "Error",
        isHindi
          ? "कृपया सभी आवश्यक फ़ील्ड भरें।"
          : "Please fill all required fields."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      // In real implementation, call: POST /api/trials/[trialId]/apply
      // const response = await fetch(`/api/trials/${trialId}/apply`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     personalInfo: {
      //       firstName: formData.firstName,
      //       lastName: formData.lastName,
      //       email: formData.email,
      //       phone: formData.phone,
      //       dateOfBirth: formData.dateOfBirth,
      //       address: formData.address,
      //       city: formData.city,
      //       state: formData.state,
      //       pincode: formData.pincode,
      //     },
      //     emergencyContact: {
      //       name: formData.emergencyContactName,
      //       phone: formData.emergencyContactPhone,
      //     },
      //     medicalInfo: {
      //       history: formData.medicalHistory,
      //       currentMedications: formData.currentMedications,
      //     },
      //     consent: {
      //       termsAgreed: formData.agreeToTerms,
      //       contactAgreed: formData.agreeToContact,
      //     }
      //   })
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      navigation.navigate("ApplicationSuccess", {
        trialTitle: trialTitle,
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      Alert.alert(
        isHindi ? "त्रुटि" : "Error",
        isHindi
          ? "आवेदन जमा करने में त्रुटि हुई।"
          : "Error submitting application."
      );
    } finally {
      setIsSubmitting(false);
    }
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
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
            {currentTexts.title}
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            {currentTexts.subtitle}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Personal Information */}
        <Card
          style={[
            styles.sectionCard,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Card.Content>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.primary }]}
            >
              {currentTexts.personalInfo}
            </Text>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <TextInput
                  label={currentTexts.firstName}
                  value={formData.firstName}
                  onChangeText={(value) =>
                    handleInputChange("firstName", value)
                  }
                  mode="outlined"
                  style={styles.input}
                  error={!!errors.firstName}
                />
                <HelperText type="error" visible={!!errors.firstName}>
                  {errors.firstName}
                </HelperText>
              </View>

              <View style={styles.halfWidth}>
                <TextInput
                  label={currentTexts.lastName}
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange("lastName", value)}
                  mode="outlined"
                  style={styles.input}
                  error={!!errors.lastName}
                />
                <HelperText type="error" visible={!!errors.lastName}>
                  {errors.lastName}
                </HelperText>
              </View>
            </View>

            <TextInput
              label={currentTexts.email}
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email}
            </HelperText>

            <TextInput
              label={currentTexts.phone}
              value={formData.phone}
              onChangeText={(value) => handleInputChange("phone", value)}
              mode="outlined"
              style={styles.input}
              keyboardType="phone-pad"
              error={!!errors.phone}
            />
            <HelperText type="error" visible={!!errors.phone}>
              {errors.phone}
            </HelperText>

            <TextInput
              label={currentTexts.dateOfBirth}
              value={formData.dateOfBirth}
              onChangeText={(value) => handleInputChange("dateOfBirth", value)}
              mode="outlined"
              style={styles.input}
              placeholder="DD/MM/YYYY"
              error={!!errors.dateOfBirth}
            />
            <HelperText type="error" visible={!!errors.dateOfBirth}>
              {errors.dateOfBirth}
            </HelperText>

            <TextInput
              label={currentTexts.address}
              value={formData.address}
              onChangeText={(value) => handleInputChange("address", value)}
              mode="outlined"
              style={styles.input}
              multiline
              numberOfLines={2}
              error={!!errors.address}
            />
            <HelperText type="error" visible={!!errors.address}>
              {errors.address}
            </HelperText>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <TextInput
                  label={currentTexts.city}
                  value={formData.city}
                  onChangeText={(value) => handleInputChange("city", value)}
                  mode="outlined"
                  style={styles.input}
                  error={!!errors.city}
                />
                <HelperText type="error" visible={!!errors.city}>
                  {errors.city}
                </HelperText>
              </View>

              <View style={styles.halfWidth}>
                <TextInput
                  label={currentTexts.state}
                  value={formData.state}
                  onChangeText={(value) => handleInputChange("state", value)}
                  mode="outlined"
                  style={styles.input}
                  error={!!errors.state}
                />
                <HelperText type="error" visible={!!errors.state}>
                  {errors.state}
                </HelperText>
              </View>
            </View>

            <TextInput
              label={currentTexts.pincode}
              value={formData.pincode}
              onChangeText={(value) => handleInputChange("pincode", value)}
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
              maxLength={6}
              error={!!errors.pincode}
            />
            <HelperText type="error" visible={!!errors.pincode}>
              {errors.pincode}
            </HelperText>
          </Card.Content>
        </Card>

        {/* Emergency Contact */}
        <Card
          style={[
            styles.sectionCard,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Card.Content>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.primary }]}
            >
              {currentTexts.emergencyContact}
            </Text>

            <TextInput
              label={currentTexts.emergencyContactName}
              value={formData.emergencyContactName}
              onChangeText={(value) =>
                handleInputChange("emergencyContactName", value)
              }
              mode="outlined"
              style={styles.input}
              error={!!errors.emergencyContactName}
            />
            <HelperText type="error" visible={!!errors.emergencyContactName}>
              {errors.emergencyContactName}
            </HelperText>

            <TextInput
              label={currentTexts.emergencyContactPhone}
              value={formData.emergencyContactPhone}
              onChangeText={(value) =>
                handleInputChange("emergencyContactPhone", value)
              }
              mode="outlined"
              style={styles.input}
              keyboardType="phone-pad"
              error={!!errors.emergencyContactPhone}
            />
            <HelperText type="error" visible={!!errors.emergencyContactPhone}>
              {errors.emergencyContactPhone}
            </HelperText>
          </Card.Content>
        </Card>

        {/* Medical Information */}
        <Card
          style={[
            styles.sectionCard,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Card.Content>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.primary }]}
            >
              {currentTexts.medicalInfo}
            </Text>

            <TextInput
              label={currentTexts.medicalHistory}
              value={formData.medicalHistory}
              onChangeText={(value) =>
                handleInputChange("medicalHistory", value)
              }
              mode="outlined"
              style={styles.input}
              multiline
              numberOfLines={3}
              placeholder={currentTexts.medicalHistoryHint}
            />

            <TextInput
              label={currentTexts.currentMedications}
              value={formData.currentMedications}
              onChangeText={(value) =>
                handleInputChange("currentMedications", value)
              }
              mode="outlined"
              style={styles.input}
              multiline
              numberOfLines={3}
              placeholder={currentTexts.currentMedicationsHint}
            />
          </Card.Content>
        </Card>

        {/* Consent */}
        <Card
          style={[
            styles.sectionCard,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Card.Content>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.primary }]}
            >
              {currentTexts.consent}
            </Text>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={formData.agreeToTerms ? "checked" : "unchecked"}
                onPress={() =>
                  handleInputChange("agreeToTerms", !formData.agreeToTerms)
                }
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.checkboxLabel,
                  { color: theme.colors.onSurface },
                ]}
              >
                {currentTexts.agreeToTerms}
              </Text>
            </View>
            <HelperText type="error" visible={!!errors.agreeToTerms}>
              {errors.agreeToTerms}
            </HelperText>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={formData.agreeToContact ? "checked" : "unchecked"}
                onPress={() =>
                  handleInputChange("agreeToContact", !formData.agreeToContact)
                }
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.checkboxLabel,
                  { color: theme.colors.onSurface },
                ]}
              >
                {currentTexts.agreeToContact}
              </Text>
            </View>
            <HelperText type="error" visible={!!errors.agreeToContact}>
              {errors.agreeToContact}
            </HelperText>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={[
            styles.submitButton,
            { backgroundColor: theme.colors.primary },
          ]}
          contentStyle={styles.submitButtonContent}
        >
          {isSubmitting ? currentTexts.submitting : currentTexts.submit}
        </Button>
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 16,
  },
  headerContent: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "white",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkboxLabel: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 32,
    borderRadius: 12,
  },
  submitButtonContent: {
    paddingVertical: 8,
  },
});
