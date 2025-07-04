import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User as ApiUser, AuthResponse } from '../types/api';
import { apiService } from '../services/apiService';

// Adapter pour maintenir la compatibilité avec l'interface existante
export interface User {
  user_id: string;
  email: string;
  name: string;
  phone: string;
  role_id: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: { username: string; email: string; password: string }) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Fonction pour convertir le rôle API vers l'ID de rôle utilisé dans l'app
const roleToRoleId = (role: string): string => {
  switch (role) {
    case 'INDIVIDUAL': return '1';
    case 'ORGANIZATION': return '3';
    case 'PROVIDER': return '2';
    case 'MEMBER': return '1';
    case 'ADMIN': return '4';
    default: return '1';
  }
};

// Fonction pour adapter l'utilisateur API vers l'interface locale
const adaptApiUser = (apiUser: ApiUser): User => ({
  user_id: apiUser.id,
  email: apiUser.email,
  name: apiUser.username, // Utilise le username comme nom d'affichage
  phone: apiUser.phone_number || '',
  role_id: roleToRoleId(apiUser.role),
  created_at: apiUser.created_at
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const savedUser = localStorage.getItem('cashtel_user');
    const accessToken = localStorage.getItem('access_token');
    
    if (savedUser && accessToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('cashtel_user');
        localStorage.removeItem('access_token');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const response: AuthResponse = await apiService.login({
        username,
        password
      });
      
      const adaptedUser = adaptApiUser(response.user);
      setUser(adaptedUser);
      localStorage.setItem('cashtel_user', JSON.stringify(adaptedUser));
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Échec de la connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cashtel_user');
    apiService.logout();
  };

  const register = async (userData: { username: string; email: string; password: string }): Promise<void> => {
    setLoading(true);
    try {
      const response: AuthResponse = await apiService.register({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        first_name: '',
        last_name: '',
        phone_number: '',
        role: 'INDIVIDUAL' // Rôle par défaut
      });
      
      const adaptedUser = adaptApiUser(response.user);
      setUser(adaptedUser);
      localStorage.setItem('cashtel_user', JSON.stringify(adaptedUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Échec de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};