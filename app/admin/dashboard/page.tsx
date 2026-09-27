'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { APPLICATION_STATUS_LABELS, type ApplicationStatus } from '@/types/application';

// Mock data - in production, this would come from Firebase
const mockApplications = [
  {
    id: '1',
    applicationNumber: 'NAB-ABC123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+971 50 123 4567',
    currentPosition: 'VP of Business Development',
    currentCompany: 'Tech Corp',
    yearsOfExperience: '15-20 years',
    hasUAEExperience: true,
    hasGCCExperience: true,
    status: 'new' as ApplicationStatus,
    submittedAt: '2026-09-25T10:30:00',
  },
  {
    id: '2',
    applicationNumber: 'NAB-XYZ789',
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    phone: '+971 55 987 6543',
    currentPosition: 'Director of Partnerships',
    currentCompany: 'Climate Solutions Inc',
    yearsOfExperience: '10-15 years',
    hasUAEExperience: false,
    hasGCCExperience: true,
    status: 'in-review' as ApplicationStatus,
    submittedAt: '2026-09-24T14:15:00',
  },
  {
    id: '3',
    applicationNumber: 'NAB-DEF456',
    name: 'Ahmed Al-Mansoori',
    email: 'ahmed.m@example.com',
    phone: '+971 50 555 1234',
    currentPosition: 'Head of Business Development',
    currentCompany: 'GCC Energy Solutions',
    yearsOfExperience: '10-15 years',
    hasUAEExperience: true,
    hasGCCExperience: true,
    status: 'shortlisted' as ApplicationStatus,
    submittedAt: '2026-09-23T09:45:00',
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [applications, setApplications] = useState(mockApplications);
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check authentication
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

  const getStatusCounts = () => {
    const counts: Record<string, number> = {
      total: applications.length,
      new: 0,
      'in-review': 0,
      shortlisted: 0,
      interview: 0,
      rejected: 0,
      hired: 0,
    };

    applications.forEach((app) => {
      counts[app.status] = (counts[app.status] || 0) + 1;
    });

    return counts;
  };

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const counts = getStatusCounts();

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
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-nabat-neutral-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-nabat-neutral-600">
                  Recruitment Management
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container-nabat py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-nabat-gradient text-white">
            <CardContent className="pt-6">
              <p className="text-sm opacity-90 mb-1">Total</p>
              <p className="text-3xl font-bold">{counts.total}</p>
            </CardContent>
          </Card>

          <Card hover className="cursor-pointer" onClick={() => setFilterStatus('new')}>
            <CardContent className="pt-6">
              <p className="text-sm text-nabat-neutral-600 mb-1">New</p>
              <p className="text-3xl font-bold text-nabat-primary-600">{counts.new}</p>
            </CardContent>
          </Card>

          <Card hover className="cursor-pointer" onClick={() => setFilterStatus('in-review')}>
            <CardContent className="pt-6">
              <p className="text-sm text-nabat-neutral-600 mb-1">In Review</p>
              <p className="text-3xl font-bold text-blue-600">{counts['in-review']}</p>
            </CardContent>
          </Card>

          <Card hover className="cursor-pointer" onClick={() => setFilterStatus('shortlisted')}>
            <CardContent className="pt-6">
              <p className="text-sm text-nabat-neutral-600 mb-1">Shortlisted</p>
              <p className="text-3xl font-bold text-nabat-accent-600">{counts.shortlisted}</p>
            </CardContent>
          </Card>

          <Card hover className="cursor-pointer" onClick={() => setFilterStatus('interview')}>
            <CardContent className="pt-6">
              <p className="text-sm text-nabat-neutral-600 mb-1">Interview</p>
              <p className="text-3xl font-bold text-purple-600">{counts.interview}</p>
            </CardContent>
          </Card>

          <Card hover className="cursor-pointer" onClick={() => setFilterStatus('hired')}>
            <CardContent className="pt-6">
              <p className="text-sm text-nabat-neutral-600 mb-1">Hired</p>
              <p className="text-3xl font-bold text-green-600">{counts.hired}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="search"
                  placeholder="Search by name, email, or application number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-nabat-md text-sm font-medium transition-all ${
                    filterStatus === 'all'
                      ? 'bg-nabat-primary-500 text-white'
                      : 'bg-nabat-neutral-200 text-nabat-neutral-700 hover:bg-nabat-neutral-300'
                  }`}
                >
                  All
                </button>
                {Object.keys(APPLICATION_STATUS_LABELS).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status as ApplicationStatus)}
                    className={`px-4 py-2 rounded-nabat-md text-sm font-medium transition-all ${
                      filterStatus === status
                        ? 'bg-nabat-primary-500 text-white'
                        : 'bg-nabat-neutral-200 text-nabat-neutral-700 hover:bg-nabat-neutral-300'
                    }`}
                  >
                    {APPLICATION_STATUS_LABELS[status as ApplicationStatus]}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle>
              Applications ({filteredApplications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-nabat-neutral-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-nabat-neutral-600">No applications found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    className="card p-4 hover:shadow-nabat-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/admin/applications/${app.id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-nabat-neutral-900 text-lg">
                            {app.name}
                          </h3>
                          <span className={`badge ${
                            app.status === 'new' ? 'badge-info' :
                            app.status === 'in-review' ? 'badge-warning' :
                            app.status === 'shortlisted' ? 'badge-success' :
                            'badge-info'
                          }`}>
                            {APPLICATION_STATUS_LABELS[app.status]}
                          </span>
                          {app.hasUAEExperience && (
                            <span className="badge badge-success text-xs">
                              UAE Experience
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-nabat-neutral-600">Position</p>
                            <p className="font-medium text-nabat-neutral-900">
                              {app.currentPosition}
                            </p>
                          </div>
                          <div>
                            <p className="text-nabat-neutral-600">Company</p>
                            <p className="font-medium text-nabat-neutral-900">
                              {app.currentCompany}
                            </p>
                          </div>
                          <div>
                            <p className="text-nabat-neutral-600">Experience</p>
                            <p className="font-medium text-nabat-neutral-900">
                              {app.yearsOfExperience}
                            </p>
                          </div>
                          <div>
                            <p className="text-nabat-neutral-600">Application #</p>
                            <p className="font-mono text-sm font-medium text-nabat-primary-600">
                              {app.applicationNumber}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-4 text-xs text-nabat-neutral-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            {app.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            {app.phone}
                          </span>
                          <span>
                            Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <svg
                        className="w-6 h-6 text-nabat-neutral-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
