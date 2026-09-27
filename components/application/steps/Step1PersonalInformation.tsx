'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInformationSchema, PersonalInformationForm } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { COUNTRIES } from '@/types/application';
import { useApplication } from '@/contexts/ApplicationContext';

interface Step1Props {
  onNext: () => void;
  onBack?: () => void;
}

export const Step1PersonalInformation: React.FC<Step1Props> = ({ onNext, onBack }) => {
  const { applicationData, updateApplicationData } = useApplication();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PersonalInformationForm>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: applicationData.personalInformation,
  });

  const onSubmit = (data: PersonalInformationForm) => {
    updateApplicationData('personalInformation', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Please provide your personal details. Fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              required
              {...register('firstName')}
              error={errors.firstName?.message}
              placeholder="John"
            />
            <Input
              label="Last Name"
              required
              {...register('lastName')}
              error={errors.lastName?.message}
              placeholder="Doe"
            />
          </div>

          <Input
            label="Middle Name"
            {...register('middleName')}
            error={errors.middleName?.message}
            placeholder="Optional"
          />

          <Input
            label="Full Legal Name"
            required
            {...register('fullLegalName')}
            error={errors.fullLegalName?.message}
            hint="As it appears on your passport or official documents"
            placeholder="John Michael Doe"
          />

          <Input
            label="Preferred Name"
            {...register('preferredName')}
            error={errors.preferredName?.message}
            hint="How would you like to be addressed?"
            placeholder="Optional"
          />

          {/* Location Section */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Location & Nationality</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="date"
                label="Date of Birth"
                {...register('dateOfBirth')}
                error={errors.dateOfBirth?.message}
              />

              <Select
                label="Nationality"
                required
                {...register('nationality')}
                error={errors.nationality?.message}
                options={COUNTRIES}
                placeholder="Select your nationality"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Select
                label="Country of Residence"
                required
                {...register('countryOfResidence')}
                error={errors.countryOfResidence?.message}
                options={COUNTRIES}
                placeholder="Select country"
              />

              <Input
                label="City"
                {...register('city')}
                error={errors.city?.message}
                placeholder="e.g., Dubai, Abu Dhabi"
              />
            </div>

            <Input
              label="Current Address"
              {...register('currentAddress')}
              error={errors.currentAddress?.message}
              hint="Optional - Street address, building, apartment number"
              placeholder="123 Main Street, Building A, Apt 456"
              className="mt-6"
            />
          </div>

          {/* Contact Section */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Contact Information</h3>

            <div className="space-y-6">
              <Input
                type="email"
                label="Email Address"
                required
                {...register('email')}
                error={errors.email?.message}
                placeholder="john.doe@example.com"
                autoComplete="email"
              />

              <Input
                type="email"
                label="Confirm Email Address"
                required
                {...register('confirmEmail')}
                error={errors.confirmEmail?.message}
                placeholder="john.doe@example.com"
                autoComplete="email"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="tel"
                  label="Primary Phone Number"
                  required
                  {...register('primaryPhone')}
                  error={errors.primaryPhone?.message}
                  hint="Include country code (e.g., +971 50 123 4567)"
                  placeholder="+971 50 123 4567"
                />

                <Input
                  type="tel"
                  label="WhatsApp Number"
                  {...register('whatsappNumber')}
                  error={errors.whatsappNumber?.message}
                  hint="If different from primary phone"
                  placeholder="+971 50 123 4567"
                />
              </div>
            </div>
          </div>

          {/* Professional Profiles Section */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Professional Profiles</h3>

            <div className="space-y-6">
              <Input
                type="url"
                label="LinkedIn Profile"
                {...register('linkedinProfile')}
                error={errors.linkedinProfile?.message}
                placeholder="https://linkedin.com/in/yourprofile"
                leftIcon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                }
              />

              <Input
                type="url"
                label="Personal Website"
                {...register('personalWebsite')}
                error={errors.personalWebsite?.message}
                placeholder="https://yourwebsite.com"
              />

              <Input
                type="url"
                label="Other Professional Profile"
                {...register('otherProfile')}
                error={errors.otherProfile?.message}
                hint="Twitter, GitHub, Medium, etc."
                placeholder="https://..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {onBack && (
          <Button type="button" variant="ghost" onClick={onBack}>
            ← Back
          </Button>
        )}
        <div className="flex-1" />
        <Button type="submit">
          Continue →
        </Button>
      </div>
    </form>
  );
};
