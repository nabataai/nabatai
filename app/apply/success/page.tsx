'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function SuccessPage() {
  const [copied, setCopied] = useState(false);
  // Generate or read application number
  const applicationNumber = 'NAB-' + Date.now().toString(36).toUpperCase();
  const submissionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(applicationNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-nabat-neutral-50 to-nabat-primary-50/20 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-nabat-neutral-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-xs">
        <div className="container-nabat py-3.5 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/nabat.jpeg"
                alt="Nabat AI"
                width={170}
                height={38}
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                priority
              />
            </Link>
            <Link
              href="https://nabat.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-semibold text-nabat-primary-600 hover:text-nabat-forest-700 bg-nabat-primary-50 hover:bg-nabat-primary-100/70 px-3.5 py-1.5 rounded-full transition-colors inline-flex items-center gap-1"
            >
              <span>nabat.ai</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 md:py-20">
        <div className="container-nabat max-w-3xl mx-auto">
          {/* Success Banner Header */}
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-nabat-accent-100/80 border border-nabat-accent-300 text-nabat-forest-700 mb-6 shadow-sm">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-nabat-neutral-900 tracking-tight mb-4">
              Application Submitted!
            </h1>
            <p className="text-base sm:text-lg text-nabat-neutral-600 max-w-xl mx-auto leading-relaxed">
              Thank you for applying for the <strong>Director of Business Development</strong> position at Nabat AI. We have received your executive dossier.
            </p>
          </div>

          {/* Application Details Card */}
          <div className="bg-white rounded-2xl border border-nabat-neutral-200/90 shadow-nabat-card overflow-hidden mb-8 animate-slide-up">
            <div className="bg-gradient-to-r from-nabat-primary-600 to-nabat-forest-700 px-6 sm:px-8 py-5 text-white flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Application Record</h2>
                <p className="text-xs text-nabat-primary-100 mt-0.5">Please retain this reference number for future communication</p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-xs border border-white/20">
                Official Submission
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-nabat-neutral-100 gap-2">
                <span className="text-sm font-medium text-nabat-neutral-500">Application Reference</span>
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-bold text-nabat-primary-700 text-lg sm:text-xl">
                    {applicationNumber}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-nabat-primary-50 text-nabat-primary-700 hover:bg-nabat-primary-100 transition-colors cursor-pointer"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-nabat-neutral-100">
                <span className="text-sm font-medium text-nabat-neutral-500">Submission Date</span>
                <span className="text-sm font-semibold text-nabat-neutral-900">
                  {submissionDate}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-nabat-neutral-100">
                <span className="text-sm font-medium text-nabat-neutral-500">Position</span>
                <span className="text-sm font-semibold text-nabat-neutral-900">
                  Director of Business Development
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-nabat-neutral-500">Office Location</span>
                <span className="text-sm font-semibold text-nabat-neutral-900">
                  Abu Dhabi, United Arab Emirates
                </span>
              </div>
            </div>
          </div>

          {/* What Happens Next Card */}
          <div className="bg-white rounded-2xl border border-nabat-neutral-200/90 shadow-nabat-card p-6 sm:p-8 mb-8 animate-slide-up">
            <h3 className="text-lg sm:text-xl font-bold text-nabat-neutral-900 mb-6">
              Executive Evaluation Process
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nabat-primary-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-nabat-primary-700">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-nabat-neutral-900 text-sm sm:text-base">
                    Confirmation & Dossier Archival
                  </h4>
                  <p className="text-xs sm:text-sm text-nabat-neutral-600 mt-1 leading-relaxed">
                    A confirmation email containing your complete application reference has been logged. Our leadership team has received your submission.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nabat-primary-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-nabat-primary-700">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-nabat-neutral-900 text-sm sm:text-base">
                    Executive Review Committee
                  </h4>
                  <p className="text-xs sm:text-sm text-nabat-neutral-600 mt-1 leading-relaxed">
                    Our founders and executive search committee will review your track record, leadership achievements, and regional expertise.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nabat-primary-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-nabat-primary-700">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-nabat-neutral-900 text-sm sm:text-base">
                    Confidential Interview Series
                  </h4>
                  <p className="text-xs sm:text-sm text-nabat-neutral-600 mt-1 leading-relaxed">
                    Shortlisted executives will be invited to a confidential series of discussions exploring strategic alignment, commercial roadmap, and executive vision.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Alert Box */}
          <div className="bg-gradient-to-r from-nabat-primary-50/70 via-white to-nabat-accent-50/40 rounded-2xl border border-nabat-primary-200/80 p-5 mb-10 flex items-start space-x-3.5 shadow-xs">
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
            <div>
              <p className="text-sm font-bold text-nabat-neutral-900">
                Questions or updates regarding your submission?
              </p>
              <p className="text-xs sm:text-sm text-nabat-neutral-600 mt-0.5">
                Contact our executive talent team at{' '}
                <a href="mailto:careers@nabat.ai" className="font-semibold text-nabat-primary-700 underline decoration-nabat-primary-300">
                  careers@nabat.ai
                </a>{' '}
                referencing your application ID: <strong>{applicationNumber}</strong>
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="https://nabat.ai/"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="w-full sm:w-auto min-w-[200px]"
            >
              Visit Nabat.ai
            </Button>
            <Button
              href="/"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto min-w-[200px]"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-nabat-neutral-800 bg-nabat-neutral-900 text-white py-10 mt-16">
        <div className="container-nabat">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center bg-white px-3 py-1 rounded-xl shadow-xs">
              <Image
                src="/nabat.jpeg"
                alt="Nabat AI"
                width={120}
                height={26}
                className="h-6 w-auto object-contain"
              />
            </div>
            <div className="flex items-center space-x-6 text-sm text-nabat-neutral-400">
              <Link
                href="https://nabat.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-nabat-accent-400 transition-colors"
              >
                Website
              </Link>
              <span className="text-nabat-neutral-500">© 2026 Nabat AI • Abu Dhabi, UAE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
