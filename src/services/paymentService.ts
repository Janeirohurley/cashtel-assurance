import { 
  PaymentMethod, 
  PaymentResult, 
  AutoPayResult, 
  PaymentHistory, 
  RefundResult, 
  PaymentStatus
} from '../types/api';
import { apiService } from './apiService';

class PaymentService {
  private static instance: PaymentService;

  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  async processPayment(params: {
    policyId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    currency: string;
  }): Promise<PaymentResult> {
    try {
      return await apiService.processPayment({
        policy_id: params.policyId,
        amount: params.amount,
        payment_method: params.paymentMethod,
        currency: params.currency
      });
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Délai de connexion dépassé. Vérifiez votre connexion internet.');
      }
      throw new Error(`Échec du paiement: ${error}`);
    }
  }

  async setupAutoPay(params: {
    policyId: string;
    paymentMethod: PaymentMethod;
    frequency: string;
  }): Promise<AutoPayResult> {
    try {
      return await apiService.setupAutoPay({
        policy_id: params.policyId,
        payment_method: params.paymentMethod,
        frequency: params.frequency
      });
    } catch (error) {
      throw new Error(`Échec de la configuration du paiement automatique: ${error}`);
    }
  }

  async getPaymentHistory(params?: {
    policyId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<PaymentHistory[]> {
    try {
      const queryParams: any = {};
      if (params?.policyId) queryParams.policy_id = params.policyId;
      if (params?.startDate) queryParams.start_date = params.startDate.toISOString();
      if (params?.endDate) queryParams.end_date = params.endDate.toISOString();

      return await apiService.getPaymentHistory(queryParams);
    } catch (error) {
      throw new Error(`Échec de récupération de l'historique des paiements: ${error}`);
    }
  }

  async addPaymentMethod(paymentMethod: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> {
    try {
      return await apiService.addPaymentMethod(paymentMethod);
    } catch (error) {
      throw new Error(`Échec d'ajout de la méthode de paiement: ${error}`);
    }
  }

  async removePaymentMethod(paymentMethodId: string): Promise<void> {
    try {
      await apiService.removePaymentMethod(paymentMethodId);
    } catch (error) {
      throw new Error(`Échec de suppression de la méthode de paiement: ${error}`);
    }
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      return await apiService.getPaymentMethods();
    } catch (error) {
      throw new Error(`Échec de récupération des méthodes de paiement: ${error}`);
    }
  }

  async processRefund(params: {
    paymentId: string;
    amount: number;
    reason: string;
  }): Promise<RefundResult> {
    try {
      return await apiService.processRefund({
        payment_id: params.paymentId,
        amount: params.amount,
        reason: params.reason
      });
    } catch (error) {
      throw new Error(`Échec du remboursement: ${error}`);
    }
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    try {
      return await apiService.getPaymentStatus(paymentId);
    } catch (error) {
      throw new Error(`Échec de récupération du statut de paiement: ${error}`);
    }
  }
}

export const paymentService = PaymentService.getInstance();