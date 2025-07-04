import React from 'react';
import { Shield, FileText, AlertTriangle, CreditCard, TrendingUp, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';

export const ClientDashboard: React.FC = () => {
  const mockData = {
    activeSubscriptions: 2,
    totalClaims: 1,
    pendingPayments: 0,
    totalPaid: 2400
  };

  const recentActivities = [
    { id: 1, type: 'subscription', message: 'Health Insurance subscription activated', time: '2 days ago', status: 'success' },
    { id: 2, type: 'payment', message: 'Monthly premium payment processed', time: '1 week ago', status: 'success' },
    { id: 3, type: 'claim', message: 'Medical claim submitted for review', time: '2 weeks ago', status: 'pending' }
  ];

  const upcomingPayments = [
    { id: 1, product: 'Health Insurance Premium', amount: 150, dueDate: '2024-12-15' },
    { id: 2, product: 'Vehicle Insurance Premium', amount: 200, dueDate: '2024-12-20' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-500">Client Dashboard</h1>
        <Button variant="primary">
          <Shield className="w-4 h-4 mr-2" />
          Browse Products
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Active Subscriptions</p>
                <p className="text-2xl font-bold text-dark-500">{mockData.activeSubscriptions}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Total Claims</p>
                <p className="text-2xl font-bold text-dark-500">{mockData.totalClaims}</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Pending Payments</p>
                <p className="text-2xl font-bold text-dark-500">{mockData.pendingPayments}</p>
              </div>
              <div className="w-12 h-12 bg-error-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-error-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Total Paid</p>
                <p className="text-2xl font-bold text-dark-500">${mockData.totalPaid}</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-dark-500">Recent Activities</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-success-500' : 'bg-warning-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-dark-500">{activity.message}</p>
                    <p className="text-xs text-dark-400">{activity.time}</p>
                  </div>
                  <Badge variant={activity.status === 'success' ? 'success' : 'warning'} size="sm">
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-dark-500">Upcoming Payments</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-light-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-dark-500">{payment.product}</p>
                    <p className="text-xs text-dark-400">Due: {payment.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-dark-500">${payment.amount}</p>
                    <Button size="sm" variant="outline" className="mt-1">
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};