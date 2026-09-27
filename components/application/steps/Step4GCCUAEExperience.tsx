'use client';

import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gccUaeExperienceSchema, GCCUAEExperienceForm } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { GCC_COUNTRIES } from '@/types/application';
import { useApplication } from '@/contexts/ApplicationContext';
import { nanoid } from 'nanoid';

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
}

const UAE_CITIES = [
  'Abu Dhabi',
  'Dubai',
  'Sharjah',
  'Ajman',
  'Umm Al Quwain',
  'Ras Al Khaimah',
  'Fujairah',
  'Al Ain',
];

export const Step4GCCUAEExperience: React.FC<Step4Props> = ({ onNext, onBack }) => {
  const { applicationData, updateApplicationData } = useApplication();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<GCCUAEExperienceForm>({
    resolver: zodResolver(gccUaeExperienceSchema),
    defaultValues: applicationData.gccUaeExperience,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'uaeExperienceRecords',
  });

  const hasUAEExperience = watch('hasUAEExperience');
  const hasVisitedUAE = watch('hasVisitedUAE');
  const hasGCCExperience = watch('hasGCCExperience');

  const onSubmit = (data: GCCUAEExperienceForm) => {
    updateApplicationData('gccUaeExperience', data);
    onNext();
  };

  const addUAEExperience = () => {
    append({
      id: nanoid(),
      city: '',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>GCC / UAE Experience</CardTitle>
          <CardDescription>
            Since this position is based in Abu Dhabi, UAE, please tell us about your experience in the region.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* UAE Work Experience */}
          <div className="p-4 bg-nabat-primary-50 rounded-nabat-md border border-nabat-primary-200">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                {...register('hasUAEExperience')}
                className="mt-1"
              />
              <div className="ml-3">
                <p className="font-medium text-nabat-neutral-900">
                  I have previously lived or worked in the UAE
                </p>
                <p className="text-sm text-nabat-neutral-600 mt-1">
                  Check this if you have UAE work experience
                </p>
              </div>
            </label>
          </div>

          {/* UAE Experience Records */}
          {hasUAEExperience && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="section-subheading mb-0">UAE Work Experience</h3>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addUAEExperience}
                >
                  + Add Experience
                </Button>
              </div>

              {fields.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-nabat-neutral-300 rounded-nabat-md">
                  <p className="text-nabat-neutral-600 mb-4">
                    No UAE experience added yet
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={addUAEExperience}
                  >
                    Add UAE Experience
                  </Button>
                </div>
              )}

              {fields.map((field, index) => (
                <Card key={field.id} className="relative">
                  <CardContent className="pt-6">
                    <div className="absolute top-4 right-4">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                          label="UAE City"
                          required
                          {...register(`uaeExperienceRecords.${index}.city`)}
                          error={errors.uaeExperienceRecords?.[index]?.city?.message}
                          options={UAE_CITIES}
                          placeholder="Select city"
                        />

                        <Input
                          label="Company"
                          required
                          {...register(`uaeExperienceRecords.${index}.company`)}
                          error={errors.uaeExperienceRecords?.[index]?.company?.message}
                          placeholder="Company name"
                        />
                      </div>

                      <Input
                        label="Position"
                        required
                        {...register(`uaeExperienceRecords.${index}.position`)}
                        error={errors.uaeExperienceRecords?.[index]?.position?.message}
                        placeholder="Your position/title"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          type="month"
                          label="Start Date"
                          required
                          {...register(`uaeExperienceRecords.${index}.startDate`)}
                          error={errors.uaeExperienceRecords?.[index]?.startDate?.message}
                        />

                        <Input
                          type="month"
                          label="End Date"
                          {...register(`uaeExperienceRecords.${index}.endDate`)}
                          error={errors.uaeExperienceRecords?.[index]?.endDate?.message}
                          hint="Leave blank if current"
                        />
                      </div>

                      <Textarea
                        label="Main Responsibilities"
                        required
                        {...register(`uaeExperienceRecords.${index}.responsibilities`)}
                        error={errors.uaeExperienceRecords?.[index]?.responsibilities?.message}
                        placeholder="Describe your key responsibilities..."
                        rows={3}
                        maxLength={400}
                        showCharCount
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* UAE Visit */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">UAE Visits</h3>

            <div className="p-4 bg-nabat-accent-50 rounded-nabat-md border border-nabat-accent-200">
              <label className="flex items-start cursor-pointer mb-3">
                <input
                  type="checkbox"
                  {...register('hasVisitedUAE')}
                  className="mt-1"
                />
                <span className="ml-3 font-medium text-nabat-neutral-900">
                  I have previously visited the UAE
                </span>
              </label>

              {hasVisitedUAE && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Purpose of Visit"
                      {...register('visitPurpose')}
                      error={errors.visitPurpose?.message}
                      placeholder="e.g., Business, Tourism, Conference"
                    />

                    <Select
                      label="City/Emirate Visited"
                      {...register('visitCity')}
                      error={errors.visitCity?.message}
                      options={UAE_CITIES}
                      placeholder="Select city"
                    />
                  </div>

                  <Input
                    label="Approximate Date/Year"
                    {...register('visitDate')}
                    error={errors.visitDate?.message}
                    placeholder="e.g., March 2024, Summer 2023"
                  />
                </div>
              )}
            </div>
          </div>

          {/* GCC Experience */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">GCC Regional Experience</h3>

            <div className="p-4 bg-nabat-forest-50 rounded-nabat-md border border-nabat-forest-200">
              <label className="flex items-start cursor-pointer mb-3">
                <input
                  type="checkbox"
                  {...register('hasGCCExperience')}
                  className="mt-1"
                />
                <div className="ml-3">
                  <p className="font-medium text-nabat-neutral-900">
                    I have worked with clients, partners, investors, or government entities in the GCC
                  </p>
                  <p className="text-sm text-nabat-neutral-600 mt-1">
                    Gulf Cooperation Council countries
                  </p>
                </div>
              </label>

              {hasGCCExperience && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="input-label">
                      GCC Countries (select all that apply)
                    </label>
                    <Controller
                      name="gccCountries"
                      control={control}
                      render={({ field }) => (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                          {GCC_COUNTRIES.map((country) => (
                            <label
                              key={country}
                              className="flex items-center p-3 rounded-nabat-md border border-nabat-neutral-200 hover:border-nabat-primary-300 hover:bg-nabat-primary-50/30 cursor-pointer transition-all"
                            >
                              <input
                                type="checkbox"
                                value={country}
                                checked={(field.value || []).includes(country)}
                                onChange={(e) => {
                                  const currentValue = field.value || [];
                                  const newValue = e.target.checked
                                    ? [...currentValue, country]
                                    : currentValue.filter((c) => c !== country);
                                  field.onChange(newValue);
                                }}
                                className="mr-3"
                              />
                              <span className="text-sm text-nabat-neutral-700">
                                {country}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    />
                  </div>

                  <Textarea
                    label="Please briefly describe your GCC experience"
                    {...register('gccExperienceDescription')}
                    error={errors.gccExperienceDescription?.message}
                    placeholder="Describe your work with GCC clients, partners, or organizations..."
                    rows={4}
                    maxLength={600}
                    showCharCount
                  />
                </div>
              )}
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
