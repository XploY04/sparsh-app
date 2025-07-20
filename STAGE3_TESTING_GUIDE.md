# Stage 3 Testing Guide - Engagement, Safety & Polish

## Overview

This guide provides comprehensive testing procedures for Stage 3 features: Gamification & Rewards System, Emergency Support, and Push Notifications.

## Pre-Testing Setup

### 1. Environment Preparation

```bash
# Start the Expo development server
npm start

# Ensure device/emulator has:
# - Camera permissions enabled
# - Notification permissions available
# - Phone calling capability (for emergency testing)
```

### 2. Reset App State (if needed)

- Open app → Profile → Logout → Complete onboarding again
- This ensures clean testing of gamification progression

## Testing Checklist

## 1. Gamification & Rewards System

### Initial State Testing

- [ ] Navigate to Rewards tab
- [ ] Verify "Total Points Earned: 0" is displayed
- [ ] Confirm "0 Badges Earned, 10 Badges to Unlock" in progress section
- [ ] Check that all badges are shown as locked (greyed out with lock icons)

### Points & Badge Earning - Daily Check-in

- [ ] Go to Dashboard → Daily Check-in
- [ ] Complete the voice recording simulation
- [ ] Confirm check-in completion
- [ ] Return to Rewards tab
- [ ] **Expected**: Points increased by 10, "First Steps" badge unlocked
- [ ] Verify badge is now colored and shows "Earned" chip
- [ ] Tap on "First Steps" badge → confirm modal shows description

### Points & Badge Earning - Dose Tracking

- [ ] Go to Dashboard → Dose Tracking → QR Scanner
- [ ] Complete QR scan simulation
- [ ] Return to Rewards tab
- [ ] **Expected**: Points increased by another 10, "Dose Defender" badge unlocked
- [ ] Total should now be 20 points, 2 badges earned

### Alternative Dose Tracking

- [ ] Go to Dashboard → Dose Tracking → Video Recording
- [ ] Complete video recording simulation
- [ ] Return to Rewards tab
- [ ] **Expected**: Points increased (should be 30 total if this is third task)

### Badge Detail Modal Testing

- [ ] Tap any badge (earned or unearned)
- [ ] Verify modal opens with:
  - [ ] Badge icon
  - [ ] Badge name
  - [ ] Description text
  - [ ] "Earned" chip (if unlocked) or no chip (if locked)
  - [ ] Close button
- [ ] Tap "Close" to dismiss modal

### Streak Testing (Advanced)

- [ ] Complete daily check-in on consecutive days
- [ ] After 3 days: "Getting Started" badge should unlock
- [ ] After 7 days: "Consistency Champion" badge should unlock
- [ ] Note: This requires actual daily testing or date manipulation

### Early Morning Testing

- [ ] Change device time to before 8:00 AM
- [ ] Complete daily check-in
- [ ] After 3 early morning check-ins: "Early Bird" badge should unlock

### Points Milestone Testing

- [ ] Complete enough tasks to reach 100 points (10 tasks total)
- [ ] Verify "Century Scorer" badge unlocks at 100 points

## 2. Emergency Support System

### Emergency FAB Testing

- [ ] On Dashboard tab: Verify red Emergency FAB visible in bottom-right
- [ ] On Rewards tab: Verify Emergency FAB visible
- [ ] On Profile tab: Verify Emergency FAB visible
- [ ] FAB should be positioned above the tab bar

### Emergency Screen Access

- [ ] Tap Emergency FAB from any tab
- [ ] Verify navigation to Emergency Support screen
- [ ] Confirm red header with "Emergency Support" title
- [ ] Check back button functionality

### Emergency Contacts Testing

- [ ] Verify 4 contact cards are displayed:
  - [ ] Trial Medical Team
  - [ ] Emergency Hotline
  - [ ] Principal Investigator
  - [ ] Local Emergency (108)
