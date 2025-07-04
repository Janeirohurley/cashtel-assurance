import { 
  AIClaimAnalysis, 
  VoiceCommandResult, 
  InsuranceRecommendation, 
  DocumentValidationResult, 
  FraudDetectionResult, 
  AIQuote, 
  AIChatResponse, 
  RiskAssessment,
  UserProfile,
  ChatMessage
} from '../types/api';
import { apiService } from './apiService';

class AIService {
  private static instance: AIService;

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async analyzeClaim(params: {
    claimId: string;
    documents: File[];
    claimType: string;
    description: string;
  }): Promise<AIClaimAnalysis> {
    try {
      return await apiService.analyzeClaim({
        claim_id: params.claimId,
        documents: params.documents,
        claim_type: params.claimType,
        description: params.description
      });
    } catch (error) {
      throw new Error(`Erreur d'analyse IA: ${error}`);
    }
  }

  async processVoiceCommand(params: {
    audioData: string;
    sessionId: string;
    context?: Record<string, any>;
  }): Promise<VoiceCommandResult> {
    try {
      return await apiService.processVoiceCommand({
        audio_data: params.audioData,
        session_id: params.sessionId,
        context: params.context
      });
    } catch (error) {
      throw new Error(`Erreur de traitement vocal: ${error}`);
    }
  }

  async getRecommendations(params: {
    userId: string;
    userProfile: UserProfile;
    existingPolicies?: string[];
  }): Promise<InsuranceRecommendation[]> {
    try {
      return await apiService.getRecommendations({
        user_id: params.userId,
        user_profile: params.userProfile,
        existing_policies: params.existingPolicies
      });
    } catch (error) {
      throw new Error(`Erreur de recommandations: ${error}`);
    }
  }

  async validateDocument(params: {
    document: File;
    documentType: string;
    policyId: string;
  }): Promise<DocumentValidationResult> {
    try {
      return await apiService.validateDocument({
        document: params.document,
        document_type: params.documentType,
        policy_id: params.policyId
      });
    } catch (error) {
      throw new Error(`Erreur de validation de document: ${error}`);
    }
  }

  async detectFraud(params: {
    claimId: string;
    claimData: Record<string, any>;
    documentUrls: string[];
  }): Promise<FraudDetectionResult> {
    try {
      return await apiService.detectFraud({
        claim_id: params.claimId,
        claim_data: params.claimData,
        document_urls: params.documentUrls
      });
    } catch (error) {
      throw new Error(`Erreur de détection de fraude: ${error}`);
    }
  }

  async generateQuotes(params: {
    insuranceType: string;
    userInputs: Record<string, any>;
    userProfile: UserProfile;
  }): Promise<AIQuote[]> {
    try {
      return await apiService.generateQuotes({
        insurance_type: params.insuranceType,
        user_inputs: params.userInputs,
        user_profile: params.userProfile
      });
    } catch (error) {
      throw new Error(`Erreur de génération de devis: ${error}`);
    }
  }

  async chatWithAssistant(params: {
    message: string;
    sessionId: string;
    conversationHistory?: ChatMessage[];
  }): Promise<AIChatResponse> {
    try {
      return await apiService.chatWithAssistant({
        message: params.message,
        session_id: params.sessionId,
        conversation_history: params.conversationHistory
      });
    } catch (error) {
      throw new Error(`Erreur de chat: ${error}`);
    }
  }

  async assessRisk(params: {
    insuranceType: string;
    riskFactors: Record<string, any>;
    userProfile: UserProfile;
  }): Promise<RiskAssessment> {
    try {
      return await apiService.assessRisk({
        insurance_type: params.insuranceType,
        risk_factors: params.riskFactors,
        user_profile: params.userProfile
      });
    } catch (error) {
      throw new Error(`Erreur d'évaluation des risques: ${error}`);
    }
  }
}

export const aiService = AIService.getInstance();