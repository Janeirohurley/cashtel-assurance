import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { register, loading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
    } catch (err) {
      setError('Échec de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Créer un compte</h2>
        <p className="text-gray-600">Rejoignez Cashtel Assurance aujourd'hui</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          name="username"
          label="Nom d'utilisateur"
          icon={User}
          value={formData.username}
          onChange={handleChange}
          required
          fullWidth
          placeholder="Choisissez un nom d'utilisateur"
        />

        <Input
          type="email"
          name="email"
          label="Adresse email"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          placeholder="votre@email.com"
        />

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Mot de passe"
            icon={Lock}
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            placeholder="Minimum 8 caractères"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[2.125rem] text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            label="Confirmer le mot de passe"
            icon={Lock}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            placeholder="Répétez votre mot de passe"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-[2.125rem] text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="bg-light-200 p-4 rounded-lg">
          <h4 className="font-medium text-dark-500 mb-2">Exigences du mot de passe</h4>
          <ul className="text-sm text-dark-400 space-y-1">
            <li>• Au moins 8 caractères</li>
            <li>• Lettres majuscules et minuscules recommandées</li>
            <li>• Au moins un chiffre recommandé</li>
            <li>• Au moins un caractère spécial recommandé</li>
          </ul>
        </div>

        <Button
          type="submit"
          loading={loading}
          fullWidth
          size="lg"
        >
          Créer le compte
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Vous avez déjà un compte ?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
};