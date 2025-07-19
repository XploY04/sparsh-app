# Sparsh Participant Mobile App - Stage 2

A React Native (Expo) application for clinical trial participants with complete onboarding flow and core trial functionality including daily check-ins, dose tracking, and main dashboard, built with TypeScript.

## 🚀 Features

### Stage 2 Implementation (Current)

- **Main Dashboard**: Central hub with personalized greetings and task management
- **Voice-based ePRO**: Daily check-ins with conversational voice interface
- **Dose Verification**: QR code scanning and video recording options
- **Bottom Tab Navigation**: Professional tab-based main app navigation
- **Task Management**: Real-time task status updates and completion tracking
- **Camera Integration**: Full camera permissions and functionality for verification
- **Profile Management**: Settings, participant ID, language switching, and logout

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

## 📱 App Flow

### Onboarding (Stage 1)

1. **Language Selection**: Choose between English and Hindi
2. **Login/Registration**: Mobile number + OTP verification
3. **PIN Setup**: 4-digit security PIN creation
4. **Aadhaar KYC**: Identity verification simulation
5. **Informed Consent**: Digital consent form with read-aloud
6. **Voice Consent**: Audio consent recording
7. **Comprehension Quiz**: Understanding verification
8. **Main App**: Automatic transition to core functionality

### Main App (Stage 2)

- **Dashboard Tab**: View daily tasks, track progress, personalized greetings
- **Daily Check-in**: Voice-based symptom and side effect reporting
- **Dose Tracking**: Medication verification via QR scan or video recording
- **Rewards Tab**: Placeholder for Stage 3 gamification features
- **Profile Tab**: Settings, participant info, language, and logout

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
│   ├── DashboardScreen.tsx          # Main participant hub
│   ├── DailyCheckinScreen.tsx       # Voice-based ePRO
│   ├── DoseTrackingScreen.tsx       # Dose verification
│   ├── QrScannerScreen.tsx          # QR code scanning
│   ├── VideoRecorderScreen.tsx      # Video recording
│   ├── RewardsPlaceholderScreen.tsx # Stage 3 placeholder
│   ├── ProfileScreen.tsx            # Settings & logout
│   └── index.ts
├── navigation/         # Navigation configuration
│   ├── RootNavigator.tsx
│   ├── OnboardingNavigator.tsx
│   ├── MainStackNavigator.tsx       # Main app navigation
│   ├── MainTabNavigator.tsx         # Bottom tab navigation
│   └── types.ts
├── store/             # State management
│   └── appStore.ts
├── data/              # Mock data & utilities
│   ├── tasks.ts                     # Task management
│   └── mockData.ts                  # Onboarding data
├── locales/           # Internationalization
│   ├── en.json
│   ├── hi.json
│   └── i18n.ts
```

## 🛠️ Technologies Used

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v7 (Stack & Bottom Tabs)
- **UI Library**: React Native Paper
- **State Management**: Zustand
- **Camera**: Expo Camera for QR scanning and video recording
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

### Stage 2 Features

- **Dashboard Management**: Real-time task status updates
- **Voice ePRO**: Conversational interface with transcription simulation
- **Camera Integration**: QR scanning and video recording capabilities
- **Task System**: Dynamic task management with completion tracking
- **Bottom Tab Navigation**: Professional clinical app interface

### Language Support

- Automatic device language detection
- Manual language switching from Profile
- Complete UI translation for English and Hindi including Stage 2 features

### Mock Implementations

#### Stage 1 (Onboarding)

- **OTP Verification**: Auto-fills "1234" for demonstration
- **Aadhaar KYC**: 2-second simulation with success message
- **Voice Recording**: 3-second timer simulation
- **Quiz Questions**: 3 multiple-choice questions

#### Stage 2 (Core Functionality)

- **Voice Check-in**: 3-second listening + 2-second processing with random responses
- **QR Scanner**: Real camera scanning with instant verification
- **Video Recording**: 10-second max recording with upload simulation
- **Task Status**: Real-time updates across dashboard and screens

### State Management

The app uses Zustand for state management with the following key states:

#### Onboarding States

- `language`: Current app language
- `isAuthenticated`: User authentication status
- `isOnboardingComplete`: Onboarding completion status
- Individual step completion flags

#### Task Management States

- `tasks`: Array of daily tasks with status
- `updateTaskStatus`: Function to update task completion
- Real-time state synchronization across all screens

### Navigation Flow

#### Onboarding (Stage 1)

- Linear progression through onboarding steps
- No back navigation to prevent skipping steps
- Conditional navigation based on completion status

#### Main App (Stage 2)

- Bottom tab navigation for primary features
- Modal stack navigation for task completion flows
- Smooth transitions with proper state management

## 🎯 Stage 2 Deliverables

✅ **Complete functional dashboard with task management**  
✅ **Voice-based daily check-in system (ePRO)**  
✅ **Dual dose verification (QR + Video)**  
✅ **Bottom tab navigation architecture**  
✅ **Real-time task status updates**  
✅ **Camera integration with permissions**  
✅ **Profile management with logout**  
✅ **Rewards placeholder for Stage 3**

## 🔮 Future Enhancements (Stage 3 & Beyond)

### Immediate Next Steps (Stage 3)

- **Gamification**: Points, badges, and rewards system
- **Advanced Analytics**: Detailed progress tracking
- **Push Notifications**: Reminders and engagement
- **Social Features**: Leaderboards and achievements

### Long-term Enhancements

- Real API integration for authentication
- Actual eKYC service integration
- Real audio recording and transcription
- Data synchronization with clinical systems
- Advanced reporting and analytics
- Multi-site trial support
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
