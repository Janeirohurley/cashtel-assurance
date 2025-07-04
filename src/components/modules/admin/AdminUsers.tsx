import React, { useState } from 'react';
import { Users, Plus, Eye, Search, Shield, UserCheck, UserX, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Input } from '../../ui/Input';

export const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const users = [
    {
      id: 'USR-001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 234 567 8900',
      role: 'Client',
      roleId: '1',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-11-25',
      policies: 2,
      totalPremium: 350
    },
    {
      id: 'USR-002',
      name: 'Agent Smith',
      email: 'agent.smith@email.com',
      phone: '+1 234 567 8901',
      role: 'Agent',
      roleId: '2',
      status: 'active',
      joinDate: '2024-02-10',
      lastLogin: '2024-11-24',
      clients: 15,
      commissions: 2800
    },
    {
      id: 'USR-003',
      name: 'Org Manager',
      email: 'org.manager@company.com',
      phone: '+1 234 567 8902',
      role: 'Organisation',
      roleId: '3',
      status: 'active',
      joinDate: '2024-03-05',
      lastLogin: '2024-11-23',
      employees: 45,
      totalPremium: 15750
    },
    {
      id: 'USR-004',
      name: 'Admin User',
      email: 'admin@cashtelassurance.com',
      phone: '+1 234 567 8903',
      role: 'Admin',
      roleId: '4',
      status: 'active',
      joinDate: '2023-12-01',
      lastLogin: '2024-11-25',
      permissions: 'Full Access'
    },
    {
      id: 'USR-005',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 234 567 8904',
      role: 'Client',
      roleId: '1',
      status: 'suspended',
      joinDate: '2024-04-20',
      lastLogin: '2024-11-10',
      policies: 1,
      totalPremium: 180
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.roleId === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'suspended': return 'warning';
      case 'inactive': return 'error';
      default: return 'info';
    }
  };

  const getRoleColor = (roleId: string) => {
    switch (roleId) {
      case '1': return 'info';
      case '2': return 'warning';
      case '3': return 'primary';
      case '4': return 'error';
      default: return 'info';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleViewDetails = (userId: string) => {
    setSelectedUser(selectedUser === userId ? null : userId);
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    console.log(`Changing status of user ${userId} to ${newStatus}`);
    alert(`User status changed to ${newStatus}`);
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const suspendedUsers = users.filter(u => u.status === 'suspended').length;
  const clientsCount = users.filter(u => u.roleId === '1').length;
  const agentsCount = users.filter(u => u.roleId === '2').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-500">User Management</h1>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Total Users</p>
                <p className="text-2xl font-bold text-dark-500">{totalUsers}</p>
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
                <p className="text-sm font-medium text-dark-400">Active</p>
                <p className="text-2xl font-bold text-success-600">{activeUsers}</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Suspended</p>
                <p className="text-2xl font-bold text-warning-600">{suspendedUsers}</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                <UserX className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Clients</p>
                <p className="text-2xl font-bold text-primary-600">{clientsCount}</p>
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
                <p className="text-sm font-medium text-dark-400">Agents</p>
                <p className="text-2xl font-bold text-accent-600">{agentsCount}</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
                fullWidth
              />
            </div>
            <div className="md:w-48">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full p-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Roles</option>
                <option value="1">Clients</option>
                <option value="2">Agents</option>
                <option value="3">Organisations</option>
                <option value="4">Admins</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark-500">{user.name}</h3>
                    <p className="text-sm text-dark-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={getRoleColor(user.roleId)} size="sm">
                    {user.role}
                  </Badge>
                  <Badge variant={getStatusColor(user.status)} size="sm">
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Eye}
                    onClick={() => handleViewDetails(user.id)}
                  >
                    {selectedUser === user.id ? 'Hide' : 'View'} Details
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-dark-400">User ID</p>
                  <p className="text-sm font-medium text-dark-500">{user.id}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400">Join Date</p>
                  <p className="text-sm font-medium text-dark-500">{formatDate(user.joinDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400">Last Login</p>
                  <p className="text-sm font-medium text-dark-500">{formatDate(user.lastLogin)}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400">Phone</p>
                  <p className="text-sm font-medium text-dark-500">{user.phone}</p>
                </div>
              </div>

              {selectedUser === user.id && (
                <div className="border-t border-light-300 pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-dark-500 mb-2">Role-Specific Data</h4>
                      <div className="space-y-2">
                        {user.roleId === '1' && (
                          <>
                            <p className="text-sm text-dark-400">Policies: {user.policies}</p>
                            <p className="text-sm text-dark-400">Total Premium: ${user.totalPremium}/month</p>
                          </>
                        )}
                        {user.roleId === '2' && (
                          <>
                            <p className="text-sm text-dark-400">Clients: {user.clients}</p>
                            <p className="text-sm text-dark-400">Commissions: ${user.commissions}</p>
                          </>
                        )}
                        {user.roleId === '3' && (
                          <>
                            <p className="text-sm text-dark-400">Employees: {user.employees}</p>
                            <p className="text-sm text-dark-400">Total Premium: ${user.totalPremium}/month</p>
                          </>
                        )}
                        {user.roleId === '4' && (
                          <p className="text-sm text-dark-400">Permissions: {user.permissions}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-dark-500 mb-2">Account Actions</h4>
                      <div className="space-y-2">
                        {user.status === 'active' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(user.id, 'suspended')}
                          >
                            Suspend User
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleStatusChange(user.id, 'active')}
                          >
                            Activate User
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" icon={Edit}>
                      Edit User
                    </Button>
                    <Button variant="outline" size="sm">
                      View Activity Log
                    </Button>
                    <Button variant="outline" size="sm">
                      Reset Password
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="w-12 h-12 text-dark-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark-500 mb-2">No Users Found</h3>
            <p className="text-dark-400 mb-4">
              {searchTerm || selectedRole !== 'all' ? 'No users match your search criteria.' : 'No users in the system yet.'}
            </p>
            <Button variant="primary">
              Add First User
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};