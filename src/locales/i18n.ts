import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from "../locales/en.json";
import hi from "../locales/hi.json";

// Create i18n instance
const i18n = new I18n({
  en,
  hi,
});

// Safely get device locale with fallback
let deviceLocale = "en";
try {
  const locales = Localization.getLocales();
  deviceLocale = locales?.[0]?.languageTag || "en";
} catch (error) {
  console.log("Error getting device locale, defaulting to English:", error);
  deviceLocale = "en";
}

// Set the locale based on device settings, fallback to English
i18n.locale = deviceLocale.startsWith("hi") ? "hi" : "en";

// Enable fallbacks so that if a translation is missing, it will fall back to English
i18n.enableFallback = true;
i18n.defaultLocale = "en";

// Function to set language manually
export const setLanguage = (language: "en" | "hi") => {
  i18n.locale = language;
};

// Function to get current language
export const getCurrentLanguage = (): "en" | "hi" => {
  const currentLocale = i18n.locale || "en";
  return currentLocale.startsWith("hi") ? "hi" : "en";
};

// Translation function with interpolation support
export const t = (key: string, options?: Record<string, any>) => {
  try {
    return i18n.t(key, options);
  } catch (error) {
    console.log("Translation error for key:", key, error);
    return key; // Return the key itself as fallback
  }
};

export default i18n;
