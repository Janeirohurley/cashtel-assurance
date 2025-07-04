// Payment-related data models for CASHTEL Assurances
export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  displayName: string;
  lastFourDigits: string;
  expiryDate: string;
  isDefault: boolean;
  isVerified: boolean;
  metadata?: Record<string, any>;
}

export enum PaymentMethodType {
  CREDIT_CARD = 'creditCard',
  DEBIT_CARD = 'debitCard',
  BANK_TRANSFER = 'bankTransfer',
  DIGITAL_WALLET = 'digitalWallet',
  MOBILE_MONEY = 'mobileMoney'
}

export interface PaymentResult {
  transactionId: string;
  status: PaymentResultStatus;
  amount: number;
  currency: string;
  timestamp: Date;
  errorMessage?: string;
  receiptData?: Record<string, any>;
}

export enum PaymentResultStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export interface AutoPayResult {
  autoPayId: string;
  isEnabled: boolean;
  frequency: AutoPayFrequency;
  nextPaymentDate: Date;
  paymentMethod: PaymentMethod;
}

export enum AutoPayFrequency {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMI_ANNUALLY = 'semiAnnually',
  ANNUALLY = 'annually'
}

export interface PaymentHistory {
  id: string;
  policyId: string;
  policyType: string;
  amount: number;
  currency: string;
  status: PaymentResultStatus;
  paymentDate: Date;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  description?: string;
}

export interface RefundResult {
  refundId: string;
  originalTransactionId: string;
  amount: number;
  currency: string;
  status: RefundStatus;
  requestDate: Date;
  processedDate?: Date;
  reason: string;
}

export enum RefundStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PROCESSED = 'processed'
}

export interface PaymentStatus {
  paymentId: string;
  status: PaymentResultStatus;
  amount: number;
  currency: string;
  lastUpdated: Date;
  updates: PaymentStatusUpdate[];
}

export interface PaymentStatusUpdate {
  status: PaymentResultStatus;
  timestamp: Date;
  message?: string;
}