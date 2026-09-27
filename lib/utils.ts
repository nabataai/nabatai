import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string, countryCode: string = 'AE'): string {
  try {
    const phoneNumber = parsePhoneNumber(phone, countryCode as any);
    return phoneNumber.formatInternational();
  } catch {
    return phone;
  }
}

export function validatePhoneNumber(phone: string, countryCode: string = 'AE'): boolean {
  try {
    return isValidPhoneNumber(phone, countryCode as any);
  } catch {
    return false;
  }
}

export function formatDate(date: string | Date, formatString: string = 'MMM dd, yyyy'): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatString);
  } catch {
    return '';
  }
}

export function generateApplicationNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NAB-${timestamp}-${random}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function validateFileType(file: File, acceptedTypes: string[]): boolean {
  return acceptedTypes.some(type => {
    if (type.includes('/*')) {
      const baseType = type.split('/')[0];
      return file.type.startsWith(baseType + '/');
    }
    return file.type === type;
  });
}

export function validateFileSize(file: File, maxSizeMB: number): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
}

export function calculateProgress(currentStep: number, totalSteps: number): number {
  return Math.round((currentStep / totalSteps) * 100);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function extractLinkedInUsername(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('linkedin.com')) {
      const match = urlObj.pathname.match(/\/in\/([^\/]+)/);
      return match ? match[1] : null;
    }
    return null;
  } catch {
    return null;
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function getYearsArray(startYear: number = 1960): string[] {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year.toString());
  }
  return years;
}

export function getYearsOfExperienceOptions(): string[] {
  return [
    '0-2 years',
    '2-5 years',
    '5-10 years',
    '10-15 years',
    '15-20 years',
    '20+ years',
  ];
}
