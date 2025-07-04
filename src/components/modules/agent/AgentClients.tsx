import React, { useState } from 'react';
import { Users, Plus, Eye, Phone, Mail, Calendar, TrendingUp, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Input } from '../../ui/Input';

export const AgentClients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const clients = [
    {
      id: 'CLI-001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 234 567 8900',
      joinDate: '2024-01-15',
      status: 'active',
      policies: 2,
      totalPremium: 350,
      lastContact: '2024-11-20',
      commissionEarned: 420,
      policies_details: [
        { name: 'Health Insurance', premium: 150, status: 'active' },
        { name: 'Vehicle Insurance', premium: 200, status: 'active' }
      ]
    },
    {
      id: 'CLI-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 234 567 8901',
      joinDate: '2024-02-10',
      status: 'active',
      policies: 1,
      totalPremium: 180,
      lastContact: '2024-11-18',
      commissionEarned: 216,
      policies_details: [
        { name: 'Life Insurance', premium: 180, status: 'active' }
      ]
    },
    {
      id: 'CLI-003',
      name: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '+1 234 567 8902',
      joinDate: '2024-03-05',
      status: 'inactive',
      policies: 1,
      totalPremium: 120,
      lastContact: '2024-10-15',
      commissionEarned: 144,
      policies_details: [
        { name: 'Home Insurance', premium: 120, status: 'expired' }
      ]
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'suspended': return 'error';
      default: return 'info';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleViewDetails = (clientId: string) => {
    setSelectedClient(selectedClient === clientId ? null : clientId);
  };

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalCommissions = clients.reduce((sum, c) => sum + c.commissionEarned, 0);
  const totalPremiums = clients.reduce((sum, c) => sum + c.totalPremium, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-500">My Clients</h1>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Total Clients</p>
                <p className="text-2xl font-bold text-dark-500">{totalClients}</p>
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
                <p className="text-sm font-medium text-dark-400">Active Clients</p>
                <p className="text-2xl font-bold text-success-600">{activeClients}</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Total Premiums</p>
                <p className="text-2xl font-bold text-dark-500">${totalPremiums}</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Commissions</p>
                <p className="text-2xl font-bold text-warning-600">${totalCommissions}</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Search clients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
            fullWidth
          />
        </CardContent>
      </Card>

      {/* Clients List */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark-500">{client.name}</h3>
                    <p className="text-sm text-dark-400">Client ID: {client.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={getStatusColor(client.status)} size="sm">
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Eye}
                    onClick={() => handleViewDetails(client.id)}
                  >
                    {selectedClient === client.id ? 'Hide' : 'View'} Details
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-dark-400">Policies</p>
                  <p className="text-sm font-medium text-dark-500">{client.policies}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400">Monthly Premium</p>
                  <p className="text-sm font-medium text-dark-500">${client.totalPremium}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400">Commission Earned</p>
                  <p className="text-sm font-medium text-success-600">${client.commissionEarned}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400">Last Contact</p>
                  <p className="text-sm font-medium text-dark-500">{formatDate(client.lastContact)}</p>
                </div>
              </div>

              {selectedClient === client.id && (
                <div className="border-t border-light-300 pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-dark-500 mb-2">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-dark-400" />
                          <span className="text-sm text-dark-500">{client.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-dark-400" />
                          <span className="text-sm text-dark-500">{client.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-dark-400" />
                          <span className="text-sm text-dark-500">Joined: {formatDate(client.joinDate)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-dark-500 mb-2">Active Policies</h4>
                      <div className="space-y-2">
                        {client.policies_details.map((policy, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-light-200 rounded">
                            <span className="text-sm text-dark-500">{policy.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-dark-500">${policy.premium}/mo</span>
                              <Badge variant={policy.status === 'active' ? 'success' : 'warning'} size="sm">
                                {policy.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" icon={Phone}>
                      Call Client
                    </Button>
                    <Button variant="outline" size="sm" icon={Mail}>
                      Send Email
                    </Button>
                    <Button variant="primary" size="sm">
                      Add Policy
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="w-12 h-12 text-dark-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark-500 mb-2">No Clients Found</h3>
            <p className="text-dark-400 mb-4">
              {searchTerm ? 'No clients match your search criteria.' : 'You haven\'t added any clients yet.'}
            </p>
            <Button variant="primary">
              Add Your First Client
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};