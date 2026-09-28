'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { FileUpload } from '@/components/ui/FileUpload';
import { useApplication } from '@/contexts/ApplicationContext';

interface Step6Props {
  onNext: () => void;
  onBack: () => void;
}

export const Step6Documents: React.FC<Step6Props> = ({ onNext, onBack }) => {
  const { applicationData, updateApplicationData } = useApplication();

  const [cvResume, setCvResume] = useState<File | null>(
    applicationData.documents.cvResume || null
  );
  const [coverLetter, setCoverLetter] = useState<File | null>(
    applicationData.documents.coverLetter || null
  );
  const [portfolio, setPortfolio] = useState<File | null>(
    applicationData.documents.portfolio || null
  );
  const [nationalIdFront, setNationalIdFront] = useState<File | null>(
    applicationData.documents.nationalIdFront || null
  );
  const [nationalIdBack, setNationalIdBack] = useState<File | null>(
    applicationData.documents.nationalIdBack || null
  );
  const [passportPage, setPassportPage] = useState<File | null>(
    applicationData.documents.passportPage || null
  );

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvResume) {
      setError('CV/Resume is required');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!nationalIdFront) {
      setError('National ID / Emirates ID (Front side) is required');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!nationalIdBack) {
      setError('National ID / Emirates ID (Back side) is required');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!passportPage) {
      setError('Passport Information Page is required');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setError(null);

    updateApplicationData('documents', {
      cvResume,
      coverLetter,
      portfolio,
      nationalIdFront,
      nationalIdBack,
      passportPage,
    });

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="alert alert-error">
          <svg
            className="w-5 h-5 inline-block mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Application Documents</CardTitle>
          <CardDescription>
            Upload your application materials. Only upload identity documents if requested for recruitment or onboarding.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Required Documents */}
          <div>
            <h3 className="section-subheading">Required Documents</h3>

            <div className="space-y-6">
              <FileUpload
                label="CV / Resume"
                required
                accept={{
                  'application/pdf': ['.pdf'],
                  'application/msword': ['.doc'],
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                }}
                maxSize={10}
                onFileSelect={setCvResume}
                currentFile={cvResume}
                hint="PDF, DOC, or DOCX format, maximum 10MB"
              />
            </div>
          </div>

          {/* Optional Documents */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Optional Documents</h3>

            <div className="space-y-6">
              <FileUpload
                label="Cover Letter"
                accept={{
                  'application/pdf': ['.pdf'],
                  'application/msword': ['.doc'],
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                }}
                maxSize={10}
                onFileSelect={setCoverLetter}
                currentFile={coverLetter}
                hint="Optional - PDF, DOC, or DOCX format, maximum 10MB"
              />

              <FileUpload
                label="Portfolio / Supporting Documents"
                accept={{
                  'application/pdf': ['.pdf'],
                  'application/msword': ['.doc'],
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                }}
                maxSize={15}
                onFileSelect={setPortfolio}
                currentFile={portfolio}
                hint="Optional - Case studies, presentations, or other relevant materials (maximum 15MB)"
              />
            </div>
          </div>

          {/* Identity Documents — REQUIRED */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <h3 className="section-subheading">Identity Documents <span className="text-red-500">*</span></h3>

            <div className="mb-6 p-4 bg-blue-50 rounded-nabat-md border border-blue-200">
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
                    Required for all applicants
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Identity documents are required as part of our recruitment process. All sensitive documents are encrypted and handled according to applicable privacy and data-protection requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-nabat-neutral-700 mb-4">
                  National ID / Emirates ID <span className="text-red-500">*</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUpload
                    label="Front Side"
                    required
                    accept={{
                      'image/jpeg': ['.jpg', '.jpeg'],
                      'image/png': ['.png'],
                      'application/pdf': ['.pdf'],
                    }}
                    maxSize={5}
                    onFileSelect={setNationalIdFront}
                    currentFile={nationalIdFront}
                    hint="Required — JPG, PNG, or PDF (max 5MB)"
                  />

                  <FileUpload
                    label="Back Side"
                    required
                    accept={{
                      'image/jpeg': ['.jpg', '.jpeg'],
                      'image/png': ['.png'],
                      'application/pdf': ['.pdf'],
                    }}
                    maxSize={5}
                    onFileSelect={setNationalIdBack}
                    currentFile={nationalIdBack}
                    hint="Required — JPG, PNG, or PDF (max 5MB)"
                  />
                </div>
              </div>

              <FileUpload
                label="Passport Information Page"
                required
                accept={{
                  'image/jpeg': ['.jpg', '.jpeg'],
                  'image/png': ['.png'],
                  'application/pdf': ['.pdf'],
                }}
                maxSize={5}
                onFileSelect={setPassportPage}
                currentFile={passportPage}
                hint="Required — Page with photo and personal details (JPG, PNG, or PDF, max 5MB)"
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="pt-6 border-t border-nabat-neutral-200">
            <div className="p-4 bg-nabat-forest-50 rounded-nabat-md border border-nabat-forest-200">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-nabat-forest-700 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="ml-3">
                  <p className="text-sm font-medium text-nabat-forest-900">
                    Your documents are secure
                  </p>
                  <p className="text-sm text-nabat-forest-700 mt-1">
                    All uploaded files are encrypted and stored securely. Access is restricted to authorized recruitment personnel only, with full audit logging.
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
