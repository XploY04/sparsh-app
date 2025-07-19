const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add support for React Native Web
config.resolver.alias = {
  ...config.resolver.alias,
  "react-native": "react-native-web",
};

config.resolver.platforms = ["web", "ios", "android", "native"];

module.exports = config;