- [ ] Each card should show:
  - [ ] Icon
  - [ ] Contact title and description
  - [ ] Phone number
  - [ ] "Call" button

### Emergency Calling (BE CAREFUL)

⚠️ **Warning**: These will attempt real phone calls. Use with caution.

- [ ] Tap any "Call" button
- [ ] Verify confirmation dialog appears: "Are you sure you want to call [Title] at [Number]?"
- [ ] Tap "Cancel" → Dialog dismisses, no call made
- [ ] Tap "Call" → Phone app opens with number dialed
- [ ] **Note**: Cancel the call immediately to avoid actual emergency calls

### Adverse Event Reporting

- [ ] On Emergency screen, locate "Report a Serious Adverse Event" section
- [ ] Verify orange warning card with description
- [ ] Tap "Report Adverse Event" button
- [ ] Confirm navigation to Report Event screen

## 3. Adverse Event Reporting

### Report Event Screen UI

- [ ] Verify orange header with "Report Adverse Event" title
- [ ] Check emergency notice at top (red warning card)
- [ ] Confirm form sections:
  - [ ] Event description text area
  - [ ] Severity level radio buttons (4 options)
  - [ ] Medication relation checkbox
  - [ ] Info section with "What happens next?"

### Form Validation Testing

- [ ] Tap "Submit" with empty form
- [ ] **Expected**: Error alert "Please describe the adverse event"
- [ ] Enter event description only, tap "Submit"
- [ ] **Expected**: Error alert "Please select the severity level"

### Successful Form Submission

- [ ] Fill in event description: "Test adverse event description"
- [ ] Select severity level: "Moderate - Interferes with daily activities"
- [ ] Check medication relation checkbox
- [ ] Tap "Submit Adverse Event Report"
- [ ] **Expected**:
  - [ ] Button shows "Submitting Report..." with loading
  - [ ] After 2 seconds: Success alert appears
  - [ ] Alert message: "The trial team has been notified. Please seek medical attention if required."
  - [ ] Tap "OK" → navigates back to Emergency screen

### Form Reset Testing

- [ ] Navigate back to Report Event screen
- [ ] Verify form is reset (empty fields, no selections)

## 4. Push Notifications

### Permission Request Testing

- [ ] Fresh app install or reset permissions in device settings
- [ ] Complete onboarding flow
- [ ] **Expected**: Notification permission dialog appears
- [ ] Grant permissions
- [ ] Check device notification settings for app

### Notification Scheduling Verification

- [ ] After completing onboarding, check logs in development console
- [ ] **Expected**: Console message "Notifications setup completed successfully"
- [ ] Use device notification settings to verify scheduled notifications

### Background Notification Testing

⚠️ **Note**: This requires actual time-based testing or device time manipulation

- [ ] Set device time to 8:59 AM
- [ ] Close app completely
- [ ] Wait for device time to reach 9:00 AM
- [ ] **Expected**: "Sparsh Daily Check-in" notification appears
- [ ] Tap notification → app opens (should navigate to appropriate screen)

### Multiple Notification Types

Test by changing device time to these hours:

- [ ] 8:00 AM → "Morning Medication" notification
- [ ] 9:00 AM → "Sparsh Daily Check-in" notification
- [ ] 6:00 PM → "Stay on Track! 🏆" notification
- [ ] 8:00 PM → "Medication Reminder" notification

### Notification Cleanup Testing

- [ ] Go to Profile → Logout
- [ ] **Expected**: All scheduled notifications should be cancelled
- [ ] Check device notification settings to verify cleanup

## 5. Integration Testing

### Cross-Feature Testing

- [ ] Complete check-in → Emergency FAB still visible → Emergency features work
- [ ] Earn badge → Emergency features still work → Notifications still scheduled
- [ ] Report adverse event → Gamification still works → FAB still visible

### Navigation Flow Testing

