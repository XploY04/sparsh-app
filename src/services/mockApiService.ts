// Mock API service for development and testing
import {
  ActivationCredentials,
  ActivationResponse,
  ParticipantProfile,
  DataSubmissionPayload,
} from "./authService";

interface MockDatabase {
  participants: Record<
    string,
    {
      participantCode: string;
      temporaryPin: string;
      participantId: string;
      profile: any;
      activated: boolean;
    }
  >;
  dataPoints: any[];
}

// Mock database
const mockDb: MockDatabase = {
  participants: {
    DEMO001: {
      participantCode: "DEMO001",
      temporaryPin: "1234",
      participantId: "participant_001",
      activated: false,
      profile: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+91-9876543210",
      },
    },
    DEMO002: {
      participantCode: "DEMO002",
      temporaryPin: "5678",
      participantId: "participant_002",
      activated: false,
      profile: {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "+91-9876543211",
      },
    },
  },
  dataPoints: [],
};

const mockConsentText = `
INFORMED CONSENT FORM - Clinical Trial ABC123

STUDY TITLE: Sparsh Health Monitoring Trial

INTRODUCTION:
You are being invited to participate in this clinical research study. This document provides important information about the study.

PURPOSE OF THE STUDY:
This study aims to evaluate the effectiveness of digital health monitoring tools in improving patient outcomes for participants with chronic conditions.

STUDY PROCEDURES:
• Daily health check-ins via mobile app
• Weekly virtual consultations with study physician
• Monthly lab tests at designated facilities
• Continuous monitoring of vital signs using wearable devices

DURATION:
The study will last approximately 6 months.

RISKS AND BENEFITS:
Potential risks are minimal and include:
• Minor skin irritation from wearable devices
• Time commitment for study activities

Potential benefits include:
• Enhanced monitoring of your health condition
• Access to digital health tools
• Close medical supervision

VOLUNTARY PARTICIPATION:
Your participation is entirely voluntary. You may withdraw at any time without penalty.

CONFIDENTIALITY:
Your personal health information will be kept strictly confidential and used only for research purposes.

COMPENSATION:
You will receive compensation for time and travel expenses related to study participation.

CONTACT INFORMATION:
Principal Investigator: Dr. Rajesh Kumar
Phone: +91-11-2345-6789
Email: rajesh.kumar@sparshhealth.com

24/7 Emergency Contact: +91-98765-43210

By proceeding, you acknowledge that you have read and understood this information.
`;

const mockQuizQuestions = [
  {
    id: "q1",
    text: {
      en: "What is the primary purpose of this study?",
      hi: "इस अध्ययन का मुख्य उद्देश्य क्या है?",
    },
    options: [
      {
        value: "a",
        label: {
          en: "To sell health products",
          hi: "स्वास्थ्य उत्पाद बेचना",
        },
      },
      {
        value: "b",
        label: {
          en: "To evaluate digital health monitoring tools",
          hi: "डिजिटल स्वास्थ्य निगरानी उपकरणों का मूल्यांकन करना",
        },
      },
      {
        value: "c",
        label: {
          en: "To collect personal data",
          hi: "व्यक्तिगत डेटा एकत्र करना",
        },
      },
    ],
    correctAnswer: "b",
  },
  {
    id: "q2",
    text: {
      en: "How long will the study last?",
      hi: "अध्ययन कितने समय तक चलेगा?",
    },
    options: [
      {
        value: "a",
        label: {
          en: "3 months",
          hi: "3 महीने",
        },
      },
      {
        value: "b",
        label: {
          en: "6 months",
          hi: "6 महीने",
        },
      },
      {
        value: "c",
        label: {
          en: "1 year",
          hi: "1 साल",
        },
      },
    ],
    correctAnswer: "b",
  },
  {
    id: "q3",
    text: {
      en: "Can you withdraw from the study at any time?",
      hi: "क्या आप किसी भी समय अध्ययन से हट सकते हैं?",
    },
    options: [
      {
        value: "a",
        label: {
          en: "No, once enrolled you must complete",
          hi: "नहीं, एक बार नामांकित होने के बाद आपको पूरा करना होगा",
        },
      },
      {
        value: "b",
        label: {
          en: "Yes, but only with penalty",
          hi: "हां, लेकिन जुर्माने के साथ",
        },
      },
      {
        value: "c",
        label: {
          en: "Yes, at any time without penalty",
          hi: "हां, किसी भी समय बिना जुर्माने के",
        },
      },
    ],
    correctAnswer: "c",
  },
];

// Utility function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate a mock JWT token
const generateMockToken = (participantId: string): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      participantId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
      iat: Math.floor(Date.now() / 1000),
    })
  );
  const signature = "mock_signature_" + Math.random().toString(36).substring(7);

  return `${header}.${payload}.${signature}`;
};

export class MockApiService {
  /**
   * Mock implementation of POST /api/auth/participant/activate
   */
  static async activateAccount(
    credentials: ActivationCredentials
  ): Promise<ActivationResponse> {
    await delay(1500); // Simulate network delay

    const participant = mockDb.participants[credentials.participantCode];

    if (!participant) {
      return {
        success: false,
        message: "Invalid participant code",
      };
    }

    if (participant.temporaryPin !== credentials.temporaryPin) {
      return {
        success: false,
        message: "Invalid temporary PIN",
      };
    }

    if (participant.activated) {
      return {
        success: false,
        message: "Account already activated",
      };
    }

    // Mark as activated and generate token
    participant.activated = true;
    const token = generateMockToken(participant.participantId);

    return {
      success: true,
      token,
      participantId: participant.participantId,
      message: "Account activated successfully",
    };
  }

  /**
   * Mock implementation of GET /api/participant/me/profile
   */
  static async getParticipantProfile(
    participantCode: string
  ): Promise<ParticipantProfile | null> {
    await delay(1000);

    const participant = mockDb.participants[participantCode];

    if (!participant || !participant.activated) {
      return null;
    }

    return {
      participantId: participant.participantId,
      participantCode: participant.participantCode,
      trialId: "TRIAL_ABC123",
      consentFormText: mockConsentText,
      comprehensionQuiz: {
        questions: mockQuizQuestions,
      },
      profile: participant.profile,
    };
  }

  /**
   * Mock implementation of POST /api/data
   */
  static async submitDataPoint(
    payload: DataSubmissionPayload
  ): Promise<{ success: boolean; message?: string }> {
    await delay(800);

    // Store in mock database
    mockDb.dataPoints.push({
      id: `data_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      ...payload,
      submittedAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Data submitted successfully",
    };
  }

  /**
   * Get all mock participants (for development/testing)
   */
  static getMockParticipants() {
    return Object.values(mockDb.participants).map((p) => ({
      participantCode: p.participantCode,
      temporaryPin: p.temporaryPin,
      activated: p.activated,
    }));
  }

  /**
   * Get all submitted data points (for development/testing)
   */
  static getSubmittedDataPoints() {
    return mockDb.dataPoints;
  }

  /**
   * Reset mock database (for testing)
   */
  static resetMockData() {
    Object.values(mockDb.participants).forEach((p) => {
      p.activated = false;
    });
    mockDb.dataPoints = [];
  }
}
