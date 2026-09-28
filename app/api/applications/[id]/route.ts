import { NextRequest, NextResponse } from 'next/server';
import { readApplications, updateApplication } from '@/lib/localDb';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/applications/[id]
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const apps = await readApplications();
    const app = apps.find((a: any) => a.id === id);
    if (!app) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    return NextResponse.json({ application: app });
  } catch (err) {
    console.error('GET /api/applications/[id] error:', err);
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
  }
}

// PATCH /api/applications/[id]  — update status / notes
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updates = {
      ...(body.status && { status: body.status }),
      ...(body.recruiterNotes !== undefined && { recruiterNotes: body.recruiterNotes }),
      updatedAt: new Date().toISOString(),
    };
    await updateApplication(id, updates);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('PATCH /api/applications/[id] error:', err);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}
