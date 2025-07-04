import React, { useState } from 'react';
import { Users, Plus, Eye, Mail, Phone, Shield, Search, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Input } from '../../ui/Input';

export const OrganisationEmployees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const employees = [
    {
      id: 'EMP-001',
      name: 'Alice Johnson',
      email: 'alice.johnson@company.com',
      phone: '+1 234 567 8900',
      department: 'Engineering',
      position: 'Senior Developer',
      joinDate: '2023-01-15',
      status: 'active',
      insuranceStatus: 'enrolled',
      policies: ['Health Insurance', 'Life Insurance'],
      dependents: 2
    },
    {
      id: 'EMP-002',
      name: 'Bob Wilson',
      email: 'bob.wilson@company.com',
      phone: '+1 234 567 8901',
      department: 'Marketing',
      position: 'Marketing Manager',
      joinDate: '2023-03-10',
      status: 'active',
      insuranceStatus: 'enrolled',
      policies: ['Health Insurance'],
      dependents: 1
    },
    {
      id: 'EMP-003',
      name: 'Carol Davis',
      email: 'carol.davis@company.com',
      phone: '+1 234 567 8902',
      department: 'HR',
      position: 'HR Specialist',
      joinDate: '2023-06-01',
      status: 'active',
      insuranceStatus: 'pending',
      policies: [],
      dependents: 0
    },
    {
      id: 'EMP-004',
      name: 'David Brown',
      email: 'david.brown@company.com',
      phone: '+1 234 567 8903',
      department: 'Finance',
      position: 'Financial Analyst',
      joinDate: '2023-08-15',
      status: 'inactive',
      insuranceStatus: 'not_enrolled',
      policies: [],
      dependents: 3
    }
  ];

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'terminated': return 'error';
      default: return 'info';
    }
  };

  const getInsuranceStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled': return 'success';
      case 'pending': return 'warning';
      case 'not_enrolled': return 'error';
      default: return 'info';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleViewDetails = (employeeId: string) => {
    setSelectedEmployee(selectedEmployee === employeeId ? null : employeeId);
  };

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const enrolledEmployees = employees.filter(e => e.insuranceStatus === 'enrolled').length;
  const pendingEnrollments = employees.filter(e => e.insuranceStatus === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-500">Employees</h1>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Total Employees</p>
                <p className="text-2xl font-bold text-dark-500">{totalEmployees}</p>
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
                <p className="text-2xl font-bold text-success-600">{activeEmployees}</p>
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
                <p className="text-sm font-medium text-dark-400">Insured</p>
                <p className="text-2xl font-bold text-primary-600">{enrolledEmployees}</p>
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
                <p className="text-sm font-medium text-dark-400">Pending</p>
                <p className="text-2xl font-bold text-warning-600">{pendingEnrollments}</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Search employees by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
            fullWidth
          />
        </CardContent>
      </Card>

      {/* Employees List */}
      <div className="space-y-4">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark-500">{employee.name}</h3>
                    <p className="text-sm text-dark-400">{employee.position} • {employee.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={getStatusColor(employee.status)} size="sm">
                    {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                  </Badge>
                  <Badge variant={getInsuranceStatusColor(employee.insuranceStatus)} size="sm">
                    {employee.insuranceStatus.replace('_', ' ').charAt(0).toUpperCase() + employee.insuranceStatus.replace('_', ' ').slice(1)}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Eye}
                    onClick={() => handleViewDetails(employee.id)}
                  >
                    {selectedEmployee === employee.id ? 'Hide' : 'View'} Details
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-dark-400">Employee ID</p>
                  <p className="text-sm font-medium text-dark-500">{employee.id}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400">Join Date</p>
                  <p className="text-sm font-medium text-dark-500">{formatDate(employee.joinDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400">Policies</p>
                  <p className="text-sm font-medium text-dark-500">{employee.policies.length}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400">Dependents</p>
                  <p className="text-sm font-medium text-dark-500">{employee.dependents}</p>
                </div>
              </div>

              {selectedEmployee === employee.id && (
                <div className="border-t border-light-300 pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-dark-500 mb-2">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-dark-400" />
                          <span className="text-sm text-dark-500">{employee.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-dark-400" />
                          <span className="text-sm text-dark-500">{employee.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-dark-500 mb-2">Insurance Policies</h4>
                      <div className="space-y-2">
                        {employee.policies.length > 0 ? (
                          employee.policies.map((policy, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-light-200 rounded">
                              <span className="text-sm text-dark-500">{policy}</span>
                              <Badge variant="success" size="sm">Active</Badge>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-dark-400">No policies enrolled</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" icon={Mail}>
                      Send Email
                    </Button>
                    <Button variant="outline" size="sm" icon={Shield}>
                      Manage Insurance
                    </Button>
                    {employee.insuranceStatus === 'not_enrolled' && (
                      <Button variant="primary" size="sm">
                        Enroll in Insurance
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="w-12 h-12 text-dark-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark-500 mb-2">No Employees Found</h3>
            <p className="text-dark-400 mb-4">
              {searchTerm ? 'No employees match your search criteria.' : 'You haven\'t added any employees yet.'}
            </p>
            <Button variant="primary">
              Add Your First Employee
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};