'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { APPLICATION_STATUS_LABELS, type ApplicationStatus } from '@/types/application';
import { cn } from '@/lib/utils';

interface AppRow {
  id: string;
  applicationNumber: string;
  status: ApplicationStatus;
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  currentPosition: string;
  currentCompany: string;
  yearsOfExperience: string;
  hasUAEExperience: boolean;
  data?: any;
}

function mapApplication(raw: any): AppRow {
  const pi = raw.data?.personalInformation || {};
  const prof = raw.data?.professionalInformation || {};
  const gcc = raw.data?.gccUaeExperience || {};
  return {
    id: raw.id,
    applicationNumber: raw.applicationNumber,
    status: raw.status,
    submittedAt: raw.submittedAt,
    name: [pi.firstName, pi.lastName].filter(Boolean).join(' ') || '—',
    email: pi.email || '—',
    phone: pi.primaryPhone || '—',
    currentPosition: prof.currentJobTitle || '—',
    currentCompany: prof.currentCompany || '—',
    yearsOfExperience: prof.yearsOfExperience || '—',
    hasUAEExperience: !!gcc.hasUAEExperience,
    data: raw,
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [applications, setApplications] = useState<AppRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated') === 'true';
    if (!isAuth) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    fetchApplications();
  }, [router]);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/applications');
      const json = await res.json();
      setApplications((json.applications || []).map(mapApplication));
    } catch (err) {
      console.error('Failed to load applications', err);
    } finally {
      setIsLoading(false);
    }
  };

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
                <h1 className="text-base font-bold text-nabat-neutral-900 leading-tight">
                  Recruitment Dashboard
                </h1>
                <p className="text-xs text-nabat-neutral-500">
                  Director of Business Development Pipeline
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={fetchApplications}
                variant="ghost"
                size="sm"
                className="text-xs font-semibold text-nabat-neutral-600"
              >
                ↻ Refresh
              </Button>
              <Button
                href="/"
                variant="ghost"
                size="sm"
                className="text-xs font-semibold text-nabat-neutral-600"
              >
                View Careers Page
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container-nabat py-8 flex-1">
        {/* Statistics Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          <button
            onClick={() => setFilterStatus('all')}
            className={cn(
              'p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer shadow-xs',
              filterStatus === 'all'
                ? 'bg-gradient-to-br from-nabat-primary-600 to-nabat-forest-700 text-white ring-2 ring-nabat-primary-500 shadow-nabat-sm'
                : 'bg-white border border-nabat-neutral-200/90 text-nabat-neutral-800 hover:border-nabat-primary-300'
            )}
          >
            <p className={cn('text-xs font-semibold uppercase tracking-wider mb-1', filterStatus === 'all' ? 'text-nabat-primary-100' : 'text-nabat-neutral-500')}>
              All Total
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold">{counts.total}</p>
          </button>

          <button
            onClick={() => setFilterStatus('new')}
            className={cn(
              'p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer shadow-xs',
              filterStatus === 'new'
                ? 'bg-nabat-primary-500 text-white ring-2 ring-nabat-primary-300 shadow-nabat-sm'
                : 'bg-white border border-nabat-neutral-200/90 text-nabat-neutral-800 hover:border-nabat-primary-300'
            )}
          >
            <p className={cn('text-xs font-semibold uppercase tracking-wider mb-1', filterStatus === 'new' ? 'text-nabat-primary-100' : 'text-nabat-neutral-500')}>
              New
            </p>
            <p className={cn('text-2xl sm:text-3xl font-extrabold', filterStatus === 'new' ? 'text-white' : 'text-nabat-primary-600')}>
              {counts.new}
            </p>
          </button>

          <button
            onClick={() => setFilterStatus('in-review')}
            className={cn(
              'p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer shadow-xs',
              filterStatus === 'in-review'
                ? 'bg-amber-600 text-white ring-2 ring-amber-300 shadow-nabat-sm'
                : 'bg-white border border-nabat-neutral-200/90 text-nabat-neutral-800 hover:border-amber-300'
            )}
          >
            <p className={cn('text-xs font-semibold uppercase tracking-wider mb-1', filterStatus === 'in-review' ? 'text-amber-100' : 'text-nabat-neutral-500')}>
              In Review
            </p>
            <p className={cn('text-2xl sm:text-3xl font-extrabold', filterStatus === 'in-review' ? 'text-white' : 'text-amber-600')}>
              {counts['in-review']}
            </p>
          </button>

          <button
            onClick={() => setFilterStatus('shortlisted')}
            className={cn(
              'p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer shadow-xs',
              filterStatus === 'shortlisted'
                ? 'bg-nabat-forest-700 text-white ring-2 ring-nabat-forest-400 shadow-nabat-sm'
                : 'bg-white border border-nabat-neutral-200/90 text-nabat-neutral-800 hover:border-nabat-forest-300'
            )}
          >
            <p className={cn('text-xs font-semibold uppercase tracking-wider mb-1', filterStatus === 'shortlisted' ? 'text-nabat-forest-100' : 'text-nabat-neutral-500')}>
              Shortlisted
            </p>
            <p className={cn('text-2xl sm:text-3xl font-extrabold', filterStatus === 'shortlisted' ? 'text-white' : 'text-nabat-forest-600')}>
              {counts.shortlisted}
            </p>
          </button>

          <button
            onClick={() => setFilterStatus('interview')}
            className={cn(
              'p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer shadow-xs',
              filterStatus === 'interview'
                ? 'bg-purple-600 text-white ring-2 ring-purple-300 shadow-nabat-sm'
                : 'bg-white border border-nabat-neutral-200/90 text-nabat-neutral-800 hover:border-purple-300'
            )}
          >
            <p className={cn('text-xs font-semibold uppercase tracking-wider mb-1', filterStatus === 'interview' ? 'text-purple-100' : 'text-nabat-neutral-500')}>
              Interview
            </p>
            <p className={cn('text-2xl sm:text-3xl font-extrabold', filterStatus === 'interview' ? 'text-white' : 'text-purple-600')}>
              {counts.interview}
            </p>
          </button>

          <button
            onClick={() => setFilterStatus('hired')}
            className={cn(
              'p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer shadow-xs',
              filterStatus === 'hired'
                ? 'bg-emerald-700 text-white ring-2 ring-emerald-400 shadow-nabat-sm'
                : 'bg-white border border-nabat-neutral-200/90 text-nabat-neutral-800 hover:border-emerald-300'
            )}
          >
            <p className={cn('text-xs font-semibold uppercase tracking-wider mb-1', filterStatus === 'hired' ? 'text-emerald-100' : 'text-nabat-neutral-500')}>
              Hired
            </p>
            <p className={cn('text-2xl sm:text-3xl font-extrabold', filterStatus === 'hired' ? 'text-white' : 'text-emerald-600')}>
              {counts.hired}
            </p>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-nabat-neutral-200/90 p-4 sm:p-5 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-96 relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-nabat-neutral-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search candidates by name, email, or #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap w-full md:w-auto">
              <button
                onClick={() => setFilterStatus('all')}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                  filterStatus === 'all'
                    ? 'bg-nabat-primary-500 text-white shadow-xs'
                    : 'bg-nabat-neutral-100 text-nabat-neutral-700 hover:bg-nabat-neutral-200'
                )}
              >
                All ({counts.total})
              </button>
              {(Object.keys(APPLICATION_STATUS_LABELS) as ApplicationStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                    filterStatus === status
                      ? 'bg-nabat-primary-500 text-white shadow-xs'
                      : 'bg-nabat-neutral-100 text-nabat-neutral-700 hover:bg-nabat-neutral-200'
                  )}
                >
                  {APPLICATION_STATUS_LABELS[status]} ({counts[status] || 0})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Candidate List */}
        <div className="bg-white rounded-2xl border border-nabat-neutral-200/90 shadow-nabat-card overflow-hidden">
          <div className="px-6 py-4 border-b border-nabat-neutral-100 flex items-center justify-between">
            <h3 className="font-bold text-nabat-neutral-900 text-base">
              Candidate Dossiers ({filteredApplications.length})
            </h3>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-nabat-primary-600 hover:underline cursor-pointer"
              >
                Clear search
              </button>
            )}
          </div>

          <div className="divide-y divide-nabat-neutral-100">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="spinner mx-auto mb-3" />
                <p className="text-sm text-nabat-neutral-500">Loading applications...</p>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-16">
                <svg
                  className="w-12 h-12 text-nabat-neutral-300 mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-sm font-semibold text-nabat-neutral-700">
                  {applications.length === 0 ? 'No applications submitted yet' : 'No applications match your criteria'}
                </p>
                <p className="text-xs text-nabat-neutral-500 mt-1">
                  {applications.length === 0 ? 'Applications will appear here once candidates submit' : 'Try resetting the filter or search query'}
                </p>
              </div>
            ) : (
              filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 sm:p-6 hover:bg-nabat-primary-50/30 transition-colors cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"
                  onClick={() => router.push(`/admin/applications/${app.id}`)}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <h4 className="font-bold text-nabat-neutral-900 text-base sm:text-lg group-hover:text-nabat-primary-700 transition-colors">
                        {app.name}
                      </h4>
                      <span
                        className={cn(
                          'badge text-xs font-semibold',
                          app.status === 'new' && 'badge-info',
                          app.status === 'in-review' && 'badge-warning',
                          app.status === 'shortlisted' && 'badge-success',
                          app.status === 'interview' && 'bg-purple-100 text-purple-800 border-purple-200',
                          app.status === 'hired' && 'bg-emerald-100 text-emerald-800 border-emerald-200',
                          app.status === 'rejected' && 'badge-error'
                        )}
                      >
                        {APPLICATION_STATUS_LABELS[app.status]}
                      </span>
                      {app.hasUAEExperience && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-nabat-forest-50 text-nabat-forest-700 border border-nabat-forest-200">
                          UAE Experience
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm text-nabat-neutral-600 mb-2">
                      <div>
                        <span className="text-nabat-neutral-400 block text-xs">Role:</span>
                        <span className="font-medium text-nabat-neutral-900">{app.currentPosition}</span>
                      </div>
                      <div>
                        <span className="text-nabat-neutral-400 block text-xs">Company:</span>
                        <span className="font-medium text-nabat-neutral-900">{app.currentCompany}</span>
                      </div>
                      <div>
                        <span className="text-nabat-neutral-400 block text-xs">Experience:</span>
                        <span className="font-medium text-nabat-neutral-900">{app.yearsOfExperience}</span>
                      </div>
                      <div>
                        <span className="text-nabat-neutral-400 block text-xs">Application Ref:</span>
                        <span className="font-mono font-bold text-nabat-primary-700">{app.applicationNumber}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-nabat-neutral-500 pt-1">
                      <span>Email: <strong className="text-nabat-neutral-700">{app.email}</strong></span>
                      <span>Phone: <strong className="text-nabat-neutral-700">{app.phone}</strong></span>
                      <span>Submitted: {new Date(app.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-nabat-primary-600 group-hover:translate-x-1 transition-transform">
                    <span className="text-xs sm:text-sm font-bold">Review Dossier</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
