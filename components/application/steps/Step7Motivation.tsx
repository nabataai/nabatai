'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motivationSchema, MotivationForm } from '@/lib/validations';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { useApplication } from '@/contexts/ApplicationContext';

interface Step7Props {
  onNext: () => void;
  onBack: () => void;
}

export const Step7Motivation: React.FC<Step7Props> = ({ onNext, onBack }) => {
  const { applicationData, updateApplicationData } = useApplication();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MotivationForm>({
    resolver: zodResolver(motivationSchema),
    defaultValues: applicationData.motivation,
  });

  const onSubmit = (data: MotivationForm) => {
    updateApplicationData('motivation', data);
    onNext();
  };

  const watchedValues = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Motivation & Role Fit</CardTitle>
          <CardDescription>
            These questions help us understand your motivation, experience, and approach to the role. Please provide thoughtful, detailed responses.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* About Nabat */}
          <div>
            <h3 className="section-subheading">About Your Interest in Nabat</h3>

            <div className="space-y-6">
              <Textarea
                label="Why are you interested in joining Nabat?"
                required
                {...register('whyNabat')}
                error={errors.whyNabat?.message}
                placeholder="Tell us what attracts you to Nabat and our mission..."
                rows={5}
                maxLength={1000}
                showCharCount
                value={watchedValues.whyNabat}
              />

              <Textarea
                label="Why are you interested specifically in the Director of Business Development position?"
                required
                {...register('whyThisRole')}
                error={errors.whyThisRole?.message}
                placeholder="What makes this role a good fit for your career goals and expertise..."
                rows={5}
                maxLength={1000}
                showCharCount
                value={watchedValues.whyThisRole}
              />
            </div>
          </div>

          {/* Experience & Track Record */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Experience & Track Record</h3>

            <div className="space-y-6">
              <Textarea
                label="What experience do you have in building strategic partnerships?"
                required
                {...register('partnershipExperience')}
                error={errors.partnershipExperience?.message}
                placeholder="Describe your approach to identifying, developing, and managing strategic partnerships..."
                rows={5}
                maxLength={1000}
                showCharCount
                value={watchedValues.partnershipExperience}
              />

              <Textarea
                label="Describe the most significant business opportunity you have identified and converted"
                required
                {...register('significantOpportunity')}
                error={errors.significantOpportunity?.message}
                placeholder="Walk us through how you identified the opportunity, your approach, and the outcome..."
                rows={5}
                maxLength={1000}
                showCharCount
                value={watchedValues.significantOpportunity}
              />

              <Textarea
                label="Describe a complex enterprise or government deal that you personally led"
                required
                {...register('complexDeal')}
                error={errors.complexDeal?.message}
                placeholder="Include the challenge, stakeholders involved, your strategy, and results..."
                rows={5}
                maxLength={1000}
                showCharCount
                value={watchedValues.complexDeal}
              />
            </div>
          </div>

          {/* Strategic Approach */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Strategic Approach to the Role</h3>

            <div className="space-y-6">
              <Textarea
                label="Which industries and customer segments do you believe could be most relevant to Nabat's growth?"
                required
                {...register('relevantIndustries')}
                error={errors.relevantIndustries?.message}
                placeholder="Based on Nabat's focus on ecosystem restoration, AI, and climate technology..."
                rows={4}
                maxLength={800}
                showCharCount
                value={watchedValues.relevantIndustries}
              />

              <Textarea
                label="How would you approach building Nabat's business development pipeline in the UAE and wider GCC?"
                required
                {...register('pipelineApproach')}
                error={errors.pipelineApproach?.message}
                placeholder="Describe your strategy for identifying prospects, building relationships, and converting opportunities..."
                rows={6}
                maxLength={1200}
                showCharCount
                value={watchedValues.pipelineApproach}
              />

              <Textarea
                label="What is your experience working with government agencies, enterprise organizations, investors, or strategic partners?"
                required
                {...register('stakeholderExperience')}
                error={errors.stakeholderExperience?.message}
                placeholder="Describe your approach to engaging with different stakeholder types..."
                rows={5}
                maxLength={1000}
                showCharCount
                value={watchedValues.stakeholderExperience}
              />
            </div>
          </div>

          {/* Your Approach */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Your Plan for Success</h3>

            <div className="space-y-6">
              <Textarea
                label="What would your priorities be during your first 90 days?"
                required
                {...register('first90Days')}
                error={errors.first90Days?.message}
                placeholder="Outline your approach to onboarding, building relationships, understanding the business, and delivering early wins..."
                rows={6}
                maxLength={1200}
                showCharCount
                value={watchedValues.first90Days}
              />

              <Textarea
                label="What makes you uniquely qualified for this role?"
                required
                {...register('uniqueQualifications')}
                error={errors.uniqueQualifications?.message}
                placeholder="What combination of skills, experience, networks, and personal qualities would you bring to Nabat..."
                rows={5}
                maxLength={1000}
                showCharCount
                value={watchedValues.uniqueQualifications}
              />
            </div>
          </div>

          {/* Help Text */}
          <div className="p-4 bg-nabat-accent-50 rounded-nabat-md border border-nabat-accent-200">
            <p className="text-sm text-nabat-neutral-700">
              <strong>Tip:</strong> Use specific examples and metrics where possible. We value concrete evidence of your experience and impact over general statements.
            </p>
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
