'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { APPLICATION_STATUS_LABELS, type ApplicationStatus } from '@/types/application';
import { cn } from '@/lib/utils';

// Mock application data - in production from Firebase
const mockApplicationData = {
  id: '1',
  applicationNumber: 'NAB-ABC123',
  position: 'Director of Business Development',
  status: 'new' as ApplicationStatus,
  submittedAt: '2026-09-25T10:30:00',
  updatedAt: '2026-09-25T10:30:00',
  data: {
    personalInformation: {
      firstName: 'John',
      lastName: 'Doe',
      fullLegalName: 'John Michael Doe',
      email: 'john.doe@example.com',
      primaryPhone: '+971 50 123 4567',
      nationality: 'United States',
      countryOfResidence: 'United Arab Emirates',
      city: 'Dubai',
      linkedinProfile: 'https://linkedin.com/in/johndoe',
    },
    professionalInformation: {
      currentJobTitle: 'VP of Business Development',
      currentCompany: 'Tech Corp',
      yearsOfExperience: '15-20 years',
      yearsOfBDExperience: '10-15 years',
      currentIndustry: 'Technology',
      areasOfExpertise: ['Business Development', 'Strategic Partnerships', 'Enterprise Sales', 'Climate Tech'],
    },
    executiveExperience: {
      hasLeadershipExperience: true,
      leadershipPositions: [
        {
          id: '1',
          positionTitle: 'VP of Business Development',
          company: 'Tech Corp',
          country: 'United Arab Emirates',
          startDate: '2020-01',
          teamSize: '15 direct reports',
          responsibilities: 'Leading BD strategy across MENA region',
          achievements: 'Grew revenue by 300% in 3 years',
        },
      ],
      largestRevenue: '$50M annual recurring revenue',
      largestDeal: '$10M multi-year enterprise contract',
    },
    gccUaeExperience: {
      hasUAEExperience: true,
      uaeExperienceRecords: [
        {
          id: '1',
          city: 'Dubai',
          company: 'Tech Corp',
          position: 'VP of Business Development',
          startDate: '2020-01',
          responsibilities: 'Managing MENA operations and government partnerships',
        },
      ],
      hasGCCExperience: true,
      gccCountries: ['United Arab Emirates', 'Saudi Arabia'],
    },
  },
};

