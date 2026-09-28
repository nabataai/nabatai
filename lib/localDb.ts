/**
 * localDb.ts — simple JSON-file-based persistence for applications.
 * All read/write is done server-side inside Next.js Route Handlers.
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'applications.json');

async function ensureDb() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(DB_PATH, 'utf-8');
  } catch {
    await writeFile(DB_PATH, '[]', 'utf-8');
  }
}

export async function readApplications(): Promise<any[]> {
  await ensureDb();
  const raw = await readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw) as any[];
}

export async function saveApplication(application: any): Promise<void> {
  await ensureDb();
  const apps = await readApplications();
  apps.unshift(application); // newest first
  await writeFile(DB_PATH, JSON.stringify(apps, null, 2), 'utf-8');
}

export async function updateApplication(id: string, updates: Record<string, any>): Promise<void> {
  await ensureDb();
  const apps = await readApplications();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error(`Application ${id} not found`);
  apps[idx] = { ...apps[idx], ...updates };
  await writeFile(DB_PATH, JSON.stringify(apps, null, 2), 'utf-8');
}

export function generateApplicationNumber(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `NAB-${code}`;
}
