# Sparsh Participant Mobile App - Stage 1

A React Native (Expo) application for clinical trial participant onboarding with complete user consent flow, built with TypeScript.

## 🚀 Features

### Stage 1 Implementation

- **Multi-language Support**: English and Hindi with i18n
- **Complete Onboarding Flow**: 8-step guided user journey
- **State Management**: Zustand for global app state
- **Modern UI**: React Native Paper components
- **Navigation**: React Navigation with stack navigation
- **Mock Authentication**: OTP-based login simulation
- **eKYC Simulation**: Aadhaar verification mockup
- **Consent Management**: Digital and voice consent recording
- **Comprehension Quiz**: Ensures participant understanding

## 📱 Onboarding Flow

1. **Language Selection**: Choose between English and Hindi
2. **Login/Registration**: Mobile number + OTP verification
3. **PIN Setup**: 4-digit security PIN creation
4. **Aadhaar KYC**: Identity verification simulation
5. **Informed Consent**: Digital consent form with read-aloud
6. **Voice Consent**: Audio consent recording
7. **Comprehension Quiz**: Understanding verification
8. **Dashboard**: Onboarding completion

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ScreenHeader.tsx
│   ├── OtpInput.tsx
│   ├── PinInput.tsx
│   └── index.ts
├── screens/            # Screen components
│   ├── LanguageSelectionScreen.tsx
│   ├── LoginScreen.tsx
│   ├── PinSetupScreen.tsx
│   ├── AadhaarKycScreen.tsx
│   ├── InformedConsentScreen.tsx
│   ├── VoiceConsentScreen.tsx
│   ├── ComprehensionQuizScreen.tsx
│   ├── DashboardPlaceholderScreen.tsx
│   └── index.ts
├── navigation/         # Navigation configuration
│   ├── RootNavigator.tsx
│   ├── OnboardingNavigator.tsx
│   └── types.ts
├── store/             # State management
│   └── appStore.ts
├── locales/           # Internationalization
│   ├── en.json
│   ├── hi.json
│   └── i18n.ts
└── data/              # Mock data
    └── mockData.ts
```

## 🛠️ Technologies Used

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v7
- **UI Library**: React Native Paper
- **State Management**: Zustand
- **Internationalization**: i18n-js with expo-localization
- **Icons**: React Native Vector Icons

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sparsh-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on device/simulator**

   ```bash
   # For Android
   npm run android

   # For iOS (macOS only)
   npm run ios

   # For Web
   npm run web
   ```

## 🔧 Development

### Prerequisites

- Node.js (v16 or later)
- Expo CLI

### Optional (for native development)

- Android Studio (for Android emulator) - See ANDROID_SETUP.md
- Xcode (for iOS development, macOS only)

### Quick Start Options

#### Option 1: Use Expo Go App (Recommended)

1. Install **Expo Go** from Google Play Store / App Store
2. Run `npm start`
3. Scan QR code with Expo Go app
4. App loads directly on your device!

#### Option 2: Web Browser

```bash
npm run web
```

Opens at http://localhost:8082

#### Option 3: Native Development (requires setup)

```bash
npm run android  # Requires Android SDK setup
npm run ios      # Requires macOS and Xcode
```

### Scripts

- `npm start` - Start Expo development server with QR code
- `npm run web` - Run in web browser (easiest for testing)
- `npm run android` - Run on Android device/emulator (requires SDK)
- `npm run ios` - Run on iOS device/simulator (macOS only)

## 📋 Key Features Details

### Language Support

- Automatic device language detection
- Manual language switching
- Complete UI translation for English and Hindi

### Mock Implementations

- **OTP Verification**: Auto-fills "1234" for demonstration
- **Aadhaar KYC**: 2-second simulation with success message
- **Voice Recording**: 3-second timer simulation
- **Quiz Questions**: 3 multiple-choice questions

### State Management

The app uses Zustand for state management with the following key states:

- `language`: Current app language
- `isAuthenticated`: User authentication status
- `isOnboardingComplete`: Onboarding completion status
- Individual step completion flags

### Navigation Flow

- Linear progression through onboarding steps
- No back navigation to prevent skipping steps
- Conditional navigation based on completion status

## 🎯 Stage 1 Deliverables

✅ **Complete onboarding flow implementation**
✅ **Multi-language support (English/Hindi)**
✅ **State management with Zustand**
✅ **Modern UI with React Native Paper**
✅ **Mock authentication and consent flows**
✅ **Comprehensive documentation**

## 🔮 Future Enhancements (Next Stages)

- Real API integration for authentication
- Actual eKYC service integration
- Real audio recording capabilities
- Push notifications
- Data synchronization
- Advanced analytics
- Biometric authentication

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Android build issues**: Ensure Android SDK is properly configured
3. **iOS build issues**: Run `npx pod-install` in iOS directory

### Mock Data Notes

- OTP is automatically set to "1234" for testing
- All verification steps are simulated for demonstration
- Quiz answers are validated in real-time

## 📄 License

This project is part of the Sparsh clinical trial platform development.

## 👥 Contributing

This is a prototype implementation. For production use, replace all mock implementations with real service integrations.

---

**Note**: This is Stage 1 implementation focusing on the foundation and onboarding flow. Future stages will add advanced features and real service integrations.
