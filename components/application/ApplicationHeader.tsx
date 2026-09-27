'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const ApplicationHeader: React.FC = () => {
  return (
    <header className="border-b border-nabat-neutral-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container-nabat py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/nabat-logo.jpeg"
              alt="Nabat AI"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center space-x-6">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-nabat-neutral-900">
                Director of Business Development
              </p>
              <p className="text-xs text-nabat-neutral-600">
                Abu Dhabi, UAE
              </p>
            </div>
            <Link
              href="https://nabat.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-nabat-primary-600 hover:text-nabat-primary-700 font-medium"
            >
              nabat.ai →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
