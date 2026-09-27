'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  const currentStepData = steps[currentStep - 1] || steps[0];
  const progressPercent = Math.round(((currentStep - 1) / (steps.length - 1)) * 100);

  return (
    <div className="w-full">
      {/* Mobile & Small Tablets View (< 768px) */}
      <div className="block md:hidden bg-white rounded-xl border border-nabat-neutral-200/90 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-nabat-primary-100 text-nabat-primary-800">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-xs font-medium text-nabat-neutral-500">
              {progressPercent}% Complete
            </span>
          </div>
        </div>

        <p className="text-base font-bold text-nabat-neutral-900 mb-3 truncate">
          {currentStepData.title}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-nabat-neutral-200 h-2 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-nabat-primary-500 to-nabat-forest-600 transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>

        {/* Mini Step Dots */}
        <div className="flex items-center justify-between gap-1 pt-1">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isActive = currentStep === step.number;
            return (
              <div
                key={step.number}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-all duration-300',
                  isCompleted && 'bg-nabat-forest-600',
                  isActive && 'bg-nabat-primary-500 ring-2 ring-nabat-primary-200 scale-y-125',
                  !isCompleted && !isActive && 'bg-nabat-neutral-200'
                )}
                title={`Step ${step.number}: ${step.title}`}
              />
            );
          })}
        </div>
      </div>

      {/* Desktop & Tablet View (>= 768px) */}
      <div className="hidden md:block relative bg-white/60 backdrop-blur-sm rounded-2xl border border-nabat-neutral-200/80 p-6 shadow-xs">
        {/* Continuous Connecting Line Behind Circles */}
        <div
          className="absolute top-11 left-[6.25%] right-[6.25%] h-0.5 bg-nabat-neutral-200 z-0"
          aria-hidden="true"
        >
          <div
            className="h-full bg-gradient-to-r from-nabat-forest-700 via-nabat-primary-500 to-nabat-primary-400 transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Step Nodes Grid */}
        <div className="relative z-10 grid grid-cols-8 gap-1">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isActive = currentStep === step.number;
            const isUpcoming = currentStep < step.number;

            return (
              <div key={step.number} className="flex flex-col items-center text-center">
                {/* Step Circle */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ring-4 ring-white select-none',
                    isCompleted &&
                      'bg-nabat-forest-700 text-white shadow-sm',
                    isActive &&
                      'bg-nabat-primary-500 text-white ring-4 ring-nabat-primary-100 shadow-nabat-md scale-110',
                    isUpcoming &&
                      'bg-white border-2 border-nabat-neutral-300 text-nabat-neutral-400'
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-2.5 px-0.5 w-full">
                  <p
                    className={cn(
                      'text-xs font-semibold truncate transition-colors duration-200',
                      isActive && 'text-nabat-primary-700 font-bold',
                      isCompleted && 'text-nabat-neutral-800',
                      isUpcoming && 'text-nabat-neutral-400'
                    )}
                    title={step.title}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
