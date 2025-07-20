import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Camera, CameraView } from "expo-camera";

import { useAppStore } from "../store/appStore";
import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { MainStackParamList } from "../navigation/types";

type QrScannerNavigationProp = StackNavigationProp<MainStackParamList>;

export const QrScannerScreen: React.FC = () => {
  const navigation = useNavigation<QrScannerNavigationProp>();
  const { updateTaskStatus, recordDose } = useAppStore();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) return;

    setScanned(true);
    setIsScanning(true);

    // Simulate processing time
    setTimeout(() => {
      // Mark evening dose as completed (assuming QR scan is for evening dose)
      updateTaskStatus("3", "completed");

      // Record the dose for gamification (this awards points and updates streaks)
      recordDose();

      // Show success and navigate back
      setIsScanning(false);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }, 1500);
  };

  const resetScanner = () => {
    setScanned(false);
    setIsScanning(false);
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ScreenHeader
            title={t("qrScanner.title")}
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
            title={t("qrScanner.title")}
            showBackButton
            onBackPress={() => navigation.goBack()}
          />
          <Card style={styles.permissionCard}>
            <Card.Content>
              <Text variant="bodyLarge" style={styles.centerText}>
                {t("qrScanner.permission")}
              </Text>
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
          title={t("qrScanner.title")}
          subtitle={!scanned ? t("qrScanner.subtitle") : undefined}
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        {scanned ? (
          <Card style={styles.resultCard}>
            <Card.Content style={styles.resultContent}>
              {isScanning ? (
                <>
                  <Text variant="headlineSmall" style={styles.processingText}>
                    {t("qrScanner.scanning")}
                  </Text>
                  <Text variant="bodyMedium" style={styles.processingSubtext}>
                    Verifying medication...
                  </Text>
                </>
              ) : (
                <>
                  <Text variant="headlineSmall" style={styles.successText}>
                    {t("qrScanner.success")}
                  </Text>
                  <Text variant="bodyMedium" style={styles.successSubtext}>
                    Dose verification complete
                  </Text>
                </>
              )}
            </Card.Content>
          </Card>
        ) : (
          <View style={styles.cameraContainer}>
            <CameraView
              style={styles.camera}
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
            >
              <View style={styles.overlay}>
                <View style={styles.scanFrame} />
                <Text variant="bodyMedium" style={styles.scanInstruction}>
                  Position QR code within the frame
                </Text>
              </View>
            </CameraView>
          </View>
        )}

        {scanned && !isScanning && (
          <Button
            mode="outlined"
            onPress={resetScanner}
            style={styles.resetButton}
            icon="refresh"
          >
            Scan Another
          </Button>
        )}
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  scanInstruction: {
    marginTop: 24,
    color: "#fff",
    textAlign: "center",
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
  processingText: {
    textAlign: "center",
    marginBottom: 12,
    color: "#FF9800",
  },
  processingSubtext: {
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
  resetButton: {
    marginBottom: 24,
  },
});
