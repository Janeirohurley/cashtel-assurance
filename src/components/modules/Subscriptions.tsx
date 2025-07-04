import React, { useState } from 'react';
import { Shield, Calendar, DollarSign, FileText, Eye, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const Subscriptions: React.FC = () => {
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null);

  const subscriptions = [
    {
      id: 'SUB-2024-001',
      productName: 'Health Insurance Premium',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      monthlyPremium: 150,
      coverageAmount: '$50,000',
      nextPayment: '2024-12-15',
      benefits: ['24/7 Emergency Care', 'Prescription Coverage', 'Preventive Care', 'Mental Health Support'],
      claims: 2,
      totalPaid: 1650
    },
    {
      id: 'SUB-2024-002',
      productName: 'Vehicle Insurance',
      status: 'active',
      startDate: '2024-03-01',
      endDate: '2025-03-01',
      monthlyPremium: 200,
      coverageAmount: '$100,000',
      nextPayment: '2024-12-01',
      benefits: ['Collision Coverage', 'Comprehensive Protection', 'Roadside Assistance', '24/7 Claims Support'],
      claims: 0,
      totalPaid: 2000
    },
    {
      id: 'SUB-2023-015',
      productName: 'Life Insurance',
      status: 'expired',
      startDate: '2023-06-01',
      endDate: '2024-06-01',
      monthlyPremium: 180,
      coverageAmount: '$500,000',
      nextPayment: null,
      benefits: ['Death Benefit', 'Living Benefits', 'Flexible Premiums', 'Tax Advantages'],
      claims: 0,
      totalPaid: 2160
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'expired': return 'error';
      case 'suspended': return 'warning';
      default: return 'info';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleViewDetails = (subscriptionId: string) => {
    setSelectedSubscription(selectedSubscription === subscriptionId ? null : subscriptionId);
  };

  const handleDownloadPolicy = (subscriptionId: string) => {
    // Simulate policy download
    console.log(`Downloading policy for ${subscriptionId}`);
    alert('Policy document download started!');
  };

  const handleRenew = (subscriptionId: string) => {
    console.log(`Renewing subscription ${subscriptionId}`);
    alert('Renewal process initiated!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-500">My Subscriptions</h1>
        <Button variant="primary">
          <Shield className="w-4 h-4 mr-2" />
          Browse Products
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Active Policies</p>
                <p className="text-2xl font-bold text-dark-500">
                  {subscriptions.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Monthly Premium</p>
                <p className="text-2xl font-bold text-dark-500">
                  ${subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.monthlyPremium, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Total Coverage</p>
                <p className="text-2xl font-bold text-dark-500">$650K</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark-500">{subscription.productName}</h3>
                    <p className="text-sm text-dark-400">ID: {subscription.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={getStatusColor(subscription.status)} size="sm">
                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Eye}
                    onClick={() => handleViewDetails(subscription.id)}
                  >
                    {selectedSubscription === subscription.id ? 'Hide' : 'View'} Details
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-dark-400">Monthly Premium</p>
                  <p className="text-sm font-medium text-dark-500">${subscription.monthlyPremium}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400">Coverage</p>
                  <p className="text-sm font-medium text-dark-500">{subscription.coverageAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400">Valid Until</p>
                  <p className="text-sm font-medium text-dark-500">{formatDate(subscription.endDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400">Claims Filed</p>
                  <p className="text-sm font-medium text-dark-500">{subscription.claims}</p>
                </div>
              </div>

              {selectedSubscription === subscription.id && (
                <div className="border-t border-light-300 pt-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-dark-500 mb-2">Coverage Benefits</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {subscription.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-success-500" />
                          <span className="text-sm text-dark-400">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-dark-500">Policy Period</p>
                      <p className="text-sm text-dark-400">
                        {formatDate(subscription.startDate)} - {formatDate(subscription.endDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dark-500">Total Paid</p>
                      <p className="text-sm text-dark-400">${subscription.totalPaid}</p>
                    </div>
                  </div>

                  {subscription.nextPayment && (
                    <div className="bg-warning-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-warning-600" />
                        <span className="text-sm text-warning-800">
                          Next payment due: {formatDate(subscription.nextPayment)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Download}
                      onClick={() => handleDownloadPolicy(subscription.id)}
                    >
                      Download Policy
                    </Button>
                    {subscription.status === 'expired' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleRenew(subscription.id)}
                      >
                        Renew Policy
                      </Button>
                    )}
                    {subscription.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        icon={AlertCircle}
                      >
                        File Claim
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {subscriptions.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Shield className="w-12 h-12 text-dark-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark-500 mb-2">No Subscriptions</h3>
            <p className="text-dark-400 mb-4">
              You don't have any insurance subscriptions yet.
            </p>
            <Button variant="primary">
              Browse Insurance Products
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};