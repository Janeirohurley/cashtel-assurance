export interface User {
  user_id: string;
  email: string;
  name: string;
  phone: string;
  role_id: string;
  created_at: string;
}

export interface Role {
  role_id: string;
  name: string;
  permissions: string[];
}

export interface Client {
  client_id: string;
  user_id: string;
  user: User;
  agent_id?: string;
  created_at: string;
}

export interface Agent {
  agent_id: string;
  user_id: string;
  user: User;
  commission_rate: number;
  total_commissions: number;
  created_at: string;
}

export interface Organisation {
  organisation_id: string;
  user_id: string;
  name: string;
  industry: string;
  employee_count: number;
  created_at: string;
}

export interface InsuranceProduct {
  product_id: string;
  name: string;
  description: string;
  price: number;
  coverage_type: string;
  benefits: string[];
  created_at: string;
}

export interface Subscription {
  subscription_id: string;
  organisation_id?: string;
  client_id?: string;
  product_id: string;
  product: InsuranceProduct;
  status: 'active' | 'inactive' | 'suspended';
  start_date: string;
  end_date: string;
  qr_code: string;
  created_at: string;
}

export interface Payment {
  payment_id: string;
  subscription_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  payment_method: string;
  transaction_id: string;
  created_at: string;
}

export interface ServiceRequest {
  request_id: string;
  subscription_id: string;
  provider_id?: string;
  type: 'claim' | 'support' | 'renewal';
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

export interface AgentCommission {
  commission_id: string;
  agent_id: string;
  subscription_id: string;
  amount: number;
  status: 'pending' | 'paid';
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<void>;
  loading: boolean;
}