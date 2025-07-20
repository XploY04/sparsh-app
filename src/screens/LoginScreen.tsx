import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAppStore } from "../store/appStore";
import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { OtpInput } from "../components/OtpInput";
import { OnboardingStackParamList } from "../navigation/types";
import { textColors, backgroundColors } from "../theme/colors";

type NavigationProp = StackNavigationProp<OnboardingStackParamList, "Login">;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setMobileNumber, setOtpVerified } = useAppStore();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateMobile = (number: string): boolean => {
    return /^[6-9]\d{9}$/.test(number);
  };

  const handleSendOtp = async () => {
    if (!validateMobile(mobile)) {
      Alert.alert("Error", t("login.invalidMobile"));
      return;
    }

    setIsLoading(true);
    setMobileNumber(mobile);

    // Mock API call - simulate 1 second delay
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      // Auto-fill mock OTP for prototype
      setOtp(["1", "2", "3", "4"]);
      Alert.alert("Success", t("login.otpSent"));
    }, 1000);
  };

  const handleVerifyOtp = () => {
    const otpString = otp.join("");
    if (otpString.length === 4) {
      setOtpVerified(true);
      navigation.navigate("PinSetup");
    }
  };

  const handleOtpChange = (newOtp: string[]) => {
    setOtp(newOtp);
    // Remove auto-verification to give user control
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader title={t("login.title")} subtitle={t("login.subtitle")} />

        <View style={styles.form}>
          <TextInput
            label={t("login.mobileLabel")}
            placeholder={t("login.mobilePlaceholder")}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            maxLength={10}
            mode="outlined"
            style={styles.input}
            disabled={isOtpSent}
          />

          {!isOtpSent ? (
            <Button
              mode="contained"
              onPress={handleSendOtp}
              loading={isLoading}
              disabled={isLoading || !mobile}
              style={styles.button}
            >
              {t("login.sendOTP")}
            </Button>
          ) : (
            <View style={styles.otpContainer}>
              <Text variant="bodyLarge" style={styles.otpLabel}>
                {t("login.otpLabel")}
              </Text>
              <OtpInput value={otp} onChange={handleOtpChange} length={4} />
              <Text variant="bodySmall" style={styles.note}>
                Mock OTP: 1234 (auto-filled for prototype)
              </Text>
              <Button
                mode="contained"
                onPress={handleVerifyOtp}
                disabled={otp.join("").length !== 4}
                style={styles.verifyButton}
              >
                {t("login.verify")}
              </Button>
            </View>
          )}
        </View>
      </View>
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
    padding: 24,
    justifyContent: "center",
  },
  form: {
    gap: 16,
  },
  input: {
    marginBottom: 8,
    backgroundColor: backgroundColors.card,
  },
  button: {
    marginTop: 16,
  },
  otpContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  otpLabel: {
    marginBottom: 8,
    fontWeight: "bold",
    color: textColors.primary,
  },
  note: {
    marginTop: 8,
    fontStyle: "italic",
    color: textColors.tertiary,
  },
  verifyButton: {
    marginTop: 16,
    width: "100%",
  },
});