- [ ] Dashboard → Check-in → Complete → Back → Rewards (verify points)
- [ ] Rewards → Badge tap → Modal → Close → Emergency FAB → Emergency screen
- [ ] Emergency → Report Event → Back → Back → Dashboard (full navigation)

### Localization Testing

- [ ] Switch language to Hindi in Profile
- [ ] Navigate through all new screens:
  - [ ] Rewards screen text in Hindi
  - [ ] Emergency screen text in Hindi
  - [ ] Report Event screen text in Hindi
- [ ] Switch back to English and verify text changes

## 6. Performance Testing

### Memory Usage

- [ ] Use development tools to monitor memory
- [ ] Navigate between screens multiple times
- [ ] Open/close badge modals repeatedly
- [ ] Verify no memory leaks

### Smooth Animations

- [ ] Badge card interactions should be smooth
- [ ] Modal opening/closing should be fluid
- [ ] FAB press animation should be responsive
- [ ] Screen transitions should be seamless

## 7. Error Handling Testing

### Network Simulation

- [ ] Turn off internet connection
- [ ] Attempt to submit adverse event report
- [ ] **Expected**: Graceful handling (in real implementation)

### Permission Denial

- [ ] Deny notification permissions
- [ ] **Expected**: App continues to function normally
- [ ] Deny phone permissions → Emergency calls should show appropriate error

### Edge Cases

- [ ] Very long adverse event description (test text area)
- [ ] Multiple rapid badge taps (test modal state)
- [ ] Multiple rapid FAB taps (test navigation)

## 8. Accessibility Testing

### Screen Reader Testing

- [ ] Enable device screen reader (TalkBack/VoiceOver)
- [ ] Navigate through Rewards screen
- [ ] Verify badge descriptions are read aloud
- [ ] Test Emergency screen accessibility
- [ ] Confirm form elements have proper labels

### Touch Target Testing

- [ ] Verify all buttons are easily tappable
- [ ] Badge cards should have adequate touch area
- [ ] FAB should be easily accessible
- [ ] Form inputs should be properly sized

## Common Issues & Troubleshooting

### Issue: Points not updating

- **Solution**: Check if task completion calls `recordCheckin()` or `recordDose()`
- **Verification**: Check store state in development tools

### Issue: Emergency FAB not visible

- **Solution**: Verify MainTabNavigator includes EmergencyFAB component
- **Check**: Ensure FAB positioning is correct relative to tab bar

### Issue: Notifications not appearing

- **Solution**: Check permissions, verify expo-notifications installation
- **Debug**: Check console logs for notification setup messages

### Issue: Badge modal not opening

- **Solution**: Verify state management for modal visibility
- **Check**: Ensure Portal component is properly configured

### Issue: Emergency calls not working

- **Solution**: Test on physical device (simulators may not support calls)
- **Verify**: Check phone permission status

## Test Completion Checklist

### Must Pass Tests

- [ ] All gamification features work (points, badges, streaks)
- [ ] Emergency FAB is visible and functional on all tabs
- [ ] Emergency contacts display and navigation works
- [ ] Adverse event form validates and submits
- [ ] Notification permissions are requested
- [ ] All screens display correctly in both languages

### Optional Advanced Tests

- [ ] Long-term streak testing (multi-day)
- [ ] Actual notification delivery testing
- [ ] Performance under heavy usage
- [ ] Complex user flow combinations

## Success Criteria

✅ **Stage 3 is complete when**:

1. All gamification features are functional and engaging
2. Emergency support is easily accessible and works reliably
3. Push notifications are properly configured and scheduled
4. All new features integrate seamlessly with existing app
5. User experience is polished and professional
6. Both English and Hindi languages are fully supported

## Reporting Issues

When reporting bugs, include:

- Device/emulator information
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos if relevant
- Console logs if applicable

---

**Note**: This testing guide assumes all Stage 1 and Stage 2 features are already functional. If basic functionality is not working, complete testing for previous stages first.
