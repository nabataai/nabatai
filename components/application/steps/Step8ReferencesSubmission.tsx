'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { referencesAndSubmissionSchema, ReferencesAndSubmissionForm } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { useApplication } from '@/contexts/ApplicationContext';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';

interface Step8Props {
  onBack: () => void;
}

export const Step8ReferencesSubmission: React.FC<Step8Props> = ({ onBack }) => {
  const { applicationData, updateApplicationData, clearLocalStorage } = useApplication();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReferencesAndSubmissionForm>({
    resolver: zodResolver(referencesAndSubmissionSchema),
    defaultValues: applicationData.referencesAndSubmission,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'references',
  });

  const onSubmit = async (data: ReferencesAndSubmissionForm) => {
    setIsSubmitting(true);

    try {
      updateApplicationData('referencesAndSubmission', data);

      // Build multipart form with all data + files
      const formData = new FormData();

      // Serialize all non-file application data
      const appDataClone = {
        ...applicationData,
        referencesAndSubmission: data,
        // remove File objects — they'll be sent separately
        documents: {
          cvResumeUrl: applicationData.documents.cvResumeUrl,
          coverLetterUrl: applicationData.documents.coverLetterUrl,
          portfolioUrl: applicationData.documents.portfolioUrl,
          nationalIdFrontUrl: applicationData.documents.nationalIdFrontUrl,
          nationalIdBackUrl: applicationData.documents.nationalIdBackUrl,
          passportPageUrl: applicationData.documents.passportPageUrl,
        },
      };
      formData.append('data', JSON.stringify(appDataClone));

      // Attach files
      const fileMap: Record<string, File | null | undefined> = {
        cvResume: applicationData.documents.cvResume,
        coverLetter: applicationData.documents.coverLetter,
        portfolio: applicationData.documents.portfolio,
        nationalIdFront: applicationData.documents.nationalIdFront,
        nationalIdBack: applicationData.documents.nationalIdBack,
        passportPage: applicationData.documents.passportPage,
      };

      for (const [key, file] of Object.entries(fileMap)) {
        if (file instanceof File) {
          formData.append(key, file, file.name);
        }
      }

      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Submission failed');
      }

      // Clear local storage after successful submission
      clearLocalStorage();

      // Redirect to success page
      router.push('/apply/success');
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your application. Please try again.');
      setIsSubmitting(false);
    }
  };

  const addReference = () => {
    if (fields.length < 3) {
      append({
        id: nanoid(),
        fullName: '',
        jobTitle: '',
        company: '',
        relationship: '',
        email: '',
        phone: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Professional References</CardTitle>
          <CardDescription>
            Optional - You may provide up to 3 professional references who can speak to your work experience and qualifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-nabat-neutral-600">
              References added: {fields.length} / 3
            </p>
            {fields.length < 3 && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={addReference}
              >
                + Add Reference
              </Button>
            )}
          </div>

          {fields.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-nabat-neutral-300 rounded-nabat-md">
              <p className="text-nabat-neutral-600 mb-4">
                No references added (optional)
              </p>
              <Button
                type="button"
                variant="secondary"
                onClick={addReference}
              >
                Add Your First Reference
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

                <h4 className="font-semibold text-nabat-neutral-900 mb-4">
                  Reference {index + 1}
                </h4>

                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    required
                    {...register(`references.${index}.fullName`)}
                    error={errors.references?.[index]?.fullName?.message}
                    placeholder="John Doe"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Job Title"
                      required
                      {...register(`references.${index}.jobTitle`)}
                      error={errors.references?.[index]?.jobTitle?.message}
                      placeholder="CEO, VP of Sales, etc."
                    />

                    <Input
                      label="Company"
                      required
                      {...register(`references.${index}.company`)}
                      error={errors.references?.[index]?.company?.message}
                      placeholder="Company name"
                    />
                  </div>

                  <Input
                    label="Relationship"
                    required
                    {...register(`references.${index}.relationship`)}
                    error={errors.references?.[index]?.relationship?.message}
                    placeholder="e.g., Former Manager, Colleague, Client"
                    hint="How do you know this person?"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="email"
                      label="Email"
                      required
                      {...register(`references.${index}.email`)}
                      error={errors.references?.[index]?.email?.message}
                      placeholder="john.doe@example.com"
                    />

                    <Input
                      type="tel"
                      label="Phone"
                      required
                      {...register(`references.${index}.phone`)}
                      error={errors.references?.[index]?.phone?.message}
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Final Declarations */}
      <Card>
        <CardHeader>
          <CardTitle>Final Declaration</CardTitle>
          <CardDescription>
            Please review and confirm the following statements before submitting your application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Checkbox
            label={
              <span>
                I confirm that the information provided in this application is <strong>accurate and complete</strong> to the best of my knowledge.
              </span>
            }
            {...register('accuracyConfirmed')}
            error={errors.accuracyConfirmed?.message}
          />

          <Checkbox
            label={
              <span>
                I consent to Nabat using the information submitted through this application for recruitment and hiring-related purposes, subject to the{' '}
                <a
                  href="https://nabat.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-primary"
                >
                  Nabat Privacy Policy
                </a>
                .
              </span>
            }
            {...register('consentGiven')}
            error={errors.consentGiven?.message}
          />

          <Checkbox
            label={
              <span>
                I understand that submitting an application <strong>does not guarantee</strong> an interview or employment.
              </span>
            }
            {...register('understood')}
            error={errors.understood?.message}
          />

          <div className="pt-6 border-t border-nabat-neutral-200">
            <div className="p-4 bg-nabat-primary-50 rounded-nabat-md border border-nabat-primary-200">
              <p className="text-sm text-nabat-neutral-700">
                By submitting this application, you agree that the information provided is true and accurate. Nabat reserves the right to verify any information provided during the recruitment process.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Section */}
      <Card className="bg-nabat-gradient-subtle border-nabat-primary-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-nabat-neutral-900 mb-3">
              Ready to Submit?
            </h3>
            <p className="text-nabat-neutral-700 mb-6 max-w-2xl mx-auto">
              Please review your application carefully. Once submitted, you will receive a confirmation email with your application reference number.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                disabled={isSubmitting}
              >
                ← Back
              </Button>
              <Button
                type="submit"
                size="lg"
                className="min-w-[240px]"
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
