import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-nabat-neutral-50 text-nabat-neutral-900 flex flex-col font-sans">
      {/* Sticky Header */}
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
            <div className="flex items-center space-x-3 sm:space-x-5">
              <Link
                href="https://nabat.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center text-sm font-semibold text-nabat-neutral-600 hover:text-nabat-primary-700 transition-colors"
              >
                Visit Nabat.ai
                <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
              <Button href="/apply" size="sm" className="shadow-xs font-semibold">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-nabat-neutral-50 to-nabat-primary-50/20">
        {/* Subtle Decorative Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-br from-nabat-primary-100/40 via-nabat-accent-100/30 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="container-nabat relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Executive Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nabat-primary-50 border border-nabat-primary-200/80 text-nabat-forest-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-nabat-primary-500 animate-pulse" />
              <span>Executive Search • Abu Dhabi, UAE</span>
            </div>

            {/* Position Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-nabat-neutral-900 tracking-tight leading-[1.12] mb-6">
              Director of{' '}
              <span className="bg-gradient-to-r from-nabat-primary-600 to-nabat-forest-700 bg-clip-text text-transparent">
                Business Development
              </span>
            </h1>

            {/* Company Mission Statement */}
            <p className="text-lg sm:text-xl md:text-2xl text-nabat-neutral-700 font-medium max-w-3xl mx-auto leading-relaxed mb-6">
              Building the operating system for nature — an AI-powered platform helping organizations assess, restore, monitor, and verify critical ecosystems at global scale.
            </p>

            <p className="text-sm sm:text-base text-nabat-neutral-600 max-w-2xl mx-auto leading-relaxed mb-10">
              We are seeking an exceptional commercial leader to orchestrate strategic government partnerships, enterprise deals, and nature-tech expansion across the GCC and internationally.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Button href="/apply" size="lg" className="w-full sm:w-auto min-w-[220px] shadow-nabat-md">
                Start Application →
              </Button>
              <Button
                href="https://nabat.ai/"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto min-w-[200px]"
              >
                Explore Nabat.ai
              </Button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 bg-white/90 backdrop-blur-sm rounded-2xl border border-nabat-neutral-200 shadow-nabat-card text-left">
              <div className="p-2 sm:p-3">
                <p className="text-xs font-semibold text-nabat-neutral-500 uppercase tracking-wider">Location</p>
                <p className="text-sm sm:text-base font-bold text-nabat-neutral-900 mt-0.5">Abu Dhabi, UAE</p>
              </div>
              <div className="p-2 sm:p-3 border-l border-nabat-neutral-100">
                <p className="text-xs font-semibold text-nabat-neutral-500 uppercase tracking-wider">Seniority</p>
                <p className="text-sm sm:text-base font-bold text-nabat-neutral-900 mt-0.5">Executive Director</p>
              </div>
              <div className="p-2 sm:p-3 border-l border-nabat-neutral-100">
                <p className="text-xs font-semibold text-nabat-neutral-500 uppercase tracking-wider">Department</p>
                <p className="text-sm sm:text-base font-bold text-nabat-neutral-900 mt-0.5">Global Commercial</p>
              </div>
              <div className="p-2 sm:p-3 border-l border-nabat-neutral-100">
                <p className="text-xs font-semibold text-nabat-neutral-500 uppercase tracking-wider">Domain</p>
                <p className="text-sm sm:text-base font-bold text-nabat-neutral-900 mt-0.5">AI & Climate Tech</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Nabat & Platform Section */}
      <section className="py-16 md:py-24 bg-white border-t border-nabat-neutral-200/80">
        <div className="container-nabat">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-nabat-primary-600 mb-2">
              About Nabat AI
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-nabat-neutral-900 tracking-tight">
              Technology Designed to Protect the Planet
            </h3>
            <p className="mt-4 text-base sm:text-lg text-nabat-neutral-600 leading-relaxed">
              At Nabat, we harness artificial intelligence, geospatial analytics, and autonomous robotics to enable verifiable ecosystem restoration at planetary scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-nabat-neutral-50 rounded-2xl border border-nabat-neutral-200/90 p-6 hover:shadow-nabat-md hover:border-nabat-primary-300 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-nabat-primary-100 flex items-center justify-center text-nabat-primary-700 mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-nabat-neutral-900 mb-2">Our Mission</h4>
              <p className="text-sm text-nabat-neutral-600 leading-relaxed">
                Deploying an end-to-end AI platform to assess, restore, and verify the planet&apos;s most critical ecosystems with scientific precision.
              </p>
            </div>

            <div className="bg-nabat-neutral-50 rounded-2xl border border-nabat-neutral-200/90 p-6 hover:shadow-nabat-md hover:border-nabat-primary-300 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-nabat-forest-100 flex items-center justify-center text-nabat-forest-700 mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-nabat-neutral-900 mb-2">Target Ecosystems</h4>
              <p className="text-sm text-nabat-neutral-600 leading-relaxed">
                Specialized in coastal mangroves, arid forestry, and critical drylands — nature&apos;s most vital carbon sinks and coastal defenses.
              </p>
            </div>

            <div className="bg-nabat-neutral-50 rounded-2xl border border-nabat-neutral-200/90 p-6 hover:shadow-nabat-md hover:border-nabat-primary-300 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-nabat-accent-100 flex items-center justify-center text-nabat-forest-800 mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-nabat-neutral-900 mb-2">Our Technology</h4>
              <p className="text-sm text-nabat-neutral-600 leading-relaxed">
                Deep learning models combined with multispectral drone surveys, satellite remote sensing, and ecological algorithms.
              </p>
            </div>

            <div className="bg-nabat-neutral-50 rounded-2xl border border-nabat-neutral-200/90 p-6 hover:shadow-nabat-md hover:border-nabat-primary-300 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-nabat-primary-100 flex items-center justify-center text-nabat-primary-700 mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-nabat-neutral-900 mb-2">Partners & Clients</h4>
              <p className="text-sm text-nabat-neutral-600 leading-relaxed">
                Government ministries, sovereign climate initiatives, enterprise sustainability leaders, and global nature asset developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Profile & Key Requirements */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-nabat-neutral-50 via-white to-nabat-primary-50/20 border-t border-nabat-neutral-200/80">
        <div className="container-nabat">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-nabat-primary-600 mb-2">
              Role Specifications
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-nabat-neutral-900 tracking-tight">
              What We&apos;re Looking For
            </h3>
            <p className="mt-4 text-base sm:text-lg text-nabat-neutral-600 leading-relaxed">
              This executive position requires seasoned commercial strategy, high-level institutional relationships, and a passion for environmental innovation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Strategic Commercial Leadership',
                description: 'Director, VP, or C-level experience driving high-velocity business development, enterprise deals, and institutional alliances.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
              },
              {
                title: 'Enterprise & Government Sales',
                description: 'Proven track record negotiating and closing multi-million-dollar contracts with government entities and major conglomerates.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                ),
              },
              {
                title: 'GCC & Regional Expertise',
                description: 'Established presence and deep working familiarity with government stakeholders, sovereign funds, and enterprises across the UAE & GCC.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
              },
              {
                title: 'Climate Tech & AI Domain',
                description: 'Nuanced understanding of environmental technology, ESG reporting standards, carbon credit verification, or AI analytics.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                ),
              },
              {
                title: 'Pipeline Architecture',
                description: 'Demonstrated capability to architect commercial processes, lead conversion funnels, and high-performance BD functions from scratch.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                ),
              },
              {
                title: 'Proven Growth Results',
                description: 'Demonstrated history of driving significant top-line revenue expansion and building long-lasting strategic joint ventures.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-nabat-neutral-200/90 p-6 hover:shadow-nabat-md hover:border-nabat-primary-300 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-nabat-primary-50 flex items-center justify-center text-nabat-primary-600 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {item.icon}
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-nabat-neutral-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-nabat-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Package Section */}
      <section className="py-16 md:py-20 bg-white border-t border-nabat-neutral-200/80">
        <div className="container-nabat">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-nabat-primary-50/50 via-white to-nabat-forest-50/40 rounded-3xl border border-nabat-primary-200/80 p-8 sm:p-12 shadow-nabat-card">
            <div className="text-center mb-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-nabat-neutral-900 tracking-tight">
                Executive Compensation & Benefits
              </h3>
              <p className="text-sm sm:text-base text-nabat-neutral-600 mt-2">
                Designed to attract world-class commercial leadership to Abu Dhabi
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-nabat-primary-100 flex items-center justify-center text-nabat-primary-700 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-nabat-neutral-900 text-sm">Competitive Executive Salary</h5>
                  <p className="text-xs text-nabat-neutral-600 mt-0.5">Tax-free compensation benchmarked with top climate tech leaders</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-nabat-primary-100 flex items-center justify-center text-nabat-primary-700 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-nabat-neutral-900 text-sm">Equity Participation</h5>
                  <p className="text-xs text-nabat-neutral-600 mt-0.5">Significant ownership stake aligning incentives with platform valuation</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-nabat-primary-100 flex items-center justify-center text-nabat-primary-700 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-nabat-neutral-900 text-sm">Relocation & Housing</h5>
                  <p className="text-xs text-nabat-neutral-600 mt-0.5">Full relocation assistance, flights, and transition housing in Abu Dhabi</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-nabat-primary-100 flex items-center justify-center text-nabat-primary-700 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-nabat-neutral-900 text-sm">Premium Healthcare</h5>
                  <p className="text-xs text-nabat-neutral-600 mt-0.5">Comprehensive global medical, dental, and life coverage for candidate & family</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-nabat-primary-100 flex items-center justify-center text-nabat-primary-700 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-nabat-neutral-900 text-sm">Golden Visa Sponsorship</h5>
                  <p className="text-xs text-nabat-neutral-600 mt-0.5">10-year UAE Golden Visa sponsorship for candidate and dependents</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-nabat-primary-100 flex items-center justify-center text-nabat-primary-700 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-nabat-neutral-900 text-sm">Discretionary Travel</h5>
                  <p className="text-xs text-nabat-neutral-600 mt-0.5">Executive global travel budget for summits, climate conferences & client summits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Converting CTA Banner */}
      <section className="py-20 bg-nabat-neutral-50">
        <div className="container-nabat">
          <div className="relative rounded-3xl bg-gradient-to-br from-nabat-neutral-900 via-nabat-forest-900 to-nabat-neutral-900 text-white p-10 sm:p-16 text-center overflow-hidden shadow-nabat-lg">
            {/* Background subtle radial rings */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-nabat-primary-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-nabat-accent-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-nabat-primary-500/20 text-nabat-accent-300 border border-nabat-primary-400/30 mb-6">
                Executive Application
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                Ready to Shape the Future of Ecological Intelligence?
              </h3>
              <p className="text-base sm:text-lg text-nabat-neutral-300 mb-10 leading-relaxed">
                Join our executive team in Abu Dhabi and lead the commercial expansion of Nabat&apos;s operating system for nature. Applications take approximately 15 minutes and progress auto-saves.
              </p>
              <Button href="/apply" size="lg" className="min-w-[240px] text-base sm:text-lg shadow-nabat-md font-bold">
                Start Your Application →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Unified Footer */}
      <footer className="border-t border-nabat-neutral-800 bg-nabat-neutral-900 text-white py-12">
        <div className="container-nabat">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center bg-white px-3.5 py-1.5 rounded-xl shadow-xs">
              <Image
                src="/nabat.jpeg"
                alt="Nabat AI"
                width={130}
                height={28}
                className="h-7 w-auto object-contain"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-nabat-neutral-400">
              <Link
                href="https://nabat.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-nabat-accent-400 transition-colors"
              >
                Website
              </Link>
              <Link
                href="https://nabat.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-nabat-accent-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/admin/login"
                className="hover:text-nabat-accent-400 transition-colors"
              >
                Admin Portal
              </Link>
              <span className="text-nabat-neutral-600">|</span>
              <span className="text-nabat-neutral-500">© 2026 Nabat AI • Abu Dhabi, UAE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
