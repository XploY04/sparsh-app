import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Card, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Camera, CameraView } from "expo-camera";

import { useAppStore } from "../store/appStore";
import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { MainStackParamList } from "../navigation/types";

type VideoRecorderNavigationProp = StackNavigationProp<MainStackParamList>;

export const VideoRecorderScreen: React.FC = () => {
  const navigation = useNavigation<VideoRecorderNavigationProp>();
  const { updateTaskStatus, recordDose } = useAppStore();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    // Auto-stop after 10 seconds for demo
    setTimeout(() => {
      if (isRecording) {
        stopRecording();
      }
    }, 10000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Simulate upload process
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsComplete(true);

      // Mark evening dose as completed
      updateTaskStatus("3", "completed");

      // Record the dose for gamification (this awards points and updates streaks)
      recordDose();

      // Navigate back after showing success
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ScreenHeader
            title={t("videoRecorder.title")}
            showBackButton
            onBackPress={() => navigation.goBack()}
          />
          <Text variant="bodyLarge" style={styles.centerText}>
            Requesting camera permission...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ScreenHeader
            title={t("videoRecorder.title")}
            showBackButton
            onBackPress={() => navigation.goBack()}
          />
          <Card style={styles.permissionCard}>
            <Card.Content>
              <Text variant="bodyLarge" style={styles.centerText}>
                {t("videoRecorder.permission")}
              </Text>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  if (isUploading || isComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ScreenHeader
            title={t("videoRecorder.title")}
            showBackButton
            onBackPress={() => navigation.goBack()}
          />
          <Card style={styles.resultCard}>
            <Card.Content style={styles.resultContent}>
              {isUploading ? (
                <>
                  <Text variant="headlineSmall" style={styles.uploadingText}>
                    {t("videoRecorder.uploading")}
                  </Text>
                  <Text variant="bodyMedium" style={styles.uploadingSubtext}>
                    Processing video...
                  </Text>
                </>
              ) : (
                <>
                  <Text variant="headlineSmall" style={styles.successText}>
                    {t("videoRecorder.success")}
                  </Text>
                  <Text variant="bodyMedium" style={styles.successSubtext}>
                    Dose verification complete
                  </Text>
                </>
              )}
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title={t("videoRecorder.title")}
          subtitle={t("videoRecorder.subtitle")}
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.cameraContainer}>
          <CameraView ref={cameraRef} style={styles.camera} facing="front">
            <View style={styles.overlay}>
              {isRecording && (
                <View style={styles.recordingIndicator}>
                  <View style={styles.recordingDot} />
                  <Text style={styles.recordingText}>
                    {t("videoRecorder.recording", {
                      seconds: formatTime(recordingTime),
                    })}
                  </Text>
                </View>
              )}
            </View>
          </CameraView>
        </View>

        <View style={styles.controlsContainer}>
          {!isRecording ? (
            <Button
              mode="contained"
              onPress={startRecording}
              style={styles.recordButton}
              icon="video"
              buttonColor="#F44336"
            >
              {t("videoRecorder.startRecording")}
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={stopRecording}
              style={styles.stopButton}
              icon="stop"
              buttonColor="#424242"
            >
              {t("videoRecorder.stopRecording")}
            </Button>
          )}

          <Text variant="bodySmall" style={styles.instruction}>
            {isRecording
              ? "Show yourself taking the medication"
              : "Position yourself in the camera frame"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  centerText: {
    textAlign: "center",
    color: "#fff",
  },
  permissionCard: {
    flex: 1,
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 24,
  },
  recordingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#F44336",
    marginRight: 8,
  },
  recordingText: {
    color: "#fff",
    fontWeight: "600",
  },
  controlsContainer: {
    alignItems: "center",
    gap: 16,
  },
  recordButton: {
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  stopButton: {
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  instruction: {
    textAlign: "center",
    color: "#fff",
    opacity: 0.8,
  },
  resultCard: {
    flex: 1,
    marginBottom: 24,
  },
  resultContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadingText: {
    textAlign: "center",
    marginBottom: 12,
    color: "#FF9800",
  },
  uploadingSubtext: {
    textAlign: "center",
    opacity: 0.7,
  },
  successText: {
    textAlign: "center",
    marginBottom: 12,
    color: "#4CAF50",
  },
  successSubtext: {
    textAlign: "center",
    opacity: 0.7,
  },
});
