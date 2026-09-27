'use client';

import React from 'react';
import { ApplicationProvider } from '@/contexts/ApplicationContext';
import { ApplicationHeader } from '@/components/application/ApplicationHeader';
import { ApplicationForm } from '@/components/application/ApplicationForm';

export default function ApplyPage() {
  return (
    <ApplicationProvider>
      <div className="min-h-screen bg-nabat-neutral-50">
        <ApplicationHeader />
        <main className="py-8 md:py-12">
          <ApplicationForm />
        </main>
      </div>
    </ApplicationProvider>
  );
}
