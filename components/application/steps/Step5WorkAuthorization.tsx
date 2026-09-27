'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { workAuthorizationSchema, WorkAuthorizationForm } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { useApplication } from '@/contexts/ApplicationContext';

interface Step5Props {
  onNext: () => void;
  onBack: () => void;
}

const VISA_TYPES = [
  'Employment Visa',
  'Residence Visa',
  'Family Visa',
  'Investor Visa',
  'Golden Visa',
  'Other',
];

const WORK_AUTHORIZATION_OPTIONS = [
  { value: 'yes', label: 'Yes, I am legally authorized to work in the UAE' },
  { value: 'no', label: 'No, I am not currently authorized' },
  { value: 'sponsorship', label: 'Not currently, but I would require sponsorship' },
];

const RELOCATION_OPTIONS = [
  { value: 'yes', label: 'Yes, I am willing to relocate to Abu Dhabi' },
  { value: 'no', label: 'No, I am not able to relocate' },
  { value: 'based', label: 'Already based in the UAE' },
  { value: 'discussion', label: 'Open to discussion' },
];

export const Step5WorkAuthorization: React.FC<Step5Props> = ({ onNext, onBack }) => {
  const { applicationData, updateApplicationData } = useApplication();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WorkAuthorizationForm>({
    resolver: zodResolver(workAuthorizationSchema),
    defaultValues: applicationData.workAuthorization,
  });

  const hasUAEVisa = watch('hasUAEVisa');

  const onSubmit = (data: WorkAuthorizationForm) => {
    updateApplicationData('workAuthorization', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>UAE Work Authorization & Relocation</CardTitle>
          <CardDescription>
            Since this position is based in Abu Dhabi, UAE, please provide information about your work authorization and relocation status.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* UAE Visa Status */}
          <div className="p-4 bg-nabat-primary-50 rounded-nabat-md border border-nabat-primary-200">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                {...register('hasUAEVisa')}
                className="mt-1"
              />
              <div className="ml-3">
                <p className="font-medium text-nabat-neutral-900">
                  I currently have a UAE residence visa
                </p>
                <p className="text-sm text-nabat-neutral-600 mt-1">
                  Check this if you already hold a valid UAE visa
                </p>
              </div>
            </label>
          </div>

          {/* Visa Details */}
          {hasUAEVisa && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Visa Type"
                  {...register('visaType')}
                  error={errors.visaType?.message}
                  options={VISA_TYPES}
                  placeholder="Select visa type"
                />

                <Input
                  type="date"
                  label="Visa Expiry Date"
                  {...register('visaExpiry')}
                  error={errors.visaExpiry?.message}
                />
              </div>
            </div>
          )}

          {/* Work Authorization */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Work Authorization</h3>

            <div className="space-y-3">
              {WORK_AUTHORIZATION_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-start p-4 rounded-nabat-md border-2 border-nabat-neutral-200 hover:border-nabat-primary-400 cursor-pointer transition-all"
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...register('authorizedToWork')}
                    className="mt-1"
                  />
                  <span className="ml-3 text-nabat-neutral-900">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.authorizedToWork && (
              <p className="input-error-message mt-2">
                {errors.authorizedToWork.message}
              </p>
            )}

            <div className="mt-4 p-4 bg-nabat-accent-50 rounded-nabat-md border border-nabat-accent-200">
              <p className="text-sm text-nabat-neutral-700">
                <strong>Note:</strong> Nabat AI can sponsor qualified candidates for UAE work authorization if required.
              </p>
            </div>
          </div>

          {/* Relocation Preference */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Relocation to Abu Dhabi</h3>
            <p className="text-sm text-nabat-neutral-600 mb-4">
              This role requires working from our Abu Dhabi office
            </p>

            <div className="space-y-3">
              {RELOCATION_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-start p-4 rounded-nabat-md border-2 border-nabat-neutral-200 hover:border-nabat-primary-400 cursor-pointer transition-all"
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...register('willingToRelocate')}
                    className="mt-1"
                  />
                  <span className="ml-3 text-nabat-neutral-900">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.willingToRelocate && (
              <p className="input-error-message mt-2">
                {errors.willingToRelocate.message}
              </p>
            )}
          </div>

          {/* Passport Status */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Passport Status</h3>

            <div className="p-4 bg-nabat-forest-50 rounded-nabat-md border border-nabat-forest-200">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  {...register('hasValidPassport')}
                  className="mt-1"
                />
                <div className="ml-3">
                  <p className="font-medium text-nabat-neutral-900">
                    I currently hold a valid passport
                  </p>
                  <p className="text-sm text-nabat-neutral-600 mt-1">
                    A valid passport is required for UAE work authorization
                  </p>
                </div>
              </label>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-nabat-md border border-blue-200">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
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
                  <p className="text-sm font-medium text-blue-900">
                    Document Upload Information
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Passport and identity documents should only be submitted if requested for the recruitment or onboarding process. You will have the option to upload these in the next step if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <Button type="submit">
          Continue →
        </Button>
      </div>
    </form>
  );
};
