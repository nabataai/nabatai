'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
      // TODO: Implement actual Firebase authentication
      // For now, using simple demo credentials
      if (email === 'admin@nabat.ai' && password === 'demo123') {
        // Store auth token in localStorage (in production, use httpOnly cookies)
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
    <div className="min-h-screen bg-gradient-to-br from-nabat-neutral-50 via-white to-nabat-primary-50/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/nabat-logo.jpeg"
            alt="Nabat AI"
            width={180}
            height={48}
            className="h-12 w-auto mx-auto mb-4"
            priority
          />
          <h1 className="text-2xl font-bold text-nabat-neutral-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-nabat-neutral-600">
            Recruitment Management System
          </p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Access the recruitment dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="alert alert-error">
                  <svg
                    className="w-5 h-5 inline-block mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
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
                placeholder="Enter your password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Sign In
              </Button>

              {/* Demo Credentials Info */}
              <div className="mt-4 p-3 bg-blue-50 rounded-nabat-md border border-blue-200">
                <p className="text-xs font-medium text-blue-900 mb-1">
                  Demo Credentials
                </p>
                <p className="text-xs text-blue-700">
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
            This is a secure admin area. All access is logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
