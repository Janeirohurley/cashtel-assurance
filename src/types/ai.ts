// AI-related data models for CASHTEL Assurances
export interface AIClaimAnalysis {
  claimId: string;
  confidenceScore: number;
  status: ClaimValidationStatus;
  documentAnalyses: DocumentAnalysis[];
  detectedIssues: string[];
  recommendations: string[];
  estimatedProcessingTime: EstimatedProcessingTime;
  fraudRiskLevel: FraudRiskLevel;
}

export enum ClaimValidationStatus {
  VALIDATED = 'validated',
  REQUIRES_REVIEW = 'requiresReview',
  REJECTED = 'rejected',
  PENDING = 'pending'
}

export interface DocumentAnalysis {
  documentId: string;
  documentType: string;
  qualityScore: number;
  isAuthentic: boolean;
  extractedText: string[];
  detectedObjects: DetectedObject[];
  anomalies: string[];
}

export interface DetectedObject {
  objectType: string;
  confidence: number;
  boundingBox: Record<string, number>;
}

export interface EstimatedProcessingTime {
  days: number;
  hours: number;
  priority: ProcessingPriority;
}

export enum ProcessingPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum FraudRiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface VoiceCommandResult {
  transcript: string;
  intent: VoiceIntent;
  entities: Record<string, any>;
  confidence: number;
  response: string;
  actionItems: ActionItem[];
}

export enum VoiceIntent {
  SUBSCRIBE = 'subscribe',
  FILE_CLAIM = 'fileClaim',
  CHECK_STATUS = 'checkStatus',
  MAKE_PAYMENT = 'makePayment',
  GET_QUOTE = 'getQuote',
  ASK_QUESTION = 'askQuestion',
  NAVIGATE = 'navigate',
  UNKNOWN = 'unknown'
}

export interface ActionItem {
  action: string;
  parameters: Record<string, any>;
  requiresConfirmation: boolean;
}

export interface InsuranceRecommendation {
  insuranceType: string;
  title: string;
  description: string;
  monthlyPremium: number;
  coverageAmount: string;
  relevanceScore: number;
  benefits: string[];
  exclusions: string[];
  customizations: Record<string, any>;
}

export interface UserProfile {
  userId: string;
  age: number;
  gender: string;
  occupation: string;
  location: string;
  income: number;
  interests: string[];
  demographics: Record<string, any>;
}

export interface DocumentValidationResult {
  documentId: string;
  isValid: boolean;
  validityScore: number;
  issues: ValidationIssue[];
  extractedData: Record<string, any>;
}

export interface ValidationIssue {
  issueType: string;
  description: string;
  severity: IssueSeverity;
}

export enum IssueSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum DocumentType {
  RECEIPT = 'receipt',
  MEDICAL_REPORT = 'medicalReport',
  POLICE_REPORT = 'policeReport',
  INVOICE = 'invoice',
  PHOTOGRAPH = 'photograph',
  IDENTIFICATION = 'identification',
  OTHER = 'other'
}

export interface FraudDetectionResult {
  claimId: string;
  riskLevel: FraudRiskLevel;
  fraudScore: number;
  indicators: FraudIndicator[];
  recommendation: string;
}

export interface FraudIndicator {
  type: string;
  description: string;
  weight: number;
}

export interface AIQuote {
  quoteId: string;
  insuranceType: string;
  monthlyPremium: number;
  annualPremium: number;
  coverageAmount: string;
  benefits: CoverageBenefit[];
  terms: Record<string, any>;
  confidenceScore: number;
}

export interface CoverageBenefit {
  name: string;
  description: string;
  amount: string;
}

export interface AIChatResponse {
  response: string;
  sessionId: string;
  responseType: ChatResponseType;
  suggestions: ActionSuggestion[];
  metadata?: Record<string, any>;
}

export enum ChatResponseType {
  INFORMATIONAL = 'informational',
  ACTION_REQUIRED = 'actionRequired',
  CLARIFICATION_NEEDED = 'clarificationNeeded',
  COMPLETED = 'completed'
}

export interface ActionSuggestion {
  title: string;
  description: string;
  actionType: string;
  parameters: Record<string, any>;
}

export interface ChatMessage {
  role: string;
  content: string;
  timestamp: Date;
}

export interface RiskAssessment {
  assessmentId: string;
  overallRisk: RiskLevel;
  riskScore: number;
  riskFactors: RiskFactor[];
  recommendedPremium: number;
  adjustments: Record<string, any>;
}

export enum RiskLevel {
  VERY_LOW = 'veryLow',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'veryHigh'
}

export interface RiskFactor {
  name: string;
  impact: RiskLevel;
  weight: number;
  description: string;
}