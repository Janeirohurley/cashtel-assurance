import React from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  BarChart3,
  Shield,
  Building,
  UserCheck,
  AlertTriangle,
  Brain,
  Bell,
  Wallet
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen }) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const roleId = user?.role_id;
    
    switch (roleId) {
      case '1': // Client
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'products', label: 'Produits d\'assurance', icon: Shield },
          { id: 'subscriptions', label: 'Mes souscriptions', icon: FileText },
          { id: 'claims', label: 'Réclamations', icon: AlertTriangle },
          { id: 'ai-claims', label: 'Analyse IA', icon: Brain },
          { id: 'payments', label: 'Paiements', icon: CreditCard },
          { id: 'payment-methods', label: 'Méthodes de paiement', icon: Wallet },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'profile', label: 'Profil', icon: Settings }
        ];
      case '2': // Agent
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'clients', label: 'Mes clients', icon: Users },
          { id: 'commissions', label: 'Commissions', icon: BarChart3 },
          { id: 'products', label: 'Produits', icon: Shield },
          { id: 'requests', label: 'Demandes de service', icon: AlertTriangle },
          { id: 'ai-claims', label: 'Analyse IA', icon: Brain },
          { id: 'payment-methods', label: 'Méthodes de paiement', icon: Wallet },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'profile', label: 'Profil', icon: Settings }
        ];
      case '3': // Organisation
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'employees', label: 'Employés', icon: Users },
          { id: 'subscriptions', label: 'Souscriptions de groupe', icon: FileText },
          { id: 'reports', label: 'Rapports', icon: BarChart3 },
          { id: 'payments', label: 'Paiements', icon: CreditCard },
          { id: 'payment-methods', label: 'Méthodes de paiement', icon: Wallet },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'profile', label: 'Profil organisation', icon: Building }
        ];
      case '4': // Admin
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'users', label: 'Gestion des utilisateurs', icon: Users },
          { id: 'agents', label: 'Agents', icon: UserCheck },
          { id: 'organisations', label: 'Organisations', icon: Building },
          { id: 'products', label: 'Produits', icon: Shield },
          { id: 'requests', label: 'Demandes de service', icon: AlertTriangle },
          { id: 'ai-claims', label: 'Analyse IA', icon: Brain },
          { id: 'payment-methods', label: 'Méthodes de paiement', icon: Wallet },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'reports', label: 'Rapports', icon: BarChart3 }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`bg-light-100 transition-all duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } fixed inset-y-0 left-0 z-40 w-64 md:relative md:translate-x-0`}>
      <div className="flex flex-col h-full pt-16 md:pt-0">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-dark-400 hover:bg-light-200 hover:text-dark-500'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};