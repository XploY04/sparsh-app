import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export const EmergencyFAB: React.FC = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Emergency" as never);
  };

  return (
    <FAB
      style={styles.fab}
      icon="phone-alert"
      onPress={handlePress}
      color="#fff"
      customSize={56}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 80, // Above the tab bar
    backgroundColor: "#F44336",
  },
});
