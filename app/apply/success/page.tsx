import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function SuccessPage() {
  // In a real implementation, this would come from the query params or session
  const applicationNumber = 'NAB-' + Date.now().toString(36).toUpperCase();
  const submissionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-nabat-neutral-50 via-white to-nabat-primary-50/20">
      {/* Header */}
      <header className="border-b border-nabat-neutral-200 bg-white/80 backdrop-blur-sm">
        <div className="container-nabat py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/nabat-logo.jpeg"
                alt="Nabat AI"
                width={150}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <Link
              href="https://nabat.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-nabat-primary-600 hover:text-nabat-primary-700 font-medium"
            >
              nabat.ai →
            </Link>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <main className="py-20">
        <div className="container-nabat max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-nabat-accent-100 mb-6">
              <svg
                className="w-10 h-10 text-nabat-forest-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-nabat-neutral-900 mb-4">
              Application Submitted Successfully
            </h1>
            <p className="text-xl text-nabat-neutral-600">
              Thank you for applying for the Director of Business Development position at Nabat AI
            </p>
          </div>

          {/* Application Details Card */}
          <div className="card mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-nabat-gradient p-6 rounded-t-nabat-lg text-white">
              <h2 className="text-2xl font-bold mb-2">Application Details</h2>
              <p className="text-nabat-primary-50">
                Please save your application reference number for future correspondence
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-nabat-neutral-200">
                <span className="text-nabat-neutral-600">Application Number</span>
                <span className="font-mono font-bold text-nabat-primary-600 text-lg">
                  {applicationNumber}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-nabat-neutral-200">
                <span className="text-nabat-neutral-600">Submission Date</span>
                <span className="font-medium text-nabat-neutral-900">
                  {submissionDate}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-nabat-neutral-600">Position</span>
                <span className="font-medium text-nabat-neutral-900">
                  Director of Business Development
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="card mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="p-6">
              <h3 className="text-xl font-bold text-nabat-neutral-900 mb-4">
                What Happens Next?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nabat-primary-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-nabat-primary-700">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-nabat-neutral-900 mb-1">
                      Confirmation Email
                    </h4>
                    <p className="text-sm text-nabat-neutral-600">
                      You will receive a confirmation email with your application reference number within the next few minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nabat-primary-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-nabat-primary-700">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-nabat-neutral-900 mb-1">
                      Application Review
                    </h4>
                    <p className="text-sm text-nabat-neutral-600">
                      Our recruitment team will carefully review your application and experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nabat-primary-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-nabat-primary-700">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-nabat-neutral-900 mb-1">
                      Follow-Up
                    </h4>
                    <p className="text-sm text-nabat-neutral-600">
                      If your qualifications match our requirements, we will contact you to discuss the next steps in the process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="alert alert-info mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-nabat-primary-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-medium text-nabat-primary-900">
                  Questions about your application?
                </p>
                <p className="text-sm text-nabat-primary-800 mt-1">
                  Contact us at{' '}
                  <a href="mailto:careers@nabat.ai" className="font-semibold underline">
                    careers@nabat.ai
                  </a>{' '}
                  and reference your application number: <strong>{applicationNumber}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link href="https://nabat.ai/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px]">
                Visit Nabat.ai
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px]">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-nabat-neutral-200 bg-nabat-neutral-900 text-white py-12 mt-20">
        <div className="container-nabat">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Image
                src="/nabat-logo.jpeg"
                alt="Nabat AI"
                width={120}
                height={32}
                className="h-8 w-auto opacity-90"
              />
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="https://nabat.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-nabat-accent-400 transition-colors"
              >
                Website
              </Link>
              <span className="text-nabat-neutral-500">© 2026 Nabat AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
