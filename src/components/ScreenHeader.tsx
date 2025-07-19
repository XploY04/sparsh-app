import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
}) => {
  return (
    <View style={styles.container}>
      {showBackButton && (
        <View style={styles.backButtonContainer}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={onBackPress}
            style={styles.backButton}
          />
        </View>
      )}
      <View style={styles.headerContent}>
        <Text variant="headlineMedium" style={styles.title}>
          {title}
        </Text>
        {subtitle && (
          <Text variant="bodyLarge" style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    position: "relative",
  },
  backButtonContainer: {
    position: "absolute",
    left: -16,
    top: 0,
    zIndex: 1,
  },
  backButton: {
    margin: 0,
  },
  headerContent: {
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
  },
});
