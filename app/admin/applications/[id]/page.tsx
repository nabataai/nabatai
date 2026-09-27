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
          responsibilities: 'Building partnerships with UAE government and enterprises',
        },
      ],
      hasGCCExperience: true,
      gccCountries: ['United Arab Emirates', 'Saudi Arabia', 'Qatar'],
    },
    motivation: {
      whyNabat: 'Passionate about climate technology and AI-driven solutions...',
      whyThisRole: 'Perfect alignment with my experience in BD and climate tech...',
    },
  },
  recruiterNotes: '',
  tags: [],
};

export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [application, setApplication] = useState(mockApplicationData);
  const [status, setStatus] = useState(application.status);
  const [notes, setNotes] = useState(application.recruiterNotes);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated') === 'true';
    if (!isAuth) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Save to Firebase
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Changes saved successfully');
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nabat-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-nabat-neutral-200 sticky top-0 z-50">
        <div className="container-nabat py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/">
                <Image
                  src="/nabat-logo.jpeg"
                  alt="Nabat AI"
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
              <div>
                <Link
                  href="/admin/dashboard"
                  className="text-sm text-nabat-primary-600 hover:text-nabat-primary-700 font-medium"
                >
                  ← Back to Dashboard
                </Link>
              </div>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container-nabat py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-nabat-neutral-900 mb-2">
                      {application.data.personalInformation.firstName}{' '}
                      {application.data.personalInformation.lastName}
                    </h1>
                    <p className="text-nabat-neutral-600">
                      {application.data.professionalInformation.currentJobTitle} at{' '}
                      {application.data.professionalInformation.currentCompany}
                    </p>
                  </div>
                  <span className={`badge ${
                    application.status === 'new' ? 'badge-info' :
                    application.status === 'in-review' ? 'badge-warning' :
                    application.status === 'shortlisted' ? 'badge-success' :
                    'badge-info'
                  }`}>
                    {APPLICATION_STATUS_LABELS[application.status]}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-nabat-neutral-600">Application Number</p>
                    <p className="font-mono font-medium text-nabat-primary-600">
                      {application.applicationNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-nabat-neutral-600">Submitted</p>
                    <p className="font-medium text-nabat-neutral-900">
                      {new Date(application.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-nabat-neutral-600">Full Name</p>
                  <p className="font-medium text-nabat-neutral-900">
                    {application.data.personalInformation.fullLegalName}
                  </p>
                </div>
                <div>
                  <p className="text-nabat-neutral-600">Email</p>
                  <p className="font-medium text-nabat-neutral-900">
                    {application.data.personalInformation.email}
                  </p>
                </div>
                <div>
                  <p className="text-nabat-neutral-600">Phone</p>
                  <p className="font-medium text-nabat-neutral-900">
                    {application.data.personalInformation.primaryPhone}
                  </p>
                </div>
                <div>
                  <p className="text-nabat-neutral-600">Nationality</p>
                  <p className="font-medium text-nabat-neutral-900">
                    {application.data.personalInformation.nationality}
                  </p>
                </div>
                <div>
                  <p className="text-nabat-neutral-600">Residence</p>
                  <p className="font-medium text-nabat-neutral-900">
                    {application.data.personalInformation.city},{' '}
                    {application.data.personalInformation.countryOfResidence}
                  </p>
                </div>
                {application.data.personalInformation.linkedinProfile && (
                  <div>
                    <p className="text-nabat-neutral-600">LinkedIn</p>
                    <a
                      href={application.data.personalInformation.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-primary text-sm"
                    >
                      View Profile →
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Professional Background */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Background</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-nabat-neutral-600">Years of Experience</p>
                    <p className="font-medium text-nabat-neutral-900">
                      {application.data.professionalInformation.yearsOfExperience}
                    </p>
                  </div>
                  <div>
                    <p className="text-nabat-neutral-600">BD Experience</p>
                    <p className="font-medium text-nabat-neutral-900">
                      {application.data.professionalInformation.yearsOfBDExperience}
                    </p>
                  </div>
                  <div>
                    <p className="text-nabat-neutral-600">Industry</p>
                    <p className="font-medium text-nabat-neutral-900">
                      {application.data.professionalInformation.currentIndustry}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-nabat-neutral-600 text-sm mb-2">Areas of Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {application.data.professionalInformation.areasOfExpertise.map((area) => (
                      <span key={area} className="badge badge-info">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leadership Experience */}
            {application.data.executiveExperience.hasLeadershipExperience && (
              <Card>
                <CardHeader>
                  <CardTitle>Leadership Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {application.data.executiveExperience.leadershipPositions.map((pos) => (
                    <div key={pos.id} className="border-b border-nabat-neutral-200 pb-4 last:border-0">
                      <h4 className="font-semibold text-nabat-neutral-900 mb-2">
                        {pos.positionTitle} at {pos.company}
                      </h4>
                      <p className="text-sm text-nabat-neutral-600 mb-2">
                        {pos.country} • {pos.startDate} • Team: {pos.teamSize}
                      </p>
                      <p className="text-sm text-nabat-neutral-700 mb-2">
                        <strong>Responsibilities:</strong> {pos.responsibilities}
                      </p>
                      <p className="text-sm text-nabat-neutral-700">
                        <strong>Achievements:</strong> {pos.achievements}
                      </p>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-nabat-neutral-200">
                    <div>
                      <p className="text-nabat-neutral-600 text-sm">Largest Revenue</p>
                      <p className="font-medium text-nabat-neutral-900">
                        {application.data.executiveExperience.largestRevenue}
                      </p>
                    </div>
                    <div>
                      <p className="text-nabat-neutral-600 text-sm">Largest Deal</p>
                      <p className="font-medium text-nabat-neutral-900">
                        {application.data.executiveExperience.largestDeal}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* GCC/UAE Experience */}
            {application.data.gccUaeExperience.hasUAEExperience && (
              <Card>
                <CardHeader>
                  <CardTitle>GCC/UAE Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {application.data.gccUaeExperience.uaeExperienceRecords.map((exp) => (
                    <div key={exp.id} className="border-b border-nabat-neutral-200 pb-4 last:border-0">
                      <h4 className="font-semibold text-nabat-neutral-900 mb-2">
                        {exp.position} at {exp.company}
                      </h4>
                      <p className="text-sm text-nabat-neutral-600 mb-2">
                        {exp.city} • {exp.startDate}
                      </p>
                      <p className="text-sm text-nabat-neutral-700">
                        {exp.responsibilities}
                      </p>
                    </div>
                  ))}

                  {application.data.gccUaeExperience.hasGCCExperience && (
                    <div className="pt-4 border-t border-nabat-neutral-200">
                      <p className="text-nabat-neutral-600 text-sm mb-2">GCC Countries</p>
                      <div className="flex flex-wrap gap-2">
                        {application.data.gccUaeExperience.gccCountries.map((country) => (
                          <span key={country} className="badge badge-success">
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                  options={Object.entries(APPLICATION_STATUS_LABELS).map(([value, label]) => ({
                    value,
                    label,
                  }))}
                />

                <Textarea
                  label="Recruiter Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes about this candidate..."
                  rows={6}
                />

                <Button
                  onClick={handleSave}
                  className="w-full"
                  isLoading={isSaving}
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-nabat-neutral-600">UAE Experience</span>
                  <span className={`badge ${
                    application.data.gccUaeExperience.hasUAEExperience
                      ? 'badge-success'
                      : 'badge-error'
                  }`}>
                    {application.data.gccUaeExperience.hasUAEExperience ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-nabat-neutral-600">GCC Experience</span>
                  <span className={`badge ${
                    application.data.gccUaeExperience.hasGCCExperience
                      ? 'badge-success'
                      : 'badge-error'
                  }`}>
                    {application.data.gccUaeExperience.hasGCCExperience ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-nabat-neutral-600">Leadership</span>
                  <span className={`badge ${
                    application.data.executiveExperience.hasLeadershipExperience
                      ? 'badge-success'
                      : 'badge-error'
                  }`}>
                    {application.data.executiveExperience.hasLeadershipExperience ? 'Yes' : 'No'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
