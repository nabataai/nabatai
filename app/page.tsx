import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nabat-neutral-50 via-white to-nabat-primary-50/20">
      {/* Header */}
      <header className="border-b border-nabat-neutral-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
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
            <Link
              href="https://nabat.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-primary text-sm"
            >
              Visit Nabat.ai →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Topographic Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(56, 178, 154, 0.3) 30px, rgba(56, 178, 154, 0.3) 31px),
              repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(56, 178, 154, 0.3) 30px, rgba(56, 178, 154, 0.3) 31px)
            `
          }} />
        </div>

        <div className="container-nabat relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Position Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-nabat-primary-100 text-nabat-primary-700 text-sm font-medium mb-6 animate-fade-in">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Abu Dhabi, UAE
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-nabat-neutral-900 mb-6 animate-slide-up">
              Director of Business Development
            </h1>

            {/* Company */}
            <p className="text-xl md:text-2xl text-nabat-neutral-700 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Nabat AI
            </p>

            {/* Description */}
            <p className="text-lg text-nabat-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Nabat is building the operating system for nature — an AI-powered platform helping organizations assess, restore, monitor, and verify critical ecosystems at scale.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/apply">
                <Button size="lg" className="w-full sm:w-auto min-w-[200px]">
                  Apply Now
                </Button>
              </Link>
              <Link href="https://nabat.ai/" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px]">
                  Visit Nabat.ai
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Nabat Section */}
      <section className="py-16 bg-white">
        <div className="container-nabat">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-nabat-neutral-900 mb-8 text-center">
              About Nabat
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-nabat-md bg-nabat-primary-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-nabat-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-nabat-neutral-900 mb-2">Our Mission</h3>
                    <p className="text-nabat-neutral-600 text-sm">
                      Building an end-to-end AI platform to restore and manage the planet's most critical ecosystems at scale.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-nabat-md bg-nabat-forest-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-nabat-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-nabat-neutral-900 mb-2">Our Focus</h3>
                    <p className="text-nabat-neutral-600 text-sm">
                      Coastal and dryland ecosystems—massive carbon sinks protecting coastlines and food systems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-nabat-md bg-nabat-accent-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-nabat-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-nabat-neutral-900 mb-2">Our Technology</h3>
                    <p className="text-nabat-neutral-600 text-sm">
                      AI, robotics, geospatial technology, and ecology combined for data-driven ecosystem management.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-nabat-md bg-nabat-primary-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-nabat-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-nabat-neutral-900 mb-2">Our Clients</h3>
                    <p className="text-nabat-neutral-600 text-sm">
                      Government agencies, corporate ESG programs, project developers, and nature investors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-nabat-neutral-600 mb-4">
                Learn more about Nabat and our work in ecosystem restoration
              </p>
              <Link
                href="https://nabat.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-primary text-lg"
              >
                Visit nabat.ai →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Role Highlights Section */}
      <section className="py-16 bg-nabat-gradient-subtle">
        <div className="container-nabat">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-nabat-neutral-900 mb-4 text-center">
              What We're Looking For
            </h2>
            <p className="text-center text-nabat-neutral-600 mb-12 max-w-2xl mx-auto">
              This is a senior leadership role requiring strategic vision, proven business development expertise, and the ability to build high-impact partnerships in climate technology and AI.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Strategic Leadership',
                  description: 'Director, VP, or C-level experience in business development or partnerships',
                },
                {
                  title: 'Enterprise Sales',
                  description: 'Proven track record building and closing complex deals with large organizations',
                },
                {
                  title: 'GCC Expertise',
                  description: 'Experience working with government agencies and enterprises across the Gulf region',
                },
                {
                  title: 'Climate/AI Focus',
                  description: 'Background in climate tech, environmental technology, AI, or related sectors',
                },
                {
                  title: 'Pipeline Building',
                  description: 'Demonstrated ability to build BD functions and strategic partnership pipelines from scratch',
                },
                {
                  title: 'Results Driven',
                  description: 'Track record of significant revenue generation and partnership development',
                },
              ].map((item, index) => (
                <div key={index} className="card p-6">
                  <h3 className="font-semibold text-nabat-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-nabat-neutral-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-nabat">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-nabat-neutral-900 mb-6">
              Ready to Apply?
            </h2>
            <p className="text-lg text-nabat-neutral-600 mb-8">
              Join us in building technology that restores and protects the planet's most critical ecosystems. Complete our executive application in approximately 15-20 minutes.
            </p>
            <Link href="/apply">
              <Button size="lg" className="min-w-[240px]">
                Start Your Application
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-nabat-neutral-200 bg-nabat-neutral-900 text-white py-12">
        <div className="container-nabat">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Image
                src="/nabat-logo.jpeg"
                alt="Nabat AI"
                width={120}
                height={32}
                className="h-8 w-auto opacity-90"
              />
            </div>
            <div className="flex items-center space-x-6 text-sm">
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
              <span className="text-nabat-neutral-500">
                © 2026 Nabat AI
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
