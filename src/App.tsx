import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { ClientDashboard } from './components/modules/client/ClientDashboard';
import { AgentDashboard } from './components/modules/agent/AgentDashboard';
import { AgentClients } from './components/modules/agent/AgentClients';
import { AgentCommissions } from './components/modules/agent/AgentCommissions';
import { OrganisationEmployees } from './components/modules/organisation/OrganisationEmployees';
import { OrganisationReports } from './components/modules/organisation/OrganisationReports';
import { AdminUsers } from './components/modules/admin/AdminUsers';
import { InsuranceProducts } from './components/modules/InsuranceProducts';
import { QRCodeGenerator } from './components/modules/QRCodeGenerator';
import { PaymentGateway } from './components/modules/PaymentGateway';
import { AIClaimAnalysis } from './components/modules/ai/AIClaimAnalysis';
import { PaymentMethodManager } from './components/modules/payment/PaymentMethodManager';
import { NotificationCenter } from './components/modules/notifications/NotificationCenter';
import { Subscriptions } from './components/modules/Subscriptions';
import { Claims } from './components/modules/Claims';
import { Payments } from './components/modules/Payments';
import { Profile } from './components/modules/Profile';
import { NotFound } from './components/pages/NotFound';
import { HelpPage } from './components/pages/HelpPage';
import { Shield } from 'lucide-react';

const AuthWrapper: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-100 via-light-100 to-primary-50">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-dark-500">Cashtel Assurance</h1>
            <p className="text-dark-400">Insurance Technology Platform</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {isLogin ? (
              <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MainApp: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('app'); // 'app', 'help', '404'

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle navigation
  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    const roleId = user?.role_id;

    switch (activeTab) {
      case 'dashboard':
        if (roleId === '1') return <ClientDashboard />;
        if (roleId === '2') return <AgentDashboard />;
        return <div>Dashboard for role {roleId}</div>;
      
      case 'products':
        return <InsuranceProducts />;
      
      case 'subscriptions':
        return <Subscriptions />;
      
      case 'claims':
        return <Claims />;
      
      case 'payments':
        return <Payments />;
      
      case 'clients':
        return <AgentClients />;
      
      case 'commissions':
        return <AgentCommissions />;
      
      case 'employees':
        return <OrganisationEmployees />;
      
      case 'reports':
        return <OrganisationReports />;
      
      case 'users':
        return <AdminUsers />;
      
      case 'ai-claims':
        return <AIClaimAnalysis />;
      
      case 'payment-methods':
        return <PaymentMethodManager />;
      
      case 'notifications':
        return <NotificationCenter />;
      
      case 'profile':
        return <Profile />;
      
      case 'qr-demo':
        return (
          <QRCodeGenerator
            subscriptionId="SUB-2024-001"
            productName="Health Insurance Premium"
            clientName={user?.name || 'Demo User'}
            validUntil="2024-12-31"
          />
        );
      
      case 'payment-demo':
        return (
          <PaymentGateway
            amount={150}
            productName="Health Insurance Premium"
            onPaymentSuccess={(transactionId) => {
              console.log('Payment successful:', transactionId);
              setActiveTab('dashboard');
            }}
            onPaymentCancel={() => setActiveTab('dashboard')}
          />
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-dark-500 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <p className="text-dark-400">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  if (!user) {
    return <AuthWrapper />;
  }

  // Render different pages
  if (currentPage === 'help') {
    return (
      <div className="min-h-screen flex flex-col">
        <HelpPage />
        <Footer />
      </div>
    );
  }

  if (currentPage === '404') {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-light-100 flex flex-col">
      <Header onMenuToggle={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
      
      <div className="flex flex-1">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          isOpen={isMobileMenuOpen}
        />
        
        <main className="flex-1 p-6 md:ml-0">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Demo Navigation */}
      <div className="fixed bottom-4 right-4 space-y-2">
        <button
          onClick={() => handleNavigation('help')}
          className="block w-full px-4 py-2 bg-info-500 text-white rounded-lg shadow-lg hover:bg-info-600 transition-colors text-sm"
        >
          Help Center
        </button>
        <button
          onClick={() => handleNavigation('404')}
          className="block w-full px-4 py-2 bg-error-500 text-white rounded-lg shadow-lg hover:bg-error-600 transition-colors text-sm"
        >
          404 Demo
        </button>
        <button
          onClick={() => setActiveTab('ai-claims')}
          className="block w-full px-4 py-2 bg-accent-500 text-white rounded-lg shadow-lg hover:bg-accent-600 transition-colors text-sm"
        >
          AI Claims
        </button>
        <button
          onClick={() => setActiveTab('payment-methods')}
          className="block w-full px-4 py-2 bg-secondary-500 text-dark-500 rounded-lg shadow-lg hover:bg-secondary-600 transition-colors text-sm"
        >
          Payment Methods
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className="block w-full px-4 py-2 bg-warning-500 text-white rounded-lg shadow-lg hover:bg-warning-600 transition-colors text-sm"
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab('qr-demo')}
          className="block w-full px-4 py-2 bg-primary-500 text-white rounded-lg shadow-lg hover:bg-primary-600 transition-colors text-sm"
        >
          QR Code Demo
        </button>
        <button
          onClick={() => setActiveTab('payment-demo')}
          className="block w-full px-4 py-2 bg-success-600 text-white rounded-lg shadow-lg hover:bg-success-700 transition-colors text-sm"
        >
          Payment Demo
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;