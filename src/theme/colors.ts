import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Custom light theme with better contrast
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200EE',
    primaryContainer: '#EADDFF',
    secondary: '#2196F3',
    secondaryContainer: '#E3F2FD',
    tertiary: '#4CAF50',
    tertiaryContainer: '#E8F5E8',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    background: '#FAFAFA',
    error: '#F44336',
    errorContainer: '#FFEBEE',
    warning: '#FF9800',
    warningContainer: '#FFF8E1',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#1A0E3A',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#0D47A1',
    onTertiary: '#FFFFFF',
    onTertiaryContainer: '#1B5E20',
    onSurface: '#1C1B1F',
    onSurfaceVariant: '#49454F',
    onBackground: '#1C1B1F',
    onError: '#FFFFFF',
    onErrorContainer: '#B71C1C',
    outline: '#79747E',
    outlineVariant: '#CAC4D0',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#313033',
    inverseOnSurface: '#F4EFF4',
    inversePrimary: '#D0BCFF',
  },
};

// Custom dark theme (for future use)
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#D0BCFF',
    primaryContainer: '#4F378B',
    secondary: '#90CAF9',
    secondaryContainer: '#1976D2',
    tertiary: '#A5D6A7',
    tertiaryContainer: '#388E3C',
    surface: '#1C1B1F',
    surfaceVariant: '#49454F',
    background: '#1C1B1F',
    error: '#FFB4AB',
    errorContainer: '#93000A',
    warning: '#FFB74D',
    warningContainer: '#F57C00',
    onPrimary: '#371E73',
    onPrimaryContainer: '#EADDFF',
    onSecondary: '#003258',
    onSecondaryContainer: '#CCE7FF',
    onTertiary: '#003A03',
    onTertiaryContainer: '#C8E6C9',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    onBackground: '#E6E1E5',
    onError: '#690005',
    onErrorContainer: '#FFDAD6',
    outline: '#938F99',
    outlineVariant: '#49454F',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#E6E1E5',
    inverseOnSurface: '#313033',
    inversePrimary: '#6750A4',
  },
};

// Text color utilities for better readability
export const textColors = {
  primary: '#1C1B1F',      // Dark text for light backgrounds
  secondary: '#49454F',     // Medium dark text
  tertiary: '#79747E',      // Lighter text for subtle content
  onPrimary: '#FFFFFF',     // White text for colored backgrounds
  error: '#B71C1C',         // Error text
  success: '#1B5E20',       // Success text
  warning: '#E65100',       // Warning text
  info: '#0D47A1',          // Info text
};

// Background color utilities
export const backgroundColors = {
  screen: '#FAFAFA',        // Main screen background
  card: '#FFFFFF',          // Card backgrounds
  surface: '#F5F5F5',       // Surface backgrounds
  primary: '#6200EE',       // Primary colored backgrounds
  secondary: '#E3F2FD',     // Secondary colored backgrounds
  error: '#FFEBEE',         // Error backgrounds
  success: '#E8F5E8',       // Success backgrounds
  warning: '#FFF8E1',       // Warning backgrounds
};
