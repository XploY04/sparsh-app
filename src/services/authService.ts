// API service for authentication-related operations

import { MockApiService } from "./mockApiService";

export interface ActivationCredentials {
  participantCode: string;
  temporaryPin: string;
}

export interface ActivationResponse {
  success: boolean;
  token?: string;
  participantId?: string;
  message?: string;
}

export interface ParticipantProfile {
  participantId: string;
  participantCode: string;
  trialId: string;
  consentFormText: string;
  comprehensionQuiz: {
    questions: QuizQuestion[];
  };
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface QuizQuestion {
  id: string;
  text: { en: string; hi: string };
  options: { value: string; label: { en: string; hi: string } }[];
  correctAnswer: string;
}

export interface DataSubmissionPayload {
  type: string;
  timestamp: string;
  data: any;
}

class AuthService {
  private baseUrl = process.env.API_BASE_URL || "https://api.sparsh.com";
  private authToken: string | null = null;
  private participantCode: string | null = null;
  private useMockApi = __DEV__ || !process.env.API_BASE_URL; // Use mock in development

  /**
   * Set the authentication token for subsequent API calls
   */
  setAuthToken(token: string) {
    this.authToken = token;
  }

  /**
   * Set the participant code
   */
  setParticipantCode(code: string) {
    this.participantCode = code;
  }

  /**
   * Get common headers for authenticated requests
   */
  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.authToken) {
      headers["Authorization"] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  /**
   * Activate participant account
   * POST /api/auth/participant/activate
   */
  async activateAccount(
    credentials: ActivationCredentials
  ): Promise<ActivationResponse> {
    // Use mock API in development
    if (this.useMockApi) {
      const result = await MockApiService.activateAccount(credentials);
      if (result.success && result.token) {
        this.setAuthToken(result.token);
        this.setParticipantCode(credentials.participantCode);
      }
      return result;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/api/auth/participant/activate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Activation failed",
        };
      }

      // Store the token for subsequent requests
      if (data.token) {
        this.setAuthToken(data.token);
        this.setParticipantCode(credentials.participantCode);
      }

      return {
        success: true,
        token: data.token,
        participantId: data.participantId,
        message: data.message,
      };
    } catch (error) {
      console.error("Error activating account:", error);
      return {
        success: false,
        message: "Network error occurred. Please try again.",
      };
    }
  }

  /**
   * Get participant profile and trial-specific data
   * GET /api/participant/me/profile
   */
  async getParticipantProfile(): Promise<ParticipantProfile | null> {
    // Use mock API in development
    if (this.useMockApi && this.participantCode) {
      return await MockApiService.getParticipantProfile(this.participantCode);
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/api/participant/me/profile`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching participant profile:", error);
      return null;
    }
  }

  /**
   * Submit data point (e.g., InformedConsent)
   * POST /api/data
   */
  async submitDataPoint(
    payload: DataSubmissionPayload
  ): Promise<{ success: boolean; message?: string }> {
    // Use mock API in development
    if (this.useMockApi) {
      return await MockApiService.submitDataPoint(payload);
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/data`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to submit data",
        };
      }

      return {
        success: true,
        message: data.message,
      };
    } catch (error) {
      console.error("Error submitting data point:", error);
      return {
        success: false,
        message: "Network error occurred. Please try again.",
      };
    }
  }

  /**
   * Clear authentication token
   */
  clearAuthToken() {
    this.authToken = null;
    this.participantCode = null;
  }
}

// Export a singleton instance
export const authService = new AuthService();
