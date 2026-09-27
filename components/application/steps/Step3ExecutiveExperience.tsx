'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { executiveExperienceSchema, ExecutiveExperienceForm } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { COUNTRIES } from '@/types/application';
import { useApplication } from '@/contexts/ApplicationContext';
import { nanoid } from 'nanoid';

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
}

export const Step3ExecutiveExperience: React.FC<Step3Props> = ({ onNext, onBack }) => {
  const { applicationData, updateApplicationData } = useApplication();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ExecutiveExperienceForm>({
    resolver: zodResolver(executiveExperienceSchema),
    defaultValues: applicationData.executiveExperience,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'leadershipPositions',
  });

  const hasLeadershipExperience = watch('hasLeadershipExperience');

  const onSubmit = (data: ExecutiveExperienceForm) => {
    updateApplicationData('executiveExperience', data);
    onNext();
  };

  const addLeadershipPosition = () => {
    append({
      id: nanoid(),
      positionTitle: '',
      company: '',
      country: '',
      startDate: '',
      endDate: '',
      teamSize: '',
      responsibilities: '',
      achievements: '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Executive Experience</CardTitle>
          <CardDescription>
            Tell us about your senior leadership roles and business development track record.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Leadership Experience Toggle */}
          <div className="p-4 bg-nabat-primary-50 rounded-nabat-md border border-nabat-primary-200">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                {...register('hasLeadershipExperience')}
                className="mt-1"
              />
              <div className="ml-3">
                <p className="font-medium text-nabat-neutral-900">
                  I have held a Director, Head, VP, or C-Level position
                </p>
                <p className="text-sm text-nabat-neutral-600 mt-1">
                  Check this if you have senior leadership experience
                </p>
              </div>
            </label>
          </div>

          {/* Leadership Positions */}
          {hasLeadershipExperience && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="section-subheading mb-0">Leadership Positions</h3>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addLeadershipPosition}
                >
                  + Add Position
                </Button>
              </div>

              {fields.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-nabat-neutral-300 rounded-nabat-md">
                  <p className="text-nabat-neutral-600 mb-4">
                    No leadership positions added yet
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={addLeadershipPosition}
                  >
                    Add Your First Position
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
                        <Input
                          label="Position Title"
                          required
                          {...register(`leadershipPositions.${index}.positionTitle`)}
                          error={errors.leadershipPositions?.[index]?.positionTitle?.message}
                          placeholder="e.g., VP of Business Development"
                        />

                        <Input
                          label="Company"
                          required
                          {...register(`leadershipPositions.${index}.company`)}
                          error={errors.leadershipPositions?.[index]?.company?.message}
                          placeholder="Company name"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select
                          label="Country"
                          required
                          {...register(`leadershipPositions.${index}.country`)}
                          error={errors.leadershipPositions?.[index]?.country?.message}
                          options={COUNTRIES}
                          placeholder="Select country"
                        />

                        <Input
                          type="month"
                          label="Start Date"
                          required
                          {...register(`leadershipPositions.${index}.startDate`)}
                          error={errors.leadershipPositions?.[index]?.startDate?.message}
                        />

                        <Input
                          type="month"
                          label="End Date"
                          {...register(`leadershipPositions.${index}.endDate`)}
                          error={errors.leadershipPositions?.[index]?.endDate?.message}
                          hint="Leave blank if current"
                        />
                      </div>

                      <Input
                        label="Team Size"
                        {...register(`leadershipPositions.${index}.teamSize`)}
                        error={errors.leadershipPositions?.[index]?.teamSize?.message}
                        placeholder="e.g., 10 direct reports, 50 total"
                      />

                      <Textarea
                        label="Main Responsibilities"
                        required
                        {...register(`leadershipPositions.${index}.responsibilities`)}
                        error={errors.leadershipPositions?.[index]?.responsibilities?.message}
                        placeholder="Describe your key responsibilities in this role..."
                        rows={3}
                        maxLength={500}
                        showCharCount
                      />

                      <Textarea
                        label="Major Achievements"
                        required
                        {...register(`leadershipPositions.${index}.achievements`)}
                        error={errors.leadershipPositions?.[index]?.achievements?.message}
                        placeholder="Key accomplishments, metrics, impact..."
                        rows={3}
                        maxLength={500}
                        showCharCount
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}

              {errors.leadershipPositions?.root && (
                <p className="input-error-message">
                  {errors.leadershipPositions.root.message}
                </p>
              )}
            </div>
          )}

          {/* Business Development Track Record */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Business Development Track Record</h3>

            <div className="space-y-6">
              <Input
                label="Largest Annual Revenue/Book of Business"
                {...register('largestRevenue')}
                error={errors.largestRevenue?.message}
                placeholder="e.g., $50M annual recurring revenue"
                hint="What is the largest annual revenue/book of business you have directly influenced?"
              />

              <Input
                label="Largest Partnership or Deal"
                {...register('largestDeal')}
                error={errors.largestDeal?.message}
                placeholder="e.g., $10M multi-year enterprise contract with Fortune 500 company"
                hint="What is the largest partnership or commercial deal you have personally led?"
              />
            </div>
          </div>

          {/* Experience Checkboxes */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Professional Experience</h3>

            <div className="space-y-4">
              {/* Government Experience */}
              <div className="card p-4">
                <label className="flex items-start cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    {...register('workedWithGovernment')}
                    className="mt-1"
                  />
                  <span className="ml-3 font-medium text-nabat-neutral-900">
                    I have worked with government entities
                  </span>
                </label>
                {watch('workedWithGovernment') && (
                  <Textarea
                    {...register('governmentDetails')}
                    error={errors.governmentDetails?.message}
                    placeholder="Please briefly describe your government experience..."
                    rows={2}
                  />
                )}
              </div>

              {/* Enterprise Experience */}
              <div className="card p-4">
                <label className="flex items-start cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    {...register('workedWithEnterprises')}
                    className="mt-1"
                  />
                  <span className="ml-3 font-medium text-nabat-neutral-900">
                    I have worked with large enterprises
                  </span>
                </label>
                {watch('workedWithEnterprises') && (
                  <Textarea
                    {...register('enterpriseDetails')}
                    error={errors.enterpriseDetails?.message}
                    placeholder="Please briefly describe your enterprise experience..."
                    rows={2}
                  />
                )}
              </div>

              {/* Strategic Partnerships */}
              <div className="card p-4">
                <label className="flex items-start cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    {...register('developedPartnerships')}
                    className="mt-1"
                  />
                  <span className="ml-3 font-medium text-nabat-neutral-900">
                    I have developed strategic partnerships
                  </span>
                </label>
                {watch('developedPartnerships') && (
                  <Textarea
                    {...register('partnershipsDetails')}
                    error={errors.partnershipsDetails?.message}
                    placeholder="Please briefly describe your partnership experience..."
                    rows={2}
                  />
                )}
              </div>

              {/* Built BD Function */}
              <div className="card p-4">
                <label className="flex items-start cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    {...register('builtBDFunction')}
                    className="mt-1"
                  />
                  <span className="ml-3 font-medium text-nabat-neutral-900">
                    I have built a business development function from scratch
                  </span>
                </label>
                {watch('builtBDFunction') && (
                  <Textarea
                    {...register('bdFunctionDetails')}
                    error={errors.bdFunctionDetails?.message}
                    placeholder="Please briefly describe how you built the BD function..."
                    rows={2}
                  />
                )}
              </div>

              {/* Managed BD Team */}
              <div className="card p-4">
                <label className="flex items-start cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    {...register('managedBDTeam')}
                    className="mt-1"
                  />
                  <span className="ml-3 font-medium text-nabat-neutral-900">
                    I have managed a BD/Sales team
                  </span>
                </label>
                {watch('managedBDTeam') && (
                  <Textarea
                    {...register('bdTeamDetails')}
                    error={errors.bdTeamDetails?.message}
                    placeholder="Please briefly describe your team management experience..."
                    rows={2}
                  />
                )}
              </div>

              {/* GCC Experience */}
              <div className="card p-4">
                <label className="flex items-start cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    {...register('gccExperience')}
                    className="mt-1"
                  />
                  <span className="ml-3 font-medium text-nabat-neutral-900">
                    I have worked across the GCC/MENA region
                  </span>
                </label>
                {watch('gccExperience') && (
                  <Textarea
                    {...register('gccDetails')}
                    error={errors.gccDetails?.message}
                    placeholder="Please briefly describe your GCC/MENA experience..."
                    rows={2}
                  />
                )}
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
