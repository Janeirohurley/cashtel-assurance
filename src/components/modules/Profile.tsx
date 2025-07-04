import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Shield, Bell, Eye, EyeOff, Camera, Save } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../contexts/AuthContext';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    username: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '123 Rue Principale, Ville, Pays',
    dateOfBirth: '1990-01-01',
    occupation: 'Ingénieur Logiciel'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    language: 'fr',
    currency: 'EUR',
    timezone: 'Europe/Paris'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    biometricEnabled: true,
    sessionTimeout: 30,
    loginAlerts: true
  });

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field: string, value: boolean | number) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSavePersonalInfo = () => {
    console.log('Sauvegarde des informations personnelles:', personalInfo);
    alert('Informations personnelles mises à jour avec succès !');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Les nouveaux mots de passe ne correspondent pas !');
      return;
    }
    console.log('Changement de mot de passe');
    alert('Mot de passe changé avec succès !');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSavePreferences = () => {
    console.log('Sauvegarde des préférences:', preferences);
    alert('Préférences sauvegardées avec succès !');
  };

  const handleSaveSecurity = () => {
    console.log('Sauvegarde des paramètres de sécurité:', securitySettings);
    alert('Paramètres de sécurité mis à jour avec succès !');
  };

  const getRoleName = (roleId: string) => {
    switch (roleId) {
      case '1': return 'Client';
      case '2': return 'Agent';
      case '3': return 'Organisation';
      case '4': return 'Admin';
      default: return 'Utilisateur';
    }
  };

  const tabs = [
    { id: 'personal', label: 'Infos Personnelles', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'preferences', label: 'Préférences', icon: Bell },
    { id: 'password', label: 'Mot de passe', icon: Lock }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-500">Paramètres du Profil</h1>
        <Badge variant="info" size="lg">
          {getRoleName(user?.role_id || '')}
        </Badge>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary-600" />
              </div>
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-dark-500">{user?.name}</h2>
              <p className="text-dark-400">{user?.email}</p>
              <p className="text-sm text-dark-400">Membre depuis {new Date(user?.created_at || '').getFullYear()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-1 bg-light-200 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-dark-400 hover:text-dark-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'personal' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-dark-500">Informations Personnelles</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nom d'utilisateur"
                value={personalInfo.username}
                onChange={(e) => handlePersonalInfoChange('username', e.target.value)}
                fullWidth
              />
              <Input
                label="Adresse email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                fullWidth
              />
              <Input
                label="Numéro de téléphone"
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                fullWidth
              />
              <Input
                label="Date de naissance"
                type="date"
                value={personalInfo.dateOfBirth}
                onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
                fullWidth
              />
              <Input
                label="Profession"
                value={personalInfo.occupation}
                onChange={(e) => handlePersonalInfoChange('occupation', e.target.value)}
                fullWidth
              />
            </div>
            <Input
              label="Adresse"
              value={personalInfo.address}
              onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
              fullWidth
            />
            <Button variant="primary" icon={Save} onClick={handleSavePersonalInfo}>
              Sauvegarder les modifications
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-dark-500">Paramètres de Sécurité</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark-500">Authentification à deux facteurs</p>
                  <p className="text-sm text-dark-400">Ajoutez une couche de sécurité supplémentaire à votre compte</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorEnabled}
                    onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark-500">Authentification biométrique</p>
                  <p className="text-sm text-dark-400">Utilisez l'empreinte digitale ou la reconnaissance faciale</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.biometricEnabled}
                    onChange={(e) => handleSecurityChange('biometricEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark-500">Alertes de connexion</p>
                  <p className="text-sm text-dark-400">Recevez des notifications pour les nouvelles tentatives de connexion</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.loginAlerts}
                    onChange={(e) => handleSecurityChange('loginAlerts', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-500 mb-2">
                  Délai d'expiration de session (minutes)
                </label>
                <select
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                  className="w-full p-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 heure</option>
                  <option value={120}>2 heures</option>
                  <option value={0}>Jamais</option>
                </select>
              </div>
            </div>

            <Button variant="primary" icon={Save} onClick={handleSaveSecurity}>
              Sauvegarder les paramètres de sécurité
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'preferences' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-dark-500">Préférences</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium text-dark-500 mb-3">Notifications</h4>
              <div className="space-y-3">
                {[
                  { key: 'emailNotifications', label: 'Notifications par email', description: 'Recevoir des notifications par email' },
                  { key: 'smsNotifications', label: 'Notifications SMS', description: 'Recevoir des notifications par SMS' },
                  { key: 'pushNotifications', label: 'Notifications push', description: 'Recevoir des notifications push' },
                  { key: 'marketingEmails', label: 'Emails marketing', description: 'Recevoir des emails promotionnels' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-dark-500">{item.label}</p>
                      <p className="text-sm text-dark-400">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences[item.key as keyof typeof preferences] as boolean}
                        onChange={(e) => handlePreferenceChange(item.key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-500 mb-2">Langue</label>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full p-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-500 mb-2">Devise</label>
                <select
                  value={preferences.currency}
                  onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                  className="w-full p-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD ($)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-500 mb-2">Fuseau horaire</label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  className="w-full p-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>
            </div>

            <Button variant="primary" icon={Save} onClick={handleSavePreferences}>
              Sauvegarder les préférences
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'password' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-dark-500">Changer le mot de passe</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                label="Mot de passe actuel"
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                fullWidth
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-[2.125rem] text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Nouveau mot de passe"
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                fullWidth
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-[2.125rem] text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirmer le nouveau mot de passe"
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                fullWidth
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[2.125rem] text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="bg-light-200 p-4 rounded-lg">
              <h4 className="font-medium text-dark-500 mb-2">Exigences du mot de passe</h4>
              <ul className="text-sm text-dark-400 space-y-1">
                <li>• Au moins 8 caractères</li>
                <li>• Lettres majuscules et minuscules</li>
                <li>• Au moins un chiffre</li>
                <li>• Au moins un caractère spécial</li>
              </ul>
            </div>

            <Button
              variant="primary"
              icon={Save}
              onClick={handleChangePassword}
              disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            >
              Changer le mot de passe
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};