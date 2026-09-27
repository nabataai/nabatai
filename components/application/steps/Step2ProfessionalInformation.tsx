'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { professionalInformationSchema, ProfessionalInformationForm } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { INDUSTRIES, AREAS_OF_EXPERTISE, EMPLOYMENT_STATUS, NOTICE_PERIODS } from '@/types/application';
import { getYearsOfExperienceOptions } from '@/lib/utils';
import { useApplication } from '@/contexts/ApplicationContext';

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

export const Step2ProfessionalInformation: React.FC<Step2Props> = ({ onNext, onBack }) => {
  const { applicationData, updateApplicationData } = useApplication();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfessionalInformationForm>({
    resolver: zodResolver(professionalInformationSchema),
    defaultValues: applicationData.professionalInformation,
  });

  const [selectedExpertise, setSelectedExpertise] = useState<string[]>(
    applicationData.professionalInformation.areasOfExpertise || []
  );

  const onSubmit = (data: ProfessionalInformationForm) => {
    updateApplicationData('professionalInformation', data);
    onNext();
  };

  const toggleExpertise = (area: string) => {
    setSelectedExpertise((prev) => {
      if (prev.includes(area)) {
        return prev.filter((a) => a !== area);
      } else {
        return [...prev, area];
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Professional Background</CardTitle>
          <CardDescription>
            Tell us about your current role and professional experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Current Job Title"
              required
              {...register('currentJobTitle')}
              error={errors.currentJobTitle?.message}
              placeholder="e.g., VP of Business Development"
            />

            <Input
              label="Current Company"
              required
              {...register('currentCompany')}
              error={errors.currentCompany?.message}
              placeholder="Company name"
            />
          </div>

          {/* Experience */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select
              label="Years of Professional Experience"
              required
              {...register('yearsOfExperience')}
              error={errors.yearsOfExperience?.message}
              options={getYearsOfExperienceOptions()}
              placeholder="Select"
            />

            <Select
              label="Years of BD Experience"
              {...register('yearsOfBDExperience')}
              error={errors.yearsOfBDExperience?.message}
              options={getYearsOfExperienceOptions()}
              placeholder="Select"
            />

            <Select
              label="Years of Leadership Experience"
              {...register('yearsOfLeadership')}
              error={errors.yearsOfLeadership?.message}
              options={getYearsOfExperienceOptions()}
              placeholder="Select"
            />
          </div>

          {/* Industries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Current Industry"
              {...register('currentIndustry')}
              error={errors.currentIndustry?.message}
              options={INDUSTRIES}
              placeholder="Select industry"
            />

            <Select
              label="Current Employment Status"
              {...register('currentEmploymentStatus')}
              error={errors.currentEmploymentStatus?.message}
              options={EMPLOYMENT_STATUS}
              placeholder="Select status"
            />
          </div>

          {/* Areas of Expertise */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Areas of Expertise</h3>
            <p className="text-sm text-nabat-neutral-600 mb-4">
              Select all that apply (minimum 1 required) *
            </p>

            <Controller
              name="areasOfExpertise"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {AREAS_OF_EXPERTISE.map((area) => (
                    <label
                      key={area}
                      className="flex items-center p-3 rounded-nabat-md border border-nabat-neutral-200 hover:border-nabat-primary-300 hover:bg-nabat-primary-50/30 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        value={area}
                        checked={selectedExpertise.includes(area)}
                        onChange={(e) => {
                          const newValue = e.target.checked
                            ? [...selectedExpertise, area]
                            : selectedExpertise.filter((a) => a !== area);
                          setSelectedExpertise(newValue);
                          field.onChange(newValue);
                        }}
                        className="mr-3"
                      />
                      <span className="text-sm text-nabat-neutral-700">{area}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.areasOfExpertise && (
              <p className="input-error-message mt-2">
                {errors.areasOfExpertise.message}
              </p>
            )}
          </div>

          {/* Compensation & Availability */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Compensation & Availability</h3>
            <p className="text-sm text-nabat-neutral-600 mb-4">
              Optional - This information helps us prepare a competitive offer
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Current Salary"
                {...register('currentSalary')}
                error={errors.currentSalary?.message}
                placeholder="e.g., $150,000 USD / year"
                hint="Optional"
              />

              <Input
                label="Expected Salary"
                {...register('expectedSalary')}
                error={errors.expectedSalary?.message}
                placeholder="e.g., $180,000 USD / year"
                hint="Optional"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Select
                label="Notice Period"
                {...register('noticePeriod')}
                error={errors.noticePeriod?.message}
                options={NOTICE_PERIODS}
                placeholder="Select notice period"
              />

              <Input
                type="date"
                label="Earliest Possible Start Date"
                {...register('earliestStartDate')}
                error={errors.earliestStartDate?.message}
              />
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
