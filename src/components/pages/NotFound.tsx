import React from 'react';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';

export const NotFound: React.FC = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-100 via-light-100 to-primary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-12 h-12 text-error-600" />
          </div>
          <h1 className="text-6xl font-bold text-dark-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-dark-500 mb-2">Page Not Found</h2>
          <p className="text-dark-400 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="primary"
            onClick={handleGoHome}
            icon={Home}
            fullWidth
          >
            Go to Homepage
          </Button>
          <Button
            variant="outline"
            onClick={handleGoBack}
            icon={ArrowLeft}
            fullWidth
          >
            Go Back
          </Button>
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="font-medium text-dark-500 mb-2">Need Help?</h3>
          <p className="text-sm text-dark-400 mb-3">
            If you think this is an error, please contact our support team.
          </p>
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};