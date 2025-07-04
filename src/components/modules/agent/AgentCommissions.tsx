import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Eye, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

export const AgentCommissions: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const commissions = [
    {
      id: 'COM-2024-001',
      clientName: 'John Smith',
      policyType: 'Health Insurance',
      policyId: 'SUB-2024-001',
      amount: 180,
      rate: 12,
      status: 'paid',
      earnedDate: '2024-11-15',
      paidDate: '2024-11-20',
      period: '2024-11'
    },
    {
      id: 'COM-2024-002',
      clientName: 'Sarah Johnson',
      policyType: 'Life Insurance',
      policyId: 'SUB-2024-003',
      amount: 216,
      rate: 12,
      status: 'pending',
      earnedDate: '2024-11-10',
      paidDate: null,
      period: '2024-11'
    },
    {
      id: 'COM-2024-003',
      clientName: 'Mike Davis',
      policyType: 'Vehicle Insurance',
      policyId: 'SUB-2024-002',
      amount: 240,
      rate: 12,
      status: 'paid',
      earnedDate: '2024-10-15',
      paidDate: '2024-10-20',
      period: '2024-10'
    },
    {
      id: 'COM-2024-004',
      clientName: 'Emily Wilson',
      policyType: 'Home Insurance',
      policyId: 'SUB-2024-004',
      amount: 144,
      rate: 12,
      status: 'paid',
      earnedDate: '2024-10-01',
      paidDate: '2024-10-05',
      period: '2024-10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'cancelled': return 'error';
      default: return 'info';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const filteredCommissions = selectedPeriod === 'all' 
    ? commissions 
    : commissions.filter(c => {
        const earnedDate = new Date(c.earnedDate);
        const now = new Date();
        if (selectedPeriod === 'current') {
          return earnedDate.getMonth() === now.getMonth() && earnedDate.getFullYear() === now.getFullYear();
        }
        return true;
      });

  const totalEarned = commissions.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0);
  const pendingAmount = commissions.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0);
  const currentMonthEarned = commissions.filter(c => {
    const earnedDate = new Date(c.earnedDate);
    const now = new Date();
    return c.status === 'paid' && earnedDate.getMonth() === now.getMonth() && earnedDate.getFullYear() === now.getFullYear();
  }).reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-500">Commissions</h1>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="current">Current Month</option>
            <option value="all">All Time</option>
          </select>
          <Button variant="outline" icon={Download}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Total Earned</p>
                <p className="text-2xl font-bold text-success-600">${totalEarned}</p>
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
                <p className="text-sm font-medium text-dark-400">Pending</p>
                <p className="text-2xl font-bold text-warning-600">${pendingAmount}</p>
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
                <p className="text-sm font-medium text-dark-400">This Month</p>
                <p className="text-2xl font-bold text-primary-600">${currentMonthEarned}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Avg Rate</p>
                <p className="text-2xl font-bold text-dark-500">12%</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission History */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-dark-500">Commission History</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCommissions.map((commission) => (
              <div key={commission.id} className="flex items-center justify-between p-4 border border-light-300 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-dark-500">{commission.clientName}</p>
                    <p className="text-sm text-dark-400">
                      {commission.policyType} • {commission.rate}% commission
                    </p>
                    <p className="text-xs text-dark-400">
                      Policy: {commission.policyId} • Earned: {formatDate(commission.earnedDate)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-dark-500">${commission.amount}</p>
                    <Badge variant={getStatusColor(commission.status)} size="sm">
                      {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                    </Badge>
                    {commission.paidDate && (
                      <p className="text-xs text-dark-400">Paid: {formatDate(commission.paidDate)}</p>
                    )}
                  </div>
                  
                  <Button variant="ghost" size="sm" icon={Eye}>
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Commission Structure */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-dark-500">Commission Structure</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { type: 'Health Insurance', rate: 12, color: 'bg-blue-100 text-blue-800' },
              { type: 'Vehicle Insurance', rate: 12, color: 'bg-green-100 text-green-800' },
              { type: 'Life Insurance', rate: 15, color: 'bg-purple-100 text-purple-800' },
              { type: 'Home Insurance', rate: 10, color: 'bg-orange-100 text-orange-800' }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-light-200 rounded-lg">
                <p className="font-medium text-dark-500">{item.type}</p>
                <p className={`text-2xl font-bold ${item.color}`}>{item.rate}%</p>
                <p className="text-sm text-dark-400">Commission Rate</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredCommissions.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <DollarSign className="w-12 h-12 text-dark-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark-500 mb-2">No Commissions Found</h3>
            <p className="text-dark-400">
              No commissions found for the selected period.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};