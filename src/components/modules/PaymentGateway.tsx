import React, { useState } from 'react';
import { CreditCard, Shield, CheckCircle, AlertCircle, DollarSign, Calendar, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

interface PaymentGatewayProps {
  amount: number;
  productName: string;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentCancel: () => void;
}

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  amount,
  productName,
  onPaymentSuccess,
  onPaymentCancel
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | 'bank'>('card');
  const [processing, setProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: '',
    mobileNumber: '',
    bankAccount: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate transaction ID
      const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      onPaymentSuccess(transactionId);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').replace(/(.{2})/, '$1/').substr(0, 5);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
            <Badge variant="info">
              <Shield className="w-3 h-3 mr-1" />
              Secure Payment
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Product</p>
                <p className="font-medium text-gray-900">{productName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-2xl font-bold text-gray-900">${amount}</p>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-900 mb-3">Payment Method</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  paymentMethod === 'card' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-medium text-gray-900">Credit Card</p>
              </button>
              
              <button
                onClick={() => setPaymentMethod('mobile')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  paymentMethod === 'mobile' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <DollarSign className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-medium text-gray-900">Mobile Money</p>
              </button>
              
              <button
                onClick={() => setPaymentMethod('bank')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  paymentMethod === 'bank' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Lock className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-medium text-gray-900">Bank Transfer</p>
              </button>
            </div>
          </div>

          {/* Payment Forms */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <Input
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                maxLength={19}
                fullWidth
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                  maxLength={5}
                  fullWidth
                />
                <Input
                  label="CVV"
                  placeholder="123"
                  value={paymentData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  maxLength={4}
                  fullWidth
                />
              </div>
              
              <Input
                label="Cardholder Name"
                placeholder="John Doe"
                value={paymentData.holderName}
                onChange={(e) => handleInputChange('holderName', e.target.value)}
                fullWidth
              />
            </div>
          )}

          {paymentMethod === 'mobile' && (
            <div className="space-y-4">
              <Input
                label="Mobile Number"
                placeholder="+1 234 567 8900"
                value={paymentData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                fullWidth
              />
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  You will receive an SMS with payment instructions on your mobile number.
                </p>
              </div>
            </div>
          )}

          {paymentMethod === 'bank' && (
            <div className="space-y-4">
              <Input
                label="Bank Account Number"
                placeholder="123456789"
                value={paymentData.bankAccount}
                onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                fullWidth
              />
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  Bank transfer details will be sent to your email after confirmation.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-green-600" />
              <p className="text-sm font-medium text-gray-900">Payment Security</p>
            </div>
            <p className="text-xs text-gray-600">
              Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
            </p>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button
              variant="outline"
              onClick={onPaymentCancel}
              disabled={processing}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handlePayment}
              loading={processing}
              disabled={processing}
              fullWidth
            >
              {processing ? 'Processing...' : `Pay $${amount}`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};