export interface Badge {
  id: string;
  name: string;
  description: string;
  isUnlocked: boolean;
  icon: string;
}

import badgesData from "./badges.json";

export const badges: Badge[] = badgesData;

// Helper functions for badge management
export const getBadgeById = (id: string): Badge | undefined => {
  return badges.find((badge) => badge.id === id);
};

export const getUnlockedBadges = (userBadges: Badge[]): Badge[] => {
  return userBadges.filter((badge) => badge.isUnlocked);
};

export const getLockedBadges = (userBadges: Badge[]): Badge[] => {
  return userBadges.filter((badge) => !badge.isUnlocked);
};

// Badge criteria checking functions
export const checkBadgeCriteria = (
  userStats: {
    checkinStreak: number;
    doseStreak: number;
    totalPoints: number;
    totalCheckins: number;
    totalDoses: number;
    earlyMorningCheckins: number;
  },
  currentBadges: Badge[]
): Badge[] => {
  const updatedBadges = [...currentBadges];

  // Check each badge criteria
  updatedBadges.forEach((badge) => {
    if (badge.isUnlocked) return; // Skip already unlocked badges

    switch (badge.id) {
      case "first_checkin":
        if (userStats.totalCheckins >= 1) {
          badge.isUnlocked = true;
        }
        break;
      case "streak_3":
        if (userStats.checkinStreak >= 3) {
          badge.isUnlocked = true;
        }
        break;
      case "streak_7":
        if (userStats.checkinStreak >= 7) {
          badge.isUnlocked = true;
        }
        break;
      case "streak_30":
        if (userStats.checkinStreak >= 30) {
          badge.isUnlocked = true;
        }
        break;
      case "first_dose":
        if (userStats.totalDoses >= 1) {
          badge.isUnlocked = true;
        }
        break;
      case "dose_streak_7":
        if (userStats.doseStreak >= 7) {
          badge.isUnlocked = true;
        }
        break;
      case "perfect_week":
        if (userStats.checkinStreak >= 7 && userStats.doseStreak >= 7) {
          badge.isUnlocked = true;
        }
        break;
      case "points_100":
        if (userStats.totalPoints >= 100) {
          badge.isUnlocked = true;
        }
        break;
      case "points_500":
        if (userStats.totalPoints >= 500) {
          badge.isUnlocked = true;
        }
        break;
      case "early_bird":
        if (userStats.earlyMorningCheckins >= 3) {
          badge.isUnlocked = true;
        }
        break;
    }
  });

  return updatedBadges;
};
