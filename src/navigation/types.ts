export type WelcomeStackParamList = {
  Welcome: undefined;
  TrialQuestionnaire: undefined;
  TrialResults: {
    answers: Record<string, any>;
  };
  TrialApplication: {
    trialId: string;
    trialTitle: string;
  };
  ApplicationSuccess: {
    trialTitle: string;
  };
};

export type OnboardingStackParamList = {
  LanguageSelection: undefined;
  Login: undefined;
  PinSetup: undefined;
  AadhaarKyc: undefined;
  InformedConsent: undefined;
  VoiceConsent: undefined;
  ComprehensionQuiz: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Rewards: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  DailyCheckin: undefined;
  DoseTracking: undefined;
  QrScanner: undefined;
  VideoRecorder: undefined;
  Emergency: undefined;
  ReportEvent: undefined;
};

export type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Main: undefined;
};