export default function ApplicationDetailPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [application] = useState(mockApplicationData);
  const [status, setStatus] = useState<ApplicationStatus>(mockApplicationData.status);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated') === 'true';
    if (!isAuth) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    router.push('/admin/login');
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    alert('Candidate dossier updated successfully');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nabat-neutral-50">
        <div className="spinner" />
      </div>
    );
  }

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
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-nabat-neutral-100">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-nabat-neutral-900 tracking-tight">
                    {application.data.personalInformation.firstName}{' '}
                    {application.data.personalInformation.lastName}
                  </h1>
                  <p className="text-sm sm:text-base font-medium text-nabat-neutral-600 mt-1">
                    {application.data.professionalInformation.currentJobTitle} at{' '}
                    <span className="text-nabat-neutral-900">{application.data.professionalInformation.currentCompany}</span>
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
                  <p className="text-nabat-neutral-500 font-medium">Submission Timestamp</p>
                  <p className="font-semibold text-nabat-neutral-900 text-sm mt-0.5">
                    {new Date(application.submittedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-nabat-neutral-500 font-medium">Applied Role</p>
                  <p className="font-semibold text-nabat-neutral-900 text-sm mt-0.5 truncate">
                    {application.position}
                  </p>
                </div>
              </div>
            </Card>

            {/* Personal Information Card */}
            <Card>
              <CardHeader className="mb-4">
                <CardTitle className="text-lg">Personal Details</CardTitle>
              </CardHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3 bg-nabat-neutral-50 rounded-xl">
                  <p className="text-nabat-neutral-500 font-medium">Full Legal Name</p>
                  <p className="font-bold text-nabat-neutral-900 mt-0.5">
                    {application.data.personalInformation.fullLegalName}
                  </p>
                </div>
                <div className="p-3 bg-nabat-neutral-50 rounded-xl">
                  <p className="text-nabat-neutral-500 font-medium">Primary Email</p>
                  <p className="font-bold text-nabat-neutral-900 mt-0.5">
                    {application.data.personalInformation.email}
                  </p>
                </div>
                <div className="p-3 bg-nabat-neutral-50 rounded-xl">
                  <p className="text-nabat-neutral-500 font-medium">Phone</p>
                  <p className="font-bold text-nabat-neutral-900 mt-0.5">
                    {application.data.personalInformation.primaryPhone}
                  </p>
                </div>
                <div className="p-3 bg-nabat-neutral-50 rounded-xl">
                  <p className="text-nabat-neutral-500 font-medium">Nationality</p>
                  <p className="font-bold text-nabat-neutral-900 mt-0.5">
                    {application.data.personalInformation.nationality}
                  </p>
                </div>
                <div className="p-3 bg-nabat-neutral-50 rounded-xl">
                  <p className="text-nabat-neutral-500 font-medium">Current Residence</p>
                  <p className="font-bold text-nabat-neutral-900 mt-0.5">
                    {application.data.personalInformation.city},{' '}
                    {application.data.personalInformation.countryOfResidence}
                  </p>
                </div>
                {application.data.personalInformation.linkedinProfile && (
                  <div className="p-3 bg-nabat-neutral-50 rounded-xl">
                    <p className="text-nabat-neutral-500 font-medium">LinkedIn Profile</p>
                    <a
                      href={application.data.personalInformation.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-nabat-primary-700 hover:underline mt-0.5 inline-block"
                    >
                      View LinkedIn Profile →
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
                  <div className="p-3 bg-nabat-neutral-50 rounded-xl">
                    <p className="text-nabat-neutral-500 font-medium">Total Career Experience</p>
                    <p className="font-bold text-nabat-neutral-900 mt-0.5">
                      {application.data.professionalInformation.yearsOfExperience}
                    </p>
                  </div>
                  <div className="p-3 bg-nabat-neutral-50 rounded-xl">
                    <p className="text-nabat-neutral-500 font-medium">BD / Commercial Experience</p>
                    <p className="font-bold text-nabat-neutral-900 mt-0.5">
                      {application.data.professionalInformation.yearsOfBDExperience}
                    </p>
                  </div>
                  <div className="p-3 bg-nabat-neutral-50 rounded-xl">
                    <p className="text-nabat-neutral-500 font-medium">Industry</p>
                    <p className="font-bold text-nabat-neutral-900 mt-0.5">
                      {application.data.professionalInformation.currentIndustry}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-nabat-neutral-500 mb-2">Areas of Core Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {application.data.professionalInformation.areasOfExpertise.map((area) => (
                      <span key={area} className="badge badge-info">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Leadership Experience */}
            {application.data.executiveExperience.hasLeadershipExperience && (
              <Card>
                <CardHeader className="mb-4">
                  <CardTitle className="text-lg">Executive Leadership Track Record</CardTitle>
                </CardHeader>
                <div className="space-y-5">
                  {application.data.executiveExperience.leadershipPositions.map((pos) => (
                    <div key={pos.id} className="p-4 bg-nabat-neutral-50 rounded-xl border border-nabat-neutral-200/60">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-nabat-neutral-900 text-sm sm:text-base">
                          {pos.positionTitle} — {pos.company}
                        </h4>
                        <span className="text-xs text-nabat-neutral-500 font-medium">
                          {pos.country} • Since {pos.startDate}
                        </span>
                      </div>
                      <p className="text-xs text-nabat-forest-700 font-semibold mb-2">
                        Team Scale: {pos.teamSize}
                      </p>
                      <p className="text-xs sm:text-sm text-nabat-neutral-700 mb-2 leading-relaxed">
                        <strong>Responsibilities:</strong> {pos.responsibilities}
                      </p>
                      <p className="text-xs sm:text-sm text-nabat-neutral-700 leading-relaxed">
                        <strong>Key Achievements:</strong> {pos.achievements}
                      </p>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-nabat-primary-50/50 rounded-xl border border-nabat-primary-200/70">
                      <p className="text-xs font-semibold text-nabat-forest-700 uppercase tracking-wider">Largest Revenue Under Management</p>
                      <p className="font-extrabold text-nabat-neutral-900 text-base sm:text-lg mt-1">
                        {application.data.executiveExperience.largestRevenue}
                      </p>
                    </div>
                    <div className="p-4 bg-nabat-primary-50/50 rounded-xl border border-nabat-primary-200/70">
                      <p className="text-xs font-semibold text-nabat-forest-700 uppercase tracking-wider">Largest Closed Enterprise Deal</p>
                      <p className="font-extrabold text-nabat-neutral-900 text-base sm:text-lg mt-1">
                        {application.data.executiveExperience.largestDeal}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* GCC/UAE Experience */}
            {application.data.gccUaeExperience.hasUAEExperience && (
              <Card>
                <CardHeader className="mb-4">
                  <CardTitle className="text-lg">GCC & Regional Market Experience</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  {application.data.gccUaeExperience.uaeExperienceRecords.map((exp) => (
                    <div key={exp.id} className="p-4 bg-nabat-neutral-50 rounded-xl border border-nabat-neutral-200/60">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-nabat-neutral-900 text-sm sm:text-base">
                          {exp.position} at {exp.company}
                        </h4>
                        <span className="text-xs text-nabat-neutral-500 font-medium">
                          {exp.city} • Since {exp.startDate}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-nabat-neutral-700 leading-relaxed mt-2">
                        {exp.responsibilities}
                      </p>
                    </div>
                  ))}

                  {application.data.gccUaeExperience.hasGCCExperience && (
                    <div className="pt-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-nabat-neutral-500 mb-2">GCC Operational Territories</p>
                      <div className="flex flex-wrap gap-2">
                        {application.data.gccUaeExperience.gccCountries.map((country) => (
                          <span key={country} className="badge badge-success">
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar Actions & Candidate Summary */}
          <div className="space-y-6">
            {/* Recruiter Actions Card */}
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

            {/* Quick Qualification Checklist */}
            <Card>
              <CardHeader className="mb-4">
                <CardTitle className="text-lg">Candidate Checklist</CardTitle>
              </CardHeader>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-nabat-neutral-50">
                  <span className="font-medium text-nabat-neutral-700">UAE Experience</span>
                  <span className={cn('badge text-xs', application.data.gccUaeExperience.hasUAEExperience ? 'badge-success' : 'badge-error')}>
                    {application.data.gccUaeExperience.hasUAEExperience ? 'Verified' : 'None'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-nabat-neutral-50">
                  <span className="font-medium text-nabat-neutral-700">GCC Regional Network</span>
                  <span className={cn('badge text-xs', application.data.gccUaeExperience.hasGCCExperience ? 'badge-success' : 'badge-error')}>
                    {application.data.gccUaeExperience.hasGCCExperience ? 'Verified' : 'None'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-nabat-neutral-50">
                  <span className="font-medium text-nabat-neutral-700">Executive Leadership</span>
                  <span className={cn('badge text-xs', application.data.executiveExperience.hasLeadershipExperience ? 'badge-success' : 'badge-error')}>
                    {application.data.executiveExperience.hasLeadershipExperience ? 'Verified' : 'None'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
