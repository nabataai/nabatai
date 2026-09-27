'use client';

import React from 'react';
import { useApplication } from '@/contexts/ApplicationContext';
import { StepIndicator } from './StepIndicator';
import { Step1PersonalInformation } from './steps/Step1PersonalInformation';
import { Step2ProfessionalInformation } from './steps/Step2ProfessionalInformation';
import { Step3ExecutiveExperience } from './steps/Step3ExecutiveExperience';
import { Step4GCCUAEExperience } from './steps/Step4GCCUAEExperience';
import { Step5WorkAuthorization } from './steps/Step5WorkAuthorization';
import { Step6Documents } from './steps/Step6Documents';
import { Step7Motivation } from './steps/Step7Motivation';
import { Step8ReferencesSubmission } from './steps/Step8ReferencesSubmission';

const STEPS = [
  { number: 1, title: 'Personal Info', description: 'Basic personal information' },
  { number: 2, title: 'Professional', description: 'Career background' },
  { number: 3, title: 'Executive', description: 'Leadership experience' },
  { number: 4, title: 'GCC/UAE', description: 'Regional experience' },
  { number: 5, title: 'Authorization', description: 'Work & relocation' },
  { number: 6, title: 'Documents', description: 'Upload files' },
  { number: 7, title: 'Motivation', description: 'Role fit' },
  { number: 8, title: 'Submit', description: 'Final review' },
];

export const ApplicationForm: React.FC = () => {
  const { currentStep, setCurrentStep } = useApplication();

  const handleNext = () => {
    setCurrentStep(Math.min(currentStep + 1, 8));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container-nabat form-container">
      {/* Step Indicator */}
      <div className="mb-6 sm:mb-8">
        <StepIndicator steps={STEPS} currentStep={currentStep} />
      </div>

      {/* Auto-save Indicator */}
      <div className="mb-6 flex items-center justify-center">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-nabat-forest-50 text-nabat-forest-800 border border-nabat-forest-200/80 shadow-xs">
          <svg
            className="w-3.5 h-3.5 text-nabat-forest-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Your progress is automatically saved
        </span>
      </div>

      {/* Form Steps */}
      <div className="animate-fade-in">
        {currentStep === 1 && (
          <Step1PersonalInformation onNext={handleNext} />
        )}
        {currentStep === 2 && (
          <Step2ProfessionalInformation onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 3 && (
          <Step3ExecutiveExperience onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 4 && (
          <Step4GCCUAEExperience onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 5 && (
          <Step5WorkAuthorization onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 6 && (
          <Step6Documents onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 7 && (
          <Step7Motivation onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 8 && (
          <Step8ReferencesSubmission onBack={handleBack} />
        )}
      </div>

      {/* Help Text */}
      <div className="mt-10 p-5 bg-gradient-to-r from-nabat-primary-50/60 via-white to-nabat-accent-50/40 rounded-2xl border border-nabat-primary-100 shadow-xs text-center">
        <p className="text-sm text-nabat-neutral-700">
          Need assistance with your application? Contact our executive recruitment team at{' '}
          <a
            href="mailto:careers@nabat.ai"
            className="font-semibold text-nabat-primary-700 hover:text-nabat-forest-700 underline decoration-nabat-primary-300 underline-offset-2 transition-colors"
          >
            careers@nabat.ai
          </a>
        </p>
      </div>
    </div>
  );
};
