import { 
  User, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest,
  AIClaimAnalysis,
  AnalyzeClaimRequest,
  VoiceCommandResult,
  ProcessVoiceCommandRequest,
  InsuranceRecommendation,
  GetRecommendationsRequest,
  DocumentValidationResult,
  ValidateDocumentRequest,
  FraudDetectionResult,
  DetectFraudRequest,
  AIQuote,
  GenerateQuotesRequest,
  AIChatResponse,
  ChatWithAssistantRequest,
  RiskAssessment,
  AssessRiskRequest,
  PaymentResult,
  ProcessPaymentRequest,
  AutoPayResult,
  SetupAutoPayRequest,
  PaymentHistory,
  PaymentMethod,
  RefundResult,
  PaymentStatus,
  InsuranceType
} from '../types/api';

class ApiService {
  private static instance: ApiService;
  private baseUrl = import.meta.env.REACT_APP_API_URL || 'http://192.168.1.240:8000/api';
  private accessToken: string | null = null;

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private constructor() {
    this.accessToken = localStorage.getItem('access_token');
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, redirect to login
        this.logout();
        throw new Error('Session expirée. Veuillez vous reconnecter.');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}`);
    }
    return response.json();
  }

  // Authentication
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login/`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(credentials),
    });

    const data = await this.handleResponse<AuthResponse>(response);
    this.accessToken = data.access;
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/register/`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    const data = await this.handleResponse<AuthResponse>(response);
    this.accessToken = data.access;
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data;
  }

  logout(): void {
    this.accessToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  }

  // Insurance Types
  async getInsuranceTypes(): Promise<InsuranceType[]> {
    const response = await fetch(`${this.baseUrl}/insurance-types/`, {
      headers: await this.getAuthHeaders(),
    });
    return this.handleResponse<InsuranceType[]>(response);
  }

  // AI Services
  async analyzeClaim(request: AnalyzeClaimRequest): Promise<AIClaimAnalysis> {
    const formData = new FormData();
    formData.append('claim_id', request.claim_id);
    formData.append('claim_type', request.claim_type);
    formData.append('description', request.description);
    
    request.documents.forEach((doc, index) => {
      formData.append('documents', doc);
    });

    const headers = await this.getAuthHeaders();
    delete headers['Content-Type']; // Let browser set it for FormData

    const response = await fetch(`${this.baseUrl}/claims/analyze`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return this.handleResponse<AIClaimAnalysis>(response);
  }

  async processVoiceCommand(request: ProcessVoiceCommandRequest): Promise<VoiceCommandResult> {
    const response = await fetch(`${this.baseUrl}/voice/process`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(request),
    });

    return this.handleResponse<VoiceCommandResult>(response);
  }

  async getRecommendations(request: GetRecommendationsRequest): Promise<InsuranceRecommendation[]> {
    const response = await fetch(`${this.baseUrl}/recommendations`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(request),
    });

    const data = await this.handleResponse<{ recommendations: InsuranceRecommendation[] }>(response);
    return data.recommendations;
  }

  async validateDocument(request: ValidateDocumentRequest): Promise<DocumentValidationResult> {
    const formData = new FormData();
    formData.append('document', request.document);
    formData.append('document_type', request.document_type);
    formData.append('policy_id', request.policy_id);

    const headers = await this.getAuthHeaders();
    delete headers['Content-Type'];

    const response = await fetch(`${this.baseUrl}/documents/validate`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return this.handleResponse<DocumentValidationResult>(response);
  }

  async detectFraud(request: DetectFraudRequest): Promise<FraudDetectionResult> {
    const response = await fetch(`${this.baseUrl}/fraud/detect`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(request),
    });

    return this.handleResponse<FraudDetectionResult>(response);
  }

  async generateQuotes(request: GenerateQuotesRequest): Promise<AIQuote[]> {
    const response = await fetch(`${this.baseUrl}/quotes/generate`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(request),
    });

    const data = await this.handleResponse<{ quotes: AIQuote[] }>(response);
    return data.quotes;
  }

  async chatWithAssistant(request: ChatWithAssistantRequest): Promise<AIChatResponse> {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(request),
    });

    return this.handleResponse<AIChatResponse>(response);
  }

  async assessRisk(request: AssessRiskRequest): Promise<RiskAssessment> {
    const response = await fetch(`${this.baseUrl}/risk/assess`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(request),
    });

    return this.handleResponse<RiskAssessment>(response);
  }

  // Payment Services
  async processPayment(request: ProcessPaymentRequest): Promise<PaymentResult> {
    const response = await fetch(`${this.baseUrl}/payments/process`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(request),
    });

    return this.handleResponse<PaymentResult>(response);
  }

  async setupAutoPay(request: SetupAutoPayRequest): Promise<AutoPayResult> {
    const response = await fetch(`${this.baseUrl}/payments/autopay/setup`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(request),
    });

    return this.handleResponse<AutoPayResult>(response);
  }

  async getPaymentHistory(params?: {
    policy_id?: string;
    start_date?: string;
    end_date?: string;
  }): Promise<PaymentHistory[]> {
    const queryParams = new URLSearchParams();
    if (params?.policy_id) queryParams.append('policy_id', params.policy_id);
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);

    const response = await fetch(`${this.baseUrl}/payments/history?${queryParams}`, {
      headers: await this.getAuthHeaders(),
    });

    const data = await this.handleResponse<{ payments: PaymentHistory[] }>(response);
    return data.payments;
  }

  async addPaymentMethod(paymentMethod: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> {
    const response = await fetch(`${this.baseUrl}/payment-methods`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(paymentMethod),
    });

    return this.handleResponse<PaymentMethod>(response);
  }

  async removePaymentMethod(paymentMethodId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/payment-methods/${paymentMethodId}`, {
      method: 'DELETE',
      headers: await this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Échec de suppression de la méthode de paiement');
    }
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await fetch(`${this.baseUrl}/payment-methods`, {
      headers: await this.getAuthHeaders(),
    });

    const data = await this.handleResponse<{ payment_methods: PaymentMethod[] }>(response);
    return data.payment_methods;
  }

  async processRefund(params: {
    payment_id: string;
    amount: number;
    reason: string;
  }): Promise<RefundResult> {
    const response = await fetch(`${this.baseUrl}/payments/refund`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(params),
    });

    return this.handleResponse<RefundResult>(response);
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    const response = await fetch(`${this.baseUrl}/payments/${paymentId}/status`, {
      headers: await this.getAuthHeaders(),
    });

    return this.handleResponse<PaymentStatus>(response);
  }

  // Claims
  async listClaims(): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/claims/list`, {
      headers: await this.getAuthHeaders(),
    });

    const data = await this.handleResponse<{ claims: any[] }>(response);
    return data.claims;
  }
}

export const apiService = ApiService.getInstance();