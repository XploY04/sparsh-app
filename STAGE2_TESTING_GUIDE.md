# Stage 2 Testing Guide

## 🧪 Complete Flow Testing

### Initial Setup

1. **Start the App**: Use `npm start` to launch Expo dev server
2. **Reset State**: If app was previously used, go to Profile tab → Logout to reset
3. **Fresh Start**: This will restart the onboarding flow

### Onboarding Flow (Stage 1 - Should Complete Quickly)

1. **Language Selection**: Choose English or Hindi
2. **Login**: Enter any 10-digit number, OTP auto-fills with "1234"
3. **PIN Setup**: Enter any 4-digit PIN twice
4. **Aadhaar KYC**: Tap "Verify with Aadhaar" and wait 2 seconds
5. **Informed Consent**: Scroll to bottom and tap "Record My Consent"
6. **Voice Consent**: Tap microphone, wait 3 seconds, then "Continue"
7. **Comprehension Quiz**: Answer 3 questions (all are "True")
8. **Completion**: Tap "Proceed to Dashboard"

### Stage 2 Core Functionality Testing

#### Dashboard Navigation

- **Verify Tabs**: Should see Dashboard, Rewards, and Profile tabs at bottom
- **Check Greeting**: Should show personalized greeting with current time
- **View Tasks**: Should display list of daily tasks with different statuses
- **Pending Tasks**: Orange "Due Now" or specific times
- **Completed Tasks**: Green checkmark with "Completed" status

#### Daily Check-in Flow

1. **Start Check-in**: Tap on "Daily Check-in" task (if pending)
2. **Voice Interface**:
   - Should see conversational prompt
   - Large microphone button in center
   - Tap microphone button
3. **Recording Simulation**:
   - Button turns red, shows "Listening..."
   - Wait 3 seconds for listening phase
   - Shows "Processing..." for 2 seconds
   - Displays random transcribed text
4. **Confirmation**:
   - Two buttons: "Yes, that's correct" and "No, try again"
   - Tap "Yes" to complete
   - Should navigate back to dashboard
   - Verify task status changed to "Completed"

#### Dose Tracking Flow

1. **Start Dose Tracking**: Tap on "Take Evening Dose" task (if pending)
2. **Choose Method**: Two large buttons for QR or Video
3. **QR Scanner Option**:
   - Tap "Scan Medication QR Code"
   - Should request camera permission
   - Point camera at any QR code (even on screen)
   - Should show "Dose Verified!" message
   - Navigate back to dashboard
   - Task marked as completed
4. **Video Recorder Option**:
   - Tap "Record Video of Dose"
   - Should request camera permission
   - Front camera should activate
   - Tap "Start Recording"
   - Shows recording timer (max 10 seconds)
   - Tap "Stop Recording" or wait for auto-stop
   - Shows "Video Uploaded Successfully!"
   - Navigate back to dashboard
   - Task marked as completed

#### Profile Management

1. **Navigate to Profile**: Tap Profile tab
2. **View Information**: Should show:
   - Participant ID: SP-2025-001
   - Current language setting
   - Additional menu items
3. **Language Switch**:
   - Tap language option
   - Interface should switch between English/Hindi
   - Navigate to other tabs to verify translation
4. **Logout Test**:
   - Tap "Logout" button
   - Confirm logout in dialog
   - Should return to language selection screen
   - All state should be reset

#### Rewards Tab

1. **Navigate to Rewards**: Tap Rewards tab
2. **Verify Placeholder**: Should show "Rewards and badges coming soon!"
3. **Ready for Stage 3**: Confirm layout and structure

## 🔧 Technical Testing

### Camera Permissions

- **First Launch**: Should properly request camera permission
- **Permission Denied**: Should show appropriate error messages
- **Permission Granted**: Camera should work in both QR and Video screens

### State Management

- **Task Updates**: Verify task completion immediately updates dashboard
- **Navigation State**: Ensure smooth transitions between all screens
- **Data Persistence**: State should persist during app navigation

### UI/UX Testing

- **Responsive Design**: Test on different screen sizes
- **Touch Targets**: Ensure all buttons are easily tappable
- **Visual Feedback**: Confirm loading states and transitions
- **Error States**: Test camera permission denials

### Localization Testing

- **Language Switch**: Test full app in both languages
- **Text Completeness**: Verify all screens have proper translations
- **Dynamic Updates**: Language changes should apply immediately

## 🐛 Known Limitations (By Design)

### Mock Behaviors

- **Voice Recording**: Simulated - uses random preset responses
- **QR Scanning**: Works with any QR code for demo purposes
- **Video Upload**: Simulated upload process
- **Task Timing**: Static task times for demonstration

### Stage 2 Scope

- **Rewards System**: Placeholder only (Stage 3 feature)
- **Real Data**: All data is mocked for prototype purposes
- **Authentication**: Mock OTP system for demo

## ✅ Success Criteria

### Functional Requirements

- [ ] Complete onboarding flow works seamlessly
- [ ] Dashboard displays tasks with proper status
- [ ] Daily check-in voice interface functions correctly
- [ ] Both QR and video dose verification work
- [ ] Profile management and logout function
- [ ] Language switching works across all screens
- [ ] Camera permissions handled properly

### User Experience

- [ ] Intuitive navigation throughout app
- [ ] Smooth transitions between screens
- [ ] Clear visual feedback for all actions
- [ ] Professional medical app appearance
- [ ] Consistent UI patterns and behavior

### Technical Requirements

- [ ] No console errors during normal usage
- [ ] Proper state management across screens
- [ ] Camera integration works on real devices
- [ ] Responsive design on different screen sizes
- [ ] Proper TypeScript typing throughout

This testing guide ensures Stage 2 is fully functional and ready for Stage 3 development!
