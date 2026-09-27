'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (email === 'admin@nabat.ai' && password === 'demo123') {
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_email', email);
        router.push('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nabat-neutral-50 via-white to-nabat-primary-50/30 flex flex-col items-center justify-center p-4">
      {/* Back Link */}
      <div className="w-full max-w-md mb-4 text-left">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-nabat-neutral-500 hover:text-nabat-primary-700 transition-colors"
        >
          ← Return to Careers Portal
        </Link>
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/nabat.jpeg"
            alt="Nabat AI"
            width={180}
            height={40}
            className="h-10 w-auto mx-auto mb-4 object-contain"
            priority
          />
          <h1 className="text-2xl font-extrabold text-nabat-neutral-900 tracking-tight">
            Talent Acquisition Portal
          </h1>
          <p className="text-sm text-nabat-neutral-600 mt-1">
            Executive Recruitment Management
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-nabat-card border-nabat-neutral-200/90">
          <CardHeader>
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>
              Access candidate dossiers and pipeline metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="alert alert-error text-sm font-medium">
                  {error}
                </div>
              )}

              <Input
                type="email"
                label="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nabat.ai"
                autoComplete="email"
              />

              <Input
                type="password"
                label="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                className="w-full font-bold shadow-nabat-sm"
                isLoading={isLoading}
              >
                Sign In to Dashboard →
              </Button>

              {/* Demo Credentials Info */}
              <div className="mt-4 p-3.5 bg-nabat-primary-50/70 rounded-xl border border-nabat-primary-200/70">
                <p className="text-xs font-bold text-nabat-forest-900 mb-1">
                  Demo Evaluation Credentials
                </p>
                <p className="text-xs text-nabat-forest-700 font-mono">
                  Email: admin@nabat.ai<br />
                  Password: demo123
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-nabat-neutral-500">
            Nabat AI Executive Portal • All sessions are monitored
          </p>
        </div>
      </div>
    </div>
  );
}
