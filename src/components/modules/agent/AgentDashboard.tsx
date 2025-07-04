import React from 'react';
import { Users, DollarSign, TrendingUp, Calendar, UserPlus, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';

export const AgentDashboard: React.FC = () => {
  const mockData = {
    totalClients: 45,
    monthlyCommissions: 2800,
    pendingCommissions: 650,
    activeSubscriptions: 78
  };

  const recentClients = [
    { id: 1, name: 'John Smith', email: 'john@example.com', product: 'Health Insurance', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', product: 'Vehicle Insurance', status: 'pending', joinDate: '2024-01-14' },
    { id: 3, name: 'Mike Davis', email: 'mike@example.com', product: 'Life Insurance', status: 'active', joinDate: '2024-01-13' }
  ];

  const commissionHistory = [
    { id: 1, client: 'John Smith', product: 'Health Insurance', amount: 120, date: '2024-01-10', status: 'paid' },
    { id: 2, client: 'Sarah Johnson', product: 'Vehicle Insurance', amount: 200, date: '2024-01-08', status: 'pending' },
    { id: 3, client: 'Mike Davis', product: 'Life Insurance', amount: 180, date: '2024-01-05', status: 'paid' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-500">Agent Dashboard</h1>
        <Button variant="primary">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Total Clients</p>
                <p className="text-2xl font-bold text-dark-500">{mockData.totalClients}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Monthly Commissions</p>
                <p className="text-2xl font-bold text-dark-500">${mockData.monthlyCommissions}</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Pending Commissions</p>
                <p className="text-2xl font-bold text-dark-500">${mockData.pendingCommissions}</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Active Subscriptions</p>
                <p className="text-2xl font-bold text-dark-500">{mockData.activeSubscriptions}</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-dark-500">Recent Clients</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-3 bg-light-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-dark-500">{client.name}</p>
                    <p className="text-xs text-dark-400">{client.email}</p>
                    <p className="text-xs text-dark-400">{client.product}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant={client.status === 'active' ? 'success' : 'warning'} size="sm">
                      {client.status}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Commission History */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-dark-500">Commission History</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commissionHistory.map((commission) => (
                <div key={commission.id} className="flex items-center justify-between p-3 bg-light-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-dark-500">{commission.client}</p>
                    <p className="text-xs text-dark-400">{commission.product}</p>
                    <p className="text-xs text-dark-400">{commission.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-dark-500">${commission.amount}</p>
                    <Badge variant={commission.status === 'paid' ? 'success' : 'warning'} size="sm">
                      {commission.status}
                    </Badge>
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