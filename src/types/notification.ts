// Notification-related data models for CASHTEL Assurances
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  isRead: boolean;
  data?: Record<string, any>;
}

export enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
  CLAIM_UPDATE = 'claimUpdate',
  PAYMENT_REMINDER = 'paymentReminder',
  POLICY_RENEWAL = 'policyRenewal',
  SECURITY = 'security',
  PROMOTIONAL = 'promotional',
  REMINDER = 'reminder'
}

export interface BiometricAuthResult {
  isAuthenticated: boolean;
  errorMessage?: string;
  biometricType?: BiometricType;
}

export interface BiometricRegistrationResult {
  isRegistered: boolean;
  templateId?: string;
  errorMessage?: string;
}

export enum BiometricType {
  FINGERPRINT = 'fingerprint',
  FACE = 'face',
  VOICE = 'voice',
  IRIS = 'iris'
}