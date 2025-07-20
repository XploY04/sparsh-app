import React, { useState } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import {
  Text,
  Card,
  Badge as BadgeChip,
  Modal,
  Portal,
  Button,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { useAppStore } from "../store/appStore";
import { Badge } from "../data/badges";

export const RewardsScreen: React.FC = () => {
  const { totalPoints, userBadges } = useAppStore();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const unlockedBadges = userBadges.filter((badge) => badge.isUnlocked);
  const lockedBadges = userBadges.filter((badge) => !badge.isUnlocked);

  const handleBadgePress = (badge: Badge) => {
    setSelectedBadge(badge);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setSelectedBadge(null);
  };

  const renderBadge = ({ item: badge }: { item: Badge }) => (
    <Card
      style={[
        styles.badgeCard,
        badge.isUnlocked ? styles.unlockedBadge : styles.lockedBadge,
      ]}
      onPress={() => handleBadgePress(badge)}
    >
      <Card.Content style={styles.badgeContent}>
        <View style={styles.badgeIconContainer}>
          <MaterialCommunityIcons
            name={badge.icon as any}
            size={32}
            color={badge.isUnlocked ? "#6200EE" : "#9E9E9E"}
          />
          {!badge.isUnlocked && (
            <View style={styles.lockOverlay}>
              <MaterialCommunityIcons name="lock" size={16} color="#757575" />
            </View>
          )}
        </View>
        <Text
          variant="bodyMedium"
          style={[
            styles.badgeName,
            { color: badge.isUnlocked ? "#000" : "#9E9E9E" },
          ]}
          numberOfLines={2}
        >
          {badge.name}
        </Text>
        {badge.isUnlocked && (
          <BadgeChip size={16} style={styles.earnedBadge}>
            Earned
          </BadgeChip>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <ScreenHeader
          title={t("rewards.title")}
          subtitle={t("rewards.subtitle")}
        />

        {/* Points Display */}
        <Card style={styles.pointsCard}>
          <Card.Content style={styles.pointsContent}>
            <View style={styles.pointsHeader}>
              <MaterialCommunityIcons name="star" size={32} color="#FFD700" />
              <Text variant="headlineMedium" style={styles.pointsTitle}>
                Total Points Earned
              </Text>
            </View>
            <Text variant="displaySmall" style={styles.pointsValue}>
              {totalPoints}
            </Text>
          </Card.Content>
        </Card>

        {/* Progress Summary */}
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Your Progress
            </Text>
            <View style={styles.progressRow}>
              <View style={styles.progressItem}>
                <Text variant="headlineSmall" style={styles.progressNumber}>
                  {unlockedBadges.length}
                </Text>
                <Text variant="bodyMedium" style={styles.progressLabel}>
                  Badges Earned
                </Text>
              </View>
              <View style={styles.progressItem}>
                <Text variant="headlineSmall" style={styles.progressNumber}>
                  {userBadges.length - unlockedBadges.length}
                </Text>
                <Text variant="bodyMedium" style={styles.progressLabel}>
                  Badges to Unlock
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Earned Badges Section */}
        {unlockedBadges.length > 0 && (
          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              🏆 Earned Badges ({unlockedBadges.length})
            </Text>
            <FlatList
              data={unlockedBadges}
              renderItem={renderBadge}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.badgeRow}
            />
          </View>
        )}

        {/* Available Badges Section */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            🎯 Available Badges ({lockedBadges.length})
          </Text>
          <Text variant="bodyMedium" style={styles.sectionSubtitle}>
            Complete tasks to unlock these achievements!
          </Text>
          <FlatList
            data={lockedBadges}
            renderItem={renderBadge}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.badgeRow}
          />
        </View>
      </ScrollView>

      {/* Badge Detail Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContent}
        >
          {selectedBadge && (
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <MaterialCommunityIcons
                  name={selectedBadge.icon as any}
                  size={48}
                  color={selectedBadge.isUnlocked ? "#6200EE" : "#9E9E9E"}
                />
                <Text variant="headlineSmall" style={styles.modalTitle}>
                  {selectedBadge.name}
                </Text>
                {selectedBadge.isUnlocked && (
                  <BadgeChip size={16} style={styles.modalEarnedBadge}>
                    ✓ Earned
                  </BadgeChip>
                )}
              </View>
              <Text variant="bodyLarge" style={styles.modalDescription}>
                {selectedBadge.description}
              </Text>
              <Button
                mode="contained"
                onPress={hideModal}
                style={styles.modalButton}
              >
                Close
              </Button>
            </View>
          )}
        </Modal>
      </Portal>
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
    padding: 16,
  },
  pointsCard: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  pointsContent: {
    alignItems: "center",
    paddingVertical: 24,
  },
  pointsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  pointsTitle: {
    marginLeft: 8,
    color: "#333",
  },
  pointsValue: {
    fontWeight: "bold",
    color: "#6200EE",
  },
  summaryCard: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  progressItem: {
    alignItems: "center",
  },
  progressNumber: {
    fontWeight: "bold",
    color: "#6200EE",
  },
  progressLabel: {
    color: "#666",
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
    color: "#333",
  },
  sectionSubtitle: {
    color: "#666",
    marginBottom: 16,
  },
  badgeRow: {
    justifyContent: "space-between",
  },
  badgeCard: {
    flex: 1,
    margin: 4,
    minHeight: 120,
  },
  unlockedBadge: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#6200EE",
  },
  lockedBadge: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  badgeContent: {
    alignItems: "center",
    paddingVertical: 16,
  },
  badgeIconContainer: {
    position: "relative",
    marginBottom: 8,
  },
  lockOverlay: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 2,
  },
  badgeName: {
    textAlign: "center",
    marginBottom: 8,
    minHeight: 32,
  },
  earnedBadge: {
    backgroundColor: "#4CAF50",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    margin: 20,
    borderRadius: 8,
  },
  modalContainer: {
    alignItems: "center",
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    marginTop: 8,
    marginBottom: 8,
    textAlign: "center",
  },
  modalEarnedBadge: {
    backgroundColor: "#4CAF50",
  },
  modalDescription: {
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
  modalButton: {
    minWidth: 120,
  },
});
