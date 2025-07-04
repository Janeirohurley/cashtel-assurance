import React from 'react';
import { Shield, Heart, Car, Home, Briefcase, Users, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const InsuranceProducts: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'Health Insurance Premium',
      icon: Heart,
      price: 150,
      coverage: 'Up to $50,000',
      description: 'Comprehensive health coverage including hospitalization, medical consultations, and prescription drugs.',
      features: ['24/7 Emergency Care', 'Prescription Coverage', 'Preventive Care', 'Mental Health Support'],
      rating: 4.8,
      popular: true
    },
    {
      id: 2,
      name: 'Vehicle Insurance',
      icon: Car,
      price: 200,
      coverage: 'Up to $100,000',
      description: 'Complete vehicle protection including collision, comprehensive, and liability coverage.',
      features: ['Collision Coverage', 'Comprehensive Protection', 'Roadside Assistance', '24/7 Claims Support'],
      rating: 4.7,
      popular: false
    },
    {
      id: 3,
      name: 'Life Insurance',
      icon: Shield,
      price: 180,
      coverage: 'Up to $500,000',
      description: 'Secure your family\'s future with comprehensive life insurance coverage.',
      features: ['Death Benefit', 'Living Benefits', 'Flexible Premiums', 'Tax Advantages'],
      rating: 4.9,
      popular: false
    },
    {
      id: 4,
      name: 'Home Insurance',
      icon: Home,
      price: 120,
      coverage: 'Up to $300,000',
      description: 'Protect your home and belongings with comprehensive property insurance.',
      features: ['Property Coverage', 'Personal Belongings', 'Liability Protection', 'Additional Living Expenses'],
      rating: 4.6,
      popular: false
    },
    {
      id: 5,
      name: 'Business Insurance',
      icon: Briefcase,
      price: 350,
      coverage: 'Up to $1,000,000',
      description: 'Comprehensive business protection for small to medium enterprises.',
      features: ['General Liability', 'Property Protection', 'Business Interruption', 'Cyber Liability'],
      rating: 4.8,
      popular: false
    },
    {
      id: 6,
      name: 'Group Insurance',
      icon: Users,
      price: 75,
      coverage: 'Up to $25,000 per person',
      description: 'Affordable group insurance solutions for organizations and families.',
      features: ['Group Discounts', 'Flexible Plans', 'Easy Management', 'Bulk Billing'],
      rating: 4.5,
      popular: false
    }
  ];

  const handleSubscribe = (productId: number) => {
    // Handle subscription logic
    console.log(`Subscribing to product ${productId}`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-dark-500 mb-4">Insurance Products</h1>
        <p className="text-lg text-dark-400 max-w-2xl mx-auto">
          Choose from our comprehensive range of insurance products designed to protect what matters most to you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const Icon = product.icon;
          return (
            <Card key={product.id} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {product.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="info" size="sm">
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark-500">{product.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-warning-400 fill-current" />
                      <span className="text-sm text-dark-400">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-dark-500">${product.price}</p>
                    <p className="text-sm text-dark-400">per month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-dark-500">Coverage</p>
                    <p className="text-sm text-dark-400">{product.coverage}</p>
                  </div>
                </div>

                <p className="text-sm text-dark-400">{product.description}</p>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-dark-500">Key Features:</p>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-dark-400">
                        <CheckCircle className="w-3 h-3 text-success-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 space-y-2">
                  <Button
                    fullWidth
                    onClick={() => handleSubscribe(product.id)}
                    className="group"
                  >
                    Subscribe Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" fullWidth size="sm">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 bg-gradient-to-r from-secondary-100 to-primary-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-dark-500 mb-4">Need Help Choosing?</h2>
        <p className="text-dark-400 mb-6">
          Our insurance experts are here to help you find the perfect coverage for your needs.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="primary">
            Contact an Agent
          </Button>
          <Button variant="outline">
            Get Quote
          </Button>
        </div>
      </div>
    </div>
  );
};