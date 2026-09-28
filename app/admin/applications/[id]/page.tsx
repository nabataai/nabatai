'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { APPLICATION_STATUS_LABELS, type ApplicationStatus } from '@/types/application';
import { cn } from '@/lib/utils';

export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [application, setApplication] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<ApplicationStatus>('new');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated') === 'true';
    if (!isAuth) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    fetchApplication();
  }, [id, router]);

  const fetchApplication = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/applications/${id}`);
      if (!res.ok) throw new Error('Not found');
      const json = await res.json();
      setApplication(json.application);
      setStatus(json.application.status || 'new');
      setNotes(json.application.recruiterNotes || '');
    } catch (err) {
      console.error('Failed to load application', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    router.push('/admin/login');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, recruiterNotes: notes }),
      });
      // Update local state
      setApplication((prev: any) => ({ ...prev, status, recruiterNotes: notes }));
      alert('Candidate dossier updated successfully');
    } catch (err) {
      alert('Failed to save updates');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nabat-neutral-50">
        <div className="spinner" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-nabat-neutral-50 gap-4">
        <p className="text-nabat-neutral-700 font-semibold">Application not found.</p>
        <Button onClick={() => router.push('/admin/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  const pi = application.data?.personalInformation || {};
  const prof = application.data?.professionalInformation || {};
  const exec = application.data?.executiveExperience || {};
  const gcc = application.data?.gccUaeExperience || {};
  const workAuth = application.data?.workAuthorization || {};
  const motivation = application.data?.motivation || {};
  const refs = application.data?.referencesAndSubmission?.references || [];
  const files = application.files || {};

  const fileLinks = [
    { label: 'CV / Resume', key: 'cvResumeUrl', nameKey: 'cvResumeName' },
    { label: 'Cover Letter', key: 'coverLetterUrl', nameKey: 'coverLetterName' },
    { label: 'Portfolio', key: 'portfolioUrl', nameKey: 'portfolioName' },
    { label: 'National ID — Front', key: 'nationalIdFrontUrl', nameKey: 'nationalIdFrontName' },
    { label: 'National ID — Back', key: 'nationalIdBackUrl', nameKey: 'nationalIdBackName' },
    { label: 'Passport Page', key: 'passportPageUrl', nameKey: 'passportPageName' },
  ].filter(f => files[f.key]);

  return (
    <div className="min-h-screen bg-nabat-neutral-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-nabat-neutral-200/80 sticky top-0 z-50 shadow-xs">
        <div className="container-nabat py-3.5 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/">
                <Image
                  src="/nabat.jpeg"
                  alt="Nabat AI"
                  width={160}
                  height={36}
                  className="h-8 sm:h-9 w-auto object-contain"
                  priority
                />
              </Link>
              <div className="hidden sm:block border-l border-nabat-neutral-200 pl-6">
                <Link
                  href="/admin/dashboard"
                  className="text-xs sm:text-sm text-nabat-primary-600 hover:text-nabat-forest-700 font-bold inline-flex items-center gap-1"
                >
                  ← Back to Recruitment Dashboard
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-xs font-semibold text-red-600 hover:bg-red-50 hover:border-red-200"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container-nabat py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Candidate Dossier */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Profile Card */}
            <Card className="border-nabat-neutral-200/90 shadow-nabat-card">
              <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-nabat-neutral-100">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-nabat-neutral-900 tracking-tight">
                      {pi.firstName} {pi.lastName}
                    </h1>
                    <p className="text-sm sm:text-base font-medium text-nabat-neutral-600 mt-1">
                      {prof.currentJobTitle || '—'} at{' '}
                      <span className="text-nabat-neutral-900">{prof.currentCompany || '—'}</span>
                    </p>
                  </div>
                  <span
                    className={cn(
                      'badge text-xs font-semibold self-start',
                      status === 'new' && 'badge-info',
                      status === 'in-review' && 'badge-warning',
                      status === 'shortlisted' && 'badge-success',
                      status === 'interview' && 'bg-purple-100 text-purple-800 border-purple-200',
                      status === 'hired' && 'bg-emerald-100 text-emerald-800 border-emerald-200',
                      status === 'rejected' && 'badge-error'
                    )}
                  >
                    {APPLICATION_STATUS_LABELS[status]}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-5 text-xs sm:text-sm">
                  <div>
                    <p className="text-nabat-neutral-500 font-medium">Application Number</p>
                    <p className="font-mono font-bold text-nabat-primary-700 text-sm mt-0.5">
                      {application.applicationNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-nabat-neutral-500 font-medium">Submission Date</p>
                    <p className="font-semibold text-nabat-neutral-900 text-sm mt-0.5">
                      {new Date(application.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-nabat-neutral-500 font-medium">Applied Role</p>
                    <p className="font-semibold text-nabat-neutral-900 text-sm mt-0.5 truncate">
                      {application.position}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader className="mb-4">
                <CardTitle className="text-lg">Personal Details</CardTitle>
              </CardHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                {[
                  { label: 'Full Legal Name', value: pi.fullLegalName },
                  { label: 'Primary Email', value: pi.email },
                  { label: 'Phone', value: pi.primaryPhone },
                  { label: 'WhatsApp', value: pi.whatsappNumber },
                  { label: 'Nationality', value: pi.nationality },
                  { label: 'Date of Birth', value: pi.dateOfBirth },
                  { label: 'Country of Residence', value: pi.countryOfResidence },
                  { label: 'City', value: pi.city },
                  { label: 'Current Address', value: pi.currentAddress },
                ].filter(item => item.value).map(item => (
                  <div key={item.label} className="p-3 bg-nabat-neutral-50 rounded-xl">
                    <p className="text-nabat-neutral-500 font-medium">{item.label}</p>
                    <p className="font-bold text-nabat-neutral-900 mt-0.5">{item.value}</p>
                  </div>
                ))}
                {pi.linkedinProfile && (
                  <div className="p-3 bg-nabat-neutral-50 rounded-xl">
                    <p className="text-nabat-neutral-500 font-medium">LinkedIn</p>
                    <a
                      href={pi.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-nabat-primary-700 hover:underline mt-0.5 inline-block"
                    >
                      View Profile →
                    </a>
                  </div>
                )}
              </div>
            </Card>

            {/* Professional Background */}
            <Card>
              <CardHeader className="mb-4">
                <CardTitle className="text-lg">Professional Background</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
                  {[
                    { label: 'Total Experience', value: prof.yearsOfExperience },
                    { label: 'BD Experience', value: prof.yearsOfBDExperience },
                    { label: 'Leadership Experience', value: prof.yearsOfLeadership },
                    { label: 'Current Industry', value: prof.currentIndustry },
                    { label: 'Employment Status', value: prof.currentEmploymentStatus },
                    { label: 'Notice Period', value: prof.noticePeriod },
                    { label: 'Current Salary', value: prof.currentSalary },
                    { label: 'Expected Salary', value: prof.expectedSalary },
                    { label: 'Earliest Start Date', value: prof.earliestStartDate },
                  ].filter(item => item.value).map(item => (
                    <div key={item.label} className="p-3 bg-nabat-neutral-50 rounded-xl">
                      <p className="text-nabat-neutral-500 font-medium">{item.label}</p>
                      <p className="font-bold text-nabat-neutral-900 mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
                {prof.areasOfExpertise?.length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-nabat-neutral-500 mb-2">Areas of Core Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {prof.areasOfExpertise.map((area: string) => (
                        <span key={area} className="badge badge-info">{area}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Leadership Experience */}
            {exec.hasLeadershipExperience && exec.leadershipPositions?.length > 0 && (
              <Card>
                <CardHeader className="mb-4">
                  <CardTitle className="text-lg">Executive Leadership Track Record</CardTitle>
                </CardHeader>
                <div className="space-y-5">
                  {exec.leadershipPositions.map((pos: any) => (
                    <div key={pos.id} className="p-4 bg-nabat-neutral-50 rounded-xl border border-nabat-neutral-200/60">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-nabat-neutral-900 text-sm sm:text-base">
                          {pos.positionTitle} — {pos.company}
                        </h4>
                        <span className="text-xs text-nabat-neutral-500 font-medium">
                          {pos.country} • {pos.startDate}{pos.endDate ? ` → ${pos.endDate}` : ' (Current)'}
                        </span>
                      </div>
                      {pos.teamSize && <p className="text-xs text-nabat-forest-700 font-semibold mb-2">Team Size: {pos.teamSize}</p>}
                      <p className="text-xs sm:text-sm text-nabat-neutral-700 mb-2 leading-relaxed">
                        <strong>Responsibilities:</strong> {pos.responsibilities}
                      </p>
                      <p className="text-xs sm:text-sm text-nabat-neutral-700 leading-relaxed">
                        <strong>Key Achievements:</strong> {pos.achievements}
                      </p>
                    </div>
                  ))}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {exec.largestRevenue && (
                      <div className="p-4 bg-nabat-primary-50/50 rounded-xl border border-nabat-primary-200/70">
                        <p className="text-xs font-semibold text-nabat-forest-700 uppercase tracking-wider">Largest Revenue Under Management</p>
                        <p className="font-extrabold text-nabat-neutral-900 text-base sm:text-lg mt-1">{exec.largestRevenue}</p>
                      </div>
                    )}
                    {exec.largestDeal && (
                      <div className="p-4 bg-nabat-primary-50/50 rounded-xl border border-nabat-primary-200/70">
                        <p className="text-xs font-semibold text-nabat-forest-700 uppercase tracking-wider">Largest Closed Enterprise Deal</p>
                        <p className="font-extrabold text-nabat-neutral-900 text-base sm:text-lg mt-1">{exec.largestDeal}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* GCC / UAE Experience */}
            {(gcc.hasUAEExperience || gcc.hasGCCExperience) && (
              <Card>
                <CardHeader className="mb-4">
                  <CardTitle className="text-lg">GCC & Regional Market Experience</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  {gcc.uaeExperienceRecords?.map((exp: any) => (
                    <div key={exp.id} className="p-4 bg-nabat-neutral-50 rounded-xl border border-nabat-neutral-200/60">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-nabat-neutral-900 text-sm sm:text-base">
                          {exp.position} at {exp.company}
                        </h4>
                        <span className="text-xs text-nabat-neutral-500 font-medium">
                          {exp.city} • {exp.startDate}{exp.endDate ? ` → ${exp.endDate}` : ''}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-nabat-neutral-700 leading-relaxed mt-2">{exp.responsibilities}</p>
                    </div>
                  ))}
                  {gcc.hasGCCExperience && gcc.gccCountries?.length > 0 && (
                    <div className="pt-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-nabat-neutral-500 mb-2">GCC Operational Territories</p>
                      <div className="flex flex-wrap gap-2">
                        {gcc.gccCountries.map((country: string) => (
                          <span key={country} className="badge badge-success">{country}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Work Authorization */}
            {Object.keys(workAuth).length > 0 && (
              <Card>
                <CardHeader className="mb-4">
                  <CardTitle className="text-lg">Work Authorization</CardTitle>
                </CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {[
                    { label: 'Has UAE Visa', value: workAuth.hasUAEVisa ? 'Yes' : 'No' },
                    { label: 'Visa Type', value: workAuth.visaType },
                    { label: 'Visa Expiry', value: workAuth.visaExpiry },
                    { label: 'Authorized to Work', value: workAuth.authorizedToWork },
                    { label: 'Willing to Relocate', value: workAuth.willingToRelocate },
                    { label: 'Valid Passport', value: workAuth.hasValidPassport ? 'Yes' : 'No' },
                  ].filter(item => item.value).map(item => (
                    <div key={item.label} className="p-3 bg-nabat-neutral-50 rounded-xl">
                      <p className="text-nabat-neutral-500 font-medium">{item.label}</p>
                      <p className="font-bold text-nabat-neutral-900 mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Motivation Answers */}
            {Object.keys(motivation).length > 0 && (
              <Card>
                <CardHeader className="mb-4">
                  <CardTitle className="text-lg">Motivation & Assessment Answers</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  {[
                    { q: 'Why Nabat?', a: motivation.whyNabat },
                    { q: 'Why this role?', a: motivation.whyThisRole },
                    { q: 'Partnership experience', a: motivation.partnershipExperience },
                    { q: 'Significant opportunity', a: motivation.significantOpportunity },
                    { q: 'Complex deal experience', a: motivation.complexDeal },
                    { q: 'Relevant industries', a: motivation.relevantIndustries },
                    { q: 'Pipeline approach', a: motivation.pipelineApproach },
                    { q: 'Stakeholder experience', a: motivation.stakeholderExperience },
                    { q: 'First 90 days plan', a: motivation.first90Days },
                    { q: 'Unique qualifications', a: motivation.uniqueQualifications },
                  ].filter(item => item.a).map(item => (
                    <div key={item.q} className="p-4 bg-nabat-neutral-50 rounded-xl border border-nabat-neutral-200/40">
                      <p className="text-xs font-bold uppercase tracking-wider text-nabat-primary-700 mb-2">{item.q}</p>
                      <p className="text-sm text-nabat-neutral-800 leading-relaxed whitespace-pre-wrap">{item.a}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* References */}
            {refs.length > 0 && (
              <Card>
                <CardHeader className="mb-4">
                  <CardTitle className="text-lg">Professional References</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  {refs.map((ref: any, i: number) => (
                    <div key={ref.id || i} className="p-4 bg-nabat-neutral-50 rounded-xl border border-nabat-neutral-200/60">
                      <h4 className="font-bold text-nabat-neutral-900">{ref.fullName}</h4>
                      <p className="text-sm text-nabat-neutral-600">{ref.jobTitle} at {ref.company}</p>
                      <p className="text-xs text-nabat-neutral-500 mt-1">Relationship: {ref.relationship}</p>
                      <div className="flex gap-4 mt-2 text-xs">
                        <a href={`mailto:${ref.email}`} className="text-nabat-primary-700 font-semibold hover:underline">{ref.email}</a>
                        <span className="text-nabat-neutral-600">{ref.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Uploaded Files */}
            {fileLinks.length > 0 && (
              <Card>
                <CardHeader className="mb-4">
                  <CardTitle className="text-lg">Uploaded Documents</CardTitle>
                </CardHeader>
                <div className="space-y-3">
                  {fileLinks.map(f => {
                    const url = files[f.key];
                    const name = files[f.nameKey] || f.label;
                    const isImage = url?.match(/\.(jpg|jpeg|png)$/i);
                    const apiUrl = `/api${url}`;
                    return (
                      <div key={f.key} className="p-4 bg-nabat-neutral-50 rounded-xl border border-nabat-neutral-200/60">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-nabat-primary-700">{f.label}</p>
                          <a
                            href={apiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-nabat-primary-600 hover:underline"
                          >
                            Open / Download →
                          </a>
                        </div>
                        <p className="text-xs text-nabat-neutral-500 truncate mb-2">{name}</p>
                        {isImage && (
                          <img
                            src={apiUrl}
                            alt={f.label}
                            className="max-h-48 rounded-lg border border-nabat-neutral-200 object-contain"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recruiter Actions */}
            <Card className="border-nabat-primary-200/90 shadow-nabat-sm">
              <CardHeader className="mb-4">
                <CardTitle className="text-lg">Recruitment Status</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <Select
                  label="Update Pipeline Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                  options={Object.entries(APPLICATION_STATUS_LABELS).map(([value, label]) => ({
                    value,
                    label,
                  }))}
                />
                <Textarea
                  label="Internal Evaluation Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record interview notes, compensation discussions, or candidate remarks..."
                  rows={5}
                />
                <Button
                  onClick={handleSave}
                  className="w-full font-bold shadow-nabat-sm"
                  isLoading={isSaving}
                >
                  Save Dossier Updates
                </Button>
              </div>
            </Card>

            {/* Qualification Checklist */}
            <Card>
              <CardHeader className="mb-4">
                <CardTitle className="text-lg">Candidate Checklist</CardTitle>
              </CardHeader>
              <div className="space-y-3 text-xs sm:text-sm">
                {[
                  { label: 'UAE Experience', value: gcc.hasUAEExperience },
                  { label: 'GCC Regional Network', value: gcc.hasGCCExperience },
                  { label: 'Executive Leadership', value: exec.hasLeadershipExperience },
                  { label: 'Valid Passport', value: workAuth.hasValidPassport },
                  { label: 'CV Uploaded', value: !!files.cvResumeUrl },
                  { label: 'National ID Uploaded', value: !!files.nationalIdFrontUrl },
                  { label: 'Passport Copy Uploaded', value: !!files.passportPageUrl },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-2.5 rounded-lg bg-nabat-neutral-50">
                    <span className="font-medium text-nabat-neutral-700">{item.label}</span>
                    <span className={cn('badge text-xs', item.value ? 'badge-success' : 'badge-error')}>
                      {item.value ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Contact */}
            <Card>
              <CardHeader className="mb-4">
                <CardTitle className="text-lg">Quick Contact</CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {pi.email && (
                  <a
                    href={`mailto:${pi.email}`}
                    className="flex items-center gap-3 p-3 bg-nabat-neutral-50 rounded-xl hover:bg-nabat-primary-50 transition-colors"
                  >
                    <span className="text-lg">✉️</span>
                    <div>
                      <p className="text-xs text-nabat-neutral-500">Email</p>
                      <p className="text-sm font-bold text-nabat-primary-700 truncate">{pi.email}</p>
                    </div>
                  </a>
                )}
                {pi.primaryPhone && (
                  <a
                    href={`tel:${pi.primaryPhone}`}
                    className="flex items-center gap-3 p-3 bg-nabat-neutral-50 rounded-xl hover:bg-nabat-primary-50 transition-colors"
                  >
                    <span className="text-lg">📞</span>
                    <div>
                      <p className="text-xs text-nabat-neutral-500">Phone</p>
                      <p className="text-sm font-bold text-nabat-neutral-900">{pi.primaryPhone}</p>
                    </div>
                  </a>
                )}
                {pi.whatsappNumber && (
                  <a
                    href={`https://wa.me/${pi.whatsappNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-nabat-neutral-50 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    <span className="text-lg">💬</span>
                    <div>
                      <p className="text-xs text-nabat-neutral-500">WhatsApp</p>
                      <p className="text-sm font-bold text-nabat-neutral-900">{pi.whatsappNumber}</p>
                    </div>
                  </a>
                )}
                {pi.linkedinProfile && (
                  <a
                    href={pi.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-nabat-neutral-50 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    <span className="text-lg">🔗</span>
                    <div>
                      <p className="text-xs text-nabat-neutral-500">LinkedIn</p>
                      <p className="text-sm font-bold text-blue-700">View Profile →</p>
                    </div>
                  </a>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
