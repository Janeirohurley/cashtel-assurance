import React from 'react';
import { Shield, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  const { user, logout } = useAuth();

  const getRoleName = (roleId: string) => {
    switch (roleId) {
      case '1': return 'Client';
      case '2': return 'Agent';
      case '3': return 'Organisation';
      case '4': return 'Admin';
      default: return 'Utilisateur';
    }
  };

  return (
    <header className="bg-white border-b border-light-300 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-dark-400 hover:text-dark-500 hover:bg-light-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="flex items-center ml-4 md:ml-0">
              <Shield className="w-8 h-8 text-primary-500 mr-2" />
              <div>
                <h1 className="text-xl font-bold text-dark-500">Cashtel Assurance</h1>
                <p className="text-xs text-dark-400">Plateforme Technologique d'Assurance</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-dark-500">{user?.name}</p>
                <p className="text-xs text-dark-400">{getRoleName(user?.role_id || '')}</p>
              </div>
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-600" />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={LogOut}
              onClick={logout}
              className="text-dark-400 hover:text-dark-500"
            >
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};