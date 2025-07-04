import React, { useState } from 'react';
import { Search, HelpCircle, Book, MessageCircle, Phone, Mail, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const HelpPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      questions: [
        {
          id: 'create-account',
          question: 'How do I create an account?',
          answer: 'To create an account, click on the "Sign Up" button on the login page. Fill in your personal information including name, email, and phone number. You will receive a confirmation email to verify your account.'
        },
        {
          id: 'choose-insurance',
          question: 'How do I choose the right insurance?',
          answer: 'Our platform offers various insurance products including Health, Vehicle, Life, and Home insurance. Each product page contains detailed information about coverage, benefits, and pricing to help you make an informed decision.'
        },
        {
          id: 'payment-methods',
          question: 'What payment methods are accepted?',
          answer: 'We accept credit cards, debit cards, bank transfers, digital wallets, and mobile money payments. You can manage your payment methods in your profile settings.'
        }
      ]
    },
    {
      id: 'claims',
      title: 'Claims & Support',
      questions: [
        {
          id: 'file-claim',
          question: 'How do I file a claim?',
          answer: 'To file a claim, go to the Claims section in your dashboard, click "File New Claim", select your policy, provide details about the incident, and upload supporting documents. Our team will review your claim within 24-48 hours.'
        },
        {
          id: 'claim-status',
          question: 'How can I check my claim status?',
          answer: 'You can check your claim status in the Claims section of your dashboard. Each claim shows its current status (pending, approved, rejected) along with any notes from our review team.'
        },
        {
          id: 'emergency-claims',
          question: 'What should I do in case of emergency?',
          answer: 'For emergency claims, call our 24/7 emergency hotline at +1 (555) 911-HELP. Our emergency team will guide you through the immediate steps and help you file an urgent claim.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account Management',
      questions: [
        {
          id: 'update-profile',
          question: 'How do I update my profile information?',
          answer: 'Go to Profile Settings in your dashboard. You can update your personal information, contact details, and preferences. Don\'t forget to save your changes.'
        },
        {
          id: 'change-password',
          question: 'How do I change my password?',
          answer: 'In Profile Settings, go to the Password tab. Enter your current password and your new password twice. Your new password must meet our security requirements.'
        },
        {
          id: 'two-factor',
          question: 'How do I enable two-factor authentication?',
          answer: 'In Profile Settings, go to the Security tab and toggle on "Two-Factor Authentication". Follow the setup instructions to secure your account with an additional layer of protection.'
        }
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Payments',
      questions: [
        {
          id: 'payment-schedule',
          question: 'When are my premiums due?',
          answer: 'Premium due dates depend on your policy terms. You can view upcoming payments in the Payments section of your dashboard. We also send email and SMS reminders before due dates.'
        },
        {
          id: 'auto-pay',
          question: 'Can I set up automatic payments?',
          answer: 'Yes, you can set up automatic payments in the Payment Methods section. Choose your preferred payment method and frequency (monthly, quarterly, or annually).'
        },
        {
          id: 'payment-failed',
          question: 'What happens if my payment fails?',
          answer: 'If a payment fails, we\'ll notify you immediately and retry the payment. You have a grace period to update your payment method or make a manual payment to avoid policy suspension.'
        }
      ]
    }
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: '24/7 Phone Support',
      description: 'Speak with our support team',
      contact: '+1 (555) 123-4567',
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@cashtelassurance.com',
      action: 'Send Email'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 9 AM - 6 PM',
      action: 'Start Chat'
    }
  ];

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFaq = (questionId: string) => {
    setExpandedFaq(expandedFaq === questionId ? null : questionId);
  };

  return (
    <div className="min-h-screen bg-light-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl mb-8">Find answers to common questions or get in touch with our support team</p>
          
          <div className="max-w-2xl mx-auto">
            <Input
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              fullWidth
              className="bg-white text-dark-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-dark-500">Quick Actions</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Book className="w-6 h-6 mb-2" />
                    <span>User Guide</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <MessageCircle className="w-6 h-6 mb-2" />
                    <span>File a Claim</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Phone className="w-6 h-6 mb-2" />
                    <span>Emergency Help</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Sections */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-dark-500">Frequently Asked Questions</h2>
              
              {filteredFaqs.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-dark-500">{category.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.questions.map((faq) => (
                        <div key={faq.id} className="border border-light-300 rounded-lg">
                          <button
                            onClick={() => toggleFaq(faq.id)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-light-200 transition-colors"
                          >
                            <span className="font-medium text-dark-500">{faq.question}</span>
                            {expandedFaq === faq.id ? (
                              <ChevronDown className="w-5 h-5 text-dark-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-dark-400" />
                            )}
                          </button>
                          {expandedFaq === faq.id && (
                            <div className="px-4 pb-4">
                              <p className="text-dark-400">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {searchTerm && filteredFaqs.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Search className="w-12 h-12 text-dark-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-dark-500 mb-2">No results found</h3>
                  <p className="text-dark-400 mb-4">
                    We couldn't find any help articles matching "{searchTerm}".
                  </p>
                  <Button variant="primary">Contact Support</Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-dark-500">Contact Support</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <div key={index} className="p-4 border border-light-300 rounded-lg hover:bg-light-200 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-dark-500">{option.title}</h4>
                          <p className="text-sm text-dark-400 mb-2">{option.description}</p>
                          <p className="text-sm font-medium text-dark-500 mb-2">{option.contact}</p>
                          <Button variant="outline" size="sm">
                            {option.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-error-50 border-error-200">
              <CardHeader>
                <h3 className="text-lg font-semibold text-error-800">Emergency Claims</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-error-700 mb-4">
                  For urgent claims and emergencies, call our 24/7 hotline immediately.
                </p>
                <div className="text-center">
                  <p className="text-2xl font-bold text-error-800 mb-2">+1 (555) 911-HELP</p>
                  <Button variant="danger" fullWidth>
                    Call Emergency Line
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-dark-500">Popular Articles</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'How to file your first claim',
                    'Understanding your policy coverage',
                    'Setting up automatic payments',
                    'Adding family members to your policy',
                    'Updating your contact information'
                  ].map((article, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block text-sm text-primary-600 hover:text-primary-800 hover:underline"
                    >
                      {article}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};