// API service for trial-related operations
// This would contain actual API calls in a real implementation

export interface TrialScreeningAnswer {
  questionId: string;
  answer: any;
}

export interface TrialApplication {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
  };
  medicalInfo: {
    history: string;
    currentMedications: string;
  };
  consent: {
    termsAgreed: boolean;
    contactAgreed: boolean;
  };
  screeningAnswers: TrialScreeningAnswer[];
}

export interface PublicTrial {
  id: string;
  title: string;
  description: string;
  condition: string;
  phase: string;
  location: string;
  duration: string;
  compensation: string;
  requirements: string[];
  principalInvestigator: string;
  contactEmail: string;
  contactPhone: string;
  status: "recruiting" | "active" | "completed";
  screeningQuestions: ScreeningQuestion[];
}

export interface ScreeningQuestion {
  id: string;
  text: { en: string; hi: string };
  type: "single" | "multiple" | "text" | "number" | "boolean";
  options?: { value: string; label: { en: string; hi: string } }[];
  required: boolean;
}

class TrialApiService {
  private baseUrl = process.env.API_BASE_URL || "https://api.sparsh.com";

  /**
   * Fetch all public recruiting trials
   * GET /api/trials/public
   */
  async getPublicTrials(): Promise<PublicTrial[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/trials/public`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.trials || [];
    } catch (error) {
      console.error("Error fetching public trials:", error);
      throw error;
    }
  }

  /**
   * Submit trial application
   * POST /api/trials/[trialId]/apply
   */
  async submitTrialApplication(
    trialId: string,
    application: TrialApplication
  ): Promise<{ success: boolean; applicationId?: string }> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/trials/${trialId}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(application),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error submitting trial application:", error);
      throw error;
    }
  }

  /**
   * Get trial details including screening questions
   * GET /api/trials/[trialId]/details
   */
  async getTrialDetails(trialId: string): Promise<PublicTrial> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/trials/${trialId}/details`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.trial;
    } catch (error) {
      console.error("Error fetching trial details:", error);
      throw error;
    }
  }

  /**
   * Check trial eligibility based on screening answers
   * POST /api/trials/check-eligibility
   */
  async checkTrialEligibility(
    answers: Record<string, any>
  ): Promise<{ eligibleTrials: string[]; scores: Record<string, number> }> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/trials/check-eligibility`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error checking trial eligibility:", error);
      throw error;
    }
  }
}

export const trialApiService = new TrialApiService();

// Mock data for development - remove in production
export const mockTrialsData = [
  {
    id: "trial-001",
    title: "Diabetes Management Study",
    description:
      "A clinical trial testing a new medication for Type 2 diabetes management with improved glucose control and reduced side effects.",
    condition: "Type 2 Diabetes",
    phase: "Phase 3",
    location: "Mumbai, Delhi, Bangalore",
    duration: "12 months",
    compensation: "₹15,000 per visit",
    requirements: ["Age 25-65", "Type 2 Diabetes", "HbA1c > 7%"],
    principalInvestigator: "Dr. Rajesh Kumar",
    contactEmail: "diabetes.study@sparsh.com",
    contactPhone: "+91-98765-43210",
    status: "recruiting" as const,
    screeningQuestions: [],
  },
  {
    id: "trial-002",
    title: "Hypertension Prevention Trial",
    description:
      "Research study evaluating a novel approach to preventing high blood pressure in at-risk adults through lifestyle intervention and medication.",
    condition: "Hypertension",
    phase: "Phase 2",
    location: "Chennai, Pune, Hyderabad",
    duration: "8 months",
    compensation: "₹10,000 per visit",
    requirements: ["Age 30-60", "Pre-hypertensive", "BMI 25-35"],
    principalInvestigator: "Dr. Priya Sharma",
    contactEmail: "hypertension.study@sparsh.com",
    contactPhone: "+91-98765-43211",
    status: "recruiting" as const,
    screeningQuestions: [],
  },
  {
    id: "trial-003",
    title: "Heart Health Monitoring Study",
    description:
      "Long-term study monitoring heart health indicators using wearable devices and regular check-ups to prevent cardiovascular disease.",
    condition: "Cardiovascular Prevention",
    phase: "Observational",
    location: "Kolkata, Jaipur, Lucknow",
    duration: "24 months",
    compensation: "₹8,000 per visit",
    requirements: [
      "Age 40-70",
      "No heart disease history",
      "Willing to wear device",
    ],
    principalInvestigator: "Dr. Amit Patel",
    contactEmail: "heart.study@sparsh.com",
    contactPhone: "+91-98765-43212",
    status: "recruiting" as const,
    screeningQuestions: [],
  },
];
