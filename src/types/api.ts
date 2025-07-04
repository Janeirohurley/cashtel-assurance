// Types correspondant aux modèles Django API
export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'INDIVIDUAL' | 'ORGANIZATION' | 'PROVIDER' | 'MEMBER' | 'ADMIN';
  phone_number: string;
  date_of_birth: string | null;
  is_verified: boolean;
  created_at: string;
}

export interface ClientProfile {
  user: string;
  organization?: string;
  legal_name: string;
  tax_id?: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  contact_email: string;
  contact_phone: string;
  registration_date: string;
  credit_score?: number;
  notes: string;
}

export interface InsuranceType {
  id: string;
  type: string;
  icon: string;
  color: number;
  description: string;
}

export interface AIClaimAnalysis {
  id: string;
  claim_id: string;
  confidence_score: number;
  status: 'validated' | 'requiresReview' | 'rejected' | 'pending';
  detected_issues: string[];
  recommendations: string[];
  fraud_risk_level: 'low' | 'medium' | 'high' | 'critical';
  document_analyses: DocumentAnalysis[];
  estimated_processing_time: EstimatedProcessingTime;
}

export interface DocumentAnalysis {
  id: string;
  document_id: string;
  document_type: 'receipt' | 'medicalReport' | 'policeReport' | 'invoice' | 'photograph' | 'identification' | 'other';
  quality_score: number;
  is_authentic: boolean;
  extracted_text: string[];
  anomalies: string[];
  detected_objects: DetectedObject[];
}

export interface DetectedObject {
  id: string;
  object_type: string;
  confidence: number;
  bounding_box: Record<string, number>;
}

export interface EstimatedProcessingTime {
  id: string;
  days: number;
  hours: number;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

export interface VoiceCommandResult {
  id: string;
  transcript: string;
  intent: 'subscribe' | 'fileClaim' | 'checkStatus' | 'makePayment' | 'getQuote' | 'askQuestion' | 'navigate' | 'unknown';
  entities: Record<string, any>;
  confidence: number;
  response: string;
  action_items: ActionItem[];
}

export interface ActionItem {
  id: string;
  action: string;
  parameters: Record<string, any>;
  requires_confirmation: boolean;
}

export interface InsuranceRecommendation {
  id: string;
  insurance_type: string;
  title: string;
  description: string;
  monthly_premium: number;
  coverage_amount: string;
  relevance_score: number;
  benefits: string[];
  exclusions: string[];
  customizations: Record<string, any>;
}

export interface UserProfile {
  id: string;
  user_id: string;
  age: number;
  gender: string;
  occupation: string;
  location: string;
  income: number;
  interests: string[];
  demographics: Record<string, any>;
}

export interface DocumentValidationResult {
  id: string;
  document_id: string;
  is_valid: boolean;
  validity_score: number;
  extracted_data: Record<string, any>;
  issues: ValidationIssue[];
}

export interface ValidationIssue {
  id: string;
  issue_type: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface FraudDetectionResult {
  id: string;
  claim_id: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  fraud_score: number;
  recommendation: string;
  indicators: FraudIndicator[];
}

export interface FraudIndicator {
  id: string;
  type: string;
  description: string;
  weight: number;
}

export interface AIQuote {
  id: string;
  quote_id: string;
  insurance_type: string;
  monthly_premium: number;
  annual_premium: number;
  coverage_amount: string;
  terms: Record<string, any>;
  confidence_score: number;
  benefits: CoverageBenefit[];
}

export interface CoverageBenefit {
  id: string;
  name: string;
  description: string;
  amount: string;
}

export interface AIChatResponse {
  id: string;
  response: string;
  session_id: string;
  response_type: 'informational' | 'actionRequired' | 'clarificationNeeded' | 'completed';
  metadata?: Record<string, any>;
  suggestions: ActionSuggestion[];
}

export interface ActionSuggestion {
  id: string;
  title: string;
  description: string;
  action_type: string;
  parameters: Record<string, any>;
}

export interface ChatMessage {
  id: string;
  role: string;
  content: string;
  timestamp: string;
}

export interface RiskAssessment {
  id: string;
  assessment_id: string;
  overall_risk: 'veryLow' | 'low' | 'medium' | 'high' | 'veryHigh';
  risk_score: number;
  recommended_premium: number;
  adjustments: Record<string, any>;
  risk_factors: RiskFactor[];
}

export interface RiskFactor {
  id: string;
  name: string;
  impact: 'veryLow' | 'low' | 'medium' | 'high' | 'veryHigh';
  weight: number;
  description: string;
}

export interface PaymentMethod {
  id: string;
  type: 'creditCard' | 'debitCard' | 'bankTransfer' | 'digitalWallet' | 'mobileMoney';
  display_name: string;
  last_four_digits: string;
  expiry_date: string;
  is_default: boolean;
  is_verified: boolean;
  metadata?: Record<string, any>;
}

export interface PaymentResult {
  id: string;
  transaction_id: string;
  status: 'success' | 'failed' | 'pending' | 'cancelled' | 'refunded';
  amount: number;
  currency: string;
  timestamp: string;
  error_message?: string;
  receipt_data?: Record<string, any>;
}

export interface AutoPayResult {
  id: string;
  auto_pay_id: string;
  is_enabled: boolean;
  frequency: 'monthly' | 'quarterly' | 'semiAnnually' | 'annually';
  next_payment_date: string;
  payment_method: PaymentMethod;
}

export interface PaymentHistory {
  id: string;
  policy_id: string;
  policy_type: string;
  amount: number;
  currency: string;
  status: 'success' | 'failed' | 'pending' | 'cancelled' | 'refunded';
  payment_date: string;
  payment_method: PaymentMethod;
  transaction_id?: string;
  description?: string;
}

export interface RefundResult {
  id: string;
  refund_id: string;
  original_transaction_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  request_date: string;
  processed_date?: string;
  reason: string;
}

export interface PaymentStatus {
  id: string;
  payment_id: string;
  status: 'success' | 'failed' | 'pending' | 'cancelled' | 'refunded';
  amount: number;
  currency: string;
  last_updated: string;
  updates: PaymentStatusUpdate[];
}

export interface PaymentStatusUpdate {
  id: string;
  status: 'success' | 'failed' | 'pending' | 'cancelled' | 'refunded';
  timestamp: string;
  message?: string;
}

// API Request/Response types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface AnalyzeClaimRequest {
  claim_id: string;
  documents: File[];
  claim_type: string;
  description: string;
}

export interface ProcessVoiceCommandRequest {
  audio_data: string;
  session_id: string;
  context?: Record<string, any>;
}

export interface GetRecommendationsRequest {
  user_id: string;
  user_profile: UserProfile;
  existing_policies?: string[];
}

export interface ValidateDocumentRequest {
  document: File;
  document_type: string;
  policy_id: string;
}

export interface DetectFraudRequest {
  claim_id: string;
  claim_data: Record<string, any>;
  document_urls: string[];
}

export interface GenerateQuotesRequest {
  insurance_type: string;
  user_inputs: Record<string, any>;
  user_profile: UserProfile;
}

export interface ChatWithAssistantRequest {
  message: string;
  session_id: string;
  conversation_history?: ChatMessage[];
}

export interface AssessRiskRequest {
  insurance_type: string;
  risk_factors: Record<string, any>;
  user_profile: UserProfile;
}

export interface ProcessPaymentRequest {
  policy_id: string;
  amount: number;
  payment_method: PaymentMethod;
  currency: string;
}

export interface SetupAutoPayRequest {
  policy_id: string;
  payment_method: PaymentMethod;
  frequency: string;
}