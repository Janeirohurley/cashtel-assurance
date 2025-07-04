import React, { useState } from 'react';
import { BarChart3, Download, Calendar, TrendingUp, Users, DollarSign, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

export const OrganisationReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportData = {
    overview: {
      totalEmployees: 45,
      insuredEmployees: 38,
      totalPremiums: 15750,
      claimsThisMonth: 8,
      totalClaims: 24,
      claimsAmount: 12500
    },
    monthly: [
      { month: 'Jan 2024', premiums: 15750, claims: 2, claimsAmount: 3200 },
      { month: 'Feb 2024', premiums: 15750, claims: 3, claimsAmount: 4100 },
      { month: 'Mar 2024', premiums: 15750, claims: 1, claimsAmount: 1800 },
      { month: 'Apr 2024', premiums: 15750, claims: 4, claimsAmount: 5200 },
      { month: 'May 2024', premiums: 15750, claims: 2, claimsAmount: 2900 },
      { month: 'Jun 2024', premiums: 15750, claims: 3, claimsAmount: 3800 }
    ],
    departments: [
      { name: 'Engineering', employees: 15, insured: 14, premiums: 5250 },
      { name: 'Marketing', employees: 8, insured: 7, premiums: 2625 },
      { name: 'Sales', employees: 12, insured: 10, premiums: 3750 },
      { name: 'HR', employees: 5, insured: 4, premiums: 1500 },
      { name: 'Finance', employees: 5, insured: 3, premiums: 1125 }
    ],
    policies: [
      { type: 'Health Insurance', enrolled: 35, premium: 350, totalPremium: 12250 },
      { type: 'Life Insurance', enrolled: 20, premium: 100, totalPremium: 2000 },
      { type: 'Dental Insurance', enrolled: 25, premium: 50, totalPremium: 1250 },
      { type: 'Vision Insurance', enrolled: 15, premium: 25, totalPremium: 375 }
    ]
  };

  const handleDownloadReport = () => {
    console.log(`Downloading ${selectedReport} report for ${selectedPeriod} period`);
    alert('Report download started!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-500">Reports & Analytics</h1>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <Button variant="outline" icon={Download} onClick={handleDownloadReport}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="flex space-x-1 bg-light-200 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'departments', label: 'Departments', icon: Users },
          { id: 'policies', label: 'Policies', icon: Shield },
          { id: 'trends', label: 'Trends', icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedReport(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                selectedReport === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-dark-400 hover:text-dark-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Overview Report */}
      {selectedReport === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-dark-400">Total Employees</p>
                    <p className="text-2xl font-bold text-dark-500">{reportData.overview.totalEmployees}</p>
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
                    <p className="text-sm font-medium text-dark-400">Insured Employees</p>
                    <p className="text-2xl font-bold text-success-600">{reportData.overview.insuredEmployees}</p>
                  </div>
                  <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-success-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-dark-400">Monthly Premiums</p>
                    <p className="text-2xl font-bold text-primary-600">${reportData.overview.totalPremiums}</p>
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
                    <p className="text-sm font-medium text-dark-400">Claims This Month</p>
                    <p className="text-2xl font-bold text-warning-600">{reportData.overview.claimsThisMonth}</p>
                  </div>
                  <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-warning-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-dark-500">Monthly Trends</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.monthly.slice(-6).map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-light-200 rounded-lg">
                      <div>
                        <p className="font-medium text-dark-500">{month.month}</p>
                        <p className="text-sm text-dark-400">{month.claims} claims</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-dark-500">${month.premiums}</p>
                        <p className="text-sm text-dark-400">Premiums</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-dark-500">Claims Summary</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-success-50 rounded-lg">
                    <div>
                      <p className="font-medium text-success-800">Total Claims</p>
                      <p className="text-sm text-success-600">All time</p>
                    </div>
                    <p className="text-2xl font-bold text-success-800">{reportData.overview.totalClaims}</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                    <div>
                      <p className="font-medium text-primary-800">Claims Amount</p>
                      <p className="text-sm text-primary-600">Total paid</p>
                    </div>
                    <p className="text-2xl font-bold text-primary-800">${reportData.overview.claimsAmount}</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-warning-50 rounded-lg">
                    <div>
                      <p className="font-medium text-warning-800">Average Claim</p>
                      <p className="text-sm text-warning-600">Per incident</p>
                    </div>
                    <p className="text-2xl font-bold text-warning-800">${Math.round(reportData.overview.claimsAmount / reportData.overview.totalClaims)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Departments Report */}
      {selectedReport === 'departments' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-dark-500">Department Breakdown</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.departments.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-light-300 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-500">{dept.name}</p>
                      <p className="text-sm text-dark-400">{dept.employees} employees</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-dark-500">{dept.insured}/{dept.employees}</p>
                      <p className="text-xs text-dark-400">Insured</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-dark-500">${dept.premiums}</p>
                      <p className="text-xs text-dark-400">Monthly Premium</p>
                    </div>
                    <Badge variant={dept.insured === dept.employees ? 'success' : 'warning'} size="sm">
                      {Math.round((dept.insured / dept.employees) * 100)}% Coverage
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Policies Report */}
      {selectedReport === 'policies' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-dark-500">Policy Enrollment</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.policies.map((policy, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-light-300 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-500">{policy.type}</p>
                      <p className="text-sm text-dark-400">${policy.premium}/month per employee</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-dark-500">{policy.enrolled}</p>
                      <p className="text-xs text-dark-400">Enrolled</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-dark-500">${policy.totalPremium}</p>
                      <p className="text-xs text-dark-400">Total Premium</p>
                    </div>
                    <Badge variant="info" size="sm">
                      {Math.round((policy.enrolled / reportData.overview.totalEmployees) * 100)}% Adoption
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trends Report */}
      {selectedReport === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-dark-500">Premium Trends</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.monthly.slice(-6).map((month, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-dark-500">{month.month}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-light-300 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full" 
                          style={{ width: `${(month.premiums / 20000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-dark-500">${month.premiums}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-dark-500">Claims Trends</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.monthly.slice(-6).map((month, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-dark-500">{month.month}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-light-300 rounded-full h-2">
                        <div 
                          className="bg-warning-500 h-2 rounded-full" 
                          style={{ width: `${(month.claims / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-dark-500">{month.claims} claims</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};