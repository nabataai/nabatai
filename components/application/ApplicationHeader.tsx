'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const ApplicationHeader: React.FC = () => {
  return (
    <header className="border-b border-nabat-neutral-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-xs">
      <div className="container-nabat py-3.5 sm:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/nabat.jpeg"
              alt="Nabat AI"
              width={170}
              height={38}
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              priority
            />
          </Link>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-nabat-neutral-900 leading-tight">
                Director of Business Development
              </p>
              <div className="flex items-center justify-end space-x-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-nabat-primary-500 animate-pulse" />
                <p className="text-xs text-nabat-neutral-500">
                  Abu Dhabi, UAE • Full-time
                </p>
              </div>
            </div>
            <Link
              href="https://nabat.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs sm:text-sm font-semibold text-nabat-primary-600 hover:text-nabat-forest-700 bg-nabat-primary-50 hover:bg-nabat-primary-100/70 px-3 py-1.5 rounded-full transition-colors"
            >
              <span>Visit Nabat.ai</span>
              <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
