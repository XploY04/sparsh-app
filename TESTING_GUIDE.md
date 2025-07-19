# 🧪 Testing Guide - Sparsh App

## ✅ **Current Status**

Your Expo development server is running successfully on port 8084!

## 📱 **Test the Complete App Flow**

### Step 1: Load the App

- **QR Code**: Scan the QR code with Expo Go
- **Web**: Open http://localhost:8084 in your browser
- **Direct URL**: exp://192.168.29.254:8084

### Step 2: Complete User Journey

Test each screen in sequence:

1. **Language Selection**

   - ✅ Choose English or Hindi
   - ✅ Verify language change affects UI

2. **Login Screen**

   - ✅ Enter any 10-digit mobile number (e.g., 9876543210)
   - ✅ OTP auto-fills "1234" after 1 second
   - ✅ Automatic progression to PIN setup

3. **PIN Setup**

   - ✅ Enter 4-digit PIN (e.g., 1234)
   - ✅ Confirm same PIN
   - ✅ Error handling for mismatched PINs

4. **Aadhaar KYC**

   - ✅ Click "Verify with Aadhaar"
   - ✅ Watch 2-second loading simulation
   - ✅ Success message and auto-navigation

5. **Informed Consent**

   - ✅ Scroll through entire consent form
   - ✅ Try "Read Aloud" button (5-second simulation)
   - ✅ "Record Consent" enables after scrolling to end

6. **Voice Consent**

   - ✅ Tap microphone icon
   - ✅ Watch 3-second recording simulation
   - ✅ Success message and continue button

7. **Comprehension Quiz**

   - ✅ Answer 3 multiple-choice questions correctly
   - ✅ Error handling for wrong answers
   - ✅ Completion celebration

8. **Dashboard**
   - ✅ Welcome message
   - ✅ Onboarding complete status

## 🎯 **Quiz Answers (For Testing)**

### English Questions:

1. **Primary purpose?** → "To evaluate safety and efficacy of investigational treatments"
2. **Can you withdraw?** → "Yes, you can withdraw at any time without affecting your regular care"
3. **Personal information?** → "It will be kept strictly confidential and used only for research"

### Hindi Questions:

1. **मुख्य उद्देश्य?** → "अन्वेषणात्मक उपचारों की सुरक्षा और प्रभावकारिता का मूल्यांकन करना"
2. **क्या आप हट सकते हैं?** → "हां, आप किसी भी समय अपनी नियमित देखभाल को प्रभावित किए बिना हट सकते हैं"
3. **व्यक्तिगत जानकारी?** → "इसे सख्त गोपनीयता में रखा जाएगा और केवल अनुसंधान के लिए उपयोग किया जाएगा"

## 🐛 **What to Look For**

### ✅ **Expected Behaviors**

- Smooth navigation between screens
- Language switching works immediately
- Form validation provides helpful feedback
- Loading states show during async operations
- Success messages confirm actions

### ⚠️ **Known Limitations (By Design)**

- All authentication is mocked for demonstration
- Voice recording is simulated (no actual audio)
- KYC verification is fake (2-second delay)
- Quiz has only 3 questions for brevity

## 🔧 **Troubleshooting**

### App Won't Load

- Check Expo Go app is latest version
- Ensure phone and computer are on same WiFi
- Try clearing Expo Go cache

### Navigation Issues

- App intentionally prevents going backwards during onboarding
- Use the reset button on dashboard to restart flow

### Translation Issues

- If text appears as keys (e.g., "login.title"), restart the app
- Language detection should work automatically

## 🎉 **Success Criteria**

Your Stage 1 implementation is successful if:

- ✅ Complete 8-screen flow works end-to-end
- ✅ Both English and Hindi languages work
- ✅ All mock interactions feel realistic
- ✅ State management persists user progress
- ✅ UI is responsive and professional

The app is ready for Stage 2 development!
