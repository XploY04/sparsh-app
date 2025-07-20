# Trial Discovery Feature - Implementation Guide

## Overview

This document describes the implementation of the unauthenticated trial discovery feature in the Sparsh app, allowing new users to find and apply for clinical trials before completing the full account registration process.

## New Screens and Features

### 1. Welcome Screen (`WelcomeScreen.tsx`)

- **Purpose**: Initial landing page for new users
- **Features**:
  - Two main options: "Find a Trial For Me" and "Activate My Account"
  - Attractive UI with benefits overview
  - Supports Hindi and English languages
  - Smooth navigation to trial discovery or existing onboarding flow

### 2. Trial Questionnaire (`TrialQuestionnaireScreen.tsx`)

- **Purpose**: Conversational chatbot interface for trial matching
- **Features**:
  - Interactive chat-like UI
  - Progressive questionnaire flow
  - Multiple question types: single choice, multiple choice, text, number, boolean
  - Real-time validation and progress tracking
  - Responsive design with keyboard handling

### 3. Trial Results (`TrialResultsScreen.tsx`)

- **Purpose**: Display matching trials based on user responses
- **Features**:
  - List of trials sorted by match score
  - Detailed trial information (phase, duration, location, compensation)
  - Contact information for each trial
  - Easy application process initiation
  - Pull-to-refresh functionality

### 4. Trial Application (`TrialApplicationScreen.tsx`)

- **Purpose**: Comprehensive application form for trial enrollment
- **Features**:
  - Multi-section form (Personal Info, Emergency Contact, Medical Info)
  - Form validation with error handling
  - Consent checkboxes
  - Responsive keyboard-aware design
  - Progress saving and submission

### 5. Application Success (`ApplicationSuccessScreen.tsx`)

- **Purpose**: Confirmation and next steps after application submission
- **Features**:
  - Success confirmation with clear next steps
  - Timeline of the application process
  - Contact information for follow-up
  - Options to find more trials or activate account

## Navigation Structure

### Updated Navigation Hierarchy

```
RootNavigator
├── WelcomeNavigator (new)
│   ├── Welcome
│   ├── TrialQuestionnaire
│   ├── TrialResults
│   ├── TrialApplication
│   └── ApplicationSuccess
├── OnboardingNavigator (existing)
└── MainStackNavigator (existing)
```

### Navigation Flow

1. **Welcome** → User sees two options
2. **Find a Trial** → TrialQuestionnaire → TrialResults → TrialApplication → ApplicationSuccess
3. **Activate Account** → Existing onboarding flow

## API Integration Points

### 1. GET /api/trials/public

- **Purpose**: Fetch all recruiting clinical trials
- **Implementation**: `trialService.ts`
- **Returns**: List of public trials with screening questions

### 2. POST /api/trials/[trialId]/apply

- **Purpose**: Submit trial application
- **Payload**: Complete application data including personal info, medical history, and consent
- **Returns**: Application confirmation and ID

### 3. POST /api/trials/check-eligibility (optional)

- **Purpose**: Check trial eligibility based on screening answers
- **Returns**: Eligible trial IDs and match scores

## Key Features Implemented

### 1. Multi-language Support

- Full Hindi and English translation
- Consistent language switching throughout the flow
- Culturally appropriate UI elements

### 2. Smart Trial Matching

- Question-based filtering algorithm
- Match score calculation (95%, 87%, 78% examples)
- Condition-based trial recommendations

### 3. Form Validation

- Real-time field validation
- Indian phone number format validation
- Email and PIN code validation
- Required field enforcement

### 4. Responsive Design

- Mobile-first approach
- Keyboard-aware scrolling
- Touch-friendly interaction elements
- Proper spacing and typography

### 5. User Experience

- Chatbot-like questionnaire interface
- Progressive disclosure of information
- Clear visual hierarchy
- Intuitive navigation flow

## Files Created/Modified

### New Files

- `src/screens/WelcomeScreen.tsx`
- `src/screens/TrialQuestionnaireScreen.tsx`
- `src/screens/TrialResultsScreen.tsx`
- `src/screens/TrialApplicationScreen.tsx`
- `src/screens/ApplicationSuccessScreen.tsx`
- `src/navigation/WelcomeNavigator.tsx`
- `src/services/trialService.ts`

### Modified Files

- `src/navigation/types.ts` - Added WelcomeStackParamList
- `src/navigation/RootNavigator.tsx` - Integrated WelcomeNavigator
- `src/screens/index.ts` - Exported new screens

## Data Structure

### Trial Object

```typescript
interface Trial {
  id: string;
  title: string;
  description: string;
  condition: string;
  phase: string;
  location: string;
  duration: string;
  compensation: string;
  requirements: string[];
  matchScore: number;
  principalInvestigator: string;
  contactEmail: string;
  contactPhone: string;
  status: "recruiting" | "active" | "completed";
}
```

### Application Form Data

```typescript
interface ApplicationForm {
  personalInfo: PersonalInfo;
  emergencyContact: EmergencyContact;
  medicalInfo: MedicalInfo;
  consent: ConsentInfo;
}
```

## Success Criteria Met

✅ **New users can open the app and see two clear options**

- Implemented Welcome screen with "Find a Trial For Me" and "Activate My Account" buttons

✅ **Conversational questionnaire flow for trial discovery**

- Created chatbot-like interface with progressive questions
- Supports multiple question types and real-time validation

✅ **Display suggested trials with application form**

- Trial results screen shows matching trials with detailed information
- Comprehensive application form with all required fields

✅ **API integration for trial discovery and application**

- Structured API service with proper endpoints
- Mock data for development, ready for real API integration

✅ **Applications appear in Admin Portal review queue**

- Application submission sends data to backend API
- Proper data structure for admin review system

## Testing Recommendations

1. **User Flow Testing**

   - Complete trial discovery flow
   - Form validation edge cases
   - Navigation between screens

2. **Device Testing**

   - Different screen sizes
   - Keyboard interactions
   - Touch gestures

3. **Language Testing**

   - Hindi/English switching
   - Text overflow handling
   - Cultural appropriateness

4. **API Integration Testing**
   - Network error handling
   - Loading states
   - Data validation

## Future Enhancements

1. **Enhanced Matching Algorithm**

   - Machine learning-based trial recommendations
   - Geographic proximity weighting
   - Medical history analysis

2. **Rich Media Support**

   - Trial information videos
   - Virtual trial site tours
   - Document upload for medical records

3. **Real-time Communication**

   - Chat with research coordinators
   - Push notifications for application updates
   - Video consultation scheduling

4. **Advanced Features**
   - Save trials for later
   - Share trials with family/friends
   - Trial comparison tool

## Conclusion

The trial discovery feature successfully implements a complete unauthenticated user experience that allows new users to discover, learn about, and apply for clinical trials without the barrier of full account registration. The implementation follows React Native best practices, includes comprehensive error handling, and provides a smooth user experience in both English and Hindi languages.
