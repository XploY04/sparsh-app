// Common style utilities for consistent theming across the app
import { StyleSheet } from 'react-native';
import { textColors, backgroundColors } from './colors';

// Common text styles with proper contrast
export const commonTextStyles = StyleSheet.create({
  primaryText: {
    color: textColors.primary,
  },
  secondaryText: {
    color: textColors.secondary,
  },
  tertiaryText: {
    color: textColors.tertiary,
  },
  errorText: {
    color: textColors.error,
  },
  successText: {
    color: textColors.success,
  },
  warningText: {
    color: textColors.warning,
  },
  infoText: {
    color: textColors.info,
  },
  whiteText: {
    color: textColors.onPrimary,
  },
  
  // Text with weight variations
  titleText: {
    color: textColors.primary,
    fontWeight: '600',
  },
  subtitleText: {
    color: textColors.secondary,
    fontWeight: '500',
  },
  bodyText: {
    color: textColors.primary,
    lineHeight: 22,
  },
  captionText: {
    color: textColors.tertiary,
    fontSize: 12,
  },
});

// Common container styles
export const commonContainerStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: backgroundColors.screen,
  },
  cardContainer: {
    backgroundColor: backgroundColors.card,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  surfaceContainer: {
    backgroundColor: backgroundColors.surface,
    borderRadius: 8,
    padding: 16,
  },
  errorContainer: {
    backgroundColor: backgroundColors.error,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: textColors.error,
  },
  successContainer: {
    backgroundColor: backgroundColors.success,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: textColors.success,
  },
  warningContainer: {
    backgroundColor: backgroundColors.warning,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: textColors.warning,
  },
});

// Common spacing values
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Common border radius values
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

// Elevation/shadow values
export const elevation = {
  none: 0,
  low: 2,
  medium: 4,
  high: 8,
  highest: 16,
};
