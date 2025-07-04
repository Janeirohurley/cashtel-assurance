import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Trash2, Shield, Check } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Input } from '../../ui/Input';
import { paymentService } from '../../../services/paymentService';
import { PaymentMethod } from '../../../types/api';

export const PaymentMethodManager: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newMethod, setNewMethod] = useState({
    type: 'creditCard' as const,
    display_name: '',
    last_four_digits: '',
    expiry_date: ''
  });

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const loadPaymentMethods = async () => {
    try {
      const methods = await paymentService.getPaymentMethods();
      setPaymentMethods(methods);
    } catch (error) {
      console.error('Échec du chargement des méthodes de paiement:', error);
    }
  };

  const handleAddMethod = async () => {
    setLoading(true);
    try {
      const method: Omit<PaymentMethod, 'id'> = {
        type: newMethod.type,
        display_name: newMethod.display_name,
        last_four_digits: newMethod.last_four_digits,
        expiry_date: newMethod.expiry_date,
        is_default: paymentMethods.length === 0,
        is_verified: false
      };

      await paymentService.addPaymentMethod(method);
      await loadPaymentMethods();
      setShowAddForm(false);
      setNewMethod({
        type: 'creditCard',
        display_name: '',
        last_four_digits: '',
        expiry_date: ''
      });
    } catch (error) {
      console.error('Échec d\'ajout de la méthode de paiement:', error);
      alert('Erreur lors de l\'ajout de la méthode de paiement');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMethod = async (methodId: string) => {
    try {
      await paymentService.removePaymentMethod(methodId);
      await loadPaymentMethods();
    } catch (error) {
      console.error('Échec de suppression de la méthode de paiement:', error);
      alert('Erreur lors de la suppression de la méthode de paiement');
    }
  };

  const getMethodIcon = (type: string) => {
    return <CreditCard className="w-5 h-5" />;
  };

  const getMethodTypeLabel = (type: string) => {
    switch (type) {
      case 'creditCard':
        return 'Carte de crédit';
      case 'debitCard':
        return 'Carte de débit';
      case 'bankTransfer':
        return 'Virement bancaire';
      case 'digitalWallet':
        return 'Portefeuille numérique';
      case 'mobileMoney':
        return 'Mobile Money';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-dark-500">Méthodes de paiement</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          icon={Plus}
          variant="primary"
        >
          Ajouter une méthode de paiement
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-dark-500">Ajouter une nouvelle méthode de paiement</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-500 mb-2">
                Type de paiement
              </label>
              <select
                value={newMethod.type}
                onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value as any })}
                className="w-full p-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="creditCard">Carte de crédit</option>
                <option value="debitCard">Carte de débit</option>
                <option value="bankTransfer">Virement bancaire</option>
                <option value="digitalWallet">Portefeuille numérique</option>
                <option value="mobileMoney">Mobile Money</option>
              </select>
            </div>

            <Input
              label="Nom d'affichage"
              value={newMethod.display_name}
              onChange={(e) => setNewMethod({ ...newMethod, display_name: e.target.value })}
              placeholder="ex: Ma carte Visa"
              fullWidth
            />

            <Input
              label="Quatre derniers chiffres"
              value={newMethod.last_four_digits}
              onChange={(e) => setNewMethod({ ...newMethod, last_four_digits: e.target.value })}
              placeholder="1234"
              maxLength={4}
              fullWidth
            />

            <Input
              label="Date d'expiration"
              value={newMethod.expiry_date}
              onChange={(e) => setNewMethod({ ...newMethod, expiry_date: e.target.value })}
              placeholder="MM/AA"
              maxLength={5}
              fullWidth
            />

            <div className="flex space-x-3">
              <Button
                onClick={handleAddMethod}
                loading={loading}
                variant="primary"
                fullWidth
              >
                Ajouter la méthode
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                fullWidth
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="relative">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    {getMethodIcon(method.type)}
                  </div>
                  <div>
                    <p className="font-medium text-dark-500">{method.display_name}</p>
                    <p className="text-sm text-dark-400">
                      {getMethodTypeLabel(method.type)} •••• {method.last_four_digits}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleRemoveMethod(method.id)}
                  variant="ghost"
                  size="sm"
                  icon={Trash2}
                  className="text-error-600 hover:text-error-700"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {method.is_default && (
                    <Badge variant="info" size="sm">
                      Par défaut
                    </Badge>
                  )}
                  {method.is_verified && (
                    <Badge variant="success" size="sm">
                      <Check className="w-3 h-3 mr-1" />
                      Vérifiée
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-dark-400">
                  <Shield className="w-4 h-4 mr-1" />
                  Expire {method.expiry_date}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {paymentMethods.length === 0 && !showAddForm && (
        <Card>
          <CardContent className="text-center py-8">
            <CreditCard className="w-12 h-12 text-dark-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark-500 mb-2">Aucune méthode de paiement</h3>
            <p className="text-dark-400 mb-4">
              Ajoutez une méthode de paiement pour faciliter le paiement des primes.
            </p>
            <Button
              onClick={() => setShowAddForm(true)}
              variant="primary"
            >
              Ajouter votre première méthode de paiement
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};