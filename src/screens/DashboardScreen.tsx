import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, IconButton, Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAppStore } from "../store/appStore";
import { t } from "../locales/i18n";
import { ScreenHeader } from "../components/ScreenHeader";
import { getTaskIcon, getTaskColor } from "../data/tasks";
import { MainStackParamList } from "../navigation/types";
import { textColors, backgroundColors } from "../theme/colors";

type DashboardNavigationProp = StackNavigationProp<MainStackParamList>;

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardNavigationProp>();
  const { tasks, updateTaskStatus } = useAppStore();

  const handleTaskPress = (
    taskId: string,
    taskType: string,
    status: string
  ) => {
    if (status === "completed") return; // Don't navigate for completed tasks

    switch (taskType) {
      case "checkin":
        navigation.navigate("DailyCheckin");
        break;
      case "dose":
        navigation.navigate("DoseTracking");
        break;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <ScreenHeader
            title={t("dashboard.title")}
            subtitle={`${getGreeting()}, Yash!`}
          />

          <View style={styles.section}>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              {t("dashboard.todaysTasks")}
            </Text>

            {pendingTasks.length === 0 && completedTasks.length === 0 ? (
              <Card style={styles.emptyCard}>
                <Card.Content>
                  <Text variant="bodyLarge" style={styles.emptyText}>
                    {t("dashboard.noTasks")}
                  </Text>
                </Card.Content>
              </Card>
            ) : (
              <>
                {/* Pending Tasks */}
                {pendingTasks.map((task) => (
                  <Card
                    key={task.id}
                    style={styles.taskCard}
                    onPress={() =>
                      handleTaskPress(task.id, task.type, task.status)
                    }
                  >
                    <Card.Content style={styles.taskContent}>
                      <View style={styles.taskHeader}>
                        <IconButton
                          icon={getTaskIcon(task.type, task.status)}
                          iconColor={getTaskColor(task.status)}
                          size={24}
                          style={styles.taskIcon}
                        />
                        <View style={styles.taskInfo}>
                          <Text variant="titleMedium" style={styles.taskTitle}>
                            {task.title}
                          </Text>
                          {task.description && (
                            <Text
                              variant="bodySmall"
                              style={styles.taskDescription}
                            >
                              {task.description}
                            </Text>
                          )}
                        </View>
                        <View style={styles.taskRight}>
                          <Chip
                            mode="outlined"
                            style={[
                              styles.timeChip,
                              { borderColor: getTaskColor(task.status) },
                            ]}
                            textStyle={{ color: getTaskColor(task.status) }}
                          >
                            {task.time}
                          </Chip>
                          {task.status === "pending" && (
                            <IconButton
                              icon="chevron-right"
                              size={20}
                              iconColor="#666"
                            />
                          )}
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                ))}

                {/* Completed Tasks */}
                {completedTasks.length > 0 && (
                  <>
                    <Text variant="titleMedium" style={styles.completedTitle}>
                      {t("dashboard.completed")}
                    </Text>
                    {completedTasks.map((task) => (
                      <Card key={task.id} style={styles.completedTaskCard}>
                        <Card.Content style={styles.taskContent}>
                          <View style={styles.taskHeader}>
                            <IconButton
                              icon={getTaskIcon(task.type, task.status)}
                              iconColor={getTaskColor(task.status)}
                              size={24}
                              style={styles.taskIcon}
                            />
                            <View style={styles.taskInfo}>
                              <Text
                                variant="titleMedium"
                                style={styles.completedTaskTitle}
                              >
                                {task.title}
                              </Text>
                              {task.description && (
                                <Text
                                  variant="bodySmall"
                                  style={styles.taskDescription}
                                >
                                  {task.description}
                                </Text>
                              )}
                            </View>
                            <Chip
                              mode="flat"
                              style={[
                                styles.timeChip,
                                { backgroundColor: getTaskColor(task.status) },
                              ]}
                              textStyle={{ color: "white" }}
                            >
                              ✓ {t("dashboard.completed")}
                            </Chip>
                          </View>
                        </Card.Content>
                      </Card>
                    ))}
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColors.screen,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: "600",
    color: textColors.primary,
  },
  emptyCard: {
    marginBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    fontStyle: "italic",
    color: textColors.tertiary,
  },
  taskCard: {
    marginBottom: 12,
    elevation: 2,
    backgroundColor: backgroundColors.card,
  },
  completedTaskCard: {
    marginBottom: 12,
    opacity: 0.7,
    backgroundColor: backgroundColors.card,
  },
  taskContent: {
    paddingVertical: 12,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskIcon: {
    margin: 0,
    marginRight: 8,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontWeight: "600",
    color: textColors.primary,
  },
  completedTaskTitle: {
    fontWeight: "600",
    textDecorationLine: "line-through",
    color: textColors.secondary,
  },
  taskDescription: {
    marginTop: 2,
    color: textColors.secondary,
  },
  taskRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeChip: {
    marginRight: 8,
  },
  completedTitle: {
    marginTop: 24,
    marginBottom: 16,
    color: textColors.secondary,
  },
});
