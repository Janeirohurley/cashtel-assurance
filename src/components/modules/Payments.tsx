import React, { useState } from 'react';
import { CreditCard, Calendar, DollarSign, Clock, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const Payments: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const payments = [
    {
      id: 'PAY-2024-001',
      policyName: 'Health Insurance Premium',
      amount: 150,
      status: 'completed',
      paymentDate: '2024-11-15',
      dueDate: '2024-11-15',
      method: 'Credit Card ****1234',
      transactionId: 'TXN-789456123',
      receiptUrl: '#'
    },
    {
      id: 'PAY-2024-002',
      policyName: 'Vehicle Insurance',
      amount: 200,
      status: 'completed',
      paymentDate: '2024-11-01',
      dueDate: '2024-11-01',
      method: 'Bank Transfer',
      transactionId: 'TXN-456789123',
      receiptUrl: '#'
    },
    {
      id: 'PAY-2024-003',
      policyName: 'Health Insurance Premium',
      amount: 150,
      status: 'pending',
      paymentDate: null,
      dueDate: '2024-12-15',
      method: 'Credit Card ****1234',
      transactionId: null,
      receiptUrl: null
    },
    {
      id: 'PAY-2024-004',
      policyName: 'Vehicle Insurance',
      amount: 200,
      status: 'overdue',
      paymentDate: null,
      dueDate: '2024-12-01',
      method: 'Bank Transfer',
      transactionId: null,
      receiptUrl: null
    }
  ];

  const upcomingPayments = [
    {
      id: 'UP-001',
      policyName: 'Health Insurance Premium',
      amount: 150,
      dueDate: '2024-12-15',
      daysUntilDue: 5
    },
    {
      id: 'UP-002',
      policyName: 'Vehicle Insurance',
      amount: 200,
      dueDate: '2024-12-20',
      daysUntilDue: 10
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'error';
      case 'failed': return 'error';
      default: return 'info';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'overdue': return AlertCircle;
      case 'failed': return AlertCircle;
      default: return Clock;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getTotalPaid = () => {
    return payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);
  };

  const getPendingAmount = () => {
    return payments
      .filter(p => p.status === 'pending' || p.status === 'overdue')
      .reduce((sum, p) => sum + p.amount, 0);
  };

  const handlePayNow = (paymentId: string) => {
    console.log(`Processing payment for ${paymentId}`);
    alert('Redirecting to payment gateway...');
  };

  const handleDownloadReceipt = (paymentId: string) => {
    console.log(`Downloading receipt for ${paymentId}`);
    alert('Receipt download started!');
  };

  const filteredPayments = selectedPeriod === 'all' 
    ? payments 
    : payments.filter(p => {
        const paymentDate = p.paymentDate ? new Date(p.paymentDate) : new Date(p.dueDate);
        const now = new Date();
        const monthsAgo = new Date();
        monthsAgo.setMonth(now.getMonth() - parseInt(selectedPeriod));
        return paymentDate >= monthsAgo;
      });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-500">Payments</h1>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Time</option>
            <option value="1">Last Month</option>
            <option value="3">Last 3 Months</option>
            <option value="6">Last 6 Months</option>
            <option value="12">Last Year</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Total Paid</p>
                <p className="text-2xl font-bold text-success-600">${getTotalPaid()}</p>
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
                <p className="text-sm font-medium text-dark-400">Pending</p>
                <p className="text-2xl font-bold text-warning-600">${getPendingAmount()}</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">This Month</p>
                <p className="text-2xl font-bold text-primary-600">$350</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Avg Monthly</p>
                <p className="text-2xl font-bold text-dark-500">$350</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Payments */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-dark-500">Upcoming Payments</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-light-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-dark-500">{payment.policyName}</p>
                    <p className="text-sm text-dark-400">
                      Due: {formatDate(payment.dueDate)} ({payment.daysUntilDue} days)
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-dark-500">${payment.amount}</span>
                  <Button size="sm" variant="primary">
                    Pay Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-dark-500">Payment History</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.map((payment) => {
              const StatusIcon = getStatusIcon(payment.status);
              return (
                <div key={payment.id} className="flex items-center justify-between p-4 border border-light-300 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-500">{payment.policyName}</p>
                      <p className="text-sm text-dark-400">
                        {payment.method} • Due: {formatDate(payment.dueDate)}
                      </p>
                      {payment.transactionId && (
                        <p className="text-xs text-dark-400">ID: {payment.transactionId}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold text-dark-500">${payment.amount}</p>
                      <div className="flex items-center space-x-1">
                        <StatusIcon className="w-4 h-4" />
                        <Badge variant={getStatusColor(payment.status)} size="sm">
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      {payment.status === 'pending' || payment.status === 'overdue' ? (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handlePayNow(payment.id)}
                        >
                          Pay Now
                        </Button>
                      ) : payment.receiptUrl ? (
                        <Button
                          size="sm"
                          variant="outline"
                          icon={Download}
                          onClick={() => handleDownloadReceipt(payment.id)}
                        >
                          Receipt
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {filteredPayments.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CreditCard className="w-12 h-12 text-dark-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark-500 mb-2">No Payments Found</h3>
            <p className="text-dark-400">
              No payments found for the selected period.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};